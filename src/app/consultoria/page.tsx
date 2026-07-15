"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { Calendar, Phone, Mail, User, Compass, ArrowRight, Shield } from 'lucide-react';
import styles from './page.module.css';

export default function ConsultoriaPage() {
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [passageiros, setPassageiros] = useState('1');
  const [classe, setClasse] = useState('economica');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = encodeURIComponent(
      `Olá! Gostaria de agendar uma consultoria VIP de viagens. Seguem os dados:\n\n` +
      `*Nome:* ${nome}\n` +
      `*WhatsApp:* ${whatsapp}\n` +
      `*Origem:* ${origem}\n` +
      `*Destino:* ${destino}\n` +
      `*Quantidade de Passageiros:* ${passageiros}\n` +
      `*Classe Desejada:* ${classe === 'economica' ? 'Econômica' : classe === 'executiva' ? 'Executiva' : 'Primeira Classe'}\n` +
      `*Observações/Roteiro:* ${mensagem}`
    );

    window.open(`https://wa.me/5544991579205?text=${formattedMessage}`, '_blank');
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
              <div className={styles.formCard}>
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
                      className={styles.input}
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
                      className={styles.input}
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
                      className={styles.input}
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
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formField}>
                    <label className={styles.label}>Quantidade de Passageiros</label>
                    <select
                      value={passageiros}
                      onChange={e => setPassageiros(e.target.value)}
                      className={styles.select}
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
                      className={styles.select}
                    >
                      <option value="economica">Classe Econômica</option>
                      <option value="executiva">Classe Executiva</option>
                      <option value="primeira">Primeira Classe</option>
                    </select>
                  </div>

                  <div className={`${styles.formField} ${styles.span2}`}>
                    <label className={styles.label}>Mensagem / Observações</label>
                    <textarea
                      rows={4}
                      value={mensagem}
                      onChange={e => setMensagem(e.target.value)}
                      placeholder="Fale um pouco sobre o estilo da sua viagem (se prefere hotéis boutique, viagens românticas, aventura) e datas sugeridas..."
                      className={styles.textarea}
                    />
                  </div>

                  <div className={`${styles.span2} pt-2`}>
                    <button
                      type="submit"
                      className={styles.submitBtn}
                    >
                      <span>Falar com Consultor no WhatsApp</span>
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
