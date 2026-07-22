"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Plane, MapPin, Calendar, Globe2, FileText, DollarSign, Brain } from 'lucide-react';
import Link from 'next/link';

const COUNTRIES = [
  {
    name: "Japão",
    description: "Cultura ancestral e futurismo digital convivendo em harmonia sob paisagens montanhosas de tirar o fôlego.",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    currency: "Iene (JPY)",
    language: "Japonês",
    bestTime: "Março a Maio (Cerejeiras) / Outubro a Novembro",
    requirements: "Passaporte válido (isenção de visto p/ turismo até 90 dias)",
  },
  {
    name: "Itália",
    description: "Berço da arte renascentista, ruínas imperiais e culinária que redefine o conceito de prazer gastronômico.",
    imageUrl: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop",
    currency: "Euro (EUR)",
    language: "Italiano",
    bestTime: "Maio a Junho / Setembro a Outubro",
    requirements: "Passaporte válido, Seguro Viagem obrigatório (Schengen)",
  },
  {
    name: "Islândia",
    description: "O choque primordial entre fogo e gelo com piscinas geotermais, vulcões ativos e auroras boreais majestosas.",
    imageUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop",
    currency: "Coroa Islandesa (ISK)",
    language: "Islandês",
    bestTime: "Setembro a Março (Aurora) / Junho a Agosto (Sol da Meia-Noite)",
    requirements: "Passaporte válido, Seguro Viagem obrigatório (Schengen)",
  },
  {
    name: "França",
    description: "Vilas charmosas de lavanda, praias sofisticadas na Riviera e a mística capital da luz e da alta costura.",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    currency: "Euro (EUR)",
    language: "Francês",
    bestTime: "Abril a Junho / Setembro a Outubro",
    requirements: "Passaporte válido, Seguro Viagem obrigatório (Schengen)",
  },
  {
    name: "Argentina",
    description: "Dança de tango nas capitais vibrantes, vinhos finos aos pés dos Andes e glaciares colossais no sul selvagem.",
    imageUrl: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=800&auto=format&fit=crop",
    currency: "Peso Argentino (ARS)",
    language: "Espanhol",
    bestTime: "Novembro a Março (Patagônia) / Março a Junho (Vinícolas)",
    requirements: "RG ou Passaporte válido (isenção de visto mercosul)",
  },
  {
    name: "Brasil",
    description: "Biodiversidade extraordinária, praias deslumbrantes de norte a sul e festividades culturais contagiantes.",
    imageUrl: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=800&auto=format&fit=crop",
    currency: "Real (BRL)",
    language: "Português",
    bestTime: "Dezembro a Março (Verão) / Junho a Agosto (Nordeste e Lençóis)",
    requirements: "Livre trânsito de cidadãos nacionais",
  }
];

export default function DestinosPage() {
  return (
    <>
      <Navbar />
      <main className="bg-primary-bg min-h-screen pt-28 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header Title */}
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-4">
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-blue/10 border border-brand-blue/20 text-brand-blue backdrop-blur-md">
              <Plane size={14} />
              <span>Plataforma Global de Turismo</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight font-heading">
              Nossos Destinos Copilotados
            </h1>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Curadoria de países de destaque. Conheça as informações práticas mais importantes antes de iniciar o plano inteligente da sua viagem.
            </p>
          </div>

          {/* Grid list of countries */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COUNTRIES.map((country) => (
              <div
                key={country.name}
                className="group rounded-3xl overflow-hidden border border-white/5 bg-card-bg/40 backdrop-blur-md flex flex-col justify-between hover:border-brand-blue/25 hover:shadow-xl transition-all"
              >
                {/* Visual Header */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={country.imageUrl}
                    alt={country.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-2 text-white">
                    <MapPin size={18} className="text-brand-blue" />
                    <h3 className="text-xl font-bold">{country.name}</h3>
                  </div>
                </div>

                {/* Country details info */}
                <div className="p-6 flex flex-col gap-4 flex-1 justify-between">
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                    {country.description}
                  </p>

                  <div className="flex flex-col gap-2.5 pt-4 border-t border-white/5 text-xs text-gray-300">
                    <div className="flex items-start gap-2.5">
                      <DollarSign size={14} className="text-brand-gold mt-0.5 flex-shrink-0" />
                      <p><strong>Moeda:</strong> {country.currency}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Globe2 size={14} className="text-brand-gold mt-0.5 flex-shrink-0" />
                      <p><strong>Idioma Oficial:</strong> {country.language}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Calendar size={14} className="text-brand-gold mt-0.5 flex-shrink-0" />
                      <p><strong>Melhor Época:</strong> {country.bestTime}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <FileText size={14} className="text-brand-gold mt-0.5 flex-shrink-0" />
                      <p className="line-clamp-2"><strong>Requisitos:</strong> {country.requirements}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-2">
                    <Link
                      href="/dija-ai"
                      className="w-full py-2.5 rounded-xl border border-brand-blue/30 hover:border-brand-blue text-xs font-bold text-brand-blue hover:bg-brand-blue/5 transition-all flex items-center justify-center gap-1.5"
                    >
                      <Brain size={12} />
                      Planejar Roteiro para {country.name}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
