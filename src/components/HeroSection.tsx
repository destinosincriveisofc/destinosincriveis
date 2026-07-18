import React from 'react';
import Link from 'next/link';
import { ArrowRight, Plane, ShieldCheck, Star, TrendingUp, Bell, Zap } from 'lucide-react';
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
          <div className={styles.imageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop"
              alt="Destinos Incríveis pelo mundo"
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.imageOverlay} />
            <div className={styles.imageBadge}>
              <TrendingUp size={16} />
              <span>Preços monitorados em tempo real</span>
            </div>

            <div className={styles.floatingAlert}>
              <div className={styles.alertIcon}>
                <Bell size={18} fill="currentColor" />
              </div>
              <div className={styles.alertText}>
                <span className={styles.alertLabel}>ALERTA ATIVO</span>
                <span className={styles.alertTitle}>GRU → Paris: R$ 3.850 (Ida e Volta)</span>
                <span className={styles.alertTime}>Atualizado há 3 min</span>
              </div>
            </div>

            <div className={styles.floatingCard1}>
              <Plane size={14} />
              <span>Economia de até 75%</span>
            </div>
            <div className={styles.floatingCard2}>
              <Star size={14} fill="currentColor" />
              <span>4.9/5 avaliações</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
