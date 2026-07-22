"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Clock, Calendar, X, ArrowRight, Info, Heart } from 'lucide-react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ContentTip {
  id: string;
  titulo: string;
  descricao: string;
  url: string;
  tipo: string;
  categoria: string;
  criado_em: string;
}

export default function DicasPage() {
  const router = useRouter();
  const [tips, setTips] = React.useState<ContentTip[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [fetchError, setFetchError] = React.useState("");
  const [selectedTip, setSelectedTip] = React.useState<ContentTip | null>(null);

  const [likedTips, setLikedTips] = React.useState<Record<string, boolean>>({});
  const [likesCounts, setLikesCounts] = React.useState<Record<string, number>>({});

  const handleLike = async (e: React.MouseEvent, tipId: string) => {
    e.preventDefault();
    e.stopPropagation();

    const isCurrentlyLiked = likedTips[tipId] || false;
    const currentCount = likesCounts[tipId] || 0;

    setLikedTips(prev => ({ ...prev, [tipId]: !isCurrentlyLiked }));
    setLikesCounts(prev => ({ ...prev, [tipId]: isCurrentlyLiked ? currentCount - 1 : currentCount + 1 }));

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const baseUrl = typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
          ? 'http://localhost:8001'
          : 'https://destinosincriveis.vps-kinghost.net';

      const response = await fetchWithTimeout(`${baseUrl}/api/posts/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post_id: tipId })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setLikedTips(prev => ({ ...prev, [tipId]: data.liked }));
          setLikesCounts(prev => ({ ...prev, [tipId]: data.likes_count }));
        }
      }
    } catch (err) {
      console.error("Error liking tip:", err);
      setLikedTips(prev => ({ ...prev, [tipId]: isCurrentlyLiked }));
      setLikesCounts(prev => ({ ...prev, [tipId]: currentCount }));
    }
  };

  const fetchTips = async (token: string) => {
    setLoading(true);
    setFetchError("");
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      const response = await fetch("https://destinosincriveis.vps-kinghost.net/api/dashboard/contents", {
        signal: controller.signal,
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      clearTimeout(timeoutId);
      if (response.ok) {
        const data = await response.json();
        const tipsData = Array.isArray(data) ? data : [];
        setTips(tipsData);

        const counts: Record<string, number> = { ...likesCounts };
        tipsData.forEach(tip => {
          if (counts[tip.id] === undefined) {
            let hash = 0;
            for (let i = 0; i < tip.id.length; i++) {
              hash = tip.id.charCodeAt(i) + ((hash << 5) - hash);
            }
            counts[tip.id] = Math.abs(hash % 35) + 5;
          }
        });
        setLikesCounts(counts);
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      }
    } catch (err) {
      console.error("Error fetching tips:", err);
      if ((err as any)?.name === "AbortError") {
        setFetchError("O servidor demorou muito para responder. Tente novamente mais tarde.");
      } else {
        setFetchError("Nao foi possivel carregar as dicas agora. Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setTimeout(() => {
      fetchTips(token);
    }, 0);
  }, [router]);

  const getReadingTime = (text: string): string => {
    if (!text) return "1 min";
    const match = text.match(/tempo\s+de\s+leitura:\s*(\d+)\s*(?:minutos|min|m)/i);
    if (match) {
      return `${match[1]} min`;
    }
    const wordsCount = text.split(/\s+/).length;
    const time = Math.max(1, Math.ceil(wordsCount / 180));
    return `${time} min`;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  const renderMarkdown = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      let cleanLine = line.trim();

      if (cleanLine.startsWith("### ")) {
        return (
          <h4 key={idx} className="text-base font-extrabold text-[var(--brand-gold)] mt-5 mb-2.5">{parseInlineMarkup(cleanLine.substring(4))}</h4>
        );
      }
      if (cleanLine.startsWith("## ")) {
        return (
          <h3 key={idx} className="text-lg font-extrabold text-[var(--brand-gold)] mt-6 mb-3">{parseInlineMarkup(cleanLine.substring(3))}</h3>
        );
      }
      if (cleanLine.startsWith("# ")) {
        return (
          <h2 key={idx} className="text-xl font-black text-[var(--brand-gold)] mt-7 mb-3.5">{parseInlineMarkup(cleanLine.substring(2))}</h2>
        );
      }

      if (cleanLine.startsWith("- ") || cleanLine.startsWith("* ")) {
        return (
          <li key={idx} className="ml-5 mb-1.5 list-disc text-[var(--text-secondary)]">{parseInlineMarkup(cleanLine.substring(2))}</li>
        );
      }

      if (cleanLine.startsWith("> ")) {
        return (
          <blockquote key={idx} style={{
            borderLeft: '4px solid var(--brand-gold)',
            background: 'var(--brand-blue-light)',
            padding: '12px 16px',
            borderRadius: '0 8px 8px 0',
            margin: '12px 0',
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            fontStyle: 'italic'
          }}>
            {parseInlineMarkup(cleanLine.substring(2))}
          </blockquote>
        );
      }

      if (cleanLine.toLowerCase().includes("tempo de leitura") && cleanLine.length < 40) {
        return null;
      }

      if (cleanLine === "") {
        return <div key={idx} style={{ height: '12px' }} />;
      }

      return (
        <p key={idx} className="mb-4 text-[var(--text-secondary)]">{parseInlineMarkup(line)}</p>
      );
    });
  };

  const parseInlineMarkup = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className="text-[var(--text-primary)] font-bold">{part.slice(2, -2)}</strong>
        );
      }

      const linkParts = part.split(/(\[[^\]]+\]\([^)]+\))/g);
      return linkParts.map((lPart, j) => {
        const match = lPart.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          return (
            <a
              key={j}
              href={match[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--brand-blue)] underline font-semibold"
            >
              {match[1]}
            </a>
          );
        }
        return lPart;
      });
    });
  };

  const tipsGridRef = useScrollReveal<HTMLDivElement>();
  const headerSectionRef = useScrollReveal<HTMLDivElement>();

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <header className="mb-8 fade-in-up" ref={headerSectionRef}>
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">Dicas & Hacks</h1>
        <p className="text-base text-[var(--text-secondary)]">
          Aprenda a acumular milhas, obter upgrades de cabine e viajar gastando pouco.
        </p>
      </header>

      <div className="bg-[var(--brand-blue-light)] border border-[var(--brand-blue)]/20 rounded-[12px] p-4 mb-8 flex items-center gap-3 text-[var(--text-secondary)] text-sm">
        <Info size={20} className="text-[var(--brand-blue)] flex-shrink-0" />
        <div>
          <strong>Atualizacoes diarias:</strong> Nossos especialistas publicam dicas de viagem todos os dias aqui na Area de Membros. Aproveite!
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-[var(--text-muted)] gap-4">
          <div className="w-10 h-10 border-3 border-[var(--border-default)] border-t-[var(--brand-blue)] rounded-full animate-spin" />
          <p>Buscando as dicas exclusivas de hoje...</p>
        </div>
      ) : fetchError ? (
        <div className="text-center py-16 text-[var(--text-muted)]">
          <Info size={48} className="mx-auto mb-4" style={{ color: '#dc2626' }} />
          <p style={{ color: '#dc2626' }}>{fetchError}</p>
        </div>
      ) : tips.length === 0 ? (
        <div className="text-center py-16 text-[var(--text-muted)]">
          <BookOpen size={48} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
          <p>Nenhuma dica disponivel para hoje. Volte mais tarde!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 fade-in-up" ref={tipsGridRef}>
          {tips.map((tip) => {
            const hasValidImage = tip.url && (tip.url.startsWith('http://') || tip.url.startsWith('https://') || tip.url.startsWith('/'));
            const tipImgUrl = hasValidImage ? tip.url : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop";
            return (
              <article
                key={tip.id}
                className="rounded-[16px] overflow-hidden flex flex-col h-full cursor-pointer transition-all bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--brand-blue)]/30 hover:-translate-y-1.5 hover:shadow-md"
                onClick={() => router.push(`/blog/artigo?id=${tip.id}&vip=true`)}
              >
                <div className="relative w-full h-[180px] overflow-hidden bg-[var(--bg-surface)]">
                  <img
                    src={tipImgUrl}
                    alt={tip.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-[var(--brand-blue)] text-white px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    Dica
                  </span>
                  <span className="absolute top-3 right-3 bg-[var(--bg-surface)] text-[var(--brand-gold)] px-2.5 py-1 rounded-full text-xs font-semibold border border-[var(--brand-gold)]/20 flex items-center gap-1">
                    <Clock size={12} />
                    {getReadingTime(tip.descricao || (tip as any).conteudo || (tip as any).content || "")}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 leading-tight">{tip.titulo}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5 flex-1 line-clamp-3">
                    {(tip.descricao || (tip as any).conteudo || (tip as any).content || "").replace(/[#*`>_\-]/g, '').substring(0, 140)}...
                  </p>
                  <div className="border-t border-[var(--border-subtle)] pt-4 flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                      <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(tip.criado_em)}
                      </span>
                      <button
                        onClick={(e) => handleLike(e, tip.id)}
                        className={`inline-flex items-center gap-1 text-xs font-semibold bg-transparent border-none cursor-pointer px-2 py-1 rounded-[6px] transition-colors ${
                          likedTips[tip.id] ? 'text-red-500' : 'text-[var(--text-muted)] hover:text-red-400 hover:bg-red-50'
                        }`}
                        title="Curtir dica"
                      >
                        <Heart size={12} fill={likedTips[tip.id] ? "currentColor" : "none"} />
                        <span>{likesCounts[tip.id] || 0}</span>
                      </button>
                    </div>
                    <span className="text-xs font-bold text-[var(--brand-blue)] flex items-center gap-1.5">
                      Ler Dica <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {selectedTip && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-5" onClick={() => setSelectedTip(null)}>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-default)] rounded-[20px] w-full max-w-[800px] max-h-[90vh] flex flex-col overflow-hidden shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-[250px] flex-shrink-0">
              {(() => {
                const hasValidModalImg = selectedTip.url && (selectedTip.url.startsWith('http://') || selectedTip.url.startsWith('https://') || selectedTip.url.startsWith('/'));
                const modalImgUrl = hasValidModalImg ? selectedTip.url : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop";
                return (
                  <img
                    src={modalImgUrl}
                    alt={selectedTip.titulo}
                    className="w-full h-full object-cover"
                  />
                );
              })()}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-secondary)]/80" />
              <button className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[var(--border-default)] text-[var(--text-primary)] flex items-center justify-center cursor-pointer transition-all hover:bg-[var(--brand-blue)] hover:text-white z-10" onClick={() => setSelectedTip(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto flex-1">
              <div className="flex items-center gap-4 text-[var(--text-muted)] text-sm mb-7 border-b border-[var(--border-subtle)] pb-4">
                <span className="flex items-center gap-1 text-[var(--brand-blue)] font-bold">
                  DICA EXCLUSIVA
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {getReadingTime(selectedTip.descricao)}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {formatDate(selectedTip.criado_em)}
                </span>
              </div>
              <h2 className="text-2xl font-black text-[var(--text-primary)] mb-4 leading-tight">{selectedTip.titulo}</h2>
              <div className="text-[var(--text-secondary)] text-base leading-relaxed">
                {renderMarkdown(selectedTip.descricao)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
