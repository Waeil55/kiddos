// Handwriting practice: the buddy writes the letter first, then the child traces it with a finger.
import { useEffect, useRef, useState } from "react";
import Buddy from "../characters/Buddy";
import { usePointing } from "../characters/Stage";
import { Confetti, KidTopBar, useLearningTimer } from "../components/Kit";
import { characterById } from "../shared/characters";
import { WORDS } from "../shared/content";
import { useActiveKid, useApp } from "../store";
import { sfx } from "../voice/sfx";
import { speak, stopSpeaking } from "../voice/speech";

const SETS: Record<string, string[]> = {
  "ABC": "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
  "abc": "abcdefghijklmnopqrstuvwxyz".split(""),
  "123": "0123456789".split(""),
  "Words": WORDS.filter((w) => w.level === 1).map((w) => w.word),
};

const W = 640;
const H = 400;

export default function Tracing() {
  const kid = useActiveKid()!;
  const { recordAnswer, settings } = useApp();
  const c = characterById(kid.buddyId);
  const [set, setSet] = useState("ABC");
  const [idx, setIdx] = useState(0);
  const [demo, setDemo] = useState(true);
  const [score, setScore] = useState<number | null>(null);
  const [confetti, setConfetti] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const guideRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buddyRef = useRef<HTMLDivElement>(null);
  const [penPos, setPenPos] = useState<{ x: number; y: number } | null>(null);
  const aim = usePointing(rootRef, buddyRef, "[data-point=pad]", [idx, set]);
  useLearningTimer("spelling");

  const target = SETS[set][idx % SETS[set].length];
  const fontSize = target.length > 1 ? 190 : 300;

  // Build the guide (faded letter) and run the buddy's writing demo.
  useEffect(() => {
    const cv = canvasRef.current!;
    const ctx = cv.getContext("2d")!;
    const guide = document.createElement("canvas");
    guide.width = W;
    guide.height = H;
    const g = guide.getContext("2d")!;
    g.font = `700 ${fontSize}px "Baloo 2", system-ui, sans-serif`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillStyle = "#000";
    g.fillText(target, W / 2, H / 2 + 10);
    guideRef.current = guide;

    ctx.clearRect(0, 0, W, H);
    setScore(null);
    setDemo(true);
    let live = true;
    let x = 0;
    const metrics = g.measureText(target);
    const left = W / 2 - metrics.width / 2 - 10;
    const right = W / 2 + metrics.width / 2 + 10;
    const drawBase = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = 0.13;
      ctx.drawImage(guide, 0, 0);
      ctx.globalAlpha = 1;
    };
    drawBase();
    speak(`Watch me write ${target.length > 1 ? "the word" : "the letter"} ${target}. Then you trace it!`, { characterId: kid.buddyId, volume: settings.volume, rate: settings.voiceRate });
    // Reveal the letter left-to-right in a sweeping column, with the pen following the ink.
    x = left;
    const step = () => {
      if (!live) return;
      x += (right - left) / 70;
      drawBase();
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, x, H);
      ctx.clip();
      ctx.globalAlpha = 0.85;
      ctx.filter = "hue-rotate(200deg)";
      ctx.drawImage(guide, 0, 0);
      ctx.restore();
      // Find the ink row at this column for the pen tip.
      const col = g.getImageData(Math.min(W - 1, Math.max(0, Math.round(x))), 0, 1, H).data;
      let y = H / 2;
      for (let yy = 0; yy < H; yy++) if (col[yy * 4 + 3] > 0) { y = yy; break; }
      setPenPos({ x: (x / W) * 100, y: (y / H) * 100 });
      if (x < right) requestAnimationFrame(step);
      else
        setTimeout(() => {
          if (!live) return;
          setPenPos(null);
          drawBase();
          setDemo(false);
        }, 500);
    };
    const t = setTimeout(() => requestAnimationFrame(step), 900);
    return () => {
      live = false;
      clearTimeout(t);
      stopSpeaking();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  const pos = (e: React.PointerEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * W, y: ((e.clientY - r.top) / r.height) * H };
  };
  const down = (e: React.PointerEvent) => {
    if (demo) return;
    drawing.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = kid.color;
    ctx.lineWidth = target.length > 1 ? 18 : 28;
    ctx.lineCap = ctx.lineJoin = "round";
    ctx.stroke();
  };
  const up = () => (drawing.current = false);

  const check = async () => {
    const ctx = canvasRef.current!.getContext("2d")!;
    const kidPx = ctx.getImageData(0, 0, W, H).data;
    const guidePx = guideRef.current!.getContext("2d")!.getImageData(0, 0, W, H).data;
    let inGuide = 0, covered = 0, inked = 0, outside = 0;
    for (let i = 3; i < kidPx.length; i += 16) {
      const g = guidePx[i] > 0;
      const k = kidPx[i] > 60; // the faint guide itself is ~33 alpha
      if (g) inGuide++;
      if (g && k) covered++;
      if (k) inked++;
      if (k && !g) outside++;
    }
    const coverage = covered / Math.max(1, inGuide);
    const neatness = 1 - outside / Math.max(1, inked);
    const s = Math.round(Math.max(0, Math.min(1, coverage * 0.75 + neatness * 0.35)) * 100);
    setScore(s);
    const good = s >= 60;
    recordAnswer("spelling", good, s >= 85 ? 2 : good ? 1 : 0);
    if (good) {
      sfx.correct();
      setConfetti((n) => n + 1);
      await speak(s >= 85 ? `Beautiful writing! That's a perfect ${target}!` : `Nice job writing ${target}!`, { characterId: kid.buddyId });
    } else {
      sfx.wrong();
      await speak("Good try! Follow the gray lines and try again.", { characterId: kid.buddyId });
    }
  };

  const clear = () => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = 0.13;
    ctx.drawImage(guideRef.current!, 0, 0);
    ctx.globalAlpha = 1;
    setScore(null);
  };

  return (
    <div className="screen trace" ref={rootRef} style={{ ["--kid" as string]: kid.color }}>
      <KidTopBar title="✍️ Write letters" />
      <div className="chips center">
        {Object.keys(SETS).map((k) => (
          <button key={k} className={`chip ${set === k ? "on" : ""}`} onClick={() => (setSet(k), setIdx(0))}>
            {k}
          </button>
        ))}
      </div>
      <div className="trace-body">
        <div className="pad-wrap" data-point="pad">
          <canvas ref={canvasRef} width={W} height={H} className="pad" onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up} />
          {penPos && (
            <div className="pad-pen" style={{ left: `${penPos.x}%`, top: `${penPos.y}%` }}>
              ✏️
            </div>
          )}
          {score !== null && <div className="pad-score">{score >= 85 ? "🌟" : score >= 60 ? "⭐" : "💪"} {score}%</div>}
        </div>
        <div ref={buddyRef} className="trace-buddy">
          <Buddy character={c} gesture={demo ? "write" : "point"} holdingPen={demo} pointAngle={aim?.angle ?? 200} look={aim?.look} size={200} />
        </div>
      </div>
      <div className="read-controls">
        <button className="btn btn-ghost" onClick={() => setIdx((i) => (i - 1 + SETS[set].length) % SETS[set].length)}>
          ← Back
        </button>
        <button className="btn btn-ghost" onClick={clear} disabled={demo}>
          🧽 Clear
        </button>
        <button className="btn" onClick={check} disabled={demo}>
          ✅ Check
        </button>
        <button className="btn btn-ghost" onClick={() => setIdx((i) => i + 1)}>
          Next →
        </button>
      </div>
      <Confetti fire={confetti} />
    </div>
  );
}
