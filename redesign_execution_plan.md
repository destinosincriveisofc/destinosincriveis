# Plano de Execucao do Redesign - Club DIJA

## Fase 1: Auditoria (Dia 1)
- [x] Mapear todas as 27 paginas
- [x] Identificar problemas de tema inconsistente
- [x] Identificar uso de emojis e linguagem agressiva
- [x] Identificar estetica gamer/sci-fi
- [x] Verificar proporcao Brasil vs Internacional
- [x] Documentar descobertas

## Fase 2: Fundacao (Dia 1-2)
- [x] Revisar sistema de design (tokens.css, globals.css)
- [x] Unificar tema claro em todas as paginas
- [x] Refinar Navbar (scroll, glass effect, CTA)
- [x] Refinar Footer (espacamento, icones, links)
- [x] Corrigir layout root (remover bg-glow-container)

## Fase 3: Home Page (Dia 2)
- [x] Manter HeroSection existente (ja adequada)
- [x] Manter BrasilEmNumeros (ja adequada)
- [x] Criar FeaturedDestinations (6 destinos brasileiros)
- [x] Criar AISection (introducao a DIJA AI)
- [x] Criar ComunidadeSection (feed social estatico)
- [x] Criar ExploreSection (categorias de busca)
- [x] Manter Depoimentos (ja adequados)
- [x] Criar ClubSection (beneficios do clube)
- [x] Manter CTA_Final (ja adequada)

## Fase 4: Paginas de Conversao (Dia 2-3)
- [x] Reconstruir Club Page (tema claro, precificacao, beneficios, FAQ)
- [x] Reconstruir Checkout (pre-checkout com modal de confirmacao)
- [x] Reconstruir Obrigado (cadastro de senha pos-compra)

## Fase 5: Dashboard (Dia 3-4)
- [x] Reconstruir layout do dashboard (sidebar minimalista, tema claro)
- [x] Reconstruir pagina inicial do dashboard (widgets, estatisticas)
- [x] Reconstruir Comunidade (feed com posts, likes, comentarios)
- [x] Reconstruir Dicas (grid de dicas com markdown renderer)
- [x] Reconstruir Guia DIJA (chat IA com historico)
- [x] Reconstruir Perfil (identidade, preferencias, memorias)
- [x] Criar pagina Explorar (categorias de destino)

## Fase 6: Paginas Publicas (Dia 4)
- [x] Reconstruir Login (formulario clean, tema claro)
- [x] Reconstruir DIJA AI (explicacao do copiloto, 3 passos, features)
- [x] Reconstruir Experiencias (6 destinos, 5 brasileiros)

## Fase 7: Limpeza e Otimizacao (Dia 5)
- [x] Remover CSS modules orfaos
- [x] Remover imports de modulos nao utilizados
- [x] Verificar build de producao
- [x] Testar todas as 27 paginas

## Fase 8: Documentacao (Dia 5)
- [x] Gerar auditoria_rebranding_final.md
- [x] Gerar redesign_execution_plan.md
- [x] Gerar redesign_checklist.md
- [x] Gerar screenshot_audit_v2.md

---

## Arquivos Pendentes para Proxima Iteracao (Opcional)

### Baixa Prioridade:
- `src/pages/consultoria/page.tsx` - Pagina de consultoria (manter como esta)
- `src/pages/parcerias/page.tsx` - Pagina de parcerias (manter como esta)
- `src/pages/privacidade/page.tsx` - Pagina de privacidade (manter como esta)
- `src/pages/termos/page.tsx` - Pagina de termos (manter como esta)
- `src/pages/recuperar-senha/page.tsx` - Recuperacao de senha
- `src/pages/nova-senha/page.tsx` - Nova senha
- `src/pages/guias/page.tsx` - Pagina de guias
- `src/pages/guias/artigo/page.tsx` - Leitor de artigo
- `src/pages/destinos/page.tsx` - Lista de destinos
- `src/pages/explorar/page.tsx` - Explorador de destinos
- `src/pages/blog/page.tsx` - Redirect para /guias

### Componentes de Baixa Prioridade:
- `TravelGlobe.tsx` - Globo 3D (ja funcional)
- `ExperienceCard.tsx`, `DestinationCard.tsx`, `GuideCard.tsx`, `BlogCard.tsx`
- `SearchWidget.tsx`, `TravelSearchWidget.tsx`
- `ChatWidget.tsx` - Widget de WhatsApp
- `RadarScanner.tsx` - Scanner visual
- `AlertBadge.tsx`, `BlogSection.tsx`
