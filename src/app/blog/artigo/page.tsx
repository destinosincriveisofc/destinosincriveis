"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, RefreshCw } from 'lucide-react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BlogCard, { BlogArticle } from '@/components/BlogCard';
import styles from './page.module.css';

const MOCK_FALLBACK_ARTICLES: BlogArticle[] = [
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
    content: "Viajar para fora do Brasil pode ser mais barato do que você imagina. Selecionamos destinos onde o custo de vida é baixo e o câmbio favorece o turista brasileiro.\n\nNa América do Sul, Peru e Colômbia lideram. Em Lima, uma refeição completa sai por menos de R$ 40. Em Cusco, a diária em hostels começa em R$ 60.\n\nNa Ásia, Tailândia e Vietnã oferecem acomodações por menos de R$ 100 por noite e comida de rua por R$ 10. Na Europa, Portugal e Polônia têm excelente custo-benefício fora da alta temporada.\n\nA dica: evite alta temporada e compre passagens com 60 dias de antecedência. Use alertas de preço para ser avisado quando o valor cair.",
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
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop",
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
  },
  {
    id: "7",
    title: "Como funciona o stopover gratuito de companhias aéreas",
    excerpt: "Conheça as regras para adicionar uma parada gratuita de alguns dias na cidade de conexão do seu voo sem pagar a mais na passagem.",
    content: "Stopover é uma parada prolongada em uma cidade de conexão, permitindo que você visite dois destinos pelo preço de um. Muitas companhias aéreas oferecem stopover gratuito como benefício.\n\nA TAP Air Portugal é famosa por seu programa Portugal Stopover. Voando do Brasil para a Europa, você pode ficar até 10 dias em Lisboa ou Porto sem pagar nada a mais pela passagem.\n\nA Icelandair oferece stopover na Islândia por até 7 dias em voos entre América do Norte e Europa. A Emirates permite paradas em Dubai, e a Turkish Airlines em Istambul.\n\nPara aproveitar, basta selecionar a opção de múltiplos destinos no site da companhia ou usar o programa oficial de stopover. O hotel pode sair com descontos de até 50% através das parcerias das companhias.",
    category: "Milhas",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-12",
    slug: "como-funciona-stopover-gratuito"
  },
  {
    id: "8",
    title: "Os segredos do seguro viagem do cartão de crédito",
    excerpt: "Entenda como acionar a cobertura de saúde, atraso de bagagem ou cancelamento oferecida gratuitamente pelo seu cartão Visa, Master ou Amex.",
    content: "Seu cartão de crédito pode oferecer seguros viagem gratuitos que poucos conhecem. Dependendo da bandeira e categoria, as coberturas podem chegar a US$ 500 mil em despesas médicas.\n\nCartões Visa Infinite e Mastercard Black oferecem seguro de saúde internacional com cobertura de até US$ 500 mil para o titular e dependentes. Além disso, incluem seguro de bagagem (até US$ 3 mil) e de cancelamento de viagem.\n\nPara acionar, guarde todos os documentos: bilhete aéreo, comprovante do cartão utilizado na compra, relatório médico e boletim de ocorrência em caso de furto. Cada seguradora tem um prazo de 30 a 60 dias para reembolso.\n\nImportante: a compra da passagem deve ser feita integralmente com o cartão que oferece o benefício. Leia as condições gerais do seu cartão para conhecer exatamente os limites e exclusões de cada cobertura.",
    category: "Dicas",
    imageUrl: "https://images.unsplash.com/photo-1589758438311-18e4724a6b20?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-15",
    slug: "segredos-seguro-viagem-cartao"
  },
  {
    id: "9",
    title: "Como planejar um mochilão pela América do Sul gastando pouco",
    excerpt: "Do planejamento de rotas terrestres ao uso de hostels e alimentação local, tudo que você precisa para explorar Peru, Bolívia e Chile.",
    content: "A América do Sul é o playground perfeito para mochileiros. Com planejamento, é possível passar 30 dias explorando três países gastando menos de R$ 5 mil.\n\nComece pelo Peru. Lima tem uma cena gastronômica incrível e barata. De lá, siga para Cusco em ônibus leito (cerca de R$ 150). Em Cusco, hostels custam a partir de R$ 50 a diária e o ingresso para Machu Picchu pode ser comprado online com antecedência.\n\nAtravesse a fronteira para a Bolívia. A Ruta de la Muerte de bicicleta e o Salar de Uyuni são imperdíveis. Os preços são os mais baixos da região: uma refeição completa em La Paz custa cerca de R$ 15.\n\nTermine no Chile. San Pedro de Atacama e o Deserto do Atacama são o ponto alto. O Chile é mais caro, mas a experiência compensa. Use aplicativos como Couchsurfing e BlaBlaCar para reduzir custos de hospedagem e transporte.",
    category: "Destinos",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-16",
    slug: "mochilao-america-do-sul"
  },
  {
    id: "10",
    title: "ChatGPT para Viagens: Como montar roteiros perfeitos em minutos",
    excerpt: "Aprenda a estruturar prompts inteligentes para criar roteiros otimizados, encontrar atrações fora do óbvio e otimizar seu tempo.",
    content: "A inteligência artificial pode ser sua melhor aliada no planejamento de viagens. Com os prompts certos, o ChatGPT cria roteiros detalhados em segundos.\n\nSeja específico: ao invés de \"roteiro para Paris\", peça \"roteiro de 5 dias em Paris para casal interessado em gastronomia e arte, com orçamento médio e hospedagem no Marais\". Quanto mais detalhes, melhor o resultado.\n\nUse o ChatGPT como curador: peça recomendações de restaurantes fora do circuito turístico, horários alternativos para pontos famosos e dicas de transporte local. A IA consegue cruzar avaliações do Google Maps, TripAdvisor e blogs de viagem.\n\nPeça um orçamento estimado: o ChatGPT pode calcular custos médios de alimentação, transporte e atrações com base no seu destino e época da viagem. Use isso como referência para montar sua reserva financeira.",
    category: "Dicas",
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-17",
    slug: "chatgpt-roteiros-viagem"
  }
];

function cleanMarkdown(text: string): string {
  if (!text) return "";
  return text
    .replace(/\\n/g, '\n')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/#+\s+(.*?)(?=\n|$)/g, '$1')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/`{1,3}(.*?)\n?`{1,3}/g, '$1')
    .replace(/^\s*-\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '');
}

const formatDateStr = (dateStr: string) => {
  if (!dateStr) return "";
  try {
    const parts = dateStr.split(' ')[0].split('T')[0].split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];
      const months = [
        "janeiro", "fevereiro", "março", "abril", "maio", "junho",
        "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
      ];
      const mIdx = parseInt(month, 10) - 1;
      if (mIdx >= 0 && mIdx < 12) {
        return `${day} de ${months[mIdx]} de ${year}`;
      }
    }
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch {
    return dateStr;
  }
};

function ArticleReader() {
  const searchParams = useSearchParams();
  const id = searchParams?.get('id') || '';
  const vip = searchParams?.get('vip') === 'true';

  const [post, setPost] = useState<any>(null);
  const [related, setRelated] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      if (!id) {
        // Load fallback if no ID is provided
        setPost({
          id: MOCK_FALLBACK_ARTICLES[0].id,
          titulo: MOCK_FALLBACK_ARTICLES[0].title,
          descricao: MOCK_FALLBACK_ARTICLES[0].excerpt,
          conteudo: MOCK_FALLBACK_ARTICLES[0].content || MOCK_FALLBACK_ARTICLES[0].excerpt,
          url: MOCK_FALLBACK_ARTICLES[0].imageUrl,
          categoria: MOCK_FALLBACK_ARTICLES[0].category,
          criado_em: MOCK_FALLBACK_ARTICLES[0].date
        });
        setRelated(MOCK_FALLBACK_ARTICLES.slice(1, 4));
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // 1. Fetch current post
        const res = await fetchWithTimeout(`https://destinosincriveis.vps-kinghost.net/api/blog/${id}`);
        let currentPost = null;

        if (res.ok) {
          currentPost = await res.json();
        } else {
          // Fallback to mock
          const mock = MOCK_FALLBACK_ARTICLES.find(m => m.id === id);
          if (mock) {
            currentPost = {
              id: mock.id,
              titulo: mock.title,
              descricao: mock.excerpt,
              conteudo: mock.content || mock.excerpt,
              url: mock.imageUrl,
              categoria: mock.category,
              criado_em: mock.date
            };
          }
        }

        if (!currentPost) {
          setError("Artigo não encontrado.");
          setLoading(false);
          return;
        }

        setPost(currentPost);

        // 2. Fetch all to get related
        const listRes = await fetchWithTimeout('https://destinosincriveis.vps-kinghost.net/api/blog');
        let articlesList: BlogArticle[] = [];
        if (listRes.ok) {
          const data = await listRes.json();
          if (Array.isArray(data)) {
            articlesList = data.map((item: any) => ({
              id: item.id || String(Math.random()),
              title: item.titulo || '',
              excerpt: item.descricao || '',
              content: item.conteudo || item.descricao || '',
              category: item.categoria === 'blog_publico' ? 'Viagem' : (item.categoria || 'Viagem'),
              imageUrl: item.url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop',
              date: item.criado_em ? item.criado_em.split(' ')[0] : new Date().toISOString().split('T')[0],
              slug: item.id || 'artigo'
            }));
          }
        }

        // Merge with mocks to have variety
        const mergedList = [...articlesList];
        MOCK_FALLBACK_ARTICLES.forEach(mock => {
          if (!mergedList.some(m => m.title === mock.title)) {
            mergedList.push(mock);
          }
        });

        // Filter out current post, take 3
        const filtered = mergedList
          .filter(a => String(a.id) !== String(id))
          .slice(0, 3);
        setRelated(filtered);

      } catch (err) {
        console.error("Error loading blog details:", err);
        // General fallback
        const mock = MOCK_FALLBACK_ARTICLES.find(m => m.id === id);
        if (mock) {
          setPost({
            id: mock.id,
            titulo: mock.title,
            descricao: mock.excerpt,
            conteudo: mock.content || mock.excerpt,
            url: mock.imageUrl,
            categoria: mock.category,
            criado_em: mock.date
          });
          const filtered = MOCK_FALLBACK_ARTICLES
            .filter(a => a.id !== id)
            .slice(0, 3);
          setRelated(filtered);
        } else {
          setError("Erro ao carregar o artigo.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <RefreshCw className="animate-spin text-[#155EEF]" size={36} />
        <p>Carregando conteúdo do artigo...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorTitle}>Ops!</h2>
        <p className={styles.errorText}>{error || "Artigo não encontrado."}</p>
        <Link href="/blog" className={styles.ctaButton}>
          Voltar para o Blog
        </Link>
      </div>
    );
  }

  let displayTitle = post.titulo || "";
  let displayBody = post.conteudo || post.descricao || "";
  let displayTag = post.categoria === 'blog_publico' ? 'Viagem' : (post.categoria || 'Viagem');

  const parseSource = post.descricao || "";
  if (parseSource.toUpperCase().includes("TEXTO:") || parseSource.toUpperCase().includes("TÍTULO:") || parseSource.toUpperCase().includes("TITULO:")) {
    const titleMatch = parseSource.match(/T[ÍI]TULO:\s*(.*?)(?=\n|$|TEXTO:|TAG:)/i);
    const textMatch = parseSource.match(/TEXTO:\s*(.*?)(?=\n|$|T[ÍI]TULO:|TAG:)/i);
    const tagMatch = parseSource.match(/TAG:\s*(.*?)(?=\n|$|T[ÍI]TULO:|TEXTO:)/i);

    if (titleMatch && titleMatch[1]) {
      displayTitle = titleMatch[1].trim();
    }
    if (!post.conteudo && textMatch && textMatch[1]) {
      displayBody = textMatch[1].trim();
    }
    if (tagMatch && tagMatch[1]) {
      displayTag = tagMatch[1].trim().toUpperCase();
    }
  }

  const cleanBody = cleanMarkdown(displayBody);
  const backHref = vip ? "/dashboard/dicas" : "/blog";
  const backLabel = vip ? "Voltar para as Dicas VIP" : "Voltar para todos os artigos";

  return (
    <main className={styles.main}>
      {/* Hero image full width */}
      <div className={styles.hero}>
        <img
          src={post.url || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80'}
          alt={displayTitle}
          className={styles.heroImage}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80';
          }}
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <span className={styles.category}>{displayTag}</span>
          <h1 className={styles.title}>{displayTitle}</h1>
          <div className={styles.meta}>
            <Calendar size={14} />
            <span>{formatDateStr(post.criado_em)}</span>
          </div>
        </div>
      </div>

      {/* Article Body Container */}
      <div className={styles.bodyContainer}>
        <Link href={backHref} className={styles.backBtn}>
          <ArrowLeft size={16} />
          <span>{backLabel}</span>
        </Link>

        <article className={styles.articleContent}>
          <div className={styles.articleText}>
            {cleanBody.split('\n\n').filter(p => p.trim() !== "").map((para, i) => (
              <p key={i} className={styles.paragraph}>{para}</p>
            ))}
          </div>

          {/* CTA Section */}
          <div className={styles.ctaSection}>
            <h3 className={styles.ctaTitle}>Quero mais dicas assim!</h3>
            <p className={styles.ctaText}>
              No Club Dija você recebe alertas em tempo real de passagens com até 90% de desconto e erros tarifários direto no seu celular!
            </p>
            <Link href="/club" className={styles.ctaButton}>
              Entrar no Club Dija →
            </Link>
          </div>
        </article>

        {/* Travelpayouts Hotel Search Widget */}
        <div className="tp-widget-container-hotel my-8 p-6 bg-slate-900/60 rounded-2xl border border-blue-500/20 max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-blue-400 mb-2">Encontre Hotéis com até 60% de Desconto</h2>
          <p className="text-gray-300 mb-6">
            Pronto para planejar sua estadia? Pesquise hotéis e resorts no nosso buscador de hospedagens parceiro.
          </p>
          <div className="tp-widget-handle-hotel" data-widget-id="hotel-search" />
        </div>

        {/* Related articles */}
        {related.length > 0 && !vip && (
          <div className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>Leia também</h2>
            <div className={styles.relatedGrid}>
              {related.map((article) => (
                <BlogCard key={article.id} article={article} compact={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ArticleDetailPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className={styles.loadingContainer}>
          <RefreshCw className="animate-spin text-[#155EEF]" size={36} />
          <p>Carregando leitor de artigos...</p>
        </div>
      }>
        <ArticleReader />
      </Suspense>
      <ChatWidget />
      <Footer />
    </>
  );
}
