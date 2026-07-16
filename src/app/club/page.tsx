"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { Check, Star, ArrowRight, ShieldCheck, Flame, Bell, MessageSquare, CreditCard } from 'lucide-react';
import styles from './page.module.css';

export default function ClubPage() {
  const [hasClickedBuy, setHasClickedBuy] = useState(false);

  const benefits = [
    {
      icon: <Bell className="text-[#5BA4CF]" size={24} />,
      title: "Alertas Imediatos via WhatsApp",
      description: "Nossa inteligência tarifária dispara alertas na hora que a promoção ou erro de preço acontece. Sem delays."
    },
    {
      icon: <Flame className="text-[#FFD43B]" size={24} />,
      title: "Monitoramento de Erro de Tarifa",
      description: "Quando o sistema das companhias falha e vende passagens com até 90% de desconto. Avisamos de madrugada ou final de semana."
    },
    {
      icon: <ShieldCheck className="text-[#5BA4CF]" size={24} />,
      title: "Emissão Direta sem Taxas",
      description: "Você não paga comissões ou taxas. Enviamos o link direto para o site oficial da companhia aérea parceira."
    },
    {
      icon: <MessageSquare className="text-[#FFD43B]" size={24} />,
      title: "Comunidade Exclusiva",
      description: "Tire dúvidas sobre roteiros, milhas ou emissões direto com Juliano Amorin e nossa equipe de moderadores."
    }
  ];

  const plans = [
    {
      name: "Assinatura Mensal",
      price: "R$ 19,90",
      period: "por mês",
      description: "Ideal para testar e planejar sua próxima viagem.",
      link: "/checkout",
      popular: true,
      features: [
        "Acesso aos 4 grupos exclusivos (WhatsApp)",
        "Alertas de Erros Tarifários nacionais e internacionais",
        "Suporte direto da equipe Destinos Incríveis",
        "Cancelamento fácil a qualquer momento",
        "Sem taxas ou letras miúdas de intermediários"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Mariana Silva",
      role: "Viajou para Roma",
      text: "Fiquei impressionada! Consegui ida e volta para Roma por R$ 3.850 graças ao alerta no WhatsApp. A assinatura se pagou no primeiro dia.",
      rating: 5,
      avatar: "MS"
    },
    {
      name: "Daniel Krug",
      role: "Viajou para Miami",
      text: "Eu achava que erro de passagem era mito. Comprei executiva para Miami por preço de econômica. Recomendo de olhos fechados.",
      rating: 5,
      avatar: "DK"
    },
    {
      name: "Beatriz Oliveira",
      role: "Viajou para Salvador",
      text: "Minhas viagens em família aumentaram muito. Só compramos com base nas notificações do grupo nacional. Excelente!",
      rating: 5,
      avatar: "BO"
    }
  ];

  const faqs = [
    {
      q: "Como recebo as promoções?",
      a: "Tudo é enviado diretamente em grupos fechados no WhatsApp. Você entra nos grupos após a confirmação da assinatura e apenas os administradores enviam mensagens (sem spam)."
    },
    {
      q: "Preciso pagar alguma taxa ao emitir?",
      a: "Nenhum centavo. Nós apenas encontramos as oportunidades e compartilhamos o link oficial de reserva direta. A compra é feita direto no site da companhia aérea ou consolidador."
    },
    {
      q: "O cancelamento é fácil?",
      a: "Sim, absolutamente. Você pode cancelar sua assinatura mensal quando desejar diretamente pelo painel da Kiwify ou solicitando ao nosso suporte, sem carência ou multas."
    },
    {
      q: "Funciona mesmo para datas específicas?",
      a: "Nosso sistema busca as maiores variações tarifárias gerais. Sempre enviamos um resumo de datas disponíveis para cada preço promocional encontrado para você escolher."
    }
  ];

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBadge}>
            ✨ Comunidade Exclusiva
          </div>
          <h1 className={styles.heroTitle}>
            Viaje com quem entende de <span className={styles.heroHighlight}>Passagem Barata</span>
          </h1>
          <p className={styles.heroDesc}>
            Economize milhares de reais em passagens aéreas e hotéis. Junte-se a mais de 15.000 viajantes que recebem alertas de tarifas imperdíveis e erros no WhatsApp.
          </p>
          <div>
            <Link
              href="/checkout"
              className={styles.heroBtn}
            >
              Entrar no Clube
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className={styles.sectionWhite}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.badge}>Benefícios Inclusos</span>
              <h2 className={styles.sectionTitle}>Tudo o que você vai receber</h2>
            </div>
            
            <div className={styles.benefitsGrid}>
              {benefits.map((b, i) => (
                <div key={i} className={styles.benefitCard}>
                  <div className={styles.benefitIconWrapper}>
                    {b.icon}
                  </div>
                  <h3 className={styles.benefitTitle}>{b.title}</h3>
                  <p className={styles.benefitText}>{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section id="pricing" className={styles.sectionIce}>
          <div className={styles.container}>
            <div className={styles.pricingContainer}>
              <div className={styles.sectionHeader}>
                <span className={styles.badge}>Acesso Imediato</span>
                <h2 className={styles.sectionTitle}>Escolha o melhor plano para você</h2>
                <p className={styles.sectionDesc}>Sem fidelidade, cancele quando quiser com um clique.</p>
              </div>

              {plans.map((plan, index) => (
                <div key={index} className={styles.pricingCard}>
                  {plan.popular && (
                    <div className={styles.popularBadge}>
                      Mais Assinado
                    </div>
                  )}
                  
                  <span className={styles.planName}>{plan.name}</span>
                  <p className={styles.planDesc}>{plan.description}</p>

                  <div className={styles.priceWrapper}>
                    <span className={styles.priceVal}>{plan.price}</span>
                    <span className={styles.pricePeriod}>{plan.period}</span>
                  </div>

                  <Link
                    href={plan.link}
                    onClick={() => setHasClickedBuy(true)}
                    className={styles.pricingBtn}
                  >
                    <CreditCard size={18} />
                    Assinar Agora via Kiwify
                  </Link>

                  <div className={styles.featuresList}>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className={styles.featureItem}>
                        <Check className={styles.featureIcon} size={16} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Paid WhatsApp Group Link - displays after click/purchase indicator */}
              {hasClickedBuy && (
                <div className={styles.successCard}>
                  <h3 className={styles.successTitle}>🎉 Pagamento Iniciado!</h3>
                  <p className={styles.successText}>
                    Clique no botão abaixo para entrar no grupo pago do Clube assim que finalizar a sua inscrição na Kiwify.
                  </p>
                  <a
                    href="https://chat.whatsapp.com/C9l2ljLrOB2EmCZxu1cLEM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.successBtn}
                  >
                    <MessageSquare size={18} />
                    Entrar no Grupo Pago do Clube
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className={styles.sectionWhite}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.badge}>Depoimentos reais</span>
              <h2 className={styles.sectionTitle}>Quem assina, viaja e recomenda</h2>
            </div>

            <div className={styles.testimonialsGrid}>
              {testimonials.map((t, i) => (
                <div key={i} className={styles.testimonialCard}>
                  <div className={styles.stars}>
                    {[...Array(t.rating)].map((_, r) => (
                      <Star key={r} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className={styles.testimonialText}>
                    &quot;{t.text}&quot;
                  </p>
                  <div className={styles.authorRow}>
                    <div className={styles.avatar}>
                      {t.avatar}
                    </div>
                    <div className={styles.authorMeta}>
                      <strong className={styles.authorName}>{t.name}</strong>
                      <span className={styles.authorRole}>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className={styles.sectionIce}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.badge}>Perguntas Frequentes</span>
              <h2 className={styles.sectionTitle}>Dúvidas sobre o Club</h2>
            </div>

            <div className={styles.faqsList}>
              {faqs.map((faq, i) => (
                <div key={i} className={styles.faqCard}>
                  <h3 className={styles.faqQuestion}>{faq.q}</h3>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <ChatWidget />
      <Footer />
    </>
  );
}
