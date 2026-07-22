import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import ExploreSection from '@/sections/ExploreSection';
import FeaturedDestinations from '@/sections/FeaturedDestinations';
import AISection from '@/sections/AISection';
import GuidesSection from '@/sections/GuidesSection';
import ClubSection from '@/sections/ClubSection';

export const metadata: Metadata = {
  title: 'Destinos Incríveis 2.0 | Copiloto Inteligente de Viagens',
  description: 'O copiloto inteligente para descobrir, planejar e viver viagens incríveis. Conheça roteiros curados por tecnologia e nossa inteligência artificial DIJA AI.',
  openGraph: {
    title: 'Destinos Incríveis 2.0 | Copiloto Inteligente de Viagens',
    description: 'O copiloto inteligente para descobrir, planejar e viver viagens incríveis. Conheça roteiros curados por tecnologia e nossa inteligência artificial DIJA AI.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Destinos Incríveis',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Destinos Incríveis 2.0',
    description: 'Descubra seu próximo destino com o auxílio da inteligência artificial DIJA AI.',
    images: ['/og-image.png'],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Destinos Incríveis",
    "url": "https://destinosincriveis.com.br",
    "description": "O copiloto inteligente para descobrir, planejar e viver viagens incríveis. Conheça roteiros curados por tecnologia e nossa inteligência artificial DIJA AI.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://destinosincriveis.com.br/explorar?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Premium Header/Navigation */}
      <Navbar />

      <main className="bg-primary-bg min-h-screen text-white">
        {/* 1. Cinematic Hero Section */}
        <HeroSection />

        {/* 2. Categorized Descovery area */}
        <ExploreSection />

        {/* 3. Streaming/Netflix Curated Experiences */}
        <FeaturedDestinations />

        {/* 4. AI Copilot Simulation Presentation */}
        <AISection />

        {/* 5. Editorial guides (Travel Magazine) */}
        <GuidesSection />

        {/* 6. VIP Membership Community Space */}
        <ClubSection />
      </main>

      {/* Premium Footer */}
      <Footer />
    </>
  );
}
