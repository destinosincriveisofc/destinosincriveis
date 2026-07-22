"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Star, ArrowRight, Brain, MapPin, Users, Bell, ChevronDown } from 'lucide-react';

export default function ClubPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const benefits = [
    {
      icon: <Brain className="text-[var(--brand-blue)]" size={24} />,
      title: "DIJA AI",
      description: "Sua inteligencia de viagem. Conte o que voce ama. A DIJA cria o roteiro perfeito em segundos.",
      link: "/dija-ai"
    },
    {
      icon: <MapPin className="text-[var(--brand-green)]" size={24} />,
      title: "Experiencias",
      description: "Experiencias que transformam. Cada destino conta uma historia.",
      link: "/experiencias"
    },
    {
      icon: <Users className="text-[var(--brand-blue)]" size={24} />,
      title: "Comunidade",
      description: "Viajantes como voce. Descubra destinos atraves dos olhos de quem ja esteve la.",
      link: "/dashboard/comunidade"
    },
    {
      icon: <Bell className="text-[var(--brand-gold)]" size={24} />,
      title: "Alertas",
      description: "O momento certo, sempre. Enquanto voce planeja, a DIJA monitora a melhor epoca pra voce ir.",
      link: "/dija-ai"
    }
  ];

  const features = [
    "Acesso a comunidade de viajantes",
    "Uso ilimitado do copiloto DIJA AI",
    "Guias editoriais completos",
    "Suporte prioritario"
  ];

  const testimonials = [
    {
      name: "Juliana Costa",
      location: "SP",
      text: "Descobri Minas Gerais de um jeito que jamais imaginei. A DIJA montou um roteiro perfeitamente ajustado ao que eu buscava. Cada parada foi uma surpresa boa.",
      rating: 5,
      initials: "JC"
    },
    {
      name: "Matheus Oliveira",
      location: "RJ",
      text: "O alerta de epoca ideal para Alter do Chao chegou no momento certo. Consegui passagens e hospedagem com meses de antecedencia. Viajei tranquilo e economizei muito.",
      rating: 5,
      initials: "MO"
    },
    {
      name: "Rodrigo Santos",
      location: "BH",
      text: "A curadoria dos guias e impressionante. Sao destinos que fogem do obvio, com dicas que so quem conhece de verdade poderia dar. Virou minha principal fonte de inspiracao.",
      rating: 5,
      initials: "RS"
    }
  ];

  const faqs = [
    {
      q: "O que e o Club DIJA?",
      a: "E o clube de membros da plataforma Destinos Incriveis. Os membros contam com beneficios como inteligencia artificial para planejamento, guias exclusivos e comunidade fechada de viajantes."
    },
    {
      q: "Preciso pagar alguma taxa sobre reservas?",
      a: "Nao. Nos nao realizamos reservas diretamente e nem cobramos taxas. Apresentamos sugestoes e links para que voce faca sua propria reserva com total liberdade."
    },
    {
      q: "Como funciona o cancelamento?",
      a: "Voce pode cancelar sua assinatura mensal a qualquer momento sem custo adicional. Sem fidelidade, sem burocracia."
    }
  ];

  return (
    <>
      <Navbar />
      <main className="bg-[var(--bg-primary)] min-h-screen pt-24">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-premium">
            <div className="max-w-4xl mx-auto text-center flex flex-col gap-6 items-center">
              <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
                Descubra o Brasil que poucos conhecem
              </h1>
              <p className="text-[var(--text-muted)] text-lg md:text-xl max-w-2xl leading-relaxed">
                Experiencias unicas, roteiros inteligentes e uma comunidade inteira explorando o Brasil.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                <Link
                  href="/explorar"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold bg-[var(--brand-gold)] text-white hover:bg-[var(--brand-gold-hover)] transition-all"
                >
                  Explorar o Brasil
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/dija-ai"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] transition-all"
                >
                  Conversar com a DIJA AI
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding bg-[var(--bg-secondary)]">
          <div className="container-premium">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
                Tudo que o Club oferece
              </h2>
              <p className="text-[var(--text-muted)] text-sm md:text-base mt-3">
                Ferramentas, comunidade e inteligencia artificial para voce viajar melhor.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((b, i) => (
                <Link
                  key={i}
                  href={b.link}
                  className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-[20px] p-6 md:p-8 hover:border-[var(--brand-blue)]/30 transition-all hover-lift fade-in-up"
                >
                  <div className="w-12 h-12 rounded-xl bg-[var(--bg-surface)] flex items-center justify-center mb-4">
                    {b.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{b.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{b.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="section-padding">
          <div className="container-premium">
            <div className="max-w-lg mx-auto">
              <div className="text-center max-w-xl mx-auto mb-10">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
                  Um unico plano, simples e completo
                </h2>
                <p className="text-[var(--text-muted)] text-sm md:text-base mt-3">
                  Sem surpresas. Tudo que voce precisa em uma unica assinatura.
                </p>
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-[20px] p-6 md:p-8 flex flex-col items-center text-center">
                <span className="text-xl font-bold text-[var(--text-primary)]">Membro Fundador</span>
                <p className="text-sm text-[var(--text-muted)] mt-2 max-w-sm">
                  Acesso completo a plataforma, inteligencia artificial e comunidade.
                </p>
                <div className="my-6 flex items-baseline gap-1">
                  <span className="text-5xl font-black text-[var(--text-primary)]">R$ 9,90</span>
                  <span className="text-sm text-[var(--text-muted)]">/mes</span>
                </div>
                <Link
                  href="/checkout"
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold bg-[var(--brand-gold)] text-white hover:bg-[var(--brand-gold-hover)] transition-all"
                >
                  Comecar agora
                  <ArrowRight size={18} />
                </Link>
                <div className="mt-6 flex flex-col gap-3 w-full text-sm text-[var(--text-secondary)]">
                  {features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3">
                      <Check className="text-[var(--brand-green)] flex-shrink-0" size={16} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-center text-xs text-[var(--text-muted)] mt-4">
                Cancela quando quiser. Sem fidelidade.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding bg-[var(--bg-secondary)]">
          <div className="container-premium">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
                Quem experimenta, recomenda
              </h2>
              <p className="text-[var(--text-muted)] text-sm md:text-base mt-3">
                Veja o que os membros estao dizendo.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-[20px] p-6 md:p-8 flex flex-col justify-between gap-6 fade-in-up">
                  <div>
                    <div className="flex gap-1 text-[var(--brand-gold)] mb-4">
                      {[...Array(t.rating)].map((_, r) => (
                        <Star key={r} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed">
                      &quot;{t.text}&quot;
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--brand-blue-light)] text-[var(--brand-blue)] flex items-center justify-center text-sm font-bold">
                      {t.initials}
                    </div>
                    <div>
                      <strong className="text-sm text-[var(--text-primary)] block">{t.name}</strong>
                      <span className="text-xs text-[var(--text-muted)]">{t.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding">
          <div className="container-premium">
            <div className="max-w-3xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
                  Perguntas frequentes
                </h2>
              </div>
              <div className="flex flex-col gap-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-[20px] overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <h3 className="text-base font-bold text-[var(--text-primary)]">{faq.q}</h3>
                      <ChevronDown
                        size={18}
                        className={`text-[var(--text-muted)] transition-transform flex-shrink-0 ${
                          openFaq === i ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openFaq === i ? 'max-h-96 pb-6 px-6' : 'max-h-0'
                      }`}
                    >
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section-padding bg-[var(--brand-blue-light)]">
          <div className="container-premium">
            <div className="max-w-2xl mx-auto text-center flex flex-col gap-6 items-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
                O Brasil inteiro esperando sua proxima historia.
              </h2>
              <Link
                href="/explorar"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold bg-[var(--brand-gold)] text-white hover:bg-[var(--brand-gold-hover)] transition-all"
              >
                Comecar sua jornada
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
