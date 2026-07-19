"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { Calendar, Phone, Mail, User, Compass, ArrowRight, Shield } from 'lucide-react';
import { fetchWithTimeout } from '@/lib/fetchWithTimeout';
import styles from './page.module.css';

export default function ConsultoriaPage() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [passageiros, setPassageiros] = useState('1');
  const [classe, setClasse] = useState('economica');
  const [orcamento, setOrcamento] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [mensagem, setMensagem] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMsg('');
    setStatusType('');

    try {
      const response = await fetchWithTimeout('https://destinosincriveis.vps-kinghost.net/api/consultoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          telefone: whatsapp,
          destino,
          orcamento,
          periodo,
          origem,
          passageiros,
          classe,
          mensagem
        }),
      });

      if (response.ok) {
        setStatusType('success');
        setStatusMsg('Solicitação registrada! Abrindo atendimento no WhatsApp...');
        
        // WhatsApp prefilled message
        const formattedMessage = encodeURIComponent(
          `📋 *NOVA SOLICITAÇÃO DE CONSULTORIA VIP!*\n\n` +
          `👤 *Nome:* ${nome}\n` +
          `📞 *Telefone:* ${whatsapp}\n` +
          `✈️ *Origem / Destino:* ${origem} → ${destino}\n` +
          `💰 *Orçamento:* ${orcamento}\n` +
          `📅 *Período:* ${periodo}\n` +
          `👥 *Passageiros:* ${passageiros}\n` +
          `💎 *Classe:* ${classe === 'economica' ? 'Econômica' : classe === 'executiva' ? 'Executiva' : 'Primeira Classe'}\n` +
          `✉️ *Mensagem/Roteiro:* ${mensagem}`
        );

        setTimeout(() => {
          window.open(`https://wa.me/5544991579205?text=${formattedMessage}`, '_blank');
        }, 1500);
      } else {
        setStatusType('error');
        setStatusMsg('Erro ao registrar solicitação. Tente enviar diretamente pelo WhatsApp.');
      }
    } catch (error) {
      console.error('Error submitting consultoria form:', error);
      setStatusType('error');
      setStatusMsg('Erro de rede. Tente enviar diretamente pelo WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Header */}
          <div className={styles.pageIntro}>
            <span className={styles.badge}>Atendimento Customizado</span>
            <h1 className={styles.title}>Consultoria VIP</h1>
            <p className={styles.description}>
              Economize tempo e viaje com o melhor roteiro. Planejamos sua rota, buscamos passagens com milhas ou dinheiro e indicamos hotéis selecionados.
            </p>
          </div>

          <div className={styles.consultingGrid}>
            {/* Info Column */}
            <div className={styles.consultingInfoColumn}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}>Por que a consultoria VIP?</h3>
                
                <div className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <Shield size={18} className={`${styles.infoIcon} ${styles.infoIconBlue}`} />
                    <p className={styles.infoText}>Roteiro otimizado para evitar conexões demoradas e escalas desnecessárias.</p>
                  </div>
                  <div className={styles.infoItem}>
                    <Compass size={18} className={`${styles.infoIcon} ${styles.infoIconYellow}`} />
                    <p className={styles.infoText}>Varredura manual de passagens pagas com milhas em todas as alianças aéreas mundiais.</p>
                  </div>
                  <div className={styles.infoItem}>
                    <Calendar size={18} className={`${styles.infoIcon} ${styles.infoIconBlue}`} />
                    <p className={styles.infoText}>Suporte durante a viagem caso ocorra alteração de voos ou cancelamentos.</p>
                  </div>
                </div>

                <div className={styles.infoFooter}>
                  <a
                    href="https://wa.me/5544991579205"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.infoFooterItem}
                  >
                    <Phone size={14} className={styles.infoFooterIcon} />
                    Atendimento pelo WhatsApp: +55 (44) 99157-9205
                  </a>
                  <span className={styles.infoFooterItem}>
                    <Mail size={14} className={styles.infoFooterIcon} />
                    Email: suporte@destinosincriveis.com.br
                  </span>
                </div>

                {/* Direct Action buttons for brand links */}
                <div className={styles.actionBtnList}>
                  <a
                    href="https://api.whatsapp.com/send?phone=5544991579205&text=Ola%20gostaria%20de%20realizar%20uma%20consultoria%20com%20voc%C3%AAs.%20podem%20me%20ajudar%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionBtn}
                  >
                    Agendar Consultoria
                  </a>
                  <a
                    href="https://api.whatsapp.com/send?phone=5544991579205&text=Ola%20gostaria%20de%20realizar%20uma%20consultoria%20com%20voc%C3%AAs.%20podem%20me%20ajudar%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.actionBtnSecondary}
                  >
                    Contratar Consultoria VIP
                  </a>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className={styles.formColumn}>
              <div className="bg-[#0a122c]/60 backdrop-blur-md border border-sky-500/20 rounded-2xl p-8 max-w-lg mx-auto shadow-2xl hover:shadow-sky-500/10 transition-all duration-300">
                <h3 className={styles.formTitle}>Solicitar Orçamento de Roteiro</h3>
                
                <form onSubmit={handleSubmit} className={styles.formGrid}>
                  <div className={styles.formField}>
                    <label className={styles.label}>Nome Completo</label>
                    <input
                      type="text"
                      required
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                      placeholder="Ex: Juliano Amorin"
                      className="w-full bg-slate-950/40 border border-sky-500/30 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.label}>WhatsApp de Contato</label>
                    <input
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={e => setWhatsapp(e.target.value)}
                      placeholder="Ex: (44) 99157-9205"
                      className="w-full bg-slate-950/40 border border-sky-500/30 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.label}>Cidade de Origem</label>
                    <input
                      type="text"
                      required
                      value={origem}
                      onChange={e => setOrigem(e.target.value)}
                      placeholder="Ex: São Paulo (GRU)"
                      className="w-full bg-slate-950/40 border border-sky-500/30 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.label}>Destino Desejado</label>
                    <input
                      type="text"
                      required
                      value={destino}
                      onChange={e => setDestino(e.target.value)}
                      placeholder="Ex: Roma ou Paris"
                      className="w-full bg-slate-950/40 border border-sky-500/30 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200"
                    />
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.label}>Quantidade de Passageiros</label>
                    <select
                      value={passageiros}
                      onChange={e => setPassageiros(e.target.value)}
                      className="w-full bg-slate-950/40 border border-sky-500/30 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200"
                    >
                      <option value="1">1 Passageiro</option>
                      <option value="2">2 Passageiros</option>
                      <option value="3">3 Passageiros</option>
                      <option value="4">4+ Passageiros</option>
                    </select>
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.label}>Classe Recomendada</label>
                    <select
                      value={classe}
                      onChange={e => setClasse(e.target.value)}
                      className="w-full bg-slate-950/40 border border-sky-500/30 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200"
                    >
                      <option value="economica">Classe Econômica</option>
                      <option value="executiva">Classe Executiva</option>
                      <option value="primeira">Primeira Classe</option>
                    </select>
                  </div>

                  {/* Added Budget Field */}
                  <div className={styles.formField}>
                    <label className={styles.label}>Orçamento Estimado (por pessoa)</label>
                    <input
                      type="text"
                      required
                      value={orcamento}
                      onChange={e => setOrcamento(e.target.value)}
                      placeholder="Ex: R$ 5.000 a R$ 10.000"
                      className="w-full bg-slate-950/40 border border-sky-500/30 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200"
                    />
                  </div>

                  {/* Added Period Field */}
                  <div className={styles.formField}>
                    <label className={styles.label}>Período Estimado da Viagem</label>
                    <input
                      type="text"
                      required
                      value={periodo}
                      onChange={e => setPeriodo(e.target.value)}
                      placeholder="Ex: Segunda quinzena de Outubro/2026"
                      className="w-full bg-slate-950/40 border border-sky-500/30 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200"
                    />
                  </div>

                  <div className={`${styles.formField} ${styles.span2}`}>
                    <label className={styles.label}>Mensagem / Observações</label>
                    <textarea
                      rows={4}
                      value={mensagem}
                      onChange={e => setMensagem(e.target.value)}
                      placeholder="Fale um pouco sobre o estilo da sua viagem (se prefere hotéis boutique, viagens românticas, aventura) e datas sugeridas..."
                      className="w-full bg-slate-950/40 border border-sky-500/30 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-200"
                    />
                  </div>

                  {/* Form Submission status msg */}
                  {statusMsg && (
                    <div 
                      className={styles.span2} 
                      style={{ 
                        padding: '12px', 
                        borderRadius: '8px', 
                        fontSize: '0.9rem', 
                        fontWeight: '600',
                        textAlign: 'center',
                        backgroundColor: statusType === 'success' ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', 
                        color: statusType === 'success' ? '#6ee7b7' : '#fca5a5',
                        border: `1px solid ${statusType === 'success' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`
                      }}
                    >
                      {statusMsg}
                    </div>
                  )}

                  <div className={`${styles.span2}`} style={{ paddingTop: '8px' }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-[#0a122c] font-bold p-4 rounded-lg shadow-lg hover:from-amber-500 hover:to-amber-600 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                      style={{ opacity: isSubmitting ? 0.7 : 1 }}
                    >
                      <span>{isSubmitting ? 'Registrando...' : 'Enviar Solicitação de Consultoria'}</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ChatWidget />
      <Footer />
    </>
  );
}
