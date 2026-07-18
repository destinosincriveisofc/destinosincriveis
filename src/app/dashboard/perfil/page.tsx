"use client";

import React, { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { User, Camera, Lock, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const API = 'https://destinosincriveis.vps-kinghost.net';

function PerfilContent() {
  const profileRef = useScrollReveal<HTMLDivElement>();
  const formRef = useScrollReveal<HTMLFormElement>();
  const router = useRouter();
  const [profile, setProfile] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [nome, setNome] = React.useState('');
  const [senhaAtual, setSenhaAtual] = React.useState('');
  const [novaSenha, setNovaSenha] = React.useState('');
  const [confirmarSenha, setConfirmarSenha] = React.useState('');
  const [saving, setSaving] = React.useState(false);
  const [msg, setMsg] = React.useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [avatarUploading, setAvatarUploading] = React.useState(false);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const getToken = () => localStorage.getItem('token') || '';

  React.useEffect(() => {
    const token = getToken();
    if (!token) { router.push('/login'); return; }
    fetch(`${API}/api/members/profile`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        setProfile(data);
        setNome(data.nome || '');
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, [router]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    if (novaSenha && novaSenha !== confirmarSenha) {
      setMsg({ type: 'error', text: 'As senhas não coincidem!' });
      return;
    }
    if (novaSenha && novaSenha.length < 6) {
      setMsg({ type: 'error', text: 'Nova senha deve ter pelo menos 6 caracteres.' });
      return;
    }
    setSaving(true);
    try {
      const body: any = { nome };
      if (novaSenha) { body.senha_atual = senhaAtual; body.nova_senha = novaSenha; }
      const res = await fetch(`${API}/api/members/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg({ type: 'success', text: data.message || 'Perfil atualizado!' });
        setSenhaAtual(''); setNovaSenha(''); setConfirmarSenha('');
        setProfile((p: any) => ({ ...p, nome }));
        const stored = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({ ...stored, nome }));
      } else {
        setMsg({ type: 'error', text: data.error || 'Erro ao salvar.' });
      }
    } catch {
      setMsg({ type: 'error', text: 'Erro de conexão.' });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`${API}/api/members/avatar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: form,
      });
      const data = await res.json();
      if (res.ok) {
        setProfile((p: any) => ({ ...p, avatar_url: data.avatar_url }));
        setMsg({ type: 'success', text: 'Foto atualizada com sucesso!' });
      } else {
        setMsg({ type: 'error', text: data.error || 'Erro ao enviar foto.' });
      }
    } catch {
      setMsg({ type: 'error', text: 'Erro ao enviar foto.' });
    } finally {
      setAvatarUploading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300, color: '#94a3b8' }}>
        Carregando perfil...
      </div>
    );
  }

  const initials = (profile?.nome || 'U').split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <h1 className="fade-in-up" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: 8 }}>👤 Meu Perfil</h1>
      <p className="fade-in-up" style={{ color: '#94a3b8', marginBottom: 32, fontSize: '0.95rem' }}>Gerencie suas informações e segurança da conta.</p>

      {/* Avatar */}
      <div className="fade-in-up" style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
        <div style={{ position: 'relative', width: 110, height: 110 }}>
          {profile?.avatar_url ? (
            <img
              src={`${API}${profile.avatar_url}`}
              alt="Avatar"
              style={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', border: '3px solid #3b82f6' }}
            />
          ) : (
            <div style={{
              width: 110, height: 110, borderRadius: '50%', background: 'linear-gradient(135deg,#3b82f6,#06b6d4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.4rem', fontWeight: 800, color: '#fff', border: '3px solid #3b82f6'
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
              background: '#3b82f6', border: '2px solid #0A1628',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#fff', transition: 'background 0.2s'
            }}
            title="Alterar foto"
          >
            <Camera size={16} />
          </button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
        </div>
      </div>

      {/* Account Info */}
      <div ref={profileRef} className="fade-in-up hover-lift" style={{
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 14, padding: 20, marginBottom: 24, display: 'grid',
        gridTemplateColumns: '1fr 1fr', gap: '12px 24px'
      }}>
        {[
          { label: 'Email', value: profile?.email },
          { label: 'Telefone', value: profile?.telefone || '—' },
          { label: 'Status', value: profile?.status === 'ativo' ? '✅ Ativo' : '❌ Inativo' },
          { label: 'Tipo de Conta', value: profile?.role === 'admin' ? '⭐ Admin' : '👑 Membro VIP' },
          { label: 'Membro desde', value: profile?.data_inicio ? new Date(profile.data_inicio).toLocaleDateString('pt-BR') : '—' },
        ].map(item => (
          <div key={item.label}>
            <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 4px 0' }}>{item.label}</p>
            <p style={{ fontSize: '0.95rem', color: '#e2e8f0', margin: 0, fontWeight: 500 }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Feedback Message */}
      {msg && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px', borderRadius: 10, marginBottom: 20,
          background: msg.type === 'success' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
          border: `1px solid ${msg.type === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
          color: msg.type === 'success' ? '#6ee7b7' : '#fca5a5',
          fontSize: '0.9rem', fontWeight: 500
        }}>
          {msg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {msg.text}
        </div>
      )}

      {/* Edit Form */}
      <form ref={formRef} className="fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Nome */}
        <div className="hover-lift" style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14, padding: 24
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <User size={18} color="#60a5fa" />
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Dados Pessoais</h3>
          </div>
          <label style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
            Nome completo
          </label>
          <input
            type="text"
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Seu nome completo"
            style={{
              width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: '0.95rem',
              fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Senha */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14, padding: 24
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Lock size={18} color="#60a5fa" />
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Alterar Senha</h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '0 0 16px 0' }}>Deixe em branco para manter a senha atual.</p>
          {[
            { label: 'Senha atual', val: senhaAtual, set: setSenhaAtual, ph: 'Digite sua senha atual' },
            { label: 'Nova senha', val: novaSenha, set: setNovaSenha, ph: 'Mínimo 6 caracteres' },
            { label: 'Confirmar nova senha', val: confirmarSenha, set: setConfirmarSenha, ph: 'Repita a nova senha' },
          ].map(f => (
            <div key={f.label} style={{ marginBottom: 14 }}>
              <label style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: 6 }}>
                {f.label}
              </label>
              <input
                type="password"
                value={f.val}
                onChange={e => f.set(e.target.value)}
                placeholder={f.ph}
                style={{
                  width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10, padding: '12px 16px', color: '#fff', fontSize: '0.95rem',
                  fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box'
                }}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            color: '#fff', border: 'none', borderRadius: 12,
            padding: '15px 28px', fontSize: '1rem', fontWeight: 700,
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1, transition: 'all 0.2s',
            boxShadow: '0 4px 14px rgba(59,130,246,0.3)'
          }}
        >
          <Save size={18} />
          {saving ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </form>
    </div>
  );
}

export default function PerfilPage() {
  return (
    <Suspense fallback={<div style={{ padding: 20, color: '#94a3b8' }}>Carregando...</div>}>
      <PerfilContent />
    </Suspense>
  );
}
