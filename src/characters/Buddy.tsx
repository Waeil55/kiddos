// Vector buddy with live lip-sync, blinking, eye tracking and posable arms.
// Every one of the ten characters is drawn by this component from its `look`.
import { useEffect, useRef, useState } from "react";
import type { Character } from "../shared/characters";
import type { Emotion, Gesture } from "../shared/types";
import { onMouth, type MouthShape } from "../voice/speech";

export interface BuddyProps {
  character: Character;
  emotion?: Emotion;
  gesture?: Gesture;
  /** Angle in degrees (0 = right, 90 = down) the pointing arm aims at. */
  pointAngle?: number;
  /** -1..1 gaze offset. */
  look?: { x: number; y: number };
  size?: number;
  /** Draw a marker in the writing hand. */
  holdingPen?: boolean;
  className?: string;
}

const SHOULDER_R = { x: 222, y: 252 };
const SHOULDER_L = { x: 78, y: 252 };

function smileFor(e: Emotion): number {
  return { happy: 1, excited: 1.4, proud: 1.2, silly: 1.3, curious: 0.4, thinking: -0.2, calm: 0.6, surprised: -0.6 }[e];
}

function Ears({ c }: { c: Character }) {
  const { body, accent, dark, ears } = c.look;
  switch (ears) {
    case "round":
      return (
        <g fill={c.look.marking === "eyePatches" ? dark : body}>
          <circle cx="78" cy="62" r="34" />
          <circle cx="222" cy="62" r="34" />
        </g>
      );
    case "pointy":
      return (
        <g>
          <path d="M70 105 L62 22 L130 70 Z" fill={body} />
          <path d="M230 105 L238 22 L170 70 Z" fill={body} />
          <path d="M78 92 L72 42 L114 72 Z" fill={dark} opacity=".8" />
          <path d="M222 92 L228 42 L186 72 Z" fill={dark} opacity=".8" />
        </g>
      );
    case "long":
      return (
        <g>
          <ellipse cx="112" cy="8" rx="22" ry="70" fill={body} transform="rotate(-10 112 60)" />
          <ellipse cx="188" cy="8" rx="22" ry="70" fill={body} transform="rotate(10 188 60)" />
          <ellipse cx="112" cy="14" rx="11" ry="52" fill={accent} transform="rotate(-10 112 60)" />
          <ellipse cx="188" cy="14" rx="11" ry="52" fill={accent} transform="rotate(10 188 60)" />
        </g>
      );
    case "tufts":
      return (
        <g fill={dark}>
          <path d="M72 80 L58 18 L118 58 Z" />
          <path d="M228 80 L242 18 L182 58 Z" />
        </g>
      );
    case "small":
      return (
        <g>
          <circle cx="82" cy="68" r="24" fill={body} />
          <circle cx="218" cy="68" r="24" fill={body} />
          <circle cx="82" cy="70" r="12" fill={accent} />
          <circle cx="218" cy="70" r="12" fill={accent} />
        </g>
      );
    case "big":
      return (
        <g>
          <ellipse cx="46" cy="130" rx="46" ry="58" fill={body} />
          <ellipse cx="254" cy="130" rx="46" ry="58" fill={body} />
          <ellipse cx="50" cy="132" rx="28" ry="38" fill={accent} />
          <ellipse cx="250" cy="132" rx="28" ry="38" fill={accent} />
        </g>
      );
    default:
      return null;
  }
}

function Hat({ c }: { c: Character }) {
  const { accent } = c.look;
  switch (c.look.hat) {
    case "crown":
      return <path d="M112 50 L118 18 L136 38 L150 10 L164 38 L182 18 L188 50 Z" fill="#ffd34d" stroke="#e0a800" strokeWidth="3" />;
    case "cap":
      return (
        <g>
          <path d="M92 64 Q150 0 208 64 Z" fill="#ef4444" />
          <rect x="150" y="56" width="80" height="12" rx="6" fill="#b91c1c" />
        </g>
      );
    case "bow":
      return (
        <g fill="#ff5c9a" transform="translate(196 52)">
          <path d="M0 0 L-26 -16 L-26 16 Z" />
          <path d="M0 0 L26 -16 L26 16 Z" />
          <circle r="7" fill="#e11d74" />
        </g>
      );
    case "beanie":
      return (
        <g>
          <path d="M84 72 Q150 -14 216 72 Z" fill={accent} />
          <rect x="80" y="64" width="140" height="16" rx="8" fill="#e58f00" />
          <circle cx="150" cy="18" r="14" fill="#fff" />
        </g>
      );
    case "headphones":
      return (
        <g fill="none" stroke="#ff6b6b" strokeWidth="10" strokeLinecap="round">
          <path d="M70 120 Q150 -20 230 120" />
          <rect x="56" y="110" width="22" height="40" rx="10" fill="#ff6b6b" />
          <rect x="222" y="110" width="22" height="40" rx="10" fill="#ff6b6b" />
        </g>
      );
    case "star":
      return <path d="M150 8 l10 22 24 3 -18 16 5 24 -21 -12 -21 12 5 -24 -18 -16 24 -3z" fill="#ffd34d" stroke="#e0a800" strokeWidth="2" />;
    case "leaf":
      return (
        <g transform="translate(150 50) rotate(-20)">
          <path d="M0 0 Q20 -34 0 -60 Q-20 -34 0 0" fill="#5cc46b" />
          <path d="M0 0 L0 -56" stroke="#2f8a3c" strokeWidth="3" />
        </g>
      );
    case "flower":
      return (
        <g transform="translate(110 58)">
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 11} cy={Math.sin((a * Math.PI) / 180) * 11} r="9" fill="#ffd1e3" />
          ))}
          <circle r="7" fill="#ffd34d" />
        </g>
      );
    case "glasses":
      return null; // drawn over the eyes
    default:
      return null;
  }
}

export default function Buddy({ character: c, emotion = "happy", gesture = "none", pointAngle = 60, look = { x: 0, y: 0 }, size = 300, holdingPen, className }: BuddyProps) {
  const mouthRef = useRef<SVGPathElement>(null);
  const tongueRef = useRef<SVGEllipseElement>(null);
  const [blink, setBlink] = useState(false);
  const { body, accent, belly, dark, marking, tuft } = c.look;
  const smile = smileFor(emotion);
  const hasBeak = c.species === "Owl" || c.species === "Penguin";

  // Lip-sync: the voice engine streams how open, wide (ee, s) and round (oo, oh) the mouth is;
  // draw it without re-rendering React.
  useEffect(() => {
    const draw = (open: number, shape?: MouthShape) => {
      const wide = shape?.wide ?? 0;
      const round = shape?.round ?? 0;
      const y = 196;
      const w = (22 + open * 6) * (1 + wide * 0.35) * (1 - round * 0.45);
      const top = y - smile * 4 * (1 - round * 0.7);
      const bottom = y + 6 + smile * 6 * (1 - round * 0.6) + open * 30 * (1 - wide * 0.4) * (1 + round * 0.2);
      mouthRef.current?.setAttribute("d", `M${150 - w} ${top} Q150 ${top + 8 + smile * 6} ${150 + w} ${top} Q150 ${bottom + 6} ${150 - w} ${top} Z`);
      if (tongueRef.current) {
        tongueRef.current.setAttribute("cy", String(top + (bottom - top) * 0.75));
        tongueRef.current.setAttribute("ry", String(Math.max(0, open * 9)));
      }
    };
    draw(0);
    return onMouth(draw);
  }, [smile]);

  // Natural blinking at random intervals.
  useEffect(() => {
    let t: number;
    const loop = () => {
      t = window.setTimeout(() => {
        setBlink(true);
        window.setTimeout(() => setBlink(false), 130);
        loop();
      }, 2200 + Math.random() * 3000);
    };
    loop();
    return () => clearTimeout(t);
  }, []);

  // Arm poses. Angles are degrees from +x, clockwise (SVG).
  let right = 80;
  let left = 100;
  let rightClass = "";
  let leftClass = "";
  // Point with the arm on the target's side so it never reaches across the body.
  const aimed = gesture === "point" || gesture === "write";
  const useLeft = aimed && Math.cos((pointAngle * Math.PI) / 180) < -0.15;
  switch (gesture) {
    case "point":
    case "write":
      if (useLeft) left = pointAngle < 0 ? pointAngle + 360 : pointAngle;
      else right = pointAngle > 180 ? pointAngle - 360 : pointAngle;
      break;
    case "wave":
      right = -60;
      rightClass = "arm-wave";
      break;
    case "thumbsUp":
      right = -40;
      break;
    case "cheer":
      right = -60;
      left = 240;
      rightClass = leftClass = "arm-cheer";
      break;
    case "think":
      left = 290;
      break;
    case "listen":
      // A paw cupped by the ear, like a child's teacher listening closely.
      left = 256;
      break;
  }
  const armLen = c.species === "Dinosaur" ? 50 : 78;
  const aimHand: "point" | "pen" = holdingPen || gesture === "write" ? "pen" : "point";
  const eyeDX = look.x * 7;
  const eyeDY = look.y * 6;
  const thinking = emotion === "thinking" || gesture === "think";

  const arm = ({ at, angle, cls, hand }: { at: { x: number; y: number }; angle: number; cls: string; hand: "point" | "open" | "thumb" | "pen" }) => {
    const len = hand === "point" || hand === "pen" ? armLen + 16 : armLen;
    return (
    <g transform={`translate(${at.x} ${at.y})`}>
      <g className={`arm ${cls}`} style={{ transform: `rotate(${angle}deg)` }}>
        <rect x="-4" y="-17" width={len + 8} height="34" rx="17" fill={body} stroke={dark} strokeOpacity=".12" strokeWidth="2" />
        <g transform={`translate(${len} 0)`}>
          <circle r="20" fill={marking === "eyePatches" ? dark : body} />
          {hand === "point" && <rect x="8" y="-6" width="28" height="12" rx="6" fill={marking === "eyePatches" ? dark : body} />}
          {hand === "thumb" && <rect x="-6" y="-36" width="12" height="26" rx="6" fill={marking === "eyePatches" ? dark : body} />}
          {hand === "pen" && (
            <g transform="rotate(20)">
              <rect x="6" y="-5" width="44" height="10" rx="3" fill="#2563eb" />
              <path d="M50 -5 L62 0 L50 5 Z" fill="#1e293b" />
            </g>
          )}
        </g>
      </g>
    </g>
    );
  };

  return (
    <svg viewBox="-10 -20 320 400" width={size} height={(size * 400) / 320} className={`buddy ${className ?? ""} emotion-${emotion}`} role="img" aria-label={`${c.name} the ${c.species}`}>
      <ellipse cx="150" cy="372" rx="100" ry="12" fill="#000" opacity=".08" />

      {/* Body */}
      <g className="buddy-body">
        {marking === "mane" && (
          <g fill={tuft}>
            {Array.from({ length: 16 }).map((_, i) => {
              const a = (i / 16) * Math.PI * 2;
              return <circle key={i} cx={150 + Math.cos(a) * 104} cy={140 + Math.sin(a) * 100} r="34" />;
            })}
          </g>
        )}
        {c.species === "Dinosaur" && (
          <g fill={accent}>
            {[0, 1, 2, 3].map((i) => (
              <path key={i} d={`M${120 + i * 20} ${48 + Math.abs(i - 1.5) * 6} l10 -26 l10 26 z`} />
            ))}
            <path d="M232 300 Q300 320 296 360 Q260 330 220 330 Z" fill={body} />
          </g>
        )}
        <Ears c={c} />
        <ellipse cx="150" cy="290" rx="100" ry="78" fill={marking === "eyePatches" ? dark : body} />
        <ellipse cx="150" cy="300" rx="64" ry="56" fill={belly} />
        {marking === "spots" && (
          <g fill={accent} opacity=".7">
            <circle cx="88" cy="290" r="10" />
            <circle cx="208" cy="270" r="8" />
            <circle cx="220" cy="306" r="6" />
            <circle cx="98" cy="96" r="8" />
            <circle cx="206" cy="90" r="6" />
          </g>
        )}
        {marking === "stripes" && (
          <g stroke={dark} strokeWidth="8" strokeLinecap="round">
            <path d="M70 270 l20 8" />
            <path d="M230 270 l-20 8" />
          </g>
        )}
        {/* feet */}
        <ellipse cx="104" cy="360" rx="34" ry="16" fill={marking === "eyePatches" ? dark : body} />
        <ellipse cx="196" cy="360" rx="34" ry="16" fill={marking === "eyePatches" ? dark : body} />


        {/* Head */}
        <circle cx="150" cy="140" r="100" fill={body} />
        {marking === "facemask" && <ellipse cx="150" cy="175" rx="72" ry="58" fill={accent} />}
        {c.species === "Owl" && <path d="M58 140 Q150 40 242 140 Q150 230 58 140Z" fill={accent} opacity=".7" />}
        {c.species === "Penguin" && <path d="M66 150 Q100 80 150 110 Q200 80 234 150 Q220 236 150 238 Q80 236 66 150Z" fill={belly} />}

        {/* Eyes */}
        <g className="buddy-eyes">
          {marking === "eyePatches" && (
            <g fill={dark}>
              <ellipse cx="108" cy="134" rx="30" ry="38" transform="rotate(-25 108 134)" />
              <ellipse cx="192" cy="134" rx="30" ry="38" transform="rotate(25 192 134)" />
            </g>
          )}
          {[108, 192].map((x) => (
            <g key={x}>
              <ellipse cx={x} cy="132" rx="24" ry={blink ? 2 : thinking ? 20 : 26} fill="#fff" />
              {!blink && (
                <g transform={`translate(${eyeDX} ${eyeDY + (thinking ? -6 : 0)})`}>
                  <circle cx={x} cy="134" r="15" fill="#1d1d27" />
                  <circle cx={x + 5} cy="127" r="5.5" fill="#fff" />
                  <circle cx={x - 5} cy="140" r="2.5" fill="#fff" opacity=".8" />
                </g>
              )}
              {/* brows show emotion */}
              <path
                d={emotion === "surprised" ? `M${x - 18} 92 Q${x} 80 ${x + 18} 92` : emotion === "thinking" ? `M${x - 18} ${x < 150 ? 96 : 100} L${x + 18} ${x < 150 ? 100 : 94}` : `M${x - 18} 100 Q${x} 90 ${x + 18} 100`}
                stroke={dark}
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                opacity={marking === "eyePatches" ? 0 : 0.8}
              />
            </g>
          ))}
          {c.look.hat === "glasses" && (
            <g fill="none" stroke="#1e293b" strokeWidth="5">
              <circle cx="108" cy="132" r="32" />
              <circle cx="192" cy="132" r="32" />
              <path d="M140 132 Q150 124 160 132" />
            </g>
          )}
        </g>

        {/* Cheeks */}
        <circle cx="80" cy="182" r="14" fill="#ff8fab" opacity={marking === "cheeks" ? 0.6 : 0.3} />
        <circle cx="220" cy="182" r="14" fill="#ff8fab" opacity={marking === "cheeks" ? 0.6 : 0.3} />

        {/* Nose / beak / trunk */}
        {hasBeak ? (
          <path d="M136 164 L164 164 L150 184 Z" fill="#ffb020" />
        ) : marking === "trunk" ? (
          <path d="M138 160 Q134 230 168 246 Q178 240 172 232 Q154 220 162 160 Z" fill={body} stroke={dark} strokeOpacity=".15" strokeWidth="2" />
        ) : (
          <ellipse cx="150" cy="170" rx="13" ry="9" fill={dark} />
        )}

        {/* Mouth (lip-synced) */}
        <g transform={marking === "trunk" ? "translate(-34 0)" : undefined}>
          <path ref={mouthRef} fill="#5b1a2a" stroke={dark} strokeWidth="3" strokeLinejoin="round" />
          <ellipse ref={tongueRef} cx="150" cy="205" rx="12" ry="0" fill="#ff6f8a" />
        </g>

        <Hat c={c} />

        {/* Arms: whichever side faces the target does the pointing / writing */}
        {arm({ at: SHOULDER_L, angle: left, cls: leftClass, hand: useLeft ? aimHand : "open" })}
        {arm({ at: SHOULDER_R, angle: right, cls: rightClass, hand: aimed && !useLeft ? aimHand : gesture === "thumbsUp" ? "thumb" : "open" })}
      </g>
    </svg>
  );
}

/** Shoulder position in viewBox units, used to aim the pointing arm at screen targets. */
export const POINTING_SHOULDER = { x: SHOULDER_R.x + 10, leftX: SHOULDER_L.x + 10, y: SHOULDER_R.y + 20, viewW: 320, viewH: 400 };
