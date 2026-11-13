// The AI story maker: Claude writes a new, original reading comprehension passage with five
// worksheet-style questions, in the same shape as the built-in library.
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { SKILLS, type Passage } from "../src/shared/passages/types.js";
import type { StoryRequest } from "../src/shared/types.js";
import { checkAll, logBlocked } from "./safety.js";

const MODEL = process.env.KIDDOS_MODEL || "claude-opus-5-5";
const SKILL_KEYS = Object.keys(SKILLS) as [keyof typeof SKILLS, ...(keyof typeof SKILLS)[]];
const GENRES = ["fiction", "nonfiction", "poem", "letter", "fable", "biography", "how-to", "myth"] as const;

const PassageSchema = z.object({
  title: z.string(),
  emoji: z.string().describe("One emoji that matches the story."),
  genre: z.enum(GENRES),
  text: z.string().describe("The passage itself, plain text, no markdown."),
  questions: z
    .array(
      z.object({
        skill: z.enum(SKILL_KEYS),
        q: z.string(),
        options: z.array(z.string()).describe("Exactly four answer choices."),
        answer: z.number().int().describe("Index 0-3 of the correct choice."),
        why: z.string().describe("One short, kind sentence the buddy says to explain the answer, pointing back to the text."),
      })
    )
    .describe("Exactly five questions."),
});

const LENGTH: Record<number, string> = {
  0: "40-60 words, very simple sentences, mostly sight words",
  1: "60-90 words, short simple sentences",
  2: "90-130 words",
  3: "120-170 words",
  4: "170-230 words",
  5: "220-300 words",
};

let client: Anthropic | null = null;

export async function writeStory(req: StoryRequest): Promise<Passage> {
  client ??= new Anthropic();
  const grade = Math.max(0, Math.min(5, Math.round(req.grade)));
  const focus = req.focusSkill && req.focusSkill in SKILLS ? SKILLS[req.focusSkill as keyof typeof SKILLS] : null;
  const system = `You write original reading comprehension worksheets for children, like a skilled elementary school teacher.
Each worksheet is one passage followed by exactly five multiple-choice questions with exactly four choices each.
Rules:
- Original writing only. Never copy or closely retell published books, worksheets, or characters.
- Age-appropriate, warm, and safe. Facts in nonfiction must be accurate.
- Nothing about violence, weapons, romance, drugs or alcohol, scary injuries, or self-harm. No websites, apps, addresses, phone numbers or other contact details.
- You are never told who the reader is. Never address the reader by name; say "you" if the passage speaks to the reader.
- Every question must be answerable from the passage (inference questions may need a little thinking).
- Mix question types. Draw from: main idea, key details, setting, characters, sequence, cause and effect, inference, prediction, vocabulary in context, opposites, same meaning, phonics (same beginning blend, rhymes, vowel sounds), prefixes and suffixes, text structure (for example "Where would this paragraph fit in a longer story?"), which picture would tell more, author's purpose, genre, best title.
- One clearly correct answer. Wrong choices should be believable but clearly wrong after reading.
- Put the correct answer at different positions across the five questions.`;
  const user = `Write a ${grade === 0 ? "kindergarten" : `grade ${grade}`} worksheet. Passage length: ${LENGTH[grade]}.
${req.interests.length ? `The child likes: ${req.interests.slice(0, 6).join(", ")}. Use one of these as the topic if it fits.` : ""}
${focus ? `Include at least two questions that practice: ${focus}.` : ""}
Pick a genre that is not the same as the last few. Do not reuse these titles or topics: ${req.avoidTitles.slice(-40).join("; ") || "none"}.`;

  const response = await client.beta.messages.create({
    model: MODEL,
    max_tokens: 8000,
    system: [{ type: "text", text: system, cache_control: { type: "ephemeral" } }],
    messages: [{ role: "user", content: user }],
    output_config: { effort: "medium", format: zodOutputFormat(PassageSchema) },
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
  } as Anthropic.Beta.MessageCreateParamsNonStreaming);

  if (response.stop_reason === "refusal") throw new Error("Story request was refused");
  const text = response.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("");
  const p = PassageSchema.parse(JSON.parse(text));
  const questions = p.questions.filter((qq) => qq.options.length === 4 && qq.answer >= 0 && qq.answer < 4).slice(0, 5);
  if (questions.length < 3) throw new Error("Story had too few valid questions");
  // Screen everything the child will read before it leaves the server.
  const hit = checkAll([p.title, p.text, ...questions.flatMap((qq) => [qq.q, qq.why, ...qq.options])], { from: "ai" });
  if (hit) {
    logBlocked("story", hit);
    throw new Error("Story did not pass the safety check");
  }
  return {
    id: `ai-g${grade}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    grade,
    title: p.title.slice(0, 80),
    emoji: [...p.emoji][0] ?? "📖",
    genre: p.genre,
    text: p.text.trim().replace(/\s+/g, " "),
    questions,
  };
}
