import React from 'react';
import { Calendar, PlaneTakeoff, ArrowRight, Tag } from 'lucide-react';
import AlertBadge from './AlertBadge';
import { FlightOffer } from '@/lib/travelpayouts';
import styles from './OfferCard.module.css';

interface OfferCardProps {
  offer: FlightOffer;
}

const DESTINATION_IMAGES: Record<string, string> = {
  EZE: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?q=80&w=600&auto=format&fit=crop", // Buenos Aires
  SCL: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=600&auto=format&fit=crop", // Santiago
  MIA: "https://images.unsplash.com/photo-1506422748879-887454f9dbf4?q=80&w=600&auto=format&fit=crop", // Miami
  MCO: "https://images.unsplash.com/photo-1597466765990-64ad1c35dafc?q=80&w=600&auto=format&fit=crop", // Orlando
  LIS: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?q=80&w=600&auto=format&fit=crop", // Lisboa
  MAD: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=600&auto=format&fit=crop", // Madrid
  CDG: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop", // Paris
  SDU: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=600&auto=format&fit=crop", // Rio
  SSA: "https://images.unsplash.com/photo-1582238479700-f9f381297e68?q=80&w=600&auto=format&fit=crop", // Salvador
  REC: "https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?q=80&w=600&auto=format&fit=crop", // Recife
};

export default function OfferCard({ offer }: OfferCardProps) {
  const hasValidImage = offer.imagem_url && (offer.imagem_url.startsWith('http://') || offer.imagem_url.startsWith('https://') || offer.imagem_url.startsWith('/'));
  const imageUrl = hasValidImage 
    ? offer.imagem_url! 
    : (DESTINATION_IMAGES[offer.destination || ""] || "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop");

  const price = offer.price || 0;
  const originalPrice = offer.originalPrice || price || 1;
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  const isTariffError = price < 500 && (offer.destination || "") !== "SDU";

  // Clean type label text instead of emoji
  const typeText = offer.type === 'voo' ? 'Voo' : offer.type === 'hotel' ? 'Hotel' : offer.type === 'passeio' ? 'Passeio' : 'Pacote';

  // Dynamic Badge Text and Colors
  let badgeText = typeText;
  let badgeClass = styles.badgeDefault;
  
  const discountThreshold = discount >= 35 || isTariffError;
  
  if (offer.type === 'voo' && discountThreshold) {
    badgeText = "Erro Tarifário";
    badgeClass = styles.badgeRed;
  } else if (offer.type === 'passeio') {
    badgeText = "Passeio";
    badgeClass = styles.badgeBlue;
  } else if (offer.type === 'hotel') {
    badgeText = "Hotel";
    badgeClass = styles.badgeGreen;
  } else if (offer.type === 'pacote') {
    badgeText = "Hotel + Voos";
    badgeClass = styles.badgeGreen;
  } else {
    badgeText = "Voo";
    badgeClass = styles.badgeDark;
  }

  // Dynamic travel period logic
  const getTravelPeriod = () => {
    let depDate = new Date();
    if (offer.departureDate) {
      const parsed = new Date(offer.departureDate);
      if (!isNaN(parsed.getTime())) {
        depDate = parsed;
      }
    }
    
    const today = new Date();
    if (depDate < today) {
      depDate = new Date();
      depDate.setDate(today.getDate() + 60);
    }
    
    const retDate = new Date(depDate);
    retDate.setDate(depDate.getDate() + 10);
    
    const fmt = (d: Date) => {
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      return `${day}/${month}`;
    };
    
    return `📅 Período: ${fmt(depDate)} a ${fmt(retDate)}`;
  };

  const isPasseio = offer.type === 'passeio' || (offer as any).tipo === 'passeio';
  const showDeparture = (offer.type === 'voo' || offer.type === 'hotel') && !isPasseio;

  const getDestinationTitle = () => {
    let title = offer.destinationName || "Destino";
    title = title.replace(/\s*\([A-Z]{3}\)\s*$/i, '').trim();
    if (isPasseio) {
      return title;
    }
    const destCode = offer.destination ? ` (${offer.destination})` : '';
    if (title.endsWith(`(${offer.destination})`)) {
      return title;
    }
    return `${title}${destCode}`;
  };

  return (
    <div className={styles.card}>
      {/* Image & Badges */}
      <div className={styles.imageArea}>
        <img
          src={imageUrl}
          alt={offer.destinationName || "Destino"}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.imageOverlay} />
        
        {/* Alerts / Discount Badge */}
        <div className={styles.badgeList}>
          <AlertBadge text={`${discount}% OFF`} />
        </div>

        {/* Country Badge (No emoji) */}
        <div className={styles.countryBadge}>
          <span>{offer.countryName || "Destino"}</span>
        </div>

        {/* Dynamic Type Badge */}
        <div className={`${styles.typeBadge} ${badgeClass}`}>
          {badgeText}
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.routeInfo}>
          {showDeparture && (
            <div className={styles.originText}>
              <PlaneTakeoff size={12} className="text-[#155EEF]" />
              <span>Saída de {offer.originName || "São Paulo"}</span>
            </div>
          )}
          <h3 className={styles.destinationTitle}>
            {getDestinationTitle()}
          </h3>
          {/* Airline */}
          <div className={styles.airlineText}>
            ✈️ {offer.airline || "Companhia Aérea"}
          </div>
        </div>

        {/* Travel Period */}
        <div className={styles.dates}>
          <span className={styles.dateItem}>
            {getTravelPeriod()}
          </span>
        </div>

        {/* Price & CTA */}
        <div className={styles.footer}>
          <div className={styles.priceWrapper}>
            <div className={styles.priceComparison}>
              De <span className={styles.oldPrice}>R$ {originalPrice.toLocaleString('pt-BR')}</span> por
            </div>
            <div className={styles.newPrice}>
              Apenas <span className={styles.newPriceVal}>R$ {price.toLocaleString('pt-BR')}</span>
            </div>
          </div>

          <a
            href={offer.link_afiliado || offer.link || "/ofertas"}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            <span>Ver oferta</span>
            <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
