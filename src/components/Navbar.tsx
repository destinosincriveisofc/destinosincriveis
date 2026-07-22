"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Compass, Plane, BookOpen, Sun, Brain, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/explorar', label: 'Explorar 🌎' },
  { href: '/destinos', label: 'Destinos ✈️' },
  { href: '/guias', label: 'Guias 📚' },
  { href: '/experiencias', label: 'Experiências 🌅' },
  { href: '/dija-ai', label: 'DIJA AI 🧠' },
  { href: '/club', label: 'Clube ⭐' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-primary-bg/80 backdrop-blur-md border-b border-white/10 py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-gold p-0.5 flex items-center justify-center shadow-md transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-primary-bg rounded-[10px] flex items-center justify-center">
              <span className="text-lg font-black text-brand-blue group-hover:text-brand-gold transition-colors">DI</span>
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            Destinos<span className="text-brand-blue">Incríveis</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'text-white bg-white/5' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-blue rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Acessar Conta
          </Link>
          <Link
            href="/club"
            className="relative group px-5 py-2.5 rounded-full text-sm font-bold text-primary-bg overflow-hidden transition-all shadow-[0_4px_14px_rgba(255,193,7,0.2)] hover:shadow-[0_6px_20px_rgba(255,193,7,0.3)] bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Fazer Parte
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-gray-300 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-primary-bg/95 backdrop-blur-lg border-b border-white/10 shadow-2xl py-6 px-6 lg:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl text-base font-semibold ${
                    isActive
                      ? 'bg-brand-blue/10 text-brand-blue'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight size={16} className="opacity-50" />
                </Link>
              );
            })}
            <hr className="border-white/10 my-2" />
            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl border border-white/10 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
              >
                Acessar Conta
              </Link>
              <Link
                href="/club"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-dark text-sm font-bold text-primary-bg shadow-lg transition-transform active:scale-95"
              >
                Fazer Parte do Clube
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
