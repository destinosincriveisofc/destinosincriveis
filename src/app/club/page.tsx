"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Star, ArrowRight, ShieldCheck, Flame, Bell, MessageSquare, CreditCard, Sparkles, ShieldAlert, Cpu } from 'lucide-react';

export default function ClubPage() {
  const [hasClickedBuy, setHasClickedBuy] = useState(false);

  const benefits = [
    {
      icon: <Cpu className="text-brand-blue" size={24} />,
      title: "Ferramentas Avançadas",
      description: "Acesso total à suíte de busca inteligente da DIJA AI com filtros comportamentais e geração de PDFs de roteiros estruturados."
    },
    {
      icon: <Sparkles className="text-brand-gold" size={24} />,
      title: "Curadoria Especializada",
      description: "Nossos editores vasculham e publicam semanalmente guias fechados com mapas de pontos turísticos imperdíveis."
    },
    {
      icon: <ShieldCheck className="text-brand-blue" size={24} />,
      title: "Descoberta de Novidades",
      description: "Seja notificado em primeira mão sobre a abertura de fronteiras, novos hotéis-conceito e novas rotas aéreas globais."
    },
    {
      icon: <MessageSquare className="text-brand-gold" size={24} />,
      title: "Fórum de Viajantes",
      description: "Um espaço limpo, sem anúncios, voltado a compartilhar relatos reais, contatos de guias locais e dicas práticas."
    }
  ];

  const plans = [
    {
      name: "Membro Fundador",
      price: "R$ 19,90",
      period: "por mês",
      description: "Tenha acesso ilimitado à plataforma, fóruns e IA copilot.",
      link: "/checkout",
      popular: true,
      features: [
        "Acesso à comunidade VIP de viajantes",
        "Uso ilimitado do copiloto DIJA AI",
        "Revista editorial completa e guias premium",
        "Suporte técnico prioritário",
        "Sem anúncios ou taxas ocultas de reservas"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Mariana Silva",
      role: "Membro há 6 meses",
      text: "O Club mudou minha forma de enxergar planejamento. O roteiro detalhado do Japão fornecido no clube me poupou semanas de busca. Simplesmente espetacular.",
      rating: 5,
      avatar: "MS"
    },
    {
      name: "Daniel Krug",
      role: "Membro há 1 ano",
      text: "Usar a DIJA AI no planejamento de viagens em família foi um divisor de águas. Ela conseguiu conciliar interesses dos meus filhos pequenos e dos avós em segundos.",
      rating: 5,
      avatar: "DK"
    },
    {
      name: "Beatriz Oliveira",
      role: "Membro há 3 meses",
      text: "Os guias em formato de revista digital são muito práticos. As dicas de restaurantes secretos e atrações fora da rota na Europa valem muito o valor.",
      rating: 5,
      avatar: "BO"
    }
  ];

  const faqs = [
    {
      q: "O que é o Club DIJA?",
      a: "É o clube de membros oficial da plataforma Destinos Incríveis 2.0. Os membros contam com benefícios que facilitam a descoberta de novos locais, planejamento de viagens por IA e fóruns fechados para compartilhar dicas."
    },
    {
      q: "Preciso pagar alguma taxa sobre reservas?",
      a: "Não. Nós não realizamos reservas diretamente e nem cobramos taxas ou comissões. Apresentamos sugestões e links oficiais para que você faça sua própria reserva com total liberdade."
    },
    {
      q: "Como funciona o cancelamento?",
      a: "Você pode cancelar sua assinatura mensal a qualquer momento sem qualquer carência, fidelidade ou taxa de saída. Tudo é feito de forma simples com um clique."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="bg-primary-bg min-h-screen pt-24 text-white">
        {/* Hero Section */}
        <section className="relative py-20 flex flex-col items-center text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-brand-blue/10 blur-[100px]" />
          </div>

          <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col gap-6 items-center">
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-gold/10 border border-brand-gold/20 text-brand-gold backdrop-blur-md">
              <Star size={14} className="fill-brand-gold" />
              <span>Plataforma Premium</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight font-heading leading-tight">
              Eleve sua experiência de <span className="bg-gradient-to-r from-brand-blue to-brand-gold bg-clip-text text-transparent">planejamento</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed">
              Junte-se à maior comunidade de entusiastas de viagens do Brasil. Acesso exclusivo à inteligência artificial, guias editoriais em formato de revista e fóruns.
            </p>
            
            <div className="mt-4">
              <a
                href="#pricing"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-gradient-to-r from-brand-gold to-brand-gold-dark text-primary-bg shadow-[0_4px_14px_rgba(255,193,7,0.3)] hover:scale-105 transition-all"
              >
                Escolher Meu Plano
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-20 border-y border-white/5 bg-primary-bg/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-brand-blue text-xs font-bold uppercase tracking-widest bg-brand-blue/10 px-4 py-1.5 rounded-full">
                Membros VIP
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 font-heading">
                Tudo o que você vai receber
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand-blue/20 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{b.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section id="pricing" className="py-20 relative">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-brand-blue text-xs font-bold uppercase tracking-widest bg-brand-blue/10 px-4 py-1.5 rounded-full">
                Planos Simplificados
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-4 font-heading">
                Invista na sua próxima experiência
              </h2>
              <p className="text-gray-400 mt-2 text-sm">Sem fidelidades e sem burocracia de cancelamento.</p>
            </div>

            {plans.map((plan, index) => (
              <div key={index} className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-tr from-white/[0.02] to-white/[0.06] border border-brand-gold/30 shadow-2xl flex flex-col items-center">
                <div className="absolute -top-3.5 px-4 py-1 rounded-full text-xs font-bold bg-brand-gold text-primary-bg shadow-md">
                  Mais Assinado
                </div>
                
                <span className="text-xl font-bold text-white uppercase tracking-wider">{plan.name}</span>
                <p className="text-sm text-gray-400 mt-2 text-center max-w-sm">{plan.description}</p>

                <div className="my-8 flex items-baseline gap-1">
                  <span className="text-5xl font-black text-white">{plan.price}</span>
                  <span className="text-sm text-gray-400">{plan.period}</span>
                </div>

                <Link
                  href={plan.link}
                  onClick={() => setHasClickedBuy(true)}
                  className="w-full max-w-sm flex items-center justify-center gap-2 py-4 rounded-full text-base font-bold bg-gradient-to-r from-brand-gold to-brand-gold-dark text-primary-bg shadow-lg hover:scale-103 transition-transform"
                >
                  <CreditCard size={18} />
                  Assinar Agora com Segurança
                </Link>

                <div className="mt-8 flex flex-col gap-3 w-full max-w-md text-sm text-gray-300">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <Check className="text-brand-blue flex-shrink-0" size={16} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {hasClickedBuy && (
              <div className="mt-8 p-6 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 text-center max-w-lg mx-auto">
                <h3 className="text-lg font-bold text-white">🎉 Pagamento Iniciado!</h3>
                <p className="text-xs text-gray-300 mt-2">
                  Após finalizar sua inscrição na Kiwify, clique no botão abaixo para ingressar no Fórum VIP.
                </p>
                <a
                  href="https://chat.whatsapp.com/C9l2ljLrOB2EmCZxu1cLEM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold bg-brand-blue text-primary-bg hover:bg-brand-blue/90 transition-colors"
                >
                  <MessageSquare size={14} />
                  Entrar no Grupo VIP
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 border-t border-white/5 bg-primary-bg/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-brand-blue text-xs font-bold uppercase tracking-widest bg-brand-blue/10 px-4 py-1.5 rounded-full">
                Opinião dos Membros
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-4 font-heading">
                Quem faz parte, recomenda
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex gap-1 text-brand-gold mb-3">
                      {[...Array(t.rating)].map((_, r) => (
                        <Star key={r} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-300 italic leading-relaxed">
                      &quot;{t.text}&quot;
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-blue/15 text-brand-blue flex items-center justify-center text-xs font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <strong className="text-sm text-white block">{t.name}</strong>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wide">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 border-t border-white/5 bg-primary-bg/30">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-brand-blue text-xs font-bold uppercase tracking-widest bg-brand-blue/10 px-4 py-1.5 rounded-full">
                Perguntas Frequentes
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-4 font-heading">
                Ficou com alguma dúvida?
              </h2>
            </div>

            <div className="flex flex-col gap-6">
              {faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/[0.01] border border-white/5">
                  <h3 className="text-base font-bold text-white mb-2">{faq.q}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
