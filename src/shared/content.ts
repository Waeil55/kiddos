// Built-in learning content. Used by the activities and by the offline tutor,
// so the app teaches real lessons even with no network and no AI key.

export interface Word {
  word: string;
  emoji: string;
  sound: string;
  level: 1 | 2 | 3;
}

export const WORDS: Word[] = [
  { word: "cat", emoji: "🐱", sound: "c-a-t", level: 1 },
  { word: "dog", emoji: "🐶", sound: "d-o-g", level: 1 },
  { word: "sun", emoji: "☀️", sound: "s-u-n", level: 1 },
  { word: "hat", emoji: "🎩", sound: "h-a-t", level: 1 },
  { word: "bus", emoji: "🚌", sound: "b-u-s", level: 1 },
  { word: "pig", emoji: "🐷", sound: "p-i-g", level: 1 },
  { word: "bed", emoji: "🛏️", sound: "b-e-d", level: 1 },
  { word: "cup", emoji: "🥤", sound: "c-u-p", level: 1 },
  { word: "fox", emoji: "🦊", sound: "f-o-x", level: 1 },
  { word: "hen", emoji: "🐔", sound: "h-e-n", level: 1 },
  { word: "map", emoji: "🗺️", sound: "m-a-p", level: 1 },
  { word: "egg", emoji: "🥚", sound: "e-g-g", level: 1 },
  { word: "fish", emoji: "🐟", sound: "f-i-sh", level: 2 },
  { word: "frog", emoji: "🐸", sound: "f-r-o-g", level: 2 },
  { word: "duck", emoji: "🦆", sound: "d-u-ck", level: 2 },
  { word: "star", emoji: "⭐", sound: "s-t-ar", level: 2 },
  { word: "tree", emoji: "🌳", sound: "t-r-ee", level: 2 },
  { word: "ship", emoji: "🚢", sound: "sh-i-p", level: 2 },
  { word: "moon", emoji: "🌙", sound: "m-oo-n", level: 2 },
  { word: "cake", emoji: "🎂", sound: "c-a-ke", level: 2 },
  { word: "bike", emoji: "🚲", sound: "b-i-ke", level: 2 },
  { word: "rain", emoji: "🌧️", sound: "r-ai-n", level: 2 },
  { word: "apple", emoji: "🍎", sound: "ap-ple", level: 2 },
  { word: "banana", emoji: "🍌", sound: "ba-na-na", level: 2 },
  { word: "rocket", emoji: "🚀", sound: "rock-et", level: 3 },
  { word: "turtle", emoji: "🐢", sound: "tur-tle", level: 3 },
  { word: "rainbow", emoji: "🌈", sound: "rain-bow", level: 3 },
  { word: "dolphin", emoji: "🐬", sound: "dol-phin", level: 3 },
  { word: "penguin", emoji: "🐧", sound: "pen-guin", level: 3 },
  { word: "elephant", emoji: "🐘", sound: "el-e-phant", level: 3 },
  { word: "butterfly", emoji: "🦋", sound: "but-ter-fly", level: 3 },
  { word: "volcano", emoji: "🌋", sound: "vol-ca-no", level: 3 },
  { word: "dinosaur", emoji: "🦕", sound: "di-no-saur", level: 3 },
  { word: "umbrella", emoji: "☂️", sound: "um-brel-la", level: 3 },
];

export const SIGHT_WORDS = [
  ["the", "a", "I", "is", "to", "and", "you", "it", "in", "my"],
  ["said", "was", "she", "he", "they", "have", "are", "for", "with", "look"],
  ["because", "would", "could", "there", "their", "where", "every", "friend", "people", "again"],
];

export interface Story {
  id: string;
  title: string;
  emoji: string;
  level: 1 | 2 | 3;
  pages: { text: string; picture: string }[];
  questions: { q: string; options: string[]; answer: number }[];
}

export const STORIES: Story[] = [
  {
    id: "sam-cat",
    title: "Sam the Cat",
    emoji: "🐱",
    level: 1,
    pages: [
      { text: "Sam is a cat.", picture: "🐱" },
      { text: "Sam sat on a mat.", picture: "🐱🧶" },
      { text: "Sam saw a big red hat.", picture: "🎩" },
      { text: "Sam got in the hat. Pat pat pat!", picture: "🐱🎩" },
    ],
    questions: [
      { q: "Who is the story about?", options: ["A dog", "A cat", "A fish"], answer: 1 },
      { q: "What did Sam get in?", options: ["A hat", "A box", "A bed"], answer: 0 },
    ],
  },
  {
    id: "frog-log",
    title: "The Frog on the Log",
    emoji: "🐸",
    level: 1,
    pages: [
      { text: "A green frog sat on a log.", picture: "🐸🪵" },
      { text: "The frog saw a bug.", picture: "🐸🐞" },
      { text: "Hop! The frog got the bug.", picture: "🐸💨" },
      { text: "The frog is not sad. The frog is glad.", picture: "😊🐸" },
    ],
    questions: [
      { q: "Where did the frog sit?", options: ["On a log", "In a car", "On a bed"], answer: 0 },
      { q: "How does the frog feel at the end?", options: ["Sad", "Glad", "Angry"], answer: 1 },
    ],
  },
  {
    id: "moon-trip",
    title: "Mia Goes to the Moon",
    emoji: "🚀",
    level: 2,
    pages: [
      { text: "Mia built a rocket out of a big box.", picture: "📦🚀" },
      { text: "She counted down. Three, two, one, blast off!", picture: "3️⃣2️⃣1️⃣🔥" },
      { text: "The rocket zoomed past the stars to the moon.", picture: "✨🌙" },
      { text: "On the moon, Mia jumped so high she could touch a star.", picture: "🧒⭐" },
      { text: "Then Mom called, 'Dinner time!' and Mia flew home.", picture: "🏠🍝" },
    ],
    questions: [
      { q: "What did Mia build her rocket from?", options: ["A box", "A boat", "A tree"], answer: 0 },
      { q: "Where did the rocket go?", options: ["The sea", "The moon", "The zoo"], answer: 1 },
      { q: "Why did Mia go home?", options: ["It rained", "It was dinner time", "She was bored"], answer: 1 },
    ],
  },
  {
    id: "kind-turtle",
    title: "Tilly the Kind Turtle",
    emoji: "🐢",
    level: 2,
    pages: [
      { text: "Tilly the turtle was slow, but she was very kind.", picture: "🐢💚" },
      { text: "One day, a little bird fell from its nest.", picture: "🐦🪹" },
      { text: "Tilly carried the bird on her shell, step by step.", picture: "🐢🐦" },
      { text: "It took all day, but she found the bird's mother.", picture: "🌳🐦🐦" },
      { text: "'Being slow is fine,' said the bird. 'Being kind is best!'", picture: "🥰" },
    ],
    questions: [
      { q: "What was Tilly like?", options: ["Fast and mean", "Slow and kind", "Loud and silly"], answer: 1 },
      { q: "Who did Tilly help?", options: ["A bird", "A fish", "A cat"], answer: 0 },
      { q: "What is the lesson?", options: ["Be fast", "Kindness matters most", "Birds can swim"], answer: 1 },
    ],
  },
  {
    id: "volcano-island",
    title: "The Secret of Volcano Island",
    emoji: "🌋",
    level: 3,
    pages: [
      { text: "Leo and his sister Ava discovered a map inside an old bottle on the beach.", picture: "🍾🗺️" },
      { text: "The map showed an island with a sleeping volcano and an X marked near its base.", picture: "🏝️🌋❌" },
      { text: "They rowed carefully across the bay, taking turns so neither got too tired.", picture: "🚣‍♂️🚣‍♀️" },
      { text: "Near the volcano, the ground felt warm, and steam drifted up from cracks in the rocks.", picture: "♨️🪨" },
      { text: "Under a palm tree they dug up a chest. Inside was a note: 'The real treasure is the adventure you shared.'", picture: "🧰📜💛" },
    ],
    questions: [
      { q: "Where did they find the map?", options: ["In a bottle", "In a book", "In a cave"], answer: 0 },
      { q: "Why did they take turns rowing?", options: ["To race", "So nobody got too tired", "Because it was fun to argue"], answer: 1 },
      { q: "What clue showed the volcano was warm?", options: ["Snow", "Steam from cracks", "Rainbows"], answer: 1 },
    ],
  },
];

export const SCIENCE_FACTS = [
  { emoji: "🐙", fact: "An octopus has three hearts and blue blood!", q: "How many hearts does an octopus have?", a: ["3", "three"] },
  { emoji: "🌞", fact: "The sun is a star, and it is so big that about one million Earths could fit inside it.", q: "Is the sun a star or a planet?", a: ["star", "a star"] },
  { emoji: "🐝", fact: "Bees dance to tell their friends where the flowers are.", q: "What do bees do to tell friends where flowers are?", a: ["dance", "they dance"] },
  { emoji: "💧", fact: "Water can be a solid, a liquid, or a gas. Ice is solid water!", q: "What do we call water when it is frozen solid?", a: ["ice"] },
  { emoji: "🦒", fact: "A giraffe's tongue is so long it can clean its own ears!", q: "Which animal can clean its ears with its tongue?", a: ["giraffe", "a giraffe"] },
  { emoji: "🌱", fact: "Plants make their own food using sunlight, water and air.", q: "What do plants use from the sky to make food?", a: ["sunlight", "sun", "light", "the sun"] },
  { emoji: "🪐", fact: "Saturn is so light that it could float in a giant bathtub!", q: "Which planet could float in water?", a: ["saturn"] },
  { emoji: "🦴", fact: "Grown-ups have 206 bones, but babies have about 300!", q: "Who has more bones, a baby or a grown-up?", a: ["baby", "a baby", "babies"] },
];

export const WORLD_FACTS = [
  { emoji: "🗼", place: "France", fact: "In France you can visit the Eiffel Tower, and people say 'Bonjour' for hello.", q: "How do people say hello in France?", a: ["bonjour"] },
  { emoji: "🐼", place: "China", fact: "Giant pandas live in the bamboo forests of China.", q: "In which country do giant pandas live?", a: ["china"] },
  { emoji: "🦘", place: "Australia", fact: "Kangaroos carry their babies, called joeys, in a pouch. They live in Australia.", q: "What is a baby kangaroo called?", a: ["joey", "a joey"] },
  { emoji: "🏜️", place: "Egypt", fact: "Egypt has huge pyramids that were built thousands of years ago.", q: "What giant triangle buildings are in Egypt?", a: ["pyramids", "pyramid", "the pyramids"] },
  { emoji: "🧊", place: "Antarctica", fact: "Antarctica is the coldest place on Earth, and penguins love it there.", q: "Which is the coldest place on Earth?", a: ["antarctica"] },
  { emoji: "🌮", place: "Mexico", fact: "In Mexico, people say 'Hola' and make yummy tacos.", q: "How do you say hello in Spanish?", a: ["hola"] },
];

export const FEELINGS = [
  { emoji: "😊", name: "happy", tip: "Share your smile with someone today!" },
  { emoji: "😢", name: "sad", tip: "It's okay to be sad. A hug or talking to a grown-up can help." },
  { emoji: "😠", name: "angry", tip: "Let's take three big dragon breaths together. In... and out." },
  { emoji: "😨", name: "scared", tip: "You are brave. Tell a grown-up what feels scary." },
  { emoji: "😴", name: "tired", tip: "Your body might need rest. A little break helps your brain grow." },
  { emoji: "🤩", name: "excited", tip: "Wow! Let's use that energy to learn something amazing." },
];

export const RIDDLES = [
  { q: "What has hands but cannot clap?", a: ["clock", "a clock"], emoji: "⏰" },
  { q: "What gets wetter the more it dries?", a: ["towel", "a towel"], emoji: "🧺" },
  { q: "What has a face and two hands but no arms or legs?", a: ["clock", "a clock"], emoji: "🕰️" },
  { q: "What goes up but never comes down?", a: ["age", "your age"], emoji: "🎂" },
  { q: "I have keys but open no locks. What am I?", a: ["piano", "a piano", "keyboard"], emoji: "🎹" },
];

export const BADGES = [
  { id: "first-steps", emoji: "👣", name: "First Steps", need: 1 },
  { id: "star-10", emoji: "⭐", name: "Star Collector", need: 10 },
  { id: "star-50", emoji: "🌟", name: "Super Star", need: 50 },
  { id: "star-100", emoji: "💫", name: "Galaxy Brain", need: 100 },
  { id: "star-250", emoji: "🏆", name: "Champion", need: 250 },
  { id: "star-500", emoji: "👑", name: "Legend", need: 500 },
];

export const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];

/** Normalizes a spoken or typed answer for comparison ("Three!" -> "3"). */
export function normalizeAnswer(s: string): string {
  const t = s.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim().replace(/\s+/g, " ");
  const idx = NUMBER_WORDS.indexOf(t);
  return idx >= 0 ? String(idx) : t;
}

export function matchesAnswer(said: string, accepted: string[]): boolean {
  const n = normalizeAnswer(said);
  if (!n) return false;
  return accepted.some((a) => {
    const x = normalizeAnswer(a);
    return n === x || n.split(" ").includes(x) || (x.length > 3 && n.includes(x));
  });
}
