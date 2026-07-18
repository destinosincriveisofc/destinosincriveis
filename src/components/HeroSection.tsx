import React from 'react';
import Link from 'next/link';
import { ArrowRight, Plane, ShieldCheck, Star, TrendingUp, Bell, Zap } from 'lucide-react';
import TravelGlobe from './TravelGlobe';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.circleBackground} />

      <div className={styles.container}>
        <div className={styles.textColumn}>
          <div className={styles.ratingContainer}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span className={styles.badge}>
              <span className={styles.badgeDot} />
              Mais de 5.000 membros já economizaram nas viagens dos sonhos
            </span>
          </div>

          <h1 className={styles.headline}>
            Viaje mais. Pague menos.{' '}
            <span className={styles.headlineHighlight}>Viva experiências inesquecíveis.</span>
          </h1>

          <p className={styles.description}>
            Tenha acesso às melhores oportunidades de viagem, faça parte de uma comunidade apaixonada por explorar o mundo e planeje suas próximas aventuras com o apoio de inteligência artificial.
          </p>

          <div className={styles.ctaButtons}>
            <Link href="/checkout" className={styles.buttonPrimary}>
              Quero viajar pagando menos
              <ArrowRight size={18} />
            </Link>
            <a href="#clube" className={styles.buttonOutline}>
              Conhecer o Club Dija
              <ArrowRight size={18} />
            </a>
          </div>

          <div className={styles.trustSignals}>
            <div className={styles.trustItem}>
              <ShieldCheck size={16} className={styles.trustIconBlue} />
              <span>Garantia de Preço Baixo</span>
            </div>
            <div className={styles.trustItem}>
              <Bell size={16} className={styles.trustIconYellow} />
              <span>Alertas no WhatsApp</span>
            </div>
            <div className={styles.trustItem}>
              <Zap size={16} className={styles.trustIconBlue} />
              <span>IA Mineradora 24h</span>
            </div>
          </div>
        </div>

        <div className={styles.imageColumn}>
          <TravelGlobe width={500} height={400} />
        </div>
      </div>
    </section>
  );
}
