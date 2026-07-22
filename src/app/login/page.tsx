"use client";

import React from 'react';
import Link from 'next/link';
import { Lock, Mail } from 'lucide-react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';
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
      const response = await fetchWithTimeout("https://destinosincriveis.vps-kinghost.net/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "E-mail ou senha incorretos.");
      }

      const token = data.access_token || data.token;
      if (!token) {
        throw new Error("Token nao fornecido pelo servidor.");
      }

      localStorage.setItem("token", token);

      try {
        const baseUrl = typeof window !== 'undefined' &&
          (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
            ? 'http://localhost:8001'
            : 'https://destinosincriveis.vps-kinghost.net';

        const meRes = await fetchWithTimeout(`${baseUrl}/api/auth/me`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (meRes.ok) {
          const meData = await meRes.json();
          localStorage.setItem("user", JSON.stringify(meData));
        } else {
          localStorage.setItem("user", JSON.stringify({ email, full_name: email.split('@')[0] }));
        }
      } catch (meErr) {
        console.error("Error fetching user profile:", meErr);
        localStorage.setItem("user", JSON.stringify({ email, full_name: email.split('@')[0] }));
      }

      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Falha ao se conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span className={styles.logoBox}>DI</span>
          <span className={styles.logoText}>Destinos Incriveis</span>
        </div>

        <h1 className={styles.title}>Entrar</h1>
        <p className={styles.subtitle}>Acesse sua conta</p>

        <form onSubmit={handleLogin} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.field}>
            <div className={styles.inputWrap}>
              <Mail className={styles.icon} size={18} />
              <input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <div className={styles.inputWrap}>
              <Lock className={styles.icon} size={18} />
              <input
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <a href="/recuperar-senha" className={styles.forgot}>
          Esqueceu a senha?
        </a>

        <p className={styles.signup}>
          Ainda nao e membro?{" "}
          <Link href="/club" className={styles.signupLink}>
            Descubra o Clube
          </Link>
        </p>
      </div>
    </div>
  );
}
