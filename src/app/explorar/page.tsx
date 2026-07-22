"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DestinationCard from '@/components/DestinationCard';
import { Search, Compass, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_DESTINATIONS = [
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
  {
    name: "Islândia",
    description: "Cenários de outro planeta com cachoeiras congeladas, praias de areia preta, vulcões ativos e a indescritível aurora boreal.",
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop",
    bestSeason: "Setembro a Março",
    profile: "Fotógrafos e Aventureiros",
    experienceType: "Aventura 🏔",
    category: "adventure",
  },
  {
    name: "Costa Amalfitana",
    description: "Pequenas vilas verticais coloridas debruçadas sobre penhascos e banhadas pela água turquesa do mediterrâneo italiano.",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=800&auto=format&fit=crop",
    bestSeason: "Maio a Setembro",
    profile: "Casais e Exploradores",
    experienceType: "Romance ❤️",
    category: "romance",
  },
];

export default function ExplorarPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filtered = ALL_DESTINATIONS.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCat === 'all' || d.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <>
      <Navbar />
      <main className="bg-primary-bg min-h-screen pt-28 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Title */}
          <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center gap-4">
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-blue/10 border border-brand-blue/20 text-brand-blue backdrop-blur-md">
              <Compass size={14} />
              <span>Explorador de Experiências</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading">
              Descubra seu próximo destino
            </h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Explore o mapa de possibilidades. Filtre por palavra-chave ou categorias de viagem para encontrar vivências sob medida.
            </p>
          </div>

          {/* Search bar */}
          <div className="max-w-xl mx-auto mb-10 relative">
            <Search className="absolute left-4 top-3.5 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Digite um destino ou atração (ex: Noronha, Glaciar, Paris...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm placeholder-gray-500 focus:outline-none focus:border-brand-blue transition-colors text-white"
            />
          </div>

          {/* Categories select */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-12">
            {[
              { id: 'all', label: 'Todos os Destinos' },
              { id: 'beach', label: 'Praias 🏖' },
              { id: 'adventure', label: 'Aventuras 🏔' },
              { id: 'romance', label: 'Romance ❤️' },
              { id: 'family', label: 'Família 👨‍👩‍👧' },
              { id: 'international', label: 'Internacional 🌎' },
              { id: 'budget', label: 'Econômico 🎒' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold border transition-all ${
                  selectedCat === cat.id
                    ? 'bg-brand-blue border-brand-blue text-primary-bg shadow-md'
                    : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Results grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((dest) => (
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

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-500 flex flex-col items-center gap-2">
              <span className="text-3xl">🏜️</span>
              <p className="text-sm font-medium">Nenhum destino correspondente aos filtros foi encontrado.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCat('all'); }}
                className="text-xs text-brand-blue hover:underline mt-2 font-semibold"
              >
                Limpar filtros de pesquisa
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
