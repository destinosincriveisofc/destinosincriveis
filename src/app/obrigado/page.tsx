"use client";

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Lock } from 'lucide-react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';
import styles from './page.module.css';

export default function ObrigadoPage() {
  const [email, setEmail] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email') || "";
    const nomeParam = params.get('nome') || "";
    if (emailParam || nomeParam) {
      sessionStorage.setItem('obrigado_email', emailParam);
      sessionStorage.setItem('obrigado_nome', nomeParam);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    const storedEmail = sessionStorage.getItem('obrigado_email') || "";
    const storedNome = sessionStorage.getItem('obrigado_nome') || "";
    setEmail(storedEmail);
    setNome(storedNome);
    if (storedEmail) setShowForm(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Por favor, preencha todos os campos de senha.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas nao coincidem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve conter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetchWithTimeout("https://destinosincriveis.vps-kinghost.net/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao cadastrar senha. Tente novamente.");
      }

      try {
        const baseUrl = typeof window !== 'undefined' &&
          (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
            ? 'http://localhost:8001'
            : 'https://destinosincriveis.vps-kinghost.net';

        const loginRes = await fetchWithTimeout(`${baseUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        if (loginRes.ok) {
          const loginData = await loginRes.json();
          const token = loginData.access_token;
          if (token) {
            localStorage.setItem("token", token);

            const meRes = await fetchWithTimeout(`${baseUrl}/api/auth/me`, {
              headers: { "Authorization": `Bearer ${token}` }
            });
            if (meRes.ok) {
              const meData = await meRes.json();
              localStorage.setItem("user", JSON.stringify(meData));
            } else {
              localStorage.setItem("user", JSON.stringify({ email, full_name: email.split('@')[0] }));
            }
          }
        }
      } catch (loginErr) {
        console.error("Auto login after registration failed:", loginErr);
      }

      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Falha de rede ao se conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <CheckCircle size={48} strokeWidth={1.5} />
        </div>

        <h1 className={styles.title}>Inscricao confirmada!</h1>

        {showForm ? (
          <>
            <p className={styles.subtitle}>
              {nome ? `Ola, ${nome}!` : "Ola!"} Sua assinatura foi confirmada.
              Crie sua senha para ativar sua conta e acessar a area de membros.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <div className={styles.error}>{error}</div>}

              <div className={styles.field}>
                <div className={styles.inputWrap}>
                  <Lock className={styles.icon} size={18} />
                  <input
                    type="password"
                    placeholder="Nova senha (min. 6 caracteres)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    placeholder="Confirmar senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <button type="submit" disabled={loading} className={styles.button}>
                {loading ? "Processando..." : "Finalizar cadastro"}
              </button>
            </form>
          </>
        ) : (
          <>
            <p className={styles.subtitle}>
              Sua assinatura foi processada com sucesso.
            </p>
            <p className={styles.info}>
              Em instantes voce recebera as instrucoes de acesso por e-mail e WhatsApp.
            </p>
            <div className={styles.links}>
              <Link href="/dashboard" className={styles.primaryLink}>
                Ir para o painel
              </Link>
              <Link href="/" className={styles.secondaryLink}>
                Pagina inicial
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
