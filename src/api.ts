import type { Passage } from "./shared/passages/types";
import type { StoryRequest, TutorRequest, TutorTurn } from "./shared/types";

declare global {
  interface Window {
    kiddosDesktop?: { platform: string; apiBase: string };
  }
}

/** The live server the phone apps talk to (override with VITE_API_BASE at build time). */
const MOBILE_API = "https://kiddos.dr-mariam.com";

/** Where the API lives: same origin on the web, configured host in desktop and mobile builds. */
export function apiBase(): string {
  const env = import.meta.env.VITE_API_BASE as string | undefined;
  if (env) return env.replace(/\/$/, "");
  if (location.protocol === "file:" && window.kiddosDesktop) return window.kiddosDesktop.apiBase;
  // Inside the iOS app the page is capacitor://localhost; inside the Android app it is https://localhost.
  if (location.protocol === "capacitor:" || (location.hostname === "localhost" && location.port === "")) return MOBILE_API;
  return "";
}

let install = "";
/** A random id for this install (not tied to the child), so the server can rate-limit fairly. */
export function installId(): string {
  if (install) return install;
  try {
    install = localStorage.getItem("kiddos-install") ?? "";
    if (!install) {
      install = crypto.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem("kiddos-install", install);
    }
  } catch {
    install ||= `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  }
  return install;
}

/** Headers for every /api/* call. */
export function apiHeaders(json = true): Record<string, string> {
  return { ...(json ? { "Content-Type": "application/json" } : {}), "x-kiddos-install": installId() };
}

/** AbortSignal.timeout is missing on older WebViews; fall back to no timeout there. */
function timeout(ms: number): AbortSignal | undefined {
  return typeof AbortSignal !== "undefined" && "timeout" in AbortSignal ? AbortSignal.timeout(ms) : undefined;
}

export async function askTutor(req: TutorRequest): Promise<{ turn: TutorTurn; source: "ai" | "offline" }> {
  const res = await fetch(`${apiBase()}/api/tutor`, {
    method: "POST",
    headers: apiHeaders(),
    body: JSON.stringify(req),
    signal: timeout(8000),
  });
  if (!res.ok) throw new Error(`Tutor ${res.status}`);
  return res.json();
}

export async function health(): Promise<{ ok: boolean; ai: boolean; voice: string } | null> {
  try {
    const res = await fetch(`${apiBase()}/api/health`, { headers: apiHeaders(false) });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

/** Asks the AI story maker for a brand-new comprehension passage (only when the server has AI enabled). */
export async function generateStory(req: StoryRequest): Promise<Passage> {
  const res = await fetch(`${apiBase()}/api/story`, {
    method: "POST",
    headers: apiHeaders(),
    body: JSON.stringify(req),
    signal: timeout(20000),
  });
  if (!res.ok) throw new Error(`Story ${res.status}`);
  return res.json();
}

/** Sends a "Tell a grown-up" report about a buddy line (the child's name already replaced by {name}). */
export async function sendReport(r: { subject: string; speech: string; childText: string }): Promise<boolean> {
  try {
    const res = await fetch(`${apiBase()}/api/report`, { method: "POST", headers: apiHeaders(), body: JSON.stringify(r), signal: timeout(8000) });
    return res.ok;
  } catch {
    return false;
  }
}
