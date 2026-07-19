import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Calendar, Clock, Plane, Tag } from 'lucide-react';
import styles from './feed-card.module.css';

type FeedVariant = 'offer' | 'blog' | 'default';

interface FeedCardProps {
  variant?: FeedVariant;
  title: string;
  description?: string;
  imageUrl?: string;
  imageAlt?: string;
  actionHref: string;
  actionLabel?: string;

  offer?: {
    price: number;
    originalPrice?: number;
    discountPercent?: number;
    urgency?: number;
    destinationName?: string;
    airline?: string;
    badgeLabel?: string;
  };

  blog?: {
    category?: string;
    date?: string;
    readTime?: string;
  };
}

function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function FeedCard({
  variant = 'default',
  title,
  description,
  imageUrl,
  imageAlt,
  actionHref,
  actionLabel,
  offer,
  blog,
}: FeedCardProps) {
  const isOffer = variant === 'offer';
  const isBlog = variant === 'blog';

  const defaultActionLabel = isOffer ? 'Ver oferta' : isBlog ? 'Ler mais' : 'Ver mais';
  const label = actionLabel || defaultActionLabel;

  const showUrgency = isOffer && offer?.urgency && offer.urgency >= 7;

  return (
    <article className={styles.card}>
      {imageUrl ? (
        <div className={styles.imageWrapper}>
          <img
            src={imageUrl}
            alt={imageAlt || title}
            className={styles.image}
            loading="lazy"
          />
          <div className={styles.badgeOverlay}>
            {isOffer && offer?.badgeLabel && (
              <span className={`${styles.badge} ${styles.badgeVip}`}>
                {offer.badgeLabel}
              </span>
            )}
            {isOffer && showUrgency && (
              <span className={`${styles.badge} ${styles.badgeUrgency}`}>
                🔥 URGENTE
              </span>
            )}
            {isBlog && blog?.category && (
              <span className={`${styles.badge} ${styles.badgeCategory}`}>
                {blog.category}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.noImage} />
      )}

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        {description && <p className={styles.description}>{description}</p>}

        {isOffer && offer && (
          <>
            {offer.destinationName && (
              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  <MapPin className={styles.metaIcon} />
                  {offer.destinationName}
                </span>
                {offer.airline && (
                  <span className={styles.metaItem}>
                    <Plane className={styles.metaIcon} />
                    {offer.airline}
                  </span>
                )}
              </div>
            )}
            <div className={styles.priceSection}>
              <span className={styles.priceCurrent}>
                R$ {formatPrice(offer.price)}
              </span>
              {offer.originalPrice && offer.originalPrice > offer.price && (
                <>
                  <span className={styles.priceOriginal}>
                    R$ {formatPrice(offer.originalPrice)}
                  </span>
                  {offer.discountPercent && (
                    <span className={styles.discountTag}>
                      <Tag size={10} />
                      {offer.discountPercent}% OFF
                    </span>
                  )}
                </>
              )}
            </div>
          </>
        )}

        {isBlog && blog && (
          <div className={styles.meta}>
            {blog.date && (
              <span className={styles.metaItem}>
                <Calendar className={styles.metaIcon} />
                {blog.date}
              </span>
            )}
            {blog.readTime && (
              <span className={styles.metaItem}>
                <Clock className={styles.metaIcon} />
                {blog.readTime}
              </span>
            )}
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <Link
          href={actionHref}
          className={`${styles.cta} ${isOffer ? styles.ctaGold : styles.ctaBlue}`}
        >
          {label}
          <ArrowRight className={styles.ctaIcon} />
        </Link>
      </div>
    </article>
  );
}
