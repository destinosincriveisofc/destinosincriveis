"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import GuideCard from '@/components/GuideCard';

const RECENT_GUIDES = [
  {
    title: "Como planejar sua primeira viagem ao Japão sem saber japonês",
    description: "Um guia de sobrevivência completo cobrindo aplicativos indispensáveis, funcionamento do JR Pass, etiqueta cultural básica e dicas para navegar no metrô de Tóquio.",
    category: "Guias de viagem 📚",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop",
    date: "18 Jul 2026",
    readTime: "8 min",
    slug: "primeira-viagem-ao-japao",
  },
  {
    title: "Mochilão na América do Sul: roteiros econômicos incríveis",
    description: "Descubra como cruzar as fronteiras da Bolívia, Peru e Chile aproveitando transporte terrestre local, hospedagens comunitárias e refeições tradicionais a preços baixíssimos.",
    category: "Dicas de Economia 🎒",
    imageUrl: "https://images.unsplash.com/photo-1530731141654-59610f3b4814?q=80&w=600&auto=format&fit=crop",
    date: "14 Jul 2026",
    readTime: "6 min",
    slug: "mochilao-america-do-sul-economico",
  },
  {
    title: "O guia definitivo para fotografar e ver a Aurora Boreal",
    description: "Saiba quais são as melhores coordenadas na Escandinávia e Canadá, aplicativos de monitoramento solar e configurações recomendadas para câmera do celular e profissional.",
    category: "Experiências 🌌",
    imageUrl: "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=600&auto=format&fit=crop",
    date: "09 Jul 2026",
    readTime: "10 min",
    slug: "guia-aurora-boreal-fotografia",
  },
];

export default function GuidesSection() {
  return (
    <section className="py-24 bg-primary-bg relative" id="guias-conteudos">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-brand-blue text-xs font-bold uppercase tracking-widest bg-brand-blue/10 px-4 py-1.5 rounded-full">
              Revista Digital
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 font-heading">
              Guias e Conteúdos Premium
            </h2>
            <p className="text-gray-400 mt-2 text-sm md:text-base max-w-lg">
              Substituímos ofertas passageiras por informações ricas, dicas de especialistas e curadorias aprofundadas.
            </p>
          </div>

          <Link
            href="/guias"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-gold transition-colors duration-300 whitespace-nowrap self-start md:self-end"
          >
            Acessar revista completa
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RECENT_GUIDES.map((guide, idx) => (
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
    </section>
  );
}
