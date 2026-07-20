import { fetchWithTimeout } from './fetchWithTimeout';

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

const MOCK_OFFERS: FlightOffer[] = [
  {
    id: "1",
    origin: "GRU",
    originName: "São Paulo",
    destination: "EZE",
    destinationName: "Buenos Aires",
    countryName: "Argentina",
    countryCode: "AR",
    price: 1180,
    originalPrice: 2360,
    departureDate: "2026-09-12",
    returnDate: "2026-09-19",
    airline: "Flybondi",
    link: generateTripFlightLink("GRU", "EZE", "2026-09-12", "2026-09-19"),
    type: "voo"
  },
  {
    id: "2",
    origin: "GRU",
    originName: "São Paulo",
    destination: "SCL",
    destinationName: "Santiago",
    countryName: "Chile",
    countryCode: "CL",
    price: 950,
    originalPrice: 1800,
    departureDate: "2026-10-05",
    returnDate: "2026-10-12",
    airline: "JetSMART",
    link: generateTripFlightLink("GRU", "SCL", "2026-10-05", "2026-10-12"),
    type: "voo"
  },
  {
    id: "3",
    origin: "GRU",
    originName: "São Paulo",
    destination: "MIA",
    destinationName: "Miami",
    countryName: "Estados Unidos",
    countryCode: "US",
    price: 2750,
    originalPrice: 4890,
    departureDate: "2026-11-01",
    returnDate: "2026-11-10",
    airline: "Copa Airlines",
    link: generateTripFlightLink("GRU", "MIA", "2026-11-01", "2026-11-10"),
    type: "voo"
  },
  {
    id: "4",
    origin: "GRU",
    originName: "São Paulo",
    destination: "LIS",
    destinationName: "Lisboa",
    countryName: "Portugal",
    countryCode: "PT",
    price: 3490,
    originalPrice: 6200,
    departureDate: "2026-09-20",
    returnDate: "2026-09-30",
    airline: "TAP Air Portugal",
    link: generateTripFlightLink("GRU", "LIS", "2026-09-20", "2026-09-30"),
    type: "voo"
  },
  {
    id: "5",
    origin: "GRU",
    originName: "São Paulo",
    destination: "CDG",
    destinationName: "Paris",
    countryName: "França",
    countryCode: "FR",
    price: 3850,
    originalPrice: 6800,
    departureDate: "2026-10-15",
    returnDate: "2026-10-25",
    airline: "LATAM Airlines",
    link: generateTripFlightLink("GRU", "CDG", "2026-10-15", "2026-10-25"),
    type: "voo"
  },
  {
    id: "6",
    origin: "GRU",
    originName: "São Paulo",
    destination: "MAD",
    destinationName: "Madri",
    countryName: "Espanha",
    countryCode: "ES",
    price: 3290,
    originalPrice: 5990,
    departureDate: "2026-11-10",
    returnDate: "2026-11-20",
    airline: "Air Europa",
    link: generateTripFlightLink("GRU", "MAD", "2026-11-10", "2026-11-20"),
    type: "voo"
  },
  {
    id: "7",
    origin: "GRU",
    originName: "São Paulo",
    destination: "SDU",
    destinationName: "Rio de Janeiro",
    countryName: "Brasil",
    countryCode: "BR",
    price: 280,
    originalPrice: 580,
    departureDate: "2026-08-20",
    returnDate: "2026-08-25",
    airline: "GOL",
    link: generateTripFlightLink("GRU", "SDU", "2026-08-20", "2026-08-25"),
    type: "voo"
  },
  {
    id: "8",
    origin: "GRU",
    originName: "São Paulo",
    destination: "SSA",
    destinationName: "Salvador",
    countryName: "Brasil",
    countryCode: "BR",
    price: 540,
    originalPrice: 1100,
    departureDate: "2026-09-05",
    returnDate: "2026-09-12",
    airline: "Azul",
    link: generateTripFlightLink("GRU", "SSA", "2026-09-05", "2026-09-12"),
    type: "voo"
  },
  {
    id: "9",
    origin: "GRU",
    originName: "São Paulo",
    destination: "REC",
    destinationName: "Recife - Porto de Galinhas",
    countryName: "Brasil",
    countryCode: "BR",
    price: 1490,
    originalPrice: 2900,
    departureDate: "2026-09-15",
    returnDate: "2026-09-22",
    airline: "Hospedagem + Voo",
    link: "https://trip.tpx.gr/8G2qwgeK?u=https%3A%2F%2Fwww.trip.com%2Fhotels%2Flist%3FcityName%3DPorto%2Bde%2BGalinhas%26checkin%3D2026-09-15%26checkout%3D2026-09-22",
    type: "pacote"
  },
  {
    id: "10",
    origin: "GRU",
    originName: "São Paulo",
    destination: "MCO",
    destinationName: "Orlando - Disney World",
    countryName: "Estados Unidos",
    countryCode: "US",
    price: 3890,
    originalPrice: 7200,
    departureDate: "2026-10-10",
    returnDate: "2026-10-20",
    airline: "Universal Studios Hotel",
    link: "https://trip.tpx.gr/8G2qwgeK?u=https%3A%2F%2Fwww.trip.com%2Fhotels%2Flist%3FcityName%3DOrlando%26checkin%3D2026-10-10%26checkout%3D2026-10-20",
    type: "hotel"
  }
];

function generateTripFlightLink(origin: string, destination: string, depDate: string, retDate?: string): string {
  const travelType = retDate ? "rt" : "oneway";
  const ddate = depDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];
  const rdate = retDate || "";
  let u = `https://www.trip.com/flights/list?dcity=${origin}&acity=${destination}&ddate=${ddate}`;
  if (retDate) u += `&rdate=${retDate}`;
  u += `&traveltype=${travelType}&class=y&cabin=y`;
  return `https://trip.tpx.gr/8G2qwgeK?u=${encodeURIComponent(u)}`;
}

const AIRPORT_NAMES: Record<string, { name: string; country: string; code: string }> = {
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
};

export function generateAffiliateLink(origin: string, destination: string, date: string): string {
  return generateTripFlightLink(origin, destination, date);
}

// Memory cache with expiration
let cachedFlights: FlightOffer[] | null = null;
let lastFetchedTime = 0;
const CACHE_DURATION = 4 * 60 * 60 * 1000; // 4 hours in ms

export async function fetchCheapFlights(): Promise<FlightOffer[]> {
  const now = Date.now();
  if (cachedFlights && (now - lastFetchedTime < CACHE_DURATION)) {
    return cachedFlights;
  }

  const token = process.env.TRAVELPAYOUTS_TOKEN;
  const marker = process.env.TRAVELPAYOUTS_MARKER || "748517";

  if (!token) {
    // If no token (like in client-side runtime build or missing env), return mocks
    cachedFlights = MOCK_OFFERS;
    lastFetchedTime = now;
    return MOCK_OFFERS;
  }

  try {
    // API endpoint for cheap flights from GRU
    const response = await fetchWithTimeout(
      `https://api.travelpayouts.com/v1/prices/cheap?origin=GRU&page=1&currency=BRL&token=${token}`,
      { next: { revalidate: 14400 }, timeoutMs: 20000 }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const json = await response.json();
    if (!json.success || !json.data) {
      return MOCK_OFFERS;
    }

    const data = json.data;
    const flights: FlightOffer[] = [];
    let count = 0;

    for (const destCode of Object.keys(data)) {
      if (count >= 10) break;
      const destFlights = data[destCode];
      // get the cheapest flight option for this destination
      const flightKeys = Object.keys(destFlights);
      if (flightKeys.length === 0) continue;

      const flightData = destFlights[flightKeys[0]];
      const info = AIRPORT_NAMES[destCode] || { name: destCode, country: "Destino", code: "UN" };

      const depDate = flightData.departure_at ? flightData.departure_at.split('T')[0] : "";
      const priceBRL = Math.round(flightData.price);

      flights.push({
        id: `tp-${destCode}-${count}`,
        origin: "GRU",
        originName: "São Paulo",
        destination: destCode,
        destinationName: info.name,
        countryName: info.country,
        countryCode: info.code,
        price: priceBRL,
        originalPrice: Math.round(priceBRL * 1.8),
        departureDate: depDate,
        returnDate: flightData.return_at ? flightData.return_at.split('T')[0] : "",
        airline: flightData.airline || "Copa Airlines",
        link: generateAffiliateLink("GRU", destCode, depDate),
        type: "voo",
      });

      count++;
    }

    // Fill with mocks if we didn't get enough to show a premium look (at least 8-10)
    if (flights.length < 6) {
      const merged = [...flights];
      for (const mock of MOCK_OFFERS) {
        if (!merged.some(f => f.destination === mock.destination)) {
          merged.push(mock);
        }
      }
      cachedFlights = merged.slice(0, 10);
    } else {
      // Add a couple of hotel/package mock cards for diversity in filters
      cachedFlights = [
        ...flights,
        MOCK_OFFERS[8], // Package
        MOCK_OFFERS[9]  // Hotel
      ].slice(0, 10);
    }

    lastFetchedTime = now;
    return cachedFlights;
  } catch (error) {
    console.error("Error fetching from Travelpayouts API, using mocks:", error);
    cachedFlights = MOCK_OFFERS;
    lastFetchedTime = now;
    return MOCK_OFFERS;
  }
}
