"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  TrendingUp, 
  Compass, 
  CheckCircle,
  Plane,
  BookOpen
} from 'lucide-react';
import styles from './page.module.css';

function DashboardPageContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';
  const [offers, setOffers] = React.useState<any[]>([]);
  const [loadingOffers, setLoadingOffers] = React.useState(false);

  React.useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    setLoadingOffers(true);
    try {
      const response = await fetch("https://destinosincriveis.vps-kinghost.net/api/offers");
      if (response.ok) {
        const data = await response.json();
        setOffers(data);
      }
    } catch (err) {
      console.error("Error fetching offers:", err);
    } finally {
      setLoadingOffers(false);
    }
  };

  return (
    <>
      {/* TAB 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className={styles.dashboardTab}>
          <div className={styles.welcomeBanner}>
            <div className={styles.welcomeText}>
              <h2>Bem-vindo ao CLUB DIJA! 👑</h2>
              <p>Você agora tem acesso aos melhores alertas de passagens aéreas e hotéis do Brasil, com descontos de até 70%. Mantenha suas notificações do WhatsApp ativas!</p>
            </div>
            <div className={styles.welcomeBannerLogo}>
              <img src="/logo-oficial.jpg" alt="Logo" className={styles.bannerLogoImage} />
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
                <Compass size={24} />
              </div>
              <div className={styles.statInfo}>
                <h3>Grupos WhatsApp</h3>
                <p>3 Grupos VIP Ativos</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                <TrendingUp size={24} />
              </div>
              <div className={styles.statInfo}>
                <h3>Economia Média</h3>
                <p>Economize até R$ 1.500/viagem</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
                <CheckCircle size={24} />
              </div>
              <div className={styles.statInfo}>
                <h3>Status Assinatura</h3>
                <p>Ativa e Renovada</p>
              </div>
            </div>
          </div>

          <div className={styles.sectionRow}>
            <div className={styles.recentOffersContainer}>
              <h2>Últimas Ofertas Alertas</h2>
              {loadingOffers ? (
                <p>Carregando ofertas...</p>
              ) : (
                <div className={styles.recentOffersList}>
                  {offers.slice(0, 3).map((offer, idx) => (
                    <div key={idx} className={styles.offerItem}>
                      <div className={styles.offerBadge}>{offer.desconto_percent}% OFF</div>
                      <div className={styles.offerDetails}>
                        <h4>{offer.origem} ➡️ {offer.destino}</h4>
                        <p>{offer.companhia} • R$ {offer.preco_atual} <span className={styles.oldPrice}>R$ {offer.preco_original}</span></p>
                      </div>
                      <a href={offer.link_afiliado} target="_blank" rel="noopener noreferrer" className={styles.viewOfferBtn}>
                        Ver Oferta
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OFFERS */}
      {activeTab === 'offers' && (
        <div className={styles.offersTab}>
          {loadingOffers ? (
            <div className={styles.loadingWrapper}>Carregando ofertas VIP...</div>
          ) : (
            <div className={styles.offersGrid}>
              {offers.map((offer, index) => (
                <div key={index} className={styles.offerCard}>
                  <div className={styles.offerImageWrapper}>
                    <img 
                      src={offer.imagem_url || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80"} 
                      alt={offer.destino} 
                      className={styles.offerImage}
                    />
                    <span className={styles.discountTag}>{offer.desconto_percent}% de Desconto</span>
                  </div>
                  <div className={styles.offerBody}>
                    <h3 className={styles.offerTitle}>{offer.origem} para {offer.destino}</h3>
                    <p className={styles.offerText}>{offer.texto_venda || "Oferta de viagem imperdível selecionada pela inteligência artificial do Club Dija."}</p>
                    <div className={styles.offerPrices}>
                      <div className={styles.priceRow}>
                        <span className={styles.currentPrice}>R$ {offer.preco_atual}</span>
                        <span className={styles.originalPrice}>R$ {offer.preco_original}</span>
                      </div>
                      <span className={styles.airlineName}>{offer.companhia}</span>
                    </div>
                    <a 
                      href={offer.link_afiliado} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.buyBtn}
                    >
                      Reservar Viagem
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: TIPS */}
      {activeTab === 'tips' && (
        <div className={styles.tipsTab}>
          <div className={styles.tipsGrid}>
            <div className={styles.tipCard}>
              <div className={styles.tipBadge}>Dica de Ouro</div>
              <h3>Como acumular milhas 5x mais rápido</h3>
              <p>Aprenda a mapear compras do dia a dia em parceiros como Livelo e Esfera para maximizar o acúmulo de milhas aéreas.</p>
              <a href="#" className={styles.readTipLink}>Ler Guia Completo ➡️</a>
            </div>
            <div className={styles.tipCard}>
              <div className={styles.tipBadge}>Roteiro VIP</div>
              <h3>Santiago do Chile: Guia Completo de 5 dias</h3>
              <p>O melhor roteiro mapeando vinícolas, passeios na Cordilheira e restaurantes imperdíveis em Santiago.</p>
              <a href="#" className={styles.readTipLink}>Ler Guia Completo ➡️</a>
            </div>
            <div className={styles.tipCard}>
              <div className={styles.tipBadge}>Hacks de Viagem</div>
              <h3>Como evitar taxas abusivas de bagagem</h3>
              <p>Macetes práticos para otimizar a mala de mão e quais companhias são mais flexíveis na fiscalização.</p>
              <a href="#" className={styles.readTipLink}>Ler Guia Completo ➡️</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div style={{ padding: '20px', color: '#ffffff' }}>Carregando...</div>}>
      <DashboardPageContent />
    </Suspense>
  );
}
