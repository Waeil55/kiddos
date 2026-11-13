// One reading comprehension worksheet: the buddy reads the passage aloud while pointing at each
// word, then asks five multiple-choice questions (A-D bubbles), explains every answer, marks
// each question Y or N, and totals the score like a paper worksheet.
import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import Buddy from "../characters/Buddy";
import { usePointing } from "../characters/Stage";
import { Confetti, KidTopBar, useLearningTimer } from "../components/Kit";
import { characterById } from "../shared/characters";
import { findPassage, gradeLabel, LETTERS, passagesForGrade, SKILLS } from "../shared/passages";
import { useActiveKid, useApp } from "../store";
import { sfx } from "../voice/sfx";
import { speak, stopSpeaking } from "../voice/speech";

type Phase = "read" | "questions" | "done";

export default function ReadingPassage() {
  const { passageId = "" } = useParams();
  const nav = useNavigate();
  const kid = useActiveKid()!;
  const { recordAnswer, saveReading, settings } = useApp();
  const passage = useMemo(() => findPassage(passageId, kid.myPassages), [passageId, kid.myPassages]);
  const c = characterById(kid.buddyId);
  const [phase, setPhase] = useState<Phase>("read");
  const [wordIdx, setWordIdx] = useState(-1);
  const [reading, setReading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [picks, setPicks] = useState<(number | null)[]>([]);
  const [pointAt, setPointAt] = useState<string | null>(null);
  const [talking, setTalking] = useState(false);
  const [confetti, setConfetti] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buddyRef = useRef<HTMLDivElement>(null);
  const liveRef = useRef(0);
  useLearningTimer("story");

  const words = useMemo(() => passage?.text.split(/\s+/) ?? [], [passage]);
  const selector = wordIdx >= 0 ? `[data-word="${wordIdx}"]` : pointAt;
  const aim = usePointing(rootRef, buddyRef, selector, [wordIdx, pointAt, phase, current]);

  const say = async (text: string, onWord?: (i: number) => void) => {
    const run = liveRef.current;
    setTalking(true);
    await speak(text, { characterId: kid.buddyId, onWord, volume: settings.volume, rate: settings.voiceRate * 0.95 });
    if (run === liveRef.current) setTalking(false);
    return run === liveRef.current;
  };
  const hush = () => {
    liveRef.current++;
    stopSpeaking();
    setTalking(false);
    setReading(false);
    setWordIdx(-1);
  };

  useEffect(() => {
    if (!passage) return;
    const t = setTimeout(() => {
      setPointAt("[data-point=title]");
      say(`Let's read "${passage.title}". You can read it yourself, or tap "Read to me" and I'll read it while you follow my finger.`);
    }, 300);
    return () => {
      clearTimeout(t);
      hush();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passage?.id]);

  // Ask the current question: read it and its choices, pointing at the question.
  useEffect(() => {
    if (!passage || phase !== "questions") return;
    document.querySelector(`[data-q="${current}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
    askQuestion(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, phase]);

  if (!passage) return <Navigate to="/reading" replace />;
  const qs = passage.questions;

  const askQuestion = async (n: number) => {
    hush();
    const qq = qs[n];
    setPointAt(`[data-q="${n}"] .ws-q-text`);
    if (!(await say(`Question ${n + 1}. ${qq.q}`))) return;
    for (let i = 0; i < qq.options.length; i++) {
      setPointAt(`[data-opt="${n}-${i}"]`);
      if (!(await say(`${LETTERS[i]}: ${qq.options[i]}.`))) return;
    }
    setPointAt(`[data-q="${n}"] .ws-q-text`);
  };

  const readToMe = async () => {
    if (reading) return hush();
    hush();
    setReading(true);
    const run = liveRef.current;
    await say(passage.text, (i) => run === liveRef.current && setWordIdx(i));
    if (run !== liveRef.current) return;
    setWordIdx(-1);
    setReading(false);
    if (phase === "read") {
      setPointAt("[data-point=start]");
      say("Now let's answer the questions! Tap “Answer questions” when you're ready.");
    }
  };

  const start = () => {
    hush();
    sfx.tap();
    setPicks(qs.map(() => null));
    setCurrent(0);
    setPhase("questions");
  };

  const pick = async (i: number) => {
    if (picks[current] != null) return;
    hush();
    const qq = qs[current];
    const right = i === qq.answer;
    const next = picks.map((p, k) => (k === current ? i : p));
    setPicks(next);
    setPointAt(`[data-opt="${current}-${qq.answer}"]`);
    recordAnswer("reading", right, right ? 1 : 0);
    if (right) {
      sfx.correct();
      setConfetti((n) => n + 1);
      await say(`Yes! ${LETTERS[i]} is right. ${qq.why}`);
    } else {
      sfx.wrong();
      await say(`Good try! The answer is ${LETTERS[qq.answer]}, ${qq.options[qq.answer]}. ${qq.why}`);
    }
  };

  const nextQuestion = () => {
    hush();
    if (current + 1 < qs.length) return setCurrent(current + 1);
    const answers = qs.map((qq, k) => ({ skill: qq.skill, ok: picks[k] === qq.answer }));
    saveReading(passage.id, answers);
    const score = answers.filter((a) => a.ok).length;
    setPhase("done");
    setPointAt("[data-point=score]");
    if (score >= 4) setConfetti((n) => n + 1);
    setTimeout(() => document.querySelector("[data-point=score]")?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
    say(
      score === qs.length
        ? `Perfect score! ${score} out of ${qs.length}! You're a reading superstar, ${kid.name}!`
        : score >= 3
          ? `You got ${score} out of ${qs.length}! Great reading, ${kid.name}! Look at the ones marked N and see if you can find the answer in the story.`
          : `You got ${score} out of ${qs.length}. Reading carefully takes practice. Let's read the story again and give it another try!`
    );
  };

  const retry = () => {
    hush();
    setPhase("read");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(start, 100);
  };

  const gradeList = passagesForGrade(passage.grade, kid.myPassages);
  const nextPassage = gradeList.slice(gradeList.indexOf(passage) + 1).find((p) => !kid.reading?.[p.id]) ?? gradeList.find((p) => !kid.reading?.[p.id] && p.id !== passage.id);
  const score = qs.filter((qq, k) => picks[k] === qq.answer).length;
  const answered = picks[current] != null;
  const best = kid.reading?.[passage.id];

  return (
    <div className="screen ws" ref={rootRef} style={{ ["--kid" as string]: kid.color }}>
      <KidTopBar title={`${passage.emoji} ${passage.title}`} back="/reading" />
      <div className="ws-body">
        <article className="ws-sheet">
          <header className="ws-head">
            <span className="ws-tag">{gradeLabel(passage.grade)} · {passage.genre}</span>
            <h1 data-point="title">{passage.title}</h1>
            {best && phase === "read" && <span className="muted small">Best score: {best.best}/{best.total}</span>}
          </header>
          <p className="ws-text">
            {words.map((w, i) => (
              <span key={i} data-word={i} className={i === wordIdx ? "ww ww-now" : "ww"}>
                {w}{" "}
              </span>
            ))}
          </p>
          <div className="ws-tools no-print">
            <button className="btn btn-ghost" onClick={readToMe}>
              {reading ? "⏹ Stop reading" : "🔊 Read to me"}
            </button>
            {phase === "read" && (
              <button className="btn" data-point="start" onClick={start}>
                ✏️ Answer questions
              </button>
            )}
          </div>

          {phase !== "read" && (
            <ol className="ws-questions">
              {qs.map((qq, n) => {
                const p = picks[n];
                const open = n === current && phase === "questions";
                const locked = phase === "questions" && n > current;
                return (
                  <li key={n} data-q={n} className={`ws-q ${open ? "open" : ""} ${locked ? "locked" : ""}`}>
                    <div className="ws-q-main">
                      <div className="ws-q-text">
                        <b>{n + 1}.</b> {qq.q}
                        {open && (
                          <button className="ws-say no-print" onClick={() => askQuestion(n)} aria-label="Read the question again">
                            🔊
                          </button>
                        )}
                      </div>
                      <div className="ws-opts">
                        {qq.options.map((o, i) => {
                          const state = p == null ? "" : i === qq.answer ? "right" : i === p ? "wrong" : "";
                          return (
                            <button key={i} data-opt={`${n}-${i}`} className={`ws-opt ${state} ${p === i ? "picked" : ""}`} disabled={!open || p != null} onClick={() => pick(i)}>
                              <span className="bubble">{LETTERS[i]}</span>
                              <span>{o}</span>
                            </button>
                          );
                        })}
                      </div>
                      {p != null && (
                        <p className="ws-why">
                          <span className="ws-skill">{SKILLS[qq.skill]}</span> {qq.why}
                        </p>
                      )}
                      {open && answered && (
                        <button className="btn no-print" onClick={nextQuestion}>
                          {current + 1 < qs.length ? "Next question →" : "See my score →"}
                        </button>
                      )}
                    </div>
                    <div className={`ws-yn ${p == null ? "" : p === qq.answer ? "y" : "n"}`} aria-label={p == null ? "Not answered" : p === qq.answer ? "Correct" : "Incorrect"}>
                      {p == null ? "" : p === qq.answer ? "Y" : "N"}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}

          {phase === "done" && (
            <div className="ws-score" data-point="score">
              <div className="ws-total">
                <span>Score</span>
                <b>
                  {score}/{qs.length}
                </b>
              </div>
              <p>{score === qs.length ? "🌟 Perfect!" : score >= 3 ? "👏 Great job!" : "💪 Keep practicing!"}</p>
              <div className="ws-end-actions no-print">
                <button className="btn btn-ghost" onClick={retry}>
                  🔁 Try again
                </button>
                {/* The phone apps have no print dialog. */}
                {!Capacitor.isNativePlatform() && (
                  <button className="btn btn-ghost" onClick={() => window.print()}>
                    🖨 Print
                  </button>
                )}
                {nextPassage ? (
                  <button className="btn" onClick={() => nav(`/reading/${nextPassage.id}`)}>
                    Next story: {nextPassage.emoji} {nextPassage.title} →
                  </button>
                ) : (
                  <button className="btn" onClick={() => nav("/reading")}>
                    All stories →
                  </button>
                )}
              </div>
            </div>
          )}
        </article>
        <aside className="ws-buddy no-print" ref={buddyRef}>
          <Buddy character={c} gesture="point" pointAngle={aim?.angle ?? 200} look={aim?.look} size={220} className={talking ? "talking" : "idle"} />
        </aside>
      </div>
      <Confetti fire={confetti} />
    </div>
  );
}
