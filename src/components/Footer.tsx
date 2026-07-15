import React from 'react';
import Link from 'next/link';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white py-16 border-t border-[#5BA4CF]/10">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="text-xl font-bold tracking-tight text-white">
            Destinos<span className="text-[#5BA4CF]">Incríveis</span>
          </Link>
          <p className="text-[#8896A9] text-sm leading-relaxed max-w-xs">
            Monitoramos e alertamos passagens imperdíveis, erros tarifários e oportunidades exclusivas de viagem.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://instagram.com/destinosincriveis"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#5BA4CF] hover:text-[#0A1628] transition-all"
              aria-label="Instagram"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[#5BA4CF]">Navegação</h4>
          <nav className="flex flex-col gap-2.5">
            <Link href="/" className="text-sm text-[#8896A9] hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/ofertas" className="text-sm text-[#8896A9] hover:text-white transition-colors">
              Buscar Ofertas
            </Link>
            <Link href="/club" className="text-sm text-[#8896A9] hover:text-white transition-colors">
              Destinos Incríveis Club
            </Link>
            <Link href="/blog" className="text-sm text-[#8896A9] hover:text-white transition-colors">
              Dicas de Viagem
            </Link>
            <Link href="/consultoria" className="text-sm text-[#8896A9] hover:text-white transition-colors">
              Consultoria VIP
            </Link>
          </nav>
        </div>

        {/* Support */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[#5BA4CF]">Atendimento</h4>
          <div className="flex flex-col gap-3.5">
            <a
              href="https://wa.me/5511997204445"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#8896A9] hover:text-white transition-colors"
            >
              <Phone size={16} className="text-[#5BA4CF]" />
              <span>+55 (11) 99720-4445</span>
              <ArrowUpRight size={12} className="opacity-50" />
            </a>
            <a
              href="mailto:suporte@destinosincriveis.com.br"
              className="flex items-center gap-2 text-sm text-[#8896A9] hover:text-white transition-colors"
            >
              <Mail size={16} className="text-[#5BA4CF]" />
              <span>suporte@destinosincriveis.com.br</span>
            </a>
          </div>
        </div>

        {/* Legal / Founder */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-[#5BA4CF]">Sobre</h4>
          <p className="text-sm text-[#8896A9] leading-relaxed">
            Fundado por <strong className="text-white font-medium">Juliano Amorin</strong>, o portal tem a missão de democratizar as viagens pelo mundo por meio de inteligência tarifária.
          </p>
        </div>
      </div>

      <div className="container mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8896A9]">
        <p>© {new Date().getFullYear()} Destinos Incríveis. Todos os direitos reservados.</p>
        <p className="flex gap-4">
          <a href="#" className="hover:text-white">Termos de Uso</a>
          <a href="#" className="hover:text-white">Políticas de Privacidade</a>
        </p>
      </div>
    </footer>
  );
}
