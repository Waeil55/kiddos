import "dotenv/config";
import express from "express";
import type { Request, RequestHandler } from "express";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { aiEnabled, runTutor } from "./tutor.js";
import { streamSpeech, ttsProvider, warmVoice } from "./tts.js";
import { writeStory } from "./story.js";
import { redactContact } from "./safety.js";
import type { ChatLine, StoryRequest, Subject, TtsRequest, TutorRequest } from "../src/shared/types.js";

const here = () => {
  try {
    return path.dirname(fileURLToPath(import.meta.url));
  } catch {
    return null; // The desktop app runs a CommonJS bundle of this file, where import.meta is empty.
  }
};

const app = express();
// The server only listens on 127.0.0.1, so every request arrives through a local hop
// (the Cloudflare tunnel, the Vite proxy, or the desktop app). Trust only that hop.
app.set("trust proxy", "loopback");

// The phone apps load the page from capacitor://localhost (iOS) or https://localhost (Android).
// The web app and the desktop app call the API from the same origin as the page.
const APP_ORIGINS = new Set([
  "capacitor://localhost",
  "https://localhost",
  "http://localhost",
  ...(process.env.KIDDOS_CORS_ORIGINS ?? "").split(",").map((o) => o.trim()).filter(Boolean),
]);
function originAllowed(req: Request): boolean {
  const origin = req.get("origin");
  if (!origin || APP_ORIGINS.has(origin)) return true;
  try {
    const u = new URL(origin);
    if (u.host === req.get("x-forwarded-host") || u.host === req.get("host")) return true;
    // Local development (Vite on another port, a desktop dev build).
    return u.protocol === "http:" && (u.hostname === "localhost" || u.hostname === "127.0.0.1");
  } catch {
    return false;
  }
}
app.use(cors((req, cb) => cb(null, { origin: originAllowed(req as Request), maxAge: 600 })));
app.use(express.json({ limit: "200kb" }));

// Rate limits, per device: the visitor's address (Cloudflare tells us the real one) plus the app's
// random install id. A larger per-address ceiling stops anyone from dodging limits with fresh ids.
const clientIp = (req: Request) => (req.get("cf-connecting-ip") || req.ip || "?").slice(0, 64);
const installId = (req: Request) => (req.get("x-kiddos-install") || "").replace(/[^\w-]/g, "").slice(0, 64) || "none";

type Bucket = { n: number; t: number };
const buckets = new Map<string, Bucket>();
function over(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now - b.t > windowMs) {
    buckets.set(key, { n: 1, t: now });
    return false;
  }
  return ++b.n > max;
}
setInterval(() => {
  const now = Date.now();
  for (const [k, b] of buckets) if (now - b.t > 3600_000) buckets.delete(k);
}, 600_000).unref();

function limit(name: string, perDevice: number, windowMs: number, message: string): RequestHandler {
  return (req, res, next) => {
    const ip = clientIp(req);
    if (over(`${name}|${ip}|${installId(req)}`, perDevice, windowMs) || over(`${name}|${ip}`, perDevice * 6, windowMs)) {
      return res.status(429).json({ error: message });
    }
    next();
  };
}
const BREATHE = "Too many requests, take a breath!";
// Voice gets the biggest budget: one lesson turn can be several sentences.
const tutorLimit = limit("tutor", 30, 60_000, BREATHE);
const ttsLimit = limit("tts", 150, 60_000, BREATHE);
// Writing a story is a big AI call, so each device gets a few per hour.
const storyLimit = limit("story", 12, 3600_000, "That's a lot of new stories! Try one from the library.");
const reportLimit = limit("report", 20, 3600_000, "Thanks! We already have your reports.");
const apiLimit = limit("api", 60, 60_000, BREATHE);
app.use("/api", (req, res, next) => (req.path === "/tts" ? next() : apiLimit(req, res, next)));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, ai: aiEnabled(), voice: ttsProvider() });
});

const str = (v: unknown, max: number) => (typeof v === "string" ? v : v == null ? "" : String(v)).slice(0, max);
const SUBJECTS: Subject[] = ["reading", "phonics", "math", "spelling", "science", "world", "feelings", "free"];

app.post("/api/tutor", tutorLimit, async (req, res) => {
  const body = req.body as TutorRequest;
  if (!body?.child || typeof body.message !== "string") return res.status(400).json({ error: "Bad request" });
  // Keep only what the lesson needs. The app sends the name as the token {name}.
  const c = body.child;
  const history: ChatLine[] = (Array.isArray(body.history) ? body.history : [])
    .slice(-20)
    .map((l) => ({ role: l?.role === "child" ? "child" : "buddy", text: str(l?.text, 600) }));
  const result = await runTutor({
    characterId: str(body.characterId, 40),
    subject: SUBJECTS.includes(body.subject) ? body.subject : "free",
    child: {
      name: str(c.name, 40) || "{name}",
      age: Math.max(2, Math.min(14, Math.round(Number(c.age) || 6))),
      grade: str(c.grade, 20),
      interests: (Array.isArray(c.interests) ? c.interests : []).map((i) => str(i, 40)).slice(0, 8),
      level: Math.max(1, Math.min(3, Math.round(Number(c.level) || 1))),
      language: str(c.language, 30) || "English",
    },
    history,
    message: body.message.slice(0, 500),
    expected: Array.isArray(body.expected) ? body.expected.map((e) => str(e, 80)).slice(0, 10) : undefined,
    memory: Array.isArray(body.memory) ? body.memory.map((m) => str(m, 200)).slice(0, 8) : [],
  });
  res.json(result);
});

app.post("/api/story", storyLimit, async (req, res) => {
  const body = req.body as StoryRequest;
  if (!aiEnabled()) return res.status(503).json({ error: "The AI story maker needs an Anthropic API key" });
  if (typeof body?.grade !== "number") return res.status(400).json({ error: "Bad request" });
  try {
    const passage = await writeStory({
      grade: body.grade,
      interests: (body.interests ?? []).map((i) => str(i, 40)).slice(0, 6),
      focusSkill: body.focusSkill ? str(body.focusSkill, 40) : undefined,
      avoidTitles: (body.avoidTitles ?? []).map((t) => str(t, 80)).slice(-40),
    });
    res.json(passage);
  } catch (err) {
    if (err instanceof Error) console.error("[story]", err.message);
    res.status(502).json({ error: "Could not write a story right now" });
  }
});

app.post("/api/tts", ttsLimit, async (req, res) => {
  // "private" marks a line that contains the child's name: it is spoken but never cached.
  const { characterId, text, rate, private: isPrivate } = req.body as TtsRequest & { private?: boolean };
  if (!text) return res.status(400).end();
  try {
    if (!(await streamSpeech(str(characterId, 40), String(text), res, Number(rate ?? 1), isPrivate === true))) res.status(204).end();
  } catch (err) {
    console.error("[tts]", err instanceof Error ? err.message : err);
    if (!res.headersSent) res.status(502).end();
    else res.end();
  }
});

// "Report this answer": a parent or child flags a buddy reply. Kept 90 days, then deleted.
// The app has already swapped the child's name for {name}; contact details are blanked here too.
const dataDir = process.env.KIDDOS_DATA_DIR || (here() ? path.join(here()!, "data") : path.join(process.cwd(), "server", "data"));
const reportsFile = path.join(dataDir, "reports.jsonl");
const REPORT_DAYS = 90;

function pruneReports() {
  try {
    const cutoff = Date.now() - REPORT_DAYS * 86400_000;
    const lines = fs.readFileSync(reportsFile, "utf8").split("\n").filter(Boolean);
    const keep = lines.filter((l) => {
      try {
        return Date.parse(JSON.parse(l).at) >= cutoff;
      } catch {
        return false;
      }
    });
    if (keep.length !== lines.length) fs.writeFileSync(reportsFile, keep.map((l) => l + "\n").join(""));
  } catch {}
}
pruneReports();
setInterval(pruneReports, 86400_000).unref();

app.post("/api/report", reportLimit, (req, res) => {
  const b = (req.body ?? {}) as { subject?: unknown; speech?: unknown; childText?: unknown };
  const entry = {
    at: new Date().toISOString(),
    subject: redactContact(str(b.subject, 1000)),
    speech: redactContact(str(b.speech, 1000)),
    childText: redactContact(str(b.childText, 1000)),
  };
  if (!entry.speech && !entry.childText) return res.status(400).end();
  try {
    fs.mkdirSync(dataDir, { recursive: true });
    fs.appendFileSync(reportsFile, JSON.stringify(entry) + "\n");
    console.log(`[report] saved (${entry.subject.slice(0, 20) || "no subject"})`);
    res.status(204).end();
  } catch (err) {
    console.error("[report]", err instanceof Error ? err.message : err);
    res.status(500).end();
  }
});

// Serve the built web app (production / single-server deploys).
// The desktop app passes KIDDOS_DIST because it runs a bundled copy of this server.
const dist = process.env.KIDDOS_DIST || path.resolve(here() ?? process.cwd(), "..", "dist");
if (fs.existsSync(dist)) {
  app.use(express.static(dist));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

const port = Number(process.env.API_PORT || 8787);
warmVoice();
app.listen(port, "127.0.0.1", () => {
  console.log(`Kiddos API on http://localhost:${port}  (AI tutor: ${aiEnabled() ? "Claude" : "offline"}, voices: ${ttsProvider()})`);
});
