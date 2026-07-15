import React from 'react';
import Link from 'next/link';
import { ArrowRight, Plane, ShieldCheck, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#F0F4FF] via-[#FAFBFF] to-[#FAFBFF]">
      {/* Abstract light circles background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5BA4CF]/10 rounded-full blur-3xl pointer-events-none -mr-48 -mt-20" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FFD43B]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column - Copywriting */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
          {/* Trust Pilot / Rating Badge */}
          <div className="inline-flex items-center justify-center lg:justify-start gap-2">
            <div className="flex text-[#FFD43B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span className="text-xs font-semibold text-[#0A1628] bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              220K Seguidores no Instagram
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0A1628] leading-[1.1] tracking-tight">
            Viaje mais. <br />
            Pague menos. <br />
            <span className="text-[#5BA4CF]">Viva melhor.</span>
          </h1>

          <p className="text-base md:text-lg text-[#8896A9] font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
            A plataforma de inteligência de viagens que monitora promoções, alerta erros tarifários e te ajuda a viajar mais vezes ao ano pagando até 60% menos.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
            <Link
              href="/club"
              className="pill-button pill-button-primary w-full sm:w-auto flex items-center gap-2 text-center"
            >
              Entrar no Clube
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/ofertas"
              className="pill-button pill-button-outline w-full sm:w-auto flex items-center gap-2 text-center"
            >
              Ver Ofertas Ativas
              <Plane size={18} />
            </Link>
          </div>

          {/* Trust signals */}
          <div className="grid grid-cols-2 gap-4 pt-6 max-w-md mx-auto lg:mx-0 border-t border-[#5BA4CF]/10">
            <div className="flex items-center gap-2 text-xs font-medium text-[#0A1628]">
              <ShieldCheck size={16} className="text-[#5BA4CF]" />
              <span>Garantia de Preço Baixo</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#0A1628]">
              <Plane size={16} className="text-[#FFD43B]" />
              <span>Alertas Rápidos no WhatsApp</span>
            </div>
          </div>
        </div>

        {/* Right Column - Mockup & Image */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-full max-w-[380px] md:max-w-[420px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl border-4 border-white bg-white group">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop"
              alt="Destinos Incríveis pelo mundo"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Visual Floating Alert Mockup */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl flex items-center gap-3 border border-[#5BA4CF]/10 animate-bounce">
              <div className="w-10 h-10 rounded-full bg-[#FFD43B] flex items-center justify-center text-[#0A1628]">
                🔥
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-[#5BA4CF] uppercase tracking-wider block">ALERTA ATIVO</span>
                <span className="text-xs font-extrabold text-[#0A1628] block">GRU ➡️ Paris: R$ 3.850 (Ida e Volta)</span>
                <span className="text-[9px] text-[#8896A9]">Atualizado há 3 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
