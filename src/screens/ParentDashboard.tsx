// Parent area: per-child reports, weekly activity, skills, controls, voice and app settings.
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import Buddy from "../characters/Buddy";
import { health } from "../api";
import { characterById } from "../shared/characters";
import { BADGES } from "../shared/content";
import { findPassage, SKILLS, type Skill } from "../shared/passages";
import { ALL_SUBJECTS, secondsToday, useApp, type Kid } from "../store";
import { bestDeviceVoice, speak, voiceSourceLabel } from "../voice/speech";
import { askMicPermission } from "../voice/listen";
import { SUBJECT_INFO } from "./KidForm";

function lastDays(n: number) {
  return Array.from({ length: n }, (_, i) => new Date(Date.now() - (n - 1 - i) * 864e5).toISOString().slice(0, 10));
}

function WeekChart({ kid }: { kid: Kid }) {
  const days = lastDays(7);
  const mins = days.map((d) => Math.round(kid.log.filter((l) => l.date === d).reduce((a, l) => a + l.seconds, 0) / 60));
  const max = Math.max(10, ...mins);
  return (
    <div className="chart" role="img" aria-label="Minutes learned in the last 7 days">
      {days.map((d, i) => (
        <div key={d} className="bar-col">
          <span className="bar-val">{mins[i] || ""}</span>
          <div className="bar" style={{ height: `${(mins[i] / max) * 100}%`, background: kid.color }} />
          <span className="bar-day">{new Date(d + "T12:00").toLocaleDateString(undefined, { weekday: "short" })}</span>
        </div>
      ))}
    </div>
  );
}

/** Reading comprehension: stories finished, average score, and accuracy per reading skill. */
function ReadingReport({ kid }: { kid: Kid }) {
  const results = Object.entries(kid.reading ?? {});
  if (!results.length) return <p className="muted">No reading worksheets yet. They're under “Read & answer” on {kid.name}'s home screen.</p>;
  const bySkill: Partial<Record<Skill, { ok: number; n: number }>> = {};
  for (const [, r] of results)
    for (const a of r.answers) {
      const t = (bySkill[a.skill] ??= { ok: 0, n: 0 });
      t.n++;
      if (a.ok) t.ok++;
    }
  const skills = (Object.entries(bySkill) as [Skill, { ok: number; n: number }][]).sort((a, b) => a[1].ok / a[1].n - b[1].ok / b[1].n);
  const avg = results.reduce((a, [, r]) => a + r.score / r.total, 0) / results.length;
  const perfect = results.filter(([, r]) => r.best === r.total).length;
  const weak = skills.filter(([, t]) => t.n >= 2 && t.ok / t.n < 0.7).slice(0, 2);
  const recent = [...results].sort((a, b) => b[1].date.localeCompare(a[1].date)).slice(0, 5);
  return (
    <>
      <div className="stats">
        <div className="stat"><b>📖 {results.length}</b><span>stories finished</span></div>
        <div className="stat"><b>{Math.round(avg * 100)}%</b><span>average score</span></div>
        <div className="stat"><b>🌟 {perfect}</b><span>perfect scores</span></div>
      </div>
      {skills.map(([s, t]) => (
        <div key={s} className="skill-row">
          <span>{SKILLS[s]}</span>
          <div className="meter"><div style={{ width: `${(t.ok / t.n) * 100}%`, background: kid.color }} /></div>
          <span className="muted">{t.ok}/{t.n}</span>
        </div>
      ))}
      {weak.length > 0 && (
        <p>🌱 Practice next: <b>{weak.map(([s]) => SKILLS[s]).join(" and ")}</b>. Ask {kid.name} to point to the sentence in the story that proves the answer.</p>
      )}
      <p className="muted small">
        Recent: {recent.map(([id, r]) => `${findPassage(id, kid.myPassages)?.title ?? "Story"} (${r.score}/${r.total})`).join(" · ")}
      </p>
    </>
  );
}

function KidReport({ kid }: { kid: Kid }) {
  const nav = useNavigate();
  const { removeKid, updateKid } = useApp();
  const totals = useMemo(() => {
    const by: Record<string, { correct: number; total: number; seconds: number }> = {};
    for (const l of kid.log) {
      by[l.subject] ??= { correct: 0, total: 0, seconds: 0 };
      by[l.subject].correct += l.correct;
      by[l.subject].total += l.total;
      by[l.subject].seconds += l.seconds;
    }
    return by;
  }, [kid.log]);
  const allTotal = Object.values(totals).reduce((a, t) => a + t.total, 0);
  const allCorrect = Object.values(totals).reduce((a, t) => a + t.correct, 0);
  const strongest = Object.entries(totals).filter(([, t]) => t.total >= 3).sort((a, b) => b[1].correct / b[1].total - a[1].correct / a[1].total);

  return (
    <section className="report">
      <header className="report-head">
        <Buddy character={characterById(kid.buddyId)} size={90} />
        <div>
          <h2>{kid.name}</h2>
          <p className="muted">
            Age {kid.age} · {kid.grade} · Buddy: {characterById(kid.buddyId).name}
          </p>
        </div>
        <div className="report-actions">
          <button className="btn btn-small" onClick={() => nav(`/kid/${kid.id}/edit`)}>
            Edit
          </button>
          <button
            className="btn btn-small btn-danger"
            onClick={() => confirm(`Remove ${kid.name}'s profile and all progress?`) && removeKid(kid.id)}
          >
            Remove
          </button>
        </div>
      </header>

      <div className="stats">
        <div className="stat"><b>⭐ {kid.stars}</b><span>stars</span></div>
        <div className="stat"><b>🔥 {kid.streak}</b><span>day streak</span></div>
        <div className="stat"><b>{Math.round(secondsToday(kid) / 60)} min</b><span>today{kid.dailyLimitMin ? ` / ${kid.dailyLimitMin}` : ""}</span></div>
        <div className="stat"><b>{allTotal ? Math.round((allCorrect / allTotal) * 100) : 0}%</b><span>accuracy ({allTotal} answers)</span></div>
      </div>

      <h3>Last 7 days</h3>
      <WeekChart kid={kid} />

      <h3>Skills</h3>
      <div className="skills">
        {ALL_SUBJECTS.map((s) => {
          const t = totals[s];
          const pct = t?.total ? Math.round((t.correct / t.total) * 100) : 0;
          return (
            <div key={s} className={`skill ${kid.enabledSubjects.includes(s) ? "" : "off"}`}>
              <span>{SUBJECT_INFO[s].emoji} {SUBJECT_INFO[s].name}</span>
              <div className="meter"><div style={{ width: `${pct}%`, background: kid.color }} /></div>
              <span className="muted">Level {kid.levels[s] ?? 1} · {t?.total ?? 0} answers</span>
              <select
                value={kid.levels[s] ?? 1}
                aria-label={`${SUBJECT_INFO[s].name} level`}
                onChange={(e) => updateKid(kid.id, { levels: { ...kid.levels, [s]: Number(e.target.value) } })}
              >
                <option value={1}>Beginner</option>
                <option value={2}>Growing</option>
                <option value={3}>Advanced</option>
              </select>
            </div>
          );
        })}
      </div>

      <h3>Reading comprehension</h3>
      <ReadingReport kid={kid} />

      <h3>Insights</h3>
      <ul className="insights">
        {allTotal === 0 && <li>No lessons yet. Hand the device to {kid.name} and pick a subject together!</li>}
        {strongest[0] && <li>💪 Strongest area: <b>{SUBJECT_INFO[strongest[0][0] as keyof typeof SUBJECT_INFO]?.name ?? strongest[0][0]}</b>.</li>}
        {strongest.length > 1 && <li>🌱 Needs practice: <b>{SUBJECT_INFO[strongest[strongest.length - 1][0] as keyof typeof SUBJECT_INFO]?.name ?? strongest[strongest.length - 1][0]}</b>. The buddy will make it a little easier automatically.</li>}
        {kid.streak >= 3 && <li>🔥 {kid.streak} days in a row. Consistency is the #1 predictor of reading growth.</li>}
      </ul>

      <h3>Badges</h3>
      <div className="badges">
        {BADGES.map((b) => (
          <span key={b.id} className={`badge ${kid.badges.includes(b.id) ? "on" : ""}`} title={`${b.name}: ${b.need} stars`}>
            {b.emoji}
          </span>
        ))}
      </div>
    </section>
  );
}

/** "AI tutor and AI stories": off by default; turning it on first shows what is sent and to whom. */
function AiTutorSwitch() {
  const { settings, setSettings } = useApp();
  const [asking, setAsking] = useState(false);
  return (
    <>
      <label className="check">
        <input type="checkbox" checked={settings.aiTutor} onChange={(e) => (e.target.checked ? setAsking(true) : (setAsking(false), setSettings({ aiTutor: false })))} />
        AI tutor and AI stories
      </label>
      {asking && !settings.aiTutor && (
        <div className="note">
          <p>
            <b>Before you turn this on:</b> lessons and new stories are written by Claude, an AI made by Anthropic, through our server. Each turn
            sends your child's age, grade, interests, lesson level and language, a few progress notes (like strongest subject and stars), and the
            recent conversation, including what your child says or types. Your child's name is not sent; we send a placeholder instead. Spoken
            answers are turned into text by Apple's or Google's speech recognition (on the device or on their servers); we never receive audio.
          </p>
          <p className="muted small">
            When this is off, lessons use the built-in lesson engine on this device and the “New story” button is hidden. Read more in the{" "}
            <a href="privacy/index.html">privacy policy</a>.
          </p>
          <button className="btn btn-small" onClick={() => (setSettings({ aiTutor: true }), setAsking(false))}>
            I agree
          </button>{" "}
          <button className="btn btn-small btn-ghost" onClick={() => setAsking(false)}>
            Not now
          </button>
        </div>
      )}
    </>
  );
}

export default function ParentDashboard() {
  const nav = useNavigate();
  const { parent, kids, settings, setSettings, unlockParent, resetAll } = useApp();
  const [tab, setTab] = useState<string>(kids[0]?.id ?? "settings");
  const [server, setServer] = useState<{ ai: boolean; voice: string } | null>(null);
  const [deviceVoice, setDeviceVoice] = useState("");
  const [mic, setMic] = useState("");

  useEffect(() => {
    health().then(setServer);
    bestDeviceVoice("bao").then((v) => setDeviceVoice(v?.name ?? "none"));
  }, []);

  const kid = kids.find((k) => k.id === tab);
  return (
    <div className="screen parent">
      <header className="topbar">
        <span className="logo small">Kiddos</span>
        <span className="muted">Parent dashboard · {parent?.name}</span>
        <button
          className="btn btn-small"
          onClick={() => {
            unlockParent(false);
            nav("/");
          }}
        >
          Lock & exit
        </button>
      </header>

      <nav className="tabs">
        {kids.map((k) => (
          <button key={k.id} className={`tab ${tab === k.id ? "on" : ""}`} onClick={() => setTab(k.id)} style={{ ["--kid" as string]: k.color }}>
            {k.name}
          </button>
        ))}
        <button className="tab" onClick={() => nav("/kid/new")}>
          ＋ Add child
        </button>
        <button className={`tab ${tab === "settings" ? "on" : ""}`} onClick={() => setTab("settings")}>
          ⚙️ Settings
        </button>
      </nav>

      {kid && <KidReport kid={kid} />}

      {tab === "settings" && (
        <section className="report">
          <h2>Voices</h2>
          <p className="muted">
            Buddies speak with {settings.cloudVoice && server?.voice && server.voice !== "none" ? `studio neural voices (${server.voice})` : "the most natural voice on this device"}. Device voice picked: <b>{deviceVoice}</b>.{" "}
            {server?.voice === "none" && "For the most human sound, add an ElevenLabs or Azure Speech key on the server (see README)."}
          </p>
          <div className="row">
            <label>
              Volume
              <input type="range" min={0} max={1} step={0.05} value={settings.volume} onChange={(e) => setSettings({ volume: Number(e.target.value) })} />
            </label>
            <label>
              Speaking speed
              <input type="range" min={0.7} max={1.2} step={0.05} value={settings.voiceRate} onChange={(e) => setSettings({ voiceRate: Number(e.target.value) })} />
            </label>
          </div>
          <label className="check">
            <input type="checkbox" checked={settings.cloudVoice} onChange={(e) => setSettings({ cloudVoice: e.target.checked })} />
            Studio voice (cloud): the words the buddy says are sent to a cloud voice service to make the audio. Lines that say your child's name
            are never saved on our server. Off uses this device's own voice.
          </label>
          <button className="btn btn-small" onClick={() => speak("Hi! This is how I sound. Let's learn something amazing today!", { characterId: kids[0]?.buddyId ?? "bao", volume: settings.volume, rate: settings.voiceRate })}>
            ▶ Test voice
          </button>
          <span className="muted"> {voiceSourceLabel()}</span>
          {Capacitor.isNativePlatform() && (
            <p>
              <button className="btn btn-small" onClick={async () => setMic((await askMicPermission()) ? "Microphone allowed. Your child can talk to the buddy." : "Not allowed. You can change this in the phone's Settings.")}>
                🎤 Allow microphone
              </button>{" "}
              <span className="muted small">{mic || "Lets your child answer by talking. Speech is turned into text by the phone; audio is not saved."}</span>
            </p>
          )}

          <h2>Learning</h2>
          <AiTutorSwitch />
          <label className="check">
            <input type="checkbox" checked={settings.subtitles} onChange={(e) => setSettings({ subtitles: e.target.checked })} />
            Show word-by-word subtitles (builds reading skills)
          </label>
          <label>
            Lesson language
            <select value={settings.language} onChange={(e) => setSettings({ language: e.target.value })}>
              {["English", "Spanish", "French", "Arabic", "German", "Portuguese", "Chinese", "Hindi"].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </label>

          <h2>Bedtime lock</h2>
          <label className="check">
            <input type="checkbox" checked={settings.bedtimeLock} onChange={(e) => setSettings({ bedtimeLock: e.target.checked })} />
            Lock kid profiles at bedtime
          </label>
          <div className="row">
            <label>
              From
              <input type="time" value={settings.bedtimeStart} onChange={(e) => setSettings({ bedtimeStart: e.target.value })} />
            </label>
            <label>
              Until
              <input type="time" value={settings.bedtimeEnd} onChange={(e) => setSettings({ bedtimeEnd: e.target.value })} />
            </label>
          </div>

          <h2>System</h2>
          <ul className="insights">
            <li>
              AI tutor:{" "}
              {!settings.aiTutor
                ? "Off. Lessons use the built-in lesson engine on this device."
                : server
                  ? server.ai
                    ? "✅ Claude AI tutor connected"
                    : "Offline lesson engine (add ANTHROPIC_API_KEY on the server for the full AI tutor)"
                  : "⚠️ Server not reachable, using on-device lessons"}
            </li>
            <li>
              Privacy: profiles, progress and the parent account are saved on this device only. Spoken answers are turned into text by the
              device's speech recognition (Apple or Google, which may use their servers); we never receive or store audio.{" "}
              {settings.aiTutor
                ? "With the AI tutor on, each lesson turn sends the conversation and short progress notes (not your child's name) to our server and Anthropic."
                : "With the AI tutor off, lessons stay on this device."}{" "}
              {settings.cloudVoice ? "With the studio voice on, the buddy's words are sent to a cloud voice service." : "The studio voice is off, so voices are made on this device."}
            </li>
            <li>
              <a href="privacy/index.html">Privacy policy</a> · <a href="support/index.html">Help and support</a>
            </li>
          </ul>
          <button className="btn btn-small btn-danger" onClick={() => confirm("Erase ALL profiles, progress and the parent account on this device?") && (resetAll(), nav("/"))}>
            Erase all data
          </button>
        </section>
      )}
    </div>
  );
}
