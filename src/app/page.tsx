import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Star, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CLUB DIJA | Destinos Incríveis - Clube de Viagens Inteligente',
  description: 'Economize até 60% em passagens aéreas e hotéis. Receba alertas de erros tarifários em tempo real no seu WhatsApp.',
  openGraph: {
    title: 'CLUB DIJA | Destinos Incríveis - Clube de Viagens Inteligente',
    description: 'Economize até 60% em passagens aéreas e hotéis. Receba alertas de erros tarifários em tempo real no seu WhatsApp.',
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Destinos Incríveis',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CLUB DIJA | Destinos Incríveis',
    description: 'Economize até 60% em passagens aéreas e hotéis. Alertas de erros tarifários no WhatsApp.',
    images: ['/og-image.png'],
  },
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import TravelSearchWidget from '@/components/TravelSearchWidget';
import FeedCard from '@/components/FeedCard';
import { fetchCheapFlights } from '@/lib/travelpayouts';
import styles from './page.module.css';

const FALLBACK_BLOG = [
  {
    id: "1", title: "Como acumular 100 mil milhas em 3 meses sem gastar mais",
    description: "Descubra as principais estratégias de acúmulo orgânico através de compras bonificadas e escolha certa dos cartões de crédito.",
    category: "Milhas", imageUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop",
    date: "10 Jul 2026", slug: "como-acumular-milhas-rapido"
  },
  {
    id: "2", title: "10 destinos internacionais baratos para viajar ainda este ano",
    description: "Fizemos o levantamento dos países onde o Real é valorizado e o custo de hospedagem é extremamente atrativo para brasileiros.",
    category: "Destinos", imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
    date: "08 Jul 2026", slug: "destinos-internacionais-baratos"
  },
  {
    id: "3", title: "O que é e como aproveitar um Erro Tarifário de passagem aérea",
    description: "Entenda a diferença entre promoção comum e bugs no sistema das companhias aéreas, e saiba quais são as regras de emissão.",
    category: "Economize", imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop",
    date: "05 Jul 2026", slug: "erro-tarifario-guia-completo"
  }
];

function calcDiscount(original: number, current: number): number {
  if (!original || original <= current) return 0;
  return Math.round((1 - current / original) * 100);
}

export default async function Home() {
  const cheapFlights = await fetchCheapFlights();
  const displayOffers = cheapFlights.slice(0, 6);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <HeroSection />
        <StatsSection />

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.badge}>Busca Inteligente</span>
              <h2 className={styles.sectionTitle}>Encontre sua próxima viagem</h2>
              <p className={styles.sectionDesc}>
                Pesquise voos e hotéis com as melhores tarifas do mercado.
              </p>
            </div>
            <TravelSearchWidget />
          </div>
        </section>

        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <div className={styles.headerRow}>
              <div>
                <span className={styles.badge}>Ofertas Ativas</span>
                <h2 className={styles.sectionTitle}>Promoções imperdíveis</h2>
                <p className={styles.sectionDesc}>
                  Passagens encontradas com os menores preços das últimas horas.
                </p>
              </div>
              <Link href="/ofertas" className={styles.linkAll}>
                Ver todas <ArrowRight size={14} />
              </Link>
            </div>
            <div className={styles.grid3}>
              {displayOffers.map((offer) => (
                <FeedCard
                  key={offer.id}
                  variant="offer"
                  title={offer.airline}
                  description={`${offer.originName} → ${offer.destinationName}`}
                  imageUrl={offer.imagem_url}
                  actionHref={offer.link_afiliado || offer.link}
                  actionLabel="Ver oferta"
                  offer={{
                    price: offer.price,
                    originalPrice: offer.originalPrice > offer.price ? offer.originalPrice : undefined,
                    discountPercent: offer.originalPrice > offer.price ? calcDiscount(offer.originalPrice, offer.price) : undefined,
                    destinationName: `${offer.destinationName}, ${offer.countryName}`,
                    airline: offer.airline,
                    urgency: offer.price <= 1000 ? 8 : undefined,
                    badgeLabel: offer.type === 'hotel' ? 'HOTEL' : offer.type === 'pacote' ? 'PACOTE' : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.headerRow}>
              <div>
                <span className={styles.badge}>Blog & Dicas</span>
                <h2 className={styles.sectionTitle}>Últimas novidades</h2>
                <p className={styles.sectionDesc}>
                  Estratégias e roteiros selecionados por nossos analistas.
                </p>
              </div>
              <Link href="/blog" className={styles.linkAll}>
                Ver todos <ArrowRight size={14} />
              </Link>
            </div>
            <div className={styles.grid3}>
              {FALLBACK_BLOG.map((article) => (
                <FeedCard
                  key={article.id}
                  variant="blog"
                  title={article.title}
                  description={article.description}
                  imageUrl={article.imageUrl}
                  actionHref={`/blog/artigo?slug=${article.slug}`}
                  actionLabel="Ler mais"
                  blog={{
                    category: article.category,
                    date: article.date,
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        <section className={styles.clubBanner}>
          <div className={styles.clubBannerInner}>
            <div className={styles.clubBannerContent}>
              <span className={styles.clubBannerBadge}>CLUB DIJA</span>
              <h2 className={styles.clubBannerTitle}>
                Viaje pagando até <span className={styles.clubBannerHighlight}>60% menos</span>
              </h2>
              <p className={styles.clubBannerDesc}>
                Alertas de erro tarifário em tempo real no seu WhatsApp. Grupos exclusivos nacionais, internacionais e primeira classe.
              </p>
              <div className={styles.clubBannerFeatures}>
                <span className={styles.clubBannerFeature}>
                  <ShieldCheck size={14} /> Alertas imediatos
                </span>
                <span className={styles.clubBannerFeature}>
                  <Zap size={14} /> Erros tarifários raros
                </span>
                <span className={styles.clubBannerFeature}>
                  <Star size={14} /> Suporte especializado
                </span>
              </div>
              <Link
                href="/club"
                className={styles.clubBannerCta}
              >
                Quero economizar <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <ChatWidget />
      <Footer />
    </>
  );
}
