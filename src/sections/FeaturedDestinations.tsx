"use client";

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ExperienceCard from '@/components/ExperienceCard';

const CURATED_EXPERIENCES = [
  {
    title: "Flutuação na Nascente do Rio Sucuri",
    location: "Bonito, Mato Grosso do Sul",
    duration: "1 dia",
    description: "Flutue em um dos rios de águas mais transparentes do planeta, cercado por peixes tropicais e mata ciliar intocada.",
    imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=800&auto=format&fit=crop",
    category: "Natureza 💧",
    matchScore: 99,
  },
  {
    title: "Amanhecer no Mirante do Vale do Pati",
    location: "Chapada Diamantina, Bahia",
    duration: "4 dias",
    description: "Contemple o nascer do sol sobre as muralhas rochosas de um dos vales mais isolados e imponentes da América do Sul.",
    imageUrl: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?q=80&w=800&auto=format&fit=crop",
    category: "Aventura ⛰",
    matchScore: 98,
  },
  {
    title: "Kayak no Arquipélago de Anavilhanas",
    location: "Novo Airão, Amazonas",
    duration: "5 dias",
    description: "Navegue de kayak pelas águas escuras do segundo maior arquipélago fluvial do mundo, observando botos e a floresta amazônica.",
    imageUrl: "https://images.unsplash.com/photo-1483168527879-c66136b56105?q=80&w=800&auto=format&fit=crop",
    category: "Ecoturismo 🌳",
    matchScore: 97,
  },
  {
    title: "Rota das Queijarias na Serra da Canastra",
    location: "São Roque de Minas, Minas Gerais",
    duration: "3 dias",
    description: "Explore as fazendas produtoras de queijo artesanal de casca amarela nas colinas verdejantes mineiras, vivenciando a cultura local.",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
    category: "Cultura 🧀",
    matchScore: 96,
  },
  {
    title: "Caminhada nos Glaciares da Patagônia",
    location: "El Calafate, Argentina",
    duration: "8 dias",
    description: "Caminhe sobre o gelo milenar no Glaciar Perito Moreno como destino internacional secundário.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
    category: "Mundo 🏔",
    matchScore: 95,
  },
];

export default function FeaturedDestinations() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - 400 : scrollLeft + 400;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-[var(--bg-primary)]/70 border-y border-[var(--border-default)] relative" id="destinos-destaque">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-[var(--brand-blue)] text-xs font-bold uppercase tracking-widest bg-[var(--brand-blue-light)] px-4 py-1.5 rounded-full border border-[var(--border-default)]">
              Curadoria de Experiências
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mt-4 font-heading tracking-tight">
              Histórias que marcam vidas no Brasil
            </h2>
            <p className="text-[var(--text-muted)] mt-2 text-sm max-w-lg leading-relaxed">
              Arraste para o lado para explorar catálogos de expedições imersivas e roteiros focados na natureza brasileira.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full border border-[var(--border-default)] hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] flex items-center justify-center text-[var(--text-secondary)] transition-all bg-[var(--bg-secondary)] hover:bg-[var(--brand-blue-light)]"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full border border-[var(--border-default)] hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)] flex items-center justify-center text-[var(--text-secondary)] transition-all bg-[var(--bg-secondary)] hover:bg-[var(--brand-blue-light)]"
              aria-label="Próximo"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scroll-smooth"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {CURATED_EXPERIENCES.map((exp, idx) => (
            <div key={idx} style={{ scrollSnapAlign: 'start' }}>
              <ExperienceCard
                title={exp.title}
                location={exp.location}
                duration={exp.duration}
                description={exp.description}
                imageUrl={exp.imageUrl}
                category={exp.category}
                matchScore={exp.matchScore}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
