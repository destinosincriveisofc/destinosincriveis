"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BlogCard, { BlogArticle } from '@/components/BlogCard';
import { Search, RefreshCw } from 'lucide-react';
import styles from './page.module.css';

const MOCK_ALL_ARTICLES: BlogArticle[] = [
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

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>(MOCK_ALL_ARTICLES);
  const [filteredArticles, setFilteredArticles] = useState<BlogArticle[]>(MOCK_ALL_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchBlog() {
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
            imageUrl: item.url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop',
            date: item.criado_em ? item.criado_em.split(' ')[0] : new Date().toISOString().split('T')[0],
            slug: item.id || 'artigo'
          }));
          
          const merged = [...mapped];
          MOCK_ALL_ARTICLES.forEach(mock => {
            if (merged.length < 10 && !merged.some(m => m.title === mock.title)) {
              merged.push(mock);
            }
          });
          setArticles(merged);
        } else {
          setArticles(MOCK_ALL_ARTICLES);
        }
      } catch (err) {
        console.error('Error fetching blog articles:', err);
        setArticles(MOCK_ALL_ARTICLES);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, []);

  useEffect(() => {
    let result = articles;

    if (selectedCategory !== 'todos') {
      result = result.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        a =>
          a.title.toLowerCase().includes(term) ||
          a.excerpt.toLowerCase().includes(term) ||
          a.category.toLowerCase().includes(term)
      );
    }

    setFilteredArticles(result);
  }, [selectedCategory, searchTerm, articles]);

  const categories = ['todos', ...Array.from(new Set(articles.map(a => a.category.toLowerCase())))];

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Page Intro */}
          <div className={styles.pageIntro}>
            <span className={styles.badge}>Inteligência de Viagem</span>
            <h1 className={styles.title}>Dicas & Notícias</h1>
            <p className={styles.description}>
              Descubra estratégias exclusivas de milhas, erros tarifários e guias completos para economizar de verdade nas suas viagens.
            </p>
          </div>

          {/* Filtering Section */}
          <div className={styles.filtersContainer}>
            {/* Category selector */}
            <div className={styles.btnGroup}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`${styles.filterBtn} ${selectedCategory === cat ? styles.filterBtnActive : ''}`}
                >
                  {cat === 'todos' ? 'Todos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className={styles.searchWrapper}>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar artigo..."
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
              <RefreshCw className="animate-spin text-[#155EEF]" size={36} />
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Nenhum artigo encontrado</p>
              <p className={styles.emptyText}>Tente redefinir seus filtros ou buscar por outro termo.</p>
            </div>
          ) : (
            <div className={styles.feedContainer}>
              {filteredArticles.map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </main>
      <ChatWidget />
      <Footer />
    </>
  );
}
