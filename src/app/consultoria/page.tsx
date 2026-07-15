"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { Calendar, Phone, Mail, User, Compass, ArrowRight, Shield } from 'lucide-react';

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

    window.open(`https://wa.me/5511997204445?text=${formattedMessage}`, '_blank');
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFBFF] pt-28 pb-20">
        <div className="container max-w-5xl">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-3">
            <span className="text-xs font-bold text-[#5BA4CF] uppercase tracking-wider">Atendimento Customizado</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-[#0A1628]">Consultoria VIP</h1>
            <p className="text-sm md:text-base text-[#8896A9]">
              Economize tempo e viaje com o melhor roteiro. Planejamos sua rota, buscamos passagens com milhas ou dinheiro e indicamos hotéis selecionados.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Info Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[#0A1628] text-white p-8 rounded-2xl flex flex-col gap-6 shadow-lg">
                <h3 className="text-lg font-bold text-[#5BA4CF]">Por que a consultoria VIP?</h3>
                
                <div className="flex flex-col gap-5 text-sm text-gray-300">
                  <div className="flex items-start gap-3">
                    <Shield size={18} className="text-[#5BA4CF] mt-0.5 flex-shrink-0" />
                    <p>Roteiro otimizado para evitar conexões demoradas e escalas desnecessárias.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Compass size={18} className="text-[#FFD43B] mt-0.5 flex-shrink-0" />
                    <p>Varredura manual de passagens pagas com milhas em todas as alianças aéreas mundiais.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="text-[#5BA4CF] mt-0.5 flex-shrink-0" />
                    <p>Suporte durante a viagem caso ocorra alteração de voos ou cancelamentos.</p>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 flex flex-col gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-2">
                    <Phone size={14} className="text-[#5BA4CF]" />
                    Atendimento pelo WhatsApp: +55 (11) 99720-4445
                  </span>
                  <span className="flex items-center gap-2">
                    <Mail size={14} className="text-[#5BA4CF]" />
                    Email: suporte@destinosincriveis.com.br
                  </span>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-8 rounded-2xl shadow-xl border border-gray-150">
              <h3 className="text-xl font-bold text-[#0A1628] mb-6">Solicitar Orçamento de Roteiro</h3>
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#0A1628]">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    placeholder="Ex: Juliano Amorin"
                    className="bg-[#FAFBFF] border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#5BA4CF]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#0A1628]">WhatsApp de Contato</label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={e => setWhatsapp(e.target.value)}
                    placeholder="Ex: (11) 99720-4445"
                    className="bg-[#FAFBFF] border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#5BA4CF]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#0A1628]">Cidade de Origem</label>
                  <input
                    type="text"
                    required
                    value={origem}
                    onChange={e => setOrigem(e.target.value)}
                    placeholder="Ex: São Paulo (GRU)"
                    className="bg-[#FAFBFF] border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#5BA4CF]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#0A1628]">Destino Desejado</label>
                  <input
                    type="text"
                    required
                    value={destino}
                    onChange={e => setDestino(e.target.value)}
                    placeholder="Ex: Roma ou Paris"
                    className="bg-[#FAFBFF] border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#5BA4CF]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#0A1628]">Quantidade de Passageiros</label>
                  <select
                    value={passageiros}
                    onChange={e => setPassageiros(e.target.value)}
                    className="bg-[#FAFBFF] border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#5BA4CF]"
                  >
                    <option value="1">1 Passageiro</option>
                    <option value="2">2 Passageiros</option>
                    <option value="3">3 Passageiros</option>
                    <option value="4">4+ Passageiros</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#0A1628]">Classe Recomendada</label>
                  <select
                    value={classe}
                    onChange={e => setClasse(e.target.value)}
                    className="bg-[#FAFBFF] border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#5BA4CF]"
                  >
                    <option value="economica">Classe Econômica</option>
                    <option value="executiva">Classe Executiva</option>
                    <option value="primeira">Primeira Classe</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#0A1628]">Mensagem / Observações</label>
                  <textarea
                    rows={4}
                    value={mensagem}
                    onChange={e => setMensagem(e.target.value)}
                    placeholder="Fale um pouco sobre o estilo da sua viagem (se prefere hotéis boutique, viagens românticas, aventura) e datas sugeridas..."
                    className="bg-[#FAFBFF] border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#5BA4CF] resize-none"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <button
                    type="submit"
                    className="pill-button pill-button-primary w-full text-center py-3.5 flex items-center justify-center gap-2"
                  >
                    <span>Falar com Consultor no WhatsApp</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <ChatWidget />
      <Footer />
    </>
  );
}
