"use client";

import React from 'react';
import { Star, MessageCircle, Heart } from 'lucide-react';
import styles from './SocialProof.module.css';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
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
  avatarUrl: string;
  travelUrl: string;
  text: string;
  destination: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Mateus Ribeiro",
    handle: "@mateus.trib",
    role: "Membro Club Dija desde 2024",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    travelUrl: "https://images.unsplash.com/photo-1473442240418-452f03b7ae40?q=80&w=500&auto=format&fit=crop",
    text: "Peguei o bug de passagens para Madri por R$ 1.950 ida e volta! Viajei na executiva da TAP pagando preço de econômica. O suporte me ajudou com a marcação de assentos, foi sensacional.",
    destination: "Madri, Espanha 🇪🇸"
  },
  {
    id: "2",
    name: "Juliana Mendes",
    handle: "@ju_mendes",
    role: "Membro Club Dija desde 2025",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    travelUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500&auto=format&fit=crop",
    text: "Sempre achei que viajar para resort de luxo era impossível com o meu orçamento. O robô avisou a promoção de 60% no resort de Maceió. Passei 5 dias inesquecíveis com meu noivo!",
    destination: "Maceió, Brasil 🇧🇷"
  },
  {
    id: "3",
    name: "Rodrigo Costa",
    handle: "@rodrigo.travels",
    role: "Membro Club Dija desde 2025",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
    travelUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=500&auto=format&fit=crop",
    text: "Eu viajo muito a trabalho e o robô de IA já me salvou várias vezes montando roteiros rápidos em conexões longas. O Club Dija se pagou no primeiro mês.",
    destination: "Lisboa, Portugal 🇵🇹"
  }
];

export default function SocialProof() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Intro Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Histórias de Sucesso</span>
          <h2 className={styles.title}>
            Milhares de viajantes já descobriram novas possibilidades
          </h2>
          <p className={styles.subtitle}>
            Fazemos a ponte entre seus sonhos de viagem e a realidade, com inteligência de dados e economia extrema.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIconWrapper}>
              <InstagramIcon width={28} height={28} className="text-[#E1306C]" />
            </div>
            <h3 className={styles.statVal}>+220.000</h3>
            <p className={styles.statLabel}>Viajantes Acompanhando no Instagram</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrapper}>
              <span>⚡</span>
            </div>
            <h3 className={styles.statVal}>+15.000</h3>
            <p className={styles.statLabel}>Oportunidades Promocionais Detectadas</p>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIconWrapper}>
              <span>👑</span>
            </div>
            <h3 className={styles.statVal}>+5.000</h3>
            <p className={styles.statLabel}>Membros Economizando Diariamente</p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className={styles.testimonialsGrid}>
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className={styles.tCard}>
              {/* Travel Photo Embed */}
              <div className={styles.travelPhotoWrapper}>
                <img src={t.travelUrl} alt={`Viagem de ${t.name}`} className={styles.travelPhoto} />
                <div className={styles.photoOverlay} />
                <span className={styles.destinationBadge}>{t.destination}</span>
              </div>

              {/* Card Body */}
              <div className={styles.tBody}>
                {/* Stars */}
                <div className={styles.starsRow}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" className={styles.starIcon} />
                  ))}
                </div>

                {/* Conversation Bubble Text */}
                <blockquote className={styles.quoteText}>
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                {/* Profile row */}
                <div className={styles.profileRow}>
                  <img src={t.avatarUrl} alt={t.name} className={styles.avatar} />
                  <div>
                    <h4 className={styles.profileName}>{t.name}</h4>
                    <span className={styles.profileHandle}>{t.handle} • <small className={styles.roleText}>{t.role}</small></span>
                  </div>
                </div>

                {/* Micro social interactions */}
                <div className={styles.microSocial}>
                  <div className={styles.socialAction}>
                    <Heart size={14} className={styles.socialIconActive} fill="currentColor" />
                    <span>842 curtidas</span>
                  </div>
                  <div className={styles.socialAction}>
                    <MessageCircle size={14} />
                    <span>45 comentários</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
