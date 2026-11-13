// Kid home: the buddy greets the child and points at the lesson tiles.
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Buddy from "../characters/Buddy";
import { usePointing } from "../characters/Stage";
import { characterById } from "../shared/characters";
import { secondsToday, useActiveKid, useApp } from "../store";
import { speak, stopSpeaking } from "../voice/speech";
import { sfx } from "../voice/sfx";
import { SUBJECT_INFO } from "./KidForm";

const EXTRAS = [
  { to: "/reading", emoji: "📖", name: "Read & answer", color: "#0ea5e9" },
  { to: "/stories", emoji: "📚", name: "Story time", color: "#7c5cff" },
  { to: "/trace", emoji: "✍️", name: "Write letters", color: "#ef4ea0" },
  { to: "/math-game", emoji: "🚀", name: "Math blast", color: "#ffb020" },
  { to: "/buddies", emoji: "🐼", name: "My buddies", color: "#22c55e" },
  { to: "/rewards", emoji: "🏆", name: "Rewards", color: "#ff7a59" },
];

const SUBJECT_COLORS: Record<string, string> = {
  reading: "#1fb8a6", phonics: "#3b82f6", math: "#ffb020", spelling: "#ef4ea0",
  science: "#22c55e", world: "#0ea5e9", feelings: "#f59e0b", free: "#7c5cff",
};

export default function KidHome() {
  const nav = useNavigate();
  const kid = useActiveKid()!;
  const { selectKid, settings } = useApp();
  const c = characterById(kid.buddyId);
  const homeRef = useRef<HTMLDivElement>(null);
  const buddyRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [gesture, setGesture] = useState<"wave" | "point" | "none">("wave");
  const aim = usePointing(homeRef, buddyRef, hover ? `[data-tile="${hover}"]` : null, [hover]);
  const minutes = Math.round(secondsToday(kid) / 60);
  const goal = kid.dailyLimitMin ? Math.min(20, kid.dailyLimitMin) : 20;

  useEffect(() => {
    const hour = new Date().getHours();
    const hi = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    const first = kid.enabledSubjects[0];
    const t = setTimeout(async () => {
      await speak(`${hi}, ${kid.name}! ${kid.streak > 1 ? `You're on a ${kid.streak} day streak! ` : ""}What do you want to learn today? Let's try ${SUBJECT_INFO[first].name}!`, {
        characterId: kid.buddyId,
        volume: settings.volume,
        rate: settings.voiceRate,
        onWord: (i) => {
          if (i === 6) {
            setGesture("point");
            setHover(first);
          }
        },
      });
      setGesture("point");
    }, 400);
    return () => {
      clearTimeout(t);
      stopSpeaking();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (to: string) => {
    sfx.tap();
    stopSpeaking();
    nav(to);
  };

  return (
    <div className="screen kid-home" ref={homeRef} style={{ ["--kid" as string]: kid.color }}>
      <header className="kid-top">
        <button className="round-btn" onClick={() => (selectKid(null), nav("/"))} aria-label="Switch profile">
          👤
        </button>
        <span className="kid-top-title">Hi, {kid.name}!</span>
        <span className="pill">⭐ {kid.stars}</span>
        <span className="pill">🔥 {kid.streak}</span>
      </header>

      <div className="home-hero">
        <div ref={buddyRef} className="home-buddy">
          <Buddy character={c} gesture={hover ? "point" : gesture} pointAngle={aim?.angle ?? 60} look={aim?.look} size={220} emotion="happy" />
        </div>
        <div className="goal">
          <span>Today's goal</span>
          <div className="meter big"><div style={{ width: `${Math.min(100, (minutes / goal) * 100)}%` }} /></div>
          <span className="muted">{minutes} / {goal} minutes</span>
        </div>
      </div>

      <h2 className="section-title">Learn with {c.name}</h2>
      <div className="tiles">
        {kid.enabledSubjects.map((s) => (
          <button
            key={s}
            data-tile={s}
            className="tile"
            style={{ background: SUBJECT_COLORS[s] }}
            onMouseEnter={() => setHover(s)}
            onFocus={() => setHover(s)}
            onClick={() => go(`/learn/${s}`)}
          >
            <span className="tile-emoji">{SUBJECT_INFO[s].emoji}</span>
            <span className="tile-name">{SUBJECT_INFO[s].name}</span>
            <span className="tile-level">{"⭐".repeat(kid.levels[s] ?? 1)}</span>
          </button>
        ))}
      </div>

      <h2 className="section-title">Play & explore</h2>
      <div className="tiles">
        {EXTRAS.map((e) => (
          <button key={e.to} data-tile={e.to} className="tile" style={{ background: e.color }} onMouseEnter={() => setHover(e.to)} onClick={() => go(e.to)}>
            <span className="tile-emoji">{e.emoji}</span>
            <span className="tile-name">{e.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
