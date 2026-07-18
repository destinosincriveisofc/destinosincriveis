"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import styles from './page.module.css';

export default function CheckoutPage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://pay.kiwify.com.br/xQfiHvB";
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.main}>
      {/* Header Premium */}
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

      {/* Central Transition Card */}
      <div className={styles.transitionContainer}>
        <div className={styles.spinnerWrapper}>
          <div className={styles.spinner}></div>
        </div>
        
        <h1 className={styles.transitionTitle}>
          Iniciando pagamento seguro...
        </h1>
        
        <p className={styles.transitionText}>
          Você está sendo redirecionado para o ambiente de criptografia da Kiwify.
        </p>

        <a 
          href="https://pay.kiwify.com.br/xQfiHvB" 
          className={styles.redirectButton}
        >
          Caso não seja redirecionado em instantes, clique aqui
        </a>
      </div>

      {/* Security Info Footer */}
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
          Seu pagamento é processado pela Kiwify, uma das maiores plataformas de infoprodutos do Brasil.
          Seus dados bancários estão totalmente protegidos.
        </p>
      </footer>
    </div>
  );
}
