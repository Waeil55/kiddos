// Create or edit a kid profile: name, age, grade, buddy, interests, color, limits and subjects.
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Buddy from "../characters/Buddy";
import { CHARACTERS } from "../shared/characters";
import type { Subject } from "../shared/types";
import { ALL_SUBJECTS, useApp } from "../store";
import { speak } from "../voice/speech";

const INTERESTS = ["Animals", "Space", "Dinosaurs", "Cars", "Princesses", "Superheroes", "Sports", "Music", "Art", "Ocean", "Robots", "Bugs", "Cooking", "Nature"];
const COLORS = ["#ff7a59", "#1fb8a6", "#7c5cff", "#ffb020", "#ef4ea0", "#3b82f6", "#22c55e"];
const GRADES = ["Pre-K", "Kindergarten", "1st grade", "2nd grade", "3rd grade", "4th grade", "5th grade"];
export const SUBJECT_INFO: Record<Subject, { emoji: string; name: string }> = {
  reading: { emoji: "📖", name: "Reading" },
  phonics: { emoji: "🔤", name: "Phonics" },
  math: { emoji: "🔢", name: "Math" },
  spelling: { emoji: "✏️", name: "Spelling" },
  science: { emoji: "🔬", name: "Science" },
  world: { emoji: "🌍", name: "World" },
  feelings: { emoji: "💛", name: "Feelings" },
  free: { emoji: "💬", name: "Ask me anything" },
};

export default function KidForm() {
  const nav = useNavigate();
  const { id } = useParams();
  const { kids, addKid, updateKid } = useApp();
  const existing = kids.find((k) => k.id === id);
  const [name, setName] = useState(existing?.name ?? "");
  const [age, setAge] = useState(existing?.age ?? 6);
  const [grade, setGrade] = useState(existing?.grade ?? "Kindergarten");
  const [buddyId, setBuddyId] = useState(existing?.buddyId ?? "bao");
  const [interests, setInterests] = useState<string[]>(existing?.interests ?? []);
  const [color, setColor] = useState(existing?.color ?? COLORS[kids.length % COLORS.length]);
  const [limit, setLimit] = useState(existing?.dailyLimitMin ?? 30);
  const [subjects, setSubjects] = useState<Subject[]>(existing?.enabledSubjects ?? ALL_SUBJECTS);
  const [err, setErr] = useState("");

  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const chooseBuddy = (cid: string) => {
    setBuddyId(cid);
    const c = CHARACTERS.find((x) => x.id === cid)!;
    speak(`Hi! I'm ${c.name}! ${c.catchphrase}`, { characterId: cid });
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setErr("Please enter a first name or nickname.");
    if (subjects.length === 0) return setErr("Turn on at least one subject.");
    const data = { name: name.trim(), age, grade, buddyId, interests, color, dailyLimitMin: limit, enabledSubjects: subjects };
    if (existing) updateKid(existing.id, data);
    else addKid(data);
    nav("/parent");
  };

  return (
    <div className="screen form-screen">
      <form className="panel wide" onSubmit={save}>
        <h1>{existing ? `Edit ${existing.name}` : "Add a child"}</h1>
        <div className="row">
          <label>
            First name or nickname
            <input value={name} onChange={(e) => setName(e.target.value)} maxLength={20} />
          </label>
          <label>
            Age
            <select value={age} onChange={(e) => setAge(Number(e.target.value))}>
              {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </label>
          <label>
            Grade
            <select value={grade} onChange={(e) => setGrade(e.target.value)}>
              {GRADES.map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </label>
        </div>

        <h3>Choose a learning buddy</h3>
        <div className="buddy-picker">
          {CHARACTERS.map((c) => (
            <button type="button" key={c.id} className={`buddy-pick ${buddyId === c.id ? "on" : ""}`} onClick={() => chooseBuddy(c.id)}>
              <Buddy character={c} size={92} gesture={buddyId === c.id ? "wave" : "none"} />
              <b>{c.name}</b>
              <small>{c.species}</small>
            </button>
          ))}
        </div>

        <h3>Interests (the buddy uses these in lessons)</h3>
        <div className="chips">
          {INTERESTS.map((i) => (
            <button type="button" key={i} className={`chip ${interests.includes(i) ? "on" : ""}`} onClick={() => setInterests(toggle(interests, i))}>
              {i}
            </button>
          ))}
        </div>

        <h3>Profile color</h3>
        <div className="chips">
          {COLORS.map((c) => (
            <button type="button" key={c} className={`swatch ${color === c ? "on" : ""}`} style={{ background: c }} onClick={() => setColor(c)} aria-label={c} />
          ))}
        </div>

        <h3>Subjects</h3>
        <div className="chips">
          {ALL_SUBJECTS.map((s) => (
            <button type="button" key={s} className={`chip ${subjects.includes(s) ? "on" : ""}`} onClick={() => setSubjects(toggle(subjects, s))}>
              {SUBJECT_INFO[s].emoji} {SUBJECT_INFO[s].name}
            </button>
          ))}
        </div>

        <label>
          Daily screen-time limit: <b>{limit === 0 ? "No limit" : `${limit} minutes`}</b>
          <input type="range" min={0} max={120} step={5} value={limit} onChange={(e) => setLimit(Number(e.target.value))} />
        </label>

        {err && <p className="error">{err}</p>}
        <div className="row">
          <button className="btn btn-ghost" type="button" onClick={() => nav("/parent")}>
            Cancel
          </button>
          <button className="btn btn-big" type="submit">
            {existing ? "Save" : "Add child"}
          </button>
        </div>
      </form>
    </div>
  );
}
