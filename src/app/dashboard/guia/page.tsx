"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Send, Sparkles } from 'lucide-react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export default function GuiaPage() {
  const router = useRouter();
  const [token, setToken] = React.useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("token");
    }
    return null;
  });
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
    }
  }, [router]);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (messageText: string) => {
    if (!messageText.trim() || !token) return;

    const userMessage: Message = { role: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetchWithTimeout("https://destinosincriveis.vps-kinghost.net/api/members/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          message: messageText,
          history: history
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setMessages(prev => [...prev, { role: 'assistant', text: data.text }]);
        } else {
          setMessages(prev => [...prev, { role: 'assistant', text: "Erro ao gerar resposta: " + (data.error || "Tente novamente.") }]);
        }
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: "Erro de conexao com o servidor. Verifique sua sessao." }]);
      }
    } catch (err) {
      console.error("Error calling agent:", err);
      setMessages(prev => [...prev, { role: 'assistant', text: "Ocorreu um erro ao processar sua solicitacao." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const handleSuggestionClick = (text: string) => {
    handleSend(text);
  };

  const renderMessageContent = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      let cleanLine = line;

      if (cleanLine.startsWith("### ")) {
        return (
          <h4 key={idx} style={{ color: 'var(--text-primary)', marginTop: '14px', marginBottom: '6px', fontWeight: '800', fontSize: '1.05rem' }}>
            {replaceInlineStyles(cleanLine.substring(4))}
          </h4>
        );
      }
      if (cleanLine.startsWith("## ")) {
        return (
          <h3 key={idx} style={{ color: 'var(--text-primary)', marginTop: '18px', marginBottom: '8px', fontWeight: '800', fontSize: '1.15rem' }}>
            {replaceInlineStyles(cleanLine.substring(3))}
          </h3>
        );
      }
      if (cleanLine.startsWith("# ")) {
        return (
          <h2 key={idx} style={{ color: 'var(--text-primary)', marginTop: '22px', marginBottom: '10px', fontWeight: '900', fontSize: '1.3rem' }}>
            {replaceInlineStyles(cleanLine.substring(2))}
          </h2>
        );
      }

      if (cleanLine.startsWith("- ") || cleanLine.startsWith("* ")) {
        return (
          <li key={idx} style={{ marginLeft: '16px', marginBottom: '4px', listStyleType: 'disc', color: 'var(--text-secondary)' }}>
            {replaceInlineStyles(cleanLine.substring(2))}
          </li>
        );
      }

      const orderedMatch = cleanLine.match(/^(\d+)\.\s(.*)/);
      if (orderedMatch) {
        return (
          <li key={idx} style={{ marginLeft: '16px', marginBottom: '4px', listStyleType: 'decimal', color: 'var(--text-secondary)' }}>
            {replaceInlineStyles(orderedMatch[2])}
          </li>
        );
      }

      if (cleanLine.trim() === "") {
        return <div key={idx} style={{ height: '8px' }} />;
      }

      return (
        <p key={idx} style={{ marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          {replaceInlineStyles(cleanLine)}
        </p>
      );
    });
  };

  const replaceInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} style={{ color: 'var(--text-primary)', fontWeight: '800' }}>
            {part.slice(2, -2)}
          </strong>
        );
      }

      const linkParts = part.split(/(\[[^\]]+\]\([^)]+\))/g);
      return linkParts.map((lPart, j) => {
        const m = lPart.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (m) {
          return (
            <a
              key={j}
              href={m[2]}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--brand-blue)', textDecoration: 'underline', fontWeight: '600' }}
            >
              {m[1]}
            </a>
          );
        }
        return lPart;
      });
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] max-w-[900px] mx-auto bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-[16px] overflow-hidden shadow-sm">
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5 scroll-smooth">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center m-auto text-center max-w-[550px] p-5">
            <div className="mb-4">
              <Sparkles size={40} style={{ color: 'var(--brand-blue)' }} />
            </div>
            <h2 className="text-2xl font-extrabold text-[var(--text-primary)] m-0 mb-2.5">Roteiros & Dicas do Guia de Bolso</h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              Ola! Como Concierge do CLUB DIJA, estou aqui para te ajudar. Escreva um destino abaixo e farei um roteiro inesquecivel para voce!
            </p>
            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                onClick={() => handleSuggestionClick("Monte um roteiro de 5 dias completo por Roma com dicas fora da rota turistica")}
                className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-[12px] p-3.5 text-left text-[var(--text-secondary)] text-sm cursor-pointer transition-all hover:bg-[var(--brand-blue-light)] hover:border-[var(--brand-blue)] hover:text-[var(--text-primary)]"
              >
                Roteiro de 5 dias em Roma
              </button>
              <button
                onClick={() => handleSuggestionClick("Me de hacks de viagem e economia em hoteis de Orlando")}
                className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-[12px] p-3.5 text-left text-[var(--text-secondary)] text-sm cursor-pointer transition-all hover:bg-[var(--brand-blue-light)] hover:border-[var(--brand-blue)] hover:text-[var(--text-primary)]"
              >
                Dicas de economia em Orlando
              </button>
              <button
                onClick={() => handleSuggestionClick("Indique 5 restaurantes secretos e imperdiveis em Paris")}
                className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-[12px] p-3.5 text-left text-[var(--text-secondary)] text-sm cursor-pointer transition-all hover:bg-[var(--brand-blue-light)] hover:border-[var(--brand-blue)] hover:text-[var(--text-primary)]"
              >
                Lugares secretos em Paris
              </button>
              <button
                onClick={() => handleSuggestionClick("Crie um guia completo de passeios e milhas para Fernando de Noronha")}
                className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-[12px] p-3.5 text-left text-[var(--text-secondary)] text-sm cursor-pointer transition-all hover:bg-[var(--brand-blue-light)] hover:border-[var(--brand-blue)] hover:text-[var(--text-primary)]"
              >
                Guia Fernando de Noronha
              </button>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] p-4 rounded-[16px] text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[var(--brand-blue-light)] text-[var(--text-primary)] rounded-br-[4px]'
                    : 'bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)] rounded-bl-[4px]'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-2 text-[var(--brand-blue)] font-bold text-xs uppercase tracking-wide mb-2">
                    <Sparkles size={12} />
                    <span>Guia de Bolso</span>
                  </div>
                )}
                {msg.role === 'user' ? msg.text : renderMessageContent(msg.text)}
              </div>
            </div>
          ))
        )}

        {isTyping && (
          <div className="flex w-full justify-start">
            <div className="max-w-[75%] rounded-[16px] rounded-bl-[4px] bg-[var(--bg-secondary)] border border-[var(--border-default)] flex items-center gap-1.5 px-4 py-3">
              <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-[var(--border-default)] p-4 bg-[var(--bg-secondary)]">
        <form onSubmit={handleFormSubmit} className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Pergunte ao seu Concierge sobre hoteis, restaurantes, roteiros ou voos..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            className="flex-1 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-[12px] px-4 py-3.5 text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--brand-blue)] focus:shadow-[0_0_0_3px_var(--brand-blue-light)] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="bg-[var(--brand-blue)] text-white rounded-[12px] w-12 h-12 flex items-center justify-center cursor-pointer transition-all hover:bg-[var(--brand-blue-hover)] disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
