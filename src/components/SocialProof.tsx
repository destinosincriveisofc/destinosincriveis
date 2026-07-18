"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import styles from './SocialProof.module.css';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

interface Testimonial {
  id: string;
  name: string;
  handle: string;
  role: string;
  image: string;
  text: string;
  destination: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Mateus Ribeiro",
    handle: "@mateus.trib",
    role: "Membro Club Dija desde 2024",
    image: "/images/testimonials/matheus.jpg",
    text: "Peguei o bug de passagens para Madri por R$ 1.950 ida e volta! Viajei na executiva da TAP pagando preço de econômica. O suporte me ajudou com a marcação de assentos, foi sensacional.",
    destination: "Madri, Espanha \u{1F1EA}\u{1F1F8}"
  },
  {
    id: "2",
    name: "Rodrigo Costa",
    handle: "@rodrigo.travels",
    role: "Membro Club Dija desde 2025",
    image: "/images/testimonials/rodrigo.jpg",
    text: "Eu viajo muito a trabalho e o robô de IA já me salvou várias vezes montando roteiros rápidos em conexões longas. O Club Dija se pagou no primeiro mês.",
    destination: "Lisboa, Portugal \u{1F1F5}\u{1F1F9}"
  },
  {
    id: "3",
    name: "Juliana Mendes",
    handle: "@ju_mendes",
    role: "Membro Club Dija desde 2025",
    image: "/images/testimonials/juliana.jpg",
    text: "Sempre achei que viajar para resort de luxo era impossível com o meu orçamento. O robô avisou a promoção de 60% no resort de Maceió. Passei 5 dias inesquecíveis com meu noivo!",
    destination: "Maceió, Brasil \u{1F1E7}\u{1F1F7}"
  }
];

export default function SocialProof() {
  const [current, setCurrent] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSlidesPerView(3);
      else if (window.innerWidth >= 768) setSlidesPerView(2);
      else setSlidesPerView(1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - slidesPerView);

  const goTo = useCallback((index: number) => {
    setCurrent(Math.max(0, Math.min(index, maxIndex)));
  }, [maxIndex]);

  const handlePrev = () => goTo(current - 1);
  const handleNext = () => goTo(current + 1);

  useEffect(() => {
    if (TESTIMONIALS.length <= slidesPerView) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [maxIndex, slidesPerView]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Histórias de Sucesso</span>
          <h2 className={styles.title}>
            Milhares de viajantes já descobriram novas possibilidades
          </h2>
          <p className={styles.subtitle}>
            Fazemos a ponte entre seus sonhos de viagem e a realidade, com inteligência de dados e economia extrema.
          </p>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIconWrapper}>
              <InstagramIcon width={28} height={28} className="text-[#E1306C]" />
            </div>
            <h3 className={styles.statVal}>+220.000</h3>
            <p className={styles.statLabel}>Viajantes Acompanhando no Instagram</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIconWrapper}><span>&#9889;</span></div>
            <h3 className={styles.statVal}>+15.000</h3>
            <p className={styles.statLabel}>Oportunidades Promocionais Detectadas</p>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statIconWrapper}><span>&#128081;</span></div>
            <h3 className={styles.statVal}>+5.000</h3>
            <p className={styles.statLabel}>Membros Economizando Diariamente</p>
          </div>
        </div>

        <div className={styles.carouselOuter}>
          <div className={styles.carouselWrapper}>
            <div
              className={styles.carouselTrack}
              style={{
                transform: `translateX(calc(-${current} * (100% / ${slidesPerView})))`
              }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.id} className={styles.carouselSlide} style={{ flex: `0 0 ${100 / slidesPerView}%` }}>
                  <div className={styles.tCard}>
                    <div className={styles.travelPhotoWrapper}>
                      <img src={t.image} alt={`Viagem de ${t.name}`} className={styles.travelPhoto} />
                      <div className={styles.photoOverlay} />
                      <span className={styles.destinationBadge}>{t.destination}</span>
                    </div>
                    <div className={styles.tBody}>
                      <div className={styles.starsRow}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" className={styles.starIcon} />
                        ))}
                      </div>
                      <blockquote className={styles.quoteText}>
                        &ldquo;{t.text}&rdquo;
                      </blockquote>
                      <div className={styles.profileRow}>
                        <img src={t.image} alt={t.name} className={styles.avatar} />
                        <div>
                          <h4 className={styles.profileName}>{t.name}</h4>
                          <span className={styles.profileHandle}>{t.handle} &bull; <small className={styles.roleText}>{t.role}</small></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {maxIndex > 0 && (
            <>
              <button onClick={handlePrev} className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`} aria-label="Anterior">
                <ChevronLeft size={22} />
              </button>
              <button onClick={handleNext} className={`${styles.carouselArrow} ${styles.carouselArrowRight}`} aria-label="Próximo">
                <ChevronRight size={22} />
              </button>
              <div className={styles.carouselIndicators}>
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`${styles.carouselIndicator} ${current === i ? styles.carouselIndicatorActive : ''}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
