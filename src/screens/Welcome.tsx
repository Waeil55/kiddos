// First screen: onboarding for new families, "Who's learning today?" for returning ones.
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Buddy from "../characters/Buddy";
import { CHARACTERS, characterById } from "../shared/characters";
import { isBedtime, secondsToday, useApp } from "../store";
import { speak } from "../voice/speech";

export default function Welcome() {
  const nav = useNavigate();
  const { parent, kids, selectKid, unlockParent, settings } = useApp();
  const [hero, setHero] = useState(0);

  useEffect(() => {
    unlockParent(false);
    const id = window.setInterval(() => setHero((h) => (h + 1) % CHARACTERS.length), 2600);
    return () => clearInterval(id);
  }, [unlockParent]);

  if (!parent) {
    return (
      <div className="screen welcome">
        <div className="brand">
          <span className="logo">Kiddos</span>
          <span className="tagline">The study buddy that listens</span>
        </div>
        <div className="welcome-parade">
          {CHARACTERS.slice(0, 5).map((c, i) => (
            <div key={c.id} className="parade-item" style={{ animationDelay: `${i * 150}ms` }}>
              <Buddy character={c} size={i === 2 ? 210 : 140} gesture={i === 2 ? "wave" : "none"} />
            </div>
          ))}
        </div>
        <ul className="pitch">
          <li>🗣️ Kids talk, and their buddy listens, answers and teaches out loud</li>
          <li>👉 Buddies point at pictures and write on the board, just like a real teacher</li>
          <li>📚 Reading, phonics, math, spelling, science, world, feelings and more</li>
          <li>👨‍👩‍👧 Parent dashboard with reports, time limits and controls</li>
        </ul>
        <button className="btn btn-big" onClick={() => nav("/setup")}>
          Get started
        </button>
        <button className="btn btn-ghost" onClick={() => nav("/buddies")}>
          Meet the 10 buddies
        </button>
      </div>
    );
  }

  const pickKid = (id: string) => {
    const kid = kids.find((k) => k.id === id)!;
    if (isBedtime(settings)) {
      speak(`It's sleepy time, ${kid.name}. Let's learn more tomorrow! Good night!`, { characterId: kid.buddyId });
      return;
    }
    if (kid.dailyLimitMin > 0 && secondsToday(kid) >= kid.dailyLimitMin * 60) {
      speak(`Great learning today, ${kid.name}! That's all the time for today. See you tomorrow!`, { characterId: kid.buddyId });
      return;
    }
    selectKid(id);
    nav("/home");
  };

  const c = CHARACTERS[hero];
  return (
    <div className="screen welcome">
      <div className="brand">
        <span className="logo">Kiddos</span>
      </div>
      <h2 className="who">Who's learning today?</h2>
      <div className="profiles">
        {kids.map((k) => (
          <button key={k.id} className="profile" style={{ ["--kid" as string]: k.color }} onClick={() => pickKid(k.id)}>
            <div className="profile-avatar">
              <Buddy character={characterById(k.buddyId)} size={120} />
            </div>
            <span className="profile-name">{k.name}</span>
            <span className="profile-stars">⭐ {k.stars}</span>
          </button>
        ))}
        {kids.length === 0 && (
          <div className="empty">
            <Buddy character={c} size={160} gesture="wave" />
            <p>No kids yet. A parent can add a profile.</p>
          </div>
        )}
      </div>
      <button className="btn btn-parent" onClick={() => nav("/gate")}>
        🔒 Parents
      </button>
    </div>
  );
}
