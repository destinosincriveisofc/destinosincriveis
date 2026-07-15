"use client";

import React, { useState } from 'react';
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
      text: 'Olá! Sou o assistente virtual da Destinos Incríveis. Como posso ajudar você hoje?',
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      let botResponseText = 'Entendi! Para falar com um especialista em passagens ou suporte personalizado, clique no botão de WhatsApp abaixo.';
      
      const query = inputValue.toLowerCase();
      if (query.includes('clube') || query.includes('club') || query.includes('assinar')) {
        botResponseText = 'O Destinos Incríveis Club é o nosso clube exclusivo com monitoramento de passagens 24h. Você pode assinar através do link: https://pay.kiwify.com.br/HFIXsiL';
      } else if (query.includes('oferta') || query.includes('passagem') || query.includes('voo')) {
        botResponseText = 'Temos uma central cheia de promoções atualizadas na página /ofertas. Dê uma olhada!';
      } else if (query.includes('consultoria') || query.includes('roteiro')) {
        botResponseText = 'Nossa Consultoria VIP cria roteiros personalizados e busca as melhores passagens com milhas para você. Acesse a página /consultoria e solicite agendamento.';
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleQuickOption = (option: string) => {
    setInputValue(option);
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
                  DI
                </div>
                <div className={styles.headerMeta}>
                  <h4 className={styles.headerTitle}>Suporte Inteligente</h4>
                  <span className={styles.status}>
                    <span className={styles.statusDot} />
                    Online agora
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
                    <p>{msg.text}</p>
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
            </div>

            {/* Quick Suggestions */}
            <div className={styles.suggestions}>
              <button
                onClick={() => handleQuickOption('Como funciona o Club?')}
                className={styles.suggestionBtn}
              >
                Clube de Viagens
              </button>
              <button
                onClick={() => handleQuickOption('Onde vejo passagens baratas?')}
                className={styles.suggestionBtn}
              >
                Passagens Baratas
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
              />
              <button type="submit" className={styles.sendBtn} aria-label="Enviar">
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
