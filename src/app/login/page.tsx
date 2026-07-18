"use client";

import React from 'react';
import Link from 'next/link';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import styles from './page.module.css';

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://destinosincriveis.vps-kinghost.net/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "E-mail ou senha incorretos.");
      }

      // Save credentials in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Falha ao se conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.loginCard}>
        <div className={styles.logoContainer}>
          <img src="/logo-oficial.jpg" alt="Logo Oficial" className={styles.logoImage} />
          <h1 className={styles.brandTitle}>CLUB DIJA</h1>
          <p className={styles.brandSubtitle}>Área de Membros Exclusiva</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          {error && <div className={styles.errorBox}>{error}</div>}

          <div className={styles.inputWrapper}>
            <label className={styles.label}>E-mail</label>
            <div className={styles.inputContainer}>
              <Mail className={styles.inputIcon} size={18} />
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.label}>Senha</label>
            <div className={styles.inputContainer}>
              <Lock className={styles.inputIcon} size={18} />
              <input
                type="password"
                placeholder="Sua senha de acesso"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className={styles.submitBtn}>
            <span>{loading ? "Entrando..." : "Entrar no Painel"}</span>
            <ArrowRight size={18} />
          </button>

          <div style={{ textAlign: 'center', marginTop: 12 }}>
            <a
              href="/recuperar-senha"
              style={{
                color: '#60a5fa',
                fontSize: '0.88rem',
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'color 0.2s'
              }}
              onMouseOver={e => (e.currentTarget.style.color = '#93c5fd')}
              onMouseOut={e => (e.currentTarget.style.color = '#60a5fa')}
            >
              🔑 Esqueceu a senha?
            </a>
          </div>
        </form>

        <div className={styles.footer}>
          <p>Esqueceu seus dados ou precisa de ajuda?</p>
          <a href="https://wa.me/5511997204445" target="_blank" rel="noopener noreferrer" className={styles.supportLink}>
            Fale com o suporte no WhatsApp 💬
          </a>
        </div>
      </div>
    </div>
  );
}
