import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import styles from './BlogCard.module.css';

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  date: string;
  slug: string;
}

interface BlogCardProps {
  article: BlogArticle;
  compact?: boolean;
}

const formatDateStr = (dateStr: string) => {
  if (!dateStr) return "";
  try {
    const parts = dateStr.split('-');
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
export default function BlogCard({ article, compact = false }: BlogCardProps) {
  const hasValidImage = article.imageUrl && (article.imageUrl.startsWith('http://') || article.imageUrl.startsWith('https://') || article.imageUrl.startsWith('/'));
  const imgUrl = hasValidImage 
    ? article.imageUrl 
    : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop";

  const getFallbackImage = () => {
    const isBeach = (article.title && article.title.toLowerCase().includes('praia')) || 
                    (article.category && article.category.toLowerCase().includes('praia')) ||
                    (article.excerpt && article.excerpt.toLowerCase().includes('praia'));
    if (isBeach) {
      return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80";
    }
    return "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80";
  };

  return (
    <article className={styles.card}>
      {/* Image Container */}
      <div className={styles.imageArea}>
        <img
          src={imgUrl}
          alt={article.title}
          className={styles.image}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = getFallbackImage();
          }}
        />
        {/* Category Overlay */}
        <div className={styles.categoryBadge}>
          {article.category}
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.date}>
          <Calendar size={12} />
          <span>{formatDateStr(article.date)}</span>
        </div>

        <h3 className={styles.title}>
          {article.title}
        </h3>

        {!compact && (
          <p className={styles.excerpt}>
            {article.excerpt}
          </p>
        )}

        <div className={styles.footer}>
          <Link href="/blog" className={styles.link}>
            <span>{compact ? "Ler notícia completa" : "Ler mais"}</span>
            <ArrowRight size={14} className={styles.linkIcon} />
          </Link>
        </div>
      </div>
    </article>
  );
}

