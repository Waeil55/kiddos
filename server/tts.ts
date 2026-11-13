// Human-sounding AI voices, as fast as possible. The server proxies a neural TTS provider (so keys
// never reach the app) and streams the audio to the app as it is made, so playback starts on the
// first bytes instead of after the whole clip. Responds 204 when no provider is configured (the app
// then uses the most natural voice installed on the device).
import type { Response as ExpressResponse } from "express";
import { characterById } from "../src/shared/characters.js";
import { Agent, setGlobalDispatcher } from "undici";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Keep connections to the voice service open between sentences: a fresh secure connection costs
// 0.3-0.7 s, and Node normally drops idle ones after 4 s, which a child's pause easily exceeds.
setGlobalDispatcher(new Agent({ keepAliveTimeout: 120_000, keepAliveMaxTimeout: 600_000, connections: 16 }));

// The Azure portal shows KEY 1 and KEY 2; either works.
const azureKey = () => process.env.AZURE_SPEECH_KEY || process.env.AZURE_SPEECH_KEY1 || process.env.AZURE_SPEECH_KEY2 || "";

type Provider = "openai" | "supabase" | "elevenlabs" | "azure" | "none";

// "auto" picks the cheapest fast human voice that has a key: Azure (free tier), OpenAI direct,
// OpenAI through the Supabase function (deploy/setup-voice.mjs), then ElevenLabs.
export function ttsProvider(): Provider {
  const want = (process.env.TTS_PROVIDER || "auto").toLowerCase();
  if ((want === "auto" || want === "azure") && azureKey()) return "azure";
  if ((want === "auto" || want === "openai") && process.env.OPENAI_API_KEY) return "openai";
  if ((want === "auto" || want === "supabase") && process.env.KIDDOS_TTS_URL && process.env.KIDDOS_TTS_TOKEN) return "supabase";
  if ((want === "auto" || want === "elevenlabs") && process.env.ELEVENLABS_API_KEY) return "elevenlabs";
  return "none";
}

// Clips are also saved on disk, so lines every child hears (praise, "Hmm, let me think!", questions)
// are made once and never use the voice service (or its free monthly allowance) again.
const diskDir = process.env.KIDDOS_VOICE_CACHE || path.join(os.tmpdir(), "kiddos-voice-cache");
try {
  fs.mkdirSync(diskDir, { recursive: true });
} catch {}
// Clips are kept for 30 days at most (the privacy policy promises this).
const MAX_AGE_MS = 30 * 24 * 3600_000;
function pruneDisk() {
  try {
    const now = Date.now();
    for (const f of fs.readdirSync(diskDir)) {
      const p = path.join(diskDir, f);
      if (now - fs.statSync(p).mtimeMs > MAX_AGE_MS) fs.unlinkSync(p);
    }
  } catch {}
}
pruneDisk();
setInterval(pruneDisk, 6 * 3600_000).unref();
const diskPath = (key: string) => path.join(diskDir, `${createHash("sha1").update(key).digest("hex")}.mp3`);

// Lessons repeat phrases a lot, so finished clips are kept in memory.
const cache = new Map<string, Buffer>();
const MAX_CACHE = 600;

function remember(key: string, buf: Buffer) {
  if (cache.size >= MAX_CACHE) cache.delete(cache.keys().next().value as string);
  cache.set(key, buf);
}

const escapeXml = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

// A different OpenAI voice for each buddy.
const OPENAI_VOICES: Record<string, string> = {
  bao: "coral", leo: "ash", ruby: "nova", ollie: "fable", pip: "verse",
  bella: "shimmer", momo: "ballad", kiki: "sage", rex: "onyx", ella: "alloy",
};

function elevenLabs(characterId: string, text: string) {
  const c = characterById(characterId);
  const voiceId = process.env[`ELEVENLABS_VOICE_${c.id.toUpperCase()}`] || c.voice.elevenLabsId;
  // Flash is ElevenLabs' fastest model (about 75 ms); the streaming endpoint sends audio as it is made.
  return fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream?output_format=mp3_44100_64&optimize_streaming_latency=3`, {
    method: "POST",
    headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY!, "Content-Type": "application/json", Accept: "audio/mpeg" },
    body: JSON.stringify({
      text,
      model_id: process.env.ELEVENLABS_MODEL || "eleven_flash_v2_5",
      voice_settings: { stability: 0.4, similarity_boost: 0.8, style: 0.35, use_speaker_boost: true },
    }),
  });
}

const instructionsFor = (characterId: string) => {
  const c = characterById(characterId);
  return `You are ${c.name} the ${c.species}, ${c.persona} Speak to a young child like a real, warm, lively teacher: natural, expressive and smiling, at a brisk, friendly pace. Never sound robotic.`;
};

function supabase(characterId: string, text: string) {
  const c = characterById(characterId);
  return fetch(process.env.KIDDOS_TTS_URL!, {
    method: "POST",
    headers: { "x-kiddos-token": process.env.KIDDOS_TTS_TOKEN!, "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      voice: process.env[`OPENAI_VOICE_${c.id.toUpperCase()}`] || OPENAI_VOICES[c.id] || "coral",
      instructions: instructionsFor(characterId),
      model: process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts",
    }),
  });
}

function openai(characterId: string, text: string) {
  const c = characterById(characterId);
  const model = process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts";
  return fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      voice: process.env[`OPENAI_VOICE_${c.id.toUpperCase()}`] || OPENAI_VOICES[c.id] || "coral",
      input: text,
      response_format: "mp3",
      // gpt-4o-mini-tts can be told how to sound; older tts-1 models ignore this.
      ...(model.startsWith("gpt-") && { instructions: instructionsFor(characterId) }),
    }),
  });
}

function azure(characterId: string, text: string, speed: number) {
  const c = characterById(characterId);
  const region = process.env.AZURE_SPEECH_REGION || "eastus";
  // Speed is made here by the voice itself: stretching audio in the player makes it warble. Pitch is left
  // alone, because shifting a neural voice makes it sound artificial.
  const percent = Math.round((c.voice.rate - 1) * 60 + 5 + (speed - 1) * 100);
  const rate = `${percent >= 0 ? "+" : ""}${percent}%`;
  const voice = process.env[`AZURE_VOICE_${c.id.toUpperCase()}`] || c.voice.azure;
  const body = `<prosody rate="${rate}">${escapeXml(text)}</prosody>`;
  // The Multilingual voices (Ava, Andrew, Emma, Brian) are the most human; they don't take speaking styles.
  const styled = /Multilingual/.test(voice) ? body : `<mstts:express-as style="${c.voice.azureStyle}">${body}</mstts:express-as>`;
  const ssml = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US"><voice name="${voice}">${styled}</voice></speak>`;
  return fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": azureKey(),
      "Content-Type": "application/ssml+xml",
      "X-Microsoft-OutputFormat": "audio-24khz-48kbitrate-mono-mp3",
      "User-Agent": "kiddos",
    },
    body: ssml,
  });
}

/**
 * Speaks `text` as the character into the HTTP response, streaming audio/mpeg as it arrives.
 * Returns false (nothing sent) when no provider is configured.
 */
// When a provider says no (free quota used up, bad key), rest it for a while so the app moves
// straight to the device voice instead of waiting on a failing call for every sentence.
let restingUntil = 0;

// A private line (one that contains the child's name) is spoken but never kept: it skips both the
// memory cache and the disk cache.
export async function streamSpeech(characterId: string, text: string, res: ExpressResponse, speed = 1, isPrivate = false): Promise<boolean> {
  const provider = ttsProvider();
  if (provider === "none" || Date.now() < restingUntil) return false;
  const clean = text.slice(0, 600);
  const rate = Number.isFinite(speed) ? Math.min(1.5, Math.max(0.5, Math.round(speed * 100) / 100)) : 1;
  const key = `v2:${provider}:${characterId}:${rate}:${clean}`;
  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Cache-Control", isPrivate ? "no-store" : "private, max-age=86400");
  let hit = isPrivate ? undefined : cache.get(key);
  if (!hit && !isPrivate) {
    try {
      hit = fs.readFileSync(diskPath(key));
      remember(key, hit);
    } catch {}
  }
  if (hit) {
    res.end(hit);
    return true;
  }
  const make = { openai, supabase, elevenlabs: elevenLabs, azure }[provider];
  const upstream = await make(characterId, clean, rate);
  // Busy (the free tier allows about 20 requests a minute): rest briefly. Bad key or quota used up: rest longer.
  if (upstream.status === 429) restingUntil = Date.now() + 15_000;
  if (upstream.status === 401 || upstream.status === 403) restingUntil = Date.now() + 10 * 60_000;
  if (!upstream.ok || !upstream.body) throw new Error(`${provider} TTS ${upstream.status}: ${await upstream.text()}`);
  res.flushHeaders();
  const parts: Buffer[] = [];
  const reader = upstream.body.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = Buffer.from(value);
    parts.push(chunk);
    res.write(chunk);
  }
  res.end();
  if (isPrivate) return true;
  const audio = Buffer.concat(parts);
  remember(key, audio);
  fs.writeFile(diskPath(key), audio, () => {});
  return true;
}

/** Opens the connection to the voice service before the first sentence and keeps it warm. */
export function warmVoice() {
  const ping = () => {
    const p = ttsProvider();
    const url =
      p === "azure" ? `https://${process.env.AZURE_SPEECH_REGION || "eastus"}.tts.speech.microsoft.com/cognitiveservices/v1`
      : p === "openai" ? "https://api.openai.com/v1/models"
      : p === "elevenlabs" ? "https://api.elevenlabs.io/v1/models"
      : p === "supabase" ? process.env.KIDDOS_TTS_URL
      : null;
    // A bodiless request: costs no characters, just keeps the secure connection open.
    if (url) fetch(url, { method: "HEAD" }).then((r) => r.arrayBuffer()).catch(() => {});
  };
  ping();
  setInterval(ping, 50_000).unref();
}
