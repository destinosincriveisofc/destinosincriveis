"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Brain, Sparkles, Wand2 } from 'lucide-react';
import DijaChatMock from '@/features/DijaChatMock';

export default function AISection() {
  return (
    <section className="py-24 bg-primary-bg relative overflow-hidden" id="dija-ai">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          {/* Badge */}
          <div className="flex items-center gap-1.5 self-start px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-blue/10 border border-brand-blue/20 text-brand-blue backdrop-blur-md">
            <Brain size={14} />
            <span>Inteligência Artificial</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight font-heading">
            Seu copiloto <br />
            <span className="bg-gradient-to-r from-brand-blue via-brand-blue to-brand-gold bg-clip-text text-transparent">
              inteligente de viagens.
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed font-normal">
            Conte seus desejos e restrições. A assistente **DIJA** utiliza modelos inteligentes de curadoria para cruzar clima, moedas valorizadas, tipos de atividades e gerar a recomendação perfeita em segundos.
          </p>

          <div className="flex flex-col gap-4 text-sm text-gray-400">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mt-0.5">
                <Wand2 size={12} />
              </div>
              <p>
                <strong>Personalização extrema:</strong> Esqueça roteiros prontos e genéricos. Tenha uma viagem que reflete exatamente seu perfil.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mt-0.5">
                <Sparkles size={12} />
              </div>
              <p>
                <strong>Pesquisa em tempo real:</strong> Encontre as conexões ideais e as melhores épocas para aproveitar ao máximo cada parada.
              </p>
            </div>
          </div>

          {/* CTA Link */}
          <div className="mt-4">
            <Link
              href="/dija-ai"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-white/5 border border-white/10 hover:border-brand-blue text-white hover:bg-brand-blue/5 hover:scale-105 active:scale-98 transition-all"
            >
              Conhecer a DIJA AI
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        {/* Right Chat Column */}
        <div className="lg:col-span-6 flex justify-center w-full">
          <DijaChatMock demoMode={true} />
        </div>
      </div>
    </section>
  );
}
