"use client";

import React, { useState, useEffect } from 'react';
import { Compass, CheckCircle2, ArrowRight, ShieldCheck, Mail, Phone, Star, RefreshCw } from 'lucide-react';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import OfferCard from '@/components/OfferCard';
import BlogCard, { BlogArticle } from '@/components/BlogCard';
import { FlightOffer } from '@/lib/travelpayouts';
import styles from './page.module.css';

// Mock Blog Articles
const MOCK_ARTICLES: BlogArticle[] = [
  {
    id: "1",
    title: "Como acumular 100 mil milhas em 3 meses sem gastar mais",
    excerpt: "Descubra as principais estratégias de acúmulo orgânico através de compras bonificadas e escolha certa dos cartões de crédito.",
    category: "Milhas",
    imageUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-10",
    slug: "como-acumular-milhas-rapido"
  },
  {
    id: "2",
    title: "10 destinos internacionais baratos para viajar ainda este ano",
    excerpt: "Fizemos o levantamento dos países onde o Real é valorizado e o custo de hospedagem e alimentação é extremamente atrativo para brasileiros.",
    category: "Destinos",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-08",
    slug: "destinos-internacionais-baratos"
  },
  {
    id: "3",
    title: "O que é e como aproveitar um Erro Tarifário de passagem aérea",
    excerpt: "Entenda a diferença entre promoção comum e bugs no sistema das companhias aéreas, e saiba quais são as regras de emissão.",
    category: "Economize",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-05",
    slug: "erro-tarifario-guia-completo"
  }
];

async function getRealOffers(): Promise<FlightOffer[]> {
  try {
    const res = await fetch('/offers.json');
    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }
    const contentType = res.headers.get("content-type");
    if (contentType && !contentType.includes("application/json")) {
      throw new Error(`Invalid content type: ${contentType}`);
    }
    const dbOffers = await res.json();
    if (!Array.isArray(dbOffers)) {
      throw new Error("Response is not a JSON array");
    }
    if (dbOffers.length === 0) {
      throw new Error("JSON array is empty");
    }

    const airportNames: Record<string, { name: string; country: string; code: string }> = {
      EZE: { name: "Buenos Aires", country: "Argentina", code: "AR" },
      SCL: { name: "Santiago", country: "Chile", code: "CL" },
      MIA: { name: "Miami", country: "Estados Unidos", code: "US" },
      MCO: { name: "Orlando", country: "Estados Unidos", code: "US" },
      LIS: { name: "Lisboa", country: "Portugal", code: "PT" },
      MAD: { name: "Madri", country: "Espanha", code: "ES" },
      CDG: { name: "Paris", country: "França", code: "FR" },
      SDU: { name: "Rio de Janeiro", country: "Brasil", code: "BR" },
      SSA: { name: "Salvador", country: "Brasil", code: "BR" },
      REC: { name: "Recife", country: "Brasil", code: "BR" },
      GRU: { name: "São Paulo", country: "Brasil", code: "BR" },
      VCP: { name: "Campinas", country: "Brasil", code: "BR" }
    };
    
    const validDbOffers = dbOffers.filter((o: any) => o && o.origem && o.destino && o.preco_atual !== null && o.preco_atual !== undefined);
    if (validDbOffers.length === 0) {
      throw new Error("No valid offers found after filtering out corrupt ones.");
    }

    return validDbOffers.map((dbOffer: any) => {
      const destInfo = airportNames[dbOffer.destino?.toUpperCase()] || { name: dbOffer.destino || "Destino", country: "Destino", code: "UN" };
      const originInfo = airportNames[dbOffer.origem?.toUpperCase()] || { name: dbOffer.origem || "São Paulo", country: "Brasil", code: "BR" };
      
      return {
        id: dbOffer.id,
        origin: dbOffer.origem || "GRU",
        originName: originInfo.name,
        destination: dbOffer.destino || "",
        destinationName: destInfo.name,
        countryName: destInfo.country,
        countryCode: destInfo.code,
        price: Number(dbOffer.preco_atual) || 0,
        originalPrice: Number(dbOffer.preco_original) || Number(dbOffer.preco_atual) || 0,
        departureDate: dbOffer.criado_em ? dbOffer.criado_em.split(' ')[0] : new Date().toISOString().split('T')[0],
        returnDate: "",
        airline: dbOffer.companhia || "Companhia",
        link: dbOffer.link_afiliado || "",
        link_afiliado: dbOffer.link_afiliado || "",
        type: dbOffer.tipo || "voo",
        imagem_url: dbOffer.imagem_url,
        criado_em: dbOffer.criado_em || ""
      };
    });
  } catch (e) {
    console.error("Robust fetch from /offers.json failed, using fallback:", e);
    try {
      const { fetchCheapFlights } = await import('@/lib/travelpayouts');
      return await fetchCheapFlights();
    } catch (err) {
      console.error("Critical: Fallback mock data import failed:", err);
      return [];
    }
  }
}

export default function Home() {
  const [alertOffers, setAlertOffers] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const cheapFlights = await getRealOffers();
        
        // Sort by criado_em descending just in case to get the absolute most recent first
        const sortedFlights = [...cheapFlights].sort((a: any, b: any) => {
          const valA = a.criado_em || a.departureDate || "";
          const valB = b.criado_em || b.departureDate || "";
          return valB.localeCompare(valA);
        });

        // 1. Get the first item of type 'voo' or 'hotel' (Trip.com)
        let tripOffer = sortedFlights.find(o => o.type === 'voo' || o.type === 'hotel');
        if (!tripOffer) {
          tripOffer = {
            id: "fallback-trip-default",
            origin: "GRU",
            originName: "São Paulo",
            destination: "MIA",
            destinationName: "Miami",
            countryName: "Estados Unidos",
            countryCode: "US",
            price: 2500,
            originalPrice: 5000,
            departureDate: new Date().toISOString().split('T')[0],
            returnDate: "",
            airline: "American Airlines",
            link: "https://trip.tpx.gr/8G2qwgeK",
            link_afiliado: "https://trip.tpx.gr/8G2qwgeK",
            type: "voo",
            imagem_url: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=800&q=80"
          };
        }

        // 2. Get the first item of type 'passeio' (GetYourGuide)
        let gygOffer = sortedFlights.find(o => o.type === 'passeio');
        if (!gygOffer) {
          gygOffer = {
            id: "fallback-gyg-default",
            origin: "GRU",
            originName: "São Paulo",
            destination: "ROM",
            destinationName: "Roma Tour",
            countryName: "Itália",
            countryCode: "IT",
            price: 350,
            originalPrice: 700,
            departureDate: new Date().toISOString().split('T')[0],
            returnDate: "",
            airline: "GetYourGuide",
            link: "https://getyourguide.tpx.gr/ltuk5KJm",
            link_afiliado: "https://getyourguide.tpx.gr/ltuk5KJm",
            type: "passeio",
            imagem_url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80"
          };
        }

        setAlertOffers([tripOffer, gygOffer]);
      } catch (e) {
        console.error("Error loading offers:", e);
      } finally {
        setLoading(false);
      }
    };
    loadOffers();
  }, []);

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* 1. Hero Section */}
        <HeroSection />

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
        <section id="ofertas" className={styles.sectionIce}>
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
              {loading ? (
                <div style={{ gridColumn: 'span 3', display: 'flex', justifyContent: 'center', padding: '2rem 0', width: '100%' }}>
                  <RefreshCw className="animate-spin text-[#5BA4CF]" size={36} />
                </div>
              ) : !Array.isArray(alertOffers) || alertOffers.length === 0 ? (
                <div style={{ gridColumn: 'span 3', textAlign: 'center', color: '#666', padding: '2rem 0', width: '100%' }}>
                  Nenhuma oferta recente encontrada.
                </div>
              ) : (
                Array.isArray(alertOffers) ? alertOffers.map((offer) => (
                  <OfferCard key={offer.id || String(Math.random())} offer={offer} />
                )) : null
              )}
            </div>
          </div>
        </section>

        {/* 5. Club Section */}
        <section id="clube" className={styles.sectionWhite}>
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
                  <Link
                    href="/club"
                    className={styles.buttonPrimary}
                  >
                    Entrar no Club por R$ 19,90/mês
                    <ArrowRight size={18} />
                  </Link>
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
                  <a
                    href="https://wa.me/5511997204445"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.contactItem}
                  >
                    <Phone size={16} className={styles.contactIcon} />
                    <span>WhatsApp VIP: +55 (11) 99720-4445</span>
                  </a>
                  <a
                    href="mailto:suporte@destinosincriveis.com.br"
                    className={styles.contactItem}
                  >
                    <Mail size={16} className={styles.contactIcon} />
                    <span>suporte@destinosincriveis.com.br</span>
                  </a>
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
                href="/parcerias"
                className={styles.partnerLink}
              >
                Fazer Parceria
              </Link>
            </div>
          </div>
        </section>

        {/* 8. Blog Preview Section */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <div className={styles.alertHeaderRow}>
              <div className={styles.sectionHeaderLeft}>
                <span className={styles.badge}>Blog & Dicas</span>
                <h2 className={styles.sectionTitle}>Últimas novidades do blog</h2>
                <p className={styles.sectionDesc}>
                  Fique atualizado com as melhores estratégias e rotas selecionadas por nossos analistas.
                </p>
              </div>
              <div>
                <Link href="/blog" className={styles.buttonOutline}>
                  Ver todos os artigos
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className={styles.grid3}>
              {MOCK_ARTICLES.map((article) => (
                <BlogCard key={article.id} article={article} />
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
