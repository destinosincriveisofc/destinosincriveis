// DADOS DO SIMULADOR DE ALERTAS
const alertData = {
  promo: {
    title: "DI Alertas de Tarifa",
    text: "🚨 ALERTA RELÂMPAGO!\n\nPassagem aérea para Madri (ida e volta) saindo de São Paulo por apenas R$ 1.890 com taxas inclusas! ✈️🇪🇸\n\nCorre que restam poucas vagas!",
    savings: "Economia estimada: R$ 2.400",
    status: "active"
  },
  erro: {
    title: "DI Alertas de Tarifa",
    text: "🔥 ERRO DE TARIFA DETECTADO!\n\nClasse Executiva para Miami por R$ 2.100 ida e volta pela American Airlines! Tarifa incorreta emitida agora há pouco, reserve imediatamente! 🇺🇸✈️",
    savings: "Economia estimada: R$ 8.500",
    status: "active"
  },
  pacote: {
    title: "DI Alertas de Tarifa",
    text: "🌍 PACOTE DO CLUBE\n\n7 dias em Buenos Aires: Voo Direto + Hotel 4 estrelas em Palermo + Transfer por R$ 1.550 por pessoa! 🇦🇷🏨",
    savings: "Economia de 45% comparado a sites de viagem",
    status: "active"
  },
  dica: {
    title: "DI Alertas de Tarifa",
    text: "💡 DICA DE OURO\n\nComo emitir trechos nacionais por 5.000 milhas usando a tabela fixa do parceiro internacional. Passo a passo detalhado no grupo de dicas! 🚀",
    savings: "Economia de até 70% em passagens de última hora",
    status: "active"
  }
};

// DADOS DINÂMICOS DO SITE (PREPARAÇÃO PARA AUTOMACÕES)
const activeOffers = [
  {
    destino: "Maldivas",
    desconto: 45,
    preco_antigo: "9.500",
    preco_novo: "5.225",
    imagem_url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80",
    data_alerta: "Hoje",
    provedor: "Qatar Airways",
    rota: "Voo + Resort All-Inclusive",
    categoria: "destaque"
  },
  {
    destino: "Paris, França",
    desconto: 38,
    preco_antigo: "4.800",
    preco_novo: "2.970",
    imagem_url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    data_alerta: "Hoje",
    provedor: "Air France",
    rota: "Ida e Volta - Taxas Inclusas",
    categoria: "passagens"
  },
  {
    destino: "Roma, Itália",
    desconto: 35,
    preco_antigo: "5.100",
    preco_novo: "3.315",
    imagem_url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
    data_alerta: "Ontem",
    provedor: "ITA Airways",
    rota: "Ida e Volta saindo de SP",
    categoria: "passagens"
  },
  {
    destino: "Fernando de Noronha, PE",
    desconto: 30,
    preco_antigo: "3.200",
    preco_novo: "2.240",
    imagem_url: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=600&q=80",
    data_alerta: "Hoje",
    provedor: "Azul Linhas Aéreas",
    rota: "Voo + Pousada com Café",
    categoria: "destaque"
  }
];

const blogPosts = [
  {
    titulo: "6 estratégias reais para economizar em viagens",
    categoria: "economia",
    descricao_curta: "Esqueça as dicas óbvias. Conheça as estratégias que realmente fazem você economizar de verdade nas passagens e hospedagens.",
    imagem_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    data: "15 Jul 2026",
    autor: "Juliano Amorin"
  },
  {
    titulo: "Como arrumar sua mala de cabine para viagens longas",
    categoria: "dicas",
    descricao_curta: "Aprenda a viajar leve e organizar uma mala compacta para até 15 dias sem pagar taxas de despacho.",
    imagem_url: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=600&q=80",
    data: "14 Jul 2026",
    autor: "Juliano Amorin"
  },
  {
    titulo: "Passagens baratas: o segredo dos voos multidestinos",
    categoria: "passagens",
    descricao_curta: "Veja como funciona o stopover e visite dois ou mais destinos internacionais pelo preço de apenas um bilhete.",
    imagem_url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
    data: "12 Jul 2026",
    autor: "Juliano Amorin"
  }
];

// ATUALIZA CATEGORIA SELECIONADA NO SIMULADOR
function selectAlert(type) {
  // Desativar botões anteriores
  document.querySelectorAll('.sim-btn').forEach(btn => btn.classList.remove('active'));
  // Ativar botão clicado
  const activeBtn = document.getElementById('btn-' + type);
  if (activeBtn) activeBtn.classList.add('active');

  const chatMessages = document.getElementById('chatMessages');
  if (chatMessages && alertData[type]) {
    // Limpar e animar mensagem de WhatsApp no mockup
    chatMessages.innerHTML = `
      <div class="chat-bubble club-alert">
        <strong>${alertData[type].title}</strong>
        <p>${alertData[type].text}</p>
        <span class="badge-savings">${alertData[type].savings}</span>
        <a href="#clube" class="link-mock">Ver detalhes da oferta →</a>
      </div>
    `;
  }

  // Atualizar a cor/status do monitor
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  if (statusDot && statusText) {
    if (alertData[type].status === "active") {
      statusDot.style.background = "#22c55e";
      statusDot.style.boxShadow = "0 0 10px #22c55e";
      statusText.textContent = "Monitoramento Ativo";
    } else {
      statusDot.style.background = "#ef4444";
      statusDot.style.boxShadow = "0 0 10px #ef4444";
      statusText.textContent = "Buscando Ofertas...";
    }
  }
}

// FUNÇÕES DE RENDERIZAÇÃO DINÂMICA
function renderOffersDynamic() {
  const offersContainer = document.getElementById('offers-list');
  if (!offersContainer) return;

  const CATEGORY_LABELS = {
    destaque: { title: "🔥 Ofertas em Destaque", sub: "Atualizado hoje" },
    passagens: { title: "✈️ Passagens Aéreas", sub: "Preços de ida e volta" },
    hoteis: { title: "🏨 Hotéis & Resorts", sub: "Hospedagens selecionadas" },
    pacotes: { title: "🎒 Pacotes Completos", sub: "Voo + Hotel inclusos" }
  };

  const grouped = {};
  activeOffers.forEach(offer => {
    const cat = offer.categoria || 'destaque';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(offer);
  });

  let html = '';
  Object.keys(CATEGORY_LABELS).forEach(cat => {
    if (grouped[cat] && grouped[cat].length) {
      const label = CATEGORY_LABELS[cat];
      html += `
        <div class="row-block">
          <div class="row-head">
            <h3>${label.title}</h3>
            <span>${label.sub}</span>
          </div>
          <div class="row-scroll">
      `;
      
      grouped[cat].forEach(offer => {
        html += `
          <div class="deal-card">
            <div class="deal-img">
              <img src="${offer.imagem_url}" alt="${offer.destino}">
              <span class="deal-discount">-${offer.desconto}%</span>
              <span class="deal-provider">${offer.provedor}</span>
            </div>
            <div class="deal-body">
              <h4>${offer.destino}</h4>
              <div class="route">${offer.rota}</div>
              <div class="deal-price-row">
                <span class="old">R$ ${offer.preco_antigo}</span>
                <span class="new">R$ ${offer.preco_novo}</span>
              </div>
              <a href="https://wa.me/5511997204445" target="_blank" class="deal-btn">Ver Oferta</a>
            </div>
          </div>
        `;
      });
      
      html += `
          </div>
        </div>
      `;
    }
  });

  offersContainer.innerHTML = html;
}

function renderBlogPostsDynamic() {
  const blogContainer = document.getElementById('blog-list');
  if (!blogContainer) return;

  let html = '';
  blogPosts.forEach(post => {
    html += `
      <article class="post" data-cat="${post.categoria}">
        <div class="post-banner" style="background: url('${post.imagem_url}') center/cover no-repeat; height: 180px; position: relative;">
          <span class="banner-label" style="position: absolute; bottom: 15px; left: 20px; background: rgba(0, 0, 0, 0.6); padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">
            ${post.categoria}
          </span>
        </div>
        <div class="post-body">
          <span class="tag" style="color: var(--gold-primary); font-weight: 700; font-size: 0.75rem; text-transform: uppercase;">${post.categoria}</span>
          <h2 style="font-size: 1.3rem; margin: 10px 0;">${post.titulo}</h2>
          <p style="color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 15px;">${post.descricao_curta}</p>
          <div style="margin-top: auto; display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted);">
            <span>Por: ${post.autor}</span>
            <span>${post.data}</span>
          </div>
        </div>
      </article>
    `;
  });

  // Mantém o cta-inline no final da lista
  html += `
    <div class="cta-inline">
      <h3>Quer esse tipo de alerta direto no seu WhatsApp?</h3>
      <p>No Destinos Incríveis Club, erros tarifários e promoções chegam pra você em tempo real.</p>
      <a href="club.html" class="btn-gold">Conhecer o Clube</a>
    </div>
  `;

  blogContainer.innerHTML = html;
}

// INICIALIZADORES DO SIMULADOR E GERAIS
document.addEventListener("DOMContentLoaded", () => {
  // Renderizar itens dinâmicos do Blog e Ofertas
  renderOffersDynamic();
  renderBlogPostsDynamic();

  // Mobile Burger Menu Toggle
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('active-menu');
    });
  }

  // Inicializar o primeiro alerta do simulador
  selectAlert('promo');

  // Adicionar listeners para os botões do simulador
  const categories = ['promo', 'erro', 'pacote', 'dica'];
  categories.forEach(cat => {
    const btn = document.getElementById('btn-' + cat);
    if (btn) {
      btn.addEventListener('click', () => selectAlert(cat));
    }
  });

  // Atualizar hora atual no mockup do celular
  function updateTime() {
    const currentTimeEl = document.getElementById('currentTime');
    if (currentTimeEl) {
      const now = new Date();
      currentTimeEl.textContent = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
    }
  }
  updateTime();
  setInterval(updateTime, 60000);

  // CHAT WINDOW TRIGGER
  const chatTrigger = document.getElementById('chatTrigger');
  const chatWindow = document.getElementById('chatWindow');
  const chatClose = document.getElementById('chatClose');

  if (chatTrigger && chatWindow) {
    chatTrigger.addEventListener('click', () => {
      chatWindow.classList.toggle('active');
    });
  }

  if (chatClose && chatWindow) {
    chatClose.addEventListener('click', () => {
      chatWindow.classList.remove('active');
    });
  }

  // LOGICA DE MENSAGENS DO CHAT WIDGET
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const windowMessages = document.getElementById('windowMessages');

  if (chatForm && chatInput && windowMessages) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      // Adicionar mensagem do usuário
      appendMessage('user', text);
      chatInput.value = '';

      // Simular resposta automática do assistente de viagens
      setTimeout(() => {
        respondToUser(text);
      }, 1000);
    });
  }

  function appendMessage(sender, text) {
    if (!windowMessages) return;
    const msg = document.createElement('div');
    msg.className = `msg-bubble msg-${sender}`;
    msg.textContent = text;
    windowMessages.appendChild(msg);
    windowMessages.scrollTop = windowMessages.scrollHeight;
  }

  function respondToUser(userText) {
    const lowercase = userText.toLowerCase();
    let reply = "Olá! Como posso te ajudar na sua próxima viagem? Fale-me sobre o seu destino ideal!";

    if (lowercase.includes('clube') || lowercase.includes('grupo') || lowercase.includes('alerta')) {
      reply = "No Destinos Incríveis Club você recebe alertas diários direto no WhatsApp! Clique no botão de compra ou fale com nossa equipe para garantir seu acesso com desconto.";
    } else if (lowercase.includes('consultoria') || lowercase.includes('planejar') || lowercase.includes('roteiro')) {
      reply = "Nossa Consultoria VIP cuida de todo o seu roteiro e busca as melhores passagens e hotéis sob medida. O plano ideal a partir de R$ 99!";
    } else if (lowercase.includes('preco') || lowercase.includes('valor') || lowercase.includes('desconto')) {
      reply = "Temos o Destinos Incríveis Club a partir de R$ 9,90/mês e a Consultoria Personalizada por apenas R$ 150 por viagem. Qual plano você gostaria de saber mais?";
    } else if (lowercase.includes('oi') || lowercase.includes('ola') || lowercase.includes('bom dia') || lowercase.includes('boa tarde')) {
      reply = "Olá! Eu sou o Guia Virtual dos Destinos Incríveis. Você gostaria de conhecer o Destinos Incríveis Club ou nossa Consultoria de Viagens Personalizada?";
    }

    appendMessage('bot', reply);
  }
});
