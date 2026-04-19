# Prompt — Agente 3: Frontend Developer (Vanilla HTML/CSS/JS)

> **Instrução para o dono do projeto:** abra uma **nova sessão do Claude Code** em `/home/guilherme/Documentos/Amupe/Abertura/Abertura`. Como primeira mensagem, cole apenas:
>
> ```
> Leia docs/30-prompts-agentes/03-frontend-developer.md por completo e siga exatamente as instruções contidas ali. É seu briefing integral.
> ```
>
> Nada mais. O agente puxa o resto.

---

## Seu papel

Você é o **Frontend Developer** da V1 do "Jogo do Consensualismo" do TCE-PE. UX Writer e Visual Designer já entregaram. Sua missão: **implementar o jogo inteiro em HTML/CSS/JS vanilla**, sem build tools, consumindo os JSONs de conteúdo e o `tokens.css` existentes. Entrega final roda aberta em Chromium modo kiosk a partir de um servidor HTTP local simples.

Prazo real: **72h ou menos**. Event begins 27/04. Você é o caminho crítico.

## Antes de escrever qualquer linha de código, leia:

1. **`docs/00-brief.md` inteiro.** Contexto obrigatório.
2. **`docs/10-v1-spec.md` inteiro.** É sua bíblia. Especialmente seções 1 (arquivo), 2 (state machine), 3 (idle), 4 (orientação), 5 (touch), 6 (conteúdo), 7-13 (cada cena), 14-16 (áudio, fontes, compressão), 17 (critérios de aceitação), 18 (ordem de implementação), 19 (definição de pronto).
3. **`docs/40-design/design-system.md`** — entende a lógica visual.
4. **`docs/40-design/tokens.css`** — seus estilos-fonte. Você **não reimplementa** nada que já está aqui.
5. **`docs/40-design/mockup.html`** — abra no navegador; é a referência de como os componentes renderizam.
6. **Todos os JSONs em `docs/20-conteudo/`** — leia os 7 arquivos inteiros para entender o que o jogo vai mostrar.
7. **SVGs em `assets/`** — navegue a árvore (`ui/`, `pilares/`, `instrumentos/`, `itens/`, `armadilhas/`). Todos já existem.

## Ambiente de execução

- **Stack:** HTML5 + CSS3 + ES2020 JavaScript vanilla. **Sem** React, Vue, Phaser, TypeScript, build tool, transpilador, bundler, polyfill.
- **Runtime alvo:** Chromium 120+ rodando em modo kiosk, **offline**, via servidor HTTP local.
- **Dev loop:**
  ```bash
  cd /home/guilherme/Documentos/Amupe/Abertura/Abertura
  python3 -m http.server 8000
  # abra http://localhost:8000 em Chrome/Chromium
  # F12 → botão device → touch mode → 1080×1920 portrait
  ```
- **Produção (no totem):** mesmo comando acima + atalho na área de trabalho para `chromium --kiosk http://localhost:8000`.

## Pré-trabalho (faça antes de começar a codar)

1. **Mover arquivos legados para `_legacy/`** (preservação, não deletar):
   ```bash
   mkdir -p _legacy
   git mv abertura.html cai-cai.html clima.html clima-level.html \
       estrada.html estrada2D.html fase2.html hospital.html \
       index.html "index - Copia.html" municipio.html parque.html \
       parque2.html parque2.txt pddoors.html pipoca.html rodovia.html \
       subway.html "tela4.html.html" teste-video.html teste-zoom.html \
       memoria/ \
       _legacy/
   ```
   (Atenção aos nomes com espaços e acentos — use aspas.) Depois `git commit`. **Não mexa em `assets/`, `docs/`, `.gitignore`, `.git/`, `.claude/`.**

2. **Estabelecer a estrutura nova** (conforme `docs/10-v1-spec.md` §1):
   ```
   index.html
   styles/
     base.css          (reset + imports de tokens.css e fontes)
     cenas.css         (estilos por cena)
     responsivo.css    (media queries portrait/landscape)
   src/
     main.js           (bootstrap, state machine)
     conteudo.js       (loader de JSONs)
     estado.js         (state machine + idle timer)
     orientacao.js     (helpers de orientação)
     audio.js          (opcional)
     cenas/
       attract.js
       abertura.js
       jogo1_ligar.js
       jogo2_lanterna.js
       jogo3_coletor.js
       final.js
     lib/
       qrcode.min.js   (baixar de https://unpkg.com/qrcode@1.5.3/build/qrcode.min.js; ~25KB)
   ```

3. **Sincronizar conteúdo para o runtime.** Decisão V1: **fetch direto de `docs/20-conteudo/`**, sem duplicar. O kiosk serve a raiz do projeto; o jogo lê `fetch('docs/20-conteudo/principios.json')`. Se o dono editar um JSON em `docs/20-conteudo/`, o próximo reload já pega. Zero cópia, zero sincronização. Essa é a escolha V1 para simplicidade.

4. **Importar `tokens.css`.** O VD deixou o canônico em `docs/40-design/tokens.css`. Em `styles/base.css` comece com:
   ```css
   @import url('../docs/40-design/tokens.css');
   ```
   Ajuste os paths das fontes dentro do `@font-face` se o `@import` quebrar a resolução relativa (Chrome resolve relativo ao CSS importado — se quebrar, copie `tokens.css` para `styles/tokens.css` e ajuste paths de fontes).

## Ordem de implementação (siga à risca)

### Fase 1 — Alicerce (4-6h)
1. **`index.html` esqueleto** — um único `<div id="app">`, imports CSS e JS.
2. **`styles/base.css`** — import tokens, reset, classes utility, tipografia base.
3. **`styles/responsivo.css`** — media queries `portrait`/`landscape` e helpers.
4. **`src/conteudo.js`** — carrega todos os JSONs em paralelo. Exporta `carregarTudo()`, `sortearHistoria(sessao)`.
5. **`src/estado.js`** — state machine simples (objeto com `estado`, `transicoes`, funções `irPara(nome)`), idle timer global (45s, 10s na FINAL).
6. **`src/main.js`** — bootstrap: espera DOMContentLoaded, chama `carregarTudo()`, inicia no estado `ATTRACT`.
7. **Teste:** `python3 -m http.server 8000`, abre no Chrome, F12 Network → confirma que os 7 JSONs carregam sem erro.

### Fase 2 — Esqueleto visual das cenas (2-3h)
Todas as cenas montadas **sem lógica de jogo**, só com layout e navegação linear (botões avançar entre cenas). Objetivo: fluxo completo do começo ao fim.

8. **`src/cenas/attract.js`** — roleta animada CSS + "TOQUE PARA COMEÇAR". Qualquer touch → `ROLETA_GIRANDO`.
9. **`src/cenas/abertura.js`** — pega história sorteada, renderiza título + contexto + botão "INICIAR MISSÃO".
10. **`src/cenas/final.js`** — frase-síntese + QR (via `qrcode.min.js`) + créditos. Auto-reset 10s → ATTRACT.
11. **Placeholders** para jogo 1, 2, 3 (só botão "Avançar" provisório).

### Fase 3 — Jogos (12-16h, mais crítico)

12. **Jogo 1 — Ligar Pontos** (`jogo1_ligar.js`):
    - Carrega `principios.json`.
    - Renderiza 3 caixas-pilar no topo (portrait) ou lateral (landscape).
    - Renderiza 6 cartões-caso embaralhados.
    - Drag-and-drop usando **PointerEvents** (não `dragstart`, que não roda em touch).
    - Acerto: cartão "gruda", toca insight por 2s, remove do pool.
    - Erro: cartão balança, feedback "Não é esse pilar", volta ao pool.
    - Ao ligar 6: botão AVANÇAR → JOGO2.

13. **Jogo 2 — Lanterna** (`jogo2_lanterna.js`):
    - Carrega cenário da história sorteada (fundo `cenarios/<id>_lanterna.jpg` **com fallback para gradient CSS** se imagem não existir — ver `prompts-ia.md`).
    - Cria máscara SVG com círculo radial seguindo o dedo (`touchmove`/`pointermove`).
    - Spawna 5 instrumentos (do `instrumentosAEscolher` do JSON da história, buscando imagem em `assets/instrumentos/<id>.svg`) e 3 armadilhas (em `assets/armadilhas/<id>.svg`) em posições aleatórias.
    - Instrumento clicado: micro-insight modal 2s, marca coletado.
    - Armadilha clicada: -5s do timer, shake, explicação 2s.
    - 5 coletados: AVANÇAR. Timer 60s esgotado: derrota → attract.

14. **Jogo 3 — Coletor** (`jogo3_coletor.js`):
    - Carrega `coletor.json`.
    - Loop de animação via `requestAnimationFrame`.
    - Cesta na base, movida por touch-drag horizontal (`touch-action: none` no wrapper).
    - Spawna itens no topo com `x` aleatório, cai com velocidade crescente.
    - Colisão com cesta: adequado = +10, flash verde; inadequado = -5 pontos, flash vermelho.
    - Meta 80 pontos em 60s = vitória → FINAL.
    - Timer esgota antes da meta: derrota → attract.

### Fase 4 — Polimento (3-4h)

15. **Transições** entre cenas (fade/scale 300ms, usando `--duration-*` e `--easing-*` dos tokens).
16. **Feedback tátil visual** em todo botão (`.tocando` class em `pointerdown`, remove em `pointerup`, ≤50ms percebido).
17. **Mensagem de idle** última década (opcional: "Volta em {n}s…" no canto 10s antes do auto-reset).
18. **Áudio** (opcional, não bloquear): Web Audio API curta para acerto/erro/vitória. Mute toggle persistente via `localStorage`.
19. **Testes manuais**: passe o fluxo completo 3 vezes, uma vez em cada história. Verifique portrait E landscape em DevTools.

## Regras duras (violação → reprovação no review)

1. **Nunca** use `onmousemove`, `onclick` sem fallback, ou APIs touch antigas. Use sempre **PointerEvents**:
   ```js
   el.addEventListener('pointerdown', fn);
   el.addEventListener('pointermove', fn);
   el.addEventListener('pointerup',   fn);
   ```
   PointerEvents cobre mouse, touch e pen num único API.

2. **Nunca** faça requisição para domínio externo. Sem Google Fonts, sem CDN de ícones, sem API de QR online — `qrcode.min.js` já está local.

3. **Nunca** hardcode texto de conteúdo no HTML/JS. Sempre puxe do JSON. Se precisar de um texto não coberto pelos JSONs, primeiro adicione em `textos-ui.json` comentando o porquê em commit; **não** invente campo novo sem documentar.

4. **Nunca** use `px` fixo em dimensões de layout maiores que componentes atômicos. Use `vmin`, `vw`, `vh`, `%`, `rem`, `em`, `clamp()`. Exceção: alvos de toque mínimos (`min-width: 80px`).

5. **Nunca** deixe scroll acidental no body. Use `overflow: hidden; touch-action: none;` no wrapper global.

6. **Sempre** respeite o idle timer. Qualquer cena deve resetar o idle a cada toque.

7. **Sempre** faça as cenas funcionarem nas duas orientações via media queries. Teste em ambas antes de considerar pronto.

8. **Sempre** trate JSON faltando/corrompido com graceful fallback: mostra uma tela "Conteúdo indisponível. Contate o mediador." em vez de quebrar. Não precisa ser bonito, só não pode travar o totem.

## Fallback para cenários pendentes

O dono ainda não gerou as 6 imagens de fundo (`assets/cenarios/*.jpg`). O VD documentou um **fallback de gradiente CSS** em `docs/40-design/prompts-ia.md`. Implemente assim:

- Na cena `ABERTURA` e `JOGO2_LANTERNA`, tente carregar a imagem. Se falhar (`<img onerror>` ou `Image.onerror`), aplique uma classe `.fundo-fallback-<id>` que usa gradiente.
- Gradientes por história (ficam bonitos mesmo sem arte):
  - `aterro`: `linear-gradient(135deg, #002347, #14457a)`.
  - `escolar`: `linear-gradient(135deg, #003366, #2a5a91)`.
  - `transporte-urbano`: `linear-gradient(135deg, #001a33, #003366)`.
- Com isso, o jogo funciona mesmo sem as artes. Quando o dono colocar as `.jpg`, o fallback se desativa automaticamente.

## Checklist de aceitação (copie para o seu fim de sessão)

- [ ] `python3 -m http.server 8000` funciona; abre em http://localhost:8000.
- [ ] Zero requisições externas no Network (só `localhost`).
- [ ] Zero erros no Console durante toda uma partida (ATTRACT → FINAL).
- [ ] Portrait (1080×1920) e landscape (1920×1080) ambos funcionam em DevTools device mode.
- [ ] Fluxo completo: toque no ATTRACT → roleta gira 4s → ABERTURA → JOGO1 → JOGO2 → JOGO3 → FINAL → auto-reset 10s → ATTRACT.
- [ ] Idle 45s em qualquer cena intermediária → volta para ATTRACT.
- [ ] 3 sessões seguidas mostram 3 histórias diferentes (aterro → escolar → transporte-urbano).
- [ ] Editar uma frase em `docs/20-conteudo/historias/aterro.json` e reload → texto muda no jogo.
- [ ] QR code renderiza e é escaneável com câmera de celular.
- [ ] Logo TCE-PE aparece em ATTRACT e FINAL.
- [ ] Todos os SVGs de `assets/` referenciados carregam sem 404.
- [ ] Fonte Inter e Bungee renderizam (inspecione elemento → computed style → font-family).
- [ ] Nenhum asset > 500KB (verifique no Network tab).
- [ ] Nenhum `mouseover`, `mouseenter`, `hover` crítico no código — só PointerEvents.
- [ ] `git status` limpo (tudo commitado).

## Como commitar

Recomendo **múltiplos commits granulares**:

```bash
git add .
git commit -m "frontend: move HTMLs legados para _legacy/"
# ...
git commit -m "frontend: scaffold inicial (index.html, styles base, state machine)"
git commit -m "frontend: ATTRACT e navegação esqueleto"
git commit -m "frontend: ABERTURA com carregamento de história"
git commit -m "frontend: FINAL com QR e auto-reset"
git commit -m "frontend: Jogo 1 — ligar pontos drag-and-drop"
git commit -m "frontend: Jogo 2 — lanterna touch"
git commit -m "frontend: Jogo 3 — coletor"
git commit -m "frontend: transições e polimento"
git push
```

Todo commit em `v1-evento-amupe`. Nunca em `main`.

## Se travar

- **Se `@import` de tokens.css quebrar paths de fontes** (erro: fontes 404 em Network), copie `docs/40-design/tokens.css` → `styles/tokens.css` e ajuste `url('../../assets/fontes/...')` → `url('../assets/fontes/...')`. Commite a cópia.
- **Se drag-and-drop HTML5 não funcionar em touch**, implemente manualmente via PointerEvents (`pointerdown` + `pointermove` + `pointerup`, rastreando posição e colisões).
- **Se o Chrome em modo device não simular touch** adequadamente, teste em Android via chrome://inspect (USB debugging) como backup. QA faz validação final no totem real.
- **Se sobrar tempo**, melhore as transições e adicione feedback sonoro opcional. Mas **só depois** de todos os critérios de aceitação baterem verde.

## Definição de pronto

- [ ] Todos os itens da "checklist de aceitação" acima marcados.
- [ ] Pelo menos 5 commits pusheados em `origin/v1-evento-amupe` com mensagens descritivas.
- [ ] Arquivos legados movidos para `_legacy/`.
- [ ] Nota final ao dono no chat: o que foi entregue, o que não foi (se algo), que rodou 3 partidas completas sem erros, e o que o QA deve priorizar no teste.

Boa sessão. Lembre-se: **é touch em TV grande a 1m de distância, offline, em stand de feira**. Cada decisão deve ser pensada nesse contexto.
