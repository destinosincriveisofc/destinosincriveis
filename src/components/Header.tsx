"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

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
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-[#5BA4CF]/10 shadow-sm py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-[#0A1628]">
            Destinos<span className="text-[#5BA4CF]">Incríveis</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-[#0A1628] hover:text-[#5BA4CF]">
            Home
          </Link>
          <Link href="/ofertas" className="text-sm font-medium text-[#0A1628] hover:text-[#5BA4CF]">
            Ofertas
          </Link>
          <Link href="/club" className="text-sm font-medium text-[#0A1628] hover:text-[#5BA4CF]">
            Club Exclusivo
          </Link>
          <Link href="/blog" className="text-sm font-medium text-[#0A1628] hover:text-[#5BA4CF]">
            Dicas & Blog
          </Link>
          <Link href="/consultoria" className="text-sm font-medium text-[#0A1628] hover:text-[#5BA4CF]">
            Consultoria VIP
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/club"
            className="pill-button pill-button-primary flex items-center gap-2"
          >
            Fazer Parte do Club
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#0A1628] hover:text-[#5BA4CF]"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-[#5BA4CF]/10 shadow-lg py-6 px-6 flex flex-col gap-4 animate-fadeIn">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-semibold text-[#0A1628] py-2 border-b border-gray-50"
          >
            Home
          </Link>
          <Link
            href="/ofertas"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-semibold text-[#0A1628] py-2 border-b border-gray-50"
          >
            Ofertas
          </Link>
          <Link
            href="/club"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-semibold text-[#0A1628] py-2 border-b border-gray-50"
          >
            Club Exclusivo
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-semibold text-[#0A1628] py-2 border-b border-gray-50"
          >
            Dicas & Blog
          </Link>
          <Link
            href="/consultoria"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-base font-semibold text-[#0A1628] py-2 border-b border-gray-50"
          >
            Consultoria VIP
          </Link>
          <Link
            href="/club"
            onClick={() => setIsMobileMenuOpen(false)}
            className="pill-button pill-button-primary mt-2 text-center"
          >
            Fazer Parte do Club
          </Link>
        </div>
      )}
    </header>
  );
}
