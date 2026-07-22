"use client";

import React from 'react';
import Link from 'next/link';
import { Compass, MapPin, Calendar } from 'lucide-react';

const categories = [
  { name: 'Praia', icon: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop', slug: 'praia' },
  { name: 'Natureza', icon: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=400&auto=format&fit=crop', slug: 'natureza' },
  { name: 'Aventura', icon: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=400&auto=format&fit=crop', slug: 'aventura' },
  { name: 'Cultura', icon: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=80&w=400&auto=format&fit=crop', slug: 'cultura' },
  { name: 'Gastronomia', icon: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop', slug: 'gastronomia' },
];

export default function ExplorarPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Explorar Destinos</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Descubra lugares incriveis pelo Brasil.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/explorar?categoria=${cat.slug}`}
            className="group relative overflow-hidden rounded-[16px] aspect-square bg-[var(--bg-surface)]"
          >
            <img src={cat.icon} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <span className="text-sm font-bold text-white">{cat.name}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-[20px] bg-[var(--bg-secondary)] border border-[var(--border-default)] p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <Compass size={20} className="text-[var(--brand-blue)]" />
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Explore por estilo</h3>
        </div>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          Cada destino tem uma historia. Descubra o que o Brasil tem a oferecer para o seu estilo de viagem.
        </p>
        <Link
          href="/explorar"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[var(--brand-blue)] text-white hover:bg-[var(--brand-blue-hover)] transition-all"
        >
          Descobrir destinos
        </Link>
      </div>
    </div>
  );
}
