# Kiddos: the AI study buddy that listens

Kiddos is an AI tutor for kids aged 3 to 12. A child talks to one of ten animated buddies. The buddy listens, answers out loud in a natural voice, points at picture cards and handwrites on a whiteboard, the way a real teacher at a board would.

One TypeScript codebase ships to every platform:

| Platform | How |
|---|---|
| Web app / PWA (installable, works offline) | `npm run build`, then serve `dist/` (or `npm start`) |
| Windows (.exe installer) | `npm run dist:win` (Electron) |
| macOS (.dmg) | `npm run dist:mac` (run on a Mac) |
| Linux (AppImage) | `npm run dist:linux` |
| iOS | `npm run mobile:add` once, then `npm run ios` (Xcode on a Mac) |
| Android | `npm run mobile:add` once, then `npm run android` (Android Studio) |

## Quick start

```bash
npm install
cp .env.example .env    # optional: add keys for the AI tutor and studio voices
npm run dev             # API on :8787, app on http://localhost:5173
```

The app works with **no keys at all**. It uses the built-in lesson engine and the most natural voice installed on the device. Add keys to unlock the full experience:

- `ANTHROPIC_API_KEY`: the Claude AI tutor (default model `claude-opus-5-5`). Each turn is planned as structured JSON: what to say, which picture cards to show, what to point at, what to write on the board, and the answer key.
- `ELEVENLABS_API_KEY` or `AZURE_SPEECH_KEY`: studio-quality human voices, a different voice for each buddy. Keys stay on the server, which proxies and caches the audio.

## What's inside

**The 10 buddies** (`src/shared/characters.ts`, drawn by `src/characters/Buddy.tsx`)
Bao the Panda (reading), Leo the Lion (math), Ruby the Fox (spelling and phonics), Ollie the Owl (science), Pip the Penguin (world), Bella the Bunny (feelings), Momo the Monkey (puzzles), Kiki the Koala (music and art), Rex the Dinosaur (history), Ella the Elephant (languages and memory). Each one has its own look, personality, catchphrase and voice.

Each buddy:
- **talks**, with the mouth lip-synced to the live audio level (studio voices) or to word boundaries (device voices)
- **points**: the arm is aimed at the real on-screen position of the card, word, tile or answer it is talking about, and the eyes follow
- **writes**: it handwrites letter by letter on a whiteboard with a moving marker, and demonstrates letters before the child traces them
- **emotes**: blinks, breathes, bobs while talking, waves, gives a thumbs-up, cheers, and shows emotions through brows and mouth

**Human AI voices, fast** (`src/voice/speech.ts`, `server/tts.ts`)
- Steady playback: each clip is fully decoded, then played straight through the Web Audio engine (`AudioBufferSourceNode`), so a slow network or a busy page cannot make the voice stutter. Speed changes are made by the voice service, not by stretching audio in the player.
- Each reply is sent as two requests at once: the first sentence (so the voice starts fast) and the rest. Few requests keep within the Azure free tier's limit of about 20 a minute. Clips are cached in the app, in server memory and on the server's disk, so repeated lines (praise, questions, "Hmm, let me think!") play instantly and never use the free allowance again.
- While the AI thinks, the buddy says a short "Hmm, let me think!" (made in advance).
- Voices, picked automatically by which key is in `.env` (see `.env.example`):
  1. **Azure free tier (F0)**: free, 500,000 characters a month, never billed. The Edge "Natural" voices (Ava, Andrew, Emma, Brian). When the free amount runs out, the app switches to the device voice.
  2. **OpenAI** `gpt-4o-mini-tts` (about $0.015 a minute), directly or through the Supabase function `supabase/functions/kiddos-tts` that uses the key already saved in Supabase (`npx supabase login`, then `node deploy/setup-voice.mjs`).
  3. **ElevenLabs Flash** (paid, most expressive).
  4. With no key: the best natural voice on the device.
- The mouth takes real shapes from the sound: round for "oo", wide for "ee", closed for "m".

**Learning** (kid side)
- AI tutor lessons in 8 subjects: reading, phonics, math, spelling, science, world, feelings, and "ask me anything"
- Talk, tap or type answers. Hands-free mode opens the microphone after each question, with a live waveform.
- Read-along stories: the buddy reads while pointing at each word, then the child reads aloud and each word lights up as it's recognized, followed by comprehension questions
- Read & answer: worksheet-style reading comprehension (`src/shared/passages/`). 100 Grade 3 passages and 10 Grade 2 passages across fiction, nonfiction, fables, myths, poems, letters, biographies and how-to texts. Each has 5 multiple-choice questions on 19 reading skills, from main idea, inference and vocabulary to phonics blends, opposites, text structure ("where does this paragraph fit?") and picture questions. The buddy reads the passage while pointing at each word, reads every question and its choices, and explains each answer. Answers are marked Y/N and the worksheet is scored out of 5 and can be printed. With an Anthropic key, "New story" writes a fresh passage aimed at the child's weakest skill (`/api/story`). To add more grades, add a `gradeN.ts` file and list it in `passages/index.ts`.
- Handwriting: trace letters, numbers and words, scored for coverage and neatness
- Math Blast: a 60-second arcade round with combos, adapted to the child's level
- Stars, streaks, 6 badges, a sticker book, confetti and sound effects
- Adaptive difficulty per subject

**Profiles and parents**
- Parent account protected by a PIN (stored as a SHA-256 hash), with lockout after 5 wrong tries
- Unlimited kid profiles: name, age, grade, buddy, interests (used in lessons), color, enabled subjects
- Dashboard per child: stars, streak, accuracy, minutes today, 7-day activity chart, per-subject skills, manual level override, insights, badges
- Daily screen-time limits, bedtime lock, voice volume and speed, subtitles, lesson language
- Privacy: no ads, no audio stored, progress kept on the device

## Architecture

```
server/            Express API (deploy anywhere Node runs)
  index.ts         /api/tutor, /api/tts, /api/health, rate limiting, serves dist/
  tutor.ts         Claude tutor: structured turns, refusal fallback, offline fallback
  offlineTutor.ts  rule-based lesson engine (also bundled into the app for offline use)
  tts.ts           ElevenLabs / Azure neural TTS proxy with caching
src/
  shared/          types, characters, content bank (used by server and app)
  characters/      Buddy (SVG rig), Stage (speak + point + write orchestration)
  voice/           speech (TTS + lip-sync), listen (speech recognition + mic level), sfx
  screens/         Welcome, ParentSetup, ParentGate, ParentDashboard, KidForm, KidHome,
                   TutorSession, Stories, ReadAlong, Tracing, MathGame, Buddies, Rewards
electron/          desktop shell (Windows / macOS / Linux)
capacitor.config.ts  iOS / Android shell
```

Desktop and mobile builds call the API at `VITE_API_BASE` (set it at build time to your deployed server). If the server can't be reached, they fall back to the on-device lesson engine.

## Live site: dr-mariam.com

dr-mariam.com and www.dr-mariam.com point to the Cloudflare Tunnel `kiddos` (config in `deploy/cloudflared-kiddos.yml`), which forwards to the Kiddos server on this PC at `127.0.0.1:8790`. The site is up only while this PC is on and both processes are running. It starts automatically when you log in to Windows: a shortcut to `deploy/start-site.cmd` is in your Startup folder (`shell:startup`, named "Kiddos site (dr-mariam.com)"). Delete that shortcut to turn auto-start off. You can also double-click the script to start the site by hand.

TutorIa keeps its own tunnel (`tutoria`, `~/.cloudflared/config.yml`) and is still served at live.dr-mariam.com. To give the main domain back to TutorIa:

```bash
cloudflared tunnel route dns --overwrite-dns tutoria dr-mariam.com
cloudflared tunnel route dns --overwrite-dns tutoria www.dr-mariam.com
```

## Windows installer

`npm run dist:win` produces `release/Kiddos Setup 1.0.0.exe`. The desktop app runs its own copy of the API, so it works without the web server. AI and voice keys go in `%APPDATA%\Kiddos\.env`, which the app creates on first launch. The installer is not code-signed, so Windows SmartScreen shows "More info → Run anyway" until a code-signing certificate is added.

## Notes for production

- Speech recognition uses the platform engine (Chrome, Edge, Safari, iOS, Android WebView). Electron's Chromium has no built-in recognizer, so desktop builds fall back to typing and tapping unless you add a cloud speech-to-text endpoint.
- Before release, review COPPA (US) and GDPR-K (EU) requirements, and add parental email verification if you collect emails server-side.
