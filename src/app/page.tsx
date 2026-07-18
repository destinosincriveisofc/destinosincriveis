"use client";

import React, { useState, useEffect } from 'react';
import { Compass, CheckCircle2, ArrowRight, ShieldCheck, Mail, Phone, Star, RefreshCw, ChevronLeft, ChevronRight, Bell, Zap, Users, BookOpen, Lightbulb, Hotel, MessageCircle, Heart } from 'lucide-react';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import OfferCard from '@/components/OfferCard';
import BlogCard, { BlogArticle } from '@/components/BlogCard';
import IaConciergeSection from '@/components/IaConciergeSection';
import SocialProof from '@/components/SocialProof';
import { FlightOffer } from '@/lib/travelpayouts';
import { getDestinationImage } from '@/lib/visual-assets';
import styles from './page.module.css';

// Mock Blog Articles
const MOCK_ARTICLES: BlogArticle[] = [
  {
    id: "1",
    title: "Como acumular 100 mil milhas em 3 meses sem gastar mais",
    excerpt: "Descubra as principais estratégias de acúmulo orgânico através de compras bonificadas e escolha certa dos cartões de crédito.",
    content: "Acumular milhas nunca foi tão acessível. Com as estratégias certas, é possível juntar 100 mil milhas em apenas 3 meses sem gastar mais do que você já gasta.\n\nO segredo está em concentrar todos os seus gastos no cartão de crédito que ofereça a melhor pontuação. Cartões como o Infinite da Visa ou o Mastercard Black pontuam de 2,5 a 3 pontos por dólar gasto.\n\nOutra estratégia são as compras bonificadas. Grandes redes como Amazon e Magazine Luiza oferecem até 10 pontos por real gasto quando você acessa através dos shopping centers dos programas de fidelidade.\n\nPor fim, os pacotes de transferência com bônus de até 100% podem transformar 50 mil pontos em 100 mil milhas da noite para o dia.",
    category: "Milhas",
    imageUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-10",
    slug: "como-acumular-milhas-rapido"
  },
  {
    id: "2",
    title: "10 destinos internacionais baratos para viajar ainda este ano",
    excerpt: "Fizemos o levantamento dos países onde o Real é valorizado e o custo de hospedagem e alimentação é extremamente atrativo para brasileiros.",
    content: "Viajar para fora do Brasil pode ser mais barato do que você imagina. Selecionamos destinos onde o custo de vida é baixo e o câmbio favorece o turista brasileiro.\n\nNa América do Sul, Peru e Colômbia lideram. Em Lima, uma refeição completa sai por menos de R$ 40. Em Cusco, a diária em hostels começa em R$ 60. Machu Picchu está a um voo de distância.\n\nNa Ásia, Tailândia e Vietnã oferecem acomodações por menos de R$ 100 por noite e comida de rua por R$ 10. Na Europa, Portugal e Polônia têm excelente custo-benefício fora da alta temporada.\n\nA dica: evite alta temporada e compre passagens com 60 dias de antecedência. Use alertas de preço para ser avisado quando o valor cair.",
    category: "Destinos",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-08",
    slug: "destinos-internacionais-baratos"
  },
  {
    id: "3",
    title: "O que é e como aproveitar um Erro Tarifário de passagem aérea",
    excerpt: "Entenda a diferença entre promoção comum e bugs no sistema das companhias aéreas, e saiba quais são as regras de emissão.",
    content: "Erro tarifário é quando uma companhia aérea publica uma passagem com valor muito abaixo do normal por falha no sistema de precificação. Não é promoção: é um bug. E pode gerar economias de até 90%.\n\nSistemas de precificação dinâmica consideram centenas de variáveis. Quando há falha na atualização de taxas ou conversão de moedas, uma passagem internacional pode sair por R$ 1.500 quando o correto seria R$ 8.000.\n\nA rapidez é essencial. Quando um erro é detectado, a companhia costuma corrigi-lo em horas. O Club Dija monitora centenas de rotas 24h para capturar essas oportunidades.\n\nImportante: a emissão é legal. O Código de Defesa do Consumidor garante que o preço exibido no momento da compra deve ser respeitado pela companhia.",
    category: "Economize",
    imageUrl: "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-05",
    slug: "erro-tarifario-guia-completo"
  },
  {
    id: "4",
    title: "Guia definitivo: Como conseguir upgrade para executiva",
    excerpt: "Aprenda as regras de leilão, uso de milhas da mesma aliança e estratégias no balcão de check-in para voar com máximo conforto.",
    content: "Voar na classe executiva sem pagar o valor cheio é possível com estratégias inteligentes.\n\nA primeira é o leilão de upgrade. Companhias como LATAM e Azul enviam e-mails dias antes do voo convidando passageiros da econômica a dar lances. Um lance de R$ 300 a R$ 800 pode garantir um assento na executiva.\n\nOutra tática é usar milhas para upgrade. O valor em milhas para subir de classe costuma ser bem menor do que para emitir uma passagem executiva inteira.\n\nPor fim, a abordagem no check-in ainda funciona. Se o voo estiver com overbooking na econômica, a companhia pode oferecer upgrade gratuito. Ser educado e chegar cedo aumenta suas chances.",
    category: "Dicas",
    imageUrl: "https://images.unsplash.com/photo-1483450388369-9ed95738483c?q=80&w=600&auto=format&fit=crop",
    date: "2026-06-28",
    slug: "como-conseguir-upgrade-executiva"
  },
  {
    id: "5",
    title: "Hotéis de Luxo com desconto de até 50% pelo Booking.com",
    excerpt: "Descubra como o nível Genius do Booking e cupons de afiliado ocultos podem reduzir pela metade a sua diária em resorts.",
    content: "Hospedar-se em hotéis de luxo pagando metade do preço é estratégia, não sorte. O programa Genius do Booking oferece descontos progressivos que chegam a 20% em mais de 200 mil hotéis.\n\nO nível Genius 3 é o mais vantajoso. Para alcançá-lo, complete 15 reservas ou 30 noites. Os benefícios incluem upgrade de quarto, café da manhã cortesia e descontos exclusivos.\n\nExistem também descontos ocultos de afiliados. Muitos sites parceiros têm tarifas especiais que não aparecem na busca padrão, com descontos adicionais de 5% a 15%.\n\nReserve com 30 dias de antecedência e prefira tarifas reembolsáveis. Assim você pode cancelar sem custo se encontrar preço melhor depois.",
    category: "Economize",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
    date: "2026-06-20",
    slug: "hoteis-luxo-desconto-booking"
  },
  {
    id: "6",
    title: "Europa no Inverno: 5 países imperdíveis e baratos",
    excerpt: "Guia completo de viagem pelas cidades mais aconchegantes e baratas do continente europeu durante a temporada de neve.",
    content: "Viajar pela Europa no inverno é mágico e muito mais em conta. Os preços caem drasticamente entre novembro e março.\n\nPortugal é o número um para brasileiros. Lisboa e Porto têm temperaturas amenas e refeições a partir de 10 euros. A Polônia oferece Cracóvia e Varsóvia com café a 2 euros e refeições por 7 euros.\n\nA Hungria, com Budapeste, é conhecida como a Paris do Leste. A República Tcheca tem cerveja mais barata que água mineral. E a Romênia surpreende com castelos medievais cobertos de neve e preços que lembram o Brasil.",
    category: "Destinos",
    imageUrl: "https://images.unsplash.com/photo-1489440543286-a69330151c0b?q=80&w=600&auto=format&fit=crop",
    date: "2026-06-15",
    slug: "europa-inverno-destinos-baratos"
  }
];

async function getRealOffers(): Promise<FlightOffer[]> {
  try {
    const res = await fetch('https://destinosincriveis.vps-kinghost.net/api/offers');
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
      VCP: { name: "Campinas", country: "Brasil", code: "BR" },
      BSB: { name: "Brasília", country: "Brasil", code: "BR" },
      RIO: { name: "Rio de Janeiro", country: "Brasil", code: "BR" },
      GIG: { name: "Rio de Janeiro", country: "Brasil", code: "BR" }
    };
    
    const validDbOffers = dbOffers.filter((o: any) => o && o.destino && o.preco_atual !== null && o.preco_atual !== undefined);
    if (validDbOffers.length === 0) {
      throw new Error("No valid offers found after filtering out corrupt ones.");
    }

    return validDbOffers.map((dbOffer: any) => {
      const destInfo = airportNames[dbOffer.destino?.toUpperCase()] || { name: dbOffer.destino || "Destino", country: "Destino", code: "UN" };
      const originInfo = airportNames[dbOffer.origem?.toUpperCase()] || { name: dbOffer.origem || "", country: "", code: "" };
      
      return {
        id: dbOffer.id,
        origin: dbOffer.origem || "",
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
        type: dbOffer.tipo || "hotel",
        imagem_url: dbOffer.imagem_url,
        criado_em: dbOffer.criado_em || ""
      };
    });
  } catch (e) {
    console.error("Robust fetch from API failed, using fallback:", e);
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

  const [blogArticles, setBlogArticles] = useState<BlogArticle[]>(MOCK_ARTICLES);
  const [currentBlogIndex, setCurrentBlogIndex] = useState<number>(0);
  const [currentOfferIndex, setCurrentOfferIndex] = useState<number>(0);
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

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const response = await fetch('https://destinosincriveis.vps-kinghost.net/api/blog');
        if (!response.ok) throw new Error('Failed to fetch from blog API');
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          const mapped: BlogArticle[] = data.map((item: any) => ({
            id: item.id || String(Math.random()),
            title: item.titulo || '',
            excerpt: item.descricao || '',
            category: item.categoria === 'blog_publico' ? 'Viagem' : (item.categoria || 'Viagem'),
            imageUrl: item.url || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop',
            date: item.criado_em ? item.criado_em.split(' ')[0] : new Date().toISOString().split('T')[0],
            slug: item.id || 'artigo'
          }));
          
          let merged = [...mapped];
          MOCK_ARTICLES.forEach(mock => {
            if (merged.length < 6 && !merged.some(m => m.title === mock.title)) {
              merged.push(mock);
            }
          });
          setBlogArticles(merged);
        } else {
          setBlogArticles(MOCK_ARTICLES);
        }
      } catch (err) {
        console.error('Error fetching blog articles on home page:', err);
        setBlogArticles(MOCK_ARTICLES);
      }
    };
    loadBlog();
  }, []);

  const itemsPerView = isDesktop ? 3 : (isTablet ? 2 : 1);
  const maxIndex = Math.max(0, blogArticles.length - itemsPerView);
  const maxOfferIndex = Math.max(0, alertOffers.length - itemsPerView);

  useEffect(() => {
    if (blogArticles.length <= itemsPerView) return;
    const interval = setInterval(() => {
      setCurrentBlogIndex((prevIndex) => {
        if (prevIndex >= maxIndex) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [blogArticles.length, itemsPerView, maxIndex]);

  useEffect(() => {
    if (alertOffers.length <= itemsPerView) return;
    const interval = setInterval(() => {
      setCurrentOfferIndex((prevIndex) => {
        if (prevIndex >= maxOfferIndex) {
          return 0;
        }
        return prevIndex + 1;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [alertOffers.length, itemsPerView, maxOfferIndex]);

  const handlePrevBlog = () => {
    setCurrentBlogIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNextBlog = () => {
    setCurrentBlogIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrevOffer = () => {
    setCurrentOfferIndex((prev) => (prev === 0 ? maxOfferIndex : prev - 1));
  };

  const handleNextOffer = () => {
    setCurrentOfferIndex((prev) => (prev >= maxOfferIndex ? 0 : prev + 1));
  };

  const [consultoriaNome, setConsultoriaNome] = useState('');
  const [consultoriaWhatsapp, setConsultoriaWhatsapp] = useState('');
  const [consultoriaOrigem, setConsultoriaOrigem] = useState('');
  const [consultoriaDestino, setConsultoriaDestino] = useState('');
  const [consultoriaMensagem, setConsultoriaMensagem] = useState('');
  const [consultoriaSubmitting, setConsultoriaSubmitting] = useState(false);
  const [showConsultoriaSuccess, setShowConsultoriaSuccess] = useState(false);

  const handleConsultoriaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConsultoriaSubmitting(true);
    try {
      const response = await fetch('https://destinosincriveis.vps-kinghost.net/api/consultoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: consultoriaNome,
          telefone: consultoriaWhatsapp,
          origem: consultoriaOrigem,
          destino: consultoriaDestino,
          mensagem: consultoriaMensagem,
        }),
      });

      if (response.ok) {
        setShowConsultoriaSuccess(true);
        setConsultoriaNome('');
        setConsultoriaWhatsapp('');
        setConsultoriaOrigem('');
        setConsultoriaDestino('');
        setConsultoriaMensagem('');
      } else {
        alert('Erro ao registrar solicitação. Tente novamente mais tarde.');
      }
    } catch (err) {
      console.error(err);
      alert('Erro de conexão. Tente novamente mais tarde.');
    } finally {
      setConsultoriaSubmitting(false);
    }
  };

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

        let publicOffersList = [...sortedFlights];
        
        const defaultFallbacks: FlightOffer[] = [
          {
            id: "fallback-trip-1",
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
          },
          {
            id: "fallback-gyg-1",
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
          },
          {
            id: "fallback-trip-2",
            origin: "GIG",
            originName: "Rio de Janeiro",
            destination: "LIS",
            destinationName: "Lisboa",
            countryName: "Portugal",
            countryCode: "PT",
            price: 3200,
            originalPrice: 6000,
            departureDate: new Date().toISOString().split('T')[0],
            returnDate: "",
            airline: "TAP Portugal",
            link: "https://trip.tpx.gr/8G2qwgeK",
            link_afiliado: "https://trip.tpx.gr/8G2qwgeK",
            type: "voo",
            imagem_url: "https://images.unsplash.com/photo-1509840144521-179f323a14ff?auto=format&fit=crop&w=800&q=80"
          },
          {
            id: "fallback-gyg-2",
            origin: "GRU",
            originName: "São Paulo",
            destination: "PAR",
            destinationName: "Paris Tour",
            countryName: "França",
            countryCode: "FR",
            price: 450,
            originalPrice: 900,
            departureDate: new Date().toISOString().split('T')[0],
            returnDate: "",
            airline: "GetYourGuide",
            link: "https://getyourguide.tpx.gr/ltuk5KJm",
            link_afiliado: "https://getyourguide.tpx.gr/ltuk5KJm",
            type: "passeio",
            imagem_url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
          },
          {
            id: "fallback-trip-3",
            origin: "GRU",
            originName: "São Paulo",
            destination: "EZE",
            destinationName: "Buenos Aires",
            countryName: "Argentina",
            countryCode: "AR",
            price: 1800,
            originalPrice: 3500,
            departureDate: new Date().toISOString().split('T')[0],
            returnDate: "",
            airline: "LATAM Airlines",
            link: "https://trip.tpx.gr/8G2qwgeK",
            link_afiliado: "https://trip.tpx.gr/8G2qwgeK",
            type: "voo",
            imagem_url: "https://images.unsplash.com/photo-1589011352121-510c9586143d?auto=format&fit=crop&w=800&q=80"
          },
          {
            id: "fallback-gyg-3",
            origin: "BSB",
            originName: "Brasília",
            destination: "MCO",
            destinationName: "Disney Tour",
            countryName: "Estados Unidos",
            countryCode: "US",
            price: 600,
            originalPrice: 1200,
            departureDate: new Date().toISOString().split('T')[0],
            returnDate: "",
            airline: "GetYourGuide",
            link: "https://getyourguide.tpx.gr/ltuk5KJm",
            link_afiliado: "https://getyourguide.tpx.gr/ltuk5KJm",
            type: "passeio",
            imagem_url: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=800&q=80"
          }
        ];

        while (publicOffersList.length < 6) {
          const nextFallback = defaultFallbacks[publicOffersList.length % defaultFallbacks.length];
          publicOffersList.push({
            ...nextFallback,
            id: `${nextFallback.id}-${Math.random().toString(36).substr(2, 4)}`
          });
        }
        
        setAlertOffers(publicOffersList.slice(0, 6));
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
        <section className={styles.stepsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.badge}>Metodologia Inteligente</span>
              <h2 className={styles.sectionTitle}>Como economizar em 3 passos</h2>
              <p className={styles.sectionDesc}>
                Nossa tecnologia monitora a variação de preços e avisa você no momento exato de reservar.
              </p>
            </div>

            <div className={styles.stepsRow}>
              {/* Step 1 */}
              <div className={styles.horizontalStepCard}>
                <div className={styles.stepIconWrapper}>
                  1
                </div>
                <h3 className={styles.horizontalStepTitle}>Oportunidades Ocultas</h3>
                <p className={styles.horizontalStepText}>
                  A inteligência artificial encontra oportunidades ocultas, rastreando tarifas de passagens 24h por dia e identificando quedas bruscas de preços e bugs.
                </p>
              </div>

              {/* Step 2 */}
              <div className={styles.horizontalStepCard}>
                <div className={styles.stepIconWrapper}>
                  2
                </div>
                <h3 className={styles.horizontalStepTitle}>Alertas & Roteiros</h3>
                <p className={styles.horizontalStepText}>
                  Você recebe os alertas instantâneos em primeira mão e recomendações de roteiros otimizados pela nossa IA diretamente no seu celular.
                </p>
              </div>

              {/* Step 3 */}
              <div className={styles.horizontalStepCard}>
                <div className={`${styles.stepIconWrapper} ${styles.stepIconWrapperGold}`}>
                  3
                </div>
                <h3 className={styles.horizontalStepTitle}>Viagem com Economia</h3>
                <p className={styles.horizontalStepText}>
                  Você viaja pagando muito menos, emitindo diretamente com a companhia aérea ou parceiro, sem taxas ocultas ou intermediários.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Central de Alertas Section - CARROSSEL */}
        <section id="ofertas" className={styles.sectionIce}>
          <div className={styles.container}>
            {/* Warning Banner */}
            <div className={styles.bannerContainer}>
              <p className={styles.bannerText}>
                📢 <strong>Aviso Importante:</strong> Nossas pesquisas são realizadas em tempo real em horários específicos do dia. Os valores e vagas podem sofrer alterações rápidas pelas companhias e operadoras. Quer garantir os alertas em primeira mão? Entre para o Club Dija!
              </p>
              <Link href="/club" className={styles.bannerBtn}>
                Fazer Parte do Club Dija →
              </Link>
            </div>

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

            {/* CARROSSEL MANUAL COM CONTROLES */}
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                <RefreshCw className="animate-spin text-[#155EEF]" size={36} />
              </div>
            ) : !Array.isArray(alertOffers) || alertOffers.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#666', padding: '2rem 0' }}>
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
                      <OfferCard offer={offer} />
                    </div>
                  ))}
                </div>

                {maxOfferIndex > 0 && (
                  <>
                    <button 
                      onClick={handlePrevOffer}
                      className={styles.offerCarouselArrowLeft}
                      aria-label="Oferta anterior"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button 
                      onClick={handleNextOffer}
                      className={styles.offerCarouselArrowRight}
                      aria-label="Próxima oferta"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {maxOfferIndex > 0 && (
                  <div className={styles.offerCarouselIndicators}>
                    {Array.from({ length: maxOfferIndex + 1 }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentOfferIndex(index)}
                        className={`${styles.offerCarouselIndicator} ${currentOfferIndex === index ? styles.offerCarouselIndicatorActive : ''}`}
                        aria-label={`Ir para o slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Ia Concierge Section */}
        <IaConciergeSection />

        {/* 5. Club Section - Benefícios */}
        <section id="clube" className={styles.sectionWhite}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.badge}>Club Dija Benefícios</span>
              <h2 className={styles.sectionTitle}>Uma comunidade inteligente de viajantes</h2>
              <p className={styles.sectionDesc}>
                Conheça os recursos exclusivos desenvolvidos para você explorar o mundo com economia real e suporte inteligente.
              </p>
            </div>

            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <Bell size={26} />
                </div>
                <h3 className={styles.benefitTitle}>Alertas de Erros Tarifários</h3>
                <p className={styles.benefitDesc}>Bugs de passagens em tempo real. Seja o primeiro a saber e emita antes que a companhia corrija.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <Zap size={26} />
                </div>
                <h3 className={styles.benefitTitle}>Guia de Bolso 24h</h3>
                <p className={styles.benefitDesc}>IA especialista para montar roteiros completos, tirar dúvidas e auxiliar na sua viagem a qualquer hora.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <Users size={26} />
                </div>
                <h3 className={styles.benefitTitle}>Comunidade Privada</h3>
                <p className={styles.benefitDesc}>Relatos de viagens e troca de fotos com outros membros em um grupo exclusivo e acolhedor.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <MessageCircle size={26} />
                </div>
                <h3 className={styles.benefitTitle}>Suporte Especializado</h3>
                <p className={styles.benefitDesc}>Consultoria individual de planejamento de trechos complexos, hotéis e dúvidas de emissão com milhas.</p>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitIcon}>
                  <BookOpen size={26} />
                </div>
                <h3 className={styles.benefitTitle}>Guias & Dicas Diárias</h3>
                <p className={styles.benefitDesc}>Hacks de milhas, cartões de crédito e direitos dos passageiros atualizados 3x ao dia pelos nossos analistas.</p>
              </div>

              <div className={`${styles.benefitCard} ${styles.benefitCardGold}`}>
                <div className={styles.benefitIcon}>
                  <Hotel size={26} />
                </div>
                <h3 className={styles.benefitTitle}>Economia Exclusiva</h3>
                <p className={styles.benefitDesc}>Descontos secretos em hotéis, resorts all-inclusive e ingressos de passeios ao redor do mundo.</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '48px' }}>
              <Link
                href="/checkout"
                className={styles.buttonPrimary}
                style={{ fontSize: '1.05rem', padding: '16px 40px' }}
              >
                Quero fazer parte do Club Dija
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Social Proof & Authority Section */}
        <SocialProof />

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
                <form onSubmit={handleConsultoriaSubmit} className={styles.formGrid}>
                  <div className={styles.formField}>
                    <label className={styles.label}>Nome Completo</label>
                    <input
                      type="text"
                      required
                      value={consultoriaNome}
                      onChange={(e) => setConsultoriaNome(e.target.value)}
                      placeholder="Ex: Juliano Amorin"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.label}>WhatsApp de Contato</label>
                    <input
                      type="tel"
                      required
                      value={consultoriaWhatsapp}
                      onChange={(e) => setConsultoriaWhatsapp(e.target.value)}
                      placeholder="Ex: (11) 99720-4445"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.label}>Origem</label>
                    <input
                      type="text"
                      value={consultoriaOrigem}
                      onChange={(e) => setConsultoriaOrigem(e.target.value)}
                      placeholder="Ex: São Paulo (GRU)"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.label}>Destino Desejado</label>
                    <input
                      type="text"
                      value={consultoriaDestino}
                      onChange={(e) => setConsultoriaDestino(e.target.value)}
                      placeholder="Ex: Roma, Itália"
                      className={styles.input}
                    />
                  </div>
                  <div className={`${styles.formField} ${styles.span2}`}>
                    <label className={styles.label}>Mensagem / Observações</label>
                    <textarea
                      rows={3}
                      required
                      value={consultoriaMensagem}
                      onChange={(e) => setConsultoriaMensagem(e.target.value)}
                      placeholder="Nos fale sobre a sua viagem dos sonhos e o período preferido..."
                      className={`${styles.input} ${styles.textarea}`}
                    />
                  </div>
                  <div className={styles.span2}>
                    <button type="submit" disabled={consultoriaSubmitting} className={styles.submitBtn} style={{ opacity: consultoriaSubmitting ? 0.7 : 1 }}>
                      {consultoriaSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
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
                <span className={styles.badge}>Dicas & Notícias</span>
                <h2 className={styles.sectionTitle}>Jornal de Viagens: Dicas & Notícias</h2>
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

            <div className={styles.blogCarouselWrapper}>
              <div 
                className={styles.blogCarouselTrack}
                style={{
                  transform: `translateX(calc(-${currentBlogIndex} * (var(--blog-slide-width) + var(--blog-gap))))`
                }}
              >
                {blogArticles.map((article) => (
                  <div key={article.id} className={styles.blogCarouselSlide}>
                    <BlogCard article={article} compact={true} />
                  </div>
                ))}
              </div>

              {/* Setas (Arrows) shown only if slider is enabled/needed */}
              {maxIndex > 0 && (
                <>
                  <button 
                    onClick={handlePrevBlog}
                    className={styles.blogCarouselArrowLeft}
                    aria-label="Artigo anterior"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={handleNextBlog}
                    className={styles.blogCarouselArrowRight}
                    aria-label="Próximo artigo"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Indicadores (Dots) shown only if slider is enabled/needed */}
              {maxIndex > 0 && (
                <div className={styles.blogCarouselIndicators}>
                  {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentBlogIndex(index)}
                      className={`${styles.blogCarouselIndicator} ${currentBlogIndex === index ? styles.blogCarouselIndicatorActive : ''}`}
                      aria-label={`Ir para o slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {showConsultoriaSuccess && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          padding: '20px',
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '450px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px',
            }}>
              🎉
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#1e293b',
              marginBottom: '12px',
            }}>
              Solicitação Recebida!
            </h3>
            <p style={{
              fontSize: '15px',
              color: '#64748b',
              lineHeight: '1.6',
              marginBottom: '24px',
            }}>
              Solicitação recebida! Nossa equipe entrará em contato em breve.
            </p>
            <button
              onClick={() => setShowConsultoriaSuccess(false)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#155EEF',
                color: 'white',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4a93be'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#155EEF'}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <ChatWidget />
      <Footer />
    </>
  );
}
