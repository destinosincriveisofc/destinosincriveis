import React from 'react';
import Link from 'next/link';
import { ArrowRight, Plane, ShieldCheck, Star, Flame } from 'lucide-react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      {/* Decorative Blur Circle */}
      <div className={styles.circleBackground} />

      <div className={styles.container}>
        {/* Left Column - Copywriting */}
        <div className={styles.textColumn}>
          {/* Trust Badge */}
          <div className={styles.ratingContainer}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span className={styles.badge}>
              <span className={styles.badgeDot} />
              220K Seguidores no Instagram
            </span>
          </div>

          <h1 className={styles.headline}>
            Viaje mais. <br />
            Pague menos. <br />
            <span className={styles.headlineHighlight}>Viva melhor.</span>
          </h1>

          <p className={styles.description}>
            A plataforma de inteligência de viagens que monitora promoções, alerta erros tarifários e te ajuda a viajar mais vezes ao ano pagando até 60% menos.
          </p>

          {/* CTA Buttons */}
          <div className={styles.ctaButtons}>
            <a
              href="https://destinosincriveisofc.github.io/destinosincriveis/clube.html"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.buttonPrimary}
            >
              Entrar no Clube
              <ArrowRight size={18} />
            </a>
            <Link href="/ofertas" className={styles.buttonOutline}>
              Ver Ofertas Ativas
              <Plane size={18} />
            </Link>
          </div>

          {/* Trust signals */}
          <div className={styles.trustSignals}>
            <div className={styles.trustItem}>
              <ShieldCheck size={16} className={styles.trustIconBlue} />
              <span>Garantia de Preço Baixo</span>
            </div>
            <div className={styles.trustItem}>
              <Plane size={16} className={styles.trustIconYellow} />
              <span>Alertas no WhatsApp</span>
            </div>
          </div>
        </div>

        {/* Right Column - Mockup & Image */}
        <div className={styles.imageColumn}>
          <div className={styles.imageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop"
              alt="Destinos Incríveis pelo mundo"
              className={styles.image}
            />
            {/* Visual Floating Alert Mockup */}
            <div className={styles.floatingAlert}>
              <div className={styles.alertIcon}>
                <Flame size={20} fill="currentColor" />
              </div>
              <div className={styles.alertText}>
                <span className={styles.alertLabel}>ALERTA ATIVO</span>
                <span className={styles.alertTitle}>GRU ➡️ Paris: R$ 3.850 (Ida e Volta)</span>
                <span className={styles.alertTime}>Atualizado há 3 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
