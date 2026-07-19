"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import BlogCard, { BlogArticle } from '@/components/BlogCard';
import { ArrowRight } from 'lucide-react';

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

async function fetchLiveArticles(): Promise<BlogArticle[]> {
  try {
    const apiBase = process.env.NEXT_PUBLIC_HERMES_API || 'https://destinosincriveis.vps-kinghost.net:5001';
    const res = await fetch(`${apiBase}/api/blog`, { cache: 'no-store' });
    if (res.ok) {
      const data: ApiArticle[] = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map(mapApiToBlogArticle);
      }
    }
  } catch (e) {
    console.warn('BlogSection fetch failed:', e);
  }
  return [];
}

const FALLBACK_ARTICLES: BlogArticle[] = [
  {
    id: "1", title: "Como acumular 100 mil milhas em 3 meses sem gastar mais",
    excerpt: "Descubra as principais estratégias de acúmulo orgânico através de compras bonificadas e escolha certa dos cartões de crédito.",
    category: "Milhas", imageUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-10", slug: "como-acumular-milhas-rapido"
  },
  {
    id: "2", title: "10 destinos internacionais baratos para viajar ainda este ano",
    excerpt: "Fizemos o levantamento dos países onde o Real é valorizado e o custo de hospedagem e alimentação é extremamente atrativo para brasileiros.",
    category: "Destinos", imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-08", slug: "destinos-internacionais-baratos"
  },
  {
    id: "3", title: "O que é e como aproveitar um Erro Tarifário de passagem aérea",
    excerpt: "Entenda a diferença entre promoção comum e bugs no sistema das companhias aéreas, e saiba quais são as regras de emissão.",
    category: "Economize", imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-05", slug: "erro-tarifario-guia-completo"
  }
];

export default function BlogSection() {
  const [articles, setArticles] = useState<BlogArticle[]>(FALLBACK_ARTICLES);

  useEffect(() => {
    fetchLiveArticles().then(live => {
      if (live.length > 0) setArticles(live.slice(0, 3));
    });
  }, []);

  return (
    <section className="bg-[#F7F9FC] py-20">
      <div className="container">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-[#5BA4CF] uppercase tracking-wider">Blog & Dicas</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1628] mt-2">Últimas novidades do blog</h2>
            <p className="text-sm md:text-base text-[#8896A9] mt-2">
              Fique atualizado com as melhores estratégias e rotas selecionadas por nossos analistas.
            </p>
          </div>
          <Link href="/blog" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-[#0A1628] text-[#0A1628] rounded-full text-sm font-semibold hover:bg-[#0A1628] hover:text-white transition-all">
            Ver todos os artigos
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>

        <div className="text-center mt-10 md:hidden">
          <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#0A1628] text-[#0A1628] rounded-full text-sm font-semibold hover:bg-[#0A1628] hover:text-white transition-all">
            Ver todos os artigos
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
