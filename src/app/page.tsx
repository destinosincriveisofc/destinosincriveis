import React from 'react';
import { Compass, CheckCircle2, ArrowRight, ShieldCheck, Mail, Phone, Star } from 'lucide-react';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import OfferCard from '@/components/OfferCard';
import BlogSection from '@/components/BlogSection';
import TravelSearchWidget from '@/components/TravelSearchWidget';
import { fetchCheapFlights } from '@/lib/travelpayouts';
import styles from './page.module.css';

export default async function Home() {
  const cheapFlights = await fetchCheapFlights();
  const alertOffers = cheapFlights.slice(0, 3); // Display top 3 alerts in central section

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* 1. Hero Section */}
        <HeroSection />

        <TravelSearchWidget />

        {/* 2. Stats Section */}
        <StatsSection />

        {/* 3. Como Funciona Section */}
        <section className={styles.sectionWhite}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.badge}>Metodologia Inteligente</span>
              <h2 className={styles.sectionTitle}>Como economizar em 3 passos</h2>
              <p className={styles.sectionDesc}>
                Nossa tecnologia monitora a variação de preços e avisa você no momento exato de reservar.
              </p>
            </div>

            <div className={styles.stepsGrid}>
              {/* Step 1 */}
              <div className={styles.stepCard}>
                <div className={styles.stepNum}>01</div>
                <h3 className={styles.stepTitle}>Nós rastreamos</h3>
                <p className={styles.stepText}>
                  Algoritmos monitoram tarifas de passagens 24h por dia, identificando quedas bruscas de preços e bugs do sistema.
                </p>
              </div>

              {/* Step 2 */}
              <div className={styles.stepCard}>
                <div className={styles.stepNum}>02</div>
                <h3 className={styles.stepTitle}>Você recebe o alerta</h3>
                <p className={styles.stepText}>
                  Disparamos alertas instantâneos no seu WhatsApp ou e-mail com o link de reserva direta, sem taxas ou intermediários.
                </p>
              </div>

              {/* Step 3 */}
              <div className={styles.stepCard}>
                <div className={styles.stepNum}>03</div>
                <h3 className={styles.stepTitle}>Você viaja economizando</h3>
                <p className={styles.stepText}>
                  Emitindo diretamente com a companhia aérea ou parceiro consolidado, você economiza até 60% em relação ao preço padrão.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Central de Alertas Section */}
        <section className={styles.sectionIce}>
          <div className={styles.container}>
            <div className={styles.alertHeaderRow}>
              <div className={styles.sectionHeaderLeft}>
                <span className={styles.badge}>Alertas Recentes</span>
                <h2 className={styles.sectionTitle}>Central de Promoções Ativas</h2>
                <p className={styles.sectionDesc}>
                  Estas são as passagens aéreas e ofertas mais baratas encontradas nas últimas horas.
                </p>
              </div>
              <div>
                <Link href="/ofertas" className={styles.buttonOutline}>
                  Ver todas as ofertas
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className={styles.grid3}>
              {alertOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        </section>

        {/* 5. Club Section */}
        <section className={styles.sectionWhite}>
          <div className={styles.container}>
            <div className={styles.clubGrid}>
              <div className={styles.clubText}>
                <span className={styles.badge}>Acesso Exclusivo</span>
                <h2 className={styles.sectionTitle}>
                  Destinos Incríveis Club: <br />
                  Seu passaporte para viajar mais
                </h2>
                <p className={styles.sectionDesc}>
                  Faça parte do nosso grupo privado. Nossa equipe monitora 24 horas por dia, 7 dias por semana, enviando imediatamente no seu WhatsApp erros tarifários raros e descontos históricos de passagens.
                </p>

                <div className={styles.clubFeatures}>
                  <div className={styles.clubFeatureItem}>
                    <CheckCircle2 size={20} className={styles.featureIcon} />
                    <div className={styles.featureContent}>
                      <strong className={styles.featureTitle}>4 Grupos Especializados</strong>
                      <span className={styles.featureDesc}>Nacionais, Internacionais, Executivas/Primeira Classe e Hotéis.</span>
                    </div>
                  </div>
                  <div className={styles.clubFeatureItem}>
                    <CheckCircle2 size={20} className={styles.featureIcon} />
                    <div className={styles.featureContent}>
                      <strong className={styles.featureTitle}>Alertas de Erro Tarifário Imediatos</strong>
                      <span className={styles.featureDesc}>Seja o primeiro a saber e emita antes que a companhia corrija o valor.</span>
                    </div>
                  </div>
                  <div className={styles.clubFeatureItem}>
                    <CheckCircle2 size={20} className={styles.featureIcon} />
                    <div className={styles.featureContent}>
                      <strong className={styles.featureTitle}>Suporte e Dúvidas com Especialistas</strong>
                      <span className={styles.featureDesc}>Canal direto com o fundador Juliano Amorin e consultores.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://pay.kiwify.com.br/xQfiHvB"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.buttonPrimary}
                  >
                    Entrar no Club por R$ 29,90/mês
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>

              <div className={styles.clubImageArea}>
                <div className={styles.clubImageWrapper}>
                  <img
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop"
                    alt="Laptop showing flight details"
                    className={styles.clubImage}
                  />
                  <div className={styles.clubTestimonialOverlay}>
                    <div className={styles.clubTestimonialBox}>
                      <div className="flex justify-center text-[#FFD43B] mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                      <p className={styles.testimonialQuote}>
                        &quot;Economizei R$ 4.200 em uma única viagem para a Itália com o alerta do Club! Vale cada centavo.&quot;
                      </p>
                      <span className={styles.testimonialAuthor}>— Mariana S., São Paulo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Consultoria VIP Section */}
        <section id="consultoria" className={styles.sectionIce}>
          <div className={styles.container}>
            <div className={styles.consultingGrid}>
              <div className={styles.consultingInfo}>
                <span className={styles.badge}>Atendimento Exclusivo</span>
                <h2 className={styles.sectionTitle}>
                  Consultoria VIP <br />
                  Destinos Incríveis
                </h2>
                <p className={styles.sectionDesc}>
                  Prefere que busquemos as passagens e hotéis ideais para você? Nossa consultoria cria roteiros sob medida, otimiza trechos complexos e encontra as melhores tarifas pagas em dinheiro ou milhas.
                </p>
                <div className={styles.contactList}>
                  <div className={styles.contactItem}>
                    <Phone size={16} className={styles.contactIcon} />
                    <span>WhatsApp VIP: +55 (11) 99720-4445</span>
                  </div>
                  <div className={styles.contactItem}>
                    <Mail size={16} className={styles.contactIcon} />
                    <span>suporte@destinosincriveis.com.br</span>
                  </div>
                </div>
              </div>

              {/* Consultation Form */}
              <div className={styles.formBox}>
                <h3 className={styles.formTitle}>Solicitar Roteiro Personalizado</h3>
                <form className={styles.formGrid}>
                  <div className={styles.formField}>
                    <label className={styles.label}>Nome Completo</label>
                    <input
                      type="text"
                      placeholder="Ex: Juliano Amorin"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.label}>WhatsApp de Contato</label>
                    <input
                      type="tel"
                      placeholder="Ex: (11) 99720-4445"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.label}>Origem</label>
                    <input
                      type="text"
                      placeholder="Ex: São Paulo (GRU)"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.label}>Destino Desejado</label>
                    <input
                      type="text"
                      placeholder="Ex: Roma, Itália"
                      className={styles.input}
                    />
                  </div>
                  <div className={`${styles.formField} ${styles.span2}`}>
                    <label className={styles.label}>Mensagem / Observações</label>
                    <textarea
                      rows={3}
                      placeholder="Nos fale sobre a sua viagem dos sonhos e o período preferido..."
                      className={`${styles.input} ${styles.textarea}`}
                    />
                  </div>
                  <div className={styles.span2}>
                    <button type="submit" className={styles.submitBtn}>
                      Enviar Solicitação via WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Parceiros & Afiliados Section */}
        <section className={styles.sectionWhite}>
          <div className={styles.container}>
            <div className={styles.partnersContainer}>
              <div className={styles.sectionHeader}>
                <span className={styles.badge}>Nossos Parceiros</span>
                <h3 className={styles.sectionTitle}>Integrações e Consolidadores Oficiais</h3>
              </div>
              
              {/* Logos Grid */}
              <div className={styles.partnersGrid}>
                <span className={styles.partnerBadge}>LATAM Airlines</span>
                <span className={styles.partnerBadge}>Azul Linhas Aéreas</span>
                <span className={styles.partnerBadge}>GOL</span>
                <span className={styles.partnerBadge}>TAP Portugal</span>
                <span className={styles.partnerBadge}>Travelpayouts</span>
              </div>

              <Link
                href="mailto:suporte@destinosincriveis.com.br?subject=Parceria%20Afiliados"
                className={styles.partnerLink}
              >
                Fazer Parceria Comercial
              </Link>
            </div>
          </div>
        </section>

        <BlogSection />
      </main>

      <ChatWidget />
      <Footer />
    </>
  );
}
