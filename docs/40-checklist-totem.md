# Checklist de Validação do Totem

> **Audiência:** QA/Tester. Também serve como guia para o dono validar no dia do evento.
> **Uso:** marque `[x]` conforme executa. Problemas encontrados → abrir seção "Defeitos" no final e documentar.

---

## A. Validação no laptop de dev (ANTES de montar o totem)

> Execute tudo abaixo com o notebook do dono, em Chrome/Chromium, rodando `python3 -m http.server 8000`.

### A.1. Sanidade básica
- [ ] `git status` limpo na branch `v1-evento-amupe` (sem arquivos pendentes).
- [ ] `python3 -m http.server 8000` inicia sem erros.
- [ ] `http://localhost:8000` abre a tela ATTRACT (roleta animada + "TOQUE PARA COMEÇAR").
- [ ] F12 → **Console**: zero erros vermelhos ao carregar.
- [ ] F12 → **Network**: todas as requisições são `localhost:8000`, zero para domínios externos.

### A.2. Fluxo completo — rodar 3 vezes (uma por história)
Repetir o processo 3 vezes seguidas, esperando voltar ao ATTRACT entre uma e outra:

- [ ] **Partida 1:** primeira sessão → história sorteada = `aterro` (ou outra — anote qual).
  - [ ] Toque no ATTRACT → roleta gira ~4s → aparece "VAMOS JOGAR!" → transição para ABERTURA.
  - [ ] ABERTURA mostra nomes fictícios das cidades + contexto da história sorteada.
  - [ ] Toque "INICIAR MISSÃO" → JOGO 1.
  - [ ] JOGO 1: arrastar os 6 cartões-caso para os pilares corretos; 2 tentativas erradas voltam o cartão para o pool; ao completar, botão AVANÇAR aparece.
  - [ ] JOGO 2: lanterna segue o dedo; 5 instrumentos coletados + armadilhas dão feedback de penalidade; ao completar, AVANÇAR aparece.
  - [ ] JOGO 3: cesta move com drag horizontal; adequados +10, inadequados -5 ou -3s; ao atingir meta (80 pontos), vai para FINAL.
  - [ ] FINAL: frase-síntese + QR + créditos + logo; auto-reset para ATTRACT após 10s.
- [ ] **Partida 2:** repita; história sorteada deve ser **diferente** da partida 1.
- [ ] **Partida 3:** repita; história sorteada deve ser a **terceira restante** (rotação completa).

### A.3. Comportamento kiosk (crítico)
- [ ] **Idle ATTRACT:** fica parado em ATTRACT indefinidamente, roleta continua girando visualmente.
- [ ] **Idle em cena intermediária:** em ABERTURA, JOGO 1, JOGO 2 ou JOGO 3, deixe **45s sem tocar** → deve voltar para ATTRACT automaticamente.
- [ ] **FINAL auto-reset:** ao chegar em FINAL, esperar 10s sem tocar → volta para ATTRACT.
- [ ] **Botão "TOCAR NOVAMENTE"** na FINAL → volta para ATTRACT imediatamente (ou inicia outra partida, a depender do design).

### A.4. Orientação responsiva
Testar em DevTools device mode (F12 → ícone do dispositivo → modo custom):

- [ ] **Portrait 1080×1920:** todos os textos cabem, sem overflow horizontal; cartões do JOGO 1 empilháveis; cesta do JOGO 3 cabe; fluxo completo executável.
- [ ] **Landscape 1920×1080:** layout reorganiza (caixas-pilar à esquerda ou similar); sem overflow vertical; fluxo completo executável.
- [ ] **Portrait 2160×3840 (4K):** texto escala via `clamp()` e continua legível; SVGs não pixelizados.
- [ ] **Landscape 3840×2160 (4K):** idem.

### A.5. Conteúdo editável em runtime
- [ ] Abra `docs/20-conteudo/historias/aterro.json`, mude o campo `abertura.titulo` para "TESTE EDITÁVEL".
- [ ] Recarregue `http://localhost:8000` (Ctrl+Shift+R para bypass cache).
- [ ] Jogue até cair na história do aterro (pode rodar 1-3 partidas até cair nela).
- [ ] Verifique se "TESTE EDITÁVEL" aparece na ABERTURA.
- [ ] **Reverta** a mudança (ou `git checkout docs/20-conteudo/historias/aterro.json`).

### A.6. QR code
- [ ] Chegar à cena FINAL.
- [ ] Abrir câmera de celular, apontar para o QR na tela do laptop a ~1m de distância.
- [ ] O celular deve abrir a URL (hoje placeholder `https://tce.pe.gov.br/consensualismo`).
- [ ] Se não escanear a 1m, **aumentar tamanho do QR** no CSS e repetir.

### A.7. Touch em dev
DevTools não simula touch 100%, mas dá para forçar:
- [ ] F12 → "Toggle device toolbar" → escolher ícone de touch no topo.
- [ ] Testar drag do cartão (JOGO 1), movimento da lanterna (JOGO 2), drag da cesta (JOGO 3).
- [ ] Todos devem responder a "touch" simulado do mouse.

**Nota:** teste real de touch só no totem físico. Bugs sutis podem aparecer lá.

### A.8. Assets e performance
- [ ] F12 → Network → filtro "Img": nenhum 404. Todos os SVGs de `assets/` carregam.
- [ ] F12 → Network → filtro "Font": Inter-Regular.woff2, Inter-Bold.woff2, Bungee-Regular.woff2 carregam de `localhost`.
- [ ] Nenhum asset > 500KB no Network (clique em "Size" para ordenar).
- [ ] Lighthouse (F12 → Lighthouse → Mobile → Analyze): Performance > 80, Accessibility > 80.

### A.9. Offline completo
- [ ] F12 → Network → "Offline" checkbox.
- [ ] Recarregar a página.
- [ ] Deve funcionar 100% (todos os assets e JSONs já foram baixados uma vez; Chromium serve do cache local + http.server local).

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

| # | Data | Seção | Descrição | Prioridade | Quem resolve | Status |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
