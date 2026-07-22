"use client";

import React, { useState } from 'react';
import { Compass, Palmtree, Mountain, Heart, Users, Globe2, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DestinationCard from '@/components/DestinationCard';

const CATEGORIES = [
  { id: 'all', label: 'Todos', icon: Compass },
  { id: 'beach', label: 'Praias', icon: Palmtree },
  { id: 'adventure', label: 'Aventuras', icon: Mountain },
  { id: 'romance', label: 'Romance', icon: Heart },
  { id: 'family', label: 'Família', icon: Users },
  { id: 'international', label: 'Internacional', icon: Globe2 },
  { id: 'budget', label: 'Econômico', icon: Wallet },
];

const DESTINATIONS = [
  {
    name: "Fernando de Noronha",
    description: "Praias paradisíacas de águas cristalinas, vida marinha rica e preservação ambiental intocada no nordeste brasileiro.",
    imageUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=800&auto=format&fit=crop",
    bestSeason: "Setembro a Dezembro",
    profile: "Casais e Aventureiros",
    experienceType: "Praia 🏖",
    category: "beach",
  },
  {
    name: "Patagônia Argentina",
    description: "Glaciares gigantescos, picos nevados imponentes e trilhas lendárias no fim do mundo para os amantes do trekking.",
    imageUrl: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800&auto=format&fit=crop",
    bestSeason: "Novembro a Março",
    profile: "Aventureiros e Casais",
    experienceType: "Aventura 🏔",
    category: "adventure",
  },
  {
    name: "Paris",
    description: "A capital da arte, gastronomia requintada, arquitetura histórica e ruelas românticas iluminadas à beira do Sena.",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    bestSeason: "Abril a Junho",
    profile: "Casais e Famílias",
    experienceType: "Romance ❤️",
    category: "romance",
  },
  {
    name: "Orlando",
    description: "Parques temáticos lendários, diversão sem fim, compras e resorts espetaculares projetados para todas as idades.",
    imageUrl: "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=800&auto=format&fit=crop",
    bestSeason: "Janeiro a Março",
    profile: "Família e Jovens",
    experienceType: "Família 👨‍👩‍👧",
    category: "family",
  },
  {
    name: "Tóquio",
    description: "A fusão perfeita entre templos milenares e arranha-céus futuristas carregados de tecnologia e cultura pop.",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop",
    bestSeason: "Outubro a Novembro",
    profile: "Tecnológicos e Culturais",
    experienceType: "Internacional 🌎",
    category: "international",
  },
  {
    name: "Salar de Uyuni",
    description: "O maior deserto de sal do planeta, criando um reflexo perfeito do céu e proporcionando paisagens surreais de baixo custo.",
    imageUrl: "https://images.unsplash.com/photo-1463130456064-07386d8376e1?q=80&w=800&auto=format&fit=crop",
    bestSeason: "Maio a Outubro",
    profile: "Exploradores e Mochileiros",
    experienceType: "Econômico 🎒",
    category: "budget",
  },
];

export default function ExploreSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDestinations = selectedCategory === 'all'
    ? DESTINATIONS
    : DESTINATIONS.filter(d => d.category === selectedCategory);

  return (
    <section className="py-20 bg-primary-bg relative" id="explorar-destinos">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-blue text-xs font-bold uppercase tracking-widest bg-brand-blue/10 px-4 py-1.5 rounded-full">
            Descobrir Destinos
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 font-heading">
            Escolha sua próxima vivência
          </h2>
          <p className="text-gray-400 mt-3 text-sm md:text-base">
            Selecione uma categoria para filtrar destinos curados especialmente por especialistas focados em tecnologia e exclusividade.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto pb-4 mb-12 gap-3 justify-start md:justify-center scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
                  isSelected
                    ? 'bg-brand-blue text-primary-bg border-brand-blue shadow-[0_4px_14px_rgba(56,189,248,0.25)]'
                    : 'bg-white/5 text-gray-300 border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={16} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid of Destinations */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((dest) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={dest.name}
              >
                <DestinationCard
                  name={dest.name}
                  description={dest.description}
                  imageUrl={dest.imageUrl}
                  bestSeason={dest.bestSeason}
                  profile={dest.profile}
                  experienceType={dest.experienceType}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
