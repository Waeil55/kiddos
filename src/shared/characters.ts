// The ten Kiddos buddies. Look (colors, ears, markings) drives the SVG renderer,
// voice drives the TTS providers, persona drives the AI tutor's personality.

export type EarStyle = "round" | "pointy" | "long" | "tufts" | "small" | "big" | "none" | "fins";
export type Marking = "eyePatches" | "mane" | "belly" | "stripes" | "spots" | "facemask" | "cheeks" | "shell" | "trunk" | "none";

export interface Character {
  id: string;
  name: string;
  species: string;
  tagline: string;
  specialty: string;
  persona: string;
  catchphrase: string;
  look: {
    body: string;
    accent: string;
    belly: string;
    dark: string;
    ears: EarStyle;
    marking: Marking;
    tuft?: string;
    hat?: "crown" | "cap" | "bow" | "glasses" | "headphones" | "star" | "leaf" | "beanie" | "flower" | "none";
  };
  voice: {
    gender: "female" | "male";
    /** Browser fallback tuning; 1 = natural. */
    pitch: number;
    rate: number;
    /** ElevenLabs premade voice id. Override with ELEVENLABS_VOICE_<ID> on the server. */
    elevenLabsId: string;
    /** Azure neural voice + speaking style. */
    azure: string;
    azureStyle: string;
  };
}

export const CHARACTERS: Character[] = [
  {
    id: "bao",
    name: "Bao",
    species: "Panda",
    tagline: "Your cozy reading buddy",
    specialty: "Reading & stories",
    persona: "a warm, gentle giant panda who loves bamboo snacks, bedtime stories and cheering softly. Patient, never rushes.",
    catchphrase: "Bamboo-tastic!",
    look: { body: "#ffffff", accent: "#2b2b35", belly: "#f3f3f6", dark: "#2b2b35", ears: "round", marking: "eyePatches", hat: "leaf" },
    voice: { gender: "female", pitch: 1.05, rate: 0.95, elevenLabsId: "EXAVITQu4vr4xnSDxMaL", azure: "en-US-AvaMultilingualNeural", azureStyle: "cheerful" },
  },
  {
    id: "leo",
    name: "Leo",
    species: "Lion",
    tagline: "Brave math champion",
    specialty: "Math & numbers",
    persona: "a brave, playful lion cub who turns every math problem into an adventure and roars when kids get it right.",
    catchphrase: "Roar-some!",
    look: { body: "#f6b23c", accent: "#d9771f", belly: "#ffe3a8", dark: "#5a2d0c", ears: "small", marking: "mane", tuft: "#c45f12", hat: "crown" },
    voice: { gender: "male", pitch: 1.1, rate: 1.0, elevenLabsId: "TX3LPaxmHKxFdv7VOQHJ", azure: "en-US-AndrewMultilingualNeural", azureStyle: "cheerful" },
  },
  {
    id: "ruby",
    name: "Ruby",
    species: "Fox",
    tagline: "Clever word detective",
    specialty: "Spelling & phonics",
    persona: "a clever, curious fox detective who solves word mysteries and loves sound clues.",
    catchphrase: "Case closed!",
    look: { body: "#f07b3f", accent: "#ffffff", belly: "#fff1e6", dark: "#3b2016", ears: "pointy", marking: "facemask", hat: "bow" },
    voice: { gender: "female", pitch: 1.12, rate: 1.02, elevenLabsId: "XrExE9yKIg1WjnnlVkGX", azure: "en-US-EmmaMultilingualNeural", azureStyle: "cheerful" },
  },
  {
    id: "ollie",
    name: "Ollie",
    species: "Owl",
    tagline: "Wise science explorer",
    specialty: "Science & nature",
    persona: "a wise but goofy owl professor who loves experiments, stars and 'whooo knows' questions.",
    catchphrase: "Whooo-hoo!",
    look: { body: "#8a6a4f", accent: "#c9a27e", belly: "#f1dfc8", dark: "#3a2a1c", ears: "tufts", marking: "belly", hat: "glasses" },
    voice: { gender: "male", pitch: 0.95, rate: 0.95, elevenLabsId: "pNInz6obpgDQGcFmaJgB", azure: "en-US-BrianMultilingualNeural", azureStyle: "friendly" },
  },
  {
    id: "pip",
    name: "Pip",
    species: "Penguin",
    tagline: "Cool world traveler",
    specialty: "Geography & cultures",
    persona: "a cheerful penguin who has slid across every continent and shares fun facts about the world.",
    catchphrase: "Slide on!",
    look: { body: "#25324a", accent: "#ffb020", belly: "#ffffff", dark: "#111827", ears: "none", marking: "belly", hat: "beanie" },
    voice: { gender: "male", pitch: 1.2, rate: 1.05, elevenLabsId: "yoZ06aMxZJJ28mfd3POQ", azure: "en-US-BrandonNeural", azureStyle: "cheerful" },
  },
  {
    id: "bella",
    name: "Bella",
    species: "Bunny",
    tagline: "Kind feelings friend",
    specialty: "Feelings & kindness",
    persona: "a soft-spoken bunny who helps kids name their feelings, breathe slowly and be kind.",
    catchphrase: "Hop-hop hooray!",
    look: { body: "#f4e9f7", accent: "#f7a8c4", belly: "#ffffff", dark: "#4a3550", ears: "long", marking: "cheeks", hat: "flower" },
    voice: { gender: "female", pitch: 1.15, rate: 0.92, elevenLabsId: "MF3mGyEYCl7XYWbV9V6O", azure: "en-US-AriaNeural", azureStyle: "gentle" },
  },
  {
    id: "momo",
    name: "Momo",
    species: "Monkey",
    tagline: "Silly brain-teaser",
    specialty: "Puzzles & logic",
    persona: "a silly, bouncy monkey who loves jokes, riddles and puzzles, and swings with excitement.",
    catchphrase: "Banana-rama!",
    look: { body: "#9a6440", accent: "#f2c9a0", belly: "#f2c9a0", dark: "#3d2212", ears: "big", marking: "facemask", hat: "cap" },
    voice: { gender: "male", pitch: 1.25, rate: 1.08, elevenLabsId: "ErXwobaYiN019PkySvjV", azure: "en-US-JasonNeural", azureStyle: "excited" },
  },
  {
    id: "kiki",
    name: "Kiki",
    species: "Koala",
    tagline: "Calm music maker",
    specialty: "Music, rhymes & art",
    persona: "a calm, dreamy koala who sings rhymes, claps rhythms and loves drawing.",
    catchphrase: "Eucalyp-tastic!",
    look: { body: "#9aa3ad", accent: "#e7ebef", belly: "#e7ebef", dark: "#2f3540", ears: "big", marking: "none", hat: "headphones" },
    voice: { gender: "female", pitch: 1.0, rate: 0.93, elevenLabsId: "jsCqWAovK2LkecY7zXl4", azure: "en-US-SaraNeural", azureStyle: "friendly" },
  },
  {
    id: "rex",
    name: "Rex",
    species: "Dinosaur",
    tagline: "Dino history buff",
    specialty: "History & time travel",
    persona: "a friendly little T-rex with tiny arms and a big heart who time-travels through history.",
    catchphrase: "Dino-mite!",
    look: { body: "#5cc46b", accent: "#3a9a4a", belly: "#d9f5c8", dark: "#1f4a26", ears: "none", marking: "spots", hat: "star" },
    voice: { gender: "male", pitch: 0.9, rate: 1.0, elevenLabsId: "VR6AewLTigWG4xSOukaG", azure: "en-US-TonyNeural", azureStyle: "cheerful" },
  },
  {
    id: "ella",
    name: "Ella",
    species: "Elephant",
    tagline: "Memory master coach",
    specialty: "Languages & memory",
    persona: "a big-hearted elephant who never forgets, teaches new languages and memory tricks.",
    catchphrase: "Trunk-tastic!",
    look: { body: "#8fb7e8", accent: "#f3a6b9", belly: "#c9ddf5", dark: "#24395c", ears: "big", marking: "trunk", hat: "bow" },
    voice: { gender: "female", pitch: 0.98, rate: 0.96, elevenLabsId: "ThT5KcBeYPX3keUQqHPh", azure: "en-US-MichelleNeural", azureStyle: "friendly" },
  },
];

export const characterById = (id: string): Character => CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0];
