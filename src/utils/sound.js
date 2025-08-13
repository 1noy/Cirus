let audioContext = null;

const SOUND_STORAGE_KEY = 'sound_enabled';

function ensureContext() {
  if (!audioContext) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audioContext = new Ctx();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume().catch(() => {});
  }
  return audioContext;
}

function playTone({ frequency = 440, durationMs = 120, type = 'sine', gain = 0.03 }) {
  const ctx = ensureContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

  gainNode.gain.setValueAtTime(gain, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationMs / 1000);

  oscillator.connect(gainNode).connect(ctx.destination);
  oscillator.start();
  oscillator.stop(ctx.currentTime + durationMs / 1000);
}

export function isSoundEnabled() {
  try { return localStorage.getItem(SOUND_STORAGE_KEY) !== '0'; } catch { return true; }
}

export function setSoundEnabled(enabled) {
  try { localStorage.setItem(SOUND_STORAGE_KEY, enabled ? '1' : '0'); } catch {}
}

export function toggleSoundEnabled() {
  const next = !isSoundEnabled();
  setSoundEnabled(next);
  return next;
}

export function playSound(kind) {
  if (!isSoundEnabled()) return;
  switch (kind) {
    case 'send':
      // petit blip montant
      playTone({ frequency: 440, durationMs: 80, type: 'triangle', gain: 0.025 });
      setTimeout(() => playTone({ frequency: 660, durationMs: 80, type: 'triangle', gain: 0.02 }), 60);
      break;
    case 'receive':
      // blip descendant
      playTone({ frequency: 660, durationMs: 90, type: 'sine', gain: 0.02 });
      setTimeout(() => playTone({ frequency: 420, durationMs: 120, type: 'sine', gain: 0.02 }), 70);
      break;
    case 'reaction':
      // ping court
      playTone({ frequency: 880, durationMs: 70, type: 'square', gain: 0.02 });
      break;
    default:
      break;
  }
}


