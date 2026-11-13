// Rule-based tutor used when no AI key is configured or the AI call fails.
// It runs real lessons from the built-in content bank, so the app is never "dead".
// It writes the child's name as the token {name}; the app puts the real name in when the turn arrives.
import { characterById } from "../src/shared/characters.js";
import { matchesAnswer, RIDDLES, SCIENCE_FACTS, WORDS, WORLD_FACTS, FEELINGS } from "../src/shared/content.js";
import type { PictureCard, TutorRequest, TutorTurn } from "../src/shared/types.js";
import { findCuriousAnswer, looksLikeQuestion } from "../src/shared/curious.js";

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

function turn(partial: Partial<TutorTurn> & { speech: string }): TutorTurn {
  return {
    caption: partial.speech.split(/[.!?]/)[0].slice(0, 40),
    emotion: "happy",
    gesture: "none",
    cards: [],
    pointAt: -1,
    board: "",
    expectsAnswer: false,
    correct: null,
    stars: 0,
    answers: [],
    ...partial,
  };
}

const PRAISE = ["You got it!", "Amazing job!", "Yes! That's right!", "Wow, super smart!", "High five!"];
const RETRY = ["Ooh, so close!", "Good try!", "Almost!", "Nice thinking!"];

function wordQuestion(level: number): TutorTurn {
  const pool = WORDS.filter((w) => w.level <= Math.max(1, Math.min(3, level)));
  const target = pick(pool);
  const others = shuffle(WORDS.filter((w) => w.word !== target.word)).slice(0, 2);
  const cards: PictureCard[] = shuffle([target, ...others]).map((w) => ({ emoji: w.emoji, label: w.word, correct: w.word === target.word }));
  return turn({
    speech: `Let's read! Look at the word I'm writing. Can you find the picture that matches it?`,
    caption: target.word,
    gesture: "write",
    board: target.word,
    pointAt: -2,
    cards,
    expectsAnswer: true,
    answers: [target.word],
    emotion: "curious",
  });
}

function phonicsQuestion(level: number): TutorTurn {
  const target = pick(WORDS.filter((w) => w.level <= Math.max(1, Math.min(3, level))));
  return turn({
    speech: `Let's sound it out together. ${target.sound.split("-").join("... ")}. What word is that?`,
    caption: target.sound,
    gesture: "write",
    board: target.sound,
    pointAt: -2,
    cards: [{ emoji: target.emoji, label: "?" }],
    expectsAnswer: true,
    answers: [target.word],
    emotion: "curious",
  });
}

function mathQuestion(level: number): TutorTurn {
  const max = level <= 1 ? 5 : level === 2 ? 10 : 20;
  const a = 1 + Math.floor(Math.random() * max);
  const b = 1 + Math.floor(Math.random() * max);
  const sub = level >= 2 && Math.random() < 0.4 && a > b;
  const ans = sub ? a - b : a + b;
  const emoji = pick(["🍎", "⭐", "🐟", "🍪", "🎈"]);
  const cards = level <= 1 ? [{ emoji: emoji.repeat(a), label: String(a) }, { emoji: emoji.repeat(b), label: String(b) }] : [];
  return turn({
    speech: sub ? `I had ${a}, and I gave away ${b}. How many are left?` : `What is ${a} plus ${b}?`,
    caption: `${a} ${sub ? "−" : "+"} ${b} = ?`,
    gesture: "write",
    board: `${a} ${sub ? "-" : "+"} ${b} = ?`,
    pointAt: cards.length ? 0 : -2,
    cards,
    expectsAnswer: true,
    answers: [String(ans)],
    emotion: "curious",
  });
}

function spellingQuestion(level: number): TutorTurn {
  const target = pick(WORDS.filter((w) => w.level <= Math.max(1, Math.min(3, level))));
  return turn({
    speech: `Spelling time! Can you spell ${target.word}? Say the letters one by one, or type them.`,
    caption: `Spell: ${target.word}`,
    gesture: "point",
    cards: [{ emoji: target.emoji, label: target.word.replace(/./g, "_ ").trim() }],
    pointAt: 0,
    expectsAnswer: true,
    answers: [target.word, target.word.split("").join(" ")],
    emotion: "curious",
  });
}

function factQuestion(pool: { emoji: string; fact: string; q: string; a: string[] }[]): TutorTurn {
  const f = pick(pool);
  return turn({
    speech: `Here's something amazing. ${f.fact} Now, quiz time! ${f.q}`,
    caption: f.q,
    gesture: "point",
    cards: [{ emoji: f.emoji, label: "?" }],
    pointAt: 0,
    expectsAnswer: true,
    answers: f.a,
    emotion: "excited",
  });
}

/** The next lesson question for the subject (also used when the AI tutor changes the subject). */
export function nextQuestion(req: TutorRequest): TutorTurn {
  const lvl = req.child.level;
  switch (req.subject) {
    case "reading":
      return wordQuestion(lvl);
    case "phonics":
      return phonicsQuestion(lvl);
    case "math":
      return mathQuestion(lvl);
    case "spelling":
      return spellingQuestion(lvl);
    case "science":
      return factQuestion(SCIENCE_FACTS);
    case "world":
      return factQuestion(WORLD_FACTS);
    case "feelings": {
      return turn({
        speech: `How are you feeling right now? You can tap a face or tell me.`,
        caption: "How do you feel?",
        gesture: "point",
        cards: FEELINGS.map((f) => ({ emoji: f.emoji, label: f.name })),
        pointAt: 0,
        expectsAnswer: true,
        answers: [],
        emotion: "calm",
      });
    }
    default: {
      const r = pick(RIDDLES);
      return Math.random() < 0.5
        ? turn({ speech: `Riddle time! ${r.q}`, caption: r.q, gesture: "think", cards: [{ emoji: "❓", label: "?" }], pointAt: 0, expectsAnswer: true, answers: r.a, emotion: "silly" })
        : pick([wordQuestion, mathQuestion])(lvl);
    }
  }
}

export function offlineTutor(req: TutorRequest): TutorTurn {
  const c = characterById(req.characterId);
  const msg = req.message.trim();

  // First turn of a session: greet and start.
  if (!msg || msg === "__start__") {
    const q = nextQuestion(req);
    return {
      ...q,
      speech: `Hi {name}! It's me, ${c.name}! ${c.catchphrase} ${q.speech}`,
      gesture: q.gesture === "none" ? "wave" : q.gesture,
    };
  }

  // Curiosity first: when the child asks a question, answer it with pictures, then check understanding.
  const answersQuiz = Boolean(req.expected?.length && matchesAnswer(msg, req.expected));
  if (!answersQuiz && (looksLikeQuestion(msg) || (req.subject === "free" && !req.expected?.length))) {
    const ans = findCuriousAnswer(msg);
    if (ans) {
      return turn({
        speech: `Great question, {name}! ${ans.answer} ${ans.followUp.q}`,
        caption: ans.board,
        emotion: "excited",
        gesture: "point",
        cards: ans.cards,
        pointAt: 0,
        board: ans.board,
        expectsAnswer: true,
        answers: ans.followUp.answers,
      });
    }
    if (looksLikeQuestion(msg)) {
      const next = nextQuestion(req);
      return {
        ...next,
        speech: `Ooh, what a great question! That one needs my big AI brain, so ask a grown-up to look it up with you. Meanwhile, try this! ${next.speech}`,
        emotion: "curious",
      };
    }
  }

  // Feelings: respond with the matching tip.
  if (req.subject === "feelings") {
    const f = FEELINGS.find((x) => msg.toLowerCase().includes(x.name));
    if (f) {
      return turn({
        speech: `Thank you for telling me you feel ${f.name}. ${f.tip}`,
        caption: `${f.emoji} ${f.name}`,
        emotion: f.name === "sad" || f.name === "scared" ? "calm" : "happy",
        gesture: "thumbsUp",
        board: f.name,
        pointAt: -2,
        stars: 1,
        correct: true,
      });
    }
  }

  if (req.expected && req.expected.length) {
    const ok = matchesAnswer(msg, req.expected);
    const next = nextQuestion(req);
    if (ok) {
      return {
        ...next,
        speech: `${pick(PRAISE)} ${c.catchphrase} Next one! ${next.speech}`,
        emotion: "proud",
        correct: true,
        stars: 1,
      };
    }
    return turn({
      speech: `${pick(RETRY)} The answer is ${req.expected[0]}. Let's say it together: ${req.expected[0]}! Ready for another one?`,
      caption: req.expected[0],
      board: req.expected[0],
      gesture: "write",
      pointAt: -2,
      emotion: "calm",
      correct: false,
      answers: [],
    });
  }

  const next = nextQuestion(req);
  return { ...next, speech: `Ooh, I love that! Let's keep learning. ${next.speech}` };
}
