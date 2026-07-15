import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

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
    <article className="card flex flex-col h-full group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Category Overlay */}
        <div className="absolute top-4 left-4">
          <span className="bg-[#5BA4CF]/90 backdrop-blur-sm text-[#0A1628] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col gap-3">
        <div className="flex items-center gap-1.5 text-xs text-[#8896A9]">
          <Calendar size={12} />
          <span>{new Date(article.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
        </div>

        <h3 className="text-lg font-bold text-[#0A1628] leading-snug group-hover:text-[#2D7DB8] transition-colors line-clamp-2">
          {article.title}
        </h3>

        <p className="text-sm text-[#8896A9] leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>

        <div className="mt-auto pt-4 flex items-center">
          <Link
            href={`/blog/${article.slug}`}
            className="text-sm font-semibold text-[#2D7DB8] hover:text-[#0A1628] flex items-center gap-1 group/btn"
          >
            <span>Ler artigo completo</span>
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
