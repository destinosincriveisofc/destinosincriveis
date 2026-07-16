"use client";

import React from 'react';
import { 
  Home, 
  Plane, 
  Users, 
  BookOpen, 
  LogOut, 
  Bell, 
  TrendingUp, 
  Compass, 
  CheckCircle,
  ThumbsUp,
  MessageSquare,
  Send,
  User
} from 'lucide-react';
import styles from './page.module.css';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [user, setUser] = React.useState<any>(null);
  const [offers, setOffers] = React.useState<any[]>([]);
  const [loadingOffers, setLoadingOffers] = React.useState(false);
  const [posts, setPosts] = React.useState<any[]>([
    {
      id: "1",
      author: "Juliano da Silva",
      role: "Fundador CLUB DIJA",
      avatar: "👑",
      time: "Há 2 horas",
      content: "✈️ Galera, acabamos de enviar um alerta insano para Santiago no grupo de Ofertas! Voos saindo de SP por apenas R$ 890 ida e volta. Quem vai aproveitar?",
      likes: 24,
      liked: false,
      comments: [
        { author: "Maria Sousa", content: "Já emiti o meu! Santiago aí vou eu! 😍" },
        { author: "Carlos Lima", content: "Melhor clube de viagens, sem dúvidas!" }
      ]
    },
    {
      id: "2",
      author: "Ana Beatriz",
      role: "Membro VIP",
      avatar: "🌎",
      time: "Há 5 horas",
      content: "Acabei de voltar de Buenos Aires usando as dicas de roteiro daqui do Club. O restaurante Don Julio realmente vale cada centavo e a reserva antecipada funcionou perfeitamente!",
      likes: 15,
      liked: true,
      comments: []
    }
  ]);
  const [newPostText, setNewPostText] = React.useState("");

  React.useEffect(() => {
    // Auth Check
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (!token) {
      window.location.href = "/login";
    } else if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Fetch VIP Offers
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost = {
      id: String(posts.length + 1),
      author: user?.nome || "Membro Club",
      role: "Membro VIP",
      avatar: "👤",
      time: "Agora mesmo",
      content: newPostText,
      likes: 0,
      liked: false,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setNewPostText("");
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span className={styles.sidebarLogoEmoji}>✈️</span>
          <h2 className={styles.sidebarLogoText}>CLUB DIJA</h2>
        </div>

        <nav className={styles.menu}>
          <button 
            onClick={() => setActiveTab("dashboard")} 
            className={`${styles.menuItem} ${activeTab === 'dashboard' ? styles.active : ''}`}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab("offers")} 
            className={`${styles.menuItem} ${activeTab === 'offers' ? styles.active : ''}`}
          >
            <Plane size={20} />
            <span>Ofertas VIP</span>
          </button>
          <button 
            onClick={() => setActiveTab("community")} 
            className={`${styles.menuItem} ${activeTab === 'community' ? styles.active : ''}`}
          >
            <Users size={20} />
            <span>Comunidade</span>
          </button>
          <button 
            onClick={() => setActiveTab("tips")} 
            className={`${styles.menuItem} ${activeTab === 'tips' ? styles.active : ''}`}
          >
            <BookOpen size={20} />
            <span>Dicas & Notícias</span>
          </button>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatarWrapper}>
              <User size={18} />
            </div>
            <div className={styles.userDetails}>
              <p className={styles.userName}>{user?.nome || "Carregando..."}</p>
              <span className={styles.userRole}>VIP Member</span>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* Top Header */}
        <header className={styles.topHeader}>
          <div className={styles.headerTitleContainer}>
            <h1 className={styles.headerTitle}>
              {activeTab === 'dashboard' && "Painel Geral"}
              {activeTab === 'offers' && "Ofertas de Viagens VIP"}
              {activeTab === 'community' && "Rede Social Privada"}
              {activeTab === 'tips' && "Guia de Viagem & Dicas"}
            </h1>
            <p className={styles.headerSubtitle}>
              Seja bem-vindo, {user?.nome || "Membro"}!
            </p>
          </div>
          <div className={styles.headerActions}>
            <div className={styles.bellIconWrapper}>
              <Bell size={20} />
              <span className={styles.bellBadge}></span>
            </div>
          </div>
        </header>

        {/* Tab Contents */}
        <div className={styles.tabContainer}>
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className={styles.dashboardTab}>
              <div className={styles.welcomeBanner}>
                <div className={styles.welcomeText}>
                  <h2>Bem-vindo ao CLUB DIJA! 👑</h2>
                  <p>Você agora tem acesso aos melhores alertas de passagens aéreas e hotéis do Brasil, com descontos de até 70%. Mantenha suas notificações do WhatsApp ativas!</p>
                </div>
                <div className={styles.welcomeBannerLogo}>✈️</div>
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

          {/* TAB 3: COMMUNITY */}
          {activeTab === 'community' && (
            <div className={styles.communityTab}>
              <div className={styles.feedContainer}>
                {/* Create Post Form */}
                <form onSubmit={handleCreatePost} className={styles.createPostForm}>
                  <textarea 
                    placeholder="Compartilhe seu próximo destino, dúvidas de viagem ou conquistas de emissões..." 
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    className={styles.postTextarea}
                    required
                  />
                  <div className={styles.formActions}>
                    <button type="submit" className={styles.postSubmitBtn}>
                      <Send size={16} />
                      <span>Postar na Comunidade</span>
                    </button>
                  </div>
                </form>

                {/* Posts Feed */}
                <div className={styles.postsFeed}>
                  {posts.map((post) => (
                    <div key={post.id} className={styles.postCard}>
                      <div className={styles.postHeader}>
                        <div className={styles.postAvatar}>{post.avatar}</div>
                        <div className={styles.postAuthorInfo}>
                          <h4>{post.author}</h4>
                          <span>{post.role} • {post.time}</span>
                        </div>
                      </div>
                      <p className={styles.postContent}>{post.content}</p>
                      
                      <div className={styles.postStats}>
                        <button 
                          onClick={() => handleLike(post.id)} 
                          className={`${styles.likeBtn} ${post.liked ? styles.liked : ''}`}
                        >
                          <ThumbsUp size={16} />
                          <span>{post.likes} Curtidas</span>
                        </button>
                        <div className={styles.commentsCount}>
                          <MessageSquare size={16} />
                          <span>{post.comments.length} Comentários</span>
                        </div>
                      </div>

                      {post.comments.length > 0 && (
                        <div className={styles.commentsSection}>
                          {post.comments.map((comment: any, idx: number) => (
                            <div key={idx} className={styles.commentItem}>
                              <strong>{comment.author}:</strong> {comment.content}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
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
        </div>
      </main>
    </div>
  );
}
