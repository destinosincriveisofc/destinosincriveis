import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';

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
          {/* Social Links */}
          <div className="flex items-center gap-3 mt-2">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/destinosincriveis.ofc/"
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
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@destinosincriveis.ofc"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#5BA4CF] hover:text-[#0A1628] transition-all"
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
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#5BA4CF] hover:text-[#0A1628] transition-all"
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
            <Link href="/parcerias" className="text-sm text-[#8896A9] hover:text-white transition-colors">
              Parcerias Comercial
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
              <MessageSquare size={16} className="text-[#5BA4CF]" />
              <span>WhatsApp Geral</span>
              <ArrowUpRight size={12} className="opacity-50" />
            </a>
            <a
              href="tel:+5511997204445"
              className="flex items-center gap-2 text-sm text-[#8896A9] hover:text-white transition-colors"
            >
              <Phone size={16} className="text-[#5BA4CF]" />
              <span>+55 (11) 99720-4445</span>
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
          <Link href="/" className="hover:text-white">Termos de Uso</Link>
          <Link href="/" className="hover:text-white">Políticas de Privacidade</Link>
        </p>
      </div>
    </footer>
  );
}
