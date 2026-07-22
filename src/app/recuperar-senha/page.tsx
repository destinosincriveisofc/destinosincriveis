"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';
import styles from './page.module.css';

export default function RecuperarSenhaPage() {
  const [email, setEmail] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetchWithTimeout('https://destinosincriveis.vps-kinghost.net/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || 'Erro ao processar solicitação.');
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
          <p className={styles.brandSubtitle}>Recuperar acesso à conta</p>
        </div>

        {success ? (
          <div className={styles.successContainer}>
            <div className={styles.successIconWrapper}>
              <CheckCircle size={36} color="#10b981" />
            </div>
            <h2 className={styles.successTitle}>Enviamos as instruções!</h2>
            <p className={styles.successText}>
              Se o e-mail existir em nossa base, você receberá um link de redefinição via{' '}
              <strong className={styles.whatsAppHighlight}>WhatsApp</strong> em instantes.
            </p>
            <Link href="/login" className={styles.successBtn}>
              Voltar ao Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <p className={styles.description}>
              Digite seu e-mail cadastrado e enviaremos um link de redefinição via{' '}
              <strong className={styles.whatsAppHighlight}>WhatsApp</strong>.
            </p>

            {error && (
              <div className={styles.errorBox}>
                {error}
              </div>
            )}

            <div className={styles.inputWrapper}>
              <label className={styles.label}>E-mail cadastrado</label>
              <div className={styles.inputContainer}>
                <Mail size={18} className={styles.inputIcon} />
                <input
                  type="email"
                  className={styles.input}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  required
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
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
