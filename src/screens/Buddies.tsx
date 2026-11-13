// Meet all ten buddies. Tapping one plays a live demo: it waves, writes its name on the board,
// points at its favorite things and talks.
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Buddy from "../characters/Buddy";
import Stage from "../characters/Stage";
import { CHARACTERS, characterById } from "../shared/characters";
import type { TutorTurn } from "../shared/types";
import { useActiveKid, useApp } from "../store";

const FAVORITES: Record<string, { emoji: string; label: string }[]> = {
  bao: [{ emoji: "🎋", label: "bamboo" }, { emoji: "📖", label: "stories" }, { emoji: "🌙", label: "bedtime" }],
  leo: [{ emoji: "🔢", label: "numbers" }, { emoji: "👑", label: "crown" }, { emoji: "⚽", label: "soccer" }],
  ruby: [{ emoji: "🔍", label: "clues" }, { emoji: "🔤", label: "letters" }, { emoji: "🧩", label: "puzzles" }],
  ollie: [{ emoji: "🔭", label: "stars" }, { emoji: "🧪", label: "experiments" }, { emoji: "🌱", label: "plants" }],
  pip: [{ emoji: "🗺️", label: "maps" }, { emoji: "🧊", label: "ice" }, { emoji: "✈️", label: "travel" }],
  bella: [{ emoji: "💛", label: "kindness" }, { emoji: "🥕", label: "carrots" }, { emoji: "🌸", label: "flowers" }],
  momo: [{ emoji: "🍌", label: "bananas" }, { emoji: "🤡", label: "jokes" }, { emoji: "🧠", label: "riddles" }],
  kiki: [{ emoji: "🎵", label: "music" }, { emoji: "🎨", label: "art" }, { emoji: "🌿", label: "leaves" }],
  rex: [{ emoji: "🏛️", label: "history" }, { emoji: "🦴", label: "fossils" }, { emoji: "⏳", label: "time travel" }],
  ella: [{ emoji: "🌍", label: "languages" }, { emoji: "🧠", label: "memory" }, { emoji: "🥜", label: "peanuts" }],
};

export default function Buddies() {
  const nav = useNavigate();
  const kid = useActiveKid();
  const updateKid = useApp((s) => s.updateKid);
  const [sel, setSel] = useState<string | null>(null);
  const [demo, setDemo] = useState(0);
  const c = sel ? characterById(sel) : null;

  const turn = useMemo<TutorTurn | null>(() => {
    if (!c) return null;
    const fav = FAVORITES[c.id];
    return {
      speech: `Hi! I'm ${c.name} the ${c.species}! ${c.tagline}. I love ${fav[1].label}! ${c.catchphrase}`,
      caption: `${c.name} the ${c.species}`,
      emotion: "excited",
      gesture: "point",
      cards: fav,
      pointAt: 1,
      board: c.name,
      expectsAnswer: false,
      correct: null,
      stars: 0,
      answers: [],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [c, demo]);

  return (
    <div className="screen buddies">
      <header className="kid-top">
        <button className="round-btn" onClick={() => nav(kid ? "/home" : "/")} aria-label="Back">
          ←
        </button>
        <span className="kid-top-title">Meet the buddies</span>
      </header>

      {c && turn && (
        <div className="buddy-demo">
          <Stage characterId={c.id} turn={turn} compact />
          <div className="buddy-meta">
            <h2>
              {c.name} · {c.species}
            </h2>
            <p>
              <b>Best at:</b> {c.specialty}
            </p>
            <div className="row">
              <button className="btn btn-small btn-ghost" onClick={() => setDemo((d) => d + 1)}>
                🔁 Again
              </button>
              {kid && kid.buddyId !== c.id && (
                <button className="btn btn-small" onClick={() => updateKid(kid.id, { buddyId: c.id })}>
                  Make {c.name} my buddy
                </button>
              )}
              {kid?.buddyId === c.id && <span className="pill">💚 Your buddy</span>}
            </div>
          </div>
        </div>
      )}

      <div className="buddy-grid">
        {CHARACTERS.map((b) => (
          <button key={b.id} className={`buddy-card ${sel === b.id ? "on" : ""}`} onClick={() => (setSel(b.id), setDemo((d) => d + 1), window.scrollTo({ top: 0, behavior: "smooth" }))}>
            <Buddy character={b} size={130} gesture={sel === b.id ? "wave" : "none"} />
            <b>{b.name}</b>
            <small>{b.species} · {b.specialty}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
