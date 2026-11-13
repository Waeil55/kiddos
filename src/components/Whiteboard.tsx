// Handwriting whiteboard: letters appear stroke by stroke as a marker moves across the board.
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface Props {
  text: string;
  /** Milliseconds per character. */
  speed?: number;
  onDone?: () => void;
  color?: string;
}

export default function Whiteboard({ text, speed = 120, onDone, color = "#1d4ed8" }: Props) {
  const [shown, setShown] = useState(0);
  const [pen, setPen] = useState<{ x: number; y: number } | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    setShown(0);
    if (!text) return;
    let i = 0;
    const id = window.setInterval(() => {
      i++;
      setShown(i);
      if (i >= text.length) {
        clearInterval(id);
        window.setTimeout(() => {
          setPen(null);
          doneRef.current?.();
        }, 350);
      }
    }, text[i] === " " ? speed / 2 : speed);
    return () => clearInterval(id);
  }, [text, speed]);

  // Move the marker to the letter currently being drawn.
  useLayoutEffect(() => {
    const el = charRefs.current[Math.max(0, shown - 1)];
    const box = boxRef.current;
    if (!el || !box || shown >= text.length + 1) return;
    const r = el.getBoundingClientRect();
    const b = box.getBoundingClientRect();
    setPen({ x: r.right - b.left, y: r.bottom - b.top - r.height * 0.35 });
  }, [shown, text]);

  return (
    <div className="whiteboard" ref={boxRef} data-point="board" aria-label={text}>
      <div className="whiteboard-text" style={{ color }}>
        {text.split("").map((ch, i) => (
          <span key={i} ref={(el) => (charRefs.current[i] = el)} className={i < shown ? "ink ink-on" : "ink"} style={{ animationDuration: `${speed * 1.4}ms` }}>
            {ch === " " ? " " : ch}
          </span>
        ))}
      </div>
      {pen && shown < text.length && (
        <div className="marker" style={{ transform: `translate(${pen.x}px, ${pen.y}px)` }}>
          <svg width="70" height="70" viewBox="0 0 70 70">
            <g transform="rotate(-40 10 60)">
              <rect x="10" y="52" width="56" height="14" rx="4" fill="#2563eb" />
              <rect x="50" y="52" width="16" height="14" rx="3" fill="#1e3a8a" />
              <path d="M10 52 L-4 59 L10 66 Z" fill={color} />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
}
