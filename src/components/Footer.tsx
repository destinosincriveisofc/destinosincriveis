import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-default)] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-14">
        <div className="flex flex-col gap-5">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-[var(--brand-blue)] flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
              <span className="text-sm font-black text-white">DI</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
              Destinos<span className="text-[var(--brand-blue)]">Incríveis</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-[var(--text-muted)] max-w-xs">
            A plataforma brasileira para descobrir, planejar e viver experiências de viagem autênticas pelo Brasil.
          </p>
          <div className="flex items-center gap-3 mt-1">
            <a
              href="https://www.instagram.com/destinosincriveis.ofc/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-[var(--brand-blue-light)] hover:bg-[var(--brand-blue)] hover:text-white flex items-center justify-center text-[var(--text-muted)] transition-all"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://www.tiktok.com/@destinosincriveis.ofc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-[var(--brand-blue-light)] hover:bg-[var(--brand-blue)] hover:text-white flex items-center justify-center text-[var(--text-muted)] transition-all"
              aria-label="TikTok"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5.006 5.004" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@destinosincriveis.oficial"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-[var(--brand-blue-light)] hover:bg-[var(--brand-blue)] hover:text-white flex items-center justify-center text-[var(--text-muted)] transition-all"
              aria-label="YouTube"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:pl-10 lg:border-l lg:border-[var(--border-subtle)]">
          <h4 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">Descobrir</h4>
          <nav className="flex flex-col gap-3 text-sm">
            <Link href="/explorar" className="text-[var(--text-muted)] hover:text-[var(--brand-blue)] transition-colors">Descobrir Destinos</Link>
            <Link href="/destinos" className="text-[var(--text-muted)] hover:text-[var(--brand-blue)] transition-colors">Destinos</Link>
            <Link href="/experiencias" className="text-[var(--text-muted)] hover:text-[var(--brand-blue)] transition-colors">Experiências</Link>
            <Link href="/guias" className="text-[var(--text-muted)] hover:text-[var(--brand-blue)] transition-colors">Guias de Viagem</Link>
            <Link href="/dija-ai" className="text-[var(--text-muted)] hover:text-[var(--brand-blue)] transition-colors">DIJA AI</Link>
            <Link href="/club" className="text-[var(--text-muted)] hover:text-[var(--brand-blue)] transition-colors">Clube</Link>
          </nav>
        </div>

        <div className="flex flex-col gap-5 lg:pl-10 lg:border-l lg:border-[var(--border-subtle)]">
          <h4 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">Atendimento</h4>
          <div className="flex flex-col gap-3 text-sm">
            <a
              href="https://wa.me/5511997204445"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--brand-blue)] transition-colors group"
            >
              <MessageSquare size={16} className="text-[var(--brand-blue)] shrink-0" />
              <span>WhatsApp</span>
              <ArrowUpRight size={12} className="opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="tel:+5511997204445"
              className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Phone size={16} className="text-[var(--brand-blue)] shrink-0" />
              <span>+55 (11) 99720-4445</span>
            </a>
            <a
              href="mailto:suporte@destinosincriveis.com.br"
              className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Mail size={16} className="text-[var(--brand-blue)] shrink-0" />
              <span>suporte@destinosincriveis.com.br</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:pl-10 lg:border-l lg:border-[var(--border-subtle)]">
          <h4 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">Sobre</h4>
          <p className="text-sm leading-relaxed text-[var(--text-muted)]">
            Uma plataforma brasileira que une tecnologia e curadoria para transformar a forma como você descobre o Brasil.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
        <p>&copy; {new Date().getFullYear()} Destinos Incríveis. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <Link href="/termos" className="hover:text-[var(--brand-blue)] transition-colors">Termos de Uso</Link>
          <Link href="/privacidade" className="hover:text-[var(--brand-blue)] transition-colors">Privacidade</Link>
        </div>
      </div>
    </footer>
  );
}
