import { useNavigate } from "react-router-dom";
import { KidTopBar } from "../components/Kit";
import { STORIES } from "../shared/content";
import { useActiveKid } from "../store";

export default function Stories() {
  const nav = useNavigate();
  const kid = useActiveKid()!;
  const lvl = kid.levels.reading ?? 1;
  return (
    <div className="screen" style={{ ["--kid" as string]: kid.color }}>
      <KidTopBar title="📚 Story time" />
      <div className="library">
        {STORIES.map((s) => (
          <button key={s.id} className={`book ${s.level > lvl + 1 ? "book-hard" : ""}`} onClick={() => nav(`/read/${s.id}`)}>
            <span className="book-emoji">{s.emoji}</span>
            <b>{s.title}</b>
            <span className="muted">{"⭐".repeat(s.level)} · {s.pages.length} pages</span>
          </button>
        ))}
      </div>
    </div>
  );
}
