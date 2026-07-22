import React from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import BrasilEmNumeros from '@/sections/BrasilEmNumeros';
import FeaturedDestinations from '@/sections/FeaturedDestinations';
import AISection from '@/sections/AISection';
import ComunidadeSection from '@/sections/ComunidadeSection';
import ExploreSection from '@/sections/ExploreSection';
import Depoimentos from '@/sections/Depoimentos';
import ClubSection from '@/sections/ClubSection';
import CTA_Final from '@/sections/CTA_Final';
import PricingSection from '@/sections/PricingSection';

export const metadata: Metadata = {
  title: 'Destinos Incríveis | Descubra o Brasil que poucos conhecem',
  description: 'Experiências únicas, roteiros inteligentes e uma comunidade inteira explorando o Brasil. Descubra seu próximo destino com a DIJA AI.',
  openGraph: {
    title: 'Destinos Incríveis | Descubra o Brasil que poucos conhecem',
    description: 'Experiências únicas, roteiros inteligentes e uma comunidade inteira explorando o Brasil.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Destinos Incríveis',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Destinos Incríveis',
    description: 'Descubra o Brasil que poucos conhecem.',
    images: ['/og-image.png'],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Destinos Incríveis",
    "url": "https://destinosincriveis.com.br",
    "description": "A plataforma brasileira para descobrir, planejar e viver experiências de viagem autênticas pelo Brasil.",
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
      <Navbar />

      <main className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-secondary)]">
        <HeroSection />
        <BrasilEmNumeros />
        <FeaturedDestinations />
        <AISection />
        <ComunidadeSection />
        <ExploreSection />
        <Depoimentos />
        <PricingSection />
        <ClubSection />
        <CTA_Final />
      </main>

      <Footer />
    </>
  );
}
