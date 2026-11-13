// The reading comprehension library: all passages, grouped by grade.
import { GRADE2 } from "./grade2";
import { GRADE3_A } from "./grade3a";
import { GRADE3_B } from "./grade3b";
import { GRADE3_C } from "./grade3c";
import { GRADE3_D } from "./grade3d";
import { GRADE3_E } from "./grade3e";
import type { Passage, Question } from "./types";

export * from "./types";

/** Grade 0 is kindergarten. */
export const READING_GRADES = [0, 1, 2, 3, 4, 5] as const;
export const gradeLabel = (g: number) => (g === 0 ? "Kindergarten" : `Grade ${g}`);

// Small seeded PRNG so the answer letter is spread over A-D but stays the same on every device
// (saved results refer to option indexes).
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/** Shuffles a question's options deterministically, except ordered scales like "beginning / middle / end". */
export function shuffleQuestion(question: Question, seed: string): Question {
  if (question.options.some((o) => /^at the (beginning|very end|end|very beginning)$/i.test(o) || /^in the middle$/i.test(o))) return question;
  const rnd = seeded(seed);
  const order = question.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return { ...question, options: order.map((i) => question.options[i]), answer: order.indexOf(question.answer) };
}

const prepare = (p: Passage): Passage => ({ ...p, questions: p.questions.map((qq, i) => shuffleQuestion(qq, `${p.id}#${i}`)) });

export const PASSAGES: Passage[] = [...GRADE2, ...GRADE3_A, ...GRADE3_B, ...GRADE3_C, ...GRADE3_D, ...GRADE3_E].map(prepare);

export const passagesForGrade = (grade: number, extra: Passage[] = []) => [...PASSAGES, ...extra].filter((p) => p.grade === grade);

export const findPassage = (id: string, extra: Passage[] = []) => PASSAGES.find((p) => p.id === id) ?? extra.find((p) => p.id === id);

/** Maps a profile's grade ("2nd grade", "Kindergarten", "Pre-K") to a reading grade number. */
export function gradeFromProfile(grade: string): number {
  const n = /(\d)/.exec(grade)?.[1];
  if (n) return Math.min(5, Number(n));
  return 0;
}

export const LETTERS = ["A", "B", "C", "D"];
