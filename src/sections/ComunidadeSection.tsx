"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';

const POSTS = [
  {
    avatar: 'ML',
    name: 'Maria Luiza',
    date: 'Membro desde Jan 2025',
    content:
      'Acabei de descobrir uma vila colonial em MG que parece o interior de Portugal.',
  },
  {
    avatar: 'RC',
    name: 'Rafael Costa',
    date: 'Membro desde Fev 2025',
    content:
      'Fiz o roteiro que a DIJA sugeriu para Lencois e foi a melhor viagem da minha vida.',
  },
  {
    avatar: 'AS',
    name: 'Ana Silva',
    date: 'Membro desde Mar 2025',
    content:
      'Alguem ja foi para a Chapada dos Veadeiros na epoca da seca? Vale a pena?',
  },
];

export default function ComunidadeSection() {
  return (
    <section className="section-padding bg-[var(--bg-surface)]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="w-12 h-12 rounded-full bg-[var(--brand-blue-light)] flex items-center justify-center mx-auto mb-5">
            <MessageCircle size={22} className="text-[var(--brand-blue)]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Quem ja esta explorando o Brasil
          </h2>
          <p className="text-[var(--text-muted)] mt-3 text-sm md:text-base">
            Viajantes reais compartilhando descobertas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POSTS.map((post, idx) => (
            <motion.div
              key={post.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="rounded-[20px] bg-[var(--bg-secondary)] border border-[var(--border-default)] p-6 md:p-8 hover:border-[var(--brand-blue)]/20 transition-all h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--brand-blue-light)] flex items-center justify-center text-[var(--brand-blue)] text-sm font-bold flex-shrink-0">
                    {post.avatar}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">
                      {post.name}
                    </h3>
                    <span className="text-xs text-[var(--text-muted)]">
                      {post.date}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                    {post.content}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[var(--border-subtle)]">
                  <Link
                    href="/comunidade"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-blue)] hover:text-[var(--brand-blue-hover)] transition-colors"
                  >
                    Ver mais
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
