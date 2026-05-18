/**
 * Synthesized Game Audio Engine
 * Uses Web Audio API to generate short gamified sounds — no external files needed.
 */

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  gainVal = 0.15,
  rampDown = true
) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = gainVal;
  if (rampDown) gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.connect(gain).connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function playSequence(
  notes: { freq: number; start: number; dur: number; type?: OscillatorType; gain?: number }[]
) {
  const ctx = getCtx();
  for (const n of notes) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = n.type || "sine";
    osc.frequency.value = n.freq;
    g.gain.value = n.gain ?? 0.12;
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + n.start + n.dur);
    osc.connect(g).connect(ctx.destination);
    osc.start(ctx.currentTime + n.start);
    osc.stop(ctx.currentTime + n.start + n.dur);
  }
}

// ─── Public sound functions ───────────────────────────────────

/** Soft chime — correct answer */
export function playCorrectAnswer() {
  playSequence([
    { freq: 523, start: 0, dur: 0.12 },      // C5
    { freq: 659, start: 0.08, dur: 0.12 },    // E5
    { freq: 784, start: 0.16, dur: 0.2 },     // G5
  ]);
}

/** Light victory — exercise/lesson complete */
export function playLessonComplete() {
  playSequence([
    { freq: 523, start: 0, dur: 0.15 },
    { freq: 659, start: 0.1, dur: 0.15 },
    { freq: 784, start: 0.2, dur: 0.15 },
    { freq: 1047, start: 0.35, dur: 0.35, gain: 0.15 },
  ]);
}

/** Short fanfare — mission/story complete */
export function playMissionComplete() {
  playSequence([
    { freq: 392, start: 0, dur: 0.12, type: "triangle" },     // G4
    { freq: 523, start: 0.1, dur: 0.12, type: "triangle" },    // C5
    { freq: 659, start: 0.2, dur: 0.12, type: "triangle" },    // E5
    { freq: 784, start: 0.3, dur: 0.15, type: "triangle" },    // G5
    { freq: 1047, start: 0.45, dur: 0.4, type: "sine", gain: 0.18 }, // C6
  ]);
}

/** Distinctive celebration — streak milestones */
export function playStreakCelebration() {
  playSequence([
    { freq: 440, start: 0, dur: 0.1, type: "triangle" },
    { freq: 554, start: 0.08, dur: 0.1, type: "triangle" },
    { freq: 659, start: 0.16, dur: 0.1, type: "triangle" },
    { freq: 880, start: 0.28, dur: 0.12, type: "sine" },
    { freq: 1109, start: 0.38, dur: 0.12, type: "sine" },
    { freq: 1319, start: 0.48, dur: 0.35, type: "sine", gain: 0.16 },
  ]);
}

/** Small tick — XP gained */
export function playXPGain() {
  playSequence([
    { freq: 880, start: 0, dur: 0.08, gain: 0.08 },
    { freq: 1175, start: 0.06, dur: 0.12, gain: 0.1 },
  ]);
}

/** Gentle badge unlock */
export function playBadgeUnlock() {
  playSequence([
    { freq: 587, start: 0, dur: 0.15, type: "triangle" },
    { freq: 740, start: 0.12, dur: 0.15, type: "triangle" },
    { freq: 880, start: 0.24, dur: 0.25, type: "sine", gain: 0.15 },
  ]);
}

/** Soft "oops" — incorrect answer */
export function playIncorrectAnswer() {
  playSequence([
    { freq: 330, start: 0, dur: 0.15, type: "sine", gain: 0.1 },
    { freq: 277, start: 0.12, dur: 0.25, type: "sine", gain: 0.08 },
  ]);
}

/** Slightly stronger low buzz — failed challenge */
export function playChallengeFailed() {
  playSequence([
    { freq: 220, start: 0, dur: 0.18, type: "sawtooth", gain: 0.06 },
    { freq: 185, start: 0.15, dur: 0.3, type: "sine", gain: 0.08 },
  ]);
}
