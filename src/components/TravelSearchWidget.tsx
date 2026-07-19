"use client";

import React, { useEffect, useRef } from 'react';

interface TravelSearchWidgetProps {
  variant?: 'home' | 'vip' | 'offers';
}

const SRC_URL = "https://tp.media/content?marker=550897&shmarker=550897&promo_id=2088&width=100%25&primary=%230a122c&color_button=%23ffc107&color_text=%23ffffff&color_button_text=%230a122c&show_logo=false&multi_city=true&with_hash=true";

export default function TravelSearchWidget({ variant = 'home' }: TravelSearchWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const existing = containerRef.current.querySelector('script[data-tp]');
    if (existing) return;

    const script = document.createElement('script');
    script.src = SRC_URL;
    script.async = true;
    script.setAttribute('data-tp', 'true');
    containerRef.current.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  if (variant === 'vip') {
    return (
      <div className="max-w-6xl mx-auto mb-10 p-6 bg-slate-900/60 rounded-2xl border border-yellow-500/20 text-center">
        <h3 className="text-lg font-bold text-yellow-500 mb-1">Buscador VIP Club Dija</h3>
        <p className="text-xs text-slate-400 mb-6">Pesquise tarifas e passagens com o nosso buscador parceiro.</p>
        <div ref={containerRef} />
      </div>
    );
  }

  if (variant === 'offers') {
    return (
      <div className="max-w-6xl mx-auto mb-10 p-6 bg-slate-900/60 rounded-2xl border border-sky-500/20 text-center backdrop-blur-sm">
        <h3 className="text-lg font-bold text-sky-300 mb-1">Buscar Passagens</h3>
        <p className="text-xs text-slate-400 mb-6">Encontre as melhores tarifas com nosso buscador parceiro.</p>
        <div ref={containerRef} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-8 px-4">
      <div className="p-6 bg-slate-900/60 rounded-2xl border border-sky-500/20 text-center backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-2">Para onde você quer ir?</h3>
        <p className="text-sm text-sky-300 mb-6">Pesquise voos e hotéis nas melhores tarifas e planeje sua viagem agora.</p>
        <div ref={containerRef} />
      </div>
    </div>
  );
}
