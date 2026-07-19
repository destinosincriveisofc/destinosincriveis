"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import OfferCard from '@/components/OfferCard';
import RadarScanner from '@/components/RadarScanner';

import { FlightOffer } from '@/lib/travelpayouts';
import { Search, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import TravelSearchWidget from '@/components/TravelSearchWidget';
import styles from './page.module.css';

const MOCK_OFFERS: FlightOffer[] = [
  {
    id: "PRESET-1", origin: "GRU", originName: "São Paulo",
    destination: "MCO", destinationName: "Orlando",
    countryName: "Estados Unidos", countryCode: "US",
    price: 2199, originalPrice: 4500,
    departureDate: "2026-09-15", returnDate: "",
    airline: "Latam",
    link: "https://www.trip.com/", link_afiliado: "https://www.trip.com/",
    type: "voo",
    imagem_url: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "PRESET-2", origin: "GRU", originName: "São Paulo",
    destination: "LIS", destinationName: "Lisboa",
    countryName: "Portugal", countryCode: "PT",
    price: 3499, originalPrice: 6800,
    departureDate: "2026-10-20", returnDate: "",
    airline: "TAP",
    link: "https://www.trip.com/", link_afiliado: "https://www.trip.com/",
    type: "voo",
    imagem_url: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "PRESET-3", origin: "", originName: "",
    destination: "Maragogi", destinationName: "Maragogi",
    countryName: "Brasil", countryCode: "BR",
    price: 900, originalPrice: 3000,
    departureDate: "2026-08-01", returnDate: "",
    airline: "Salinas Maragogi All Inclusive",
    link: "https://www.trip.com/", link_afiliado: "https://www.trip.com/",
    type: "hotel",
    imagem_url: "https://images.unsplash.com/photo-1549638441-b787d2e11f14?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "PRESET-4", origin: "GRU", originName: "São Paulo",
    destination: "MAD", destinationName: "Madri",
    countryName: "Espanha", countryCode: "ES",
    price: 2799, originalPrice: 5200,
    departureDate: "2026-11-05", returnDate: "",
    airline: "Iberia",
    link: "https://www.trip.com/", link_afiliado: "https://www.trip.com/",
    type: "voo",
    imagem_url: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80"
  }
];

// Client-safe flight fetcher
async function getFlightsClient(): Promise<FlightOffer[]> {
  try {
    const res = await fetch('https://destinosincriveis.vps-kinghost.net/api/offers', { signal: AbortSignal.timeout(8000) });
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
      VCP: { name: "Campinas", country: "Brasil", code: "BR" },
      BSB: { name: "Brasília", country: "Brasil", code: "BR" },
      RIO: { name: "Rio de Janeiro", country: "Brasil", code: "BR" },
      GIG: { name: "Rio de Janeiro", country: "Brasil", code: "BR" }
    };
    
    const validDbOffers = dbOffers.filter((o: any) => o && o.destino && o.preco_atual !== null && o.preco_atual !== undefined);
    if (validDbOffers.length === 0) {
      throw new Error("No valid offers found after filtering out corrupt ones.");
    }

    return validDbOffers.map((dbOffer: any) => {
      const destInfo = airportNames[dbOffer.destino?.toUpperCase()] || { name: dbOffer.destino || "Destino", country: "Destino", code: "UN" };
      const originInfo = airportNames[dbOffer.origem?.toUpperCase()] || { name: dbOffer.origem || "", country: "", code: "" };
      
      return {
        id: dbOffer.id,
        origin: dbOffer.origem || "",
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
        type: dbOffer.tipo || "hotel",
        imagem_url: dbOffer.imagem_url,
        criado_em: dbOffer.criado_em || ""
      };
    });
  } catch (e) {
    console.error("Robust fetch from API failed, using fallback:", e);
    try {
      const localRes = await fetch('/offers.json', { signal: AbortSignal.timeout(5000) });
      if (localRes.ok) {
        const localData = await localRes.json();
        if (Array.isArray(localData) && localData.length > 0) {
          console.log("Loaded offers from local cache (offers.json)");
          return localData.map((o: any) => ({
            id: o.id || String(Math.random()),
            origin: o.origem || "",
            originName: "",
            destination: o.destino || "",
            destinationName: o.destino || "Destino",
            countryName: "",
            countryCode: "",
            price: Number(o.preco_atual) || Number(o.price) || 0,
            originalPrice: Number(o.preco_original) || Number(o.originalPrice) || 0,
            departureDate: o.criado_em ? o.criado_em.split(' ')[0] : new Date().toISOString().split('T')[0],
            returnDate: "",
            airline: o.companhia || "Companhia",
            link: o.link_afiliado || o.link || "",
            link_afiliado: o.link_afiliado || o.link || "",
            type: o.tipo || "voo",
            imagem_url: o.imagem_url,
            criado_em: o.criado_em || ""
          }));
        }
      }
    } catch (localErr) {
      console.warn("Local cache fallback failed:", localErr);
    }
    try {
      const { fetchCheapFlights } = await import('@/lib/travelpayouts');
      return await fetchCheapFlights();
    } catch (err) {
      console.error("Critical: All fallback sources failed:", err);
      return [];
    }
  }
}

export default function OfertasPage() {
  const [offers, setOffers] = useState<FlightOffer[]>(MOCK_OFFERS);
  const [filteredOffers, setFilteredOffers] = useState<FlightOffer[]>([]);
  const [loading, setLoading] = useState(true);

  const introRef = useScrollReveal<HTMLDivElement>();
  const bannerRef = useScrollReveal<HTMLDivElement>();
  const filtersRef = useScrollReveal<HTMLDivElement>();
  const radarSectionRef = useScrollReveal<HTMLDivElement>();

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('todos');
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  useEffect(() => {
    const loadOffers = async () => {
      setLoading(true);
      try {
        const data = await getFlightsClient();
        
        if (data && Array.isArray(data) && data.length > 0) {
          const sorted = [...data].sort((a: any, b: any) => {
            const valA = a.criado_em || a.departureDate || "";
            const valB = b.criado_em || b.departureDate || "";
            return valB.localeCompare(valA);
          });
          setOffers(sorted);
        } else {
          setOffers(MOCK_OFFERS);
        }
      } catch (err) {
        console.error('Falha ao carregar ofertas, usando fallback local:', err);
        setOffers(MOCK_OFFERS);
      } finally {
        setLoading(false);
      }
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
          <div className={`${styles.pageIntro} fade-in-up`} ref={introRef}>
            <span className={styles.badge}>Promoções em Tempo Real</span>
            <h1 className={styles.title}>Central de Ofertas</h1>
            <p className={styles.description}>
              Encontre voos barateados, hotéis e pacotes promocionais saindo de São Paulo (GRU). Atualizado constantemente.
            </p>
          </div>

          {/* Radar Scanner Section */}
          <div className={`fade-in-up`} ref={radarSectionRef} style={{
            display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center',
            justifyContent: 'center', marginBottom: 40, padding: '24px 0'
          }}>
            <RadarScanner size={180} active={true} offersCount={filteredOffers.length} />
          </div>

          {/* Warning Banner */}
          <div className={`${styles.bannerContainer} fade-in-up hover-lift`} ref={bannerRef}>
            <p className={styles.bannerText}>
              📢 <strong>Aviso Importante:</strong> Nossas pesquisas são realizadas em tempo real em horários específicos do dia. Os valores e vagas podem sofrer alterações rápidas pelas companhias e operadoras. Quer garantir os alertas em primeira mão? Entre para o Club Dija!
            </p>
            <Link href="/club" className={styles.bannerBtn}>
              Fazer Parte do Club →
            </Link>
          </div>

          {/* Filtering Section */}
          <div className={`${styles.filtersContainer} fade-in-up`} ref={filtersRef}>
            {/* Search Input */}
            <div className={styles.searchWrapper}>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748b]" size={18} />
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

          <TravelSearchWidget variant="offers" />

          {/* Loading state */}
          {!Array.isArray(filteredOffers) || filteredOffers.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Nenhuma oferta encontrada</p>
              <p className={styles.emptyText}>Tente redefinir seus filtros ou buscar por outro termo.</p>
            </div>
          ) : (
            <div className={styles.grid3}>
              {Array.isArray(filteredOffers) ? filteredOffers.map((offer, idx) => (
                <div key={offer.id || String(Math.random())} className="hover-lift"
                     style={{ animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards`, animationDelay: `${(idx % 8) * 0.08}s` }}>
                  <OfferCard offer={offer} />
                </div>
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
