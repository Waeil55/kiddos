// Kiddos voice: OpenAI's human-sounding speech, streamed straight back as it is made (so playback
// starts on the first bytes). Runs in the Supabase project that already holds the OPENAI_API_KEY secret.
// Only the Kiddos server can call it: it must send the shared KIDDOS_TTS_TOKEN secret.
//
// Deploy (from the Kiddos folder): node deploy/setup-voice.mjs
// Cost: gpt-4o-mini-tts is about $0.015 per minute of speech; tts-1 about $15 per million characters.

const MAX_CHARS = 600;
const RATE_LIMIT = 3000; // clips per hour, a safety cap (the Kiddos server caches repeated lines)
const VOICES = ["alloy", "ash", "ballad", "coral", "echo", "fable", "nova", "onyx", "sage", "shimmer", "verse"];
const TTS1_VOICES = ["alloy", "ash", "coral", "echo", "fable", "nova", "onyx", "sage", "shimmer"];

let hits: number[] = [];

function speech(apiKey: string, model: string, voice: string, input: string, instructions: string) {
  return fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, voice, input, response_format: "mp3", ...(model.startsWith("gpt-") && instructions ? { instructions } : {}) }),
  });
}

const json = (body: unknown, status: number) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  const token = Deno.env.get("KIDDOS_TTS_TOKEN");
  if (!token || req.headers.get("x-kiddos-token") !== token) return json({ error: "Forbidden" }, 403);
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (req.method === "GET") return json({ ok: !!apiKey }, apiKey ? 200 : 503);
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (!apiKey) return json({ error: "OPENAI_API_KEY is not set in this project" }, 503);

  const now = Date.now();
  hits = hits.filter((t) => now - t < 3600_000);
  if (hits.length >= RATE_LIMIT) return json({ error: "Too many voice requests" }, 429);
  hits.push(now);

  let body: { text?: unknown; voice?: unknown; instructions?: unknown; model?: unknown };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }
  const text = typeof body.text === "string" ? body.text.replace(/\s+/g, " ").trim().slice(0, MAX_CHARS) : "";
  if (!text) return json({ error: "Missing text" }, 400);
  const voice = typeof body.voice === "string" && VOICES.includes(body.voice) ? body.voice : "coral";
  const instructions = typeof body.instructions === "string" ? body.instructions.slice(0, 600) : "";
  const model = body.model === "tts-1" || body.model === "gpt-4o-mini-tts" ? body.model : "gpt-4o-mini-tts";

  let res = await speech(apiKey, model, voice, text, instructions);
  // Accounts without the newer model fall back to tts-1 (with a voice it has) rather than fail.
  if (!res.ok && model !== "tts-1" && res.status >= 400 && res.status < 500 && res.status !== 429) {
    res = await speech(apiKey, "tts-1", TTS1_VOICES.includes(voice) ? voice : "nova", text, "");
  }
  if (!res.ok || !res.body) {
    console.error("OpenAI TTS error:", res.status, await res.text());
    return json({ error: `Voice service error (${res.status})` }, 502);
  }
  return new Response(res.body, { headers: { "Content-Type": "audio/mpeg", "Cache-Control": "private, max-age=86400" } });
});
