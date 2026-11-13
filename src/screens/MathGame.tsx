// Math Blast: a 60-second arcade round. The buddy reads each problem and points at the right answer
// after every guess. Difficulty follows the child's math level.
import { useEffect, useRef, useState } from "react";
import Buddy from "../characters/Buddy";
import { usePointing } from "../characters/Stage";
import { Confetti, KidTopBar, useLearningTimer } from "../components/Kit";
import { characterById } from "../shared/characters";
import { useActiveKid, useApp } from "../store";
import { sfx } from "../voice/sfx";
import { speak, stopSpeaking } from "../voice/speech";

interface Problem {
  a: number;
  b: number;
  op: "+" | "−" | "×";
  answer: number;
  options: number[];
  emoji: string;
}

function makeProblem(level: number): Problem {
  const ops: Problem["op"][] = level === 1 ? ["+"] : level === 2 ? ["+", "−"] : ["+", "−", "×"];
  const op = ops[Math.floor(Math.random() * ops.length)];
  const max = level === 1 ? 5 : level === 2 ? 10 : 12;
  let a = 1 + Math.floor(Math.random() * max);
  let b = 1 + Math.floor(Math.random() * (op === "×" ? 10 : max));
  if (op === "−" && b > a) [a, b] = [b, a];
  const answer = op === "+" ? a + b : op === "−" ? a - b : a * b;
  const set = new Set([answer]);
  while (set.size < 3) set.add(Math.max(0, answer + Math.floor(Math.random() * 7) - 3));
  return { a, b, op, answer, options: [...set].sort(() => Math.random() - 0.5), emoji: ["🍎", "⭐", "🐟", "🍪", "🎈", "🚗"][Math.floor(Math.random() * 6)] };
}

const opWord = { "+": "plus", "−": "minus", "×": "times" };

export default function MathGame() {
  const kid = useActiveKid()!;
  const { recordAnswer, settings } = useApp();
  const c = characterById(kid.buddyId);
  const level = kid.levels.math ?? 1;
  const [state, setState] = useState<"ready" | "play" | "over">("ready");
  const [p, setP] = useState<Problem>(() => makeProblem(level));
  const [time, setTime] = useState(60);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [confetti, setConfetti] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buddyRef = useRef<HTMLDivElement>(null);
  const correctIdx = p.options.indexOf(p.answer);
  const aim = usePointing(rootRef, buddyRef, picked !== null ? `[data-point=ans-${correctIdx}]` : "[data-point=problem]", [p, picked, state]);
  useLearningTimer("game");

  useEffect(() => {
    if (state !== "play") return;
    const id = setInterval(() => setTime((t) => (t <= 1 ? (clearInterval(id), setState("over"), 0) : t - 1)), 1000);
    return () => clearInterval(id);
  }, [state]);

  useEffect(() => {
    if (state === "play") speak(`What is ${p.a} ${opWord[p.op]} ${p.b}?`, { characterId: kid.buddyId, volume: settings.volume, rate: settings.voiceRate * 1.1 });
    if (state === "over") speak(`Time's up! You scored ${score} points! ${score >= 8 ? c.catchphrase : "Great practice!"}`, { characterId: kid.buddyId });
    return () => stopSpeaking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p, state]);

  const choose = (n: number, i: number) => {
    if (picked !== null || state !== "play") return;
    setPicked(i);
    const right = n === p.answer;
    recordAnswer("math", right, right && combo >= 2 ? 2 : right ? 1 : 0);
    if (right) {
      sfx.correct();
      setScore((s) => s + 1 + Math.floor(combo / 3));
      setCombo((x) => x + 1);
      if ((combo + 1) % 5 === 0) setConfetti((x) => x + 1);
    } else {
      sfx.wrong();
      setCombo(0);
      speak(`It's ${p.answer}!`, { characterId: kid.buddyId });
    }
    setTimeout(() => {
      setPicked(null);
      setP(makeProblem(level));
    }, right ? 700 : 1600);
  };

  return (
    <div className="screen mathgame" ref={rootRef} style={{ ["--kid" as string]: kid.color }}>
      <KidTopBar title="🚀 Math blast" />
      {state === "ready" && (
        <div className="center-col">
          <Buddy character={c} gesture="cheer" size={240} emotion="excited" />
          <h2>Answer as many as you can in 60 seconds!</h2>
          <button className="btn btn-big" onClick={() => (setState("play"), setTime(60), setScore(0), setCombo(0))}>
            Blast off! 🚀
          </button>
        </div>
      )}
      {state === "play" && (
        <div className="math-body">
          <div className="math-hud">
            <span className="pill">⏱ {time}s</span>
            <span className="pill">🏅 {score}</span>
            {combo >= 3 && <span className="pill hot">🔥 x{combo}</span>}
          </div>
          <div className="problem" data-point="problem">
            {level === 1 && p.op === "+" && (
              <div className="count-row">
                <span>{p.emoji.repeat(p.a)}</span>
                <span>+</span>
                <span>{p.emoji.repeat(p.b)}</span>
              </div>
            )}
            <div className="problem-text">
              {p.a} {p.op} {p.b} = ?
            </div>
          </div>
          <div className="answers">
            {p.options.map((n, i) => (
              <button key={i} data-point={`ans-${i}`} className={`answer ${picked !== null && i === correctIdx ? "card-right" : picked === i ? "card-wrong" : ""}`} onClick={() => choose(n, i)}>
                {n}
              </button>
            ))}
          </div>
          <div ref={buddyRef} className="math-buddy">
            <Buddy character={c} gesture="point" pointAngle={aim?.angle ?? -90} look={aim?.look} size={170} emotion={picked === null ? "curious" : picked === correctIdx ? "proud" : "calm"} />
          </div>
        </div>
      )}
      {state === "over" && (
        <div className="center-col">
          <Buddy character={c} gesture="thumbsUp" size={240} emotion="proud" />
          <h2>You scored {score}!</h2>
          <button className="btn btn-big" onClick={() => (setState("play"), setTime(60), setScore(0), setCombo(0), setP(makeProblem(level)))}>
            Play again
          </button>
        </div>
      )}
      <Confetti fire={confetti} />
    </div>
  );
}
