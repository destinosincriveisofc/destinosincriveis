"use client";

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';
import styles from './page.module.css';

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
      const res = await fetchWithTimeout('https://destinosincriveis.vps-kinghost.net/api/auth/reset-password', {
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
    <div className={styles.main}>
      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <img src="/logo-oficial.jpg" alt="Logo" className={styles.logoImage} />
          <h1 className={styles.brandTitle}>CLUB DIJA</h1>
          <p className={styles.brandSubtitle}>Criar nova senha</p>
        </div>

        {success ? (
          <div className={styles.successContainer}>
            <div className={styles.successIconWrapper}>
              <CheckCircle size={36} color="#10b981" />
            </div>
            <h2 className={styles.successTitle}>Senha redefinida!</h2>
            <p className={styles.successText}>
              Sua senha foi atualizada com sucesso.
            </p>
            <p className={styles.redirectText}>Redirecionando para o login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            {!token && (
              <div className={styles.tokenErrorBox}>
                Token inválido ou expirado.{' '}
                <Link href="/recuperar-senha" className={styles.tokenErrorLink}>Solicite um novo link.</Link>
              </div>
            )}

            {error && (
              <div className={styles.errorBox}>
                {error}
              </div>
            )}

            {[
              { label: 'Nova senha', val: novaSenha, set: setNovaSenha, ph: 'Mínimo 6 caracteres' },
              { label: 'Confirmar nova senha', val: confirmar, set: setConfirmar, ph: 'Repita a nova senha' },
            ].map(f => (
              <div key={f.label} className={styles.inputWrapper}>
                <label className={styles.label}>{f.label}</label>
                <div className={styles.inputContainer}>
                  <Lock size={18} className={styles.inputIcon} />
                  <input
                    type="password"
                    className={styles.input}
                    value={f.val}
                    onChange={e => f.set(e.target.value)}
                    placeholder={f.ph}
                    required
                  />
                </div>
              </div>
            ))}

            <button type="submit" disabled={loading || !token} className={styles.submitBtn}>
              {loading ? 'Salvando...' : 'Redefinir Senha'}
              {!loading && <ArrowRight size={18} />}
            </button>

            <div className={styles.footer}>
              <Link href="/login" className={styles.backLink}>
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
    <Suspense fallback={<div className={styles.loadingFallback}>Carregando...</div>}>
      <NovaSenhaContent />
    </Suspense>
  );
}
