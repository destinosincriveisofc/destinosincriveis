"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import BlogCard, { BlogArticle } from '@/components/BlogCard';
import { Search } from 'lucide-react';
import styles from './page.module.css';

const MOCK_ALL_ARTICLES: BlogArticle[] = [
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
  }
];

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticle[]>(MOCK_ALL_ARTICLES);
  const [filteredArticles, setFilteredArticles] = useState<BlogArticle[]>(MOCK_ALL_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

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
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Page Intro */}
          <div className={styles.pageIntro}>
            <span className={styles.badge}>Inteligência de Viagem</span>
            <h1 className={styles.title}>Dicas & Blog</h1>
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
                  {cat === 'todos' ? 'Todos' : cat}
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
          {filteredArticles.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Nenhum artigo encontrado</p>
              <p className={styles.emptyText}>Tente redefinir seus filtros ou buscar por outro termo.</p>
            </div>
          ) : (
            <div className={styles.grid3}>
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
