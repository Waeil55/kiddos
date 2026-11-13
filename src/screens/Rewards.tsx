// Stars, badges and the sticker book (a new sticker every 5 stars).
import Buddy from "../characters/Buddy";
import { KidTopBar } from "../components/Kit";
import { characterById } from "../shared/characters";
import { BADGES } from "../shared/content";
import { useActiveKid } from "../store";

const STICKERS = "🦄🌈🍦🚀🦖🐙🎈🍩🌻🐝🦋🎸🏰⚽🧁🐳🌵🍕🎨🛸🐢🍉🦁🎁🌟🐧🚂🧸🦜🍭".match(/\p{Extended_Pictographic}/gu)!;

export default function Rewards() {
  const kid = useActiveKid()!;
  const unlocked = Math.floor(kid.stars / 5);
  const next = BADGES.find((b) => !kid.badges.includes(b.id));
  return (
    <div className="screen rewards" style={{ ["--kid" as string]: kid.color }}>
      <KidTopBar title="🏆 Rewards" />
      <div className="reward-hero">
        <Buddy character={characterById(kid.buddyId)} size={180} gesture="cheer" emotion="proud" />
        <div>
          <div className="big-stars">⭐ {kid.stars}</div>
          {next && (
            <>
              <div className="meter big"><div style={{ width: `${Math.min(100, (kid.stars / next.need) * 100)}%` }} /></div>
              <p className="muted">{next.need - kid.stars} more stars to unlock {next.emoji} {next.name}</p>
            </>
          )}
        </div>
      </div>
      <h2 className="section-title">Badges</h2>
      <div className="badges large">
        {BADGES.map((b) => (
          <div key={b.id} className={`badge ${kid.badges.includes(b.id) ? "on" : ""}`}>
            <span>{b.emoji}</span>
            <small>{b.name}</small>
          </div>
        ))}
      </div>
      <h2 className="section-title">Sticker book</h2>
      <div className="stickers">
        {STICKERS.map((s, i) => (
          <span key={i} className={i < unlocked ? "sticker on" : "sticker"}>
            {i < unlocked ? s : "?"}
          </span>
        ))}
      </div>
    </div>
  );
}
