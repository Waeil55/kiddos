// PIN pad that guards the parent area. Wrong tries and the lockout are saved, so closing the app
// does not reset them.
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { hashPin, PIN_TRIES, useApp } from "../store";

export default function ParentGate() {
  const nav = useNavigate();
  const { parent, unlockParent, pinFails, pinLockUntil, pinFailed, pinReset } = useApp();
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const [now, setNow] = useState(Date.now());
  const locked = pinLockUntil > now;

  // Tick while locked so the pad opens again on its own.
  useEffect(() => {
    if (!locked) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [locked]);

  if (!parent) return <Navigate to="/setup" replace />;

  const press = async (d: string) => {
    if (pinLockUntil > Date.now()) return;
    const next = (pin + d).slice(0, 4);
    setPin(next);
    setErr("");
    if (next.length === 4) {
      if ((await hashPin(next)) === parent.pinHash) {
        pinReset();
        unlockParent(true);
        nav("/parent", { replace: true });
      } else {
        const nowLocked = pinFailed();
        setNow(Date.now());
        setErr(nowLocked ? "Too many tries. Please wait a minute." : `Wrong PIN, try again. (${PIN_TRIES - pinFails - 1} left)`);
        setPin("");
      }
    }
  };

  const wait = Math.ceil((pinLockUntil - now) / 1000);
  return (
    <div className="screen form-screen">
      <div className="panel gate">
        <h1>🔒 Grown-ups only</h1>
        <p className="muted">Enter your parent PIN</p>
        <div className="pin-dots">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={i < pin.length ? "dot on" : "dot"} />
          ))}
        </div>
        {locked ? <p className="error">Too many tries. Please wait {wait} seconds.</p> : err && <p className="error">{err}</p>}
        <div className="pinpad">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map((k, i) =>
            k === "" ? (
              <span key={i} />
            ) : (
              <button key={i} className="pin-key" disabled={locked} onClick={() => (k === "⌫" ? setPin(pin.slice(0, -1)) : press(k))}>
                {k}
              </button>
            )
          )}
        </div>
        <button className="btn btn-ghost" onClick={() => nav("/")}>
          Back
        </button>
      </div>
    </div>
  );
}
