"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import TravelGlobe from '@/components/TravelGlobe';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-blue/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-gold/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Hero Left Content */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 self-start px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-blue/10 border border-brand-blue/20 text-brand-blue backdrop-blur-md"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span>O futuro das viagens chegou</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-heading"
          >
            Descubra seu <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-brand-blue via-brand-blue to-brand-gold bg-clip-text text-transparent">
              próximo destino.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 font-normal leading-relaxed max-w-xl"
          >
            Explore lugares incríveis, encontre experiências únicas e planeje sua próxima aventura com auxílio do nosso copiloto inteligente.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-2"
          >
            <Link
              href="/explorar"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold bg-gradient-to-r from-brand-gold to-brand-gold-dark text-primary-bg shadow-[0_4px_14px_rgba(255,193,7,0.3)] hover:shadow-[0_8px_24px_rgba(255,193,7,0.4)] hover:scale-105 active:scale-98 transition-all"
            >
              <Compass size={18} />
              Explorar destinos
            </Link>
            <Link
              href="/dija-ai"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold text-brand-blue border border-brand-blue/30 hover:border-brand-blue bg-white/[0.02] hover:bg-brand-blue/5 hover:scale-105 active:scale-98 transition-all"
            >
              Planejar minha viagem
              <ArrowRight size={18} />
            </Link>
          </motion.div>

          {/* Mini Tech Spec Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-wrap gap-x-6 gap-y-2 mt-6 pt-6 border-t border-white/5 text-xs text-gray-400 font-medium tracking-wide uppercase"
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-ping" />
              100% Curadoria Tecnológica
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
              DIJA AI Copilot Integrado
            </span>
          </motion.div>
        </div>

        {/* Hero Right Visual (Globe Widget) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          {/* Glassmorphic decorative card wrap */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/5 to-brand-gold/5 rounded-full blur-[80px] z-0 pointer-events-none" />
          
          <div className="relative z-10 w-full flex justify-center">
            <TravelGlobe />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
