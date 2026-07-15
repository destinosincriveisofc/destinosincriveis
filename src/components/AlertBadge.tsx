import React from 'react';

interface AlertBadgeProps {
  text: string;
}

export default function AlertBadge({ text }: AlertBadgeProps) {
  return (
    <span className="blink-animate inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#FFD43B] text-[#0A1628]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#0A1628]" />
      {text}
    </span>
  );
}
