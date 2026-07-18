"use client";

import React, { useEffect, useState } from 'react';

interface RadarScannerProps {
  size?: number;
  active?: boolean;
  offersCount?: number;
}

export default function RadarScanner({ size = 200, active = true, offersCount = 0 }: RadarScannerProps) {
  const [pings, setPings] = useState<Array<{ id: number; angle: number }>>([]);
  const counterRef = React.useRef(0);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      const angle = (counterRef.current * 45) % 360;
      counterRef.current++;
      setPings((prev) => [...prev.slice(-5), { id: Date.now(), angle }]);
    }, 2000);
    return () => clearInterval(interval);
  }, [active]);

  const c = size / 2;
  const ringRadii = [0.25, 0.5, 0.75];

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: 'absolute', inset: 0 }}
      >
        <defs>
          <radialGradient id="radarBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.06)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0)" />
          </radialGradient>
          <linearGradient id="radarSweep" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(56,189,248,0)" />
            <stop offset="40%" stopColor="rgba(56,189,248,0.05)" />
            <stop offset="70%" stopColor="rgba(56,189,248,0.15)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0.3)" />
          </linearGradient>
          <filter id="glowPing">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx={c} cy={c} r={c} fill="url(#radarBg)" />

        {ringRadii.map((r, i) => (
          <circle
            key={i}
            cx={c}
            cy={c}
            r={c * r}
            fill="none"
            stroke="rgba(56,189,248,0.08)"
            strokeWidth="0.5"
          />
        ))}

        <line
          x1={c}
          y1={c}
          x2={c + size * 0.45}
          y2={c}
          stroke="url(#radarSweep)"
          strokeWidth="2"
          style={{
            transformOrigin: `${c}px ${c}px`,
            animation: active ? 'radarSpin 4s linear infinite' : 'none',
          }}
        />

        <circle cx={c} cy={c} r="2.5" fill="#38BDF8" filter="url(#glowPing)" />

        {offersCount > 0 && (
          <>
            {Array.from({ length: Math.min(offersCount, 8) }).map((_, i) => {
              const angle = (i * 45 + 22) % 360;
              const rad = (angle * Math.PI) / 180;
              const dist = 0.15 + (i % 3) * 0.2;
              const x = c + Math.cos(rad) * c * dist;
              const y = c + Math.sin(rad) * c * dist;
              return (
                <g key={i} filter="url(#glowPing)">
                  <circle cx={x} cy={y} r="3" fill="#FFC107">
                    <animate
                      attributeName="opacity"
                      values="1;0.3;1"
                      dur={`${1.5 + (i % 3) * 0.5}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}
          </>
        )}

        {pings.map((ping) => {
          const rad = (ping.angle * Math.PI) / 180;
          const x = c + Math.cos(rad) * c * 0.7;
          const y = c + Math.sin(rad) * c * 0.7;
          return (
            <circle
              key={ping.id}
              cx={x}
              cy={y}
              r="0"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1.5"
              style={{ filter: 'url(#glowPing)' }}
            >
              <animate
                attributeName="r"
                from="2"
                to={c * 0.4}
                dur="1.5s"
                begin="0s"
                fill="freeze"
              />
              <animate
                attributeName="opacity"
                from="1"
                to="0"
                dur="1.5s"
                begin="0s"
                fill="freeze"
              />
            </circle>
          );
        })}
      </svg>

      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {active ? 'VARRENDO' : 'PAUSADO'}
        </div>
        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFC107', marginTop: 2 }}>
          {offersCount}
        </div>
        <div style={{ fontSize: '0.55rem', color: '#8896A9', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          ofertas
        </div>
      </div>

      <style>{`
        @keyframes radarSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
