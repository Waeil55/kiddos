// "Learning that listens": speech recognition plus a live microphone level for the waveform.
// On phones (Capacitor) the native recognizer is used; in browsers, the Web Speech API.
import { Capacitor, type PluginListenerHandle } from "@capacitor/core";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

interface RecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}

function Recognition(): (new () => RecognitionLike) | null {
  const w = window as unknown as Record<string, unknown>;
  return (w.SpeechRecognition || w.webkitSpeechRecognition || null) as (new () => RecognitionLike) | null;
}

const native = () => Capacitor.isNativePlatform();

// On phones the microphone is allowed by a grown-up in the parent area (Kids Category rule), never prompted
// in front of the child. Until then the mic button stays hidden.
let micGranted = false;

/** Re-reads whether the phone's microphone and speech recognition are allowed. */
export async function refreshMicPermission(): Promise<boolean> {
  if (!native()) return true;
  try {
    const p = await SpeechRecognition.checkPermissions();
    micGranted = p.speechRecognition === "granted";
  } catch {
    micGranted = false;
  }
  return micGranted;
}

/** Shows the system microphone prompt. Call only from the parent area. */
export async function askMicPermission(): Promise<boolean> {
  if (!native()) return true;
  try {
    micGranted = (await SpeechRecognition.requestPermissions()).speechRecognition === "granted";
  } catch {
    micGranted = false;
  }
  return micGranted;
}

if (native()) void refreshMicPermission();

/** True only when speech recognition can actually work here. */
export function canListen(): boolean {
  if (native()) return micGranted && Capacitor.isPluginAvailable("SpeechRecognition");
  // Electron ships the webkitSpeechRecognition object, but it has no speech service behind it.
  if ((window as unknown as { kiddosDesktop?: unknown }).kiddosDesktop) return false;
  return Recognition() !== null;
}

export interface ListenHandle {
  stop(): void;
}

export interface ListenOptions {
  lang?: string;
  onInterim?: (text: string) => void;
  onLevel?: (level: number) => void;
  onFinal: (text: string) => void;
  onError?: (msg: string) => void;
  onEnd?: () => void;
}

const MSG_MIC = "I can't hear you. Ask a grown-up to allow the microphone.";
const MSG_UNSUPPORTED = "Talking isn't supported in this browser. You can type instead!";
const MSG_RETRY = "Oops, I didn't catch that. Try again!";

// Every open microphone, so leaving the app can close them all (cancel drops anything half-heard).
const active = new Set<{ cancel(): void }>();
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") [...active].forEach((a) => a.cancel());
  });
  window.addEventListener("kiddos:inactive", () => [...active].forEach((a) => a.cancel()));
}

export function listen(opts: ListenOptions): ListenHandle {
  return native() ? listenNative(opts) : listenWeb(opts);
}

function listenWeb(opts: ListenOptions): ListenHandle {
  const R = Recognition();
  let stream: MediaStream | null = null;
  let ctx: AudioContext | null = null;
  let raf = 0;
  let ended = false;
  let cancelled = false;

  const cleanup = () => {
    if (ended) return;
    ended = true;
    active.delete(entry);
    cancelAnimationFrame(raf);
    stream?.getTracks().forEach((t) => t.stop());
    void ctx?.close();
    opts.onLevel?.(0);
    opts.onEnd?.();
  };
  const entry = {
    cancel: () => {
      cancelled = true;
      try {
        rec?.abort();
      } catch {}
      cleanup();
    },
  };

  if (!R || !canListen()) {
    opts.onError?.(MSG_UNSUPPORTED);
    cleanup();
    return { stop: cleanup };
  }
  active.add(entry);

  // Microphone level meter for the waveform bar (only once we know recognition is possible).
  navigator.mediaDevices
    ?.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } })
    .then((s) => {
      if (ended) return s.getTracks().forEach((t) => t.stop());
      stream = s;
      ctx = new AudioContext();
      const an = ctx.createAnalyser();
      an.fftSize = 256;
      ctx.createMediaStreamSource(s).connect(an);
      const buf = new Uint8Array(an.fftSize);
      const tick = () => {
        an.getByteTimeDomainData(buf);
        let sum = 0;
        for (const v of buf) sum += ((v - 128) / 128) ** 2;
        opts.onLevel?.(Math.min(1, Math.sqrt(sum / buf.length) * 6));
        raf = requestAnimationFrame(tick);
      };
      tick();
    })
    .catch(() => opts.onError?.(MSG_MIC));

  const rec: RecognitionLike = new R();
  rec.lang = opts.lang ?? "en-US";
  rec.interimResults = true;
  rec.continuous = false;
  rec.maxAlternatives = 1;
  let finalText = "";
  rec.onresult = (e) => {
    let interim = "";
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const r = e.results[i];
      if (r.isFinal) finalText += r[0].transcript;
      else interim += r[0].transcript;
    }
    opts.onInterim?.((finalText + interim).trim());
  };
  rec.onerror = (e) => {
    if (e.error !== "no-speech" && e.error !== "aborted") opts.onError?.(MSG_RETRY);
  };
  rec.onend = () => {
    if (!cancelled && finalText.trim()) opts.onFinal(finalText.trim());
    cleanup();
  };
  rec.start();
  return {
    stop: () => {
      try {
        rec.stop();
      } catch {
        cleanup();
      }
    },
  };
}

// Native recognizer. No getUserMedia here: it would fight the recognizer for the mic,
// and on iOS it switches the sound to the earpiece.
function listenNative(opts: ListenOptions): ListenHandle {
  let ended = false;
  let heard = "";
  let level = 0;
  let raf = 0;
  let quietTimer = 0;
  const handles: PluginListenerHandle[] = [];
  let startedAt = 0;

  const finish = (deliver: boolean) => {
    if (ended) return;
    ended = true;
    active.delete(entry);
    cancelAnimationFrame(raf);
    clearTimeout(quietTimer);
    handles.forEach((h) => void h.remove());
    SpeechRecognition.stop().catch(() => {});
    if (deliver && heard.trim()) opts.onFinal(heard.trim());
    opts.onLevel?.(0);
    opts.onEnd?.();
  };
  const entry = { cancel: () => finish(false) };
  active.add(entry);

  // No raw audio on native: the waveform jumps when words arrive and settles in between.
  const pulse = () => {
    level *= 0.92;
    opts.onLevel?.(Math.max(level, 0.08 + 0.05 * Math.sin(performance.now() / 180)));
    // The recognizer may keep going after the child stops; end after a quiet spell (or if nothing comes at all).
    const waited = performance.now() - startedAt;
    if (waited > 15_000 || (!heard && waited > 8_000)) return finish(true);
    raf = requestAnimationFrame(pulse);
  };

  void (async () => {
    try {
      // Never prompt for the microphone here, in the child's area: a grown-up allows it from the parent area.
      if (!(await refreshMicPermission())) {
        opts.onError?.(MSG_MIC);
        return finish(false);
      }
      const { available } = await SpeechRecognition.available();
      if (ended) return;
      if (!available) {
        opts.onError?.(MSG_UNSUPPORTED);
        return finish(false);
      }
      // A previous session may still be closing; iOS refuses to start while one is running. Stop it before
      // listening for state changes, so its "stopped" can't end this session.
      if ((await SpeechRecognition.isListening().catch(() => ({ listening: false }))).listening) {
        await SpeechRecognition.stop().catch(() => {});
      }
      if (ended) return;
      let started = false;
      handles.push(
        await SpeechRecognition.addListener("partialResults", (d) => {
          const text = d.matches?.[0] ?? "";
          if (ended || !text) return;
          heard = text;
          level = 0.85;
          opts.onInterim?.(heard.trim());
          clearTimeout(quietTimer);
          quietTimer = window.setTimeout(() => finish(true), 1800);
        }),
        await SpeechRecognition.addListener("listeningState", (d) => {
          if (d.status === "started") started = true;
          else if (d.status === "stopped" && started) finish(true);
        }),
      );
      if (ended) return handles.forEach((h) => void h.remove());
      startedAt = performance.now();
      pulse();
      const res = await SpeechRecognition.start({
        language: opts.lang ?? "en-US",
        maxResults: 1,
        partialResults: true,
        popup: false,
      });
      if (res?.matches?.[0]) heard = res.matches[0];
    } catch (e) {
      if (ended) return;
      // "No match" / "no speech" just means silence, like the web's no-speech: end quietly.
      const msg = String((e as { message?: string })?.message ?? e);
      if (!heard && !/match|speech|timeout|7|6/i.test(msg)) opts.onError?.(MSG_RETRY);
      finish(true);
    }
  })();

  return { stop: () => finish(true) };
}
