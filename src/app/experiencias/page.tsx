"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExperienceCard from '@/components/ExperienceCard';
import { Compass, Sparkles } from 'lucide-react';

const ALL_EXPERIENCES = [
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
  {
    title: "Mergulho de Cilindro nos Recifes de Cozumel",
    location: "Cozumel, México",
    duration: "5 dias",
    description: "Explore paredões de corais monumentais e interaja com tartarugas em águas com visibilidade de mais de 30 metros.",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop",
    category: "Praia 🏖",
    matchScore: 94,
  }
];

export default function ExperienciasPage() {
  return (
    <>
      <Navbar />
      <main className="bg-primary-bg min-h-screen pt-28 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Title */}
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-blue/10 border border-brand-blue/20 text-brand-blue backdrop-blur-md">
              <Sparkles size={14} />
              <span>Experiências Conceito</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading">
              Vivências Selecionadas
            </h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Descubra roteiros desenhados por nossa comunidade e inteligência artificial para inspirar sua mente a cruzar novas fronteiras.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {ALL_EXPERIENCES.map((exp, idx) => (
              <ExperienceCard
                key={idx}
                title={exp.title}
                location={exp.location}
                duration={exp.duration}
                description={exp.description}
                imageUrl={exp.imageUrl}
                category={exp.category}
                matchScore={exp.matchScore}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
