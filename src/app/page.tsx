import React from 'react';
import { Compass, CheckCircle2, ArrowRight, ShieldCheck, Mail, Phone, ExternalLink } from 'lucide-react';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import OfferCard from '@/components/OfferCard';
import BlogCard, { BlogArticle } from '@/components/BlogCard';
import { fetchCheapFlights } from '@/lib/travelpayouts';

// Mock Blog Articles
const MOCK_ARTICLES: BlogArticle[] = [
  {
    id: "1",
    title: "Como acumular 100 mil milhas em 3 meses sem gastar mais",
    excerpt: "Descubra as principais estratégias de acúmulo orgânico através de compras bonificadas e escolha certa dos cartões de crédito.",
    category: "Milhas",
    imageUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-10",
    slug: "como-acumular-milhas-rapido"
  },
  {
    id: "2",
    title: "10 destinos internacionais baratos para viajar ainda este ano",
    excerpt: "Fizemos o levantamento dos países onde o Real é valorizado e o custo de hospedagem e alimentação é extremamente atrativo para brasileiros.",
    category: "Destinos",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-08",
    slug: "destinos-internacionais-baratos"
  },
  {
    id: "3",
    title: "O que é e como aproveitar um Erro Tarifário de passagem aérea",
    excerpt: "Entenda a diferença entre promoção comum e bugs no sistema das companhias aéreas, e saiba quais são as regras de emissão.",
    category: "Economize",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop",
    date: "2026-07-05",
    slug: "erro-tarifario-guia-completo"
  }
];

export default async function Home() {
  const cheapFlights = await fetchCheapFlights();
  const alertOffers = cheapFlights.slice(0, 3); // Display top 3 alerts in central section

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFBFF]">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Stats Section */}
        <StatsSection />

        {/* 3. Como Funciona Section */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col gap-3">
              <span className="text-xs font-bold text-[#5BA4CF] uppercase tracking-wider">Metodologia Inteligente</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1628]">Como economizar em 3 passos</h2>
              <p className="text-sm md:text-base text-[#8896A9]">
                Nossa tecnologia monitora a variação de preços e avisa você no momento exato de reservar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {/* Step 1 */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 p-6 rounded-2xl bg-[#FAFBFF] border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-[#5BA4CF] font-bold text-lg">
                  01
                </div>
                <h3 className="text-lg font-bold text-[#0A1628]">Nós rastreamos</h3>
                <p className="text-sm text-[#8896A9] leading-relaxed">
                  Algoritmos monitoram tarifas de passagens 24h por dia, identificando quedas bruscas de preços e bugs do sistema.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 p-6 rounded-2xl bg-[#FAFBFF] border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-[#5BA4CF] font-bold text-lg">
                  02
                </div>
                <h3 className="text-lg font-bold text-[#0A1628]">Você recebe o alerta</h3>
                <p className="text-sm text-[#8896A9] leading-relaxed">
                  Disparamos alertas instantâneos no seu WhatsApp ou e-mail com o link de reserva direta, sem taxas ou intermediários.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 p-6 rounded-2xl bg-[#FAFBFF] border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-[#F0F4FF] flex items-center justify-center text-[#5BA4CF] font-bold text-lg">
                  03
                </div>
                <h3 className="text-lg font-bold text-[#0A1628]">Você viaja economizando</h3>
                <p className="text-sm text-[#8896A9] leading-relaxed">
                  Emitindo diretamente com a companhia aérea ou parceiro consolidado, você economiza até 60% em relação ao preço padrão.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Central de Alertas Section */}
        <section className="py-20 bg-[#F0F4FF]/50 border-t border-[#5BA4CF]/10">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-[#5BA4CF] uppercase tracking-wider">Alertas Recentes</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1628]">Central de Promoções Ativas</h2>
                <p className="text-sm md:text-base text-[#8896A9]">
                  Estas são as passagens aéreas e ofertas mais baratas encontradas nas últimas horas.
                </p>
              </div>
              <div>
                <Link
                  href="/ofertas"
                  className="pill-button pill-button-outline flex items-center gap-1.5 whitespace-nowrap text-sm"
                >
                  Ver todas as ofertas
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {alertOffers.map((offer) => (
                <OfferCard key={offer.id} offer={offer} />
              ))}
            </div>
          </div>
        </section>

        {/* 5. Club Section */}
        <section className="py-20 bg-white border-t border-[#5BA4CF]/10">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 flex flex-col gap-6">
                <span className="text-xs font-bold text-[#5BA4CF] uppercase tracking-wider">Acesso Exclusivo</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1628] leading-tight">
                  Destinos Incríveis Club: <br />
                  Seu passaporte para viajar mais
                </h2>
                <p className="text-sm md:text-base text-[#8896A9] leading-relaxed">
                  Faça parte do nosso grupo privado. Nossa equipe monitora 24 horas por dia, 7 dias por semana, enviando imediatamente no seu WhatsApp erros tarifários raros e descontos históricos de passagens.
                </p>

                <div className="flex flex-col gap-3.5">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={20} className="text-[#5BA4CF] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0A1628] text-sm block">4 Grupos Especializados</strong>
                      <span className="text-xs text-[#8896A9]">Nacionais, Internacionais, Executivas/Primeira Classe e Hotéis.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={20} className="text-[#5BA4CF] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0A1628] text-sm block">Alertas de Erro Tarifário Imediatos</strong>
                      <span className="text-xs text-[#8896A9]">Seja o primeiro a saber e emita antes que a companhia corrija o valor.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 size={20} className="text-[#5BA4CF] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0A1628] text-sm block">Suporte e Dúvidas com Especialistas</strong>
                      <span className="text-xs text-[#8896A9]">Canal direto com o fundador Juliano Amorin e consultores.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://pay.kiwify.com.br/HFIXsiL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-button pill-button-primary inline-flex items-center gap-2"
                  >
                    Entrar no Club por R$ 29,90/mês
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-6 relative">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                  <img
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop"
                    alt="Laptop showing flight details"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#0A1628]/30 backdrop-blur-[1px] flex items-center justify-center">
                    <div className="bg-white/95 text-[#0A1628] p-6 rounded-xl shadow-lg max-w-xs text-center border border-[#5BA4CF]/20">
                      <span className="text-2xl block mb-2">⭐</span>
                      <p className="text-xs font-semibold italic text-[#0A1628]">
                        &quot;Economizei R$ 4.200 em uma única viagem para a Itália com o alerta do Club! Vale cada centavo.&quot;
                      </p>
                      <span className="block text-[10px] font-bold text-[#8896A9] mt-2.5">— Mariana S., São Paulo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Consultoria VIP Section */}
        <section id="consultoria" className="py-20 bg-[#F0F4FF] border-t border-b border-[#5BA4CF]/10">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 flex flex-col gap-6">
                <span className="text-xs font-bold text-[#5BA4CF] uppercase tracking-wider">Atendimento Exclusivo</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1628] leading-tight">
                  Consultoria VIP <br />
                  Destinos Incríveis
                </h2>
                <p className="text-sm md:text-base text-[#8896A9] leading-relaxed">
                  Prefere que busquemos as passagens e hotéis ideais para você? Nossa consultoria cria roteiros sob medida, otimiza trechos complexos e encontra as melhores tarifas pagas em dinheiro ou milhas.
                </p>
                <div className="flex flex-col gap-4 text-sm text-[#0A1628]">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-[#5BA4CF]" />
                    <span>WhatsApp VIP: +55 (11) 99720-4445</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-[#5BA4CF]" />
                    <span>suporte@destinosincriveis.com.br</span>
                  </div>
                </div>
              </div>

              {/* Consultation Form */}
              <div className="lg:col-span-7 bg-white p-8 rounded-2xl shadow-xl border border-gray-150">
                <h3 className="text-xl font-bold text-[#0A1628] mb-6">Solicitar Roteiro Personalizado</h3>
                <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0A1628]">Nome Completo</label>
                    <input
                      type="text"
                      placeholder="Ex: Juliano Amorin"
                      className="bg-[#FAFBFF] border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#5BA4CF]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0A1628]">WhatsApp de Contato</label>
                    <input
                      type="tel"
                      placeholder="Ex: (11) 99720-4445"
                      className="bg-[#FAFBFF] border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#5BA4CF]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0A1628]">Origem</label>
                    <input
                      type="text"
                      placeholder="Ex: São Paulo (GRU)"
                      className="bg-[#FAFBFF] border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#5BA4CF]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[#0A1628]">Destino Desejado</label>
                    <input
                      type="text"
                      placeholder="Ex: Roma, Itália"
                      className="bg-[#FAFBFF] border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#5BA4CF]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-[#0A1628]">Mensagem / Observações</label>
                    <textarea
                      rows={3}
                      placeholder="Nos fale sobre a sua viagem dos sonhos e o período preferido..."
                      className="bg-[#FAFBFF] border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#5BA4CF] resize-none"
                    />
                  </div>
                  <div className="sm:col-span-2 pt-2">
                    <button
                      type="submit"
                      className="pill-button pill-button-primary w-full text-center"
                    >
                      Enviar Solicitação via WhatsApp
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Parceiros & Afiliados Section */}
        <section className="py-16 bg-white">
          <div className="container flex flex-col items-center gap-10">
            <div className="text-center max-w-xl flex flex-col gap-2">
              <span className="text-xs font-bold text-[#5BA4CF] uppercase tracking-wider">Nossos Parceiros</span>
              <h3 className="text-2xl font-bold text-[#0A1628]">Integrações e Consolidadores Oficiais</h3>
            </div>
            
            {/* Logos Grid */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
              <span className="text-sm font-semibold tracking-wider text-[#0A1628] px-4 py-2 border border-gray-200 rounded-lg">LATAM Airlines</span>
              <span className="text-sm font-semibold tracking-wider text-[#0A1628] px-4 py-2 border border-gray-200 rounded-lg">Azul Linhas Aéreas</span>
              <span className="text-sm font-semibold tracking-wider text-[#0A1628] px-4 py-2 border border-gray-200 rounded-lg">GOL</span>
              <span className="text-sm font-semibold tracking-wider text-[#0A1628] px-4 py-2 border border-gray-200 rounded-lg">TAP Portugal</span>
              <span className="text-sm font-semibold tracking-wider text-[#0A1628] px-4 py-2 border border-gray-200 rounded-lg">Travelpayouts</span>
            </div>

            <Link
              href="mailto:suporte@destinosincriveis.com.br?subject=Parceria%20Afiliados"
              className="pill-button pill-button-outline text-xs px-6 py-2.5"
            >
              Fazer Parceria Comercial
            </Link>
          </div>
        </section>

        {/* 8. Blog Preview Section */}
        <section className="py-20 bg-[#FAFBFF] border-t border-[#5BA4CF]/10">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-[#5BA4CF] uppercase tracking-wider">Blog & Dicas</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#0A1628]">Últimas novidades do blog</h2>
                <p className="text-sm md:text-base text-[#8896A9]">
                  Fique atualizado com as melhores estratégias e rotas selecionadas por nossos analistas.
                </p>
              </div>
              <div>
                <Link
                  href="/blog"
                  className="pill-button pill-button-outline flex items-center gap-1.5 whitespace-nowrap text-sm"
                >
                  Ver todos os artigos
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MOCK_ARTICLES.map((article) => (
                <BlogCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <ChatWidget />
      <Footer />
    </>
  );
}
