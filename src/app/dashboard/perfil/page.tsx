"use client";

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Camera, 
  Lock, 
  Save, 
  CheckCircle, 
  AlertCircle, 
  Brain, 
  Settings, 
  History, 
  Activity, 
  Sparkles, 
  Heart, 
  Compass, 
  Eye, 
  ShieldCheck,
  Award,
  Calendar,
  Flame,
  Globe
} from 'lucide-react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const API = 'https://destinosincriveis.vps-kinghost.net';

function PerfilContent() {
  const router = useRouter();
  
  // Tabs
  const [activeSubTab, setActiveSubTab] = React.useState<'identity' | 'preferences' | 'memories' | 'history'>('identity');
  
  // Data States
  const [user, setUser] = React.useState<any>(null);
  const [profile, setProfile] = React.useState<any>(null);
  const [preferences, setPreferences] = React.useState<any>(null);
  const [memories, setMemories] = React.useState<any[]>([]);
  const [events, setEvents] = React.useState<any[]>([]);
  const [destinationsMap, setDestinationsMap] = React.useState<Record<string, string>>({});
  
  // Form States
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [msg, setMsg] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [avatarUploading, setAvatarUploading] = React.useState(false);
  
  // Form values
  const [nome, setNome] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [senhaAtual, setSenhaAtual] = React.useState('');
  const [novaSenha, setNovaSenha] = React.useState('');
  const [confirmarSenha, setConfirmarSenha] = React.useState('');
  
  // Preferences Editing states
  const [editingPrefs, setEditingPrefs] = React.useState(false);
  const [selectedStyles, setSelectedStyles] = React.useState<string[]>([]);
  const [budgetLevel, setBudgetLevel] = React.useState('medium');
  const [travelPace, setTravelPace] = React.useState('moderate');
  const [selectedContinents, setSelectedContinents] = React.useState<string[]>([]);

  const fileRef = React.useRef<HTMLInputElement>(null);
  const cardRef = useScrollReveal<HTMLDivElement>();

  const getToken = () => localStorage.getItem('token') || '';

  // 1. Initial Load of user data & preferences
  const loadUserData = async () => {
    const token = getToken();
    if (!token) { router.push('/login'); return; }
    
    try {
      // Get core user, profile & preferences
      const resMe = await fetchWithTimeout(`${API}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!resMe.ok) throw new Error("Unauthorized");
      
      const userData = await resMe.json();
      setUser(userData);
      setNome(userData.full_name || '');
      
      if (userData.profile) {
        setProfile(userData.profile);
        setNickname(userData.profile.nickname || '');
        setBio(userData.profile.bio || '');
      }
      
      if (userData.preferences) {
        setPreferences(userData.preferences);
        setSelectedStyles(userData.preferences.traveler_styles || []);
        setBudgetLevel(userData.preferences.average_budget_level || 'medium');
        setTravelPace(userData.preferences.travel_pace || 'moderate');
        setSelectedContinents(userData.preferences.preferred_continents || []);
      }

      // Fetch dynamic implicit memories learned by DIJA
      const resMem = await fetchWithTimeout(`${API}/api/users/me/memories`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resMem.ok) {
        const memData = await resMem.json();
        setMemories(memData);
      }

      // Fetch user interaction events
      const resEv = await fetchWithTimeout(`${API}/api/users/me/events`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resEv.ok) {
        const evData = await resEv.json();
        setEvents(evData);
      }

    } catch (err) {
      console.error("Error loading user profile:", err);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  // Fetch destination mapping
  React.useEffect(() => {
    fetchWithTimeout(`${API}/api/destinations/`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          const mapping: Record<string, string> = {};
          data.forEach((city: any) => {
            mapping[city.id] = city.name;
          });
          setDestinationsMap(mapping);
        }
      })
      .catch(err => console.error("Error loading destinations:", err));
      
    loadUserData();
  }, [router]);

  // 2. Update Personal Identity and Security
  const handleSaveIdentity = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setSaving(true);
    const token = getToken();

    try {
      // 2.1 Update traveler profile (nickname/bio)
      const resProf = await fetchWithTimeout(`${API}/api/users/me/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ nickname, bio }),
      });
      
      if (!resProf.ok) {
        throw new Error("Erro ao salvar dados de identidade.");
      }

      // 2.2 Update core user fields if name changed
      const bodyUser: any = {};
      if (nome !== user.full_name) {
        bodyUser.full_name = nome;
      }
      
      // If updating password
      if (novaSenha) {
        if (novaSenha !== confirmarSenha) {
          setMsg({ type: 'error', text: 'A confirmação de senha não coincide!' });
          setSaving(false);
          return;
        }
        if (novaSenha.length < 6) {
          setMsg({ type: 'error', text: 'A nova senha deve ter no mínimo 6 caracteres.' });
          setSaving(false);
          return;
        }
        bodyUser.password = novaSenha;
      }

      if (Object.keys(bodyUser).length > 0) {
        const resUser = await fetchWithTimeout(`${API}/api/users/me`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(bodyUser),
        });
        if (!resUser.ok) {
          throw new Error("Erro ao atualizar credenciais.");
        }
      }

      setMsg({ type: 'success', text: 'Perfil de viajante atualizado com sucesso!' });
      setSenhaAtual(''); setNovaSenha(''); setConfirmarSenha('');
      loadUserData(); // Reload to refresh contexts

    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Erro ao salvar alterações.' });
    } finally {
      setSaving(false);
    }
  };

  // 3. Update Travel Preferences
  const handleSavePreferences = async () => {
    setMsg(null);
    setSaving(true);
    const token = getToken();

    try {
      const resPref = await fetchWithTimeout(`${API}/api/users/me/preferences`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          traveler_styles: selectedStyles,
          average_budget_level: budgetLevel,
          travel_pace: travelPace,
          preferred_continents: selectedContinents
        }),
      });

      if (!resPref.ok) throw new Error("Falha ao salvar preferências");

      setMsg({ type: 'success', text: 'Preferências de viagem atualizadas com sucesso!' });
      setEditingPrefs(false);
      loadUserData();

    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Erro ao salvar preferências.' });
    } finally {
      setSaving(false);
    }
  };

  // 4. Handle avatar image upload
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarUploading(true);
    setMsg(null);
    const token = getToken();

    try {
      const form = new FormData();
      form.append('file', file);
      
      const res = await fetchWithTimeout(`${API}/api/users/me/avatar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      
      const data = await res.json();
      if (res.ok) {
        setProfile((p: any) => ({ ...p, avatar_url: data.profile.avatar_url }));
        setMsg({ type: 'success', text: 'Foto de avatar atualizada!' });
        loadUserData();
      } else {
        setMsg({ type: 'error', text: data.error || 'Erro ao enviar foto.' });
      }
    } catch {
      setMsg({ type: 'error', text: 'Erro ao enviar foto.' });
    } finally {
      setAvatarUploading(false);
    }
  };

  // Helpers
  const toggleStyle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const toggleContinent = (continent: string) => {
    setSelectedContinents(prev => 
      prev.includes(continent) ? prev.filter(c => c !== continent) : [...prev, continent]
    );
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400, color: '#94a3b8' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <Brain size={44} className="text-brand-blue animate-pulse" />
          <p className="text-xs uppercase font-black tracking-widest text-brand-blue">Sincronizando com a DIJA...</p>
        </div>
      </div>
    );
  }

  const initials = (user?.full_name || 'U').split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();

  // Evolution Calculation
  const memoryScore = memories.length * 15;
  const eventScore = events.length * 3;
  const syncScore = Math.min(35 + memoryScore + eventScore, 100);

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', paddingBottom: 60 }}>
      
      {/* Header and User Overview Card */}
      <div ref={cardRef} className="fade-in-up hover-lift" style={{
        background: 'rgba(10, 18, 44, 0.45)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(56, 189, 248, 0.15)',
        borderRadius: 24,
        padding: 32,
        marginBottom: 32,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 32,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Glow */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {/* Avatar Section */}
        <div style={{ position: 'relative', width: 110, height: 110, flexShrink: 0 }}>
          {profile?.avatar_url ? (
            <img
              src={`${API}${profile.avatar_url}`}
              alt="Avatar"
              style={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', border: '3px solid #38BDF8', boxShadow: '0 8px 24px rgba(56,189,248,0.2)' }}
            />
          ) : (
            <div style={{
              width: 110, height: 110, borderRadius: '50%', background: 'linear-gradient(135deg,#38BDF8,#0284C7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.4rem', fontWeight: 800, color: '#fff', border: '3px solid #38BDF8',
              boxShadow: '0 8px 24px rgba(255,193,7,0.1)'
            }}>
              {initials}
            </div>
          )}
          <button
            onClick={() => fileRef.current?.click()}
            disabled={avatarUploading}
            style={{
              position: 'absolute', bottom: 0, right: 0,
              width: 36, height: 36, borderRadius: '50%',
              background: '#FFC107', border: '3px solid #0A122C',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#0A122C', transition: 'transform 0.2s',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}
            title="Alterar foto"
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Camera size={16} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
        </div>

        {/* User Details */}
        <div style={{ flex: 1, minWidth: 250 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', margin: 0 }}>
              {nickname || user?.full_name.split()[0]}
            </h1>
            <span style={{
              background: 'rgba(255,193,7,0.15)',
              border: '1px solid rgba(255,193,7,0.25)',
              color: '#FFC107',
              fontSize: '0.7rem',
              fontWeight: 800,
              padding: '3px 8px',
              borderRadius: 6,
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              👑 Membro VIP
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '0 0 16px 0', lineHeight: 1.5 }}>
            {bio || "Nenhuma biografia cadastrada. Complete seu perfil para que a DIJA entenda melhor quem é você!"}
          </p>

          {/* Quick Metrics */}
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Flame size={16} className="text-brand-gold" />
              <span style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 600 }}>Sincronia DIJA: {syncScore}%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Brain size={16} className="text-brand-blue" />
              <span style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 600 }}>{memories.length} memórias ativas</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Calendar size={16} className="text-gray-400" />
              <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                Membro desde {user?.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : '—'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Alert Banner */}
      {msg && (
        <div className="fade-in-up" style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '16px 20px', borderRadius: 16, marginBottom: 24,
          background: msg.type === 'success' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
          border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
          color: msg.type === 'success' ? '#6ee7b7' : '#fca5a5',
          fontSize: '0.92rem', fontWeight: 600
        }}>
          {msg.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          {msg.text}
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div style={{ 
        display: 'flex', 
        borderBottom: '1px solid rgba(56, 189, 248, 0.15)', 
        marginBottom: 32, 
        gap: 8,
        overflowX: 'auto',
        paddingBottom: 2
      }}>
        {[
          { id: 'identity', label: '👤 Identidade e Segurança', icon: User },
          { id: 'preferences', label: '⚙️ Preferências Declaradas', icon: Settings },
          { id: 'memories', label: '🧠 Aprendizado Cognitivo', icon: Brain },
          { id: 'history', label: '⏳ Histórico DIJA', icon: History }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveSubTab(tab.id as any); setMsg(null); }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '14px 20px',
                border: 'none',
                background: 'transparent',
                color: isActive ? '#FFC107' : '#94a3b8',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                borderBottom: isActive ? '3px solid #FFC107' : '3px solid transparent',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: IDENTITY & SECURITY */}
      {activeSubTab === 'identity' && (
        <form onSubmit={handleSaveIdentity} className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Dados Pessoais */}
          <div style={{
            background: 'rgba(10, 18, 44, 0.45)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(56, 189, 248, 0.15)', borderRadius: 20, padding: 28
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <User size={18} className="text-brand-blue" />
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>Perfil de Viajante</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>
                  Nome completo
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  placeholder="Seu nome"
                  style={{
                    width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56,189,248,0.2)',
                    borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: '0.95rem',
                    fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>
                  Apelido (como a DIJA deve te chamar)
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  placeholder="Ex: Pedro, Cláudia"
                  style={{
                    width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56,189,248,0.2)',
                    borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: '0.95rem',
                    fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>
                Sobre Mim / Bio do Viajante
              </label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Ex: Prefiro viagens focadas em ecoturismo e gastronomia. Gosto de hotéis boutique e evito voos na madrugada."
                rows={3}
                style={{
                  width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56,189,248,0.2)',
                  borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: '0.95rem',
                  fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', resize: 'vertical'
                }}
              />
            </div>
          </div>

          {/* Segurança */}
          <div style={{
            background: 'rgba(10, 18, 44, 0.45)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(56, 189, 248, 0.15)', borderRadius: 20, padding: 28
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Lock size={18} className="text-brand-blue" />
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>Segurança da Conta</h3>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 20px 0' }}>Preencha apenas se desejar redefinir sua senha.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>
                  Nova senha
                </label>
                <input
                  type="password"
                  value={novaSenha}
                  onChange={e => setNovaSenha(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  style={{
                    width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56,189,248,0.2)',
                    borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: '0.95rem',
                    fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 8 }}>
                  Confirmar nova senha
                </label>
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={e => setConfirmarSenha(e.target.value)}
                  placeholder="Repita a senha"
                  style={{
                    width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56,189,248,0.2)',
                    borderRadius: 12, padding: '12px 16px', color: '#fff', fontSize: '0.95rem',
                    fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              background: 'linear-gradient(135deg, #FFC107, #F59E0B)',
              color: '#0A122C', border: 'none', borderRadius: 14,
              padding: '16px 32px', fontSize: '1rem', fontWeight: 800,
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.7 : 1, transition: 'all 0.2s',
              boxShadow: '0 6px 20px rgba(255,193,7,0.3)',
              alignSelf: 'flex-end'
            }}
          >
            <Save size={18} />
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>
      )}

      {/* TAB 2: PREFERENCES */}
      {activeSubTab === 'preferences' && (
        <div className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{
            background: 'rgba(10, 18, 44, 0.45)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(56, 189, 248, 0.15)', borderRadius: 20, padding: 32
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Settings size={20} className="text-brand-blue" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>Preferências Declaradas</h3>
              </div>
              {!editingPrefs && (
                <button
                  onClick={() => setEditingPrefs(true)}
                  style={{
                    background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)',
                    color: '#38BDF8', fontSize: '0.8rem', fontWeight: 700, padding: '8px 16px',
                    borderRadius: 10, cursor: 'pointer', marginLeft: 'auto'
                  }}
                >
                  Editar Preferências
                </button>
              )}
            </div>

            {editingPrefs ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Traveler Styles */}
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: 12 }}>Estilos de Viagem Favoritos</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {[
                      { key: 'adventure', label: '🧗 Aventura / Ecoturismo' },
                      { key: 'beach', label: '🏖️ Praia / Sol' },
                      { key: 'nature', label: '🌲 Natureza / Cachoeiras' },
                      { key: 'romantic', label: '🥂 Romântico / Casal' },
                      { key: 'family', label: '👨‍👩‍👧 Family Trip' },
                      { key: 'culture', label: '🏛️ Cultura / História' },
                      { key: 'culinary', label: '🍳 Gastronomia' }
                    ].map(st => {
                      const selected = selectedStyles.includes(st.key);
                      return (
                        <button
                          key={st.key}
                          type="button"
                          onClick={() => toggleStyle(st.key)}
                          style={{
                            background: selected ? 'rgba(56,189,248,0.2)' : 'rgba(0,0,0,0.3)',
                            border: selected ? '1px solid #38BDF8' : '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 12, padding: '10px 18px', color: selected ? '#38BDF8' : '#94a3b8',
                            fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s'
                          }}
                        >
                          {st.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget level & Pace */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: 12 }}>Perfil de Orçamento</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { key: 'low', label: 'Low-cost' },
                        { key: 'medium', label: 'Moderado' },
                        { key: 'high', label: 'Premium' }
                      ].map(b => (
                        <button
                          key={b.key}
                          type="button"
                          onClick={() => setBudgetLevel(b.key)}
                          style={{
                            background: budgetLevel === b.key ? 'rgba(255,193,7,0.15)' : 'rgba(0,0,0,0.3)',
                            border: budgetLevel === b.key ? '1px solid #FFC107' : '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 12, padding: '10px 8px', color: budgetLevel === b.key ? '#FFC107' : '#94a3b8',
                            fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s', width: '100%', textAlign: 'center'
                          }}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: 12 }}>Ritmo da Viagem</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { key: 'slow', label: 'Relaxado' },
                        { key: 'moderate', label: 'Equilibrado' },
                        { key: 'fast', label: 'Explorador' }
                      ].map(p => (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => setTravelPace(p.key)}
                          style={{
                            background: travelPace === p.key ? 'rgba(56,189,248,0.15)' : 'rgba(0,0,0,0.3)',
                            border: travelPace === p.key ? '1px solid #38BDF8' : '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 12, padding: '10px 8px', color: travelPace === p.key ? '#38BDF8' : '#94a3b8',
                            fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s', width: '100%', textAlign: 'center'
                          }}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Continents */}
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, marginBottom: 12 }}>Continentes de Preferência</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {['América do Sul', 'Europa', 'América do Norte', 'Ásia', 'Oceania', 'África'].map(c => {
                      const selected = selectedContinents.includes(c);
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => toggleContinent(c)}
                          style={{
                            background: selected ? 'rgba(56,189,248,0.15)' : 'rgba(0,0,0,0.3)',
                            border: selected ? '1px solid #38BDF8' : '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 12, padding: '10px 18px', color: selected ? '#38BDF8' : '#94a3b8',
                            fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer', transition: 'all 0.2s'
                          }}
                        >
                          🌍 {c}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12 }}>
                  <button
                    onClick={() => { setEditingPrefs(false); loadUserData(); }}
                    style={{
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                      color: '#94a3b8', fontSize: '0.85rem', fontWeight: 700, padding: '12px 24px',
                      borderRadius: 12, cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    disabled={saving}
                    style={{
                      background: 'linear-gradient(135deg, #FFC107, #F59E0B)', border: 'none',
                      color: '#0A122C', fontSize: '0.85rem', fontWeight: 800, padding: '12px 28px',
                      borderRadius: 12, cursor: 'pointer', boxShadow: '0 4px 12px rgba(255,193,7,0.25)'
                    }}
                  >
                    Salvar Preferências
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Style Tags List */}
                <div>
                  <h4 style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Estilos de viagem preferidos</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {preferences?.traveler_styles && preferences.traveler_styles.length > 0 ? (
                      preferences.traveler_styles.map((s: string) => (
                        <span key={s} style={{
                          background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)',
                          color: '#38BDF8', fontSize: '0.8rem', fontWeight: 700, padding: '6px 12px', borderRadius: 8
                        }}>
                          ✨ {s.toUpperCase()}
                        </span>
                      ))
                    ) : (
                      <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Nenhum estilo selecionado. Complete o onboarding!</span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                  <div>
                    <h4 style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Orçamento Médio</h4>
                    <span style={{
                      background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.2)',
                      color: '#FFC107', fontSize: '0.8rem', fontWeight: 700, padding: '6px 12px', borderRadius: 8, display: 'inline-block'
                    }}>
                      💰 {budgetLevel.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Ritmo da Viagem</h4>
                    <span style={{
                      background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)',
                      color: '#38BDF8', fontSize: '0.8rem', fontWeight: 700, padding: '6px 12px', borderRadius: 8, display: 'inline-block'
                    }}>
                      ⚡ {travelPace.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Continentes Favoritos</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {preferences?.preferred_continents && preferences.preferred_continents.length > 0 ? (
                      preferences.preferred_continents.map((c: string) => (
                        <span key={c} style={{
                          background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                          color: '#e2e8f0', fontSize: '0.8rem', fontWeight: 700, padding: '6px 12px', borderRadius: 8
                        }}>
                          🌍 {c}
                        </span>
                      ))
                    ) : (
                      <span style={{ color: '#64748b', fontSize: '0.9rem' }}>Nenhum continente selecionado.</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: COGNITIVE MEMORIES */}
      {activeSubTab === 'memories' && (
        <div className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{
            background: 'rgba(10, 18, 44, 0.45)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(56, 189, 248, 0.15)', borderRadius: 20, padding: 32
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Brain size={20} className="text-brand-blue" />
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>O que a DIJA aprendeu sobre você</h3>
            </div>
            
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: 28 }}>
              Enquanto você conversa no chat cognitivo, a **DIJA AI** extrai implicitamente suas preferências ocultas (regras de viagem, hotéis favoritos, desgostos). Essas memórias moldam e calibram as recomendações futuras em tempo real!
            </p>

            {memories.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {memories.map((mem) => {
                  const isPositive = mem.memory_key.includes("likes") || mem.memory_key.includes("prefers");
                  const score = Math.round(mem.confidence_score * 100);
                  
                  return (
                    <div key={mem.id} style={{
                      background: 'rgba(0,0,0,0.2)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: 16,
                      padding: 20,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      position: 'relative'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', width: '100%' }}>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          padding: '3px 8px',
                          borderRadius: 6,
                          background: isPositive ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                          color: isPositive ? '#10B981' : '#EF4444',
                          border: isPositive ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(239,68,68,0.2)'
                        }}>
                          {isPositive ? 'Gosto Extraído' : 'Restrição/Desgosto'}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
                          <Award size={12} className="text-brand-blue" />
                          <span style={{ fontSize: '0.75rem', color: '#38BDF8', fontWeight: 700 }}>Confiança: {score}%</span>
                        </div>
                      </div>
                      
                      <h4 style={{ color: '#fff', fontSize: '0.92rem', fontWeight: 800, margin: '8px 0 2px 0' }}>
                        🧠 {mem.memory_key.replace("likes_", "Gosta de ").replace("dislikes_", "Evita ").replace("prefers_", "Prefere ").toUpperCase()}
                      </h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0, fontStyle: 'italic' }}>
                        &ldquo;DIJA analisou seu comportamento e salvou a regra de contexto: {mem.memory_key}&ldquo;
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ 
                padding: '40px 20px', textAlign: 'center', color: '#64748b', 
                background: 'rgba(0,0,0,0.15)', borderRadius: 16, border: '1px dashed rgba(255,255,255,0.08)' 
              }}>
                <Brain size={36} className="text-gray-600" style={{ marginBottom: 12, display: 'block', margin: '0 auto 12px auto' }} />
                <p style={{ fontSize: '0.9rem', margin: 0 }}>Nenhuma memória implícita aprendida pela DIJA ainda.</p>
                <small style={{ color: '#475569', display: 'block', marginTop: 4 }}>Inicie uma conversa no chat da DIJA para recalibrar o sistema cognitivo!</small>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: HISTORY */}
      {activeSubTab === 'history' && (
        <div className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{
            background: 'rgba(10, 18, 44, 0.45)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(56, 189, 248, 0.15)', borderRadius: 20, padding: 32
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <History size={20} className="text-brand-blue" />
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>Histórico do Viajante</h3>
            </div>

            {events.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {events.map((ev) => {
                  let icon = <Activity size={14} className="text-blue-400" />;
                  let label = "Interagiu com";
                  
                  if (ev.event_type === 'view_destination') {
                    icon = <Eye size={14} className="text-brand-blue" />;
                    label = "Visualizou detalhes do destino";
                  } else if (ev.event_type === 'save_destination') {
                    icon = <Heart size={14} className="text-red-400" />;
                    label = "Salvou em favoritos o destino";
                  } else if (ev.event_type === 'discard_recommendation') {
                    icon = <Compass size={14} className="text-gray-400" />;
                    label = "Descartou recomendação de";
                  }
                  
                  const targetName = destinationsMap[ev.item_id] || ev.item_id;

                  return (
                    <div key={ev.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      background: 'rgba(0,0,0,0.15)',
                      border: '1px solid rgba(255,255,255,0.03)',
                      borderRadius: 12,
                      padding: '12px 18px'
                    }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: 'rgba(255,255,255,0.03)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 600 }}>
                          {label} <strong style={{ color: '#FFC107' }}>{targetName}</strong>
                        </p>
                        <span style={{ fontSize: '0.72rem', color: '#64748b' }}>
                          Tipo: {ev.item_type} • ID: {ev.item_id.slice(0, 8)}...
                        </span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                        {new Date(ev.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - {new Date(ev.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ 
                padding: '40px 20px', textAlign: 'center', color: '#64748b', 
                background: 'rgba(0,0,0,0.15)', borderRadius: 16, border: '1px dashed rgba(255,255,255,0.08)' 
              }}>
                <Activity size={32} className="text-gray-600" style={{ marginBottom: 12, display: 'block', margin: '0 auto 12px auto' }} />
                <p style={{ fontSize: '0.9rem', margin: 0 }}>Nenhuma atividade comportamental registrada.</p>
                <small style={{ color: '#475569', display: 'block', marginTop: 4 }}>Suas ações de click, visualização e salvamento aparecerão listadas aqui.</small>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default function PerfilPage() {
  return (
    <Suspense fallback={<div style={{ padding: 20, color: '#94a3b8' }}>Carregando perfil...</div>}>
      <PerfilContent />
    </Suspense>
  );
}
