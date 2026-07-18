"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Clock, Calendar, X, ArrowRight, Sparkles, Info } from 'lucide-react';
import styles from './page.module.css';

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
  const [selectedTip, setSelectedTip] = React.useState<ContentTip | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchTips(token);
  }, [router]);

  const fetchTips = async (token: string) => {
    setLoading(true);
    try {
      const response = await fetch("https://destinosincriveis.vps-kinghost.net/api/dashboard/contents", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setTips(Array.isArray(data) ? data : []);
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
      }
    } catch (err) {
      console.error("Error fetching tips:", err);
    } finally {
      setLoading(false);
    }
  };

  // Estimate reading time in minutes based on words
  const getReadingTime = (text: string): string => {
    if (!text) return "1 min";
    // Check if the text itself says reading time (common in agent templates)
    const match = text.match(/tempo\s+de\s+leitura:\s*(\d+)\s*(?:minutos|min|m)/i);
    if (match) {
      return `${match[1]} min`;
    }
    const wordsCount = text.split(/\s+/).length;
    const time = Math.max(1, Math.ceil(wordsCount / 180)); // 180 words per minute
    return `${time} min`;
  };

  // Formats date ISO string nicely
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // Safe inline Markdown to JSX renderer
  const renderMarkdown = (text: string) => {
    if (!text) return null;
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      let cleanLine = line.trim();

      // H3
      if (cleanLine.startsWith("### ")) {
        return (
          <h4 key={idx} className={styles.markdownH3}>
            {parseInlineMarkup(cleanLine.substring(4))}
          </h4>
        );
      }
      // H2
      if (cleanLine.startsWith("## ")) {
        return (
          <h3 key={idx} className={styles.markdownH2}>
            {parseInlineMarkup(cleanLine.substring(3))}
          </h3>
        );
      }
      // H1
      if (cleanLine.startsWith("# ")) {
        return (
          <h2 key={idx} className={styles.markdownH1}>
            {parseInlineMarkup(cleanLine.substring(2))}
          </h2>
        );
      }

      // Unordered list items
      if (cleanLine.startsWith("- ") || cleanLine.startsWith("* ")) {
        return (
          <li key={idx} className={styles.markdownLi}>
            {parseInlineMarkup(cleanLine.substring(2))}
          </li>
        );
      }

      // Blockquotes or tips highlights
      if (cleanLine.startsWith("> ")) {
        return (
          <blockquote key={idx} style={{
            borderLeft: '4px solid #FFC107',
            background: 'rgba(255, 193, 7, 0.05)',
            padding: '12px 16px',
            borderRadius: '0 8px 8px 0',
            margin: '12px 0',
            color: '#e2e8f0',
            fontSize: '0.95rem',
            fontStyle: 'italic'
          }}>
            {parseInlineMarkup(cleanLine.substring(2))}
          </blockquote>
        );
      }

      // Skip lines that just state the reading time in the body to avoid duplication
      if (cleanLine.toLowerCase().includes("tempo de leitura") && cleanLine.length < 40) {
        return null;
      }

      if (cleanLine === "") {
        return <div key={idx} style={{ height: '12px' }} />;
      }

      // Normal paragraph
      return (
        <p key={idx} className={styles.markdownP}>
          {parseInlineMarkup(line)}
        </p>
      );
    });
  };

  const parseInlineMarkup = (text: string) => {
    // Bold matching: **text**
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={i} className={styles.markdownStrong}>
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Link matching: [text](url)
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
              style={{ color: '#FFC107', textDecoration: 'underline', fontWeight: '600' }}
            >
              {match[1]}
            </a>
          );
        }
        return lPart;
      });
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Dicas & Hacks VIP 💎</h1>
        <p className={styles.pageSubtitle}>
          Aprenda a acumular milhas, obter upgrades de cabine e viajar como um milionário gastando pouco.
        </p>
      </header>

      <div className={styles.infoAlert}>
        <Info className={styles.infoAlertIcon} size={20} />
        <div>
          <strong>Atualizações diárias:</strong> Nossos robôs e especialistas publicam 4 hacks de viagem inéditos todos os dias aqui na Área de Membros. Aproveite para aplicar antes que expirem!
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.spinner} />
          <p>Buscando os hacks exclusivos de hoje...</p>
        </div>
      ) : tips.length === 0 ? (
        <div className={styles.emptyState}>
          <BookOpen size={48} style={{ color: '#64748b', marginBottom: '16px' }} />
          <p>Nenhuma dica VIP disponível para hoje. Volte mais tarde!</p>
        </div>
      ) : (
        <div className={styles.tipsGrid}>
          {tips.map((tip) => {
            const hasValidImage = tip.url && (tip.url.startsWith('http://') || tip.url.startsWith('https://') || tip.url.startsWith('/'));
            const tipImgUrl = hasValidImage ? tip.url : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop";
            return (
              <article 
                key={tip.id} 
                className={styles.tipCard}
                onClick={() => setSelectedTip(tip)}
              >
                <div className={styles.imageWrapper}>
                  <img 
                    src={tipImgUrl} 
                    alt={tip.titulo} 
                    className={styles.cardImage} 
                  />
                  <span className={styles.badge}>HACK VIP</span>
                <span className={styles.readTime}>
                  <Clock size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                  {getReadingTime(tip.descricao)}
                </span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{tip.titulo}</h3>
                <p className={styles.cardTextPreview}>
                  {tip.descricao.replace(/[#*`>_\-]/g, '').substring(0, 140)}...
                </p>
                <div className={styles.cardFooter}>
                  <span className={styles.dateText}>
                    <Calendar size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                    {formatDate(tip.criado_em)}
                  </span>
                  <span className={styles.readMoreLink}>
                    Ler Hack <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          );
          })}
        </div>
      )}

      {/* Distraction-free Reading Modal */}
      {selectedTip && (
        <div className={styles.modalOverlay} onClick={() => setSelectedTip(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              {(() => {
                const hasValidModalImg = selectedTip.url && (selectedTip.url.startsWith('http://') || selectedTip.url.startsWith('https://') || selectedTip.url.startsWith('/'));
                const modalImgUrl = hasValidModalImg ? selectedTip.url : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop";
                return (
                  <img 
                    src={modalImgUrl} 
                    alt={selectedTip.titulo} 
                    className={styles.modalHeaderImage} 
                  />
                );
              })()}
              <div className={styles.modalHeaderOverlay} />
              <button className={styles.closeButton} onClick={() => setSelectedTip(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.modalMeta}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FFC107', fontWeight: 'bold' }}>
                  <Sparkles size={14} /> HACK EXCLUSIVO
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} /> {getReadingTime(selectedTip.descricao)}
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} /> {formatDate(selectedTip.criado_em)}
                </span>
              </div>
              <h2 className={styles.modalTitle}>{selectedTip.titulo}</h2>
              <div className={styles.modalContentHtml}>
                {renderMarkdown(selectedTip.descricao)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
