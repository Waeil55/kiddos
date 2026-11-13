// Reading comprehension passages: a short text followed by multiple-choice questions,
// each tagged with the reading skill it practices (used for parent reports and the AI generator).

export const SKILLS = {
  "main-idea": "Main idea",
  detail: "Key details",
  setting: "Setting",
  character: "Characters",
  sequence: "Sequence",
  "cause-effect": "Cause & effect",
  inference: "Inference",
  prediction: "Prediction",
  vocabulary: "Vocabulary",
  antonym: "Opposites",
  synonym: "Same meaning",
  phonics: "Phonics & sounds",
  "word-parts": "Prefixes & suffixes",
  grammar: "Grammar",
  "text-structure": "Text structure",
  visual: "Pictures & text",
  "author-purpose": "Author's purpose",
  genre: "Genre",
  title: "Best title",
} as const;

export type Skill = keyof typeof SKILLS;

export interface Question {
  skill: Skill;
  q: string;
  options: string[];
  /** Index of the correct option. */
  answer: number;
  /** Short kid-friendly explanation the buddy says after the answer. */
  why: string;
}

export interface Passage {
  id: string;
  grade: number;
  title: string;
  emoji: string;
  genre: "fiction" | "nonfiction" | "poem" | "letter" | "fable" | "biography" | "how-to" | "myth";
  text: string;
  questions: Question[];
}

/** Compact authoring helpers for the content files. */
export const q = (skill: Skill, question: string, options: string[], answer: number, why: string): Question => ({ skill, q: question, options, answer, why });

export const passage = (grade: number, id: string, title: string, emoji: string, genre: Passage["genre"], text: string, questions: Question[]): Passage => ({
  id: `g${grade}-${id}`,
  grade,
  title,
  emoji,
  genre,
  text: text.trim().replace(/\s+/g, " "),
  questions,
});
