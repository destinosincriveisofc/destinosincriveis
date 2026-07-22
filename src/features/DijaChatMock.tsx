"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, Brain, Bot, User, Sparkles, Sliders, Cpu, Activity, Info, ThumbsUp, ThumbsDown, Heart, EyeOff, Lock, ArrowRight, Check } from 'lucide-react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';

interface RecommendationLog {
  id: string;
  city_id: string;
  reason: string;
  factors_considered: string[];
  confidence_score: number;
  city?: {
    name: string;
    iata_code: string;
    description: string;
    image_urls: string[];
    metadata_json: any;
  };
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  rating: number;
  created_at: string;
  recommendations?: RecommendationLog[];
}

export default function DijaChat() {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [savingFavs, setSavingFavs] = useState<Record<string, boolean>>({});
  const [savedFavs, setSavedFavs] = useState<Record<string, boolean>>({});
  const [preferences, setPreferences] = useState<any>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // 1. Authenticate on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  // 1.1 Load preferences on auth
  useEffect(() => {
    if (!isAuthenticated || !token) return;
    fetchWithTimeout("https://destinosincriveis.vps-kinghost.net/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(data => {
        if (data && data.preferences) {
          setPreferences(data.preferences);
        }
      })
      .catch(err => console.error("Error loading user preferences for chat:", err));
  }, [isAuthenticated, token]);

  // 2. Load or Create Session
  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const loadSession = async () => {
      try {
        // Fetch sessions
        const res = await fetchWithTimeout("https://destinosincriveis.vps-kinghost.net/api/dija/chat/sessions", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const sessions = await res.json();
          if (sessions && sessions.length > 0) {
            setSessionId(sessions[0].id);
          } else {
            // Create new session
            const newRes = await fetchWithTimeout("https://destinosincriveis.vps-kinghost.net/api/dija/chat/sessions", {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}` 
              },
              body: JSON.stringify({ title: "Nova Viagem Planejada" })
            });
            if (newRes.ok) {
              const session = await newRes.json();
              setSessionId(session.id);
            }
          }
        }
      } catch (err) {
        console.error("Error loading chat session:", err);
      }
    };

    loadSession();
  }, [isAuthenticated, token]);

  // 3. Load Message History
  useEffect(() => {
    if (!sessionId || !token) return;

    const loadMessages = async () => {
      try {
        const res = await fetchWithTimeout(`https://destinosincriveis.vps-kinghost.net/api/dija/chat/sessions/${sessionId}/messages`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          const formatted = data.map((msg: any) => ({
            id: msg.id,
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.content,
            rating: msg.rating,
            created_at: msg.created_at,
            recommendations: msg.recommendations || []
          }));
          setMessages(formatted);
        }
      } catch (err) {
        console.error("Error fetching message history:", err);
      }
    };

    loadMessages();
  }, [sessionId, token]);

  // Scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // 4. Send message to backend
  const handleSendText = async (text: string) => {
    if (!text.trim() || !sessionId || !token) return;

    const userMsgId = Math.random().toString();
    const tempUserMsg: Message = {
      id: userMsgId,
      role: 'user',
      content: text,
      rating: 0,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, tempUserMsg]);
    setInputVal('');
    setIsTyping(true);

    try {
      const res = await fetchWithTimeout(`https://destinosincriveis.vps-kinghost.net/api/dija/chat/sessions/${sessionId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ content: text })
      });

      if (res.ok) {
        const data = await res.json();
        const assistantMsg: Message = {
          id: data.id,
          role: 'assistant',
          content: data.content,
          rating: data.rating,
          created_at: data.created_at,
          recommendations: data.recommendations || []
        };
        setMessages(prev => [...prev, assistantMsg]);
        
        // Log view events for the recommendations
        if (assistantMsg.recommendations) {
          for (const rec of assistantMsg.recommendations) {
            await recordEvent('view_destination', 'destination', rec.city_id);
          }
        }
      }
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsTyping(false);
    }
  };

  // 5. Submit Thumbs Up/Down message rating
  const handleMessageRating = async (msgId: string, ratingValue: number) => {
    if (!token) return;

    try {
      const res = await fetchWithTimeout(`https://destinosincriveis.vps-kinghost.net/api/dija/chat/messages/${msgId}/rating`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ rating: ratingValue })
      });

      if (res.ok) {
        setMessages(prev => prev.map(msg => 
          msg.id === msgId ? { ...msg, rating: ratingValue } : msg
        ));
      }
    } catch (err) {
      console.error("Error updating message rating:", err);
    }
  };

  // 6. Add to favorites
  const handleSaveFavorite = async (cityId: string) => {
    if (!token) return;
    setSavingFavs(prev => ({ ...prev, [cityId]: true }));

    try {
      const res = await fetchWithTimeout("https://destinosincriveis.vps-kinghost.net/api/users/me/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ item_type: 'destination', item_id: cityId })
      });

      if (res.ok) {
        setSavedFavs(prev => ({ ...prev, [cityId]: true }));
        await recordEvent('save_destination', 'destination', cityId);
      }
    } catch (err) {
      console.error("Error saving favorite:", err);
    } finally {
      setSavingFavs(prev => ({ ...prev, [cityId]: false }));
    }
  };

  // 7. Record behavioral event log
  const recordEvent = async (eventType: string, itemType: string, itemId: string) => {
    if (!token) return;
    try {
      await fetchWithTimeout("https://destinosincriveis.vps-kinghost.net/api/users/me/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ event_type: eventType, item_type: itemType, item_id: itemId })
      });
    } catch (err) {
      console.error("Error recording interaction event:", err);
    }
  };

  // 8. Discard recommendation click handler
  const handleDiscardRecommendation = async (msgId: string, cityId: string) => {
    await recordEvent('discard_recommendation', 'destination', cityId);
    // Locally filter out the card
    setMessages(prev => prev.map(msg => {
      if (msg.id === msgId && msg.recommendations) {
        return {
          ...msg,
          recommendations: msg.recommendations.filter(r => r.city_id !== cityId)
        };
      }
      return msg;
    }));
  };

  // Anonymized/Visitor state render
  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-4xl bg-card-bg/60 border border-white/10 backdrop-blur-lg rounded-3xl p-10 flex flex-col items-center justify-center text-center gap-6 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold animate-bounce">
          <Lock size={28} />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-black text-white uppercase tracking-wider">Acesso Restrito ao Copiloto DIJA AI</h2>
          <p className="text-sm text-gray-400 max-w-md">
            Conecte-se à sua conta do **CLUB DIJA** para falar com o motor cognitivo e planejar suas férias completas em segundos com aprendizado contextual.
          </p>
        </div>
        <button
          onClick={() => window.location.href = "/login"}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-gold to-yellow-600 text-primary-bg font-extrabold text-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-98 transition-all"
        >
          <span>Acessar Painel do Club Dija</span>
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl bg-card-bg/60 border border-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px]">
      
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-white/5 flex flex-col gap-2 bg-white/[0.01]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Brain size={18} className="text-brand-blue animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">Copiloto Inteligente DIJA AI</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-gray-400 font-semibold uppercase">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Ativo
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1">
              <Activity size={10} className="text-brand-blue" />
              Cognitivo v2.1
            </div>
          </div>
        </div>

        {preferences && preferences.traveler_styles && preferences.traveler_styles.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 text-[9px] text-brand-blue/90 font-bold uppercase tracking-wider mt-1">
            <span className="text-gray-400 font-semibold">Sintonizada com:</span>
            {preferences.traveler_styles.map((s: string) => {
              const style_map: Record<string, string> = {
                "adventure": "🧗 Aventura",
                "beach": "🏖️ Praia",
                "nature": "🌲 Natureza",
                "romantic": "🥂 Romance",
                "family": "👨‍👩‍👧 Família",
                "culture": "🏛️ Cultura",
                "culinary": "🍳 Gastronomia"
              };
              return (
                <span key={s} className="px-1.5 py-0.5 rounded bg-brand-blue/15 border border-brand-blue/30">
                  {style_map[s] || s}
                </span>
              );
            })}
            {preferences.average_budget_level && (
              <span className="px-1.5 py-0.5 rounded bg-brand-gold/15 border border-brand-gold/30 text-brand-gold">
                💰 {preferences.average_budget_level.toUpperCase()}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 scrollbar-none bg-white/[0.005]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[85%] ${
              msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start flex-col'
            }`}
          >
            <div className="flex gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white ${
                msg.role === 'user' ? 'bg-brand-gold/15 text-brand-gold' : 'bg-brand-blue/15 text-brand-blue'
              }`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-gold text-primary-bg font-bold rounded-tr-none'
                    : 'bg-white/5 text-gray-300 rounded-tl-none border border-white/5 whitespace-pre-line'
                }`}>
                  {msg.content}
                </div>

                {/* AI Rating buttons for assistant replies */}
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-3 px-1">
                    <button
                      onClick={() => handleMessageRating(msg.id, msg.rating === 1 ? 0 : 1)}
                      className={`text-gray-500 hover:text-green-400 transition-colors ${msg.rating === 1 ? 'text-green-500' : ''}`}
                      title="Gostei da sugestão"
                    >
                      <ThumbsUp size={12} />
                    </button>
                    <button
                      onClick={() => handleMessageRating(msg.id, msg.rating === -1 ? 0 : -1)}
                      className={`text-gray-500 hover:text-red-400 transition-colors ${msg.rating === -1 ? 'text-red-500' : ''}`}
                      title="Não gostei"
                    >
                      <ThumbsDown size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Recommendation Cards if assistant suggested cities */}
            {msg.role === 'assistant' && msg.recommendations && msg.recommendations.length > 0 && (
              <div className="ml-11 mt-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {msg.recommendations.map((rec) => {
                  const city = rec.city;
                  if (!city) return null;
                  const isSaved = savedFavs[rec.city_id];

                  return (
                    <div key={rec.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between gap-3 group hover:border-brand-blue/30 transition-all">
                      <div className="flex flex-col gap-2">
                        {/* City name & Code */}
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-xs font-black text-white uppercase">{city.name} ({city.iata_code})</h5>
                            <span className="text-[9px] uppercase font-semibold text-brand-blue/80">Confiança: {Math.round(rec.confidence_score * 100)}%</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-brand-blue/15 text-brand-blue font-bold">
                            Score: {Math.round(rec.confidence_score * 25)}
                          </span>
                        </div>
                        {/* Explicability Reason */}
                        <div className="p-2.5 rounded bg-white/[0.01] border border-white/5 text-[10px] text-gray-400 italic">
                          💡 {rec.reason}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                        <button
                          onClick={() => handleDiscardRecommendation(msg.id, rec.city_id)}
                          className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 text-gray-500 hover:text-red-400 text-[10px] font-bold flex items-center gap-1 transition-all"
                        >
                          <EyeOff size={10} />
                          Descartar
                        </button>
                        <button
                          onClick={() => handleSaveFavorite(rec.city_id)}
                          disabled={isSaved || savingFavs[rec.city_id]}
                          className={`px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all ${
                            isSaved 
                              ? 'bg-green-500/10 text-green-400' 
                              : 'bg-brand-blue/15 text-brand-blue hover:bg-brand-blue hover:text-primary-bg'
                          }`}
                        >
                          {isSaved ? <Check size={10} /> : <Heart size={10} />}
                          {isSaved ? 'Salvo' : 'Salvar'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 self-start max-w-[85%]">
            <div className="w-8 h-8 rounded-lg bg-brand-blue/15 flex items-center justify-center flex-shrink-0 text-brand-blue">
              <Bot size={14} />
            </div>
            <div className="p-4 rounded-2xl rounded-tl-none bg-white/5 border border-white/5 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-white/5 flex gap-2 bg-white/[0.01]">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendText(inputVal)}
          placeholder="Peça sugestões de viagem (ex: 'Quero ir para a Europa descansar em outubro')"
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-blue transition-colors"
        />
        <button
          onClick={() => handleSendText(inputVal)}
          className="p-3 rounded-xl bg-brand-blue text-primary-bg hover:opacity-90 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
