"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BlogCard, { BlogArticle } from '@/components/BlogCard';
import { Search } from 'lucide-react';

const MOCK_ARTICLES: BlogArticle[] = [
  {
    id: "mock-1",
    title: "O que é e como aproveitar um Erro Tarifário de passagem aérea",
    excerpt: "Entenda a diferença entre promoção comum e bugs no sistema das companhias aéreas, e saiba quais são as regras de emissão.",
    category: "Dicas",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-15",
    slug: "o-que-e-e-como-aproveitar-um-erro-tarifario-de-passagem-aerea"
  },
  {
    id: "mock-2",
    title: "Como usar milhas para voar na Classe Executiva pagando preço de Econômica",
    excerpt: "Estratégias avançadas de emissão com milhas para upgrades de cabine nas principais alianças aéreas mundiais.",
    category: "Milhas",
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-10",
    slug: "como-usar-milhas-para-voar-na-classe-executiva-pagando-preco-de-economica"
  },
  {
    id: "mock-3",
    title: "Destinos nacionais com melhor custo-benefício em 2026",
    excerpt: "Selecionamos os 10 destinos brasileiros onde seu dinheiro rende mais: hospedagem, alimentação e passeios baratos.",
    category: "Destinos",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-05",
    slug: "destinos-nacionais-com-melhor-custo-beneficio-em-2026"
  },
  {
    id: "mock-4",
    title: "Guia completo: Como monitorar preços de passagens 24/7",
    excerpt: "Ferramentas gratuitas e pagas, extensões de navegador e automações para nunca mais perder uma promoção relâmpago.",
    category: "Economize",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-01",
    slug: "guia-completo-como-monitorar-precos-de-passagens-24-7"
  }
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

interface ApiArticle {
  id: string;
  titulo: string;
  descricao: string;
  url: string;
  tipo: string;
  categoria: string;
  criado_em: string;
  vip_only: number;
}

function mapApiToBlogArticle(api: ApiArticle): BlogArticle {
  return {
    id: api.id,
    title: api.titulo,
    excerpt: api.descricao,
    category: api.categoria === 'dicas_vip' ? 'Dicas' : api.categoria,
    imageUrl: api.url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop',
    date: api.criado_em ? api.criado_em.split(' ')[0] : new Date().toISOString().split('T')[0],
    slug: slugify(api.titulo)
  };
}

async function fetchBlogArticles(): Promise<BlogArticle[]> {
  try {
    const res = await fetch('/api/blog', { cache: 'no-store' })
      .catch(err => {
        console.error("Blog fetch aborted/blocked, falling back:", err);
        return null;
      });
    if (!res) return [];
    if (res.ok) {
      const data: ApiArticle[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(mapApiToBlogArticle);
      }
    }
  } catch (e) {
    console.warn('Failed to fetch blog articles, using fallback:', e);
  }
  return [];
}

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<BlogArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchBlogArticles();
        if (data && data.length > 0) {
          setArticles(data);
          setFilteredArticles(data);
        } else {
          setArticles(MOCK_ARTICLES);
          setFilteredArticles(MOCK_ARTICLES);
        }
      } catch (err) {
        console.warn('Failed to fetch blog articles, using mock fallback:', err);
        setArticles(MOCK_ARTICLES);
        setFilteredArticles(MOCK_ARTICLES);
      } finally {
        setLoading(false);
      }
    };
    load();
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

  const categories = ['todos', 'dicas', 'destinos', 'milhas', 'economize'];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-transparent pt-32 pb-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-3">
            <span className="text-xs font-bold text-[#5BA4CF] uppercase tracking-wider">Inteligência de Viagem</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white">Dicas & Blog</h1>
            <p className="text-sm md:text-base text-[#94A3B8]">
              Descubra estratégias exclusivas de milhas, erros tarifários e guias completos para economizar de verdade nas suas viagens.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm flex flex-col lg:flex-row gap-6 items-center justify-between mb-10 backdrop-blur-sm">
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                    selectedCategory === cat
                      ? 'bg-white text-[#0A122C]'
                      : 'bg-white/5 text-white/70 hover:bg-white/10'
                  }`}
                >
                  {cat === 'todos' ? 'Todos' : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar artigo..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm text-white focus:outline-none focus:border-[#5BA4CF] transition-colors placeholder-gray-400"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 bg-transparent border border-sky-500/10 rounded-2xl shadow-sm">
              <div className="animate-spin w-8 h-8 border-4 border-[#5BA4CF] border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-base font-semibold text-white">Carregando artigos...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-20 bg-transparent border border-sky-500/10 rounded-2xl shadow-sm">
              <p className="text-base font-semibold text-white mb-2">Nenhum artigo encontrado</p>
              <p className="text-sm text-[#94A3B8]">Tente redefinir seus filtros ou buscar por outro termo.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
