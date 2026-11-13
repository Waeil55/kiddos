// Reading comprehension library: pick a grade, then a passage. Shows each passage's score.
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateStory, health } from "../api";
import { KidTopBar } from "../components/Kit";
import { READING_GRADES, gradeFromProfile, gradeLabel, passagesForGrade, SKILLS } from "../shared/passages";
import { useActiveKid, useApp } from "../store";
import { sfx } from "../voice/sfx";

type Filter = "all" | "new" | "done";

/** Drops the child's name from free-text interests (e.g. "Sam's dog" -> "dog"). */
function withoutName(interests: string[], name: string): string[] {
  const n = name.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
  if (!n) return interests;
  return interests
    .map((i) => i.split(/\s+/).filter((w) => w.toLowerCase().replace(/['’]s\b/u, "").replace(/[^\p{L}\p{N}]/gu, "") !== n).join(" "))
    .filter(Boolean);
}

export default function Reading() {
  const nav = useNavigate();
  const kid = useActiveKid()!;
  const addPassage = useApp((s) => s.addPassage);
  const aiTutor = useApp((s) => s.settings.aiTutor);
  const [grade, setGrade] = useState(() => {
    const g = gradeFromProfile(kid.grade);
    return passagesForGrade(g, kid.myPassages).length ? g : 3;
  });
  const [filter, setFilter] = useState<Filter>("all");
  const [ai, setAi] = useState(false);
  const [making, setMaking] = useState(false);
  const [err, setErr] = useState("");
  const results = kid.reading ?? {};

  // AI stories need the parent's "AI tutor and AI stories" switch, and a server with AI enabled.
  useEffect(() => {
    if (aiTutor) health().then((h) => setAi(Boolean(h?.ai)));
    else setAi(false);
  }, [aiTutor]);

  const all = useMemo(() => passagesForGrade(grade, kid.myPassages), [grade, kid.myPassages]);
  const list = all.filter((p) => (filter === "all" ? true : filter === "done" ? results[p.id] : !results[p.id]));
  const done = all.filter((p) => results[p.id]);
  const avg = done.length ? done.reduce((a, p) => a + results[p.id].best / results[p.id].total, 0) / done.length : 0;

  // Suggest the skill this child misses most, so the AI writes a story that practices it.
  const weakSkill = useMemo(() => {
    const tally: Record<string, { ok: number; n: number }> = {};
    for (const r of Object.values(results)) for (const a of r.answers) {
      tally[a.skill] ??= { ok: 0, n: 0 };
      tally[a.skill].n++;
      if (a.ok) tally[a.skill].ok++;
    }
    const worst = Object.entries(tally).filter(([, t]) => t.n >= 2).sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n)[0];
    return worst && worst[1].ok / worst[1].n < 0.8 ? worst[0] : undefined;
  }, [results]);

  const makeStory = async () => {
    setMaking(true);
    setErr("");
    try {
      const p = await generateStory({
        grade,
        // Interests only, never the child's name.
        interests: withoutName(kid.interests, kid.name),
        focusSkill: weakSkill,
        avoidTitles: all.map((x) => x.title).slice(-40),
      });
      addPassage(p);
      sfx.correct();
      nav(`/reading/${p.id}`);
    } catch {
      setErr("The story maker is busy right now. Try again in a minute!");
    } finally {
      setMaking(false);
    }
  };

  return (
    <div className="screen" style={{ ["--kid" as string]: kid.color }}>
      <KidTopBar title="📖 Read & answer" />
      <div className="grade-tabs" role="tablist">
        {READING_GRADES.map((g) => {
          const n = passagesForGrade(g, kid.myPassages).length;
          return (
            <button key={g} role="tab" aria-selected={g === grade} className={`grade-tab ${g === grade ? "on" : ""}`} onClick={() => (sfx.tap(), setGrade(g))}>
              {g === 0 ? "K" : g}
              <small>{n ? `${n}` : "soon"}</small>
            </button>
          );
        })}
      </div>

      <div className="reading-summary">
        <div>
          <h2>{gradeLabel(grade)}</h2>
          <span className="muted">
            {done.length} of {all.length} stories finished{done.length ? ` · average ${Math.round(avg * 100)}%` : ""}
          </span>
          {all.length > 0 && (
            <div className="meter"><div style={{ width: `${(done.length / all.length) * 100}%` }} /></div>
          )}
        </div>
        <div className="reading-actions">
          <div className="seg">
            {(["all", "new", "done"] as Filter[]).map((f) => (
              <button key={f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
                {f === "all" ? "All" : f === "new" ? "Not read" : "Finished"}
              </button>
            ))}
          </div>
          {ai && (
            <button className="btn" onClick={makeStory} disabled={making}>
              {making ? "✍️ Writing a story..." : `✨ New story${weakSkill ? ` (${SKILLS[weakSkill as keyof typeof SKILLS]})` : ""}`}
            </button>
          )}
        </div>
      </div>
      {err && <p className="error">{err}</p>}

      {all.length === 0 ? (
        <div className="empty-grade">
          <span>📚</span>
          <h3>{gradeLabel(grade)} stories are coming soon!</h3>
          <p className="muted">{ai ? "Tap “New story” and your buddy will write one just for you." : "Try Grade 2 or Grade 3 for now."}</p>
        </div>
      ) : (
        <div className="passages">
          {list.map((p, i) => {
            const r = results[p.id];
            return (
              <button key={p.id} className="passage-card" onClick={() => (sfx.tap(), nav(`/reading/${p.id}`))}>
                <span className="passage-num">{all.indexOf(p) + 1}</span>
                <span className="passage-emoji">{p.emoji}</span>
                <span className="passage-info">
                  <b>{p.title}</b>
                  <span className="muted small">
                    {p.genre}
                    {p.id.startsWith("ai-") ? " · made for you" : ""}
                  </span>
                </span>
                {r ? (
                  <span className={`score-badge ${r.best === r.total ? "perfect" : ""}`}>
                    {r.best === r.total ? "⭐ " : ""}
                    {r.best}/{r.total}
                  </span>
                ) : (
                  <span className="score-badge new">{i === 0 && !done.length ? "Start" : "New"}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
