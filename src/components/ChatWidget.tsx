"use client";

import React, { useState } from 'react';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-white w-[360px] max-w-[calc(100vw-32px)] h-[500px] rounded-2xl shadow-2xl border border-[#5BA4CF]/20 flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-[#0A1628] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#5BA4CF] flex items-center justify-center text-[#0A1628] font-bold">
                  DI
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Suporte Inteligente</h4>
                  <span className="text-[10px] text-[#5BA4CF] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online agora
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#FAFBFF]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#5BA4CF] text-white rounded-tr-none'
                        : 'bg-white text-[#0A1628] border border-gray-150 rounded-tl-none shadow-sm'
                    }`}
                  >
                    <p className="leading-relaxed break-words">{msg.text}</p>
                    <span
                      className={`text-[9px] block text-right mt-1 ${
                        msg.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 py-2 bg-[#F0F4FF] flex gap-2 overflow-x-auto border-t border-gray-100 scrollbar-none">
              <button
                onClick={() => handleQuickOption('Como funciona o Club?')}
                className="whitespace-nowrap text-xs bg-white border border-[#5BA4CF]/20 text-[#0A1628] px-3 py-1.5 rounded-full hover:bg-[#5BA4CF]/10 transition-colors"
              >
                Clube de Viagens
              </button>
              <button
                onClick={() => handleQuickOption('Onde vejo passagens baratas?')}
                className="whitespace-nowrap text-xs bg-white border border-[#5BA4CF]/20 text-[#0A1628] px-3 py-1.5 rounded-full hover:bg-[#5BA4CF]/10 transition-colors"
              >
                Passagens Baratas
              </button>
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-gray-100 flex items-center gap-2 bg-white"
            >
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Escreva sua mensagem..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#5BA4CF] transition-colors"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full bg-[#0A1628] text-white flex items-center justify-center hover:bg-[#5BA4CF] transition-colors"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#5BA4CF] text-[#0A1628] shadow-lg hover:shadow-[#5BA4CF]/30 hover:scale-105 transition-all flex items-center justify-center border-2 border-white"
        aria-label="Abrir Chat"
      >
        <MessageCircle size={26} />
      </button>
    </div>
  );
}
