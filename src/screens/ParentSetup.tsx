// Creates the parent account on this device (name and a 4-digit PIN that guards parent areas),
// after a quick grown-up check.
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { hashPin, useApp } from "../store";

/** A sum young children can't easily do, so they can't make the account themselves. */
function makeQuestion() {
  const a = 6 + Math.floor(Math.random() * 4);
  const b = 6 + Math.floor(Math.random() * 4);
  return { text: `${a} × ${b}`, answer: a * b };
}

function AdultCheck({ onPass }: { onPass: () => void }) {
  const nav = useNavigate();
  const [q, setQ] = useState(makeQuestion);
  const [value, setValue] = useState("");
  const [err, setErr] = useState("");

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    if (Number(value) === q.answer) return onPass();
    setErr("That's not right. Please ask a grown-up.");
    setValue("");
    setQ(makeQuestion());
  };

  return (
    <div className="screen form-screen">
      <form className="panel" onSubmit={check}>
        <h1>🔒 Grown-ups only</h1>
        <p className="muted">To set up Kiddos, type the answer:</p>
        <label>
          What is {q.text}?
          <input inputMode="numeric" autoFocus value={value} onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))} />
        </label>
        {err && <p className="error">{err}</p>}
        <button className="btn btn-big" type="submit">
          Continue
        </button>
        <button className="btn btn-ghost" type="button" onClick={() => nav("/")}>
          Back
        </button>
      </form>
    </div>
  );
}

export default function ParentSetup() {
  const nav = useNavigate();
  const { setParent, unlockParent } = useApp();
  const [adult, setAdult] = useState(false);
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [pin2, setPin2] = useState("");
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState("");

  if (!adult) return <AdultCheck onPass={() => setAdult(true)} />;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setErr("Please enter your name.");
    if (!/^\d{4}$/.test(pin)) return setErr("PIN must be 4 digits.");
    if (pin !== pin2) return setErr("PINs don't match.");
    if (!agree) return setErr("Please confirm you are the parent or guardian.");
    setParent({ name: name.trim(), pinHash: await hashPin(pin), createdAt: Date.now() });
    unlockParent(true);
    nav("/kid/new");
  };

  return (
    <div className="screen form-screen">
      <form className="panel" onSubmit={submit}>
        <h1>Create your parent account</h1>
        <p className="muted">Your PIN keeps settings and reports away from little fingers. Everything is saved on this device.</p>
        <label>
          Your name
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>
        <div className="row">
          <label>
            4-digit PIN
            <input inputMode="numeric" type="password" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} />
          </label>
          <label>
            Repeat PIN
            <input inputMode="numeric" type="password" maxLength={4} value={pin2} onChange={(e) => setPin2(e.target.value.replace(/\D/g, ""))} />
          </label>
        </div>
        <label className="check">
          <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <span>
            I am the parent or legal guardian and I agree to the <a href="privacy/index.html">privacy policy</a>. The buddy's voice is made by a cloud
            voice service: the words it says are sent to that service (you can turn this off in Settings). The AI tutor stays off until you turn it on.
          </span>
        </label>
        {err && <p className="error">{err}</p>}
        <button className="btn btn-big" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
}
