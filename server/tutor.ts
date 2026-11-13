// The AI tutor brain: Claude plans each turn as structured JSON
// (what to say, which picture cards to show, what to point at, what to write).
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { z } from "zod";
import { characterById } from "../src/shared/characters.js";
import type { TutorRequest, TutorTurn } from "../src/shared/types.js";
import { nextQuestion, offlineTutor } from "./offlineTutor.js";
import { checkAll, checkText, logBlocked, type SafetyHit } from "./safety.js";

const MODEL = process.env.KIDDOS_MODEL || "claude-opus-5-5";

const TurnSchema = z.object({
  speech: z.string().describe("Exactly what the buddy says aloud. 1-3 short, natural, spoken sentences."),
  caption: z.string().describe("The key word or phrase shown big on screen, max 5 words."),
  emotion: z.enum(["happy", "excited", "thinking", "proud", "curious", "silly", "calm", "surprised"]),
  gesture: z.enum(["point", "wave", "thumbsUp", "write", "think", "cheer", "none"]),
  cards: z
    .array(z.object({ emoji: z.string(), label: z.string(), correct: z.boolean().optional() }))
    .describe("0-4 picture cards. Each emoji is one to three emoji characters. For choice questions mark exactly one correct."),
  pointAt: z.number().int().describe("Index of the card to point at, -2 for the whiteboard, -1 for nothing."),
  board: z.string().describe("Short text to handwrite on the whiteboard (a word, sum, or sound-out), or empty."),
  expectsAnswer: z.boolean(),
  correct: z.boolean().nullable().describe("Verdict on the child's last answer, or null if they did not answer a question."),
  stars: z.number().int().describe("0 normally, 1 for a correct answer, 2 for an outstanding one."),
  answers: z.array(z.string()).describe("Lowercase accepted answers to the question you just asked, or empty."),
});

const SUBJECT_GUIDE: Record<string, string> = {
  reading: "Teach reading: show a word on the board, ask the child to read it or find the matching picture card, praise effort, gently correct.",
  phonics: "Teach phonics: sound out words (write the sounds like c-a-t on the board), blending, rhymes, beginning sounds.",
  math: "Teach math at the child's level: counting with emoji cards, addition, subtraction, shapes, simple word problems. Write the sum on the board.",
  spelling: "Teach spelling: say a word, show its picture, ask the child to spell it; write the correct spelling on the board after they try.",
  science: "Teach science with surprising, true facts and a quick question. Use emoji cards to illustrate.",
  world: "Teach geography and cultures: countries, animals, greetings in other languages, landmarks.",
  feelings: "Social-emotional learning: help the child name feelings, breathe calmly, think about kindness. Never diagnose; suggest talking to a grown-up for big worries.",
  free: "Free chat: answer the child's questions like an excellent teacher, then turn it into a tiny learning moment.",
};

function systemPrompt(req: TutorRequest): string {
  const c = characterById(req.characterId);
  return `You are ${c.name} the ${c.species}, ${c.persona} You are an expert early-years teacher inside the Kiddos learning app, talking out loud to a child.
Your catchphrase is "${c.catchphrase}" (use it sometimes, not every turn).

How you teach:
- Speak like a real, warm person talking to a young child: short sentences, simple words, contractions, natural pauses with commas. Your speech is read aloud by a voice, so never use emoji, markdown, lists or symbols in "speech".
- One idea and at most one question per turn. Wait for the child.
- Make the screen do the work: show picture cards for things you mention, point at the card you are talking about, and handwrite key words, sounds or sums on the whiteboard.
- When the child answers, judge it kindly in "correct", celebrate specifically, or give a hint and the right answer without making them feel bad.
- Adapt difficulty: harder after a streak of right answers, easier after mistakes.
- Children's speech is transcribed by a microphone and may be misspelled; be generous with near-misses.
- Keep it safe and age-appropriate. Never ask for personal information such as names, addresses, phone numbers, emails, school names, photos or passwords, and never tell the child to get them from a grown-up. Never mention websites, apps or ways to contact anyone. If the child mentions being hurt, unsafe or very upset, respond gently and tell them to talk to a trusted grown-up right away.
- Stay on learning; if the child goes off topic, connect it back with curiosity.
- Follow the child's curiosity. If they ask a question ("Why do dogs sniff each other?"), answer it first, truthfully and simply, with 2-3 picture cards that show the idea and point at the one you're talking about; then ask one quick question to check they got it.
- Keep "speech" short (under 35 words) so the voice starts fast; split longer ideas across turns.

Today's lesson: ${SUBJECT_GUIDE[req.subject] ?? SUBJECT_GUIDE.free}

The child is called {name}. That is a placeholder, because the app never shares the child's real name: whenever you would say or write the child's name, write exactly {name} (with the curly braces) and the app fills it in. Never guess or invent a name.
About {name}: age ${req.child.age}, grade ${req.child.grade}, current level ${req.child.level} of 3, likes ${req.child.interests.join(", ") || "lots of things"}. Reply in ${req.child.language}.${
    req.memory?.length ? `\nWhat you remember about {name} from earlier lessons:\n- ${req.memory.slice(0, 8).join("\n- ")}` : ""
  }`;
}

let client: Anthropic | null = null;
const hasKey = () => Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);

export function aiEnabled(): boolean {
  return hasKey();
}

const NAME = "{name}";
const escapeRe = (x: string) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Puts the real name back into a turn (only for older apps that still send it). */
function fillName(t: TutorTurn, name: string | null): TutorTurn {
  if (!name) return t;
  const f = (x: string) => x.split(NAME).join(name);
  return { ...t, speech: f(t.speech), caption: f(t.caption), board: f(t.board), cards: t.cards.map((c) => ({ ...c, label: f(c.label) })) };
}

/** A gentle change of subject (or, for big worries, a nudge to a grown-up) when something was blocked. */
function safeTurn(req: TutorRequest, hit: SafetyHit | null): TutorTurn {
  if (hit?.category === "selfHarm") {
    return {
      ...nextQuestion(req),
      speech: "Thank you for telling me. That sounds really big and important. Please go and tell a grown-up you trust right now, like your mom, dad or teacher. They can help you.",
      caption: "Talk to a grown-up you trust",
      emotion: "calm",
      gesture: "none",
      cards: [{ emoji: "🤗", label: "Grown-up" }],
      pointAt: -1,
      board: "",
      expectsAnswer: false,
      correct: null,
      stars: 0,
      answers: [],
    };
  }
  const lead =
    hit?.category === "contact" || hit?.category === "link" ? "Let's keep things like addresses, phone numbers and websites private, okay? Let's talk about something else!"
    : hit?.category === "sexual" ? "That's something to talk about with a grown-up you trust. Let's talk about something else!"
    : "Let's talk about something else!";
  const next = nextQuestion(req);
  return { ...next, speech: `${lead} ${next.speech}`, emotion: "calm", correct: null, stars: 0 };
}

export async function runTutor(input: TutorRequest): Promise<{ turn: TutorTurn; source: "ai" | "offline" }> {
  // The app sends {name} instead of the child's name. An older app may still send the real name:
  // it stays on this server (swapped for the token before the AI sees anything) and goes back in the reply.
  const given = input.child.name.trim().slice(0, 40);
  const realName = given && given !== NAME ? given : null;
  const scrub = (x: string) => (realName ? x.replace(new RegExp(`(?<![\\p{L}\\p{N}])${escapeRe(realName)}(?![\\p{L}\\p{N}])`, "giu"), NAME) : x);
  const req: TutorRequest = {
    ...input,
    child: { ...input.child, name: NAME },
    message: scrub(input.message),
    history: input.history.map((l) => ({ ...l, text: scrub(l.text) })),
    memory: input.memory?.map(scrub),
  };

  // Screen what the child said before it goes anywhere.
  const asked = req.message === "__start__" ? null : checkText(req.message, { from: "child" });
  if (asked) {
    logBlocked("child message", asked);
    return { turn: fillName(safeTurn(req, asked), realName), source: "offline" };
  }
  // Earlier lines that would not pass are left out of what the AI sees.
  req.history = req.history.filter((l) => !checkText(l.text, { from: l.role === "child" ? "child" : "ai" }));

  if (!hasKey()) return { turn: fillName(offlineTutor(req), realName), source: "offline" };
  client ??= new Anthropic();

  const messages: Anthropic.Beta.BetaMessageParam[] = [];
  for (const line of req.history.slice(-16)) {
    const role = line.role === "child" ? "user" : "assistant";
    const last = messages[messages.length - 1];
    if (last && last.role === role) last.content += `\n${line.text}`;
    else messages.push({ role, content: line.text });
  }
  const childSays = req.message === "__start__" ? "(The child just opened the lesson. Greet them by name, written as {name}, and start.)" : `The child says: "${req.message}"`;
  if (messages[0]?.role === "assistant") messages.unshift({ role: "user", content: "(Lesson started.)" });
  if (messages[messages.length - 1]?.role === "user") messages[messages.length - 1].content += `\n${childSays}`;
  else messages.push({ role: "user", content: childSays });

  try {
    const response = await client.beta.messages.create({
      model: MODEL,
      max_tokens: 4000,
      system: [{ type: "text", text: systemPrompt(req), cache_control: { type: "ephemeral" } }],
      messages,
      output_config: { effort: "low", format: zodOutputFormat(TurnSchema) },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
    } as Anthropic.Beta.MessageCreateParamsNonStreaming);

    if (response.stop_reason === "refusal") return { turn: fillName(safeTurn(req, null), realName), source: "offline" };
    const text = response.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("");
    const parsed = TurnSchema.safeParse(JSON.parse(text));
    if (!parsed.success) throw new Error("Tutor reply did not match the schema");
    const t = parsed.data;
    // Screen everything the child would see or hear before it leaves the server.
    const said = checkAll([t.speech, t.caption, t.board, ...t.cards.map((c) => c.label), ...t.answers], { from: "ai" });
    if (said) {
      logBlocked("tutor reply", said);
      return { turn: fillName(safeTurn(req, said.category === "selfHarm" ? null : said), realName), source: "offline" };
    }
    return {
      turn: fillName(
        {
          ...t,
          cards: t.cards.slice(0, 4),
          pointAt: t.pointAt >= t.cards.length ? -1 : t.pointAt,
          stars: Math.max(0, Math.min(2, t.stars)),
          answers: t.answers.map((a) => a.toLowerCase()),
        },
        realName
      ),
      source: "ai",
    };
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) console.warn("[tutor] rate limited, using offline tutor");
    else if (err instanceof Anthropic.APIError) console.error(`[tutor] API error ${err.status}: ${err.message}`);
    else console.error("[tutor]", err instanceof Error ? err.message : "unknown error");
    return { turn: fillName(offlineTutor(req), realName), source: "offline" };
  }
}
