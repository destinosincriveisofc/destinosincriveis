"use client";

import React, { useState } from 'react';
import { Compass, Palmtree, Mountain, Heart, Coffee, Globe2, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DestinationCard from '@/components/DestinationCard';

const CATEGORIES = [
  { id: 'all', label: 'Todos', icon: Compass },
  { id: 'beach', label: 'Praias & Rios', icon: Palmtree },
  { id: 'adventure', label: 'Aventuras', icon: Mountain },
  { id: 'romance', label: 'Romance', icon: Heart },
  { id: 'culture', label: 'Cultura & Sabores', icon: Coffee },
  { id: 'international', label: 'Mundo (10%)', icon: Globe2 },
  { id: 'budget', label: 'Econômico', icon: Wallet },
];

const DESTINATIONS = [
  {
    name: "Lençóis Maranhenses, MA",
    description: "Um deserto de dunas brancas preenchido por milhares de lagoas de água doce azul-turquesa na transição para a Amazônia.",
    imageUrl: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=800&auto=format&fit=crop",
    bestSeason: "Junho a Setembro",
    profile: "Aventureiros e Fotógrafos",
    experienceType: "Natureza 🏜",
    category: "beach",
  },
  {
    name: "Jalapão, TO",
    description: "Fervedouros de águas termais onde é impossível afundar, canyons de arenito, dunas douradas e cachoeiras exuberantes no coração do cerrado.",
    imageUrl: "https://images.unsplash.com/photo-1463130456064-07386d8376e1?q=80&w=800&auto=format&fit=crop",
    bestSeason: "Maio a Setembro",
    profile: "Aventureiros e Exploradores",
    experienceType: "Aventura 🏕",
    category: "adventure",
  },
  {
    name: "Alter do Chão, PA",
    description: "O 'Caribe da Amazônia'. Praias fluviais de areia branca banhadas pelas águas mornas e esmeraldas do Rio Tapajós.",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    bestSeason: "Agosto a Dezembro",
    profile: "Casais e Exploradores",
    experienceType: "Romance 🏖",
    category: "romance",
  },
  {
    name: "Serra da Canastra, MG",
    description: "Berço do Rio São Francisco, lar do lobo-guará e famosa pela rota de fazendas de queijo artesanal de casca amarela.",
    imageUrl: "https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=800&auto=format&fit=crop",
    bestSeason: "Abril a Outubro",
    profile: "Gastronomia e Casais",
    experienceType: "Cultura 🧀",
    category: "culture",
  },
  {
    name: "Chapada Diamantina, BA",
    description: "Poços subterrâneos de águas azuis iluminados por frestas de sol, grutas misteriosas e a imponente Cachoeira da Fumaça.",
    imageUrl: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800&auto=format&fit=crop",
    bestSeason: "Todo o ano",
    profile: "Mochileiros e Aventureiros",
    experienceType: "Econômico ⛰",
    category: "budget",
  },
  {
    name: "Patagônia Argentina",
    description: "Glaciares gigantescos, picos nevados imponentes e trilhas lendárias no fim do mundo como destino internacional secundário.",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop",
    bestSeason: "Novembro a Março",
    profile: "Aventureiros e Casais",
    experienceType: "Mundo 🏔",
    category: "international",
  },
];

export default function ExploreSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDestinations = selectedCategory === 'all'
    ? DESTINATIONS
    : DESTINATIONS.filter(d => d.category === selectedCategory);

  return (
    <section className="py-20 bg-[var(--bg-primary)] relative" id="explorar-destinos">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[var(--brand-blue)] text-xs font-bold uppercase tracking-widest bg-[var(--brand-blue-light)] px-4 py-1.5 rounded-full border border-[var(--border-default)]">
            Descobrir o Brasil
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] mt-4 font-heading tracking-tight">
            Escolha sua próxima vivência nacional
          </h2>
          <p className="text-[var(--text-muted)] mt-3 text-sm md:text-base leading-relaxed">
            Selecione uma categoria para filtrar destinos curados pelo nosso copiloto, valorizando a natureza e a cultura rica do país.
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
                    ? 'bg-[var(--brand-blue)] text-white border-[var(--brand-blue)] shadow-[var(--shadow-card)]'
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border-[var(--border-default)] hover:bg-[var(--brand-blue-light)] hover:text-[var(--brand-blue)]'
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
