"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle, Lock, Zap, Users, ArrowLeft } from 'lucide-react';
import styles from './page.module.css';

const KIWIFY_URL = "https://pay.kiwify.com.br/xQfiHvB";

export default function CheckoutPage() {
  const [showModal, setShowModal] = useState(false);

  function handleConfirm() {
    window.location.href = KIWIFY_URL;
  }

  return (
    <>
      <div className={styles.page}>
        <header className={styles.header}>
          <Link href="/" className={styles.logo}>
            <div className={styles.logoBox}>DI</div>
            <span className={styles.logoText}>
              Destinos <span className={styles.logoHighlight}>Incriveis</span>
            </span>
          </Link>

          <div className={styles.securityBadge}>
            <ShieldCheck size={14} />
            <span>Compra segura</span>
          </div>
        </header>

        <main className={styles.content}>
          <div className={styles.socialProof}>
            <Users size={14} />
            <span>Mais de <strong>3.400 viajantes</strong> ja fazem parte do Club DIJA</span>
          </div>

          <div className={styles.priceCard}>
            <span className={styles.guaranteeBadge}>Garantia de 7 dias</span>
            <div>
              <span className={styles.priceAmount}>R$ 9,90</span>
              <span className={styles.pricePeriod}>/mes</span>
            </div>
            <p className={styles.priceLabel}>Preco de lancamento — Membro Fundador</p>
          </div>

          <div className={styles.benefitsSection}>
            <h2 className={styles.benefitsTitle}>Club DIJA — Membro Fundador</h2>
            <p className={styles.benefitsSubtitle}>
              Acesso completo a plataforma de inteligencia de viagens.
            </p>

            <div className={styles.benefitItem}>
              <CheckCircle size={18} className={styles.benefitIcon} />
              <span>Copiloto DIJA AI para planejamento</span>
            </div>
            <div className={styles.benefitItem}>
              <CheckCircle size={18} className={styles.benefitIcon} />
              <span>Comunidade exclusiva de viajantes</span>
            </div>
            <div className={styles.benefitItem}>
              <CheckCircle size={18} className={styles.benefitIcon} />
              <span>Guias e roteiros editoriais</span>
            </div>
            <div className={styles.benefitItem}>
              <CheckCircle size={18} className={styles.benefitIcon} />
              <span>Alertas inteligentes de destinos</span>
            </div>
            <div className={styles.benefitItem}>
              <CheckCircle size={18} className={styles.benefitIcon} />
              <span>Historico de viagens e favoritos</span>
            </div>
          </div>

          <div className={styles.ctaWrapper}>
            <button
              onClick={() => setShowModal(true)}
              className={styles.ctaButton}
            >
              Assinar por R$ 9,90
            </button>
          </div>

          <div className={styles.trustRow}>
            <div className={styles.trustItem}>
              <Lock size={14} className={styles.trustIcon} />
              <span>Cancelamento gratuito</span>
            </div>
            <div className={styles.trustItem}>
              <ShieldCheck size={14} className={styles.trustIcon} />
              <span>Pagamento seguro</span>
            </div>
            <div className={styles.trustItem}>
              <Zap size={14} className={styles.trustIcon} />
              <span>Acesso imediato</span>
            </div>
          </div>

          <div className={styles.testimonialsSection}>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                &quot;Economizei R$ 640 na minha viagem para o Jalapao.&quot;
              </p>
              <p className={styles.testimonialAuthor}>— Juliana Costa, SP</p>
            </div>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                &quot;A DIJA montou um roteiro pro Nordeste que me poupou semanas de pesquisa.&quot;
              </p>
              <p className={styles.testimonialAuthor}>— Matheus Oliveira, RJ</p>
            </div>
            <div className={styles.testimonialCard}>
              <p className={styles.testimonialText}>
                &quot;Descobri destinos no Brasil que nem sabia que existiam. Vale cada centavo.&quot;
              </p>
              <p className={styles.testimonialAuthor}>— Rodrigo Santos, BH</p>
            </div>
          </div>

          <div className={styles.faqSection}>
            <div className={styles.faqItem}>
              <p className={styles.faqQuestion}>Posso cancelar quando quiser?</p>
              <p className={styles.faqAnswer}>Sim. Sem multa ou fidelidade. Cancela com um clique.</p>
            </div>
            <div className={styles.faqItem}>
              <p className={styles.faqQuestion}>Funciona mesmo?</p>
              <p className={styles.faqAnswer}>Usamos IA + curadoria humana para recomendar os melhores destinos e epocas para viajar.</p>
            </div>
            <div className={styles.faqItem}>
              <p className={styles.faqQuestion}>Meus dados estao seguros?</p>
              <p className={styles.faqAnswer}>
                Sim. O pagamento e processado pela Kiwify com criptografia SSL de 256 bits.
              </p>
            </div>
            <div className={styles.faqItem}>
              <p className={styles.faqQuestion}>Tem garantia?</p>
              <p className={styles.faqAnswer}>Sim! Sao 7 dias de garantia incondicional. Se nao gostar, devolvemos 100% do seu dinheiro.</p>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Pagamento processado pela Kiwify — Ambiente 100% seguro
          </p>
          <div className={styles.footerLinks}>
            <Link href="/termos" className={styles.footerLink}>
              Termos de uso
            </Link>
            <Link href="/privacidade" className={styles.footerLink}>
              Politica de privacidade
            </Link>
          </div>
        </footer>
      </div>

      {showModal && (
        <div className={styles.overlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Confirmar assinatura</h3>
            <p className={styles.modalText}>
              Voce esta sendo redirecionado para o pagamento seguro.
            </p>
            <div className={styles.modalActions}>
              <button
                onClick={handleConfirm}
                className={styles.modalConfirmButton}
              >
                Ir para o pagamento
              </button>
              <button
                onClick={() => setShowModal(false)}
                className={styles.modalCancelButton}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
