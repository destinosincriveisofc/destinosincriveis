"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, RefreshCw } from 'lucide-react';
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
  },
  {
    id: "4",
    title: "Guia definitivo: Como conseguir upgrade para executiva",
    excerpt: "Aprenda as regras de leilão, uso de milhas da mesma aliança e estratégias no balcão de check-in para voar com máximo conforto.",
    category: "Dicas",
    imageUrl: "https://images.unsplash.com/photo-1483450388369-9ed95738483c?q=80&w=600&auto=format&fit=crop",
    date: "2026-06-28",
    slug: "como-conseguir-upgrade-executiva"
  },
  {
    id: "5",
    title: "Hotéis de Luxo com desconto de até 50% pelo Booking.com",
    excerpt: "Descubra como o nível Genius do Booking e cupons de afiliado ocultos podem reduzir pela metade a sua diária em resorts.",
    category: "Economize",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
    date: "2026-06-20",
    slug: "hoteis-luxo-desconto-booking"
  },
  {
    id: "6",
    title: "Europa no Inverno: 5 países imperdíveis e baratos",
    excerpt: "Guia completo de viagem pelas cidades mais aconchegantes e baratas do continente europeu durante a temporada de neve.",
    category: "Destinos",
    imageUrl: "https://images.unsplash.com/photo-1489440543286-a69330151c0b?q=80&w=600&auto=format&fit=crop",
    date: "2026-06-15",
    slug: "europa-inverno-destinos-baratos"
  },
  {
    id: "7",
    title: "Como funciona o stopover gratuito de companhias aéreas",
    excerpt: "Conheça as regras para adicionar uma parada gratuita de alguns dias na cidade de conexão do seu voo sem pagar a mais na passagem.",
    category: "Milhas",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-12",
    slug: "como-funciona-stopover-gratuito"
  },
  {
    id: "8",
    title: "Os segredos do seguro viagem do cartão de crédito",
    excerpt: "Entenda como acionar a cobertura de saúde, atraso de bagagem ou cancelamento oferecida gratuitamente pelo seu cartão Visa, Master ou Amex.",
    category: "Dicas",
    imageUrl: "https://images.unsplash.com/photo-1589758438311-18e4724a6b20?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-15",
    slug: "segredos-seguro-viagem-cartao"
  },
  {
    id: "9",
    title: "Como planejar um mochilão pela América do Sul gastando pouco",
    excerpt: "Do planejamento de rotas terrestres ao uso de hostels e alimentação local, tudo que você precisa para explorar Peru, Bolívia e Chile.",
    category: "Destinos",
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-16",
    slug: "mochilao-america-do-sul"
  },
  {
    id: "10",
    title: "ChatGPT para Viagens: Como montar roteiros perfeitos em minutos",
    excerpt: "Aprenda a estruturar prompts inteligentes para criar roteiros otimizados, encontrar atrações fora do óbvio e otimizar seu tempo.",
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
        const res = await fetch(`https://destinosincriveis.vps-kinghost.net/api/blog/${id}`);
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
        const listRes = await fetch('https://destinosincriveis.vps-kinghost.net/api/blog');
        let articlesList: BlogArticle[] = [];
        if (listRes.ok) {
          const data = await listRes.json();
          if (Array.isArray(data)) {
            articlesList = data.map((item: any) => ({
              id: item.id || String(Math.random()),
              title: item.titulo || '',
              excerpt: item.descricao || '',
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

  // Parse TÍTULO: ... TEXTO: ... TAG: ... format if present
  let displayTitle = post.titulo || "";
  let displayBody = post.descricao || "";
  let displayTag = post.categoria === 'blog_publico' ? 'Viagem' : (post.categoria || 'Viagem');

  if (post.descricao) {
    const titleMatch = post.descricao.match(/T[ÍI]TULO:\s*(.*?)(?=\n|$|TEXTO:|TAG:)/i);
    const textMatch = post.descricao.match(/TEXTO:\s*(.*?)(?=\n|$|T[ÍI]TULO:|TAG:)/i);
    const tagMatch = post.descricao.match(/TAG:\s*(.*?)(?=\n|$|T[ÍI]TULO:|TEXTO:)/i);

    if (titleMatch && titleMatch[1]) {
      displayTitle = titleMatch[1].trim();
    }
    if (textMatch && textMatch[1]) {
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
          <div className={styles.articleText}>{cleanBody}</div>

          {/* CTA Section */}
          <div className={styles.ctaSection}>
            <h3 className={styles.ctaTitle}>Quero mais dicas assim!</h3>
            <p className={styles.ctaText}>
              No Club Dija você recebe alertas em tempo real de passagens com até 90% de desconto e erros tarifários direto no seu celular!
            </p>
            <Link href="/checkout" className={styles.ctaButton}>
              Entrar no Club Dija →
            </Link>
          </div>
        </article>

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
