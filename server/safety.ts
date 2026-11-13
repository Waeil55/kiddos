// A conservative child-safety screen, run on what the child says before it reaches the AI and on
// everything the AI writes before it reaches the child. It is a plain word and pattern list, so it
// errs on the side of blocking: a false alarm only means the buddy changes the subject.
// Pure TypeScript with no Node imports, so the app could bundle it too.

export type SafetyCategory = "violence" | "sexual" | "selfHarm" | "drugs" | "contact" | "link" | "askPersonal";

// Whole words or phrases (case-insensitive). Everyday words with innocent meanings in lessons
// ("dead leaves", "dinosaurs died", "kitchen knife") are left out on purpose. Self-harm is checked
// first so "kill myself" gets the "talk to a grown-up" answer rather than a change of subject.
const WORDS: Record<Exclude<SafetyCategory, "contact" | "link" | "askPersonal">, string[]> = {
  selfHarm: [
    "suicide", "suicidal", "kill myself", "kill yourself", "kms", "kys", "want to die", "wanna die", "end my life", "hurt myself",
    "hurt yourself", "cut myself", "cutting myself", "self harm", "self-harm", "hang myself", "no reason to live",
  ],
  violence: [
    "kill", "kills", "killed", "killing", "killer", "murder", "murdered", "murderer", "gun", "guns", "pistol", "rifle", "shotgun",
    "shoot you", "shoot him", "shoot her", "shoot them", "shoot people", "stab", "stabbed", "stabbing", "behead", "torture", "tortured",
    "bomb", "bombs", "terrorist", "massacre", "strangle", "choke you", "beat you up", "punch you", "rape", "raped", "kidnap", "kidnapped",
  ],
  sexual: [
    "sex", "sexy", "sexual", "porn", "porno", "pornography", "naked", "nude", "nudes", "boobs", "penis", "vagina", "dick", "pussy",
    "horny", "orgasm", "condom", "masturbate", "strip for", "take off your clothes", "send a picture of you", "send me a photo",
    "keep it a secret from", "don't tell your parents", "dont tell your parents", "don't tell your mom", "don't tell your dad",
  ],
  drugs: [
    "drugs", "cocaine", "heroin", "meth", "weed", "marijuana", "cannabis", "vape", "vaping", "cigarette", "cigarettes", "smoke weed",
    "get high", "getting high", "beer", "vodka", "whiskey", "drunk", "alcohol", "pills to", "overdose", "lsd", "ecstasy", "fentanyl",
  ],
};

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const WORD_RES = Object.entries(WORDS).map(
  ([cat, list]) => [cat as SafetyCategory, new RegExp(`(^|[^a-z])(${list.map(escapeRe).join("|")})(?=$|[^a-z])`, "i")] as const
);

const EMAIL = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
// Phone-shaped numbers: 555-123-4567, (555) 123 4567, +44 7700 900123, or 7+ digits in a row.
// Sums and counting ("12 + 7 = 19", "1 2 3 4 5") don't match.
const PHONE = /(\+\d[\d\s().-]{7,}\d)|(\(?\b\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b)|(\b\d{7,}\b)/;
// Street addresses ("12 Oak Street"). Word problems ("5 cars on the road") are skipped by refusing
// small connecting words between the number and the street word.
const ADDRESS =
  /\b\d{1,5}\s+(?:(?!(?:the|a|an|on|in|at|to|of|my|our|your|down|up|across|along|by|near|and|more|big|little|long|busy)\b)[a-z]+\s+){1,3}(?:street|st|avenue|ave|road|rd|lane|ln|drive|boulevard|blvd|terrace)\b/i;
const LINK = /\b(?:https?:\/\/|www\.)\S+|\b[a-z0-9-]+\.(?:com|net|org|io|uk|gg|xyz|ru)\b(?:\/\S*)?/i;
const SOCIAL = /\b(snapchat|snap me|instagram|insta|tiktok|discord|whatsapp|telegram|kik|facebook|messenger|my username|add me on)\b/i;

// The buddy must never ask for (or tell the child to fetch) personal details.
const PERSONAL = "(?:home address|address|phone number|phone|cell number|mobile number|email|e-mail|password|passcode|credit card|bank|last name|surname|full name|birthday|date of birth|where you live|where do you live|your school|which school|school name|street|zip code|postcode|photo of you|picture of you|location)";
const ASK_PERSONAL = [
  new RegExp(`\\b(?:what(?:'s| is)|tell me|give me|share|send|type|say|whisper)\\b[^.?!]{0,40}\\b(?:your|you)\\b[^.?!]{0,30}${PERSONAL}`, "i"),
  new RegExp(`\\b(?:where do you live|where you live|what school do you go to|which school do you go to)\\b`, "i"),
  new RegExp(`\\b(?:ask|get|find out)\\b[^.?!]{0,40}\\b(?:grown-?ups?|parents?|mom|mum|dad|mommy|daddy|teacher|family|sister|brother)\\b[^.?!]{0,40}${PERSONAL}`, "i"),
];

export interface SafetyHit {
  category: SafetyCategory;
}

/** Screens one piece of text. Returns the first problem found, or null when it looks fine. */
export function checkText(text: string, opts: { from: "child" | "ai" }): SafetyHit | null {
  if (!text) return null;
  const t = text.normalize("NFKC");
  for (const [category, re] of WORD_RES) if (re.test(t)) return { category };
  if (EMAIL.test(t) || PHONE.test(t) || ADDRESS.test(t) || SOCIAL.test(t)) return { category: "contact" };
  if (LINK.test(t)) return { category: "link" };
  if (opts.from === "ai" && ASK_PERSONAL.some((re) => re.test(t))) return { category: "askPersonal" };
  return null;
}

/** Screens several strings (all the visible parts of a turn or a story). */
export function checkAll(texts: string[], opts: { from: "child" | "ai" }): SafetyHit | null {
  for (const s of texts) {
    const hit = checkText(s, opts);
    if (hit) return hit;
  }
  return null;
}

/** Blanks out emails, phone numbers, street addresses and links, e.g. before a report is stored. */
export function redactContact(text: string): string {
  const g = (re: RegExp) => new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
  return [EMAIL, PHONE, ADDRESS, LINK].reduce((s, re) => s.replace(g(re), "[removed]"), text);
}

/** Logs that something was blocked: where and why only, never the text or who said it. */
export function logBlocked(where: string, hit: SafetyHit) {
  console.warn(`[safety] blocked ${where} (${hit.category})`);
}
