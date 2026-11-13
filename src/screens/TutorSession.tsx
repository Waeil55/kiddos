// The AI tutor lesson: the child talks (or taps, or types), the buddy listens, then answers out loud
// while pointing at picture cards and writing on the whiteboard.
import { useCallback, useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Stage from "../characters/Stage";
import { Confetti, KidTopBar, MicButton, useLearningTimer } from "../components/Kit";
import { askTutor, sendReport } from "../api";
import { offlineTutorLocal } from "../offline";
import { characterById } from "../shared/characters";
import { BADGES, matchesAnswer } from "../shared/content";
import type { ChatLine, PictureCard, Subject, TutorRequest, TutorTurn } from "../shared/types";
import { kidMemory, useActiveKid, useApp } from "../store";
import { canListen, listen, type ListenHandle } from "../voice/listen";
import { sfx } from "../voice/sfx";
import { prefetchSpeech, speak, stopSpeaking } from "../voice/speech";

// Said right away while the AI thinks, so the child never waits in silence.
const FILLERS = ["Hmm, let me think!", "Ooh, good one!", "Hmm, let's see...", "Okay, thinking!", "Ooh, I like that!"];
import { SUBJECT_INFO } from "./KidForm";

// The child's real name never leaves the device: requests carry the token {name} instead, and the
// app puts the real name back into each turn when it arrives.
const NAME = "{name}";
const escapeRe = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Real name -> {name} (whole word, any case). Uses a capture group, not lookbehind, for older iOS. */
function tokenize(text: string, name: string): string {
  if (!name.trim()) return text;
  return text.replace(new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRe(name.trim())}(?=$|[^\\p{L}\\p{N}])`, "giu"), `$1${NAME}`);
}
/** {name} -> real name. */
const fillName = (text: string, name: string) => text.split(NAME).join(name);
function fillTurn(t: TutorTurn, name: string): TutorTurn {
  return {
    ...t,
    speech: fillName(t.speech, name),
    caption: fillName(t.caption, name),
    board: fillName(t.board, name),
    cards: t.cards.map((c) => ({ ...c, label: fillName(c.label, name) })),
  };
}

export default function TutorSession() {
  const { subject = "free" } = useParams();
  const kid = useActiveKid()!;
  const { recordAnswer, settings } = useApp();
  const listenOk = canListen();
  const [turn, setTurn] = useState<TutorTurn | null>(null);
  const [history, setHistory] = useState<ChatLine[]>([]);
  const [thinking, setThinking] = useState(false);
  const [listening, setListening] = useState(false);
  const [level, setLevel] = useState(0);
  const [heard, setHeard] = useState("");
  const [typed, setTyped] = useState("");
  const [note, setNote] = useState("");
  const [cardState, setCardState] = useState<Record<number, "right" | "wrong">>({});
  const [confetti, setConfetti] = useState(0);
  const [handsFree, setHandsFree] = useState(listenOk);
  const [reported, setReported] = useState("");
  const [source, setSource] = useState<"ai" | "offline">("offline");
  const listenRef = useRef<ListenHandle | null>(null);
  const valid = subject in SUBJECT_INFO && kid.enabledSubjects.includes(subject as Subject);
  useLearningTimer(valid ? (subject as Subject) : "free");

  const send = useCallback(
    async (message: string, display?: string) => {
      if (thinking) return;
      listenRef.current?.stop();
      stopSpeaking();
      const expected = turn?.answers ?? [];
      // Instant local feedback when we know the answer.
      if (message !== "__start__" && expected.length) {
        if (matchesAnswer(message, expected)) {
          sfx.correct();
          setConfetti((n) => n + 1);
        } else sfx.wrong();
      }
      const newHistory: ChatLine[] = message === "__start__" ? history : [...history, { role: "child", text: display ?? message }];
      setHistory(newHistory);
      setThinking(true);
      setHeard(display ?? (message === "__start__" ? "" : message));
      // If the answer takes more than a moment, the buddy fills the gap like a person would.
      let answered = false;
      const filler = window.setTimeout(() => {
        if (!answered && message !== "__start__") speak(FILLERS[Math.floor(Math.random() * FILLERS.length)], { characterId: kid.buddyId, volume: settings.volume, rate: settings.voiceRate });
      }, 650);
      const req: TutorRequest = {
        characterId: kid.buddyId,
        subject: subject as Subject,
        child: { name: NAME, age: kid.age, grade: kid.grade, interests: kid.interests.map((i) => tokenize(i, kid.name)), level: kid.levels[subject] ?? 1, language: settings.language },
        history: newHistory.map((l) => ({ ...l, text: tokenize(l.text, kid.name) })),
        message: tokenize(message, kid.name),
        expected,
        memory: kidMemory(kid),
      };
      let result: { turn: TutorTurn; source: "ai" | "offline" };
      // With the AI tutor off (the default) nothing is sent: the lesson engine runs on the device.
      if (!settings.aiTutor) result = { turn: offlineTutorLocal(req), source: "offline" };
      else
        try {
          result = await askTutor(req);
        } catch {
          result = { turn: offlineTutorLocal(req), source: "offline" };
        }
      answered = true;
      clearTimeout(filler);
      setSource(result.source);
      const t = fillTurn(result.turn, kid.name);
      if (t.correct !== null && message !== "__start__") {
        const earned = recordAnswer(subject as Subject, t.correct, t.stars);
        if (t.stars > 0) sfx.star();
        if (earned.length) {
          const b = BADGES.find((x) => x.id === earned[0])!;
          setNote(`New badge: ${b.emoji} ${b.name}!`);
          setConfetti((n) => n + 1);
        }
      }
      setCardState({});
      setHistory((h) => [...h, { role: "buddy", text: t.speech }]);
      setTurn(t);
      setThinking(false);
    },
    [thinking, turn, history, kid, subject, settings.language, settings.aiTutor, recordAnswer]
  );

  useEffect(() => {
    if (valid) send("__start__");
    for (const f of FILLERS) prefetchSpeech(kid.buddyId, f);
    return () => {
      listenRef.current?.stop();
      stopSpeaking();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startListening = () => {
    if (!listenOk) return;
    if (listening) return listenRef.current?.stop();
    stopSpeaking();
    sfx.listen();
    setHeard("");
    setNote("");
    setListening(true);
    listenRef.current = listen({
      lang: settings.language === "Spanish" ? "es-ES" : settings.language === "French" ? "fr-FR" : settings.language === "Arabic" ? "ar-SA" : "en-US",
      onInterim: setHeard,
      onLevel: setLevel,
      onFinal: (text) => send(text),
      onError: (m) => setNote(m),
      onEnd: () => setListening(false),
    });
  };

  // Hands-free: once the buddy finishes a question, open the mic automatically.
  const onSpoken = () => {
    if (listenOk && handsFree && turn?.expectsAnswer && !listening) setTimeout(startListening, 250);
  };

  const onCardTap = (card: PictureCard, i: number) => {
    if (thinking) return;
    sfx.tap();
    if (card.correct !== undefined) setCardState({ [i]: card.correct ? "right" : "wrong" });
    send(card.label && card.label !== "?" ? card.label : card.emoji, `${card.emoji} ${card.label}`);
  };

  // "Tell a grown-up": flags the last buddy line (and what the child said) for review.
  const report = async () => {
    const lastBuddy = [...history].reverse().find((l) => l.role === "buddy")?.text ?? turn?.speech ?? "";
    const lastChild = [...history].reverse().find((l) => l.role === "child")?.text ?? "";
    setReported("Sending...");
    // With the AI tutor off, nothing the child typed or said leaves the device; only the buddy's line is reported.
    const ok = await sendReport({ subject, speech: tokenize(lastBuddy, kid.name), childText: settings.aiTutor ? tokenize(lastChild, kid.name) : "" });
    setReported(ok ? "Thanks! A grown-up will look." : "Couldn't send that. Please tell a grown-up!");
  };

  if (!valid) return <Navigate to="/home" replace />;
  const c = characterById(kid.buddyId);

  return (
    <div className="screen lesson" style={{ ["--kid" as string]: kid.color }}>
      <KidTopBar title={`${SUBJECT_INFO[subject as Subject].emoji} ${SUBJECT_INFO[subject as Subject].name}`} />
      <Stage characterId={kid.buddyId} turn={turn} onSpoken={onSpoken} onCardTap={onCardTap} cardState={cardState} listening={listening} thinking={thinking}>
        {thinking && (
          <div className="thinking" aria-live="polite">
            <span /> <span /> <span /> {c.name} is thinking
          </div>
        )}
      </Stage>
      <Confetti fire={confetti} />

      <footer className="talk-bar">
        {heard && <div className="heard">“{heard}”</div>}
        {note && <div className="note">{note}</div>}
        {listenOk && <MicButton listening={listening} level={level} onClick={startListening} disabled={thinking} />}
        <form
          className="type-box"
          onSubmit={(e) => {
            e.preventDefault();
            if (typed.trim()) {
              send(typed.trim());
              setTyped("");
            }
          }}
        >
          <input value={typed} onChange={(e) => setTyped(e.target.value)} placeholder="…or type here" aria-label="Type your answer" />
          <button className="btn btn-small" type="submit" disabled={thinking}>
            Send
          </button>
        </form>
        <div className="lesson-tools">
          {listenOk && (
            <label className="check small">
              <input type="checkbox" checked={handsFree} onChange={(e) => setHandsFree(e.target.checked)} /> Hands-free
            </label>
          )}
          <button className="btn btn-small btn-ghost" onClick={() => turn && setTurn({ ...turn })} disabled={!turn || thinking}>
            🔁 Say again
          </button>
          <button className="btn btn-small btn-ghost" onClick={report} disabled={!turn || !!reported}>
            🙋 Tell a grown-up
          </button>
          {reported && <span className="small" aria-live="polite">{reported}</span>}
          <span className="muted small">{source === "ai" ? "AI tutor" : "Lesson engine"}</span>
        </div>
      </footer>
    </div>
  );
}
