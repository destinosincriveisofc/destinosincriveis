import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { ArrowRight, Handshake, Users, Globe, Building, Landmark } from 'lucide-react';
import styles from './page.module.css';

export default function ParceriasPage() {
  const partnershipTypes = [
    {
      icon: <Building size={24} />,
      title: "Agências & Consolidadoras",
      description: "Integre suas tarifas especiais e ofertas de passagens ou hotéis diretamente em nosso motor de monitoramento diário."
    },
    {
      icon: <Users size={24} />,
      title: "Criadores de Conteúdo",
      description: "Divulgue nosso Clube de Viagens para sua audiência e ganhe comissões recorrentes através de nossa plataforma de afiliados."
    },
    {
      icon: <Globe size={24} />,
      title: "Redes de Hotéis & Turismo",
      description: "Destaque seus destinos, resorts ou serviços de turismo nas newsletters e alertas exclusivos enviados ao nosso público qualificado."
    }
  ];

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Page Intro */}
          <div className={styles.pageIntro}>
            <span className={styles.badge}>Oportunidades Comerciais</span>
            <h1 className={styles.title}>Parcerias & Afiliados</h1>
            <p className={styles.description}>
              Conecte sua marca a milhares de viajantes engajados e faça parte do ecossistema de turismo inteligente que mais cresce no Brasil.
            </p>
          </div>

          {/* Partnership Types Grid */}
          <div className={styles.grid3}>
            {partnershipTypes.map((type, idx) => (
              <div key={idx} className={styles.card}>
                <div className={styles.iconWrapper}>
                  {type.icon}
                </div>
                <h3 className={styles.cardTitle}>{type.title}</h3>
                <p className={styles.cardText}>{type.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Area */}
          <div className={styles.ctaArea}>
            <h2 className={styles.ctaTitle}>Quer ser nosso parceiro comercial?</h2>
            <p className={styles.ctaText}>
              Preencha nosso formulário de parcerias e nossa equipe comercial analisará sua proposta em até 48 horas úteis.
            </p>
            <a
              href="https://form.typeform.com/to/UAOGJSzY"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaBtn}
            >
              Fazer Parceria
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Logos / Trusted Brands Section */}
          <div className={styles.logosSection}>
            <h3 className={styles.logosTitle}>Integrações e Consolidadores Oficiais</h3>
            <div className={styles.logosGrid}>
              <span className={styles.logoBadge}>LATAM Airlines</span>
              <span className={styles.logoBadge}>Azul Linhas Aéreas</span>
              <span className={styles.logoBadge}>GOL</span>
              <span className={styles.logoBadge}>TAP Portugal</span>
              <span className={styles.logoBadge}>Travelpayouts</span>
            </div>
          </div>
        </div>
      </main>
      <ChatWidget />
      <Footer />
    </>
  );
}
