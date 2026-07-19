"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Flame,
  Plane,
  Hotel,
  Compass,
  Gift,
  ExternalLink,
  Tag,
  AlertTriangle,
  Heart,
  MessageCircle,
  MapPin,
  Clock,
} from 'lucide-react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';
import { getDestinationImage, formatPrice, getSocialMetrics, getBrandGradient } from '@/lib/visual-assets';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import TravelSearchWidget from '@/components/TravelSearchWidget';
import styles from './page.module.css';

export default function VIPOffersPage() {
  const router = useRouter();
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [likedOffers, setLikedOffers] = useState<Set<string>>(new Set());

  const fetchVIPOffers = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const baseUrl = typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
          ? 'http://localhost:5001'
          : 'https://destinosincriveis.vps-kinghost.net';

      const response = await fetchWithTimeout(`${baseUrl}/api/dashboard/vip-offers`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      setOffers(data);
    } catch (err: any) {
      console.error("Error fetching VIP offers:", err);
      setError("Não foi possível carregar as ofertas VIP. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchVIPOffers(token);
  }, [router]);

  const getFilteredOffers = () => {
    if (activeFilter === 'all') return offers;
    return offers.filter(o => o.tipo === activeFilter);
  };

  const getTypeIcon = (tipo: string) => {
    switch (tipo?.toLowerCase()) {
      case 'voo': return <Plane size={14} />;
      case 'hotel': return <Hotel size={14} />;
      case 'pacote': return <Gift size={14} />;
      case 'passeio': return <Compass size={14} />;
      default: return <Plane size={14} />;
    }
  };

  const getTypeLabel = (tipo: string) => {
    switch (tipo?.toLowerCase()) {
      case 'voo': return 'Voo promocional';
      case 'hotel': return 'Resort / Hotel';
      case 'pacote': return 'Pacote Completo';
      case 'passeio': return 'Passeio / Tour';
      default: return tipo;
    }
  };

  const toggleLike = (offerId: string) => {
    setLikedOffers(prev => {
      const next = new Set(prev);
      if (next.has(offerId)) next.delete(offerId);
      else next.add(offerId);
      return next;
    });
  };

  const filteredOffers = getFilteredOffers();

  const offersRef = useScrollReveal<HTMLDivElement>();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const filterRef = useScrollReveal<HTMLDivElement>();

  return (
    <div className={styles.container}>
      <TravelSearchWidget variant="vip" />
      <div className={`${styles.headerSection} fade-in-up`} ref={headerRef}>
        <div className={styles.titleWrapper}>
          <h2>Vitrine Secreta VIP</h2>
          <p>Ofertas exclusivas de hotéis de luxo, bugs tarifários e pacotes garimpados pela nossa IA mineradora.</p>
        </div>
        <div className={styles.vipBadgeHeader}>
          <Sparkles size={16} />
          <span>Acesso Premium</span>
        </div>
      </div>

      <div className={`${styles.filterBar} fade-in-up`} ref={filterRef}>
        <button
          onClick={() => setActiveFilter('all')}
          className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
        >
          Todas as Ofertas
        </button>
        <button
          onClick={() => setActiveFilter('voo')}
          className={`${styles.filterBtn} ${activeFilter === 'voo' ? styles.active : ''}`}
        >
          <Plane size={14} />
          Voos
        </button>
        <button
          onClick={() => setActiveFilter('hotel')}
          className={`${styles.filterBtn} ${activeFilter === 'hotel' ? styles.active : ''}`}
        >
          <Hotel size={14} />
          Hotéis & Resorts
        </button>
        <button
          onClick={() => setActiveFilter('pacote')}
          className={`${styles.filterBtn} ${activeFilter === 'pacote' ? styles.active : ''}`}
        >
          <Gift size={14} />
          Pacotes
        </button>
        <button
          onClick={() => setActiveFilter('passeio')}
          className={`${styles.filterBtn} ${activeFilter === 'passeio' ? styles.active : ''}`}
        >
          <Compass size={14} />
          Passeios
        </button>
      </div>



      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Minerando e validando ofertas VIP de última hora...</p>
        </div>
      ) : error ? (
        <div className={styles.emptyContainer}>
          <AlertTriangle size={48} className={styles.emptyIcon} style={{ color: '#E53935' }} />
          <p>{error}</p>
        </div>
      ) : filteredOffers.length === 0 ? (
        <div className={styles.emptyContainer}>
          <AlertTriangle size={48} className={styles.emptyIcon} />
          <p>Nenhuma oferta VIP encontrada nesta categoria no momento.</p>
        </div>
      ) : (
        <div className={styles.offersGrid}>
          {filteredOffers.map((offer) => {
            const formattedPrice = formatPrice(Number(offer.preco_atual));
            const formattedOriginalPrice = formatPrice(Number(offer.preco_original));
            const imgUrl = getDestinationImage(offer.destino, offer.destino, offer.imagem_url);
            const { likes, comments } = getSocialMetrics(offer.id);
            const isLiked = likedOffers.has(offer.id);

            return (
              <div key={offer.id} className={`${styles.offerCard} fade-in-up hover-lift`}>
                <div className={styles.imageContainer}>
                  <img
                    src={imgUrl}
                    alt={offer.destino}
                    className={styles.offerImage}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80";
                    }}
                  />
                  <div className={styles.overlay} style={{ background: getBrandGradient('bottom') }} />
                  <div className={styles.badgesWrapper}>
                    <span className={styles.vipBadge}>
                      <Sparkles size={12} />
                      VIP EXCLUSIVO
                    </span>
                    <span className={styles.discountBadge}>
                      <Tag size={12} />
                      -{offer.desconto_percent}% OFF
                    </span>
                  </div>
                  {offer.nota_urgencia && (
                    <span className={styles.urgencyBadge}>
                      <Flame size={14} />
                      {offer.nota_urgencia}/10
                    </span>
                  )}
                  <div className={styles.vipSocialRow}>
                    <button
                      onClick={() => toggleLike(offer.id)}
                      className={`${styles.vipSocialBtn} ${isLiked ? styles.vipLiked : ''}`}
                    >
                      <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
                      <span>{isLiked ? likes + 1 : likes}</span>
                    </button>
                    <div className={styles.vipSocialBtn}>
                      <MessageCircle size={14} />
                      <span>{comments}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.locationRow}>
                    <MapPin size={14} className={styles.locationIcon} />
                    <h3 className={styles.routeTitle}>
                      {offer.origem ? (
                        <>{offer.origem} <Plane size={12} className={styles.routeArrow} /> {offer.destino}</>
                      ) : (
                        offer.destino
                      )}
                    </h3>
                    {offer.companhia && (
                      <span className={styles.companyTag}>{offer.companhia}</span>
                    )}
                  </div>

                  <p className={styles.salesText}>{offer.texto_venda}</p>

                  <div className={styles.priceSection}>
                    <div>
                      <span className={styles.priceLabel}>Preço VIP Club</span>
                      <div className={styles.priceWrapper}>
                        <span className={styles.currentPrice}>R$ {formattedPrice}</span>
                        {offer.preco_original && (
                          <span className={styles.originalPrice}>R$ {formattedOriginalPrice}</span>
                        )}
                      </div>
                    </div>
                    <div className={styles.typeBadge}>
                      {getTypeIcon(offer.tipo)}
                      <span>{getTypeLabel(offer.tipo)}</span>
                    </div>
                  </div>

                  <a
                    href={offer.link_afiliado || (offer as any).url_afiliado || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.bookingBtn}
                  >
                    <span>Aproveitar Tarifa VIP</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
