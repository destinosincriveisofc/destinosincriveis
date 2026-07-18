"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, RefreshCw, CheckCircle, Zap, Shield } from 'lucide-react';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import HeroSection from '@/components/HeroSection';
import IaConciergeSection from '@/components/IaConciergeSection';
import SocialProof from '@/components/SocialProof';
import BlogCard, { BlogArticle } from '@/components/BlogCard';
import { FlightOffer } from '@/lib/travelpayouts';
import styles from './page.module.css';

const MOCK_ARTICLES: BlogArticle[] = [
  {
    id: "1", title: "Como acumular 100 mil milhas em 3 meses sem gastar mais",
    excerpt: "Descubra as principais estratégias de acúmulo orgânico através de compras bonificadas.",
    content: "", category: "Milhas",
    imageUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-10", slug: "como-acumular-milhas-rapido"
  },
  {
    id: "2", title: "10 destinos internacionais baratos para viajar ainda este ano",
    excerpt: "Países onde o Real é valorizado e o custo é atrativo para brasileiros.",
    content: "", category: "Destinos",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-08", slug: "destinos-internacionais-baratos"
  },
  {
    id: "3", title: "O que é e como aproveitar um Erro Tarifário de passagem aérea",
    excerpt: "Entenda a diferença entre promoção comum e bugs no sistema das companhias aéreas.",
    content: "", category: "Economize",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-05", slug: "erro-tarifario-guia-completo"
  },
  {
    id: "4", title: "Guia definitivo: Como conseguir upgrade para executiva",
    excerpt: "Aprenda as regras de leilão e estratégias para voar com máximo conforto.",
    content: "", category: "Dicas",
    imageUrl: "https://images.unsplash.com/photo-1483450388369-9ed95738483c?q=80&w=600&auto=format&fit=crop",
    date: "2026-06-28", slug: "como-conseguir-upgrade-executiva"
  },
  {
    id: "5", title: "Hotéis de Luxo com desconto de até 50% pelo Booking.com",
    excerpt: "Descubra como o nível Genius do Booking pode reduzir sua diária em resorts.",
    content: "", category: "Economize",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
    date: "2026-06-20", slug: "hoteis-luxo-desconto-booking"
  },
  {
    id: "6", title: "Europa no Inverno: 5 países imperdíveis e baratos",
    excerpt: "Guia completo de viagem pelas cidades mais aconchegantes e baratas da Europa.",
    content: "", category: "Destinos",
    imageUrl: "https://images.unsplash.com/photo-1489440543286-a69330151c0b?q=80&w=600&auto=format&fit=crop",
    date: "2026-06-15", slug: "europa-inverno-destinos-baratos"
  }
];

async function getRealOffers(): Promise<FlightOffer[]> {
  try {
    const res = await fetch('https://destinosincriveis.vps-kinghost.net/api/offers');
    if (!res.ok) throw new Error(`Server returned status ${res.status}`);
    const contentType = res.headers.get("content-type");
    if (contentType && !contentType.includes("application/json")) throw new Error(`Invalid content type: ${contentType}`);
    const dbOffers = await res.json();
    if (!Array.isArray(dbOffers)) throw new Error("Response is not a JSON array");
    if (dbOffers.length === 0) throw new Error("JSON array is empty");

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
      VCP: { name: "Campinas", country: "Brasil", code: "BR" },
      BSB: { name: "Brasília", country: "Brasil", code: "BR" },
      GIG: { name: "Rio de Janeiro", country: "Brasil", code: "BR" }
    };

    const validDbOffers = dbOffers.filter((o: any) => o && o.destino && o.preco_atual !== null);
    if (validDbOffers.length === 0) throw new Error("No valid offers found");

    return validDbOffers.map((dbOffer: any) => {
      const destInfo = airportNames[dbOffer.destino?.toUpperCase()] || { name: dbOffer.destino || "Destino", country: "Destino", code: "UN" };
      const originInfo = airportNames[dbOffer.origem?.toUpperCase()] || { name: dbOffer.origem || "", country: "", code: "" };
      return {
        id: dbOffer.id, origin: dbOffer.origem || "", originName: originInfo.name,
        destination: dbOffer.destino || "", destinationName: destInfo.name,
        countryName: destInfo.country, countryCode: destInfo.code,
        price: Number(dbOffer.preco_atual) || 0,
        originalPrice: Number(dbOffer.preco_original) || Number(dbOffer.preco_atual) || 0,
        departureDate: dbOffer.criado_em ? dbOffer.criado_em.split(' ')[0] : new Date().toISOString().split('T')[0],
        returnDate: "", airline: dbOffer.companhia || "Companhia",
        link: dbOffer.link_afiliado || "", link_afiliado: dbOffer.link_afiliado || "",
        type: dbOffer.tipo || "hotel", imagem_url: dbOffer.imagem_url, criado_em: dbOffer.criado_em || ""
      };
    });
  } catch (e) {
    console.error("Failed to fetch offers:", e);
    return [];
  }
}

function formatPrice(price: number): string {
  return price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function Home() {
  const [alertOffers, setAlertOffers] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>(MOCK_ARTICLES);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerView = isDesktop ? 3 : (isTablet ? 2 : 1);
  const maxIndex = Math.max(0, blogArticles.length - itemsPerView);
  const maxOfferIndex = Math.max(0, alertOffers.length - itemsPerView);

  useEffect(() => {
    if (blogArticles.length <= itemsPerView) return;
    const interval = setInterval(() => {
      setCurrentBlogIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [blogArticles.length, itemsPerView, maxIndex]);

  useEffect(() => {
    if (alertOffers.length <= itemsPerView) return;
    const interval = setInterval(() => {
      setCurrentOfferIndex((prev) => (prev >= maxOfferIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [alertOffers.length, itemsPerView, maxOfferIndex]);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const response = await fetch('https://destinosincriveis.vps-kinghost.net/api/blog');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const mapped: BlogArticle[] = data.map((item: any) => ({
            id: item.id || String(Math.random()), title: item.titulo || '',
            excerpt: item.descricao || '', category: item.categoria === 'blog_publico' ? 'Viagem' : (item.categoria || 'Viagem'),
            imageUrl: item.url || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop',
            date: item.criado_em ? item.criado_em.split(' ')[0] : new Date().toISOString().split('T')[0],
            slug: item.id || 'artigo'
          }));
          const merged = [...mapped];
          MOCK_ARTICLES.forEach(mock => {
            if (merged.length < 6 && !merged.some(m => m.title === mock.title)) merged.push(mock);
          });
          setBlogArticles(merged);
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
      }
    };
    loadBlog();
  }, []);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        const cheapFlights = await getRealOffers();
        const sorted = [...cheapFlights].sort((a: any, b: any) => {
          const va = a.criado_em || a.departureDate || "";
          const vb = b.criado_em || b.departureDate || "";
          return vb.localeCompare(va);
        });
        let list = [...sorted];
        const fallbacks: FlightOffer[] = [
          { id: "fb1", origin: "GRU", originName: "São Paulo", destination: "MIA", destinationName: "Miami", countryName: "Estados Unidos", countryCode: "US", price: 2500, originalPrice: 5000, departureDate: "", returnDate: "", airline: "American Airlines", link: "", link_afiliado: "", type: "voo", imagem_url: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=800&q=80" },
          { id: "fb2", origin: "GRU", originName: "São Paulo", destination: "ROM", destinationName: "Roma Tour", countryName: "Itália", countryCode: "IT", price: 350, originalPrice: 700, departureDate: "", returnDate: "", airline: "GetYourGuide", link: "", link_afiliado: "", type: "passeio", imagem_url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80" },
          { id: "fb3", origin: "GIG", originName: "Rio de Janeiro", destination: "LIS", destinationName: "Lisboa", countryName: "Portugal", countryCode: "PT", price: 3200, originalPrice: 6000, departureDate: "", returnDate: "", airline: "TAP Portugal", link: "", link_afiliado: "", type: "voo", imagem_url: "https://images.unsplash.com/photo-1509840144521-179f323a14ff?auto=format&fit=crop&w=800&q=80" },
          { id: "fb4", origin: "GRU", originName: "São Paulo", destination: "PAR", destinationName: "Paris Tour", countryName: "França", countryCode: "FR", price: 450, originalPrice: 900, departureDate: "", returnDate: "", airline: "GetYourGuide", link: "", link_afiliado: "", type: "passeio", imagem_url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80" },
          { id: "fb5", origin: "GRU", originName: "São Paulo", destination: "EZE", destinationName: "Buenos Aires", countryName: "Argentina", countryCode: "AR", price: 1800, originalPrice: 3500, departureDate: "", returnDate: "", airline: "LATAM", link: "", link_afiliado: "", type: "voo", imagem_url: "https://images.unsplash.com/photo-1589011352121-510c9586143d?auto=format&fit=crop&w=800&q=80" },
          { id: "fb6", origin: "BSB", originName: "Brasília", destination: "MCO", destinationName: "Disney Tour", countryName: "Estados Unidos", countryCode: "US", price: 600, originalPrice: 1200, departureDate: "", returnDate: "", airline: "GetYourGuide", link: "", link_afiliado: "", type: "passeio", imagem_url: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80" }
        ];
        while (list.length < 6) {
          const next = fallbacks[list.length % fallbacks.length];
          list.push({ ...next, id: `${next.id}-${Math.random().toString(36).substr(2, 4)}` });
        }
        setAlertOffers(list.slice(0, 6));
      } catch (e) {
        console.error("Error:", e);
      } finally {
        setLoading(false);
      }
    };
    loadOffers();
  }, []);

  const handlePrevOffer = () => setCurrentOfferIndex((p) => (p === 0 ? maxOfferIndex : p - 1));
  const handleNextOffer = () => setCurrentOfferIndex((p) => (p >= maxOfferIndex ? 0 : p + 1));
  const handlePrevBlog = () => setCurrentBlogIndex((p) => (p === 0 ? maxIndex : p - 1));
  const handleNextBlog = () => setCurrentBlogIndex((p) => (p >= maxIndex ? 0 : p + 1));

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero Section */}
        <HeroSection />

        {/* Ia Concierge */}
        <IaConciergeSection />

        {/* Carrossel de Ofertas */}
        <section id="ofertas" className={styles.sectionIce}>
          <div className={styles.container}>
            <div className={styles.alertHeaderRow}>
              <div className={styles.sectionHeaderLeft}>
                <span className={styles.badge}>Alertas Recentes</span>
                <h2 className={styles.sectionTitle}>Ofertas Imperdíveis</h2>
                <p className={styles.sectionDesc}>
                  Passagens aéreas e ofertas mais baratas encontradas nas últimas horas.
                </p>
              </div>
              <div>
                <Link href="/ofertas" className={styles.buttonOutline}>
                  Ver todas
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {loading ? (
              <div className={styles.loadingContainer}>
                <RefreshCw className="animate-spin text-[#38BDF8]" size={32} />
              </div>
            ) : alertOffers.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#64748b', padding: '2rem 0' }}>
                Nenhuma oferta recente encontrada.
              </div>
            ) : (
              <div className={styles.offerCarouselWrapper}>
                <div
                  className={styles.offerCarouselTrack}
                  style={{
                    transform: `translateX(calc(-${currentOfferIndex} * (var(--offer-slide-width) + var(--offer-gap))))`
                  }}
                >
                  {alertOffers.map((offer) => (
                    <div key={offer.id} className={styles.offerCarouselSlide}>
                      <Link href="/ofertas" className={styles.offerSlideLink}>
                        <div className={styles.offerSlideCard}>
                          <img
                            src={offer.imagem_url || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop"}
                            alt={offer.destinationName || "Destino"}
                            className={styles.offerSlideImage}
                          />
                          <div className={styles.offerSlideDiscount}>
                            {Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100)}% OFF
                          </div>
                          <h3 className={styles.offerSlideTitle}>
                            {offer.destinationName || offer.destination}
                          </h3>
                          <div className={styles.offerSlideOldPrice}>
                            R$ {formatPrice(offer.originalPrice)}
                          </div>
                          <div className={styles.offerSlidePrice}>
                            R$ {formatPrice(offer.price)}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                {maxOfferIndex > 0 && (
                  <>
                    <button onClick={handlePrevOffer} className={styles.offerCarouselArrowLeft} aria-label="Anterior">
                      <ChevronLeft size={20} />
                    </button>
                    <button onClick={handleNextOffer} className={styles.offerCarouselArrowRight} aria-label="Próxima">
                      <ChevronRight size={20} />
                    </button>
                    <div className={styles.offerCarouselIndicators}>
                      {Array.from({ length: maxOfferIndex + 1 }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentOfferIndex(i)}
                          className={`${styles.offerCarouselIndicator} ${currentOfferIndex === i ? styles.offerCarouselIndicatorActive : ''}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Social Proof */}
        <SocialProof />

        {/* Carrossel de Dicas & Notícias */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <div className={styles.alertHeaderRow}>
              <div className={styles.sectionHeaderLeft}>
                <span className={styles.badge}>Dicas & Notícias</span>
                <h2 className={styles.sectionTitle}>Jornal de Viagens</h2>
                <p className={styles.sectionDesc}>
                  Estratégias e rotas selecionadas por nossos analistas.
                </p>
              </div>
              <div>
                <Link href="/blog" className={styles.buttonOutline}>
                  Ver todos
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className={styles.blogCarouselWrapper}>
              <div
                className={styles.blogCarouselTrack}
                style={{
                  transform: `translateX(calc(-${currentBlogIndex} * (var(--blog-slide-width) + var(--blog-gap))))`
                }}
              >
                {blogArticles.map((article) => (
                  <div key={article.id} className={styles.blogCarouselSlide}>
                    <Link href={`/blog/artigo?id=${article.id}`} className={styles.blogSlideLink}>
                      <div className={styles.blogSlideCard}>
                        <img src={article.imageUrl} alt={article.title} className={styles.blogSlideImage} />
                        <div className={styles.blogSlideTag}>{article.category}</div>
                        <h3 className={styles.blogSlideTitle}>{article.title}</h3>
                        <div className={styles.blogSlideDate}>
                          {new Date(article.date).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              {maxIndex > 0 && (
                <>
                  <button onClick={handlePrevBlog} className={styles.blogCarouselArrowLeft} aria-label="Anterior">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={handleNextBlog} className={styles.blogCarouselArrowRight} aria-label="Próxima">
                    <ChevronRight size={20} />
                  </button>
                  <div className={styles.blogCarouselIndicators}>
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentBlogIndex(i)}
                        className={`${styles.blogCarouselIndicator} ${currentBlogIndex === i ? styles.blogCarouselIndicatorActive : ''}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Checkout Rápido R$9,90/mês */}
        <section className={styles.checkoutSection}>
          <div className={styles.container}>
            <div className={styles.checkoutCard}>
              <span className={styles.badge}>Club Dija</span>
              <div className={styles.checkoutPrice}>R$ 9,90</div>
              <div className={styles.checkoutPriceLabel}>por mês • cancele quando quiser</div>
              <div className={styles.checkoutBenefits}>
                <div className={styles.checkoutBenefitItem}>
                  <CheckCircle size={18} className={styles.checkoutBenefitIcon} />
                  <span>Alertas de erros tarifários em tempo real</span>
                </div>
                <div className={styles.checkoutBenefitItem}>
                  <Zap size={18} className={styles.checkoutBenefitIcon} />
                  <span>Guia de Bolso IA 24h para seus roteiros</span>
                </div>
                <div className={styles.checkoutBenefitItem}>
                  <Shield size={18} className={styles.checkoutBenefitIcon} />
                  <span>Comunidade privada de viajantes</span>
                </div>
              </div>
              <Link href="/checkout" className={styles.checkoutBtn}>
                Quero economizar
                <ArrowRight size={18} />
              </Link>
              <div className={styles.checkoutGuarantee}>
                ✓ 7 dias de garantia • Risco zero
              </div>
            </div>
          </div>
        </section>
      </main>

      <ChatWidget />
      <Footer />
    </>
  );
}
