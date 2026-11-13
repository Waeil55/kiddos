// Shared kid-screen pieces: top bar, confetti, mic button with live waveform, and the time tracker.
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { secondsToday, useActiveKid, useApp, type SessionLog } from "../store";
import { speak } from "../voice/speech";

export function KidTopBar({ title, back = "/home" }: { title?: string; back?: string }) {
  const nav = useNavigate();
  const kid = useActiveKid();
  return (
    <header className="kid-top">
      <button className="round-btn" onClick={() => nav(back)} aria-label="Back">
        ←
      </button>
      {title && <span className="kid-top-title">{title}</span>}
      <span className="pill">⭐ {kid?.stars ?? 0}</span>
      <span className="pill">🔥 {kid?.streak ?? 0}</span>
    </header>
  );
}

export function Confetti({ fire }: { fire: number }) {
  const [pieces, setPieces] = useState<{ id: number; x: number; c: string; d: number; r: number }[]>([]);
  useEffect(() => {
    if (!fire) return;
    const colors = ["#ff7a59", "#1fb8a6", "#ffd34d", "#7c5cff", "#ef4ea0", "#22c55e"];
    setPieces(Array.from({ length: 60 }, (_, i) => ({ id: fire * 100 + i, x: Math.random() * 100, c: colors[i % colors.length], d: Math.random() * 0.4, r: Math.random() * 360 })));
    const t = setTimeout(() => setPieces([]), 2200);
    return () => clearTimeout(t);
  }, [fire]);
  return (
    <div className="confetti" aria-hidden>
      {pieces.map((p) => (
        <i key={p.id} style={{ left: `${p.x}%`, background: p.c, animationDelay: `${p.d}s`, transform: `rotate(${p.r}deg)` }} />
      ))}
    </div>
  );
}

export function MicButton({ listening, level, onClick, disabled }: { listening: boolean; level: number; onClick: () => void; disabled?: boolean }) {
  const bars = 24;
  return (
    <button className={`mic ${listening ? "mic-on" : ""}`} onClick={onClick} disabled={disabled} aria-label={listening ? "Stop listening" : "Talk"}>
      {listening ? (
        <span className="wave">
          {Array.from({ length: bars }).map((_, i) => {
            const h = 6 + level * 34 * (0.4 + 0.6 * Math.abs(Math.sin(i * 1.7 + Date.now() / 120)));
            return <i key={i} style={{ height: h }} />;
          })}
        </span>
      ) : (
        <span className="mic-icon">🎤</span>
      )}
      <span className="mic-label">{listening ? "I'm listening..." : "Tap to talk"}</span>
    </button>
  );
}

/** Counts learning time for the active kid and ends the session when the daily limit is reached. */
export function useLearningTimer(subject: SessionLog["subject"]) {
  const nav = useNavigate();
  const addTime = useApp((s) => s.addTime);
  const kid = useActiveKid();
  const kidRef = useRef(kid);
  kidRef.current = kid;
  useEffect(() => {
    let last = Date.now();
    const id = window.setInterval(() => {
      if (document.hidden) {
        last = Date.now();
        return;
      }
      const now = Date.now();
      addTime(subject, Math.round((now - last) / 1000));
      last = now;
      const k = kidRef.current;
      if (k && k.dailyLimitMin > 0 && secondsToday(k) >= k.dailyLimitMin * 60) {
        clearInterval(id);
        speak(`Wow, ${k.name}, you learned so much today! Time for a break. See you tomorrow!`, { characterId: k.buddyId }).then(() => nav("/"));
      }
    }, 15000);
    return () => clearInterval(id);
  }, [subject, addTime, nav]);
}
