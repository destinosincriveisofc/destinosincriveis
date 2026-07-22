import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-bg border-t border-white/10 pt-16 pb-8 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-gold p-0.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-primary-bg rounded-[10px] flex items-center justify-center">
                <span className="text-lg font-black text-brand-blue">DI</span>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Destinos<span className="text-brand-blue">Incríveis</span>
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-400">
            O copiloto inteligente para descobrir, planejar e viver experiências de viagem incríveis pelo mundo.
          </p>
          {/* Social Links */}
          <div className="flex items-center gap-3 mt-2">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/destinosincriveis.ofc/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-blue/15 hover:text-brand-blue flex items-center justify-center text-gray-300 transition-all"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@destinosincriveis.ofc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-blue/15 hover:text-brand-blue flex items-center justify-center text-gray-300 transition-all"
              aria-label="TikTok"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5.006 5.004" />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href="https://www.youtube.com/@destinosincriveis.oficial"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/5 hover:bg-brand-blue/15 hover:text-brand-blue flex items-center justify-center text-gray-300 transition-all"
              aria-label="YouTube"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.46 8.59.46 8.59.46s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4 lg:pl-8 lg:border-l lg:border-white/5">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Explorar</h4>
          <nav className="flex flex-col gap-2.5 text-sm">
            <Link href="/explorar" className="hover:text-brand-blue transition-colors">Descobrir Destinos</Link>
            <Link href="/destinos" className="hover:text-brand-blue transition-colors">Países & Roteiros</Link>
            <Link href="/guias" className="hover:text-brand-blue transition-colors">Revista & Guias</Link>
            <Link href="/experiencias" className="hover:text-brand-blue transition-colors">Experiências Únicas</Link>
            <Link href="/dija-ai" className="hover:text-brand-blue transition-colors">Copiloto DIJA AI</Link>
            <Link href="/club" className="hover:text-brand-blue transition-colors">Clube de Viajantes</Link>
          </nav>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-4 lg:pl-8 lg:border-l lg:border-white/5">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Atendimento</h4>
          <div className="flex flex-col gap-3 text-sm">
            <a
              href="https://wa.me/5511997204445"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors group"
            >
              <MessageSquare size={16} className="text-brand-blue" />
              <span>WhatsApp Oficial</span>
              <ArrowUpRight size={12} className="opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="tel:+5511997204445"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone size={16} className="text-brand-blue" />
              <span>+55 (11) 99720-4445</span>
            </a>
            <a
              href="mailto:suporte@destinosincriveis.com.br"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail size={16} className="text-brand-blue" />
              <span>suporte@destinosincriveis.com.br</span>
            </a>
          </div>
        </div>

        {/* Founder */}
        <div className="flex flex-col gap-4 lg:pl-8 lg:border-l lg:border-white/5">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Sobre</h4>
          <p className="text-sm leading-relaxed text-gray-400">
            Idealizado para democratizar e elevar o planejamento de viagens a outro patamar, o ecossistema une tecnologia de ponta com curadoria especializada de turismo.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>© {new Date().getFullYear()} Destinos Incríveis. Todos os direitos reservados.</p>
        <div className="flex gap-6">
          <Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
          <Link href="/privacidade" className="hover:text-white transition-colors">Políticas de Privacidade</Link>
        </div>
      </div>
    </footer>
  );
}
