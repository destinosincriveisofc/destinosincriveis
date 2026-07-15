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

// INICIALIZADORES DO SIMULADOR E GERAIS
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar o primeiro alerta
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
      reply = "Temos o Destinos Incríveis Club a partir de R$ 19,90/mês e a Consultoria Personalizada por apenas R$ 150 por viagem. Qual plano você gostaria de saber mais?";
    } else if (lowercase.includes('oi') || lowercase.includes('ola') || lowercase.includes('bom dia') || lowercase.includes('boa tarde')) {
      reply = "Olá! Eu sou o Guia Virtual dos Destinos Incríveis. Você gostaria de conhecer o Destinos Incríveis Club ou nossa Consultoria de Viagens Personalizada?";
    }

    appendMessage('bot', reply);
  }
});
