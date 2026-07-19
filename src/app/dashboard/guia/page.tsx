"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Send, Sparkles } from 'lucide-react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';
import styles from './page.module.css';

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
      // Map history format to match what server expects: { role, text }
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
        setMessages(prev => [...prev, { role: 'assistant', text: "Erro de conexão com o servidor. Verifique sua sessão." }]);
      }
    } catch (err) {
      console.error("Error calling agent:", err);
      setMessages(prev => [...prev, { role: 'assistant', text: "Ocorreu um erro ao processar sua solicitação." }]);
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

  // Custom Inline Markdown Renderer for rich layouts
  const renderMessageContent = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      let cleanLine = line;

      // Header H3
      if (cleanLine.startsWith("### ")) {
        return (
          <h4 key={idx} style={{ color: '#FFC107', marginTop: '14px', marginBottom: '6px', fontWeight: '800', fontSize: '1.05rem' }}>
            {replaceInlineStyles(cleanLine.substring(4))}
          </h4>
        );
      }
      // Header H2
      if (cleanLine.startsWith("## ")) {
        return (
          <h3 key={idx} style={{ color: '#FFC107', marginTop: '18px', marginBottom: '8px', fontWeight: '800', fontSize: '1.15rem' }}>
            {replaceInlineStyles(cleanLine.substring(3))}
          </h3>
        );
      }
      // Header H1
      if (cleanLine.startsWith("# ")) {
        return (
          <h2 key={idx} style={{ color: '#FFC107', marginTop: '22px', marginBottom: '10px', fontWeight: '900', fontSize: '1.3rem' }}>
            {replaceInlineStyles(cleanLine.substring(2))}
          </h2>
        );
      }

      // Unordered List
      if (cleanLine.startsWith("- ") || cleanLine.startsWith("* ")) {
        return (
          <li key={idx} style={{ marginLeft: '16px', marginBottom: '4px', listStyleType: 'disc', color: '#e2e8f0' }}>
            {replaceInlineStyles(cleanLine.substring(2))}
          </li>
        );
      }

      // Ordered List
      const orderedMatch = cleanLine.match(/^(\d+)\.\s(.*)/);
      if (orderedMatch) {
        return (
          <li key={idx} style={{ marginLeft: '16px', marginBottom: '4px', listStyleType: 'decimal', color: '#e2e8f0' }}>
            {replaceInlineStyles(orderedMatch[2])}
          </li>
        );
      }

      // Empty Lines
      if (cleanLine.trim() === "") {
        return <div key={idx} style={{ height: '8px' }} />;
      }

      // Normal Paragraph
      return (
        <p key={idx} style={{ marginBottom: '8px', color: '#e2e8f0', fontSize: '0.95rem' }}>
          {replaceInlineStyles(cleanLine)}
        </p>
      );
    });
  };

  const replaceInlineStyles = (text: string) => {
    // Bold matching: **text**
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} style={{ color: '#ffffff', fontWeight: '800' }}>
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Links: [text](url)
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
              style={{ color: '#60a5fa', textDecoration: 'underline', fontWeight: '600' }}
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
    <div className={styles.chatContainer}>
      {/* Messages Scroll Area */}
      <div className={styles.messagesList}>
        {messages.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateLogo}>
              <Sparkles size={40} style={{ color: '#FFC107' }} />
            </div>
            <h2 className={styles.emptyStateTitle}>Roteiros & Dicas do Guia de Bolso VIP ✈️</h2>
            <p className={styles.emptyStateSubtitle}>
              Olá! Como Concierge de luxo do CLUB DIJA, estou aqui para te ajudar. Escreva um destino abaixo e farei um roteiro inesquecível para você!
            </p>
            <div className={styles.suggestionsGrid}>
              <button 
                onClick={() => handleSuggestionClick("Monte um roteiro de 5 dias completo por Roma com dicas fora da rota turística")}
                className={styles.suggestionCard}
              >
                🇮🇹 Roteiro de 5 dias em Roma
              </button>
              <button 
                onClick={() => handleSuggestionClick("Me dê hacks de viagem e economia em hotéis de Orlando")}
                className={styles.suggestionCard}
              >
                🇺🇸 Hacks de economia em Orlando
              </button>
              <button 
                onClick={() => handleSuggestionClick("Indique 5 restaurantes secretos e imperdíveis em Paris")}
                className={styles.suggestionCard}
              >
                🇫🇷 Lugares secretos em Paris
              </button>
              <button 
                onClick={() => handleSuggestionClick("Crie um guia completo de passeios e milhas para Fernando de Noronha")}
                className={styles.suggestionCard}
              >
                🇧🇷 Guia Fernando de Noronha
              </button>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div 
              key={index} 
              className={`${styles.messageRow} ${msg.role === 'user' ? styles.messageRowUser : styles.messageRowAssistant}`}
            >
              <div 
                className={`${styles.messageBubble} ${msg.role === 'user' ? styles.messageBubbleUser : styles.messageBubbleAssistant}`}
              >
                {msg.role === 'assistant' && (
                  <div className={styles.agentHeader}>
                    <Sparkles size={12} style={{ marginRight: '4px' }} />
                    <span>Guia de Bolso VIP</span>
                  </div>
                )}
                {msg.role === 'user' ? msg.text : renderMessageContent(msg.text)}
              </div>
            </div>
          ))
        )}

        {isTyping && (
          <div className={`${styles.messageRow} ${styles.messageRowAssistant}`}>
            <div className={`${styles.messageBubble} ${styles.messageBubbleAssistant} ${styles.loadingBubble}`}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing/Input Bottom Bar */}
      <div className={styles.inputArea}>
        <form onSubmit={handleFormSubmit} className={styles.inputForm}>
          <input
            type="text"
            placeholder="Pergunte ao seu Concierge VIP sobre hotéis, restaurantes, roteiros ou voos..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            className={styles.chatInput}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping} 
            className={styles.sendBtn}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
