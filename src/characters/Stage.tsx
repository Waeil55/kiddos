// The teaching stage: the buddy speaks with a human voice, points at what it talks about,
// handwrites on the whiteboard and shows picture cards, with word-by-word captions.
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import Buddy, { POINTING_SHOULDER } from "./Buddy";
import Whiteboard from "../components/Whiteboard";
import { characterById } from "../shared/characters";
import type { Emotion, Gesture, PictureCard, TutorTurn } from "../shared/types";
import { speak, speechWords, stopSpeaking } from "../voice/speech";
import { useApp } from "../store";

export interface StageProps {
  characterId: string;
  turn: TutorTurn | null;
  onSpoken?: () => void;
  onCardTap?: (card: PictureCard, index: number) => void;
  /** Extra content placed in the lesson area (activities render their own boards here). */
  children?: ReactNode;
  /** CSS selector of an element the buddy should point at instead of the turn's target. */
  pointSelector?: string | null;
  cardState?: Record<number, "right" | "wrong">;
  compact?: boolean;
  /** The child is talking: the buddy cups an ear and leans in. */
  listening?: boolean;
  /** Waiting for the tutor's next turn: the buddy thinks. */
  thinking?: boolean;
}

export function usePointing(stageRef: React.RefObject<HTMLElement>, buddyRef: React.RefObject<HTMLElement>, selector: string | null, deps: unknown[]) {
  const [aim, setAim] = useState<{ angle: number; look: { x: number; y: number } } | null>(null);
  const measure = useCallback(() => {
    const buddy = buddyRef.current?.querySelector("svg");
    const target = selector ? stageRef.current?.querySelector(selector) ?? document.querySelector(selector) : null;
    if (!buddy || !target) return setAim(null);
    const b = buddy.getBoundingClientRect();
    const t = target.getBoundingClientRect();
    const tx = t.left + t.width / 2;
    const ty = t.top + t.height / 2;
    // Measure from the shoulder on the target's side (that arm does the pointing).
    const sideX = tx < b.left + b.width / 2 ? POINTING_SHOULDER.leftX : POINTING_SHOULDER.x;
    const sx = b.left + (sideX / POINTING_SHOULDER.viewW) * b.width;
    const sy = b.top + (POINTING_SHOULDER.y / POINTING_SHOULDER.viewH) * b.height;
    const angle = (Math.atan2(ty - sy, tx - sx) * 180) / Math.PI;
    const dist = Math.hypot(tx - sx, ty - sy) || 1;
    setAim({ angle, look: { x: (tx - sx) / dist, y: (ty - sy) / dist } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector]);
  useLayoutEffect(() => {
    measure();
    const id = window.setTimeout(measure, 120);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measure, ...deps]);
  return aim;
}

export default function Stage({ characterId, turn, onSpoken, onCardTap, children, pointSelector, cardState = {}, compact, listening, thinking }: StageProps) {
  const c = characterById(characterId);
  const settings = useApp((s) => s.settings);
  const stageRef = useRef<HTMLDivElement>(null);
  const buddyRef = useRef<HTMLDivElement>(null);
  const [wordIdx, setWordIdx] = useState(-1);
  const [boardText, setBoardText] = useState("");
  const [emotion, setEmotion] = useState<Emotion>("happy");
  const [gesture, setGesture] = useState<Gesture>("wave");
  const [talking, setTalking] = useState(false);
  const [jumping, setJumping] = useState(false);
  const spokenRef = useRef(onSpoken);
  spokenRef.current = onSpoken;

  const selector = pointSelector !== undefined && pointSelector !== null
    ? pointSelector
    : !turn
      ? null
      : turn.pointAt === -2
        ? "[data-point=board]"
        : turn.pointAt >= 0
          ? `[data-point=card-${turn.pointAt}]`
          : null;
  const aim = usePointing(stageRef, buddyRef, selector, [turn, boardText, compact]);

  // Play a turn: write, point and speak, like a teacher at the board.
  useEffect(() => {
    if (!turn) return;
    let cancelled = false;
    setEmotion(turn.emotion);
    setWordIdx(-1);
    // A jump for joy on a right answer, like a real cheer.
    let jumpTimer = 0;
    if (turn.correct) {
      setJumping(true);
      jumpTimer = window.setTimeout(() => setJumping(false), 1100);
    }
    setBoardText("");
    const start = turn.board ? (setGesture("write"), setBoardText(turn.board), 250) : 0;
    const firstGesture: Gesture = turn.pointAt >= 0 ? "point" : turn.gesture === "write" && !turn.board ? "point" : turn.gesture;
    const t = window.setTimeout(async () => {
      if (cancelled) return;
      if (!turn.board) setGesture(firstGesture);
      setTalking(true);
      await speak(turn.speech, { characterId, onWord: (i) => !cancelled && setWordIdx(i), volume: settings.volume, rate: settings.voiceRate });
      if (cancelled) return;
      setTalking(false);
      setWordIdx(-1);
      if (turn.correct) setGesture("thumbsUp");
      else if (turn.pointAt >= 0 || turn.board) setGesture("point");
      else setGesture(turn.gesture === "write" ? "none" : turn.gesture);
      spokenRef.current?.();
    }, start);
    return () => {
      cancelled = true;
      clearTimeout(t);
      clearTimeout(jumpTimer);
      stopSpeaking();
      setTalking(false);
    };
  }, [turn, characterId, settings.volume, settings.voiceRate]);

  useEffect(() => stopSpeaking, []);

  const words = turn ? speechWords(turn.speech) : [];
  const caption = turn?.caption ?? "";
  const effectiveGesture: Gesture = listening ? "listen" : thinking ? "think" : pointSelector ? "point" : gesture;
  // The camera moves in close on the buddy's face while it talks or listens with nothing to point at,
  // and pulls back to the whole body to point, write and cheer.
  const close = !compact && !jumping && (listening || (talking && !selector && !boardText));
  const spoken = wordIdx >= 0 ? (words[wordIdx] ?? "").replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}']+$/gu, "") : "";

  return (
    <div className={`stage ${compact ? "stage-compact" : ""}`} ref={stageRef}>
      <div className="stage-lesson">
        {talking && spoken ? (
          <h1 className="stage-word" key={`w${wordIdx}`} aria-hidden>
            {spoken}
          </h1>
        ) : (
          caption && (
            <h1 className="stage-caption" key={caption}>
              {caption}
            </h1>
          )
        )}
        {boardText && <Whiteboard text={boardText} onDone={() => setGesture(selector ? "point" : "none")} />}
        {turn && turn.cards.length > 0 && (
          <div className="cards">
            {turn.cards.map((card, i) => (
              <button
                key={`${card.label}-${i}`}
                data-point={`card-${i}`}
                className={`card ${turn.pointAt === i && talking ? "card-focus" : ""} ${cardState[i] ? `card-${cardState[i]}` : ""}`}
                style={{ animationDelay: `${i * 90}ms` }}
                onClick={() => onCardTap?.(card, i)}
              >
                <span className="card-emoji">{card.emoji}</span>
                {card.label && card.label !== "?" && <span className="card-label">{card.label}</span>}
              </button>
            ))}
          </div>
        )}
        {children}
      </div>

      <div className="stage-buddy" ref={buddyRef}>
        {settings.subtitles && turn && (
          <div className="speech-bubble" aria-live="polite">
            {words.map((w, i) => (
              <span key={i} className={i === wordIdx ? "w w-now" : i < wordIdx ? "w w-said" : "w"}>
                {w}{" "}
              </span>
            ))}
          </div>
        )}
        <div className="cam-frame">
          <div className={`cam ${close ? "cam-close" : ""} ${jumping ? "cam-jump" : ""}`}>
            <Buddy
              character={c}
              emotion={jumping ? "excited" : listening ? "curious" : talking && emotion === "thinking" ? "curious" : emotion}
              gesture={jumping ? "cheer" : effectiveGesture}
              pointAngle={aim?.angle ?? 60}
              look={listening || (talking && !selector) ? { x: 0, y: 0.15 } : thinking ? { x: 0.5, y: -0.6 } : aim?.look ?? { x: 0, y: 0.2 }}
              size={compact ? 190 : 300}
              className={talking ? "talking" : listening ? "listening" : "idle"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
