import { fetchWithTimeout } from './fetchWithTimeout';
import fs from 'fs';
import path from 'path';

export interface FlightOffer {
  id: string;
  origin: string;
  originName: string;
  destination: string;
  destinationName: string;
  countryName: string;
  countryCode: string;
  price: number;
  originalPrice: number;
  departureDate: string;
  returnDate: string;
  airline: string;
  link: string;
  link_afiliado?: string;
  type: 'voo' | 'hotel' | 'pacote' | 'passeio';
  imagem_url?: string;
}

const CITY_MAP: Record<string, string> = {
  EZE: "Buenos Aires", BUE: "Buenos Aires", SCL: "Santiago", MIA: "Miami",
  MCO: "Orlando", LIS: "Lisboa", MAD: "Madrid", CDG: "Paris", SDU: "Rio de Janeiro",
  GIG: "Rio de Janeiro", RIO: "Rio de Janeiro", SSA: "Salvador", REC: "Recife",
  FLN: "Florianopolis", MCZ: "Maceio", FOR: "Fortaleza", NAT: "Natal",
  BSB: "Brasilia", GRU: "Sao Paulo", CUN: "Cancun", CPT: "Cape Town", JJG: "Jericoacoara"
};

export function generateTripFlightLink(origin: string, destination: string, depDate?: string, retDate?: string): string {
  const destUpper = destination.toUpperCase();
  if (destUpper.includes("BUENOS AIRES") || destUpper === "EZE" || destUpper === "BUE") {
    return "https://ciatrip.com/buenos-aires/?ref=844";
  }
  if (destUpper.includes("BARILOCHE")) {
    return "https://ciatrip.com/bariloche-pacotes/?ref=844";
  }
  if (destUpper.includes("USHUAIA")) {
    return "https://ciatrip.com/ushuaia-verao-2/?ref=844";
  }
  if (destUpper.includes("JORDANIA") || destUpper.includes("JORDÂNIA")) {
    return "https://ciatrip.com/jordania/?ref=844";
  }
  return "https://ciatrip.com/ref/844/";
}

const MOCK_OFFERS: FlightOffer[] = [
  {
    id: "1", origin: "GRU", originName: "São Paulo", destination: "EZE", destinationName: "Buenos Aires",
    countryName: "Argentina", countryCode: "AR", price: 1180, originalPrice: 2360, departureDate: "2026-09-12",
    returnDate: "2026-09-19", airline: "Flybondi", link: generateTripFlightLink("GRU", "EZE"), type: "voo"
  },
  {
    id: "2", origin: "GRU", originName: "São Paulo", destination: "SCL", destinationName: "Santiago",
    countryName: "Chile", countryCode: "CL", price: 950, originalPrice: 1800, departureDate: "2026-10-05",
    returnDate: "2026-10-12", airline: "JetSMART", link: generateTripFlightLink("GRU", "SCL"), type: "voo"
  },
  {
    id: "3", origin: "GRU", originName: "São Paulo", destination: "MIA", destinationName: "Miami",
    countryName: "Estados Unidos", countryCode: "US", price: 2750, originalPrice: 4890, departureDate: "2026-11-01",
    returnDate: "2026-11-10", airline: "Copa Airlines", link: generateTripFlightLink("GRU", "MIA"), type: "voo"
  },
  {
    id: "4", origin: "GRU", originName: "São Paulo", destination: "LIS", destinationName: "Lisboa",
    countryName: "Portugal", countryCode: "PT", price: 3490, originalPrice: 6200, departureDate: "2026-09-20",
    returnDate: "2026-09-30", airline: "TAP Air Portugal", link: generateTripFlightLink("GRU", "LIS"), type: "voo"
  },
  {
    id: "5", origin: "GRU", originName: "São Paulo", destination: "CDG", destinationName: "Paris",
    countryName: "França", countryCode: "FR", price: 3850, originalPrice: 6800, departureDate: "2026-10-15",
    returnDate: "2026-10-25", airline: "LATAM Airlines", link: generateTripFlightLink("GRU", "CDG"), type: "voo"
  },
  {
    id: "6", origin: "GRU", originName: "São Paulo", destination: "MAD", destinationName: "Madri",
    countryName: "Espanha", countryCode: "ES", price: 3290, originalPrice: 5990, departureDate: "2026-11-10",
    returnDate: "2026-11-20", airline: "Air Europa", link: generateTripFlightLink("GRU", "MAD"), type: "voo"
  }
];

export function generateAffiliateLink(origin: string, destination: string, date: string): string {
  return generateTripFlightLink(origin, destination, date);
}

let cachedFlights: FlightOffer[] | null = null;
let lastFetchedTime = 0;
const CACHE_DURATION = 4 * 60 * 60 * 1000;

export async function fetchCheapFlights(): Promise<FlightOffer[]> {
  try {
    const jsonPath = path.join(process.cwd(), 'public', 'offers.json');
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, 'utf-8');
      const data = JSON.parse(raw);
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item: any, index: number) => ({
          id: item.id || `offer-${index}`,
          origin: item.origem || 'GRU',
          originName: item.origem || 'São Paulo',
          destination: item.destino || 'Destino',
          destinationName: item.destino || 'Destino',
          countryName: 'Destino',
          countryCode: 'UN',
          price: Number(item.preco_atual) || Number(item.preco_original) || 1000,
          originalPrice: Number(item.preco_original) || Number(item.preco_atual) * 2 || 2000,
          departureDate: item.criado_em ? item.criado_em.split(' ')[0] : new Date().toISOString().split('T')[0],
          returnDate: '',
          airline: item.companhia || 'Companhia Aérea',
          link: item.link_afiliado || generateTripFlightLink(item.origem || 'GRU', item.destino || 'Orlando'),
          link_afiliado: item.link_afiliado || generateTripFlightLink(item.origem || 'GRU', item.destino || 'Orlando'),
          type: item.tipo || 'voo',
          imagem_url: item.imagem_url
        }));
      }
    }
  } catch (err) {
    console.error("Failed to read public/offers.json in fetchCheapFlights:", err);
  }

  return MOCK_OFFERS;
}

