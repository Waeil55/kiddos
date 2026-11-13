// Types shared by the app and the API server.

export type Emotion = "happy" | "excited" | "thinking" | "proud" | "curious" | "silly" | "calm" | "surprised";
export type Gesture = "point" | "wave" | "thumbsUp" | "write" | "think" | "cheer" | "listen" | "none";

export interface PictureCard {
  emoji: string;
  label: string;
  /** Set on quiz cards so the app can check a tap without another round trip. */
  correct?: boolean;
}

/** One turn of the buddy: what it says, shows, writes and points at. */
export interface TutorTurn {
  speech: string;
  caption: string;
  emotion: Emotion;
  gesture: Gesture;
  cards: PictureCard[];
  /** Card index to point at, -1 for nothing, -2 for the whiteboard. */
  pointAt: number;
  /** Text the buddy handwrites on the whiteboard, "" for none. */
  board: string;
  expectsAnswer: boolean;
  /** Verdict on the child's previous answer, null when there was nothing to judge. */
  correct: boolean | null;
  stars: number;
  /** Accepted answers for the question just asked (lowercase), so the app can check instantly. */
  answers: string[];
}

export type Subject = "reading" | "phonics" | "math" | "spelling" | "science" | "world" | "feelings" | "free";

export interface ChatLine {
  role: "child" | "buddy";
  text: string;
}

export interface TutorRequest {
  characterId: string;
  subject: Subject;
  child: { name: string; age: number; grade: string; interests: string[]; level: number; language: string };
  history: ChatLine[];
  message: string;
  /** Accepted answers from the buddy's previous question, echoed back by the app. */
  expected?: string[];
  /** What the app remembers about this child: strengths, things to practice, recent topics. */
  memory?: string[];
}

export interface TtsRequest {
  characterId: string;
  text: string;
  /** Speaking speed, 1 is normal. */
  rate?: number;
}

export interface StoryRequest {
  grade: number;
  interests: string[];
  /** A reading skill to practice more (a key of SKILLS in passages/types). */
  focusSkill?: string;
  /** Titles the child already has, so the new story is different. */
  avoidTitles: string[];
}
