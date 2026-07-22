"use client";

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import ExperienceCard from '@/components/ExperienceCard';

const CURATED_EXPERIENCES = [
  {
    title: "Cultura milenar e tecnologia no Japão",
    location: "Tóquio & Quioto, Japão",
    duration: "14 dias",
    description: "Explore templos antigos sob as cerejeiras e mergulhe em centros de inovação tecnológica de última geração.",
    imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=800&auto=format&fit=crop",
    category: "Futurismo 🧠",
    matchScore: 99,
  },
  {
    title: "Expedição Glaciares e Lagos da Patagônia",
    location: "El Calafate, Argentina",
    duration: "8 dias",
    description: "Caminhe sobre o lendário Glaciar Perito Moreno e contemple picos andinos refletidos em lagoas azuis profundas.",
    imageUrl: "https://images.unsplash.com/photo-1473163928189-364b2c4e1135?q=80&w=800&auto=format&fit=crop",
    category: "Aventura 🏔",
    matchScore: 97,
  },
  {
    title: "Aurora Boreal e Termas de Gelo na Islândia",
    location: "Reykjavík, Islândia",
    duration: "7 dias",
    description: "Relaxe em piscinas termais vulcânicas sob o espetáculo de luzes celestes da Aurora Boreal no círculo polar.",
    imageUrl: "https://images.unsplash.com/photo-1483168527879-c66136b56105?q=80&w=800&auto=format&fit=crop",
    category: "Exclusivo 🌌",
    matchScore: 98,
  },
  {
    title: "Navegação na Costa Amalfitana",
    location: "Positano, Itália",
    duration: "6 dias",
    description: "Navegue ao longo de vilas coloridas cravadas em desfiladeiros sobre a água cintilante do Mar Tirreno.",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
    category: "Romance ❤️",
    matchScore: 96,
  },
  {
    title: "Safári Fotográfico nas Planícies do Serengeti",
    location: "Serengeti, Tanzânia",
    duration: "9 dias",
    description: "Presencie a Grande Migração e encontre os cinco grandes mamíferos da savana africana de perto.",
    imageUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
    category: "Natureza 🦁",
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
    <section className="py-20 bg-primary-bg/70 border-y border-white/5 relative" id="destinos-destaque">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-brand-blue text-xs font-bold uppercase tracking-widest bg-brand-blue/10 px-4 py-1.5 rounded-full">
              Destaques Editoriais
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 font-heading">
              Experiências que marcam vidas
            </h2>
            <p className="text-gray-400 mt-2 text-sm max-w-lg">
              Seleções no estilo de catálogo por streaming. Arraste para o lado para explorar experiências curadas de alto impacto.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-11 h-11 rounded-full border border-white/10 hover:border-brand-blue hover:text-brand-blue flex items-center justify-center text-white transition-all bg-white/[0.02]"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-11 h-11 rounded-full border border-white/10 hover:border-brand-blue hover:text-brand-blue flex items-center justify-center text-white transition-all bg-white/[0.02]"
              aria-label="Próximo"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-white/10 scroll-smooth"
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
