# QA — Relatório de Validação V1

> Sessão aberta em 2026-04-19. Responsável: Agente 4 (QA/Tester).
> Escopo: seção A do `docs/40-checklist-totem.md`. Branch: `v1-evento-amupe`.

---

## Método desta sessão — leia antes de interpretar os resultados

Esta sessão de QA foi conduzida por um agente de CLI, **sem controle
interativo do Chrome**. Portanto os resultados se dividem em duas camadas:

- **Camada 1 — validações automatizáveis (cobertas nesta sessão):**
  - Análise estática de HTML/CSS/JS (estrutura, listeners, timers, fluxo).
  - Validação sintática (`python3 -m json.tool`) de todos os JSONs.
  - Existência e tamanho de cada asset referenciado por conteúdo ou código.
  - Verificação de que o servidor local serve cada recurso com 200 OK.
  - Busca exaustiva por dependências externas (Google Fonts, CDNs etc.).
  - Cobertura da máquina de estados (entry/exit, idle, transições).
  - Conformidade com seção 17 da spec e regras do brief.

- **Camada 2 — validações que só podem ser feitas por um humano no
  browser, no device mode e num totem real (NÃO cobertas aqui):**
  - Renderização visual (proporções, overflow, cor, contraste).
  - Precisão e latência do toque real.
  - Fluidez das transições.
  - Legibilidade do QR a 1m com celular.
  - Lighthouse (performance + acessibilidade).
  - Comportamento touch com múltiplos dedos simultâneos.
  - Renderização da fonte `Bungee-Regular.woff2` (o subset tem 14KB — pode
    estar faltando acentos; vale conferir visualmente).

Itens da camada 2 ficam marcados **⏸ VERIFICAÇÃO HUMANA NECESSÁRIA** no
checklist (em vez de `[x]`). Os que falharam por análise estática são
marcados `[x] FALHA → ver relatorio#N`.

---

## Ambiente usado

- Porta alternativa `8765` (para não colidir com eventual `8000` do dono).
- Python `3.12.3`.
- Todos os módulos, JSONs e assets críticos retornaram 200 quando servidos
  via `python3 -m http.server 8765` a partir da raiz do projeto.
- Branch `v1-evento-amupe` limpa no início; o único arquivo modificado
  durante a sessão foi este relatório e o checklist.

---

## Bugs e observações encontrados

Prioridades: **P0** = bloqueia o evento · **P1** = prejudica a experiência
dos gestores · **P2** = fica para V2.

---

### #1 — Imagens de cenário das 3 histórias estão ausentes (P1)

- **Seção do checklist:** A.1 (Network), A.2 (abertura), A.4 (visual), A.8
  (sem 404).
- **O que se esperava:** `assets/cenarios/{aterro,escolar,transporte}_abertura.jpg`
  e `..._lanterna.jpg` servidos com 200.
- **O que aconteceu:** os 6 arquivos não existem; diretório `assets/cenarios/`
  está vazio. `curl` devolve 404 para todos.
- **Impacto real:** o código em `src/cenas/abertura.js:30-35` e
  `src/cenas/jogo2_lanterna.js:64-67` trata 404 com
  **fallback de gradiente** (classes `.fundo-fallback-<id>` em
  `styles/cenas.css:165-167`). Ou seja, o jogo **não quebra** — mas a
  abertura e o palco da lanterna ficam sem fundo fotográfico. Numa TV
  32"/50" em frente a gestores, é uma percepção imediata de "inacabado".
- **Reprodução (3 passos):**
  1. `python3 -m http.server 8000` na raiz.
  2. `curl -I http://localhost:8000/assets/cenarios/aterro_abertura.jpg`.
  3. Recebe `HTTP/1.0 404 File not found`. Idem para os outros 5.
- **Dependência:** Visual Designer precisa entregar os 6 fundos (ou 3, se
  um mesmo bg servir abertura e lanterna). Frontend/QA não produz arte.
- **Prioridade:** **P1**. Fluxo completa, mas evento é para público alvo
  que vai julgar polidez. Se Visual Designer não entregar até 22/04,
  aceitar gradientes como V1.

---

### #2 — Derrota em Jogo 2 e Jogo 3 não mostra tela de feedback (P1)

- **Seção do checklist:** A.2 (fluxo completo).
- **O que se esperava:** quando o jogador perde (timer esgota sem meta),
  exibir uma tela de "derrota da fase" explicando, depois voltar para
  ATTRACT. A spec (`10-v1-spec.md` §11, §12) descreve derrotas com texto
  ("derrota": "O tempo acabou..." em `textos-ui.json`). Os JSONs das
  histórias têm `derrota.titulo` e `derrota.texto` preenchidos.
- **O que acontece no código:**
  - `src/cenas/jogo2_lanterna.js:181-184`: ao zerar timer, faz
    `ctx.sessao.numero++; irPara('ATTRACT');` sem tela intermediária.
  - `src/cenas/jogo3_coletor.js:199-204`: idem em `encerrar(false)`.
- **Impacto:** jogador perde e a tela simplesmente some, jogando-o de
  volta ao attract sem explicação. Em totem sem mediador, é uma sensação
  de "o sistema caiu".
- **Reprodução (estática):** inspecionar o bloco `if (secundos <= 0)` em
  `src/cenas/jogo2_lanterna.js` e `encerrar(false)` em jogo3. Nenhum
  render de tela de derrota.
- **Prioridade:** **P1**. Solução simples: um `setTimeout` de 2s mostrando
  um overlay com o `textosUI.jogoN.derrota` antes do `irPara('ATTRACT')`.
  Cabe em ~10 linhas em cada cena. Se Frontend voltar pode cobrir.

---

### #3 — Idle-reset não incrementa `sessao.numero` (P2)

- **Seção do checklist:** A.3 (kiosk).
- **O que se esperava:** spec `10-v1-spec.md` §2 diz "`sessao++` ao entrar
  em ATTRACT vindo de FINAL ou **idle-reset**. Define qual história será
  sorteada na próxima."
- **O que acontece:** `src/estado.js:76-78`
  ```js
  idleTimeout = setTimeout(() => { irPara('ATTRACT'); }, idleMsAtual);
  ```
  Vai para ATTRACT direto, sem tocar em `sessao.numero`.
  Só `final.js` e as derrotas explícitas incrementam.
- **Impacto:** se um jogador abandonar no meio e outro jogador tocar
  logo depois (ou ele mesmo tocar de novo), aparece a mesma história.
  Em um evento de 2 dias com fluxo intermitente, isso reduz a percepção
  de rotação entre histórias.
- **Prioridade:** **P2**. É um fix de uma linha (incrementar no callback
  do setTimeout) mas a V1 funciona sem ele. Não trava nada.

---

### #4 — Aviso "Volta em Xs" pode competir com timer de jogo (P2)

- **Seção do checklist:** A.3 (kiosk), A.2 (jogo2/jogo3).
- **Contexto:** `src/estado.js:79-80` programa um aviso "Volta em 10s"
  10 segundos antes do idle-timeout. Em ATTRACT, ele é suprimido
  (`if (estadoAtual === 'ATTRACT') return;`). Mas em JOGO 2 (timer 60s) e
  JOGO 3 (timer 60s), se o jogador ficar 35s sem mover o ponteiro, o
  aviso aparece — e fica ao lado do timer do próprio jogo.
- **Impacto:** UX visual competitiva. No Jogo 3 o jogador precisa arrastar
  constantemente, então é raro; no Jogo 2, se o jogador ler um modal por
  muito tempo, pode ver o aviso. Em prática, `pointermove` global
  reseta o idle a cada movimento, então é improvável na maioria das
  partidas — mas é possível.
- **Prioridade:** **P2**. Avaliar em teste real; se nunca acontecer,
  fecha. Se acontecer, suprimir o aviso em JOGO2 e JOGO3 (mesma técnica
  de `estadoAtual === 'ATTRACT'`).

---

### #5 — Imagens órfãs no diretório raiz (P2, limpeza)

- **Seção da spec:** §1 "Arquivos órfãos... → todos para `_legacy/`. Não
  apagar."
- **O que se observa na raiz do projeto:**
  - `metro.png` (9,0 MB), `parque-abandonado.png` (11 MB),
    `municipio-area.png` (3,4 MB), `hospital.png` (2,2 MB), `seu_video.mp4`
    (4,4 MB), etc.
  - Total: ~30 MB de assets legados na raiz, **não referenciados pelo
    código V1** (verifiquei com grep).
- **Impacto no evento:** nenhum imediato (não são carregados). Mas
  inflam o repositório e, em uma operação de reset/reimplantação no
  totem, podem ser copiados inutilmente.
- **Prioridade:** **P2**. Mover para `_legacy/` depois do evento.

---

### #6 — QR lib (`QRious`) é GPL v3 (P2, compliance)

- `src/lib/qrcode.min.js` primeiras 2 linhas:
  ```
  /*! QRious v4.0.2 | (C) 2017 Alasdair Mercer | GPL v3 License
  Based on jsqrencode | (C) 2010 tz@execpc.com | GPL v3 License */
  ```
- **Implicação:** GPL v3 exige disponibilizar o código-fonte da obra
  derivada. Para uso interno (kiosk), não há distribuição — então não
  dispara. Mas se em algum momento o TCE-PE publicar o pacote do jogo
  (site, Play Store, loja), o tema vira relevante.
- **Prioridade:** **P2**. Resolver em V2 trocando para MIT (ex:
  [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator),
  MIT) se houver distribuição pública.

---

### #7 — Logo TCE como PNG, não SVG (P2)

- **`assets/marca/logo_tce.png`** (152 KB, dentro do limite de 500 KB).
  A spec §10.5 diz: "`assets/marca/logo_tce.svg` (ou `.png` se for o
  formato disponível)". Ambos aceitos; o dono entregou PNG.
- **Impacto:** em 4K (`3840×2160`), o PNG de 152 KB pode pixelar em
  zooms extremos. Provavelmente imperceptível em 32"/50" a 1m.
- **Prioridade:** **P2**. Se o dono tiver um SVG, trocar. Senão,
  fica.

---

### #8 — `iniciarIdleGlobal` e `configurarIdle` redundantes no boot (P2, code smell)

- `src/main.js:41-42` chama os dois com o mesmo `idleTimeoutMs`.
  `iniciarIdleGlobal` já seta `idleMsAtual`. `configurarIdle` seta
  novamente e chama `resetIdleTimer()` — mas como ainda não saímos da
  primeira cena (ATTRACT), o timer é abortado pelo `if (estadoAtual ===
  'ATTRACT') return;`.
- **Impacto:** nenhum. É um code smell.
- **Prioridade:** **P2**.

---

### #9 — Cartão solto fora de qualquer pilar não dá feedback (P2)

- **Seção do checklist:** A.2 (Jogo 1).
- **Código:** `src/cenas/jogo1_ligar.js:125-134`. Se o jogador solta o
  cartão fora de qualquer `.pilar-box`, o cartão volta silenciosamente
  para o pool (sem animação de erro, sem texto). Só dá feedback
  "Não é esse pilar. Tente outro." quando solta **dentro** de um pilar
  errado.
- **Impacto:** jogador que deslizou o dedo e soltou fora pode achar que
  o toque não funcionou. Pequena fricção.
- **Prioridade:** **P2**. Uma linha: mostrar feedback neutro ou repicar
  o cartão ao centro também no caso "sem alvo".

---

### #10 — Jogo 2 não exibe botão "AVANÇAR" ao completar (P2, divergência checklist vs. spec)

- **Checklist A.2:** "ao completar, AVANÇAR aparece".
- **Código:** `src/cenas/jogo2_lanterna.js:140-142`. Ao atingir 5 coletas,
  faz `setTimeout(() => irPara('JOGO3_COLETOR'), 1800)` — auto-transição,
  sem botão.
- **Impacto:** alinha com a spec seção 11 ("5 itens bons coletados →
  JOGO3_COLETOR"), mas **diverge do checklist**. O jogador não decide
  quando passar para o próximo jogo.
- **Prioridade:** **P2** (é um trade-off de UX consciente; basta
  alinhar checklist e spec).

---

### #11 — Paths hardcoded de ícones dos pilares no jogo1 (P2, code smell)

- **`src/cenas/jogo1_ligar.js:17-21`**:
  ```js
  const iconePilar = {
    dialogo:    'assets/pilares/dialogo.svg',
    eficiencia: 'assets/pilares/eficiencia.svg',
    seguranca:  'assets/pilares/seguranca.svg',
  };
  ```
  Se o dono quiser adicionar um 4º pilar via JSON, o Jogo 1 não
  mostraria o ícone. Viola a regra 7.4 ("conteúdo = dado") parcialmente,
  porque o ícone do pilar deveria vir de `principios.json`.
- **Prioridade:** **P2**. Pequena melhoria para V2.

---

## Itens que exigem verificação humana em browser (⏸)

Nenhum destes pôde ser validado nesta sessão. Recomendo que o **dono
execute a seção A do checklist em Chrome** e marque `[x]` ou
`[x] FALHA → ver relatorio#N` conforme observar.

| # | Seção | O que precisa ser checado por humano |
|---|-------|--------------------------------------|
| H1 | A.1 | Console limpo de erros vermelhos ao carregar `localhost:8000`. |
| H2 | A.1 | Network ao carregar: confirmar que os únicos 404 são os cenários (bug #1). |
| H3 | A.2 | Visual da roleta girando 4s → "VAMOS JOGAR!" → ABERTURA. |
| H4 | A.2 | Drag dos 6 cartões no Jogo 1 com mouse/touch simulado. |
| H5 | A.2 | Lanterna seguindo o cursor sem latência perceptível. |
| H6 | A.2 | Cesta do Jogo 3 acompanhando o drag sem travar. |
| H7 | A.2 | Rotação de histórias em 3 partidas consecutivas (completas). |
| H8 | A.3 | Idle 45s em cada cena → volta a ATTRACT. |
| H9 | A.3 | 10s na FINAL → volta sozinho a ATTRACT. |
| H10 | A.4 | Device mode 1080×1920, 1920×1080, 2160×3840, 3840×2160 — sem overflow. |
| H11 | A.5 | Editar `aterro.json` → recarregar → ver texto no jogo. |
| H12 | A.6 | QR escaneável a 1m com celular. |
| H13 | A.7 | Drag funciona em modo touch do DevTools. |
| H14 | A.8 | Lighthouse Performance > 80 e Acessibilidade > 80. |
| H15 | A.9 | Modo offline (DevTools → Offline) e ainda jogar 1 partida. |
| H16 | — | Bungee-Regular renderiza acentos (á, é, ç, ã, etc.). |

---

## Observações dos testes exploratórios

Os testes exploratórios da spec do QA (multi-touch, drag fora da área,
rapid-fire, idle em transição, edição live de JSON, fechar e reabrir)
**são todos de camada humana** — não consigo simular via CLI. O que fiz
foi analisar o código procurando por pontos onde cada um desses
comportamentos poderia quebrar:

- **Multi-touch simultâneo:** `src/cenas/jogo1_ligar.js:82-95` usa
  `cartao.setPointerCapture(pointerId)` e só aceita o mesmo `pointerId`
  nos `onMove/onUp`. Dois dedos em dois cartões diferentes devem
  funcionar em paralelo. Dois dedos no **mesmo** cartão — o segundo é
  ignorado. Comportamento razoável para kiosk.
- **Drag fora da área de jogo:** no Jogo 1 o cartão usa `position: fixed`
  durante drag (CSS linha 283). Não há limite de viewport. Jogador pode
  arrastar até o canto da tela, soltar no "nada" → cartão volta ao
  pool (ver bug #9).
- **5 toques rápidos no mesmo botão:** o callback `anexarBotao` chama
  `acao()` em `pointerup`. Um segundo toque durante a transição de 200ms
  (`app.classList.add('trocando')`) dispararia outro `irPara`. O handler
  de transição poderia conflitar. **Recomendo verificação humana** —
  provável P2 (double-navigate).
- **Idle em meio de transição:** `resetIdleTimer` é chamado ao fim de
  cada `irPara`. Se o idle dispara **durante** a transição (200ms), ele
  chama `irPara('ATTRACT')`. Esse segundo `irPara` vai `await esperar(200)`,
  o que pode gerar `onExit` duplicado. **Verificação humana recomendada.**
- **Editar JSON com jogo rodando:** o `fetch` em `src/conteudo.js` é
  executado uma vez no boot. Edição só aparece ao dar `Ctrl+Shift+R`.
  Matches checklist A.5.
- **Fechar e reabrir navegador no meio:** kiosk inicia do zero → cai em
  ATTRACT. Sem localStorage de sessão. Comportamento correto.

---

## Recomendações ao Arquiteto

### O que exigir do Frontend **antes do evento** (prazo 22/04):

1. **Bug #2 (P1) — Tela de derrota em Jogo 2/Jogo 3.** Um overlay simples
   com `textosUI.jogoN.derrota` + 2s + volta a ATTRACT. Cabe em ~15
   linhas em cada cena.
2. **Bug #1 (P1) — Decidir sobre cenários.** Ou Visual Designer entrega
   as 6 imagens, ou o dono aceita oficialmente os gradientes de fallback
   como visual V1 (e remove os `imagemFundo` dos JSONs para não dar 404
   no Network).

### O que vale arrumar **se sobrar tempo**:

3. **Bug #3 — Incremento de sessão no idle-reset.** 1 linha em
   `src/estado.js`.
4. **Bug #9 — Feedback no drop-sem-alvo** do Jogo 1. 3 linhas.

### O que fica para V2 (pós-evento):

- **Bugs #5, #6, #7, #8, #10, #11** — limpeza, license swap, ícones de
  pilar via JSON, divergência checklist/spec.
- Testes automatizados de fluxo.
- Lighthouse > 90 (hoje não auditado).

### Nota subjetiva de confiança

- **Estrutura de código:** sólida. Máquina de estados limpa, separação
  clara entre cenas, conteúdo fora do código, fontes locais, sem
  dependências externas. Frontend cumpriu o brief.
- **Risco visível no dia do evento:**
  - **Baixo:** crash, loop infinito, tela branca. Código tem onError em
    load de asset, try/catch em onEnter/onExit, QR com try/catch. Não
    identifiquei caminho para travar.
  - **Médio:** percepção de "inacabado" por causa dos cenários de
    fundo ausentes (bug #1). Depende se o gestor compara com
    expectativas.
  - **Médio:** jogador perder no Jogo 2/3 e achar que o kiosk quebrou
    (bug #2). Alta chance de acontecer com público não-gamer.
  - **Baixo a médio:** precisão de toque em TV real, sem como testar
    daqui.
- **Confiança geral: ⚠️ pronto com ressalvas.** Fluxo completo
  provavelmente funciona. Para um evento de imagem do TCE-PE, os P1 (#1
  e #2) valem o esforço de 2-3 horas do Frontend. Sem eles o totem roda,
  mas transmite inacabado.

---

## Veredito final

**⚠️ Pronto com ressalvas.** Fluxo V1 estruturalmente completo e livre
de crashes conhecidos. Recomendo fortemente corrigir os dois **P1**
(#1 cenários, #2 tela de derrota) antes do evento. Os P2 podem ficar
para V2. Além disso, o **dono ou um QA humano precisa executar
pessoalmente os 16 itens ⏸ VERIFICAÇÃO HUMANA** em Chrome antes de
declarar a V1 como aceita. Esta sessão cobre apenas a camada de
validação estática.
