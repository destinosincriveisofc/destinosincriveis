"use client";

import { useEffect, useRef } from 'react';

function isClickable(el: HTMLElement): boolean {
  const tag = el.tagName.toLowerCase();
  if (tag === 'a' || tag === 'button') return true;
  if (el.getAttribute('role') === 'button') return true;
  if (el.onclick) return true;
  if (el.classList.contains('bottomNavItem')) return true;
  return false;
}

export default function SoundEffectProvider() {
  const enabled = useRef(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!enabled.current) return;
      const target = e.target as HTMLElement;
      if (!target) return;

      let el: HTMLElement | null = target;
      while (el && !isClickable(el)) {
        el = el.parentElement;
      }
      if (!el) return;

      try {
        let ctx = audioCtxRef.current;
        if (!ctx) {
          const AC = window.AudioContext || (window as any).webkitAudioContext;
          if (!AC) return;
          ctx = new AC();
          audioCtxRef.current = ctx;
        }
        if (ctx.state === 'suspended') ctx.resume();

        const now = ctx.currentTime;
        const sr = ctx.sampleRate;
        const len = Math.floor(sr * 0.05);
        const buf = ctx.createBuffer(1, len, sr);
        const d = buf.getChannelData(0);

        for (let i = 0; i < len; i++) {
          const t = i / sr;
          d[i] = (Math.random() * 2 - 1) * Math.exp(-t * 90) * 0.12;
        }

        const src = ctx.createBufferSource();
        src.buffer = buf;

        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.value = 2200;

        const g = ctx.createGain();
        g.gain.value = 0.25;

        src.connect(hp);
        hp.connect(g);
        g.connect(ctx.destination);
        src.start(now);
      } catch {
        // silent
      }
    };

    document.addEventListener('click', handler, { capture: true });
    return () => document.removeEventListener('click', handler, { capture: true });
  }, []);

  return null;
}
