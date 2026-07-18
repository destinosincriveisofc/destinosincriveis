export interface DestinationImage {
  url: string;
  credit: string;
  keywords: string[];
}

export const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80";

export const DESTINATION_IMAGES: Record<string, DestinationImage> = {
  GRU:      { url: "https://images.unsplash.com/photo-1579551895770-05a2cc20b7a9?q=80&w=800&auto=format&fit=crop", credit: "São Paulo", keywords: ["sp", "sao paulo", "paulista"] },
  TÓQUIO:   { url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop", credit: "Tokyo", keywords: ["toquio", "tokyo", "japao", "japan"] },
  TOKYO:    { url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop", credit: "Tokyo", keywords: ["toquio", "tokyo", "japao", "japan"] },
  ROMA:     { url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop", credit: "Rome", keywords: ["roma", "rome", "italia", "italy", "coliseu"] },
  ROME:     { url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop", credit: "Rome", keywords: ["roma", "rome", "italia", "italy", "coliseu"] },
  BANGKOK:  { url: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=800&auto=format&fit=crop", credit: "Bangkok", keywords: ["bangkok", "tailandia", "thailand"] },
  FERNANDO: { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", credit: "Fernando de Noronha", keywords: ["noronha", "fernando", "praia", "beach"] },
  SALVADOR: { url: "https://images.unsplash.com/photo-1582238479700-f9f381297e68?q=80&w=800&auto=format&fit=crop", credit: "Salvador", keywords: ["salvador", "bahia", "pelourinho"] },
  POA:      { url: "https://images.unsplash.com/photo-1598301257982-0b0140e19746?q=80&w=800&auto=format&fit=crop", credit: "Porto Alegre", keywords: ["porto alegre", "poa", "rio grande do sul"] },
  SDU:      { url: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=800&auto=format&fit=crop", credit: "Rio de Janeiro", keywords: ["rio", "cristo", "copacabana"] },
  RIO:      { url: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=800&auto=format&fit=crop", credit: "Rio de Janeiro", keywords: ["rio", "cristo", "copacabana"] },
  GIG:      { url: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=800&auto=format&fit=crop", credit: "Rio de Janeiro", keywords: ["rio", "cristo", "copacabana"] },
  SSA:      { url: "https://images.unsplash.com/photo-1582238479700-f9f381297e68?q=80&w=800&auto=format&fit=crop", credit: "Salvador", keywords: ["salvador", "bahia"] },
  BSB:      { url: "https://images.unsplash.com/photo-1599839619433-28f0b7bf1b20?q=80&w=800&auto=format&fit=crop", credit: "Brasília", keywords: ["brasilia", "bsb", "congresso"] },
  REC:      { url: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=800&auto=format&fit=crop", credit: "Recife", keywords: ["recife", "pernambuco", "marco zero"] },
  LIS:      { url: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=80&w=800&auto=format&fit=crop", credit: "Lisboa", keywords: ["lisboa", "lisbon", "portugal", "torre"] },
  LISBOA:   { url: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=80&w=800&auto=format&fit=crop", credit: "Lisboa", keywords: ["lisboa", "lisbon", "portugal", "torre"] },
  EZE:      { url: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=800&auto=format&fit=crop", credit: "Buenos Aires", keywords: ["buenos aires", "argentina", "obelisco"] },
  SCL:      { url: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop", credit: "Santiago", keywords: ["santiago", "chile", "andes"] },
  MIA:      { url: "https://images.unsplash.com/photo-1506422748879-887454f9dbf4?q=80&w=800&auto=format&fit=crop", credit: "Miami", keywords: ["miami", "florida", "praia"] },
  MCO:      { url: "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?q=80&w=800&auto=format&fit=crop", credit: "Orlando", keywords: ["orlando", "disney", "parque"] },
  MAD:      { url: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=800&auto=format&fit=crop", credit: "Madri", keywords: ["madri", "madrid", "espanha", "spain"] },
  CDG:      { url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop", credit: "Paris", keywords: ["paris", "torre eiffel", "franca", "france"] },
  PAR:      { url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop", credit: "Paris", keywords: ["paris", "torre eiffel", "franca"] },
  ROM:      { url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop", credit: "Rome", keywords: ["roma", "rome", "italia"] },
};

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop",
];

export function getDestinationImage(
  destinationCode?: string,
  destinationName?: string,
  existingUrl?: string | null
): string {
  if (existingUrl && existingUrl.startsWith('http') && !existingUrl.includes('picsum')) {
    return existingUrl;
  }

  const code = (destinationCode || '').toUpperCase().trim();
  if (DESTINATION_IMAGES[code]) {
    return DESTINATION_IMAGES[code].url;
  }

  const name = (destinationName || '').toLowerCase().trim();
  for (const [, entry] of Object.entries(DESTINATION_IMAGES)) {
    if (entry.keywords.some(k => name.includes(k))) {
      return entry.url;
    }
  }

  const hash = name.length + (destinationCode || '').length;
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length];
}

export function getSocialMetrics(id: string): { likes: number; comments: number } {
  let hash = 0;
  const str = id || "";
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return {
    likes: Math.abs(hash % 87) + 5,
    comments: Math.abs((hash >> 4) % 23) + 1,
  };
}

export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function getCountryFlagUrl(countryCode: string): string {
  const code = countryCode?.toLowerCase?.() || '';
  if (!code || code === 'un' || code.length !== 2) return '';
  return `https://flagcdn.com/24x18/${code}.png`;
}

export function getBrandGradient(direction: 'top' | 'bottom' = 'bottom'): string {
  if (direction === 'top') {
    return 'linear-gradient(to top, rgba(10, 22, 40, 0.75) 0%, rgba(21, 94, 239, 0.15) 50%, transparent 100%)';
  }
  return 'linear-gradient(to bottom, rgba(10, 22, 40, 0.1) 0%, rgba(21, 94, 239, 0.25) 50%, rgba(10, 22, 40, 0.7) 100%)';
}

export function getCardBadgeVariant(type?: string): { text: string; className: string } {
  switch (type) {
    case 'voo': return { text: 'Voo', className: 'badgeDark' };
    case 'hotel': return { text: 'Hotel', className: 'badgeGreen' };
    case 'pacote': return { text: 'Hotel + Voos', className: 'badgeGreen' };
    case 'passeio': return { text: 'Passeio', className: 'badgeBlue' };
    default: return { text: 'Voo', className: 'badgeDark' };
  }
}
