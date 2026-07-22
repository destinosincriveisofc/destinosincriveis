"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Shield, Users, Sparkles, MessageSquare } from 'lucide-react';

const BENEFITS = [
  {
    icon: Shield,
    title: "Conteúdo Exclusivo",
    desc: "Acesso a relatórios de campo detalhados, mapas interativos e roteiros fechados indisponíveis para o público geral."
  },
  {
    icon: MessageSquare,
    title: "Comunidade VIP",
    desc: "Participe de discussões ativas com outros viajantes e compartilhe relatos reais de passagens, hotéis e locais."
  },
  {
    icon: Sparkles,
    title: "Acesso Antecipado",
    desc: "Seja um piloto de testes das novas ferramentas do ecossistema DIJA AI antes de todo mundo no mercado."
  }
];

export default function ClubSection() {
  return (
    <section className="py-24 bg-primary-bg/50 border-t border-white/5 relative overflow-hidden" id="clube-dija">
      {/* Decorative Radial */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-tr from-white/[0.02] to-white/[0.06] border border-white/10 rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 relative z-10 shadow-2xl">
          {/* Left Text Box */}
          <div className="flex-1 flex flex-col gap-6 text-left">
            <div className="flex items-center gap-1.5 self-start px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-gold/10 border border-brand-gold/20 text-brand-gold backdrop-blur-md">
              <Star size={14} className="fill-brand-gold" />
              <span>Clube Privado de Viajantes</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight font-heading">
              Faça parte do <br />
              <span className="bg-gradient-to-r from-brand-gold via-brand-gold to-brand-blue bg-clip-text text-transparent">
                Club DIJA.
              </span>
            </h2>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Junte-se à nossa comunidade premium de entusiastas de turismo. Um espaço voltado para quem encara viagens como exploração, conhecimento e tecnologia.
            </p>

            <div>
              <Link
                href="/club"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-gradient-to-r from-brand-gold to-brand-gold-dark text-primary-bg shadow-[0_4px_14px_rgba(255,193,7,0.3)] hover:shadow-[0_8px_24px_rgba(255,193,7,0.4)] hover:scale-105 active:scale-98 transition-all"
              >
                Garantir meu acesso
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Right Benefits Grid */}
          <div className="flex-1 grid grid-cols-1 gap-6 w-full">
            {BENEFITS.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="flex gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand-blue/20 hover:bg-white/[0.04] transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue flex-shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1">{b.title}</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
