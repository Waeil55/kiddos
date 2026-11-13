// App state: the parent account, kid profiles, progress and settings.
// Persisted on the device; every platform build uses the same store.
import { Capacitor } from "@capacitor/core";
import { Preferences } from "@capacitor/preferences";
import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import { BADGES } from "./shared/content";
import { SKILLS, type Passage, type Skill } from "./shared/passages/types";
import type { Subject } from "./shared/types";

export interface SessionLog {
  date: string; // YYYY-MM-DD
  subject: Subject | "story" | "game";
  seconds: number;
  correct: number;
  total: number;
}

/** Best and latest result on one reading comprehension passage. */
export interface ReadingResult {
  score: number;
  total: number;
  best: number;
  attempts: number;
  date: string;
  /** Per question: the skill and whether it was right on the latest attempt. */
  answers: { skill: Skill; ok: boolean }[];
}

export interface Kid {
  id: string;
  name: string;
  age: number;
  grade: string;
  buddyId: string;
  interests: string[];
  color: string;
  levels: Record<string, number>;
  stars: number;
  streak: number;
  lastActiveDay: string;
  badges: string[];
  dailyLimitMin: number;
  enabledSubjects: Subject[];
  log: SessionLog[];
  createdAt: number;
  /** Reading comprehension results by passage id (missing on profiles made before this feature). */
  reading?: Record<string, ReadingResult>;
  /** Extra passages written by the AI story maker for this child. */
  myPassages?: Passage[];
}

export interface Parent {
  name: string;
  /** No longer asked for; kept optional so old saved accounts still load. */
  email?: string;
  pinHash: string;
  createdAt: number;
}

export interface Settings {
  volume: number;
  voiceRate: number;
  subtitles: boolean;
  language: string;
  bedtimeStart: string;
  bedtimeEnd: string;
  bedtimeLock: boolean;
  /** AI tutor and AI stories (sends lesson text to Anthropic). Off until a parent agrees to the disclosure. */
  aiTutor: boolean;
  /** Studio voices made by the server's cloud voice service; off means the device voice only. */
  cloudVoice: boolean;
}

interface AppState {
  parent: Parent | null;
  kids: Kid[];
  activeKidId: string | null;
  settings: Settings;
  parentUnlocked: boolean;
  /** Wrong parent PINs in a row, and when the PIN pad unlocks again (ms epoch, 0 for not locked). */
  pinFails: number;
  pinLockUntil: number;
  /** Records a wrong PIN; returns true when that locked the pad. */
  pinFailed(): boolean;
  pinReset(): void;
  setParent(p: Parent): void;
  unlockParent(on: boolean): void;
  addKid(k: Omit<Kid, "id" | "stars" | "streak" | "lastActiveDay" | "badges" | "log" | "createdAt" | "levels">): Kid;
  updateKid(id: string, patch: Partial<Kid>): void;
  removeKid(id: string): void;
  selectKid(id: string | null): void;
  /** Records an answer: stars, adaptive level, streak and badges. Returns newly earned badge ids. */
  recordAnswer(subject: Subject | "story" | "game", correct: boolean, stars: number): string[];
  addTime(subject: SessionLog["subject"], seconds: number): void;
  saveReading(passageId: string, answers: ReadingResult["answers"]): void;
  addPassage(p: Passage): void;
  setSettings(p: Partial<Settings>): void;
  resetAll(): void;
}

export const ALL_SUBJECTS: Subject[] = ["reading", "phonics", "math", "spelling", "science", "world", "feelings", "free"];
const today = () => new Date().toISOString().slice(0, 10);

export async function hashPin(pin: string): Promise<string> {
  const data = new TextEncoder().encode(`kiddos:${pin}`);
  if (crypto?.subtle) {
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  return btoa(`kiddos:${pin}`);
}

function logFor(kid: Kid, subject: SessionLog["subject"]): SessionLog[] {
  const d = today();
  const log = kid.log.map((l) => ({ ...l }));
  let entry = log.find((l) => l.date === d && l.subject === subject);
  if (!entry) {
    entry = { date: d, subject, seconds: 0, correct: 0, total: 0 };
    log.push(entry);
  }
  return log.slice(-400);
}

const defaults: Settings = {
  volume: 1,
  voiceRate: 1,
  subtitles: true,
  language: "English",
  bedtimeStart: "20:30",
  bedtimeEnd: "07:00",
  bedtimeLock: false,
  aiTutor: false,
  cloudVoice: true,
};

/** Wrong PINs allowed before the pad locks, and for how long. */
export const PIN_TRIES = 5;
const PIN_LOCK_MS = 60_000;

// Phone apps keep the store in Capacitor Preferences (the WebView's localStorage can be cleared by
// the OS); the web and desktop builds keep localStorage.
const nativeStorage: StateStorage = {
  getItem: async (name) => {
    const { value } = await Preferences.get({ key: name });
    if (value !== null) return value;
    // One-time move from an older build that kept everything in localStorage.
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: async (name, value) => {
    await Preferences.set({ key: name, value });
  },
  removeItem: async (name) => {
    await Preferences.remove({ key: name });
  },
};
const storage = createJSONStorage(() => (Capacitor.isNativePlatform() ? nativeStorage : localStorage));

export const useApp = create<AppState>()(
  persist(
    (set, get) => ({
      parent: null,
      kids: [],
      activeKidId: null,
      settings: defaults,
      parentUnlocked: false,
      pinFails: 0,
      pinLockUntil: 0,
      pinFailed: () => {
        const fails = get().pinFails + 1;
        const locked = fails >= PIN_TRIES;
        set({ pinFails: locked ? 0 : fails, pinLockUntil: locked ? Date.now() + PIN_LOCK_MS : get().pinLockUntil });
        return locked;
      },
      pinReset: () => set({ pinFails: 0, pinLockUntil: 0 }),
      setParent: (p) => set({ parent: p }),
      unlockParent: (on) => set({ parentUnlocked: on }),
      addKid: (k) => {
        const kid: Kid = {
          ...k,
          id: crypto.randomUUID?.() ?? String(Date.now()),
          levels: Object.fromEntries(ALL_SUBJECTS.map((s) => [s, k.age <= 5 ? 1 : k.age <= 7 ? 2 : 3])),
          stars: 0,
          streak: 0,
          lastActiveDay: "",
          badges: [],
          log: [],
          createdAt: Date.now(),
        };
        set({ kids: [...get().kids, kid] });
        return kid;
      },
      updateKid: (id, patch) => set({ kids: get().kids.map((k) => (k.id === id ? { ...k, ...patch } : k)) }),
      removeKid: (id) => set({ kids: get().kids.filter((k) => k.id !== id), activeKidId: get().activeKidId === id ? null : get().activeKidId }),
      selectKid: (id) => set({ activeKidId: id }),
      recordAnswer: (subject, correct, stars) => {
        const kid = get().kids.find((k) => k.id === get().activeKidId);
        if (!kid) return [];
        const d = today();
        const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
        const streak = kid.lastActiveDay === d ? kid.streak : kid.lastActiveDay === yesterday ? kid.streak + 1 : 1;
        const log = logFor(kid, subject);
        const entry = log.find((l) => l.date === d && l.subject === subject)!;
        Object.assign(entry, { correct: entry.correct + (correct ? 1 : 0), total: entry.total + 1 });

        // Adaptive level: look at the last answers in this subject today.
        const levels = { ...kid.levels };
        if (subject in levels && entry.total >= 4) {
          const rate = entry.correct / entry.total;
          if (rate > 0.85 && entry.total % 4 === 0) levels[subject] = Math.min(3, levels[subject] + 1);
          if (rate < 0.4 && entry.total % 4 === 0) levels[subject] = Math.max(1, levels[subject] - 1);
        }
        const total = kid.stars + stars;
        const earned = BADGES.filter((b) => total >= b.need && !kid.badges.includes(b.id)).map((b) => b.id);
        get().updateKid(kid.id, { stars: total, streak, lastActiveDay: d, log, levels, badges: [...kid.badges, ...earned] });
        return earned;
      },
      addTime: (subject, seconds) => {
        const kid = get().kids.find((k) => k.id === get().activeKidId);
        if (!kid) return;
        const log = logFor(kid, subject);
        const entry = log.find((l) => l.date === today() && l.subject === subject)!;
        entry.seconds += seconds;
        get().updateKid(kid.id, { log });
      },
      saveReading: (passageId, answers) => {
        const kid = get().kids.find((k) => k.id === get().activeKidId);
        if (!kid) return;
        const prev = kid.reading?.[passageId];
        const score = answers.filter((a) => a.ok).length;
        const result: ReadingResult = { score, total: answers.length, best: Math.max(score, prev?.best ?? 0), attempts: (prev?.attempts ?? 0) + 1, date: today(), answers };
        get().updateKid(kid.id, { reading: { ...kid.reading, [passageId]: result } });
      },
      addPassage: (p) => {
        const kid = get().kids.find((k) => k.id === get().activeKidId);
        if (!kid) return;
        get().updateKid(kid.id, { myPassages: [...(kid.myPassages ?? []), p].slice(-60) });
      },
      setSettings: (p) => set({ settings: { ...get().settings, ...p } }),
      resetAll: () => set({ parent: null, kids: [], activeKidId: null, settings: defaults, parentUnlocked: false, pinFails: 0, pinLockUntil: 0 }),
    }),
    {
      name: "kiddos-store",
      storage,
      version: 1,
      partialize: (s) => ({
        parent: s.parent,
        kids: s.kids,
        activeKidId: s.activeKidId,
        settings: s.settings,
        pinFails: s.pinFails,
        pinLockUntil: s.pinLockUntil,
      }),
      // v0 -> v1: the parent email is no longer collected, so drop any saved one.
      migrate: (persisted, version) => {
        const s = (persisted ?? {}) as Partial<AppState>;
        if (version < 1 && s.parent) {
          const { email: _email, ...parent } = s.parent;
          s.parent = parent;
        }
        return s as AppState;
      },
      // New settings fields get their defaults when older saved state lacks them.
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<AppState>;
        return { ...current, ...p, settings: { ...defaults, ...p.settings } };
      },
    }
  )
);

export const useActiveKid = () => useApp((s) => s.kids.find((k) => k.id === s.activeKidId) ?? null);

export function secondsToday(kid: Kid): number {
  const d = today();
  return kid.log.filter((l) => l.date === d).reduce((a, l) => a + l.seconds, 0);
}

export function isBedtime(s: Settings, now = new Date()): boolean {
  if (!s.bedtimeLock) return false;
  const m = now.getHours() * 60 + now.getMinutes();
  const [sh, sm] = s.bedtimeStart.split(":").map(Number);
  const [eh, em] = s.bedtimeEnd.split(":").map(Number);
  const start = sh * 60 + sm;
  const end = eh * 60 + em;
  return start > end ? m >= start || m < end : m >= start && m < end;
}

/** Short notes about a child for the AI tutor, so every lesson builds on the last ones. */
export function kidMemory(kid: Kid): string[] {
  const notes: string[] = [];
  const by: Record<string, { c: number; t: number }> = {};
  for (const l of kid.log) {
    by[l.subject] ??= { c: 0, t: 0 };
    by[l.subject].c += l.correct;
    by[l.subject].t += l.total;
  }
  const rated = Object.entries(by).filter(([, v]) => v.t >= 4).map(([k, v]) => [k, v.c / v.t] as const).sort((a, b) => b[1] - a[1]);
  if (rated[0]) notes.push(`Strongest subject so far: ${rated[0][0]} (${Math.round(rated[0][1] * 100)}% right).`);
  if (rated.length > 1 && rated[rated.length - 1][1] < 0.75) notes.push(`Needs more practice in: ${rated[rated.length - 1][0]} (${Math.round(rated[rated.length - 1][1] * 100)}% right). Go a little slower there.`);
  const skills: Record<string, { ok: number; n: number }> = {};
  for (const r of Object.values(kid.reading ?? {})) for (const a of r.answers) {
    skills[a.skill] ??= { ok: 0, n: 0 };
    skills[a.skill].n++;
    if (a.ok) skills[a.skill].ok++;
  }
  const weak = Object.entries(skills).filter(([, v]) => v.n >= 2 && v.ok / v.n < 0.7).map(([k]) => SKILLS[k as Skill]);
  if (weak.length) notes.push(`Reading comprehension skills to practice: ${weak.slice(0, 3).join(", ")}.`);
  const read = Object.keys(kid.reading ?? {}).length;
  if (read) notes.push(`Has finished ${read} reading worksheet${read > 1 ? "s" : ""}.`);
  if (kid.streak > 1) notes.push(`On a ${kid.streak}-day learning streak; mention it proudly once.`);
  if (kid.stars) notes.push(`Has ${kid.stars} stars.`);
  return notes;
}
