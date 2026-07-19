"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Heart, MessageCircle } from 'lucide-react';
import { DESTINATION_IMAGES, DEFAULT_FALLBACK } from '@/lib/visual-assets';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';
import styles from './BlogCard.module.css';
import offerCardStyles from './OfferCard.module.css';

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  imageUrl: string;
  imagem_url?: string;
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
  const item = {
    ...article,
    destino: (article as any).destino || '',
    imagem_url: article.imagem_url || article.imageUrl || (article as any).url
  };
  const imgToRender = (item.imagem_url && item.imagem_url.startsWith('http')) ? item.imagem_url : ((DESTINATION_IMAGES[item.destino]?.url) || DEFAULT_FALLBACK);

  // State for likes
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Initialize random but stable like count based on ID
  useEffect(() => {
    let hash = 0;
    const str = article.id || "";
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const initialLikes = Math.abs(hash % 45) + 3;
    setLikesCount(initialLikes);
  }, [article.id]);

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const previousLiked = liked;
    const previousCount = likesCount;
    setLiked(!previousLiked);
    setLikesCount(previousLiked ? previousCount - 1 : previousCount + 1);

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const baseUrl = typeof window !== 'undefined' && 
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
          ? 'http://localhost:5001'
          : 'https://destinosincriveis.vps-kinghost.net';
      
      const response = await fetchWithTimeout(`${baseUrl}/api/posts/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post_id: article.id })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setLiked(data.liked);
          setLikesCount(data.likes_count);
        }
      }
    } catch (err) {
      console.error("Error liking post:", err);
      setLiked(previousLiked);
      setLikesCount(previousCount);
    }
  };

  // Backwards-compatible parser for TÍTULO, TEXTO, TAG format
  let displayTitle = article.title;
  let displayExcerpt = article.excerpt;
  let displayTag = article.category || "VIAGEM";

  if (article.excerpt) {
    const titleMatch = article.excerpt.match(/T[ÍI]TULO:\s*(.*?)(?=\n|$|TEXTO:|TAG:)/i);
    const textMatch = article.excerpt.match(/TEXTO:\s*(.*?)(?=\n|$|T[ÍI]TULO:|TAG:)/i);
    const tagMatch = article.excerpt.match(/TAG:\s*(.*?)(?=\n|$|T[ÍI]TULO:|TEXTO:)/i);

    if (titleMatch && titleMatch[1]) {
      displayTitle = titleMatch[1].trim();
    }
    if (textMatch && textMatch[1]) {
      displayExcerpt = textMatch[1].trim();
    }
    if (tagMatch && tagMatch[1]) {
      displayTag = tagMatch[1].trim().toUpperCase();
    }
  }



  return (
    <Link href={`/blog/artigo?id=${article.id}`} className={styles.cardLink}>
      <article className={`${offerCardStyles.card} ${styles.card}`}>
        {/* Image Container */}
        <div className={offerCardStyles.imageArea}>
          <img
            src={imgToRender}
            alt={displayTitle}
            loading="lazy"
            onError={(e) => { e.currentTarget.src = DEFAULT_FALLBACK }}
            className={offerCardStyles.image}
          />
          {/* Category Overlay */}
          <div className={styles.categoryBadge}>
            {displayTag}
          </div>
        </div>

        {/* Content */}
        <div className={offerCardStyles.content}>
          <div className={styles.date}>
            <Calendar size={12} />
            <span>{formatDateStr(article.date)}</span>
          </div>

          <h3 className={styles.title}>
            {displayTitle}
          </h3>

          {!compact && (
            <p className={styles.excerpt}>
              {displayExcerpt}
            </p>
          )}

          {/* Social Feed Actions Row */}
          <div className={styles.socialActions}>
            <div className={styles.actionGroup}>
              <button 
                onClick={handleLike} 
                className={`${styles.actionBtn} ${liked ? styles.liked : ''}`}
                title="Curtir post"
              >
                <Heart size={14} fill={liked ? "currentColor" : "none"} />
                <span>{likesCount} {likesCount === 1 ? 'curtida' : 'curtidas'}</span>
              </button>
              <span className={styles.actionBtn}>
                <MessageCircle size={14} />
                <span>Comentar</span>
              </span>
            </div>
            <span className={styles.link}>
              <span>{compact ? "Ler notícia" : "Ler mais"}</span>
              <ArrowRight size={12} className={styles.linkIcon} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
