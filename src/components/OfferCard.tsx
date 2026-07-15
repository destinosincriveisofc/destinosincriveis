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
  const imageUrl = DESTINATION_IMAGES[offer.destination] || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop";

  const discount = Math.round(((offer.originalPrice - offer.price) / offer.originalPrice) * 100);
  const isTariffError = offer.price < 500 && offer.destination !== "SDU";

  // Clean type label text instead of emoji
  const typeText = offer.type === 'voo' ? 'Voo' : offer.type === 'hotel' ? 'Hotel' : 'Pacote';

  return (
    <div className={styles.card}>
      {/* Image & Badges */}
      <div className={styles.imageArea}>
        <img
          src={imageUrl}
          alt={offer.destinationName}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.imageOverlay} />
        
        {/* Alerts */}
        <div className={styles.badgeList}>
          {isTariffError ? (
            <AlertBadge text="Erro Tarifário" />
          ) : (
            <AlertBadge text={`${discount}% OFF`} />
          )}
        </div>

        {/* Country Badge (No emoji) */}
        <div className={styles.countryBadge}>
          <span>{offer.countryName}</span>
        </div>

        {/* Type Badge (No emoji) */}
        <div className={styles.typeBadge}>
          {typeText}
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.routeInfo}>
          <div className={styles.originText}>
            <PlaneTakeoff size={12} className="text-[#5BA4CF]" />
            <span>Saída de {offer.originName}</span>
          </div>
          <h3 className={styles.destinationTitle}>
            {offer.destinationName} ({offer.destination})
          </h3>
        </div>

        {/* Dates */}
        <div className={styles.dates}>
          <span className={styles.dateItem}>
            <Calendar size={12} />
            Ida: {new Date(offer.departureDate).toLocaleDateString('pt-BR')}
          </span>
          {offer.returnDate && (
            <span className={styles.dateItem}>
              <Calendar size={12} />
              Volta: {new Date(offer.returnDate).toLocaleDateString('pt-BR')}
            </span>
          )}
        </div>

        {/* Price & CTA */}
        <div className={styles.footer}>
          <div className={styles.priceWrapper}>
            <span className={styles.originalPrice}>
              R$ {offer.originalPrice.toLocaleString('pt-BR')}
            </span>
            <span className={styles.promoPrice}>
              <span className={styles.currency}>R$</span>
              <span className={styles.priceVal}>{offer.price.toLocaleString('pt-BR')}</span>
            </span>
          </div>

          <a
            href={offer.link}
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
