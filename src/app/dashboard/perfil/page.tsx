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
  Heart, 
  Compass, 
  Eye, 
  Award,
  Calendar,
  Flame,
} from 'lucide-react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const API = 'https://destinosincriveis.vps-kinghost.net';

function PerfilContent() {
  const router = useRouter();
  
  const [activeSubTab, setActiveSubTab] = React.useState<'identity' | 'preferences' | 'memories' | 'history'>('identity');
  
  const [user, setUser] = React.useState<any>(null);
  const [profile, setProfile] = React.useState<any>(null);
  const [preferences, setPreferences] = React.useState<any>(null);
  const [memories, setMemories] = React.useState<any[]>([]);
  const [events, setEvents] = React.useState<any[]>([]);
  const [destinationsMap, setDestinationsMap] = React.useState<Record<string, string>>({});
  
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [msg, setMsg] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [avatarUploading, setAvatarUploading] = React.useState(false);
  
  const [nome, setNome] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [senhaAtual, setSenhaAtual] = React.useState('');
  const [novaSenha, setNovaSenha] = React.useState('');
  const [confirmarSenha, setConfirmarSenha] = React.useState('');
  
  const [editingPrefs, setEditingPrefs] = React.useState(false);
  const [selectedStyles, setSelectedStyles] = React.useState<string[]>([]);
  const [budgetLevel, setBudgetLevel] = React.useState('medium');
  const [travelPace, setTravelPace] = React.useState('moderate');
  const [selectedContinents, setSelectedContinents] = React.useState<string[]>([]);

  const fileRef = React.useRef<HTMLInputElement>(null);
  const cardRef = useScrollReveal<HTMLDivElement>();

  const getToken = () => localStorage.getItem('token') || '';

  const loadUserData = async () => {
    const token = getToken();
    if (!token) { router.push('/login'); return; }
    
    try {
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

      const resMem = await fetchWithTimeout(`${API}/api/users/me/memories`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (resMem.ok) {
        const memData = await resMem.json();
        setMemories(memData);
      }

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

  const handleSaveIdentity = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setSaving(true);
    const token = getToken();

    try {
      const resProf = await fetchWithTimeout(`${API}/api/users/me/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ nickname, bio }),
      });
      
      if (!resProf.ok) {
        throw new Error("Erro ao salvar dados de identidade.");
      }

      const bodyUser: any = {};
      if (nome !== user.full_name) {
        bodyUser.full_name = nome;
      }
      
      if (novaSenha) {
        if (novaSenha !== confirmarSenha) {
          setMsg({ type: 'error', text: 'A confirmacao de senha nao coincide!' });
          setSaving(false);
          return;
        }
        if (novaSenha.length < 6) {
          setMsg({ type: 'error', text: 'A nova senha deve ter no minimo 6 caracteres.' });
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
      loadUserData();

    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Erro ao salvar alteracoes.' });
    } finally {
      setSaving(false);
    }
  };

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

      if (!resPref.ok) throw new Error("Falha ao salvar preferencias");

      setMsg({ type: 'success', text: 'Preferencias de viagem atualizadas com sucesso!' });
      setEditingPrefs(false);
      loadUserData();

    } catch (err: any) {
      setMsg({ type: 'error', text: err.message || 'Erro ao salvar preferencias.' });
    } finally {
      setSaving(false);
    }
  };

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
      <div className="flex justify-center items-center min-h-[400px] text-[var(--text-muted)]">
        <div className="flex flex-col items-center gap-4">
          <Brain size={44} className="text-[var(--brand-blue)]" />
          <p className="text-xs uppercase font-black tracking-widest" style={{ color: 'var(--brand-blue)' }}>Carregando perfil...</p>
        </div>
      </div>
    );
  }

  const initials = (user?.full_name || 'U').split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();

  const memoryScore = memories.length * 15;
  const eventScore = events.length * 3;
  const syncScore = Math.min(35 + memoryScore + eventScore, 100);

  return (
    <div style={{ maxWidth: 840, margin: '0 auto', paddingBottom: 60 }}>
      
      <div ref={cardRef} className="fade-in-up rounded-[24px] p-8 mb-8 flex flex-wrap items-center gap-8 relative overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-default)]">
        <div style={{ position: 'relative', width: 110, height: 110, flexShrink: 0 }}>
          {profile?.avatar_url ? (
            <img
              src={`${API}${profile.avatar_url}`}
              alt="Avatar"
              className="w-[110px] h-[110px] rounded-full object-cover"
              style={{ border: '3px solid var(--brand-blue)', boxShadow: '0 8px 24px rgba(2, 132, 199, 0.15)' }}
            />
          ) : (
            <div className="w-[110px] h-[110px] rounded-full flex items-center justify-center text-white text-4xl font-extrabold"
              style={{ background: 'var(--brand-blue)', border: '3px solid var(--brand-blue)' }}>
              {initials}
            </div>
          )}
          <button
            onClick={() => fileRef.current?.click()}
            disabled={avatarUploading}
            className="absolute bottom-0 right-0 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
            style={{ background: 'var(--brand-blue)', border: '3px solid var(--bg-secondary)', color: '#FFFFFF' }}
            title="Alterar foto"
          >
            <Camera size={16} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>

        <div style={{ flex: 1, minWidth: 250 }}>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-black text-[var(--text-primary)] m-0">
              {nickname || user?.full_name.split()[0]}
            </h1>
            <span className="bg-[var(--brand-blue-light)] border border-[var(--brand-blue)]/20 text-[var(--brand-blue)] text-xs font-extrabold px-2 py-0.5 rounded-[6px] uppercase tracking-wide">
              Membro
            </span>
          </div>
          <p className="text-sm text-[var(--text-secondary)] m-0 mb-4 leading-relaxed">
            {bio || "Nenhuma biografia cadastrada. Complete seu perfil para que a DIJA entenda melhor quem e voce!"}
          </p>

          <div className="flex gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Flame size={16} className="text-[var(--brand-gold)]" />
              <span className="text-sm font-semibold text-[var(--text-secondary)]">Sincronia DIJA: {syncScore}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain size={16} className="text-[var(--brand-blue)]" />
              <span className="text-sm font-semibold text-[var(--text-secondary)]">{memories.length} memorias ativas</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[var(--text-muted)]" />
              <span className="text-sm text-[var(--text-muted)]">
                Membro desde {user?.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : '-'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {msg && (
        <div className="fade-in-up flex items-center gap-3 px-5 py-4 rounded-[16px] mb-6 text-sm font-semibold"
          style={{
            background: msg.type === 'success' ? 'rgba(22, 163, 74, 0.08)' : 'rgba(239, 68, 68, 0.08)',
            border: `1px solid ${msg.type === 'success' ? 'rgba(22, 163, 74, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`,
            color: msg.type === 'success' ? 'var(--brand-green)' : '#dc2626'
          }}>
          {msg.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          {msg.text}
        </div>
      )}

      <div className="flex border-b border-[var(--border-default)] mb-8 gap-2 overflow-x-auto pb-0.5">
        {[
          { id: 'identity', label: 'Identidade e Seguranca', icon: User },
          { id: 'preferences', label: 'Preferencias Declaradas', icon: Settings },
          { id: 'memories', label: 'Aprendizado Cognitivo', icon: Brain },
          { id: 'history', label: 'Historico DIJA', icon: History }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveSubTab(tab.id as any); setMsg(null); }}
              className="flex items-center gap-2 px-5 py-3.5 border-none bg-transparent text-sm font-bold cursor-pointer whitespace-nowrap transition-all"
              style={{
                color: isActive ? 'var(--brand-blue)' : 'var(--text-muted)',
                borderBottom: isActive ? '3px solid var(--brand-blue)' : '3px solid transparent'
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeSubTab === 'identity' && (
        <form onSubmit={handleSaveIdentity} className="fade-in-up flex flex-col gap-6">
          <div className="rounded-[20px] p-7 bg-[var(--bg-secondary)] border border-[var(--border-default)]">
            <div className="flex items-center gap-2.5 mb-6">
              <User size={18} className="text-[var(--brand-blue)]" />
              <h3 className="m-0 text-lg font-extrabold text-[var(--text-primary)]">Perfil de Viajante</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider block mb-2">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full rounded-[12px] px-4 py-3 text-sm outline-none box-border"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}
                />
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider block mb-2">
                  Apelido (como a DIJA deve te chamar)
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  placeholder="Ex: Pedro, Claudia"
                  className="w-full rounded-[12px] px-4 py-3 text-sm outline-none box-border"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider block mb-2">
                Sobre Mim / Bio do Viajante
              </label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Ex: Prefiro viagens focadas em ecoturismo e gastronomia. Gosto de hoteis boutique e evito voos na madrugada."
                rows={3}
                className="w-full rounded-[12px] px-4 py-3 text-sm outline-none box-border resize-vertical"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          <div className="rounded-[20px] p-7 bg-[var(--bg-secondary)] border border-[var(--border-default)]">
            <div className="flex items-center gap-2.5 mb-4">
              <Lock size={18} className="text-[var(--brand-blue)]" />
              <h3 className="m-0 text-lg font-extrabold text-[var(--text-primary)]">Seguranca da Conta</h3>
            </div>
            <p className="text-sm text-[var(--text-muted)] m-0 mb-5">Preencha apenas se desejar redefinir sua senha.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider block mb-2">
                  Nova senha
                </label>
                <input
                  type="password"
                  value={novaSenha}
                  onChange={e => setNovaSenha(e.target.value)}
                  placeholder="Minimo 6 caracteres"
                  className="w-full rounded-[12px] px-4 py-3 text-sm outline-none box-border"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}
                />
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider block mb-2">
                  Confirmar nova senha
                </label>
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={e => setConfirmarSenha(e.target.value)}
                  placeholder="Repita a senha"
                  className="w-full rounded-[12px] px-4 py-3 text-sm outline-none box-border"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-[14px] border-none text-base font-extrabold cursor-pointer transition-all self-end"
            style={{
              background: 'var(--brand-blue)',
              color: '#FFFFFF',
              opacity: saving ? 0.7 : 1,
              cursor: saving ? 'not-allowed' : 'pointer'
            }}
          >
            <Save size={18} />
            {saving ? 'Salvando...' : 'Salvar Alteracoes'}
          </button>
        </form>
      )}

      {activeSubTab === 'preferences' && (
        <div className="fade-in-up flex flex-col gap-6">
          <div className="rounded-[20px] p-8 bg-[var(--bg-secondary)] border border-[var(--border-default)]">
            <div className="flex justify-between items-center mb-7">
              <div className="flex items-center gap-2.5">
                <Settings size={20} className="text-[var(--brand-blue)]" />
                <h3 className="m-0 text-xl font-extrabold text-[var(--text-primary)]">Preferencias Declaradas</h3>
              </div>
              {!editingPrefs && (
                <button
                  onClick={() => setEditingPrefs(true)}
                  className="bg-[var(--brand-blue-light)] border border-[var(--brand-blue)]/25 text-[var(--brand-blue)] text-xs font-bold px-4 py-2 rounded-[10px] cursor-pointer ml-auto"
                >
                  Editar Preferencias
                </button>
              )}
            </div>

            {editingPrefs ? (
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-3">Estilos de Viagem Favoritos</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { key: 'adventure', label: 'Aventura / Ecoturismo' },
                      { key: 'beach', label: 'Praia / Sol' },
                      { key: 'nature', label: 'Natureza / Cachoeiras' },
                      { key: 'romantic', label: 'Romantico / Casal' },
                      { key: 'family', label: 'Family Trip' },
                      { key: 'culture', label: 'Cultura / Historia' },
                      { key: 'culinary', label: 'Gastronomia' }
                    ].map(st => {
                      const selected = selectedStyles.includes(st.key);
                      return (
                        <button
                          key={st.key}
                          type="button"
                          onClick={() => toggleStyle(st.key)}
                          className="rounded-[12px] px-4 py-2.5 text-sm font-bold cursor-pointer transition-all"
                          style={{
                            background: selected ? 'var(--brand-blue-light)' : 'var(--bg-surface)',
                            border: selected ? '1px solid var(--brand-blue)' : '1px solid var(--border-default)',
                            color: selected ? 'var(--brand-blue)' : 'var(--text-muted)'
                          }}
                        >
                          {st.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-primary)] mb-3">Perfil de Orcamento</h4>
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
                          className="rounded-[12px] px-2 py-2.5 text-sm font-bold cursor-pointer transition-all w-full text-center"
                          style={{
                            background: budgetLevel === b.key ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-surface)',
                            border: budgetLevel === b.key ? '1px solid var(--brand-gold)' : '1px solid var(--border-default)',
                            color: budgetLevel === b.key ? 'var(--brand-gold)' : 'var(--text-muted)'
                          }}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text-primary)] mb-3">Ritmo da Viagem</h4>
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
                          className="rounded-[12px] px-2 py-2.5 text-sm font-bold cursor-pointer transition-all w-full text-center"
                          style={{
                            background: travelPace === p.key ? 'var(--brand-blue-light)' : 'var(--bg-surface)',
                            border: travelPace === p.key ? '1px solid var(--brand-blue)' : '1px solid var(--border-default)',
                            color: travelPace === p.key ? 'var(--brand-blue)' : 'var(--text-muted)'
                          }}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-3">Continentes de Preferencia</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {['America do Sul', 'Europa', 'America do Norte', 'Asia', 'Oceania', 'Africa'].map(c => {
                      const selected = selectedContinents.includes(c);
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => toggleContinent(c)}
                          className="rounded-[12px] px-4 py-2.5 text-sm font-bold cursor-pointer transition-all"
                          style={{
                            background: selected ? 'var(--brand-blue-light)' : 'var(--bg-surface)',
                            border: selected ? '1px solid var(--brand-blue)' : '1px solid var(--border-default)',
                            color: selected ? 'var(--brand-blue)' : 'var(--text-muted)'
                          }}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => { setEditingPrefs(false); loadUserData(); }}
                    className="bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-muted)] text-sm font-bold px-6 py-3 rounded-[12px] cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    disabled={saving}
                    className="border-none text-sm font-extrabold px-7 py-3 rounded-[12px] cursor-pointer text-white"
                    style={{ background: 'var(--brand-blue)', opacity: saving ? 0.7 : 1 }}
                  >
                    Salvar Preferencias
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider mb-3">Estilos de viagem preferidos</h4>
                  <div className="flex flex-wrap gap-2">
                    {preferences?.traveler_styles && preferences.traveler_styles.length > 0 ? (
                      preferences.traveler_styles.map((s: string) => (
                        <span key={s} className="bg-[var(--brand-blue-light)] border border-[var(--brand-blue)]/20 text-[var(--brand-blue)] text-xs font-bold px-3 py-1.5 rounded-[8px]">
                          {s.toUpperCase()}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-[var(--text-muted)]">Nenhum estilo selecionado. Complete o onboarding!</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider mb-3">Orcamento Medio</h4>
                    <span className="bg-[rgba(245,158,11,0.1)] border border-[rgba(245,158,11,0.2)] text-[var(--brand-gold)] text-xs font-bold px-3 py-1.5 rounded-[8px] inline-block">
                      {budgetLevel.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider mb-3">Ritmo da Viagem</h4>
                    <span className="bg-[var(--brand-blue-light)] border border-[var(--brand-blue)]/20 text-[var(--brand-blue)] text-xs font-bold px-3 py-1.5 rounded-[8px] inline-block">
                      {travelPace.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider mb-3">Continentes Favoritos</h4>
                  <div className="flex flex-wrap gap-2">
                    {preferences?.preferred_continents && preferences.preferred_continents.length > 0 ? (
                      preferences.preferred_continents.map((c: string) => (
                        <span key={c} className="bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-secondary)] text-xs font-bold px-3 py-1.5 rounded-[8px]">
                          {c}
                        </span>
                      ))
                    ) : (
                      <span className="text-sm text-[var(--text-muted)]">Nenhum continente selecionado.</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {activeSubTab === 'memories' && (
        <div className="fade-in-up flex flex-col gap-6">
          <div className="rounded-[20px] p-8 bg-[var(--bg-secondary)] border border-[var(--border-default)]">
            <div className="flex items-center gap-2.5 mb-4">
              <Brain size={20} className="text-[var(--brand-blue)]" />
              <h3 className="m-0 text-xl font-extrabold text-[var(--text-primary)]">O que a DIJA aprendeu sobre voce</h3>
            </div>
            
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-7">
              Enquanto voce conversa no chat cognitivo, a DIJA AI extrai implicitamente suas preferencias ocultas (regras de viagem, hoteis favoritos, desgostos). Essas memorias moldam e calibram as recomendacoes futuras em tempo real!
            </p>

            {memories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {memories.map((mem) => {
                  const isPositive = mem.memory_key.includes("likes") || mem.memory_key.includes("prefers");
                  const score = Math.round(mem.confidence_score * 100);
                  
                  return (
                    <div key={mem.id} className="rounded-[16px] p-5 flex flex-col gap-2 relative bg-[var(--bg-surface)] border border-[var(--border-default)]">
                      <div className="flex justify-between items-start w-full">
                        <span className="text-xs font-extrabold px-2 py-1 rounded-[6px]"
                          style={{
                            background: isPositive ? 'rgba(22, 163, 74, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                            color: isPositive ? 'var(--brand-green)' : '#dc2626',
                            border: isPositive ? '1px solid rgba(22, 163, 74, 0.2)' : '1px solid rgba(239, 68, 68, 0.2)'
                          }}>
                          {isPositive ? 'Gosto Extraido' : 'Restricao/Desgosto'}
                        </span>
                        <div className="flex items-center gap-1 ml-auto">
                          <Award size={12} className="text-[var(--brand-blue)]" />
                          <span className="text-xs font-bold text-[var(--brand-blue)]">Confianca: {score}%</span>
                        </div>
                      </div>
                      
                      <h4 className="text-sm font-extrabold text-[var(--text-primary)] mt-2 mb-0.5">
                        {mem.memory_key.replace("likes_", "Gosta de ").replace("dislikes_", "Evita ").replace("prefers_", "Prefere ").toUpperCase()}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] m-0 italic">
                        &ldquo;DIJA analisou seu comportamento e salvou a regra de contexto: {mem.memory_key}&ldquo;
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-10 px-5 text-center text-[var(--text-muted)] bg-[var(--bg-surface)] rounded-[16px] border border-dashed border-[var(--border-default)]">
                <Brain size={36} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
                <p className="text-sm m-0">Nenhuma memoria implicita aprendida pela DIJA ainda.</p>
                <small className="text-xs text-[var(--text-muted)] block mt-1">Inicie uma conversa no chat da DIJA para recalibrar o sistema cognitivo!</small>
              </div>
            )}
          </div>
        </div>
      )}

      {activeSubTab === 'history' && (
        <div className="fade-in-up flex flex-col gap-6">
          <div className="rounded-[20px] p-8 bg-[var(--bg-secondary)] border border-[var(--border-default)]">
            <div className="flex items-center gap-2.5 mb-6">
              <History size={20} className="text-[var(--brand-blue)]" />
              <h3 className="m-0 text-xl font-extrabold text-[var(--text-primary)]">Historico do Viajante</h3>
            </div>

            {events.length > 0 ? (
              <div className="flex flex-col gap-3">
                {events.map((ev) => {
                  let icon = <Activity size={14} className="text-[var(--text-muted)]" />;
                  let label = "Interagiu com";
                  
                  if (ev.event_type === 'view_destination') {
                    icon = <Eye size={14} className="text-[var(--brand-blue)]" />;
                    label = "Visualizou detalhes do destino";
                  } else if (ev.event_type === 'save_destination') {
                    icon = <Heart size={14} className="text-red-400" />;
                    label = "Salvou em favoritos o destino";
                  } else if (ev.event_type === 'discard_recommendation') {
                    icon = <Compass size={14} className="text-[var(--text-muted)]" />;
                    label = "Descartou recomendacao de";
                  }
                  
                  const targetName = destinationsMap[ev.item_id] || ev.item_id;

                  return (
                    <div key={ev.id} className="flex items-center gap-4 rounded-[12px] px-4 py-3 bg-[var(--bg-surface)] border border-[var(--border-default)]">
                      <div className="w-7 h-7 rounded-[8px] bg-[var(--bg-surface)] border border-[var(--border-default)] flex items-center justify-center">
                        {icon}
                      </div>
                      <div className="flex-1">
                        <p className="m-0 text-sm font-semibold text-[var(--text-secondary)]">
                          {label} <strong style={{ color: 'var(--brand-blue)' }}>{targetName}</strong>
                        </p>
                        <span className="text-xs text-[var(--text-muted)]">
                          Tipo: {ev.item_type} &bull; ID: {ev.item_id.slice(0, 8)}...
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[var(--text-muted)]">
                        {new Date(ev.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} - {new Date(ev.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-10 px-5 text-center text-[var(--text-muted)] bg-[var(--bg-surface)] rounded-[16px] border border-dashed border-[var(--border-default)]">
                <Activity size={32} className="mx-auto mb-3" style={{ color: 'var(--text-muted)' }} />
                <p className="text-sm m-0">Nenhuma atividade comportamental registrada.</p>
                <small className="text-xs text-[var(--text-muted)] block mt-1">Suas acoes de clique, visualizacao e salvamento aparecerao listadas aqui.</small>
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
    <Suspense fallback={<div style={{ padding: 20, color: 'var(--text-muted)' }}>Carregando perfil...</div>}>
      <PerfilContent />
    </Suspense>
  );
}
