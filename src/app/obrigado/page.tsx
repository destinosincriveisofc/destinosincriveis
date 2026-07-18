"use client";

import React from 'react';
import Link from 'next/link';
import { Check, MessageSquare, Lock } from 'lucide-react';
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
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get('email');
      setEmail(emailParam || "");
      setNome(params.get('nome') || "");
      if (emailParam !== null) {
        setShowForm(true);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Por favor, preencha todos os campos de senha.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve conter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://destinosincriveis.vps-kinghost.net/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao cadastrar senha. Tente novamente.");
      }

      // Save token in localStorage and redirect to dashboard
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Falha de rede ao se conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        {/* Animated Success Checkmark */}
        <div className={styles.successIconWrapper}>
          <Check size={40} strokeWidth={3} />
        </div>

        {/* Success Title */}
        <h1 className={styles.title}>
          Inscrição Aprovada! Bem-vindo ao Club DIJA 👑
        </h1>

        {showForm ? (
          <>
            <p className={styles.subtitle}>
              Olá, {nome || "Membro"}! Sua assinatura foi confirmada. Agora, crie a sua senha para ativar sua conta e acessar a área de membros.
            </p>

            <form onSubmit={handleSubmit} className={styles.formContainer}>
              <h2 className={styles.formTitle}>Defina sua Senha de Acesso</h2>

              {error && <div className={styles.errorMessage}>{error}</div>}

              <div className={styles.inputGroup}>
                <span className={styles.inputLabel}>E-mail</span>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.inputField} 
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <span className={styles.inputLabel}>Nova Senha</span>
                <input 
                  type="password" 
                  placeholder="Mínimo 6 caracteres" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.inputField} 
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <span className={styles.inputLabel}>Confirmar Senha</span>
                <input 
                  type="password" 
                  placeholder="Repita a nova senha" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={styles.inputField} 
                  required
                />
              </div>

              <button type="submit" disabled={loading} className={styles.submitBtn}>
                <Lock size={18} />
                <span>{loading ? "Processando..." : "Finalizar Cadastro e Acessar Painel"}</span>
              </button>
            </form>
          </>
        ) : (
          <>
            <p className={styles.subtitle}>
              Sua assinatura foi processada com sucesso. Siga as instruções abaixo para acessar seus benefícios:
            </p>

            {/* Step List Instructions */}
            <div className={styles.instructionList}>
              <div className={styles.instructionItem}>
                <div className={styles.instructionNumber}>1</div>
                <div className={styles.instructionContent}>
                  <span className={styles.instructionTitle}>WhatsApp VIP</span>
                  <p className={styles.instructionText}>
                    Em instantes você receberá no seu número de cadastro as mensagens de boas-vindas e os links de acesso aos nossos 3 grupos VIP (Dicas, Ofertas e Comunidade).
                  </p>
                </div>
              </div>

              <div className={styles.instructionItem}>
                <div className={styles.instructionNumber}>2</div>
                <div className={styles.instructionContent}>
                  <span className={styles.instructionTitle}>E-mail de Membros</span>
                  <p className={styles.instructionText}>
                    O link de ativação da sua área de membros exclusiva foi enviado para o seu e-mail cadastrado.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Support Button pointing to WA */}
        <a 
          href="https://wa.me/5511997204445" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.supportBtn}
        >
          <MessageSquare size={18} />
          <span>Falar com o Suporte (WhatsApp)</span>
        </a>

        {/* Back home Link */}
        <Link href="/" className={styles.backHomeLink}>
          Ir para a Página Inicial
        </Link>
      </div>
    </div>
  );
}
