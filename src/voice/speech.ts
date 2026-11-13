// Voice engine: neural human voices from the server when configured, otherwise the most
// natural voice on the device. Drives the buddy's lip-sync and word-by-word captions.
// On phones (Capacitor) the device voice comes from the native text-to-speech plugin.
import { Capacitor } from "@capacitor/core";
import { QueueStrategy, TextToSpeech } from "@capacitor-community/text-to-speech";
import { characterById } from "../shared/characters";
import { apiBase, apiHeaders } from "../api";

const native = () => Capacitor.isNativePlatform();

/** The mouth right now: how open (0..1), how wide (ee, s) and how round (oo, oh, w). */
export interface MouthShape {
  open: number;
  wide: number;
  round: number;
}
type MouthListener = (open: number, shape: MouthShape) => void;
const mouthListeners = new Set<MouthListener>();
export function onMouth(cb: MouthListener): () => void {
  mouthListeners.add(cb);
  return () => mouthListeners.delete(cb);
}
const emitMouth = (open: number, wide = 0, round = 0) => {
  const shape = { open, wide, round };
  mouthListeners.forEach((cb) => cb(open, shape));
};

// Mouth shape for a letter, so device voices (which give no audio to analyse) still show real visemes.
function letterShape(ch: string): MouthShape {
  if ("ouwq".includes(ch)) return { open: 0.55, wide: 0, round: 1 };
  if ("eiyszcx".includes(ch)) return { open: 0.4, wide: 1, round: 0 };
  if ("a".includes(ch)) return { open: 0.95, wide: 0.3, round: 0 };
  if ("mbp".includes(ch)) return { open: 0.04, wide: 0.2, round: 0 };
  if ("fv".includes(ch)) return { open: 0.18, wide: 0.6, round: 0 };
  if ("lnt dkgrhj".includes(ch)) return { open: 0.35, wide: 0.35, round: 0 };
  return { open: 0.3, wide: 0.2, round: 0 };
}

// Eases the mouth toward the shape of the letter being said, walking through the word at a steady pace.
function easeMouth(cur: MouthShape, word: string, sinceMs: number, lettersPerSec: number) {
  const letters = word.toLowerCase().replace(/[^a-z]/g, "");
  const k = Math.floor((sinceMs / 1000) * lettersPerSec);
  const goal = k < letters.length ? letterShape(letters[k]) : { open: 0.08, wide: 0.1, round: 0 };
  cur.open += (goal.open - cur.open) * 0.45;
  cur.wide += (goal.wide - cur.wide) * 0.35;
  cur.round += (goal.round - cur.round) * 0.35;
  emitMouth(Math.min(1, cur.open), cur.wide, cur.round);
}

export interface SpeakOptions {
  characterId: string;
  /** Called with the index of the word currently being spoken. */
  onWord?: (index: number) => void;
  volume?: number;
  /** Multiplies the character's speaking rate (parents can slow voices down). */
  rate?: number;
}

// Parents can turn the cloud voice off; then only the device voice is used and no text leaves the device for speech.
let cloudVoice = true;
export function setCloudVoice(on: boolean) {
  cloudVoice = on;
}

// Lines with these words (the child's name) are marked private, so the server never caches their audio.
let privateWords: RegExp | null = null;
export function setPrivateWords(words: string[]) {
  const old = privateWords;
  const list = words.map((w) => w.trim()).filter(Boolean);
  const escaped = list.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  // No lookbehind: iOS before 16.4 cannot parse it, and a bad pattern must never stop the app.
  try {
    privateWords = list.length ? new RegExp(`(^|[^\\p{L}\\p{N}])(?:${escaped.join("|")})(?=$|[^\\p{L}\\p{N}])`, "iu") : null;
  } catch {
    privateWords = list.length ? /[\s\S]/ : null; // treat every line as private
  }
  // Forget clips of the previous child's name.
  if (old) for (const k of [...clips.keys()]) if (old.test(k)) clips.delete(k);
}
const isPrivate = (text: string) => !!privateWords?.test(text);

// A slow network must not leave the buddy silent: give up after a few seconds and use the device voice.
function timeoutSignal(ms: number): AbortSignal {
  if (typeof AbortSignal.timeout === "function") return AbortSignal.timeout(ms);
  const c = new AbortController(); // iOS 15 has no AbortSignal.timeout
  setTimeout(() => c.abort(), ms);
  return c.signal;
}

let serverVoice: "unknown" | "yes" | "no" = "unknown";
// When the server has no voice to give (no key, or the provider is resting), use the device voice for a while, then ask again.
let voiceOffUntil = 0;
let currentSource: AudioBufferSourceNode | null = null;
let rafId = 0;
let cancelToken = 0;

// One audio engine for the whole app. "playback" asks for a larger output buffer, so a busy page can't make the voice crackle.
let audioCtx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let output: GainNode | null = null;
function engine() {
  if (!audioCtx || !analyser || !output) {
    audioCtx = new AudioContext({ latencyHint: "playback" });
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;
    output = audioCtx.createGain();
    analyser.connect(output);
    output.connect(audioCtx.destination);
  }
  return { ctx: audioCtx, analyser, output };
}

// iOS 17+: a "playback" audio session keeps the buddy audible when the ring/silent switch is on silent.
try {
  const session = (navigator as unknown as { audioSession?: { type: string } }).audioSession;
  if (session) session.type = "playback";
} catch {}

// Browsers only allow sound after a tap, and phones may suspend audio at any time. Each tap makes sure the engine is running.
if (typeof window !== "undefined") {
  const unlock = () => {
    const { ctx } = engine();
    if (ctx.state !== "running") void ctx.resume();
  };
  for (const ev of ["pointerdown", "touchend", "keydown"]) window.addEventListener(ev, unlock, { passive: true });
}

export function stopSpeaking() {
  cancelToken++;
  cancelAnimationFrame(rafId);
  try {
    currentSource?.stop();
  } catch {}
  currentSource = null;
  if (native()) TextToSpeech.stop().catch(() => {});
  else if ("speechSynthesis" in window) speechSynthesis.cancel();
  emitMouth(0);
}

// Going to the background (home button, lock screen, another tab) silences the buddy.
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") stopSpeaking();
  });
  // The phone app also sends this on an incoming call or Control Center, while the page still counts as visible.
  window.addEventListener("kiddos:inactive", () => stopSpeaking());
}

/** Splits text into the words the caption highlights. */
export const speechWords = (text: string) => text.split(/\s+/).filter(Boolean);

function wordTimeline(text: string, duration: number): number[] {
  // Longer words and punctuation pauses take longer; good enough to keep captions in sync.
  const words = speechWords(text);
  const weights = words.map((w) => w.replace(/[^a-z0-9]/gi, "").length + 2 + (/[,.!?]$/.test(w) ? 4 : 0));
  const total = weights.reduce((a, b) => a + b, 0) || 1;
  let acc = 0;
  return weights.map((w) => {
    const start = (acc / total) * duration;
    acc += w;
    return start;
  });
}

// Audio clips already made (or being made), by voice, speed and text, so repeated lines play instantly.
// A clip is fully decoded before it plays, so the network can never make the voice stutter.
const clips = new Map<string, Promise<AudioBuffer | null>>();
function fetchClip(characterId: string, text: string, rate: number): Promise<AudioBuffer | null> {
  const key = `${characterId}|${rate}|${text}`;
  const hit = clips.get(key);
  if (hit) return hit;
  const priv = isPrivate(text);
  const clip = fetch(`${apiBase()}/api/tts`, {
    method: "POST",
    headers: apiHeaders(),
    body: JSON.stringify(priv ? { characterId, text, rate, private: true } : { characterId, text, rate }),
    signal: timeoutSignal(6000),
  })
    .then(async (res) => {
      if (res.status === 204) {
        serverVoice = "no";
        voiceOffUntil = Date.now() + 30_000;
      }
      if (!res.ok || res.status === 204) return null;
      const audio = await engine().ctx.decodeAudioData(await res.arrayBuffer());
      serverVoice = "yes";
      return audio;
    })
    .catch(() => null)
    .then((audio) => {
      if (!audio) clips.delete(key);
      return audio;
    });
  clips.set(key, clip);
  if (clips.size > 150) clips.delete(clips.keys().next().value as string);
  return clip;
}

/**
 * Splits speech into at most two requests: the first sentence (short, so the voice starts fast)
 * and everything after it, made while the first one plays. Few requests keep within free-tier limits.
 */
export function sentences(text: string): string[] {
  const parts = text.match(/[^.!?]+[.!?]+["')]*|[^.!?]+$/g)?.map((x) => x.trim()).filter(Boolean) ?? [text];
  let first = parts.shift() ?? "";
  // A tiny opener ("Hi!", "Wow!") is joined to the next sentence so it doesn't sound clipped.
  while (parts.length && first.split(/\s+/).length < 3) first += ` ${parts.shift()}`;
  return parts.length ? [first, parts.join(" ")] : [first];
}

/** Starts making a line's audio ahead of time (for example while the buddy is still thinking). */
export function prefetchSpeech(characterId: string, text: string) {
  if (!cloudVoice || Date.now() < voiceOffUntil) return;
  for (const s of sentences(text)) void fetchClip(characterId, s, 1);
}

function playClip(audio: AudioBuffer, text: string, wordOffset: number, opts: SpeakOptions, token: number): Promise<void> {
  const { ctx, analyser: an, output: out } = engine();
  out.gain.value = opts.volume ?? 1;
  const source = ctx.createBufferSource();
  source.buffer = audio;
  source.connect(an);
  currentSource = source;
  const buf = new Uint8Array(an.fftSize);
  const freq = new Uint8Array(an.frequencyBinCount);
  const binHz = ctx.sampleRate / an.fftSize;
  const timeline = wordTimeline(text, audio.duration);
  const startAt = ctx.currentTime + 0.02;

  return new Promise<void>((resolve) => {
    let lastWord = -1;
    let smooth = 0;
    let wide = 0;
    let round = 0;
    const tick = () => {
      if (token !== cancelToken) return;
      an.getByteTimeDomainData(buf);
      an.getByteFrequencyData(freq);
      let sum = 0;
      let cross = 0;
      for (let i = 0; i < buf.length; i++) {
        sum += ((buf[i] - 128) / 128) ** 2;
        if (i && (buf[i] >= 128) !== (buf[i - 1] >= 128)) cross++;
      }
      const rms = Math.sqrt(sum / buf.length);
      smooth = smooth * 0.55 + Math.min(1, rms * 5.5) * 0.45;
      // Shape from the sound: hissy, bright sounds (ee, s) cross zero often and widen the mouth;
      // sounds with most energy under ~500 Hz (oo, oh, w) round it.
      let low = 0;
      let all = 0;
      for (let i = 0; i < freq.length; i++) {
        all += freq[i];
        if (i * binHz < 500) low += freq[i];
      }
      const zcr = cross / buf.length;
      const lowShare = all ? low / all : 0;
      const talking = smooth > 0.06 ? 1 : 0;
      wide = wide * 0.65 + Math.min(1, Math.max(0, (zcr - 0.05) * 9)) * talking * 0.35;
      round = round * 0.65 + Math.min(1, Math.max(0, (lowShare - 0.35) * 3)) * Math.max(0, 1 - zcr * 10) * talking * 0.35;
      emitMouth(smooth, wide, round);
      const now = ctx.currentTime - startAt;
      let i = timeline.findIndex((t) => t > now) - 1;
      if (i === -2) i = timeline.length - 1;
      if (i >= 0 && i !== lastWord) opts.onWord?.(wordOffset + (lastWord = i));
      rafId = requestAnimationFrame(tick);
    };
    source.onended = () => {
      source.disconnect();
      if (currentSource === source) currentSource = null;
      if (token === cancelToken) {
        cancelAnimationFrame(rafId);
        emitMouth(0);
      }
      resolve();
    };
    source.start(startAt);
    tick();
  });
}

async function speakWithServer(text: string, opts: SpeakOptions, token: number): Promise<boolean> {
  if (!cloudVoice || Date.now() < voiceOffUntil) return false;
  const { ctx } = engine();
  if (ctx.state !== "running") {
    // Not unlocked by a tap yet: don't wait on it, the device voice can still try.
    await Promise.race([ctx.resume(), new Promise((r) => setTimeout(r, 300))]);
    if (token !== cancelToken) return true;
    if ((ctx.state as string) !== "running") return false;
  }
  // Ask for every part at once; play them in order.
  const parts = sentences(text);
  const rate = Math.round((opts.rate ?? 1) * 100) / 100;
  const pending = parts.map((p) => fetchClip(opts.characterId, p, rate));
  let offset = 0;
  for (let i = 0; i < parts.length; i++) {
    const audio = await pending[i];
    if (token !== cancelToken) return true;
    if (!audio) {
      if (i === 0) return false;
      // A later part failed: say the rest with the device voice rather than stopping.
      await speakWithDevice(parts.slice(i).join(" "), { ...opts, onWord: (w) => opts.onWord?.(offset + w) }, token);
      return true;
    }
    await playClip(audio, parts[i], offset, opts, token);
    if (token !== cancelToken) return true;
    offset += speechWords(parts[i]).length;
  }
  return true;
}

// ---------- Device voices ----------

const FEMALE = /aria|jenny|ana\b|michelle|sara|samantha|zira|ava|allison|susan|victoria|karen|moira|tessa|serena|libby|sonia|emma|female|woman|girl|natasha|clara|nova|shimmer/i;
const MALE = /guy|davis|brandon|tony|jason|christopher|eric|andrew|daniel|alex|fred|tom|aaron|arthur|ryan|thomas|oliver|male|man|boy|roger|brian|steffan/i;

function voiceScore(v: SpeechSynthesisVoice, gender: "female" | "male", lang: string): number {
  let s = 0;
  if (v.lang?.toLowerCase().startsWith(lang.toLowerCase().slice(0, 2))) s += 50;
  if (/natural/i.test(v.name)) s += 40; // Microsoft Edge neural "Online (Natural)" voices: very human
  if (/neural|premium|enhanced|siri/i.test(v.name)) s += 30; // Apple premium / enhanced voices
  if (/google/i.test(v.name)) s += 15;
  if (v.localService === false) s += 5;
  if (gender === "female" ? FEMALE.test(v.name) : MALE.test(v.name)) s += 20;
  if (/compact|espeak|robot/i.test(v.name)) s -= 40;
  return s;
}

let voicesReady: Promise<SpeechSynthesisVoice[]> | null = null;
function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  voicesReady ??= new Promise((resolve) => {
    const have = speechSynthesis.getVoices();
    if (have.length) return resolve(have);
    speechSynthesis.onvoiceschanged = () => resolve(speechSynthesis.getVoices());
    setTimeout(() => resolve(speechSynthesis.getVoices()), 1500);
  });
  return voicesReady;
}

export async function bestDeviceVoice(characterId: string, lang = "en-US") {
  if (!("speechSynthesis" in window)) return null;
  const c = characterById(characterId);
  const voices = await loadVoices();
  return [...voices].sort((a, b) => voiceScore(b, c.voice.gender, lang) - voiceScore(a, c.voice.gender, lang))[0] ?? null;
}

async function speakWithDevice(text: string, opts: SpeakOptions, token: number): Promise<void> {
  if (native()) return speakWithNative(text, opts, token);
  if (!("speechSynthesis" in window)) return;
  const c = characterById(opts.characterId);
  const voice = await bestDeviceVoice(opts.characterId);
  const natural = voice && /natural|neural|premium|enhanced/i.test(voice.name);
  const u = new SpeechSynthesisUtterance(text);
  if (voice) u.voice = voice;
  // Neural voices already sound human; only nudge them. Older voices get more character tuning.
  u.pitch = natural ? 1 + (c.voice.pitch - 1) * 0.5 : c.voice.pitch;
  u.rate = (natural ? 1 + (c.voice.rate - 1) * 0.5 : c.voice.rate) * (opts.rate ?? 1);
  u.volume = opts.volume ?? 1;

  const words = speechWords(text);
  const starts: number[] = [];
  let pos = 0;
  for (const w of words) {
    const i = text.indexOf(w, pos);
    starts.push(i);
    pos = i + w.length;
  }

  return new Promise<void>((resolve) => {
    let speaking = false;
    let word = words[0] ?? "";
    let wordAt = performance.now();
    const cur = { open: 0, wide: 0, round: 0 };
    const lettersPerSec = 13 * (u.rate || 1);
    const tick = () => {
      if (token !== cancelToken) return;
      // Walk through the letters of the word being spoken and ease the mouth toward each one's shape.
      if (speaking) easeMouth(cur, word, performance.now() - wordAt, lettersPerSec);
      rafId = requestAnimationFrame(tick);
    };
    u.onstart = () => {
      speaking = true;
      opts.onWord?.(0);
      tick();
    };
    u.onboundary = (e) => {
      if (e.name && e.name !== "word") return;
      let idx = starts.findIndex((s) => s > e.charIndex) - 1;
      if (idx < -1) idx = starts.length - 1;
      if (idx === -2) idx = starts.length - 1;
      if (idx >= 0) {
        word = words[idx];
        wordAt = performance.now();
        opts.onWord?.(idx);
      }
    };
    const done = () => {
      speaking = false;
      cancelAnimationFrame(rafId);
      emitMouth(0);
      resolve();
    };
    u.onend = done;
    u.onerror = done;
    speechSynthesis.speak(u);
    // Safety net: some engines never fire onend.
    setTimeout(() => token === cancelToken && speaking && done(), 1500 + text.length * 120);
  });
}

// Native text-to-speech (the Android WebView has no speechSynthesis). It reports no word timing,
// so captions and lip-sync follow a timeline estimated from the text length.
function speakWithNative(text: string, opts: SpeakOptions, token: number): Promise<void> {
  const c = characterById(opts.characterId);
  const rate = c.voice.rate * (opts.rate ?? 1);
  const words = speechWords(text);
  const lettersPerSec = 13 * rate;
  const duration = Math.max(0.6, text.length / (14 * rate));
  const timeline = wordTimeline(text, duration);

  return new Promise<void>((resolve) => {
    let finished = false;
    let lastWord = -1;
    const cur = { open: 0, wide: 0, round: 0 };
    const startAt = performance.now() + 150; // the engine takes a moment to begin
    const done = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(rafId);
      if (token === cancelToken) emitMouth(0);
      resolve();
    };
    const tick = () => {
      if (finished) return;
      if (token !== cancelToken) return done();
      const now = (performance.now() - startAt) / 1000;
      if (now >= 0) {
        let i = timeline.findIndex((t) => t > now) - 1;
        if (i === -2) i = timeline.length - 1;
        if (i >= 0 && i !== lastWord) opts.onWord?.((lastWord = i));
        if (i >= 0) easeMouth(cur, words[i], (now - timeline[i]) * 1000, lettersPerSec);
      }
      rafId = requestAnimationFrame(tick);
    };
    TextToSpeech.speak({
      text,
      lang: "en-US",
      rate,
      pitch: c.voice.pitch,
      volume: opts.volume ?? 1,
      category: "playback", // iOS: play even with the silent switch on
      queueStrategy: QueueStrategy.Flush,
    }).then(done, done);
    tick();
    // Safety net: stopping may leave the plugin's promise unsettled.
    setTimeout(done, 3000 + duration * 2000);
  });
}

/** Speaks as the given character. Resolves when finished or interrupted. */
export async function speak(text: string, opts: SpeakOptions): Promise<void> {
  stopSpeaking();
  const token = cancelToken;
  const clean = text.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "").trim();
  if (!clean) return;
  const usedServer = await speakWithServer(clean, opts, token);
  if (!usedServer && token === cancelToken) await speakWithDevice(clean, opts, token);
}

export function voiceSourceLabel(): string {
  return cloudVoice && serverVoice === "yes" ? "Studio neural voices" : "Device natural voices";
}
