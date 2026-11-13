// Tiny synthesized sound effects (no audio files to ship).
let ctx: AudioContext | null = null;

function tone(freq: number, start: number, dur: number, type: OscillatorType = "sine", gain = 0.15) {
  ctx ??= new AudioContext();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, ctx.currentTime + start);
  g.gain.linearRampToValueAtTime(gain, ctx.currentTime + start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
  o.connect(g).connect(ctx.destination);
  o.start(ctx.currentTime + start);
  o.stop(ctx.currentTime + start + dur + 0.05);
}

export const sfx = {
  correct() {
    tone(660, 0, 0.15, "triangle");
    tone(880, 0.1, 0.15, "triangle");
    tone(1320, 0.2, 0.3, "triangle");
  },
  wrong() {
    tone(330, 0, 0.18, "sine", 0.12);
    tone(262, 0.15, 0.25, "sine", 0.12);
  },
  tap() {
    tone(520, 0, 0.06, "square", 0.05);
  },
  star() {
    [0, 0.07, 0.14, 0.21].forEach((t, i) => tone(1000 + i * 250, t, 0.12, "sine", 0.08));
  },
  listen() {
    tone(740, 0, 0.08, "sine", 0.08);
    tone(988, 0.08, 0.1, "sine", 0.08);
  },
};
