"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DijaChatMock from '@/features/DijaChatMock';
import { Brain, Sparkles, Compass, ShieldAlert, AlertTriangle } from 'lucide-react';

export default function DijaAiPage() {
  return (
    <>
      <Navbar />
      <main className="bg-primary-bg min-h-screen pt-28 pb-16 text-white relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Brand Intro Column */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            <div className="flex items-center gap-1.5 self-start px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-blue/10 border border-brand-blue/20 text-brand-blue backdrop-blur-md">
              <Brain size={14} />
              <span>DIJA AI Copilot</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-heading leading-tight">
              O Copiloto da sua <br />
              <span className="bg-gradient-to-r from-brand-blue to-brand-gold bg-clip-text text-transparent">
                Próxima Aventura
              </span>
            </h1>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Diga adeus ao estresse de planejar viagens. A **DIJA AI** analisa seus desejos de viagem e gera na hora roteiros de alta fidelidade estruturados por dia, recomendações de hospedagem e dicas de deslocamento.
            </p>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold max-w-md">
              <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed font-semibold">
                <strong>Estágio Alpha:</strong> Estamos aprimorando os motores de busca inteligentes em tempo real. Interaja com a simulação ao lado para entender as funcionalidades.
              </p>
            </div>

            {/* How it works grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h4 className="text-sm font-bold text-white mb-1">1. Diga o que deseja</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Digite de forma livre: interesses, orçamento aproximado, companhia (solo, casal, família) e duração.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h4 className="text-sm font-bold text-white mb-1">2. Curadoria por IA</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Nossos algoritmos processam dados globais para encontrar o destino e o roteiro perfeitos.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Chat Console Column */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full flex justify-center">
              <DijaChatMock />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
