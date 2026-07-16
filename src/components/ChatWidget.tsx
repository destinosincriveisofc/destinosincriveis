"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ChatWidget.module.css';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Olá! Sou a Inteligência Artificial Assistente do CLUB DIJA. Como posso ajudar você hoje?',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of message area
  useEffect(() => {
    if (isOpen) {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    // 1. Append user message to list
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // 2. Prepare API history payload (excluding the very first welcome message)
      const historyPayload = messages.slice(1).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        text: msg.text
      }));

      // 3. Request absolute backend URL
      const response = await fetch('https://destinosincriveis.vps-kinghost.net/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload
        })
      });

      if (!response.ok) {
        throw new Error('API server returned error status');
      }

      const data = await response.json();

      if (data.success && data.text) {
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: data.text,
          timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error(data.error || 'Invalid API response format');
      }
    } catch (error) {
      console.error('Chat API Error:', error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: 'Desculpe, estou com dificuldades para me conectar agora. Por favor, tente novamente ou entre em contato com nosso suporte via WhatsApp: https://wa.me/5511997204445',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const msgText = inputValue;
    setInputValue('');
    sendMessage(msgText);
  };

  const handleQuickOption = (option: string) => {
    sendMessage(option);
  };

  // Rich rendering of bold tags, markdown links, newlines and raw URLs
  const renderMessageText = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    
    return lines.map((line, lineIdx) => {
      const tokenRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+)/g;
      const parts = line.split(tokenRegex);
      
      const renderedParts = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={partIdx}>{part.slice(2, -2)}</strong>;
        }
        
        const mdLinkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (mdLinkMatch) {
          const linkText = mdLinkMatch[1];
          const linkUrl = mdLinkMatch[2];
          return (
            <a
              key={partIdx}
              href={linkUrl}
              target={linkUrl.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              style={{ color: '#5BA4CF', textDecoration: 'underline', fontWeight: 600 }}
            >
              {linkText}
            </a>
          );
        }
        
        if (/^https?:\/\/[^\s]+$/.test(part)) {
          return (
            <a
              key={partIdx}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#5BA4CF', textDecoration: 'underline', fontWeight: 600 }}
            >
              {part}
            </a>
          );
        }
        
        return part;
      });

      return (
        <React.Fragment key={lineIdx}>
          {renderedParts}
          {lineIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className={styles.widget}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={styles.chatBox}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerInfo}>
                <div className={styles.avatar}>
                  DJ
                </div>
                <div className={styles.headerMeta}>
                  <h4 className={styles.headerTitle}>CLUB DIJA</h4>
                  <span className={styles.status}>
                    <span className={styles.statusDot} />
                    Online
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={styles.closeButton}
                aria-label="Fechar"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className={styles.messageArea}>
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`${styles.messageRow} ${
                    msg.sender === 'user' ? styles.userRow : styles.botRow
                  }`}
                >
                  <div
                    className={`${styles.messageBubble} ${
                      msg.sender === 'user' ? styles.userBubble : styles.botBubble
                    }`}
                  >
                    <p style={{ margin: 0, wordBreak: 'break-word' }}>
                      {renderMessageText(msg.text)}
                    </p>
                    <span
                      className={`${styles.time} ${
                        msg.sender === 'user' ? styles.userTime : styles.botTime
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className={`${styles.messageRow} ${styles.botRow}`}>
                  <div className={`${styles.messageBubble} ${styles.botBubble}`} style={{ opacity: 0.8 }}>
                    <span style={{ color: '#8896A9', fontStyle: 'italic' }}>Assistente digitando...</span>
                  </div>
                </div>
              )}
              <div ref={messageEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className={styles.suggestions}>
              <button
                onClick={() => handleQuickOption('Como funciona o Club?')}
                className={styles.suggestionBtn}
                type="button"
              >
                Como funciona o Club?
              </button>
              <button
                onClick={() => handleQuickOption('Quero assinar')}
                className={styles.suggestionBtn}
                type="button"
              >
                Quero assinar
              </button>
              <button
                onClick={() => handleQuickOption('Suporte técnico')}
                className={styles.suggestionBtn}
                type="button"
              >
                Suporte técnico
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className={styles.form}>
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Escreva sua mensagem..."
                className={styles.input}
                disabled={isTyping}
              />
              <button type="submit" className={styles.sendBtn} aria-label="Enviar" disabled={isTyping}>
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.toggleBtn}
        aria-label="Abrir Chat"
      >
        <MessageCircle size={26} />
      </button>
    </div>
  );
}
