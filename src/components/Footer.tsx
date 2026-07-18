import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand */}
        <div className={styles.column}>
          <Link href="/" className={styles.brand}>
            <img src="/logo-oficial.jpg" alt="Logo" className={styles.logoImage} loading="lazy" />
            <span>
              Destinos<span className={styles.logoHighlight}>Incríveis</span>
            </span>
          </Link>
          <p className={styles.brandDesc}>
            Monitoramos e alertamos passagens imperdíveis, erros tarifários e oportunidades exclusivas de viagem.
          </p>
          {/* Social Links */}
          <div className={styles.socials}>
            {/* Instagram */}
            <a
              href="https://www.instagram.com/destinosincriveis.ofc/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@destinosincriveis.ofc"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="TikTok"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5.006 5.004" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://www.youtube.com/@destinosincriveis.oficial"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="YouTube"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={`${styles.column} ${styles.borderLeft}`}>
          <h4 className={styles.title}>Navegação</h4>
          <nav className={styles.navGroup}>
            <Link href="/" className={styles.link}>
              Home
            </Link>
            <Link href="/ofertas" className={styles.link}>
              Buscar Ofertas
            </Link>
            <Link href="/club" className={styles.link}>
              CLUB DIJA
            </Link>
            <Link href="/blog" className={styles.link}>
              Dicas de Viagem
            </Link>
            <Link href="/consultoria" className={styles.link}>
              Consultoria VIP
            </Link>
            <Link href="/parcerias" className={styles.link}>
              Parcerias Comercial
            </Link>
          </nav>
        </div>

        {/* Support */}
        <div className={`${styles.column} ${styles.borderLeft}`}>
          <h4 className={styles.title}>Atendimento</h4>
          <div className={styles.navGroup}>
            <a
              href="https://wa.me/5511997204445"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.supportLink}
            >
              <MessageSquare size={16} className={styles.iconBlue} />
              <span>WhatsApp Geral</span>
              <ArrowUpRight size={12} className={styles.iconOpacity} />
            </a>
            <a
              href="tel:+5511997204445"
              className={styles.supportLink}
            >
              <Phone size={16} className={styles.iconBlue} />
              <span>+55 (11) 99720-4445</span>
            </a>
            <a
              href="mailto:suporte@destinosincriveis.com.br"
              className={styles.supportLink}
            >
              <Mail size={16} className={styles.iconBlue} />
              <span>suporte@destinosincriveis.com.br</span>
            </a>
          </div>
        </div>

        {/* Legal / Founder */}
        <div className={`${styles.column} ${styles.borderLeft}`}>
          <h4 className={styles.title}>Sobre</h4>
          <p className={styles.brandDesc}>
            Fundado por <strong className={styles.founder}>Juliano Amorin</strong>, o portal tem a missão de democratizar as viagens pelo mundo por meio de inteligência tarifária.
          </p>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© {new Date().getFullYear()} Destinos Incríveis. Todos os direitos reservados.</p>
        <p className={styles.bottomLinks}>
          <Link href="/" className={styles.bottomLink}>Termos de Uso</Link>
          <Link href="/" className={styles.bottomLink}>Políticas de Privacidade</Link>
        </p>
      </div>
    </footer>
  );
}
