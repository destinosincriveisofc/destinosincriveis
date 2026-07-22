"use client";

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BrainCircuit, ArrowRight, Search, Sparkles, MapPin, RefreshCw, MessageCircle } from 'lucide-react';

export default function DijaAiPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--bg-primary)] min-h-screen pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero */}
          <section className="flex flex-col items-center text-center mb-24">
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[var(--brand-blue-light)] text-[var(--brand-blue)] border border-[var(--brand-blue)]/20 mb-6">
              <BrainCircuit size={14} />
              <span>DIJA AI Copilot</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] max-w-2xl leading-tight mb-5">
              O copiloto da sua proxima aventura
            </h1>

            <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-xl leading-relaxed mb-8">
              Conte o que voce ama. A DIJA cria o roteiro perfeito em segundos. Destinos, hospedagem, epoca ideal — tudo pensado para voce.
            </p>

            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[var(--brand-blue-light)] text-[var(--brand-blue)] border border-[var(--brand-blue)]/20 mb-2">
              <MessageCircle size={14} />
              <span>5 mensagens gratuitas para testar</span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard/guia"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--brand-gold)] text-white font-semibold text-sm hover:bg-[var(--brand-gold-hover)] transition-colors"
              >
                Conversar com a DIJA AI
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/club"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[var(--brand-gold)] text-[var(--brand-gold)] font-semibold text-sm hover:bg-[var(--brand-gold)]/10 transition-colors"
              >
                Assinar — R$ 9,90/mês (ilimitado)
              </Link>
            </div>

            <p className="text-xs text-[var(--text-muted)] mt-4 max-w-md">
              Membros do Club DIJA têm acesso ilimitado ao copiloto. Experimente com 5 mensagens grátis.
            </p>
          </section>

          {/* How it works */}
          <section className="mb-24">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] text-center mb-12">
              Como funciona
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-blue-light)] flex items-center justify-center mx-auto mb-4">
                  <Search size={22} className="text-[var(--brand-blue)]" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Conte suas preferencias</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Digite de forma livre: interesses, orcamento, companhia e duracao.
                </p>
              </div>

              <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-blue-light)] flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={22} className="text-[var(--brand-blue)]" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">IA processa e recomenda</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  A DIJA analisa dados para encontrar o destino e roteiro ideais.
                </p>
              </div>

              <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-blue-light)] flex items-center justify-center mx-auto mb-4">
                  <MapPin size={22} className="text-[var(--brand-blue)]" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Planeje e explore</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Receba um roteiro completo e personalize cada detalhe.
                </p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mb-24">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] text-center mb-12">
              Por que usar a DIJA AI?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-blue-light)] flex items-center justify-center mb-3">
                  <BrainCircuit size={20} className="text-[var(--brand-blue)]" />
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Roteiros personalizados</h3>
                <p className="text-sm text-[var(--text-secondary)]">Baseados no seu perfil de viajante</p>
              </div>

              <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-blue-light)] flex items-center justify-center mb-3">
                  <RefreshCw size={20} className="text-[var(--brand-blue)]" />
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Alertas inteligentes</h3>
                <p className="text-sm text-[var(--text-secondary)]">Saiba a melhor epoca para cada destino</p>
              </div>

              <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-blue-light)] flex items-center justify-center mb-3">
                  <Sparkles size={20} className="text-[var(--brand-blue)]" />
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Recomendacoes humanas</h3>
                <p className="text-sm text-[var(--text-secondary)]">Combinamos IA com curadoria real</p>
              </div>

              <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-blue-light)] flex items-center justify-center mb-3">
                  <MapPin size={20} className="text-[var(--brand-blue)]" />
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">Atualizacao constante</h3>
                <p className="text-sm text-[var(--text-secondary)]">Novos destinos e experiencias toda semana</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-10 md:p-14 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-2">
              Experimente 5 mensagens gratis
            </h2>
            <p className="text-sm text-[var(--text-muted)] mb-6 max-w-md mx-auto">
              Depois, assine o Club DIJA por R$ 9,90/mês e tenha acesso ilimitado ao copiloto de viagens.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/dashboard/guia"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--brand-gold)] text-white font-semibold text-sm hover:bg-[var(--brand-gold-hover)] transition-colors"
              >
                Testar gratis
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/club"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--border-default)] text-[var(--text-secondary)] font-semibold text-sm hover:border-[var(--brand-blue)] transition-colors"
              >
                Assinar Club DIJA
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
