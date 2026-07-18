"use client";

import React, { useState, useEffect } from 'react';
import { Bot, User, Sparkles, Send } from 'lucide-react';
import styles from './IaConciergeSection.module.css';

export default function IaConciergeSection() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1000); // show user message
    const timer2 = setTimeout(() => setStep(2), 2500); // show typing status
    const timer3 = setTimeout(() => setStep(3), 4500); // show AI response
    
    // Loop the demo every 18 seconds
    const interval = setInterval(() => {
      setStep(0);
      setTimeout(() => setStep(1), 1000);
      setTimeout(() => setStep(2), 2500);
      setTimeout(() => setStep(3), 4500);
    }, 18000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearInterval(interval);
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textSide}>
          <div className={styles.badge}>
            <Sparkles size={14} className="text-[#FFC107]" />
            <span>Tecnologia de Vanguarda</span>
          </div>
          <h2 className={styles.title}>
            Planeje sua viagem em segundos com nosso Concierge de IA
          </h2>
          <p className={styles.desc}>
            Nosso assistente inteligente pesquisa milhares de combinações de voos, hotéis e trechos terrestres para criar o roteiro ideal que cabe no seu bolso. Economize tempo e dinheiro com planejamento sob medida.
          </p>
          <div className={styles.features}>
            <div className={styles.featItem}>
              <span className={styles.featIcon}>🎯</span>
              <div>
                <strong>Busca Inteligente</strong>
                <p>Cruzamento de dados históricos e previsões de tarifas em tempo real.</p>
              </div>
            </div>
            <div className={styles.featItem}>
              <span className={styles.featIcon}>🗺️</span>
              <div>
                <strong>Roteiros Personalizados</strong>
                <p>Sugestões baseadas no seu perfil e orçamento planejado.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mockupSide}>
          {/* Phone Frame */}
          <div className={styles.phoneFrame}>
            <div className={styles.phoneHeader}>
              <div className={styles.notch} />
              <div className={styles.botProfile}>
                <div className={styles.botAvatar}>
                  <Bot size={18} />
                </div>
                <div>
                  <span className={styles.botName}>Club Dija Concierge</span>
                  <span className={styles.botStatus}>{step === 2 ? 'Escrevendo...' : 'Online'}</span>
                </div>
              </div>
            </div>

            <div className={styles.chatArea}>
              {step >= 1 && (
                <div className={`${styles.message} ${styles.userMessage}`}>
                  <div className={styles.msgContent}>
                    Quero viajar para Portugal em setembro gastando até R$ 5 mil.
                  </div>
                  <div className={styles.avatarUser}>
                    <User size={14} />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className={`${styles.message} ${styles.botMessage}`}>
                  <div className={styles.avatarBot}>
                    <Bot size={14} />
                  </div>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}

              {step >= 3 && (
                <div className={`${styles.message} ${styles.botMessage} ${styles.fadeIn}`}>
                  <div className={styles.avatarBot}>
                    <Bot size={14} />
                  </div>
                  <div className={styles.botMsgContent}>
                    <p className={styles.greetingText}>Olá! Analisei as melhores opções e montei sua viagem perfeita dentro do orçamento:</p>
                    <div className={styles.planDetails}>
                      <p>📅 <strong>Datas ideais:</strong> 12 a 24 de Setembro (queda histórica de tarifas)</p>
                      <p>✈️ <strong>Passagem:</strong> São Paulo para Lisboa por R$ 1.990 (economia de 54%)</p>
                      <p>🏨 <strong>Hospedagem:</strong> Hotel Centro de Lisboa (R$ 1.800 total)</p>
                      <p>🗺️ <strong>Roteiro rápido:</strong> 3 dias em Lisboa, 2 dias em Porto e 1 em Sintra</p>
                      <p className={styles.totalBudget}>💰 <strong>Orçamento final:</strong> R$ 4.790 (economia de R$ 210!)</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.chatInput}>
              <div className={styles.inputField}>Pergunte algo para a IA...</div>
              <button className={styles.sendBtn} aria-label="Enviar mensagem">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
