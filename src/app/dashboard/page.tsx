"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  TrendingUp, 
  Compass, 
  CheckCircle,
  Plane,
  BookOpen,
  Search,
  Send
} from 'lucide-react';
import styles from './page.module.css';

function DashboardPageContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'dashboard';
  const [offers, setOffers] = React.useState<any[]>([]);
  const [loadingOffers, setLoadingOffers] = React.useState(false);

  // Pesquisa VIP
  const [searchDestino, setSearchDestino] = React.useState('');
  const [searchPreco, setSearchPreco] = React.useState('');
  const [searchSubmitting, setSearchSubmitting] = React.useState(false);
  const [searchMsg, setSearchMsg] = React.useState('');

  React.useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    setLoadingOffers(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("https://destinosincriveis.vps-kinghost.net/api/dashboard/vip-offers", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setOffers(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error("Error fetching offers:", err);
    } finally {
      setLoadingOffers(false);
    }
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchSubmitting(true);
    setSearchMsg('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://destinosincriveis.vps-kinghost.net/api/members/search-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ destino: searchDestino, preco_maximo: searchPreco ? Number(searchPreco) : null })
      });
      const data = await res.json();
      if (res.ok) {
        setSearchMsg('✅ ' + data.message);
        setSearchDestino('');
        setSearchPreco('');
      } else {
        setSearchMsg('❌ ' + (data.error || 'Erro ao registrar pedido'));
      }
    } catch {
      setSearchMsg('❌ Erro de conexão. Tente novamente.');
    } finally {
      setSearchSubmitting(false);
    }
  };

  return (
    <>
      {/* TAB 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className={styles.dashboardTab}>

          {/* BANNER DE AVISO DE OFERTAS */}
          <div className={styles.alertBanner}>
            <span className={styles.alertBannerIcon}>⚡</span>
            <p>Todas as ofertas são buscadas em tempo real. O site é atualizado 3x ao dia. Valores podem sofrer alterações sem aviso prévio.</p>
          </div>

          <div className={styles.welcomeBanner}>
            <div className={styles.welcomeText}>
              <h2>Bem-vindo ao CLUB DIJA! 👑</h2>
              <p>Você agora tem acesso aos melhores alertas de passagens aéreas e hotéis do Brasil, com descontos de até 70%. Mantenha suas notificações do WhatsApp ativas!</p>
            </div>
            <div className={styles.welcomeBannerLogo}>
              <img src="/logo-oficial.jpg" alt="Logo" className={styles.bannerLogoImage} />
            </div>
          </div>

          {/* GRUPOS DE WHATSAPP PREMIUM */}
          <div className={styles.whatsappSection}>
            <h3 className={styles.whatsappTitle}>📱 Seus Grupos VIP no WhatsApp</h3>
            <div className={styles.whatsappGrid}>
              <a
                href="https://chat.whatsapp.com/ofertas-vip"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.whatsappBtn} ${styles.whatsappBtnGold}`}
              >
                <span className={styles.whatsappBtnEmoji}>💎</span>
                <div>
                  <strong>Grupo Ofertas VIP</strong>
                  <small>Erros tarifários e promoções relâmpago</small>
                </div>
                <span className={styles.whatsappArrow}>→</span>
              </a>
              <a
                href="https://chat.whatsapp.com/dicas-viagem"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.whatsappBtn} ${styles.whatsappBtnBlue}`}
              >
                <span className={styles.whatsappBtnEmoji}>💡</span>
                <div>
                  <strong>Grupo de Dicas</strong>
                  <small>Hacks, roteiros e economias</small>
                </div>
                <span className={styles.whatsappArrow}>→</span>
              </a>
              <a
                href="https://chat.whatsapp.com/club-dija-comunidade"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.whatsappBtn} ${styles.whatsappBtnGreen}`}
              >
                <span className={styles.whatsappBtnEmoji}>👥</span>
                <div>
                  <strong>Comunidade CLUB DIJA</strong>
                  <small>Relatos, fotos e troca de experiências</small>
                </div>
                <span className={styles.whatsappArrow}>→</span>
              </a>
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

          {/* FORMULÁRIO PESQUISA VIP */}
          <div className={styles.searchRequestBox}>
            <div className={styles.searchRequestHeader}>
              <Search size={20} />
              <h3>🔍 Pesquisa VIP de Destinos</h3>
            </div>
            <p className={styles.searchRequestDesc}>Diga ao nosso agente IA para onde quer ir e quanto quer pagar. Priorizaremos sua busca nos próximos ciclos!</p>
            <form onSubmit={handleSearchSubmit} className={styles.searchRequestForm}>
              <div className={styles.searchRequestFields}>
                <div className={styles.searchRequestField}>
                  <label>Destino desejado *</label>
                  <input
                    type="text"
                    value={searchDestino}
                    onChange={e => setSearchDestino(e.target.value)}
                    placeholder="Ex: Roma, Paris, Miami..."
                    required
                    className={styles.searchInput}
                  />
                </div>
                <div className={styles.searchRequestField}>
                  <label>Preço máximo (R$)</label>
                  <input
                    type="number"
                    value={searchPreco}
                    onChange={e => setSearchPreco(e.target.value)}
                    placeholder="Ex: 2000"
                    min="0"
                    className={styles.searchInput}
                  />
                </div>
              </div>
              <button type="submit" disabled={searchSubmitting} className={styles.searchSubmitBtn}>
                <Send size={16} />
                {searchSubmitting ? 'Registrando...' : 'Enviar Pedido ao Agente IA'}
              </button>
            </form>
            {searchMsg && <p className={styles.searchMsg}>{searchMsg}</p>}
          </div>

          <div className={styles.sectionRow}>
            <div className={styles.recentOffersContainer}>
              <h2>Últimas Ofertas Alertas</h2>
              {loadingOffers ? (
                <p>Carregando ofertas...</p>
              ) : (
                <div className={styles.recentOffersList}>
                  {offers.slice(0, 3).map((offer, idx) => {
                    const destImgKey = (offer.destino || 'travel').toLowerCase().replace(/[^a-z]/g, '');
                    return (
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
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: OFFERS */}
      {activeTab === 'offers' && (
        <div className={styles.offersTab}>
          {/* BANNER DE AVISO DE OFERTAS */}
          <div className={styles.alertBanner}>
            <span className={styles.alertBannerIcon}>⚡</span>
            <p>Todas as ofertas são buscadas em tempo real. O site é atualizado 3x ao dia. Valores podem sofrer alterações sem aviso prévio.</p>
          </div>
          {loadingOffers ? (
            <div className={styles.loadingWrapper}>Carregando ofertas VIP...</div>
          ) : (
            <div className={styles.offersGrid}>
              {offers.map((offer, index) => {
                const destKey = (offer.destino || 'travel').toLowerCase().replace(/[^a-z]/g, '');
                const imgUrl = offer.imagem_url || `https://source.unsplash.com/400x300/?${destKey},travel`;
                return (
                  <div key={index} className={styles.offerCard}>
                    <div className={styles.offerImageWrapper}>
                      <img 
                        src={imgUrl} 
                        alt={offer.destino} 
                        className={styles.offerImage}
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://source.unsplash.com/400x300/?travel,vacation`; }}
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
                );
              })}
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
