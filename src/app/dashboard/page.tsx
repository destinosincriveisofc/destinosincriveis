"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';
import { 
  TrendingUp, 
  Compass, 
  CheckCircle,
  Plane,
  BookOpen,
  Search,
  Send,
  Brain,
  User,
  Heart,
  Sparkles,
  AlertCircle,
  ArrowRight,
  Settings,
  Plus,
  Trash2,
  Award,
  Clock,
  ChevronRight,
  HeartOff,
  Flame
} from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import styles from './page.module.css';

const API = 'https://destinosincriveis.vps-kinghost.net';

function DashboardPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get('tab') || 'dashboard';
  
  // Existing states for VIP Offers
  const [offers, setOffers] = React.useState<any[]>([]);
  const [loadingOffers, setLoadingOffers] = React.useState(false);

  // Existing states for VIP Search Form
  const [searchDestino, setSearchDestino] = React.useState('');
  const [searchPreco, setSearchPreco] = React.useState('');
  const [searchSubmitting, setSearchSubmitting] = React.useState(false);
  const [searchMsg, setSearchMsg] = React.useState('');

  // Cognitive States
  const [user, setUser] = React.useState<any>(null);
  const [preferences, setPreferences] = React.useState<any>(null);
  const [memories, setMemories] = React.useState<any[]>([]);
  const [favorites, setFavorites] = React.useState<any[]>([]);
  const [events, setEvents] = React.useState<any[]>([]);
  const [recommendations, setRecommendations] = React.useState<any[]>([]);
  const [destinationsMap, setDestinationsMap] = React.useState<Record<string, any>>({});
  const [loadingCognitive, setLoadingCognitive] = React.useState(true);

  // Onboarding States
  const [showOnboarding, setShowOnboarding] = React.useState(false);
  const [onboardingStep, setOnboardingStep] = React.useState(1);
  const [onboardingSubmitting, setOnboardingSubmitting] = React.useState(false);
  const [calibrating, setCalibrating] = React.useState(false);
  const [calibrationProgress, setCalibrationProgress] = React.useState(0);
  const [calibrationText, setCalibrationText] = React.useState('Sincronizando com a DIJA AI...');

  // Onboarding Form Values
  const [onbNickname, setOnbNickname] = React.useState('');
  const [onbBio, setOnbBio] = React.useState('');
  const [onbStyles, setOnbStyles] = React.useState<string[]>([]);
  const [onbBudget, setOnbBudget] = React.useState('medium');
  const [onbPace, setOnbPace] = React.useState('moderate');
  const [onbContinents, setOnbContinents] = React.useState<string[]>([]);

  // Token helper
  const getToken = () => localStorage.getItem('token') || '';

  // Fetch flight offers from old backend
  const fetchOffers = async () => {
    setLoadingOffers(true);
    try {
      const token = getToken();
      const response = await fetchWithTimeout(`${API}/api/dashboard/vip-offers`, {
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

  // Fetch cognitive user data
  const fetchCognitiveData = async () => {
    const token = getToken();
    if (!token) return;

    try {
      // 1. Get Me (contains user, profile, preferences)
      const resMe = await fetchWithTimeout(`${API}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (resMe.ok) {
        const userData = await resMe.json();
        setUser(userData);
        setPreferences(userData.preferences);
        
        // Auto-trigger onboarding if user styles are completely unconfigured
        if (!userData.preferences || !userData.preferences.traveler_styles || userData.preferences.traveler_styles.length === 0) {
          setShowOnboarding(true);
        }

        // Initialize onboarding form values if pre-existent
        if (userData.profile) {
          setOnbNickname(userData.profile.nickname || '');
          setOnbBio(userData.profile.bio || '');
        }
        if (userData.preferences) {
          setOnbStyles(userData.preferences.traveler_styles || []);
          setOnbBudget(userData.preferences.average_budget_level || 'medium');
          setOnbPace(userData.preferences.travel_pace || 'moderate');
          setOnbContinents(userData.preferences.preferred_continents || []);
        }
      }

      // 2. Fetch memories
      const resMem = await fetchWithTimeout(`${API}/api/users/me/memories`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resMem.ok) {
        const memData = await resMem.json();
        setMemories(memData);
      }

      // 3. Fetch favorites
      const resFav = await fetchWithTimeout(`${API}/api/users/me/favorites`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resFav.ok) {
        const favData = await resFav.json();
        setFavorites(favData);
      }

      // 4. Fetch events
      const resEv = await fetchWithTimeout(`${API}/api/users/me/events`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resEv.ok) {
        const evData = await resEv.json();
        setEvents(evData);
      }

      // 5. Fetch personalized recommendations
      const resRec = await fetchWithTimeout(`${API}/api/destinations/recommendations?limit=3`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resRec.ok) {
        const recData = await resRec.json();
        setRecommendations(recData);
      }

    } catch (err) {
      console.error("Error fetching cognitive data:", err);
    } finally {
      setLoadingCognitive(false);
    }
  };

  // Fetch all destinations list to map info
  const fetchDestinationsList = async () => {
    try {
      const res = await fetchWithTimeout(`${API}/api/destinations/`);
      if (res.ok) {
        const data = await res.json();
        const mapping: Record<string, any> = {};
        data.forEach((city: any) => {
          mapping[city.id] = city;
        });
        setDestinationsMap(mapping);
      }
    } catch (err) {
      console.error("Error loading destinations:", err);
    }
  };

  // Initial load
  React.useEffect(() => {
    fetchOffers();
    fetchDestinationsList();
    fetchCognitiveData();
  }, []);

  // Search VIP Submit handler
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearchSubmitting(true);
    setSearchMsg('');
    try {
      const token = getToken();
      const res = await fetchWithTimeout(`${API}/api/members/search-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ destino: searchDestino, preco_maximo: searchPreco ? Number(searchPreco) : null })
      });
      const data = await res.json();
      if (res.ok) {
        setSearchMsg('✅ ' + data.message);
        setSearchDestino('');
        setSearchPreco('');
        
        // Record event
        await recordInteractionEvent('search_destination', 'destination', '00000000-0000-0000-0000-000000000000');
      } else {
        setSearchMsg('❌ ' + (data.error || 'Erro ao registrar pedido'));
      }
    } catch {
      setSearchMsg('❌ Erro de conexão. Tente novamente.');
    } finally {
      setSearchSubmitting(false);
    }
  };

  // Record Interaction Event helper
  const recordInteractionEvent = async (eventType: string, itemType: string, itemId: string) => {
    const token = getToken();
    if (!token) return;
    try {
      await fetchWithTimeout(`${API}/api/users/me/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ event_type: eventType, item_type: itemType, item_id: itemId })
      });
      fetchCognitiveData(); // Refresh history
    } catch (err) {
      console.error("Error logging interaction event:", err);
    }
  };

  // Save/Unsave Favorites handler
  const handleToggleFavorite = async (cityId: string, isFav: boolean) => {
    const token = getToken();
    if (!token) return;

    try {
      if (isFav) {
        // Remove from favorites
        const res = await fetchWithTimeout(`${API}/api/users/me/favorites/destination/${cityId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          await recordInteractionEvent('unsave_destination', 'destination', cityId);
        }
      } else {
        // Save to favorites
        const res = await fetchWithTimeout(`${API}/api/users/me/favorites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ item_type: 'destination', item_id: cityId })
        });
        if (res.ok) {
          await recordInteractionEvent('save_destination', 'destination', cityId);
        }
      }
      fetchCognitiveData(); // Refresh favorites list
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  // Onboarding Wizard steps submit
  const handleOnboardingSubmit = async () => {
    setOnboardingSubmitting(true);
    setCalibrating(true);
    
    // Simulate calibration progression
    const phrases = [
      'Sincronizando com a DIJA AI...',
      'Analisando suas biografia e preferências...',
      'Mapeando destinos ideais com seu orçamento...',
      'Calibrando o motor cognitivo em tempo real...',
      'Preparando recomendações sob medida!'
    ];

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setCalibrationProgress(progress);
      
      const phraseIndex = Math.min(Math.floor(progress / 20), phrases.length - 1);
      setCalibrationText(phrases[phraseIndex]);

      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 300);

    try {
      const token = getToken();
      
      // Save Profile nickname/bio
      await fetchWithTimeout(`${API}/api/users/me/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ nickname: onbNickname, bio: onbBio })
      });

      // Save Preferences styles/budget/pace/continents
      await fetchWithTimeout(`${API}/api/users/me/preferences`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          traveler_styles: onbStyles,
          average_budget_level: onbBudget,
          travel_pace: onbPace,
          preferred_continents: onbContinents
        })
      });

      // Wait for simulation to finish
      await new Promise(r => setTimeout(r, 3200));
      
      setShowOnboarding(false);
      setCalibrating(false);
      fetchCognitiveData(); // reload recommendations

    } catch (err) {
      console.error("Error saving onboarding details:", err);
      alert("Erro ao salvar dados de onboarding. Tente novamente.");
      setCalibrating(false);
    } finally {
      setOnboardingSubmitting(false);
    }
  };

  // Toggle onboarding preferences helper arrays
  const toggleOnbStyle = (style: string) => {
    setOnbStyles(prev => 
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const toggleOnbContinent = (continent: string) => {
    setOnbContinents(prev => 
      prev.includes(continent) ? prev.filter(c => c !== continent) : [...prev, continent]
    );
  };

  // ScrollReveal hooks
  const welcomeRef = useScrollReveal<HTMLDivElement>();
  const whatsappRef = useScrollReveal<HTMLDivElement>();
  const statsRef = useScrollReveal<HTMLDivElement>();
  const searchRef = useScrollReveal<HTMLDivElement>();
  const recentRef = useScrollReveal<HTMLDivElement>();
  const dijaRef = useScrollReveal<HTMLDivElement>();

  // Evolving Level Calculation
  const memoryScore = memories.length * 15;
  const eventScore = events.length * 3;
  const syncScore = Math.min(35 + memoryScore + eventScore, 100);

  // Favorites List mapping
  const favoriteCities = favorites
    .map(fav => destinationsMap[fav.item_id])
    .filter(Boolean);

  return (
    <>
      {/* ONBOARDING DIJA WIZARD MODAL */}
      {showOnboarding && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(5, 9, 24, 0.85)', backdropFilter: 'blur(20px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
          padding: 20, boxSizing: 'border-box'
        }}>
          {calibrating ? (
            <div style={{
              background: 'rgba(10, 18, 44, 0.8)', border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: 24, padding: 40, width: '100%', maxWidth: 500, textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>
              <Brain size={48} className="text-brand-blue animate-pulse" />
              <div style={{ width: '100%' }}>
                <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 800, margin: '0 0 8px 0' }}>Calibrando Motores DIJA</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 24px 0' }}>{calibrationText}</p>
                
                {/* Progress bar container */}
                <div style={{ width: '100%', height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ width: `${calibrationProgress}%`, height: '100%', background: 'linear-gradient(90deg, #38BDF8, #FFC107)', transition: 'width 0.3s ease-out' }} />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#0A122C]/95 border border-brand-blue/20 rounded-3xl w-full max-w-lg md:max-w-2xl min-h-[400px] flex flex-col shadow-2xl overflow-hidden relative mx-4">
              {/* Header */}
              <div className="p-5 md:py-6 md:px-8 border-b border-white/5 bg-white/[0.01]">
                <div className="flex items-center gap-2 mb-1">
                  <Brain size={20} className="text-brand-blue" />
                  <span className="text-[10px] font-black text-brand-blue tracking-wider uppercase">Onboarding Inteligente DIJA AI</span>
                </div>
                <h2 className="text-lg md:text-xl font-black text-white leading-snug">Configure sua Próxima Aventura</h2>
              </div>

              {/* Steps Progress dots */}
              <div className="flex px-5 md:px-8 pt-4 gap-2">
                {[1, 2, 3, 4].map(s => (
                  <div key={s} className="flex-1 h-1 rounded-full" style={{
                    background: s <= onboardingStep ? 'linear-gradient(90deg, #FFC107, #F59E0B)' : 'rgba(255,255,255,0.08)'
                  }} />
                ))}
              </div>

              {/* Step Content container */}
              <div className="flex-1 p-5 md:p-8 flex flex-col gap-6">
                {/* STEP 1: Nickname & Bio */}
                {onboardingStep === 1 && (
                  <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Como a DIJA deve te chamar? *</label>
                      <input
                        type="text"
                        value={onbNickname}
                        onChange={e => setOnbNickname(e.target.value)}
                        placeholder="Ex: Pedro, Cláudia, Rafa"
                        style={{
                          width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56,189,248,0.2)',
                          borderRadius: 12, padding: '14px 18px', color: '#fff', fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none'
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Nos conte sobre sua viagem ideal (Bio)</label>
                      <textarea
                        value={onbBio}
                        onChange={e => setOnbBio(e.target.value)}
                        placeholder="Ex: Viajo em casal com foco em ecoturismo e gastronomia. Preferimos descansar e evitar lugares com superlotação."
                        rows={4}
                        style={{
                          width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56,189,248,0.2)',
                          borderRadius: 12, padding: '14px 18px', color: '#fff', fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* STEP 2: Traveler Styles */}
                {onboardingStep === 2 && (
                  <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '0 0 10px 0' }}>Escolha um ou mais estilos que definem suas férias:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { key: 'adventure', label: '🧗 Aventura / Ecoturismo' },
                        { key: 'beach', label: '🏖️ Praia / Sol' },
                        { key: 'nature', label: '🌲 Natureza / Cachoeiras' },
                        { key: 'romantic', label: '🥂 Romântico / Casal' },
                        { key: 'family', label: '👨‍👩‍👧 Viagem em Família' },
                        { key: 'culture', label: '🏛️ Cultura / Museus' },
                        { key: 'culinary', label: '🍳 Gastronomia local' }
                      ].map(st => {
                        const selected = onbStyles.includes(st.key);
                        return (
                          <button
                            key={st.key}
                            onClick={() => toggleOnbStyle(st.key)}
                            style={{
                              background: selected ? 'rgba(56,189,248,0.12)' : 'rgba(0,0,0,0.2)',
                              border: selected ? '1px solid #38BDF8' : '1px solid rgba(255,255,255,0.06)',
                              borderRadius: 14, padding: '14px 16px', color: selected ? '#38BDF8' : '#94a3b8',
                              fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left',
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s'
                            }}
                          >
                            <span>{st.label}</span>
                            {selected && <CheckCircle size={14} style={{ marginLeft: 'auto', color: '#38BDF8' }} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 3: Budget and Pace */}
                {onboardingStep === 3 && (
                  <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 12 }}>Nível Médio de Orçamento</label>
                      <div className="flex flex-col sm:flex-row gap-3">
                        {[
                          { key: 'low', label: '🎒 Econômico', desc: 'Foco no menor custo' },
                          { key: 'medium', label: '🏨 Moderado', desc: 'Conforto equilibrado' },
                          { key: 'high', label: '💎 Premium / Luxo', desc: 'Experiências exclusivas' }
                        ].map(b => (
                          <button
                            key={b.key}
                            onClick={() => setOnbBudget(b.key)}
                            style={{
                              flex: '1 1 0%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                              background: onbBudget === b.key ? 'rgba(255,193,7,0.15)' : 'rgba(0,0,0,0.2)',
                              border: onbBudget === b.key ? '1px solid #FFC107' : '1px solid rgba(255,255,255,0.06)',
                              borderRadius: 14, padding: '16px 12px', color: onbBudget === b.key ? '#FFC107' : '#94a3b8',
                              cursor: 'pointer', transition: 'all 0.2s', width: '100%'
                            }}
                          >
                            <span style={{ fontWeight: 800, fontSize: '0.88rem' }}>{b.label}</span>
                            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{b.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 12 }}>Ritmo Desejado de Viagem</label>
                      <div className="flex flex-col sm:flex-row gap-3">
                        {[
                          { key: 'slow', label: '🧘 Lento', desc: 'Descansar e relaxar' },
                          { key: 'moderate', label: '🧭 Equilibrado', desc: 'Atividades e ócio' },
                          { key: 'fast', label: '🏃 Intenso', desc: 'Explorar o máximo' }
                        ].map(p => (
                          <button
                            key={p.key}
                            onClick={() => setOnbPace(p.key)}
                            style={{
                              flex: '1 1 0%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                              background: onbPace === p.key ? 'rgba(56,189,248,0.15)' : 'rgba(0,0,0,0.2)',
                              border: onbPace === p.key ? '1px solid #38BDF8' : '1px solid rgba(255,255,255,0.06)',
                              borderRadius: 14, padding: '16px 12px', color: onbPace === p.key ? '#38BDF8' : '#94a3b8',
                              cursor: 'pointer', transition: 'all 0.2s', width: '100%'
                            }}
                          >
                            <span style={{ fontSize: '0.88rem', fontWeight: 800 }}>{p.label}</span>
                            <span style={{ fontSize: '0.7rem', color: '#64748b' }}>{p.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Preferred Continents */}
                {onboardingStep === 4 && (
                  <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: '0 0 10px 0' }}>Selecione as regiões do planeta de sua maior preferência:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {['América do Sul', 'Europa', 'América do Norte', 'Ásia', 'Oceania', 'África'].map(c => {
                        const selected = onbContinents.includes(c);
                        return (
                          <button
                            key={c}
                            onClick={() => toggleOnbContinent(c)}
                            style={{
                              background: selected ? 'rgba(56,189,248,0.12)' : 'rgba(0,0,0,0.2)',
                              border: selected ? '1px solid #38BDF8' : '1px solid rgba(255,255,255,0.06)',
                              borderRadius: 14, padding: '14px 16px', color: selected ? '#38BDF8' : '#94a3b8',
                              fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', textAlign: 'left',
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.2s'
                            }}
                          >
                            <span>🌍 {c}</span>
                            {selected && <CheckCircle size={14} style={{ marginLeft: 'auto', color: '#38BDF8' }} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-5 md:py-6 md:px-8 border-t border-white/5 bg-white/[0.01] flex justify-between items-center gap-3">
                <button
                  disabled={onboardingStep === 1}
                  onClick={() => setOnboardingStep(prev => prev - 1)}
                  style={{
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                    color: '#94a3b8', fontSize: '0.85rem', fontWeight: 700, padding: '12px 20px',
                    borderRadius: 12, cursor: onboardingStep === 1 ? 'not-allowed' : 'pointer', opacity: onboardingStep === 1 ? 0.4 : 1
                  }}
                >
                  Voltar
                </button>
                <div className="ml-auto flex gap-3">
                  {onboardingStep < 4 ? (
                    <button
                      onClick={() => setOnboardingStep(prev => prev + 1)}
                      disabled={onboardingStep === 1 && !onbNickname.trim()}
                      style={{
                        background: 'linear-gradient(135deg, #FFC107, #F59E0B)', border: 'none',
                        color: '#0A122C', fontSize: '0.85rem', fontWeight: 800, padding: '12px 24px',
                        borderRadius: 12, cursor: (onboardingStep === 1 && !onbNickname.trim()) ? 'not-allowed' : 'pointer',
                        opacity: (onboardingStep === 1 && !onbNickname.trim()) ? 0.5 : 1
                      }}
                    >
                      Avançar
                    </button>
                  ) : (
                    <button
                      onClick={handleOnboardingSubmit}
                      disabled={onboardingSubmitting || onbStyles.length === 0}
                      style={{
                        background: 'linear-gradient(135deg, #38BDF8, #0284C7)', border: 'none',
                        color: '#fff', fontSize: '0.85rem', fontWeight: 800, padding: '12px 28px',
                        borderRadius: 12, cursor: onbStyles.length === 0 ? 'not-allowed' : 'pointer',
                        boxShadow: '0 4px 12px rgba(56,189,248,0.3)', opacity: onbStyles.length === 0 ? 0.5 : 1
                      }}
                    >
                      Calibrar DIJA AI
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 1: DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className={styles.dashboardTab}>

          {/* WARNING ALERT BANNER */}
          <div className={`${styles.alertBanner} fade-in-up`} ref={welcomeRef}>
            <span className={styles.alertBannerIcon}>⚡</span>
            <p>Todas as ofertas são buscadas em tempo real. O site é atualizado 3x ao dia. Valores podem sofrer alterações sem aviso prévio.</p>
          </div>

          <div className={`${styles.welcomeBanner} fade-in-up hover-lift`}>
            <div className={styles.welcomeText}>
              <h2>Bem-vindo ao CLUB DIJA, {user?.profile?.nickname || user?.full_name?.split(' ')[0] || "Membro"}! 👑</h2>
              <p>Você agora tem acesso aos melhores alertas de passagens aéreas e hotéis do Brasil, com descontos de até 70%. Mantenha suas notificações do WhatsApp ativas!</p>
            </div>
            <div className={styles.welcomeBannerLogo}>
              <img src="/logo-oficial.jpg" alt="Logo" className={styles.bannerLogoImage} />
            </div>
          </div>

          {/* TWO COLUMN COGNITIVE LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mb-8 cognitive-grid">
            
            {/* LEFT COLUMN: DIJA Evolução & Favoritos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              
              {/* MINHA DIJA AI WIDGET */}
              <div ref={dijaRef} className={`${styles.bentoCard} fade-in-up hover-lift`} style={{ position: 'relative' }}>
                <div className={styles.bentoCardHeader}>
                  <Brain size={22} className="text-brand-blue" />
                  <h3 className={styles.bentoCardTitle}>Minha DIJA AI</h3>
                  <button
                    onClick={() => { setOnboardingStep(1); setShowOnboarding(true); }}
                    style={{
                      background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.2)',
                      color: '#FFC107', fontSize: '0.72rem', fontWeight: 700, padding: '4px 10px',
                      borderRadius: 6, cursor: 'pointer', marginLeft: 'auto'
                    }}
                  >
                    Refazer Onboarding
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mb-5">
                  {/* Gauge style score */}
                  <div style={{
                    width: 70, height: 70, borderRadius: '50%', background: 'rgba(0,0,0,0.3)',
                    border: '3px solid #38BDF8', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0
                  }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 900, color: '#38BDF8' }}>{syncScore}%</span>
                    <span style={{ fontSize: '0.52rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 800 }}>Sinc</span>
                  </div>
                  
                  <div className="text-center sm:text-left">
                    <h4 style={{ color: '#fff', margin: '0 0 4px 0', fontSize: '0.9rem', fontWeight: 700 }}>Inteligência em Evolução</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: 0, lineHeight: 1.4 }}>
                      DIJA está adaptando as buscas ao seu perfil. Converse no chat para que ela aprenda seus hábitos.
                    </p>
                  </div>
                </div>

                {/* Memories List */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
                  <h5 style={{ color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 10px 0' }}>Conhecimentos Recém Aprendidos</h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {memories.slice(0, 3).map(mem => (
                      <span key={mem.id} style={{
                        background: 'rgba(56,189,248,0.08)', border: '1px solid rgba(56,189,248,0.15)',
                        color: '#38BDF8', fontSize: '0.72rem', fontWeight: 700, padding: '4px 8px', borderRadius: 6
                      }}>
                        🧠 {mem.memory_key.replace("likes_", "Gosta de ").replace("dislikes_", "Evita ").replace("prefers_", "Prefere ").toUpperCase()}
                      </span>
                    ))}
                    {memories.length === 0 && (
                      <span style={{ color: '#475569', fontSize: '0.75rem', fontStyle: 'italic' }}>Nenhuma memória coletada ainda. Fale com a DIJA no chat cognitivo!</span>
                    )}
                  </div>
                </div>
              </div>

              {/* SEUS DESTINOS SALVOS (FAVORITOS) */}
              <div className={`${styles.bentoCard} fade-in-up hover-lift`}>
                <div className={styles.bentoCardHeader}>
                  <Heart size={20} className="text-red-400" />
                  <h3 className={styles.bentoCardTitle}>Destinos Salvos ({favoriteCities.length})</h3>
                </div>

                <div className={styles.bentoCardBody}>
                  {favoriteCities.map((city: any) => (
                    <div key={city.id} className={styles.bentoItem}>
                      <div className={styles.bentoItemCode}>
                        {city.iata_code}
                      </div>
                      <div className={styles.bentoItemInfo}>
                        <h4 className={styles.bentoItemName}>{city.name}</h4>
                        <span className={styles.bentoItemSub}>Orçamento: {city.metadata_json.budget_level?.toUpperCase()}</span>
                      </div>
                      <button
                        onClick={() => handleToggleFavorite(city.id, true)}
                        style={{
                          background: 'transparent', border: 'none', cursor: 'pointer',
                          color: '#64748b', transition: 'color 0.2s'
                        }}
                        onMouseOver={e => e.currentTarget.style.color = '#ef4444'}
                        onMouseOut={e => e.currentTarget.style.color = '#64748b'}
                        title="Remover de Favoritos"
                      >
                        <HeartOff size={16} />
                      </button>
                    </div>
                  ))}
                  
                  {favoriteCities.length === 0 && (
                    <div className={styles.bentoEmptyState}>
                      <p style={{ fontSize: '0.8rem', margin: '0 0 10px 0' }}>Sua lista de destinos salvos está vazia.</p>
                      <button onClick={() => window.location.href = '/dija-ai'} className={styles.ctaBtn}>
                        Descobrir Destinos na DIJA
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: RECOMENDAÇÕES DA DIJA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div className={`${styles.bentoCard} fade-in-up hover-lift`} style={{ height: '100%' }}>
                <div className={styles.bentoCardHeader}>
                  <Sparkles size={20} className="text-brand-gold animate-bounce" />
                  <h3 className={styles.bentoCardTitle}>Curadoria de Destinos DIJA</h3>
                </div>

                <div className={styles.bentoCardBody}>
                  {recommendations.map((rec) => {
                    const city = rec.destination;
                    const scorePercentage = Math.round(rec.score * 25);
                    const isSaved = favorites.some(fav => fav.item_id === city.id);

                    return (
                      <div key={city.id} className={styles.bentoRecCard}>
                        <div className={styles.bentoRecHeader}>
                          <div>
                            <h4 className={styles.bentoRecName}>{city.name}</h4>
                            <span className={styles.bentoRecScore}>Score: {scorePercentage}/100</span>
                          </div>
                          
                          <button
                            onClick={() => handleToggleFavorite(city.id, isSaved)}
                            style={{
                              background: 'transparent', border: 'none', cursor: 'pointer',
                              color: isSaved ? '#EF4444' : '#64748b', transition: 'all 0.2s', marginLeft: 'auto'
                            }}
                            title={isSaved ? "Remover" : "Salvar"}
                          >
                            <Heart size={16} fill={isSaved ? '#EF4444' : 'none'} />
                          </button>
                        </div>

                        <div className={styles.bentoRecReason}>
                          💡 {rec.reasons[0] || "Destino de alta afinidade"}
                        </div>

                        <div className={styles.bentoRecAction}>
                          <button
                            onClick={() => window.location.href = '/dija-ai'}
                            style={{
                              background: 'transparent', border: 'none', color: '#FFC107',
                              fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer',
                              display: 'flex', alignItems: 'center', gap: 4
                            }}
                          >
                            <span>Planejar Viagem no Chat</span>
                            <ChevronRight size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {recommendations.length === 0 && (
                    <div className={styles.bentoEmptyState} style={{ padding: '40px 10px' }}>
                      <Brain size={32} style={{ margin: '0 auto 12px auto', display: 'block' }} />
                      <p style={{ fontSize: '0.82rem', margin: 0 }}>Nenhuma recomendação processada. Configure seu onboarding de preferências.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* GRUPOS DE WHATSAPP PREMIUM */}
          <div className={`${styles.whatsappSection} fade-in-up`} ref={whatsappRef}>
            <h3 className={styles.whatsappTitle}>📱 Seus Grupos VIP no WhatsApp</h3>
            <div className={styles.whatsappGrid}>
              <a
                href="https://chat.whatsapp.com/ofertas-vip"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.whatsappBtn} ${styles.whatsappBtnGold} hover-lift`}
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
                className={`${styles.whatsappBtn} ${styles.whatsappBtnBlue} hover-lift`}
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
                className={`${styles.whatsappBtn} ${styles.whatsappBtnGreen} hover-lift`}
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

          {/* STATS SECTION */}
          <div className={`${styles.statsGrid} fade-in-up`} ref={statsRef}>
            <div className={`${styles.statCard} hover-lift`}>
              <div className={styles.statIcon} style={{ background: 'rgba(56, 189, 248, 0.12)', color: '#38BDF8' }}>
                <Compass size={24} />
              </div>
              <div className={styles.statInfo}>
                <h3>Grupos WhatsApp</h3>
                <p>3 Grupos VIP Ativos</p>
              </div>
            </div>
            <div className={`${styles.statCard} hover-lift`}>
              <div className={styles.statIcon} style={{ background: 'rgba(255, 193, 7, 0.12)', color: '#FFC107' }}>
                <TrendingUp size={24} />
              </div>
              <div className={styles.statInfo}>
                <h3>Economia Média</h3>
                <p>Economize até R$ 1.500/viagem</p>
              </div>
            </div>
            <div className={`${styles.statCard} hover-lift`}>
              <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#22c55e' }}>
                <CheckCircle size={24} />
              </div>
              <div className={styles.statInfo}>
                <h3>Status Assinatura</h3>
                <p>Ativa e Renovada</p>
              </div>
            </div>
          </div>

          {/* FORMULÁRIO PESQUISA VIP */}
          <div className={`${styles.searchRequestBox} fade-in-up hover-lift`} ref={searchRef}>
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

          {/* ULTIMAS OFERTAS ALERTAS */}
          <div className={styles.sectionRow} ref={recentRef}>
            <div className={`${styles.recentOffersContainer} fade-in-up`}>
              <h2>Últimas Ofertas Alertas</h2>
              {loadingOffers ? (
                <p>Carregando ofertas...</p>
              ) : (
                <div className={styles.recentOffersList}>
                  {offers.slice(0, 3).map((offer) => {
                    return (
                      <div key={offer.id} className={`${styles.offerItem} hover-lift`}>
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
          <div className={styles.alertBanner}>
            <span className={styles.alertBannerIcon}>⚡</span>
            <p>Todas as ofertas são buscadas em tempo real. O site é atualizado 3x ao dia. Valores podem sofrer alterações sem aviso prévio.</p>
          </div>
          {loadingOffers ? (
            <div className={styles.loadingWrapper}>Carregando ofertas VIP...</div>
          ) : (
            <div className={styles.offersGrid}>
              {offers.slice(0, 20).map((offer) => {
                 const hasValidImg = offer.imagem_url && (offer.imagem_url.startsWith('http://') || offer.imagem_url.startsWith('https://') || offer.imagem_url.startsWith('/'));
                 const imgUrl = hasValidImg 
                   ? offer.imagem_url 
                   : "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop";
                 return (
                   <div key={offer.id} className={`${styles.offerCard} hover-lift`}>
                     <div className={styles.offerImageWrapper}>
                       <img 
                         src={imgUrl} 
                         alt={offer.destino} 
                         className={styles.offerImage}
                         onError={(e) => { (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop`; }}
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
                        href={offer.link_afiliado || (offer as any).url_afiliado || "#"} 
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
            <div className={`${styles.tipCard} hover-lift`}>
              <div className={styles.tipBadge}>Dica de Ouro</div>
              <h3>Como acumular milhas 5x mais rápido</h3>
              <p>Aprenda a mapear compras do dia a dia em parceiros como Livelo e Esfera para maximizar o acúmulo de milhas aéreas.</p>
              <a href="#" className={styles.readTipLink}>Ler Guia Completo ➡️</a>
            </div>
            <div className={`${styles.tipCard} hover-lift`}>
              <div className={styles.tipBadge}>Roteiro VIP</div>
              <h3>Santiago do Chile: Guia Completo de 5 dias</h3>
              <p>O melhor roteiro mapeando vinícolas, passeios na Cordilheira e restaurantes imperdíveis em Santiago.</p>
              <a href="#" className={styles.readTipLink}>Ler Guia Completo ➡️</a>
            </div>
            <div className={`${styles.tipCard} hover-lift`}>
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
