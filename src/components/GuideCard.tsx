"use client";

import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface GuideCardProps {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  date: string;
  readTime: string;
  slug: string;
}

export default function GuideCard({
  title,
  description,
  category,
  imageUrl,
  date,
  readTime,
  slug,
}: GuideCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group flex flex-col bg-card-bg/40 border border-white/5 rounded-2xl overflow-hidden hover:border-brand-blue/20 hover:shadow-[0_12px_30px_rgba(0,0,0,0.3)] transition-all h-full"
    >
      {/* Image container */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-bg/70 via-transparent to-transparent" />
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-bg/85 backdrop-blur-md text-brand-blue border border-brand-blue/20">
          {category}
        </span>
      </div>

      {/* Info Content */}
      <div className="p-6 flex flex-col flex-1 justify-between gap-4">
        <div className="flex flex-col gap-2">
          {/* Metadata */}
          <div className="flex items-center gap-3 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
            <span>{date}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1">
              <Clock size={10} />
              {readTime} de leitura
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white leading-snug group-hover:text-brand-blue transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed mt-1">
            {description}
          </p>
        </div>

        {/* Read More Link */}
        <Link
          href={`/guias/artigo?slug=${slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue group-hover:text-brand-gold self-start transition-colors duration-300 mt-2"
        >
          Ler Guia Completo
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
}
