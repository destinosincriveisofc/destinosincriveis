"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <img src="/logo-oficial.jpg" alt="Logo" className={styles.logoImage} loading="lazy" />
          <span>
            Destinos<span className={styles.logoHighlight}>Incríveis</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/ofertas" className={styles.navLink}>
            Ofertas
          </Link>
          <Link href="/club" className={styles.navLink}>
            Club Dija
          </Link>
          <Link href="/blog" className={styles.navLink}>
            Dicas & Notícias
          </Link>
          <Link href="/consultoria" className={styles.navLink}>
            Consultoria VIP
          </Link>
          <Link href="/parcerias" className={styles.navLink}>
            Parcerias
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className={styles.ctaContainer}>
          <Link
            href="/login"
            className={styles.loginButton}
          >
            Área de Membros
          </Link>
          <Link
            href="/checkout"
            className={styles.ctaButton}
          >
            Fazer Parte do Club Dija
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={styles.menuButton}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={styles.mobileLink}
          >
            Home
          </Link>
          <Link
            href="/ofertas"
            onClick={() => setIsMobileMenuOpen(false)}
            className={styles.mobileLink}
          >
            Ofertas
          </Link>
          <Link
            href="/club"
            onClick={() => setIsMobileMenuOpen(false)}
            className={styles.mobileLink}
          >
            Club Dija
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className={styles.mobileLink}
          >
            Dicas & Notícias
          </Link>
          <Link
            href="/consultoria"
            onClick={() => setIsMobileMenuOpen(false)}
            className={styles.mobileLink}
          >
            Consultoria VIP
          </Link>
          <Link
            href="/parcerias"
            onClick={() => setIsMobileMenuOpen(false)}
            className={styles.mobileLink}
          >
            Parcerias
          </Link>
          <Link
            href="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className={styles.mobileLogin}
          >
            Área de Membros
          </Link>
          <Link
            href="/checkout"
            onClick={() => setIsMobileMenuOpen(false)}
            className={styles.mobileCta}
          >
            Fazer Parte do Club Dija
          </Link>
        </div>
      )}
    </header>
  );
}
