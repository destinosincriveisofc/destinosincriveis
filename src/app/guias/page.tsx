"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GuideCard from '@/components/GuideCard';
import { BookOpen } from 'lucide-react';

const ALL_GUIDES = [
  {
    title: "Como planejar sua primeira viagem ao Japão sem saber japonês",
    description: "Um guia de sobrevivência completo cobrindo aplicativos indispensáveis, funcionamento do JR Pass, etiqueta cultural básica e dicas para navegar no metrô de Tóquio.",
    category: "Guias de viagem 📚",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop",
    date: "18 Jul 2026",
    readTime: "8 min",
    slug: "primeira-viagem-ao-japao",
    tag: "guias",
  },
  {
    title: "Mochilão na América do Sul: roteiros econômicos incríveis",
    description: "Descubra como cruzar as fronteiras da Bolívia, Peru e Chile aproveitando transporte terrestre local, hospedagens comunitárias e refeições tradicionais a preços baixíssimos.",
    category: "Dicas de Economia 🎒",
    imageUrl: "https://images.unsplash.com/photo-1530731141654-59610f3b4814?q=80&w=600&auto=format&fit=crop",
    date: "14 Jul 2026",
    readTime: "6 min",
    slug: "mochilao-america-do-sul-economico",
    tag: "dicas",
  },
  {
    title: "O guia definitivo para fotografar e ver a Aurora Boreal",
    description: "Saiba quais são as melhores coordenadas na Escandinávia e Canadá, aplicativos de monitoramento solar e configurações recomendadas para câmera do celular e profissional.",
    category: "Experiências 🌌",
    imageUrl: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=600&auto=format&fit=crop",
    date: "09 Jul 2026",
    readTime: "10 min",
    slug: "guia-aurora-boreal-fotografia",
    tag: "experiencias",
  },
  {
    title: "Os 5 restaurantes mais secretos e incríveis de Roma",
    description: "Nossa curadoria gastronômica de tratorias escondidas no charmoso bairro de Trastevere que não cobram preços abusivos de turistas e servem massas artesanais perfeitas.",
    category: "Lugares Incríveis 🍝",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop",
    date: "04 Jul 2026",
    readTime: "5 min",
    slug: "restaurantes-secretos-roma",
    tag: "lugares",
  },
  {
    title: "Como tirar o visto americano passo a passo sem despachante",
    description: "Preenchimento detalhado do formulário DS-160, agendamento de biometria e entrevista, taxa consular e o checklist final de documentos indispensáveis para o sucesso.",
    category: "Guias de viagem 📚",
    imageUrl: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=600&auto=format&fit=crop",
    date: "29 Jun 2026",
    readTime: "12 min",
    slug: "visto-americano-sem-despachante",
    tag: "guias",
  },
  {
    title: "Curiosidades sobre o trem de alta velocidade shinkansen",
    description: "Descubra os mistérios tecnológicos que fazem dos trens bala japoneses os mais pontuais e seguros do mundo, resistindo até a fortes terremotos e intempéries.",
    category: "Curiosidades 🚄",
    imageUrl: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=600&auto=format&fit=crop",
    date: "25 Jun 2026",
    readTime: "7 min",
    slug: "curiosidades-shinkansen-japao",
    tag: "curiosidades",
  }
];

export default function GuiasPage() {
  const [selectedTag, setSelectedTag] = useState('all');

  const filtered = selectedTag === 'all'
    ? ALL_GUIDES
    : ALL_GUIDES.filter((g) => g.tag === selectedTag);

  return (
    <>
      <Navbar />
      <main className="bg-primary-bg min-h-screen pt-28 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Title */}
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-blue/10 border border-brand-blue/20 text-brand-blue backdrop-blur-md">
              <BookOpen size={14} />
              <span>Revista Editorial Digital</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading">
              Biblioteca de Guias & Dicas
            </h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Conteúdo aprofundado, livre de publicidade agressiva, feito por viajantes profissionais para elevar seu conhecimento turístico.
            </p>
          </div>

          {/* Tag filters */}
          <div className="flex flex-wrap gap-2.5 justify-center mb-12">
            {[
              { id: 'all', label: 'Tudo' },
              { id: 'guias', label: 'Guias de Viagem' },
              { id: 'dicas', label: 'Dicas Práticas' },
              { id: 'curiosidades', label: 'Curiosidades' },
              { id: 'experiencias', label: 'Experiências' },
              { id: 'lugares', label: 'Lugares Incríveis' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTag(t.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold border transition-all ${
                  selectedTag === t.id
                    ? 'bg-brand-blue border-brand-blue text-primary-bg'
                    : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Magazine Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((guide, idx) => (
              <GuideCard
                key={idx}
                title={guide.title}
                description={guide.description}
                category={guide.category}
                imageUrl={guide.imageUrl}
                date={guide.date}
                readTime={guide.readTime}
                slug={guide.slug}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
