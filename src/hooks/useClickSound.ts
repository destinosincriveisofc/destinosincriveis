"use client";

import { useCallback, useRef, useEffect } from 'react';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

function playClickSoundInternal() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Short click: a brief white-noise burst with sharp envelope
    const sampleRate = ctx.sampleRate;
    const duration = 0.06;
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-t * 80);
      data[i] = (Math.random() * 2 - 1) * envelope * 0.15;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    // High-pass filter to make it a crisp "tic"
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2000;

    const gain = ctx.createGain();
    gain.gain.value = 0.3;

    source.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    source.start(now);
  } catch {
    // Silently fail — audio not critical
  }
}

export function useClickSound() {
  const play = useCallback(() => {
    playClickSoundInternal();
  }, []);

  return play;
}
