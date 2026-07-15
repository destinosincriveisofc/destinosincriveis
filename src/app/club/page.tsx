import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { Check, Star, ArrowRight, ShieldCheck, Flame, Bell, MessageSquare, CreditCard } from 'lucide-react';

export default function ClubPage() {
  const benefits = [
    {
      icon: <Bell className="text-[#5BA4CF]" size={24} />,
      title: "Alertas Imediatos via WhatsApp",
      description: "Nossa inteligência tarifária dispara alertas na hora que a promoção ou erro de preço acontece. Sem delays."
    },
    {
      icon: <Flame className="text-[#FFD43B]" size={24} />,
      title: "Monitoramento de Erro de Tarifa",
      description: "Quando o sistema das companhias falha e vende passagens com até 90% de desconto. Avisamos de madrugada ou final de semana."
    },
    {
      icon: <ShieldCheck className="text-[#5BA4CF]" size={24} />,
      title: "Emissão Direta sem Taxas",
      description: "Você não paga comissões ou taxas. Enviamos o link direto para o site oficial da companhia aérea parceira."
    },
    {
      icon: <MessageSquare className="text-[#FFD43B]" size={24} />,
      title: "Comunidade Exclusiva",
      description: "Tire dúvidas sobre roteiros, milhas ou emissões direto com Juliano Amorin e nossa equipe de moderadores."
    }
  ];

  const plans = [
    {
      name: "Assinatura Mensal",
      price: "R$ 29,90",
      period: "por mês",
      description: "Ideal para testar e planejar sua próxima viagem.",
      link: "https://pay.kiwify.com.br/HFIXsiL",
      popular: true,
      features: [
        "Acesso aos 4 grupos exclusivos (WhatsApp)",
        "Alertas de Erros Tarifários nacionais e internacionais",
        "Suporte direto da equipe Destinos Incríveis",
        "Cancelamento fácil a qualquer momento",
        "Sem taxas ou letras miúdas de intermediários"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Mariana Silva",
      role: "Viajou para Roma",
      text: "Fiquei impressionada! Consegui ida e volta para Roma por R$ 3.850 graças ao alerta no WhatsApp. A assinatura se pagou no primeiro dia.",
      rating: 5,
      avatar: "MS"
    },
    {
      name: "Daniel Krug",
      role: "Viajou para Miami",
      text: "Eu achava que erro de passagem era mito. Comprei executiva para Miami por preço de econômica. Recomendo de olhos fechados.",
      rating: 5,
      avatar: "DK"
    },
    {
      name: "Beatriz Oliveira",
      role: "Viajou para Salvador",
      text: "Minhas viagens em família aumentaram muito. Só compramos com base nas notificações do grupo nacional. Excelente!",
      rating: 5,
      avatar: "BO"
    }
  ];

  const faqs = [
    {
      q: "Como recebo as promoções?",
      a: "Tudo é enviado diretamente em grupos fechados no WhatsApp. Você entra nos grupos após a confirmação da assinatura e apenas os administradores enviam mensagens (sem spam)."
    },
    {
      q: "Preciso pagar alguma taxa ao emitir?",
      a: "Nenhum centavo. Nós apenas encontramos as oportunidades e compartilhamos o link oficial de reserva direta. A compra é feita direto no site da companhia aérea ou consolidador."
    },
    {
      q: "O cancelamento é fácil?",
      a: "Sim, absolutamente. Você pode cancelar sua assinatura mensal quando desejar diretamente pelo painel da Kiwify ou solicitando ao nosso suporte, sem carência ou multas."
    },
    {
      q: "Funciona mesmo para datas específicas?",
      a: "Nosso sistema busca as maiores variações tarifárias gerais. Sempre enviamos um resumo de datas disponíveis para cada preço promocional encontrado para você escolher."
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFBFF] pt-28 pb-20">
        {/* Hero Section */}
        <section className="py-16 text-center max-w-4xl mx-auto px-6 flex flex-col gap-6">
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#F0F4FF] text-[#2D7DB8]">
            ✨ Comunidade Exclusiva
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0A1628] leading-[1.1] tracking-tight">
            Viaje com quem entende de <span className="text-[#5BA4CF]">Passagem Barata</span>
          </h1>
          <p className="text-base md:text-lg text-[#8896A9] max-w-2xl mx-auto leading-relaxed">
            Economize milhares de reais em passagens aéreas e hotéis. Junte-se a mais de 15.000 viajantes que recebem alertas de tarifas imperdíveis e erros no WhatsApp.
          </p>
          <div className="flex justify-center mt-2">
            <a
              href="#pricing"
              className="pill-button pill-button-primary flex items-center gap-2"
            >
              Quero Garantir Minha Vaga
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 bg-white border-y border-[#5BA4CF]/10">
          <div className="container">
            <div className="text-center max-w-xl mx-auto mb-12 flex flex-col gap-2">
              <span className="text-xs font-bold text-[#5BA4CF] uppercase tracking-wider">Benefícios Inclusos</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1628]">Tudo o que você vai receber</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="flex flex-col gap-3 p-6 rounded-2xl bg-[#FAFBFF] border border-gray-150">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                    {b.icon}
                  </div>
                  <h3 className="text-base font-bold text-[#0A1628] mt-2">{b.title}</h3>
                  <p className="text-xs text-[#8896A9] leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section id="pricing" className="py-20">
          <div className="container flex flex-col items-center">
            <div className="text-center max-w-xl mx-auto mb-12 flex flex-col gap-2">
              <span className="text-xs font-bold text-[#5BA4CF] uppercase tracking-wider">Acesso Imediato</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1628]">Escolha o melhor plano para você</h2>
              <p className="text-sm text-[#8896A9]">Sem fidelidade, cancele quando quiser com um clique.</p>
            </div>

            {plans.map((plan, index) => (
              <div
                key={index}
                className="bg-white w-full max-w-md rounded-2xl shadow-xl border-2 border-[#5BA4CF]/30 overflow-hidden flex flex-col p-8 relative"
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4 bg-[#FFD43B] text-[#0A1628] text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                    Mais Assinado
                  </div>
                )}
                
                <span className="text-lg font-bold text-[#0A1628]">{plan.name}</span>
                <p className="text-xs text-[#8896A9] mt-1">{plan.description}</p>

                <div className="my-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-[#0A1628]">{plan.price}</span>
                  <span className="text-xs text-[#8896A9] font-medium">{plan.period}</span>
                </div>

                <a
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button pill-button-primary w-full text-center py-3.5 flex items-center justify-center gap-2 mb-6"
                >
                  <CreditCard size={18} />
                  Assinar Agora via Kiwify
                </a>

                <div className="flex flex-col gap-3">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-[#0A1628]">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white border-t border-[#5BA4CF]/10">
          <div className="container">
            <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-2">
              <span className="text-xs font-bold text-[#5BA4CF] uppercase tracking-wider">Depoimentos reais</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1628]">Quem assina, viaja e recomenda</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="card p-8 flex flex-col gap-4">
                  <div className="flex text-[#FFD43B]">
                    {[...Array(t.rating)].map((_, r) => (
                      <Star key={r} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm text-[#8896A9] leading-relaxed italic">
                    &quot;{t.text}&quot;
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-10 h-10 rounded-full bg-[#F0F4FF] flex items-center justify-center font-bold text-[#0A1628] text-sm">
                      {t.avatar}
                    </div>
                    <div>
                      <strong className="text-sm text-[#0A1628] block">{t.name}</strong>
                      <span className="text-[10px] text-[#8896A9] font-medium">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20">
          <div className="container max-w-3xl">
            <div className="text-center max-w-xl mx-auto mb-16 flex flex-col gap-2">
              <span className="text-xs font-bold text-[#5BA4CF] uppercase tracking-wider">Perguntas Frequentes</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A1628]">Dúvidas sobre o Club</h2>
            </div>

            <div className="flex flex-col gap-6">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col gap-2">
                  <h3 className="text-sm md:text-base font-bold text-[#0A1628]">{faq.q}</h3>
                  <p className="text-xs md:text-sm text-[#8896A9] leading-relaxed">{faq.a}</p>
                </div>
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
