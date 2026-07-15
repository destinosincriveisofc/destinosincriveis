"use client";

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import OfferCard from '@/components/OfferCard';
import { FlightOffer } from '@/lib/travelpayouts';
import { Search, SlidersHorizontal, RefreshCw } from 'lucide-react';

// Client-safe flight fetcher
async function getFlightsClient(): Promise<FlightOffer[]> {
  try {
    const res = await fetch('/api/flights'); // If a local API is set, otherwise fall back
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {}

  // Fallback to locally bundled mock data
  const { fetchCheapFlights } = await import('@/lib/travelpayouts');
  return await fetchCheapFlights();
}

export default function OfertasPage() {
  const [offers, setOffers] = useState<FlightOffer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('todos');
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  useEffect(() => {
    const loadOffers = async () => {
      setLoading(true);
      const data = await getFlightsClient();
      setOffers(data);
      setFilteredOffers(data);
      setLoading(false);
    };
    loadOffers();
  }, []);

  // Filter application
  useEffect(() => {
    let result = offers;

    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        o =>
          o.destinationName.toLowerCase().includes(term) ||
          o.destination.toLowerCase().includes(term) ||
          o.countryName.toLowerCase().includes(term)
      );
    }

    if (selectedType !== 'todos') {
      result = result.filter(o => o.type === selectedType);
    }

    result = result.filter(o => o.price <= maxPrice);

    setFilteredOffers(result);
  }, [searchTerm, selectedType, maxPrice, offers]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFBFF] pt-28 pb-20">
        <div className="container">
          {/* Page Intro */}
          <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-3">
            <span className="text-xs font-bold text-[#5BA4CF] uppercase tracking-wider">Promoções em Tempo Real</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0A1628]">Central de Ofertas</h1>
            <p className="text-sm md:text-base text-[#8896A9]">
              Encontre voos barateados, hotéis e pacotes promocionais saindo de São Paulo (GRU). Atualizado constantemente.
            </p>
          </div>

          {/* Filtering Section */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-6 items-center justify-between mb-10">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar destino ou país..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAFBFF] border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#5BA4CF] transition-colors"
              />
            </div>

            {/* Type selector */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              <button
                onClick={() => setSelectedType('todos')}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                  selectedType === 'todos'
                    ? 'bg-[#0A1628] text-white'
                    : 'bg-[#F0F4FF] text-[#0A1628] hover:bg-[#5BA4CF]/10'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedType('voo')}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                  selectedType === 'voo'
                    ? 'bg-[#0A1628] text-white'
                    : 'bg-[#F0F4FF] text-[#0A1628] hover:bg-[#5BA4CF]/10'
                }`}
              >
                ✈️ Voos
              </button>
              <button
                onClick={() => setSelectedType('hotel')}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                  selectedType === 'hotel'
                    ? 'bg-[#0A1628] text-white'
                    : 'bg-[#F0F4FF] text-[#0A1628] hover:bg-[#5BA4CF]/10'
                }`}
              >
                🏨 Hotéis
              </button>
              <button
                onClick={() => setSelectedType('pacote')}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                  selectedType === 'pacote'
                    ? 'bg-[#0A1628] text-white'
                    : 'bg-[#F0F4FF] text-[#0A1628] hover:bg-[#5BA4CF]/10'
                }`}
              >
                📦 Pacotes
              </button>
            </div>

            {/* Price slider */}
            <div className="w-full lg:max-w-xs flex flex-col gap-1.5">
              <div className="flex justify-between text-xs font-semibold text-[#0A1628]">
                <span>Preço Máximo:</span>
                <span className="text-[#2D7DB8]">R$ {maxPrice.toLocaleString('pt-BR')}</span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-150 rounded-lg appearance-none cursor-pointer accent-[#5BA4CF]"
              />
            </div>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <RefreshCw className="animate-spin text-[#5BA4CF]" size={36} />
              <span className="text-sm font-semibold text-[#8896A9]">Buscando melhores tarifas...</span>
            </div>
          ) : filteredOffers.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl shadow-sm">
              <p className="text-base font-semibold text-[#0A1628] mb-2">Nenhuma oferta encontrada</p>
              <p className="text-sm text-[#8896A9]">Tente redefinir seus filtros ou buscar por outro termo.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          )}
        </div>
      </main>
      <ChatWidget />
      <Footer />
    </>
  );
}
