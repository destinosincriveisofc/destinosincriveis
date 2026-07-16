"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import OfferCard from '@/components/OfferCard';
import { FlightOffer } from '@/lib/travelpayouts';
import { Search, SlidersHorizontal, RefreshCw } from 'lucide-react';
import styles from './page.module.css';

// Client-safe flight fetcher
async function getFlightsClient(): Promise<FlightOffer[]> {
  try {
    const res = await fetch('/offers.json');
    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }
    const contentType = res.headers.get("content-type");
    if (contentType && !contentType.includes("application/json")) {
      throw new Error(`Invalid content type: ${contentType}`);
    }
    const dbOffers = await res.json();
    if (!Array.isArray(dbOffers)) {
      throw new Error("Response is not a JSON array");
    }
    if (dbOffers.length === 0) {
      throw new Error("JSON array is empty");
    }

    const airportNames: Record<string, { name: string; country: string; code: string }> = {
      EZE: { name: "Buenos Aires", country: "Argentina", code: "AR" },
      SCL: { name: "Santiago", country: "Chile", code: "CL" },
      MIA: { name: "Miami", country: "Estados Unidos", code: "US" },
      MCO: { name: "Orlando", country: "Estados Unidos", code: "US" },
      LIS: { name: "Lisboa", country: "Portugal", code: "PT" },
      MAD: { name: "Madri", country: "Espanha", code: "ES" },
      CDG: { name: "Paris", country: "França", code: "FR" },
      SDU: { name: "Rio de Janeiro", country: "Brasil", code: "BR" },
      SSA: { name: "Salvador", country: "Brasil", code: "BR" },
      REC: { name: "Recife", country: "Brasil", code: "BR" },
      GRU: { name: "São Paulo", country: "Brasil", code: "BR" },
      VCP: { name: "Campinas", country: "Brasil", code: "BR" }
    };
    
    const validDbOffers = dbOffers.filter((o: any) => o && o.destino && o.preco_atual !== null && o.preco_atual !== undefined);
    if (validDbOffers.length === 0) {
      throw new Error("No valid offers found after filtering out corrupt ones.");
    }

    return validDbOffers.map((dbOffer: any) => {
      const destInfo = airportNames[dbOffer.destino?.toUpperCase()] || { name: dbOffer.destino || "Destino", country: "Destino", code: "UN" };
      const originInfo = airportNames[dbOffer.origem?.toUpperCase()] || { name: dbOffer.origem || "São Paulo", country: "Brasil", code: "BR" };
      
      return {
        id: dbOffer.id,
        origin: dbOffer.origem || "GRU",
        originName: originInfo.name,
        destination: dbOffer.destino || "",
        destinationName: destInfo.name,
        countryName: destInfo.country,
        countryCode: destInfo.code,
        price: Number(dbOffer.preco_atual) || 0,
        originalPrice: Number(dbOffer.preco_original) || Number(dbOffer.preco_atual) || 0,
        departureDate: dbOffer.criado_em ? dbOffer.criado_em.split(' ')[0] : new Date().toISOString().split('T')[0],
        returnDate: "",
        airline: dbOffer.companhia || "Companhia",
        link: dbOffer.link_afiliado || "",
        link_afiliado: dbOffer.link_afiliado || "",
        type: dbOffer.tipo || "voo",
        imagem_url: dbOffer.imagem_url,
        criado_em: dbOffer.criado_em || ""
      };
    });
  } catch (e) {
    console.error("Robust fetch from /offers.json failed, using fallback:", e);
    try {
      const { fetchCheapFlights } = await import('@/lib/travelpayouts');
      return await fetchCheapFlights();
    } catch (err) {
      console.error("Critical: Fallback mock data import failed:", err);
      return [];
    }
  }
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
      
      // Sort descending by date (criado_em)
      const sorted = [...data].sort((a: any, b: any) => {
        const valA = a.criado_em || a.departureDate || "";
        const valB = b.criado_em || b.departureDate || "";
        return valB.localeCompare(valA);
      });
      
      setOffers(sorted);
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

    // Limit to the latest 8 offers matching the filters
    setFilteredOffers(result.slice(0, 8));
  }, [searchTerm, selectedType, maxPrice, offers]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Page Intro */}
          <div className={styles.pageIntro}>
            <span className={styles.badge}>Promoções em Tempo Real</span>
            <h1 className={styles.title}>Central de Ofertas</h1>
            <p className={styles.description}>
              Encontre voos barateados, hotéis e pacotes promocionais saindo de São Paulo (GRU). Atualizado constantemente.
            </p>
          </div>

          {/* Warning Banner */}
          <div className={styles.bannerContainer}>
            <p className={styles.bannerText}>
              📢 <strong>Aviso Importante:</strong> Nossas pesquisas são realizadas em tempo real em horários específicos do dia. Os valores e vagas podem sofrer alterações rápidas pelas companhias e operadoras. Quer garantir os alertas em primeira mão? Entre para o Club Dija!
            </p>
            <Link href="/club" className={styles.bannerBtn}>
              Fazer Parte do Club →
            </Link>
          </div>

          {/* Filtering Section */}
          <div className={styles.filtersContainer}>
            {/* Search Input */}
            <div className={styles.searchWrapper}>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar destino ou país..."
                className={styles.searchInput}
              />
            </div>

            {/* Type selector */}
            <div className={styles.btnGroup}>
              <button
                onClick={() => setSelectedType('todos')}
                className={`${styles.filterBtn} ${selectedType === 'todos' ? styles.filterBtnActive : ''}`}
              >
                Todos
              </button>
              <button
                onClick={() => setSelectedType('voo')}
                className={`${styles.filterBtn} ${selectedType === 'voo' ? styles.filterBtnActive : ''}`}
              >
                ✈️ Voos
              </button>
              <button
                onClick={() => setSelectedType('hotel')}
                className={`${styles.filterBtn} ${selectedType === 'hotel' ? styles.filterBtnActive : ''}`}
              >
                🏨 Hotéis
              </button>
              <button
                onClick={() => setSelectedType('pacote')}
                className={`${styles.filterBtn} ${selectedType === 'pacote' ? styles.filterBtnActive : ''}`}
              >
                📦 Pacotes
              </button>
              <button
                onClick={() => setSelectedType('passeio')}
                className={`${styles.filterBtn} ${selectedType === 'passeio' ? styles.filterBtnActive : ''}`}
              >
                🎟️ Passeios
              </button>
            </div>

            {/* Price slider */}
            <div className={styles.sliderWrapper}>
              <div className={styles.sliderLabelRow}>
                <span>Preço Máximo:</span>
                <span className={styles.sliderValue}>R$ {maxPrice.toLocaleString('pt-BR')}</span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className={styles.sliderInput}
              />
            </div>
          </div>

          {/* Loading state */}
          {loading ? (
            <div className={styles.loadingWrapper}>
              <RefreshCw className="animate-spin text-[#5BA4CF]" size={36} />
              <span className={styles.loadingText}>Buscando melhores tarifas...</span>
            </div>
          ) : !Array.isArray(filteredOffers) || filteredOffers.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Nenhuma oferta encontrada</p>
              <p className={styles.emptyText}>Tente redefinir seus filtros ou buscar por outro termo.</p>
            </div>
          ) : (
            <div className={styles.grid3}>
              {Array.isArray(filteredOffers) ? filteredOffers.map((offer) => (
                <OfferCard key={offer.id || String(Math.random())} offer={offer} />
              )) : null}
            </div>
          )}
        </div>
      </main>
      <ChatWidget />
      <Footer />
    </>
  );
}
