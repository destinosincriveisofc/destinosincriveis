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
}

export default function BlogCard({ article }: BlogCardProps) {
  return (
    <article className={styles.card}>
      {/* Image Container */}
      <div className={styles.imageArea}>
        <img
          src={article.imageUrl}
          alt={article.title}
          className={styles.image}
          loading="lazy"
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
          <span>{new Date(article.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
        </div>

        <h3 className={styles.title}>
          {article.title}
        </h3>

        <p className={styles.excerpt}>
          {article.excerpt}
        </p>

        <div className={styles.footer}>
          <Link href="/blog" className={styles.link}>
            <span>Ler mais</span>
            <ArrowRight size={14} className={styles.linkIcon} />
          </Link>
        </div>
      </div>
    </article>
  );
}
