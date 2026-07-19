"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, CheckCircle } from 'lucide-react';

function NovaSenhaContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') || '';
  const [novaSenha, setNovaSenha] = React.useState('');
  const [confirmar, setConfirmar] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (novaSenha !== confirmar) { setError('As senhas não coincidem.'); return; }
    if (novaSenha.length < 6) { setError('A senha deve ter pelo menos 6 caracteres.'); return; }
    if (!token) { setError('Token inválido. Solicite um novo link de recuperação.'); return; }
    setLoading(true);
    try {
      const res = await fetch('https://destinosincriveis.vps-kinghost.net/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, nova_senha: novaSenha }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/login'), 3000);
      } else {
        setError(data.error || 'Erro ao redefinir senha.');
      }
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A122C',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{
        background: 'rgba(10,18,44,0.7)', backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(56,189,248,0.2)', borderRadius: 20,
        padding: '48px 40px', maxWidth: 440, width: '100%',
        boxShadow: '0 24px 60px rgba(0,0,0,0.4)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <img src="/logo-oficial.jpg" alt="Logo" style={{ width: 64, height: 64, borderRadius: '50%', border: '2px solid #FFC107', marginBottom: 16 }} />
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', margin: '0 0 8px 0' }}>CLUB DIJA</h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>Criar nova senha</p>
        </div>

        {success ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <CheckCircle size={36} color="#10b981" />
            </div>
            <h2 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>Senha redefinida!</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 8 }}>
              Sua senha foi atualizada com sucesso.
            </p>
            <p style={{ color: '#60a5fa', fontSize: '0.85rem' }}>Redirecionando para o login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {!token && (
              <div style={{
                background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 10, padding: '12px 16px', color: '#fca5a5',
                fontSize: '0.88rem', marginBottom: 20, textAlign: 'center'
              }}>
                Token inválido ou expirado. <Link href="/recuperar-senha" style={{ color: '#60a5fa' }}>Solicite um novo link.</Link>
              </div>
            )}

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
                borderRadius: 10, padding: '12px 16px', color: '#fca5a5',
                fontSize: '0.88rem', marginBottom: 20, textAlign: 'center'
              }}>
                {error}
              </div>
            )}

            {[
              { label: 'Nova senha', val: novaSenha, set: setNovaSenha, ph: 'Mínimo 6 caracteres' },
              { label: 'Confirmar nova senha', val: confirmar, set: setConfirmar, ph: 'Repita a nova senha' },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 20 }}>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 8 }}>
                  {f.label}
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input
                    type="password"
                    className="premium-input"
                    value={f.val}
                    onChange={e => f.set(e.target.value)}
                    placeholder={f.ph}
                    required
                    onFocus={e => e.target.style.borderColor = '#38BDF8'}
                    onBlur={e => e.target.style.borderColor = 'rgba(56,189,248,0.2)'}
                    style={{
                      width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(56,189,248,0.2)',
                      borderRadius: 12, padding: '14px 16px 14px 44px', color: '#fff', fontSize: '0.95rem',
                      fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s, box-shadow 0.2s'
                    }}
                  />
                </div>
              </div>
            ))}

            <button type="submit" disabled={loading || !token} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              background: 'linear-gradient(135deg, #FFC107, #F59E0B)',
              color: '#0A122C', border: 'none', borderRadius: 12, padding: '15px',
              fontSize: '1rem', fontWeight: 800, cursor: (loading || !token) ? 'not-allowed' : 'pointer',
              opacity: (loading || !token) ? 0.6 : 1, transition: 'all 0.2s',
              boxShadow: '0 4px 14px rgba(255,193,7,0.3)'
            }}>
              {loading ? 'Salvando...' : 'Redefinir Senha'}
              {!loading && <ArrowRight size={18} />}
            </button>

            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Link href="/login" style={{ color: '#60a5fa', fontSize: '0.88rem', textDecoration: 'none', fontWeight: 500 }}>
                ← Voltar para o login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function NovaSenhaPage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0A1628', color: '#94a3b8' }}>Carregando...</div>}>
      <NovaSenhaContent />
    </Suspense>
  );
}
