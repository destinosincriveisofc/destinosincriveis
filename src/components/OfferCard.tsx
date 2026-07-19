"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, PlaneTakeoff, ArrowRight, Heart, MessageCircle, MapPin, Tag } from 'lucide-react';
import AlertBadge from './AlertBadge';
import { FlightOffer } from '@/lib/travelpayouts';
import { getDestinationImage, getSocialMetrics, formatPrice, getCountryFlagUrl, getBrandGradient, getCardBadgeVariant, DESTINATION_IMAGES, DEFAULT_FALLBACK } from '@/lib/visual-assets';
import styles from './OfferCard.module.css';

interface OfferCardProps {
  offer: FlightOffer;
}

export default function OfferCard({ offer }: OfferCardProps) {
  const item = {
    ...offer,
    destino: (offer.destination || (offer as any).destino || '').toUpperCase().trim(),
    imagem_url: offer.imagem_url
  };
  const imgToRender = (item.imagem_url && item.imagem_url.startsWith('http')) ? item.imagem_url : ((DESTINATION_IMAGES[item.destino]?.url) || DEFAULT_FALLBACK);
  const { likes: baseLikes, comments: baseComments } = getSocialMetrics(offer.id);

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(baseLikes);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const { likes } = getSocialMetrics(offer.id);
    setLikesCount(likes);
  }, [offer.id]);

  const price = offer.price || 0;
  const originalPrice = offer.originalPrice || price || 1;
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  const isTariffError = price < 500 && (offer.destination || "") !== "SDU";

  const badgeInfo = getCardBadgeVariant(offer.type);
  let badgeText = badgeInfo.text;
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
  }

  const getTravelPeriod = () => {
    let depDate = new Date();
    if (offer.departureDate) {
      const parsed = new Date(offer.departureDate);
      if (!isNaN(parsed.getTime())) depDate = parsed;
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
    return `${fmt(depDate)} a ${fmt(retDate)}`;
  };

  const isPasseio = offer.type === 'passeio' || (offer as any).tipo === 'passeio';
  const showDeparture = (offer.type === 'voo' || offer.type === 'hotel') && !isPasseio;

  const getDestinationTitle = () => {
    let title = offer.destinationName || "Destino";
    title = title.replace(/\s*\([A-Z]{3}\)\s*$/i, '').trim();
    if (isPasseio) return title;
    const destCode = offer.destination ? ` (${offer.destination})` : '';
    if (title.endsWith(`(${offer.destination})`)) return title;
    return `${title}${destCode}`;
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleImgError = () => {
    if (!imgError) {
      setImgError(true);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageArea}>
        <img
          src={imgError ? DEFAULT_FALLBACK : imgToRender}
          alt={offer.destinationName || offer.destination || "Destino"}
          onError={handleImgError}
          loading="lazy"
          className={styles.image}
        />
        <div className={styles.imageOverlay} style={{ background: getBrandGradient('bottom') }} />
        <div className={styles.imageOverlayTop} style={{ background: getBrandGradient('top') }} />

        <div className={styles.badgeList}>
          <AlertBadge text={`${discount}% OFF`} />
        </div>

        <div className={`${styles.typeBadge} ${badgeClass}`}>
          <Tag size={10} />
          {badgeText}
        </div>

        <div className={styles.countryBadge}>
          {offer.countryCode && offer.countryCode !== 'UN' ? (
            <img
              src={getCountryFlagUrl(offer.countryCode)}
              alt={offer.countryName}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              className={styles.flagIcon}
            />
          ) : (
            <MapPin size={12} />
          )}
          <span>{offer.countryName || "Destino"}</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.routeInfo}>
          {showDeparture && (
            <div className={styles.originText}>
              <PlaneTakeoff size={12} />
              <span>Saída de {offer.originName || "São Paulo"}</span>
            </div>
          )}
          <h3 className={styles.destinationTitle}>
            {getDestinationTitle()}
          </h3>
          <div className={styles.airlineText}>
            <PlaneTakeoff size={11} />
            {offer.airline || "Companhia Aérea"}
          </div>
        </div>

        <div className={styles.dates}>
          <span className={styles.dateItem}>
            <Calendar size={12} />
            <span>{getTravelPeriod()}</span>
          </span>
        </div>

        <div className={styles.priceSection}>
          <div className={styles.priceComparison}>
            De <span className={styles.oldPrice}>R$ {formatPrice(originalPrice)}</span>
          </div>
          <div className={styles.currentPriceRow}>
            <span className={styles.priceLabel}>por apenas</span>
            <span className={styles.newPriceVal}>R$ {formatPrice(price)}</span>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.socialActions}>
            <button onClick={handleLike} className={`${styles.socialBtn} ${liked ? styles.liked : ''}`}>
              <Heart size={14} fill={liked ? "currentColor" : "none"} />
              <span>{likesCount}</span>
            </button>
            <div className={styles.socialBtn}>
              <MessageCircle size={14} />
              <span>{baseComments}</span>
            </div>
          </div>

          <a
            href={offer.link_afiliado || (offer as any).url_afiliado || "/club"}
            target={offer.link_afiliado || (offer as any).url_afiliado ? "_blank" : undefined}
            rel={offer.link_afiliado || (offer as any).url_afiliado ? "noopener noreferrer" : undefined}
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
