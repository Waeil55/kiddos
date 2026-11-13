// Read-along: the buddy reads each page aloud while pointing at every word, then the child
// reads it back and each word lights up as it's heard. Ends with comprehension questions.
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Buddy from "../characters/Buddy";
import { usePointing } from "../characters/Stage";
import { Confetti, KidTopBar, MicButton, useLearningTimer } from "../components/Kit";
import { characterById } from "../shared/characters";
import { STORIES, normalizeAnswer } from "../shared/content";
import { useActiveKid, useApp } from "../store";
import { canListen, listen, type ListenHandle } from "../voice/listen";
import { sfx } from "../voice/sfx";
import { speak, stopSpeaking } from "../voice/speech";

type Phase = "listen" | "yourTurn" | "quiz" | "done";

export default function ReadAlong() {
  const { storyId } = useParams();
  const nav = useNavigate();
  const kid = useActiveKid()!;
  const { recordAnswer, settings } = useApp();
  const story = STORIES.find((s) => s.id === storyId);
  const c = characterById(kid.buddyId);
  const [page, setPage] = useState(0);
  const [phase, setPhase] = useState<Phase>("listen");
  const [wordIdx, setWordIdx] = useState(-1);
  const [readOk, setReadOk] = useState<boolean[]>([]);
  const [listening, setListening] = useState(false);
  const [level, setLevel] = useState(0);
  const [q, setQ] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [confetti, setConfetti] = useState(0);
  const [talking, setTalking] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buddyRef = useRef<HTMLDivElement>(null);
  const listenRef = useRef<ListenHandle | null>(null);
  useLearningTimer("story");

  const words = story ? story.pages[page]?.text.split(/\s+/) ?? [] : [];
  const pointSel = phase === "quiz" ? (picked === null ? "[data-point=question]" : `[data-point=opt-${picked}]`) : wordIdx >= 0 ? `[data-word="${wordIdx}"]` : "[data-point=picture]";
  const aim = usePointing(rootRef, buddyRef, pointSel, [wordIdx, page, phase, picked]);
  const say = async (text: string, onWord?: (i: number) => void) => {
    setTalking(true);
    await speak(text, { characterId: kid.buddyId, onWord, volume: settings.volume, rate: settings.voiceRate * 0.92 });
    setTalking(false);
  };

  // Buddy reads the page aloud, pointing at each word.
  useEffect(() => {
    if (!story || phase !== "listen") return;
    let live = true;
    setReadOk([]);
    (async () => {
      await say(page === 0 ? `${story.title}. Let's read together! Watch my finger.` : "");
      if (!live) return;
      await say(story.pages[page].text, (i) => live && setWordIdx(i));
      if (!live) return;
      setWordIdx(-1);
      setPhase("yourTurn");
      await say(`Now you read it, ${kid.name}! Tap the microphone and read out loud.`);
    })();
    return () => {
      live = false;
      stopSpeaking();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, phase, story]);

  useEffect(() => {
    if (!story || phase !== "quiz") return;
    setPicked(null);
    say(story.questions[q].q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, phase]);

  useEffect(() => () => listenRef.current?.stop(), []);

  if (!story) return <Navigate to="/stories" replace />;

  const checkReading = (said: string) => {
    const heard = new Set(said.split(/\s+/).map(normalizeAnswer));
    const ok = words.map((w) => heard.has(normalizeAnswer(w)));
    setReadOk(ok);
    return ok;
  };

  const readAloud = () => {
    if (listening) return listenRef.current?.stop();
    stopSpeaking();
    sfx.listen();
    setListening(true);
    listenRef.current = listen({
      onInterim: (t) => checkReading(t),
      onLevel: setLevel,
      onFinal: async (t) => {
        const ok = checkReading(t);
        const score = ok.filter(Boolean).length / Math.max(1, ok.length);
        recordAnswer("reading", score >= 0.7, score >= 0.9 ? 2 : score >= 0.7 ? 1 : 0);
        if (score >= 0.7) {
          sfx.correct();
          setConfetti((n) => n + 1);
          await say(score >= 0.9 ? "Wow! You read every word! I'm so proud of you!" : "Great reading! You got most of the words!");
        } else {
          const miss = words.find((_, i) => !ok[i]) ?? "";
          await say(`Good try! This word is tricky: ${miss}. Let's keep going!`);
        }
      },
      onEnd: () => setListening(false),
    });
  };

  const nextPage = () => {
    listenRef.current?.stop();
    stopSpeaking();
    if (page + 1 < story.pages.length) {
      setPage(page + 1);
      setPhase("listen");
    } else {
      setPhase("quiz");
      setQ(0);
    }
  };

  const answer = async (i: number) => {
    setPicked(i);
    const right = i === story.questions[q].answer;
    recordAnswer("reading", right, right ? 1 : 0);
    if (right) {
      sfx.correct();
      setConfetti((n) => n + 1);
      await say("That's right!");
    } else {
      sfx.wrong();
      await say(`Good thinking! The answer is: ${story.questions[q].options[story.questions[q].answer]}.`);
    }
    if (q + 1 < story.questions.length) setQ(q + 1);
    else {
      setPhase("done");
      say(`You finished ${story.title}! You're a super reader, ${kid.name}!`);
    }
  };

  const pg = story.pages[page];
  return (
    <div className="screen read" ref={rootRef} style={{ ["--kid" as string]: kid.color }}>
      <KidTopBar title={`${story.emoji} ${story.title}`} back="/stories" />
      <div className="read-body">
        <div className="read-book">
          {phase !== "quiz" && phase !== "done" && (
            <>
              <div className="read-picture" data-point="picture">{pg.picture}</div>
              <p className="read-text">
                {words.map((w, i) => (
                  <span key={i} data-word={i} className={`rw ${i === wordIdx ? "rw-now" : ""} ${readOk[i] ? "rw-ok" : readOk.length && !readOk[i] && !listening ? "rw-miss" : ""}`}>
                    {w}
                  </span>
                ))}
              </p>
              <div className="read-controls">
                <button className="btn btn-ghost" onClick={() => setPhase("listen")}>
                  🔁 Read it again
                </button>
                {phase === "yourTurn" && canListen() && <MicButton listening={listening} level={level} onClick={readAloud} />}
                <button className="btn" onClick={nextPage}>
                  {page + 1 < story.pages.length ? "Next page →" : "Questions →"}
                </button>
              </div>
              <div className="dots">
                {story.pages.map((_, i) => (
                  <span key={i} className={i === page ? "dot on" : "dot"} />
                ))}
              </div>
            </>
          )}
          {phase === "quiz" && (
            <div className="quiz">
              <h2 data-point="question">{story.questions[q].q}</h2>
              <div className="quiz-options">
                {story.questions[q].options.map((o, i) => (
                  <button
                    key={o}
                    data-point={`opt-${i}`}
                    className={`opt ${picked === i ? (i === story.questions[q].answer ? "card-right" : "card-wrong") : ""}`}
                    onClick={() => picked === null && answer(i)}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
          )}
          {phase === "done" && (
            <div className="quiz">
              <h2>🎉 The End!</h2>
              <button className="btn btn-big" onClick={() => nav("/stories")}>
                More stories
              </button>
            </div>
          )}
        </div>
        <div className="read-buddy" ref={buddyRef}>
          <Buddy character={c} gesture="point" pointAngle={aim?.angle ?? 200} look={aim?.look} size={230} className={talking ? "talking" : "idle"} />
        </div>
      </div>
      <Confetti fire={confetti} />
    </div>
  );
}
