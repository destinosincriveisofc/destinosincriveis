"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2, ExternalLink } from 'lucide-react';
import styles from './page.module.css';

const KIWIFY_URL = "https://pay.kiwify.com.br/xQfiHvB";

export default function CheckoutPage() {
  useEffect(() => {
    window.location.replace(KIWIFY_URL);
  }, []);

  return (
    <div className={styles.main}>
      <header className={styles.checkoutHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/club" className={styles.backButton}>
            <ArrowLeft size={18} />
            <span>Voltar</span>
          </Link>
          <div className={styles.logo}>
            Destinos<span className={styles.logoHighlight}>Incríveis</span>
          </div>
        </div>

        <div className={styles.securityBadge}>
          <ShieldCheck size={16} />
          <span>Compra Segura SSL 256-bit</span>
        </div>
      </header>

      <div className={styles.transitionContainer}>
        <h1 className={styles.transitionTitle}>
          Redirecionando para pagamento...
        </h1>

        <p className={styles.transitionText}>
          Você será direcionado ao ambiente seguro da Kiwify para finalizar sua assinatura no Club Dija.
        </p>

        <a
          href={KIWIFY_URL}
          className={styles.redirectButton}
        >
          <ExternalLink size={18} />
          Ir para o Pagamento
        </a>
      </div>

      <footer className={styles.securityFooter}>
        <div className={styles.securityIcons}>
          <div className={styles.securityIcon} style={{ color: '#15803d' }}>
            <Lock size={14} />
            <span>Dados criptografados</span>
          </div>
          <div className={styles.securityIcon} style={{ color: '#15803d' }}>
            <CheckCircle2 size={14} />
            <span>Acesso imediato</span>
          </div>
        </div>
        <p>
          Pagamento processado pela Kiwify. Seus dados bancários estão totalmente protegidos.
        </p>
      </footer>
    </div>
  );
}
