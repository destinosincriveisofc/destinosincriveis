"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Compass, MapPin, BookOpen, Brain, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/explorar', label: 'Descobrir', icon: Compass },
  { href: '/destinos', label: 'Destinos', icon: MapPin },
  { href: '/experiencias', label: 'Experiências', icon: BookOpen },
  { href: '/guias', label: 'Guias', icon: BookOpen },
  { href: '/dija-ai', label: 'DIJA AI', icon: Brain },
  { href: '/club', label: 'Clube', icon: Star },
];

const mobileItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.25 },
  }),
};

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[var(--bg-secondary)]/80 backdrop-blur-xl border-b border-[var(--border-default)] py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[var(--brand-blue)] flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
            <span className="text-sm font-black text-white">DI</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
            Destinos<span className="text-[var(--brand-blue)]">Incríveis</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[var(--brand-blue)] bg-[var(--brand-blue-light)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--brand-blue)] hover:bg-[var(--brand-blue-light)]'
                }`}
              >
                <Icon size={14} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--brand-blue)] transition-colors px-3 py-2"
          >
            Entrar
          </Link>
          <Link
            href="/club"
            className="relative group px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all bg-[var(--brand-gold)] hover:bg-amber-600 shadow-[var(--shadow-btn-gold)] hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Club DIJA — R$ 9,90
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--brand-blue)] rounded-xl hover:bg-[var(--brand-blue-light)] transition-colors"
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[var(--bg-secondary)]/95 backdrop-blur-xl border-b border-[var(--border-default)] shadow-lg py-4 px-6 lg:hidden flex flex-col gap-1"
          >
            {navLinks.map((link, i) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-xl text-sm font-semibold ${
                      isActive
                        ? 'bg-[var(--brand-blue-light)] text-[var(--brand-blue)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--brand-blue-light)]'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{link.label}</span>
                    <ArrowRight size={14} className="ml-auto opacity-30" />
                  </Link>
                </motion.div>
              );
            })}
            <hr className="border-[var(--border-subtle)] my-2" />
            <motion.div
              custom={navLinks.length}
              variants={mobileItemVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full block text-center py-3 rounded-xl border border-[var(--border-default)] text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--brand-blue)] transition-colors"
              >
                Entrar
              </Link>
            </motion.div>
            <motion.div
              custom={navLinks.length + 1}
              variants={mobileItemVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                href="/club"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full block text-center py-3 rounded-xl bg-[var(--brand-gold)] text-sm font-semibold text-white shadow-[var(--shadow-btn-gold)] hover:bg-amber-600 transition-colors"
              >
                Club DIJA — R$ 9,90/mês
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
