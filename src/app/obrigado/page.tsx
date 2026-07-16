"use client";

import React from 'react';
import Link from 'next/link';
import { Check, MessageSquare, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

export default function ObrigadoPage() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {/* Animated Success Checkmark */}
        <div className={styles.successIconWrapper}>
          <Check size={40} strokeWidth={3} />
        </div>

        {/* Success Title */}
        <h1 className={styles.title}>
          Inscrição Aprovada! Bem-vindo ao Club DIJA 👑
        </h1>
        <p className={styles.subtitle}>
          Sua assinatura foi processada com sucesso. Siga as instruções abaixo para acessar seus benefícios:
        </p>

        {/* Step List Instructions */}
        <div className={styles.instructionList}>
          <div className={styles.instructionItem}>
            <div className={styles.instructionNumber}>1</div>
            <div className={styles.instructionContent}>
              <span className={styles.instructionTitle}>WhatsApp VIP</span>
              <p className={styles.instructionText}>
                Em instantes você receberá no seu número de cadastro as mensagens de boas-vindas e os links de acesso aos nossos 3 grupos VIP (Dicas, Ofertas e Comunidade).
              </p>
            </div>
          </div>

          <div className={styles.instructionItem}>
            <div className={styles.instructionNumber}>2</div>
            <div className={styles.instructionContent}>
              <span className={styles.instructionTitle}>E-mail de Membros</span>
              <p className={styles.instructionText}>
                O link de ativação da sua área de membros exclusiva foi enviado para o seu e-mail cadastrado.
              </p>
            </div>
          </div>
        </div>

        {/* Support Button pointing to WA */}
        <a 
          href="https://wa.me/5511997204445" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.supportBtn}
        >
          <MessageSquare size={18} />
          <span>Falar com o Suporte (WhatsApp)</span>
        </a>

        {/* Back home Link */}
        <Link href="/" className={styles.backHomeLink}>
          Ir para a Página Inicial
        </Link>
      </div>
    </div>
  );
}
