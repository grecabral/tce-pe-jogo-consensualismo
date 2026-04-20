# Checklist de Validação do Totem

> **Audiência:** QA/Tester. Também serve como guia para o dono validar no dia do evento.
> **Uso:** marque `[x]` conforme executa. Problemas encontrados → abrir seção "Defeitos" no final e documentar.

---

## A. Validação no laptop de dev (ANTES de montar o totem)

> Execute tudo abaixo com o notebook do dono, em Chrome/Chromium, rodando `python3 -m http.server 8000`.

### A.1. Sanidade básica
- [x] `git status` limpo na branch `v1-evento-amupe` (sem arquivos pendentes).
- [x] `python3 -m http.server 8000` inicia sem erros.
- ⏸ `http://localhost:8000` abre a tela ATTRACT (roleta animada + "TOQUE PARA COMEÇAR"). → VERIFICAÇÃO HUMANA (ver H3 no `qa-relatorio-v1.md`)
- ⏸ F12 → **Console**: zero erros vermelhos ao carregar. → VERIFICAÇÃO HUMANA (H1)
- [x] F12 → **Network**: todas as requisições são `localhost:8000`, zero para domínios externos. → análise estática: nenhum `https://`/CDN em código runtime. 4 imagens de cenário dão 404 (bug #1). Fontes locais OK.

### A.2. Fluxo completo — rodar 3 vezes (uma por história)
Repetir o processo 3 vezes seguidas, esperando voltar ao ATTRACT entre uma e outra:

- ⏸ **Partida 1:** primeira sessão → história sorteada = `aterro` (ou outra — anote qual). → VERIFICAÇÃO HUMANA (H7)
  - ⏸ Toque no ATTRACT → roleta gira ~4s → aparece "VAMOS JOGAR!" → transição para ABERTURA. → VERIFICAÇÃO HUMANA (H3)
  - ⏸ ABERTURA mostra nomes fictícios das cidades + contexto da história sorteada. → VERIFICAÇÃO HUMANA
  - ⏸ Toque "INICIAR MISSÃO" → JOGO 1.
  - ⏸ JOGO 1: arrastar os 6 cartões-caso para os pilares corretos; 2 tentativas erradas voltam o cartão para o pool; ao completar, botão AVANÇAR aparece. → VERIFICAÇÃO HUMANA (H4). **Obs estática:** código não conta tentativas — qualquer erro volta ao pool (feedback mais permissivo). Drop fora de qualquer pilar volta silenciosamente (bug #9).
  - ⏸ JOGO 2: lanterna segue o dedo; 5 instrumentos coletados + armadilhas dão feedback de penalidade; ao completar, AVANÇAR aparece. → VERIFICAÇÃO HUMANA (H5). **Obs estática:** não há botão AVANÇAR — auto-transição 1,8 s após 5ª coleta (bug #10).
  - ⏸ JOGO 3: cesta move com drag horizontal; adequados +10, inadequados -5 ou -3s; ao atingir meta (80 pontos), vai para FINAL. → VERIFICAÇÃO HUMANA (H6). **Obs estática:** implementado +10 / -5 (não -3s). Meta 80 em 60 s.
  - ⏸ FINAL: frase-síntese + QR + créditos + logo; auto-reset para ATTRACT após 10s. → VERIFICAÇÃO HUMANA (H9)
- ⏸ **Partida 2:** repita; história sorteada deve ser **diferente** da partida 1. → VERIFICAÇÃO HUMANA (H7). Se jogador completar o fluxo, incremento acontece em FINAL. Se idle, incremento NÃO acontece (bug #3).
- ⏸ **Partida 3:** repita; história sorteada deve ser a **terceira restante** (rotação completa). → VERIFICAÇÃO HUMANA (H7)

### A.3. Comportamento kiosk (crítico)
- [x] **Idle ATTRACT:** fica parado em ATTRACT indefinidamente, roleta continua girando visualmente. → `src/estado.js:75` `if (estadoAtual === 'ATTRACT') return;` suprime idle. Animação via CSS (`roletaGira`).
- ⏸ **Idle em cena intermediária:** em ABERTURA, JOGO 1, JOGO 2 ou JOGO 3, deixe **45s sem tocar** → deve voltar para ATTRACT automaticamente. → VERIFICAÇÃO HUMANA (H8). **Obs estática:** `idleMsAtual = 45000` global; `irPara('ATTRACT')` no timeout.
- ⏸ **FINAL auto-reset:** ao chegar em FINAL, esperar 10s sem tocar → volta para ATTRACT. → VERIFICAÇÃO HUMANA (H9). **Obs estática:** `src/cenas/final.js:48-51` `setTimeout(..., ctx.config.finalAutoResetMs)` = 10 000 ms.
- ⏸ **Botão "TOCAR NOVAMENTE"** na FINAL → volta para ATTRACT imediatamente (ou inicia outra partida, a depender do design). → VERIFICAÇÃO HUMANA. **Obs estática:** incrementa `sessao.numero` e vai para ATTRACT.

### A.4. Orientação responsiva
Testar em DevTools device mode (F12 → ícone do dispositivo → modo custom):

- ⏸ **Portrait 1080×1920:** todos os textos cabem, sem overflow horizontal; cartões do JOGO 1 empilháveis; cesta do JOGO 3 cabe; fluxo completo executável. → VERIFICAÇÃO HUMANA (H10). **Obs estática:** `styles/responsivo.css:2-24` trata portrait com stack; `--font-size-*` usam `clamp(... vmin ...)`.
- ⏸ **Landscape 1920×1080:** layout reorganiza (caixas-pilar à esquerda ou similar); sem overflow vertical; fluxo completo executável. → VERIFICAÇÃO HUMANA (H10). **Obs estática:** `responsivo.css:27-45` trata landscape com `grid-template-columns: 1fr 1fr`.
- ⏸ **Portrait 2160×3840 (4K):** texto escala via `clamp()` e continua legível; SVGs não pixelizados. → VERIFICAÇÃO HUMANA (H10). **Obs estática:** SVGs todos vetoriais. PNG do logo (152 KB) pode granular em 4K extremo.
- ⏸ **Landscape 3840×2160 (4K):** idem. → VERIFICAÇÃO HUMANA (H10)

### A.5. Conteúdo editável em runtime
- ⏸ Abra `docs/20-conteudo/historias/aterro.json`, mude o campo `abertura.titulo` para "TESTE EDITÁVEL". → VERIFICAÇÃO HUMANA (H11)
- ⏸ Recarregue `http://localhost:8000` (Ctrl+Shift+R para bypass cache).
- ⏸ Jogue até cair na história do aterro (pode rodar 1-3 partidas até cair nela).
- ⏸ Verifique se "TESTE EDITÁVEL" aparece na ABERTURA.
- ⏸ **Reverta** a mudança (ou `git checkout docs/20-conteudo/historias/aterro.json`).

**Obs estática:** `src/conteudo.js` lê via `fetch(..., {cache: 'no-store'})` em cada boot — `Ctrl+Shift+R` basta; nem precisa bypass. `src/cenas/abertura.js:21` renderiza `historia.abertura.titulo` direto no HTML.

### A.6. QR code
- ⏸ Chegar à cena FINAL. → VERIFICAÇÃO HUMANA (H12)
- ⏸ Abrir câmera de celular, apontar para o QR na tela do laptop a ~1m de distância.
- ⏸ O celular deve abrir a URL (hoje placeholder `https://tce.pe.gov.br/consensualismo`).
- ⏸ Se não escanear a 1m, **aumentar tamanho do QR** no CSS e repetir.

**Obs estática:** `src/cenas/final.js:62-76` usa lib `QRious` v4.0.2 (GPL v3 — ver bug #6) com `size: 280`, `level: 'M'`, cores `#ffffff`/`#003366`. CSS em `styles/cenas.css:662` limita visualmente a `min(36vmin, 280px)`. Canvas é 280×280 px. **Provável OK para 1 m.**

### A.7. Touch em dev
DevTools não simula touch 100%, mas dá para forçar:
- ⏸ F12 → "Toggle device toolbar" → escolher ícone de touch no topo. → VERIFICAÇÃO HUMANA (H13)
- ⏸ Testar drag do cartão (JOGO 1), movimento da lanterna (JOGO 2), drag da cesta (JOGO 3).
- ⏸ Todos devem responder a "touch" simulado do mouse.

**Obs estática:** todos os handlers usam `pointerdown/pointermove/pointerup/pointercancel` (PointerEvent), que cobre touch e mouse no mesmo caminho. `touch-action: none` no body impede scroll/zoom acidental. Nenhum uso de `mousedown/mousemove/hover`.

**Nota:** teste real de touch só no totem físico. Bugs sutis podem aparecer lá.

### A.8. Assets e performance
- [x] FALHA → ver relatorio#1. F12 → Network → filtro "Img": nenhum 404. Todos os SVGs de `assets/` carregam. **Análise:** todos os SVGs OK, mas **4 imagens JPG de cenário (aterro/escolar/transporte × abertura/lanterna) dão 404** — bug #1. Código cai em fallback gradiente.
- [x] F12 → Network → filtro "Font": Inter-Regular.woff2, Inter-Bold.woff2, Bungee-Regular.woff2 carregam de `localhost`. → Servidos com 200 em `assets/fontes/` (108 KB, 111 KB, 14 KB).
- [x] Nenhum asset > 500KB no Network (clique em "Size" para ordenar). → Maior asset servido é `assets/marca/logo_tce.png` (152 KB). SVGs todos <500 B. Logo dentro do limite.
- ⏸ Lighthouse (F12 → Lighthouse → Mobile → Analyze): Performance > 80, Accessibility > 80. → VERIFICAÇÃO HUMANA (H14)

### A.9. Offline completo
- ⏸ F12 → Network → "Offline" checkbox. → VERIFICAÇÃO HUMANA (H15)
- ⏸ Recarregar a página.
- ⏸ Deve funcionar 100% (todos os assets e JSONs já foram baixados uma vez; Chromium serve do cache local + http.server local).

**Obs estática:** "Offline" no DevTools desabilita a rede do browser para externo, **não** afeta o http.server local (que é um IPC de loopback). Como nenhum asset externo é referenciado em runtime (verificado por grep), o jogo deve funcionar sem internet desde que o http.server local continue ativo.

---

## B. Validação no totem real (24–26/04, após o dono conectar a TV)

### B.1. Hardware
- [ ] Marcar aqui qual TV chegou: [ ] 32" vertical / [ ] 50" horizontal.
- [ ] Resolução real da TV: __________ × __________.
- [ ] TV detectada como monitor principal no notebook; resolução nativa configurada.
- [ ] Touch funciona (tocar em qualquer canto da tela, ver se o cursor segue no Chrome).
- [ ] Áudio: [ ] mudo por padrão / [ ] ligado se disponível.

### B.2. Chrome em modo kiosk
- [ ] Criar atalho de inicialização: `chromium --kiosk http://localhost:8000 --noerrdialogs --disable-infobars --check-for-update-interval=31536000`.
- [ ] Ao ligar o notebook, `python3 -m http.server 8000` inicia automaticamente (via script de startup ou cronjob `@reboot`).
- [ ] Ao ligar o notebook, Chromium abre em fullscreen sem barra de endereço.
- [ ] F11 → F4 não quebra o kiosk.

### B.3. Fluxo completo no totem
Repetir toda seção **A.2** (fluxo 3 vezes) diretamente tocando na TV. Anotar qualquer latência, falha de toque, overflow de layout.

- [ ] Todas as 3 histórias rodaram sem erro.
- [ ] Toque responde em ≤ 200ms em qualquer botão/cartão.
- [ ] Drag do cartão do JOGO 1 funciona em toque real.
- [ ] Lanterna do JOGO 2 segue o dedo com precisão.
- [ ] Cesta do JOGO 3 move suavemente com drag.

### B.4. QR a 1m real
- [ ] Posicionar celular a 1m da TV.
- [ ] Escanear QR na FINAL.
- [ ] Se não ler: aumentar QR para ≥ 360px e commit o ajuste.

### B.5. Reset e robustez
- [ ] Deixar o totem sozinho na FINAL por 10s → volta para ATTRACT.
- [ ] Iniciar uma partida, abandonar no meio, esperar 45s → volta para ATTRACT.
- [ ] Forçar Chrome a congelar (Ctrl+Shift+Esc → matar aba) e relançar: auto-start deve cobrir.

### B.6. Iluminação do stand
- [ ] Se houver janela/holofote no stand, confirmar que a TV tem brilho suficiente para competir.
- [ ] Se QR ficar opaco por reflexo, aumentar contraste do QR (CSS já permite via tokens).

---

## C. Durante o evento (27–28/04) — monitoramento

### C.1. A cada ~30 min (ou na entrada e saída do responsável)
- [ ] Totem está na tela ATTRACT (não travado em outra cena).
- [ ] Roleta animando, texto "TOQUE PARA COMEÇAR" visível.
- [ ] Nenhum erro visível em cantos da tela.

### C.2. Se travar
- [ ] Alt+Tab ou Ctrl+Shift+R para recarregar.
- [ ] Se Chrome inteiro congelou: fechar Chrome, reabrir via atalho kiosk.
- [ ] Se sistema travou: reiniciar notebook; auto-start deve cobrir.

### C.3. Feedback qualitativo para V2
Anotar em papel/bloco:
- [ ] Pessoas que pararam vs passaram direto (proporção).
- [ ] Em qual cena a maioria abandona, se abandonam.
- [ ] Comentários que você ouvir ("não entendi o jogo X", "queria mais desafio", etc.).
- [ ] Problemas de toque/precisão.
- [ ] Se o QR foi escaneado pelas pessoas (pode perguntar).

---

## Defeitos encontrados

> Anote aqui qualquer coisa que falhou. Prioridade P0 = bloqueia evento. P1 = resolver antes do totem real. P2 = melhorar em V2.
>
> **Referência completa com passos de reprodução e impacto: `docs/qa-relatorio-v1.md`.**

| # | Data | Seção | Descrição | Prioridade | Quem resolve | Status |
|---|---|---|---|---|---|---|
| 1 | 2026-04-19 | A.8 | 6 imagens de cenário (abertura/lanterna × 3 histórias) ausentes em `assets/cenarios/`. Código cai em gradiente fallback. | P1 | Visual Designer (arte) ou Arquiteto (aceitar gradientes) | Aberto |
| 2 | 2026-04-19 | A.2 | Derrota em Jogo 2/3 volta direto a ATTRACT sem tela de feedback. | P1 | Frontend | Aberto |
| 3 | 2026-04-19 | A.3 | Idle-reset não incrementa `sessao.numero` (mesma história repete). | P2 | Frontend | Aberto |
| 4 | 2026-04-19 | A.3 | Aviso "Volta em 10 s" pode sobrepor timer de Jogo 2/3. | P2 | Frontend (ou observação em teste humano) | Aberto |
| 5 | 2026-04-19 | — | ~30 MB de imagens órfãs na raiz; mover para `_legacy/`. | P2 | Arquiteto / limpeza | Aberto |
| 6 | 2026-04-19 | — | QRious v4 é GPL v3 — compliance se houver distribuição pública. | P2 | V2 | Aberto |
| 7 | 2026-04-19 | A.4 | Logo em PNG 152 KB (spec sugere SVG). Dentro do limite. | P2 | Dono (quando tiver SVG) | Aberto |
| 8 | 2026-04-19 | — | `iniciarIdleGlobal`+`configurarIdle` redundantes no boot. | P2 | Frontend (code smell) | Aberto |
| 9 | 2026-04-19 | A.2 | Jogo 1: cartão solto fora de qualquer pilar volta silencioso, sem feedback. | P2 | Frontend | Aberto |
| 10 | 2026-04-19 | A.2 | Jogo 2: sem botão AVANÇAR no fim — auto-transição 1,8 s. Alinha com spec, diverge do checklist. | P2 | Arquiteto (decide qual fonte é a verdade) | Aberto |
| 11 | 2026-04-19 | A.2 | Ícones dos pilares no Jogo 1 estão hardcoded no JS. Deveriam vir de `principios.json`. | P2 | Frontend (V2) | Aberto |
