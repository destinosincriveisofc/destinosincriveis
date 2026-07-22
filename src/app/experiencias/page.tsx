"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExperienceCard from '@/components/ExperienceCard';
import { Compass } from 'lucide-react';

const ALL_EXPERIENCES = [
  {
    title: "Chapada dos Veadeiros",
    location: "Goias",
    duration: "6 dias",
    description: "Travessia de 3 dias pelo Cerrado com cachoeiras, canyons e paisagens que parecem de outro planeta.",
    imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop",
    category: "Natureza",
    matchScore: 98,
  },
  {
    title: "Lencois Maranhenses",
    location: "Maranhao",
    duration: "5 dias",
    description: "Explore o maior deserto de aguas cristalinas do Brasil em uma expedicao inesquecivel.",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800&auto=format&fit=crop",
    category: "Aventura",
    matchScore: 97,
  },
  {
    title: "Caminho da Costa Verde",
    location: "Rio de Janeiro / Sao Paulo",
    duration: "7 dias",
    description: "Trekking pela Mata Atlantica entre praias selvagens e vilas cairacas historicas.",
    imageUrl: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?q=80&w=800&auto=format&fit=crop",
    category: "Aventura",
    matchScore: 96,
  },
  {
    title: "Fernando de Noronha",
    location: "Pernambuco",
    duration: "5 dias",
    description: "Mergulhe em aguas cristalinas e conviva com a natureza preservada do arquipelago.",
    imageUrl: "https://images.unsplash.com/photo-1509225770129-c9b4e8e28c3e?q=80&w=800&auto=format&fit=crop",
    category: "Praia",
    matchScore: 99,
  },
  {
    title: "Jalapao",
    location: "Tocantins",
    duration: "6 dias",
    description: "Aventura nas maiores dunas e fervedouros do Brasil. Um paraiso escondido no Cerrado.",
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop",
    category: "Aventura",
    matchScore: 95,
  },
  {
    title: "Serra do Cipo",
    location: "Minas Gerais",
    duration: "4 dias",
    description: "Trekking entre cachoeiras e formacoes rochosas unicas na regiao central de Minas Gerais.",
    imageUrl: "https://images.unsplash.com/photo-1518495971274-2f4f5f5b5f5b?q=80&w=800&auto=format&fit=crop",
    category: "Natureza",
    matchScore: 94,
  },
];

export default function ExperienciasPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[var(--bg-primary)] min-h-screen pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[var(--brand-blue-light)] text-[var(--brand-blue)] border border-[var(--brand-blue)]/20">
              <Compass size={14} />
              <span>Experiencias</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
              Vivencias selecionadas para voce
            </h1>
            <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed">
              Cada experiencia e curada para proporcionar momentos unicos pelo Brasil.
            </p>
          </div>

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
