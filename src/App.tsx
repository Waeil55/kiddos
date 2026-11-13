import { useEffect, useState } from "react";
import { HashRouter, Navigate, Route, Routes, useParams } from "react-router-dom";
import { useApp, useActiveKid } from "./store";
import { setCloudVoice, setPrivateWords } from "./voice/speech";
import Welcome from "./screens/Welcome";
import ParentSetup from "./screens/ParentSetup";
import ParentGate from "./screens/ParentGate";
import ParentDashboard from "./screens/ParentDashboard";
import KidForm from "./screens/KidForm";
import KidHome from "./screens/KidHome";
import TutorSession from "./screens/TutorSession";
import ReadAlong from "./screens/ReadAlong";
import Tracing from "./screens/Tracing";
import MathGame from "./screens/MathGame";
import Buddies from "./screens/Buddies";
import Rewards from "./screens/Rewards";
import Stories from "./screens/Stories";
import Reading from "./screens/Reading";
import ReadingPassage from "./screens/ReadingPassage";

function KidOnly({ children }: { children: JSX.Element }) {
  const kid = useActiveKid();
  return kid ? children : <Navigate to="/" replace />;
}

function ParentOnly({ children }: { children: JSX.Element }) {
  const unlocked = useApp((s) => s.parentUnlocked);
  return unlocked ? children : <Navigate to="/gate" replace />;
}

// Setup runs once: with a parent account already here, it goes through the PIN instead.
function SetupOnce({ children }: { children: JSX.Element }) {
  const parent = useApp((s) => s.parent);
  const unlocked = useApp((s) => s.parentUnlocked);
  // Setup just saved the parent and unlocked the area: let it finish moving on.
  return parent && !unlocked ? <Navigate to="/gate" replace /> : children;
}

/** The phone apps load saved state asynchronously; wait for it so screens never see an empty store. */
function useHydrated() {
  const [done, setDone] = useState(() => useApp.persist.hasHydrated());
  useEffect(() => {
    if (done) return;
    const off = useApp.persist.onFinishHydration(() => setDone(true));
    if (useApp.persist.hasHydrated()) setDone(true);
    // A storage error never finishes hydration; don't leave the child on a blank screen.
    const giveUp = window.setTimeout(() => setDone(true), 2500);
    return () => {
      off();
      clearTimeout(giveUp);
    };
  }, [done]);
  return done;
}

// A fresh lesson (and buddy conversation) per subject and per story.
function Keyed({ param, children }: { param: string; children: (key: string) => JSX.Element }) {
  const key = useParams()[param] ?? "";
  return children(key);
}

// HashRouter works the same on the web, in Electron (file://) and in Capacitor.
export default function App() {
  const hydrated = useHydrated();
  const kids = useApp((s) => s.kids);
  const activeKidId = useApp((s) => s.activeKidId);
  const cloudVoice = useApp((s) => s.settings.cloudVoice);

  // Lines that say a child's name are marked private, so the server never caches them. The active
  // child comes first; the others are included because the welcome screen greets a child before
  // selecting them.
  const names = [...kids].sort((a, b) => Number(b.id === activeKidId) - Number(a.id === activeKidId)).map((k) => k.name).join("\n");
  useEffect(() => {
    setPrivateWords(names ? names.split("\n") : []);
  }, [names]);
  useEffect(() => {
    setCloudVoice(cloudVoice);
  }, [cloudVoice]);

  if (!hydrated) return null;
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/setup" element={<SetupOnce><ParentSetup /></SetupOnce>} />
        <Route path="/gate" element={<ParentGate />} />
        <Route path="/parent" element={<ParentOnly><ParentDashboard /></ParentOnly>} />
        <Route path="/kid/new" element={<ParentOnly><KidForm /></ParentOnly>} />
        <Route path="/kid/:id/edit" element={<ParentOnly><KidForm /></ParentOnly>} />
        <Route path="/home" element={<KidOnly><KidHome /></KidOnly>} />
        <Route path="/learn/:subject" element={<KidOnly><Keyed param="subject">{(k) => <TutorSession key={k} />}</Keyed></KidOnly>} />
        <Route path="/stories" element={<KidOnly><Stories /></KidOnly>} />
        <Route path="/read/:storyId" element={<KidOnly><Keyed param="storyId">{(k) => <ReadAlong key={k} />}</Keyed></KidOnly>} />
        <Route path="/reading" element={<KidOnly><Reading /></KidOnly>} />
        <Route path="/reading/:passageId" element={<KidOnly><Keyed param="passageId">{(k) => <ReadingPassage key={k} />}</Keyed></KidOnly>} />
        <Route path="/trace" element={<KidOnly><Tracing /></KidOnly>} />
        <Route path="/math-game" element={<KidOnly><MathGame /></KidOnly>} />
        <Route path="/buddies" element={<Buddies />} />
        <Route path="/rewards" element={<KidOnly><Rewards /></KidOnly>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
