# Registro de Decisões do Projeto (Changelog de Configuração)

Toda sessão futura DEVE consultar este arquivo antes de reabrir qualquer tópico já resolvido. Decisões são imutáveis depois de confirmadas — se precisar reverter, crie um novo item com a data da reversão.

---

## 2026-07-20 — Sessão de Investigação de Marker e Infraestrutura

### Marker Travelpayouts
- **Confirmado:** `marker=748517` é o ID correto da conta do parceiro no Travelpayouts
- **Confirmado:** `550897` NÃO é o marker correto (foi um valor de outra conta/sessão anterior)
- Localizações corrigidas: `/opt/hermes/secrets/ai.env`, `src/lib/travelpayouts.ts`, `agent_vip_miner.py`
- **Decisão:** Sempre usar `748517` como `TRAVELPAYOUTS_MARKER` e default em todo o código

### promo_id / p
- **Testado e confirmado:** `promo_id=4114` (formato `p=4114` no tp.media/r) — retorna redirect HTTP 200 com cookie de tracking
- **Testado e falhou:** `p=8231` — retorna "promo not found" (invalido para esta conta)
- **Decisão:** Manter `p=4114`. Não reabrir discussão sobre `8231`.

### trs (Project ID)
- **Significado:** `trs` = Project ID no Travelpayouts (identifica a qual projeto o trafego deve ser atribuido)
- O formato funcional `tp.media/r?marker=X&p=Y&u=Z` **NAO usa `trs`** — adicionar `trs` neste formato causa HTTP 400
- O formato antigo `c111.travelpayouts.com/click` (que usava `trs`) esta **aposentado** — retorna HTTP 400 independente dos parametros
- MOCK_OFFERS foram corrigidas de `trs=550897` para `trs=250000` (valor original pre-sanitizacao), mas continuam quebradas porque o endpoint c111 nao existe mais
- **Decisão:** Nao incluir `trs` em links `tp.media/r`. MOCK_OFFERS serao tratadas separadamente.

### Links de Voo
- **Primario (produção):** `https://trip.tpx.gr/8G2qwgeK` — link de afiliado Trip.com — confirmado funcional (HTTP 200, redirect para Trip.com com `&utm_campaign=748517`)
- **Secundario (frontend, fallback):** `https://tp.media/r?marker=748517&p=4114&u=<searchUrl>` — Aviasales via Travelpayouts — confirmado funcional (HTTP 200, redirect com `?marker=748517`)
- **Descontinuado:** Aviasales via `c111.travelpayouts.com/click` — endpoint retorna 400

### Trip.com — Automacao e Scraping
- **Proibido:** Fazer scraping/pesquisa automatizada nas paginas do Trip.com
- Evidencias: `robots.txt` do Trip.com desabilita `/hotels/list`, `/searchresult/`, `*searchresults*`
- Regras da Search API do Travelpayouts proibem coleta/scraping automatizado
- **Decisão:** Nao construir agente de navegacao para extrair dados de hotel. Usar alternativas aprovadas.

### Alternativas para Dados Reais de Hotel
- **Aprovada:** (1) Ajustar texto de venda para disclaimer honesto ("confirme disponibilidade e valor final no site")
- **Aprovada:** (2) Solicitar acesso a API oficial de hoteis da Travelpayouts (disponivel "upon request" mediante moderacao)
- **Pendente:** Search Box widget do Trip.com — UX precisa ser avaliada em ambiente de teste antes

### MOCK_OFFERS (quebradas)
- As MOCK_OFFERS em `src/lib/travelpayouts.ts` usam o endpoint `c111.travelpayouts.com/click` que esta **aposentado** (HTTP 400)
- Nao sao usadas em producao (dados reais vem do `agent_vip_miner.py` com links Trip.com)
- **Decisão:** Nao remendar isoladamente. Remover/atualizar quando o item "eliminar fallback mock" for tratado como tarefa separada.

### Consolidacao dos 3 Mecanismos de Execucao
- **Aprovado:** Manter apenas `root crontab` com `agent_vip_miner.py` como unica fonte de verdade para ofertas (horarios 08:00, 11:00, 20:00 BRT)
- **Desativar:** APScheduler (`start_offer_scheduler()` em `server.py`) — removido por ser redundante e nao logar audit trail
- **Reduzir:** n8n para 1x/dia as 06:00 (manter so para blog/novidades, sem mexer em offers.json)

## 2026-07-20 — Sessão Continuacao: Texto Honesto para Hoteis/Passeios

### Precos Fabricados — Fim da Pratica
- **Decisao:** As ofertas de hotel e passeio NAO devem mais conter precos inventados pela IA
- Antes: a IA recebia o prompt "Precos devem ser realistas mas com altissimo desconto (35% a 75% OFF)"
- Agora: a IA recebe o prompt "Nao invente precos. Defina preco_atual, preco_original e desconto_percent como null."
- O `texto_venda` agora usa linguagem honesta: "Consulte o site parceiro para precos e disponibilidade atualizados"
- Voos continuam usando precos reais da API Travelpayouts (nao sao fabricados)
- **Observacao:** O `preco_atual` e `preco_original` podem continuar sendo preenchidos para **voos** (API real), mas API real de hoteis/passeios ainda nao implementada

### Arquivos Modificados
- `/opt/hermes/router/agent_vip_miner.py`: Prompt principal + fallback + `format_offer_for_whatsapp`
- `/opt/hermes/router/server.py`: `build_fallback_writer` + strategist prompt + writer templates (ambos os modos: passeio e hotel)

### Proximos Passos Pendentes
- Solicitar API oficial de hoteis da Travelpayouts (quando aprovada, reativar precos com dados reais)
- Consolidar 3 mecanismos de execucao (Step 3)
- Corrigir auditoria no `/save-offer` (Step 4)

---

## 2026-07-20 — Sessao de Investigacao de Marker e Infraestrutura

### Marker Travelpayouts
- **Confirmado:** `marker=748517` e o ID correto da conta do parceiro no Travelpayouts
- **Confirmado:** `550897` NAO e o marker correto (foi um valor de outra conta/sessao anterior)
- Localizacoes corrigidas: `/opt/hermes/secrets/ai.env`, `src/lib/travelpayouts.ts`, `agent_vip_miner.py`
- **Decisao:** Sempre usar `748517` como `TRAVELPAYOUTS_MARKER` e default em todo o codigo

### promo_id / p
- **Testado e confirmado:** `promo_id=4114` (formato `p=4114` no tp.media/r) — retorna redirect HTTP 200 com cookie de tracking
- **Testado e falhou:** `p=8231` — retorna "promo not found" (invalido para esta conta)
- **Decisao:** Manter `p=4114`. Nao reabrir discussao sobre `8231`.

### trs (Project ID)
- **Significado:** `trs` = Project ID no Travelpayouts (identifica a qual projeto o trafego deve ser atribuido)
- O formato funcional `tp.media/r?marker=X&p=Y&u=Z` **NAO usa `trs`** — adicionar `trs` neste formato causa HTTP 400
- O formato antigo `c111.travelpayouts.com/click` (que usava `trs`) esta **aposentado** — retorna HTTP 400 independente dos parametros
- MOCK_OFFERS foram corrigidas de `trs=550897` para `trs=250000` (valor original pre-sanitizacao), mas continuam quebradas porque o endpoint c111 nao existe mais
- **Decisao:** Nao incluir `trs` em links `tp.media/r`. MOCK_OFFERS serao tratadas separadamente.

### Links de Voo
- **Primario (producao):** `https://trip.tpx.gr/8G2qwgeK` — link de afiliado Trip.com — confirmado funcional (HTTP 200, redirect para Trip.com com `&utm_campaign=748517`)
- **Secundario (frontend, fallback):** `https://tp.media/r?marker=748517&p=4114&u=<searchUrl>` — Aviasales via Travelpayouts — confirmado funcional (HTTP 200, redirect com `?marker=748517`)
- **Descontinuado:** Aviasales via `c111.travelpayouts.com/click` — endpoint retorna 400

### Trip.com — Automacao e Scraping
- **Proibido:** Fazer scraping/pesquisa automatizada nas paginas do Trip.com
- Evidencias: `robots.txt` do Trip.com desabilita `/hotels/list`, `/searchresult/`, `*searchresults*`
- Regras da Search API do Travelpayouts proibem coleta/scraping automatizado
- **Decisao:** Nao construir agente de navegacao para extrair dados de hotel. Usar alternativas aprovadas.

### Alternativas para Dados Reais de Hotel
- **Aprovada:** (1) Ajustar texto de venda para disclaimer honesto ("confirme disponibilidade e valor final no site")
- **Aprovada:** (2) Solicitar acesso a API oficial de hoteis da Travelpayouts (disponivel "upon request" mediante moderacao)
- **Pendente:** Search Box widget do Trip.com — UX precisa ser avaliada em ambiente de teste antes

### MOCK_OFFERS (quebradas)
- As MOCK_OFFERS em `src/lib/travelpayouts.ts` usam o endpoint `c111.travelpayouts.com/click` que esta **aposentado** (HTTP 400)
- Nao sao usadas em producao (dados reais vem do `agent_vip_miner.py` com links Trip.com)
- **Decisao:** Nao remendar isoladamente. Remover/atualizar quando o item "eliminar fallback mock" for tratado como tarefa separada.

### Consolidacao dos 3 Mecanismos de Execucao
- **Aprovado:** Manter apenas `root crontab` com `agent_vip_miner.py` como unica fonte de verdade para ofertas (horarios 08:00, 11:00, 20:00 BRT)
- **Desativar:** APScheduler (`start_offer_scheduler()` em `server.py`) — removido por ser redundante e nao logar audit trail
- **Reduzir:** n8n para 1x/dia as 06:00 (manter so para blog/novidades, sem mexer em offers.json)

### Auditoria
- **Furo detectado:** `/save-offer` em `server.py` insere em `offers` mas **NAO loga em `offers_audit_log`**
- **Aprovado:** Adicionar `INSERT INTO offers_audit_log` no endpoint `/save-offer`
- O `agent_vip_miner.py` ja faz o log corretamente (181 registros, fonte `agent_vip_miner.py`)
