# V1 — Especificação Técnica

> **Audiência:** Frontend Developer (principalmente), Visual Designer (seções de layout), QA (critérios de aceitação).
> **Pré-requisito:** ter lido `00-brief.md` por completo.
> **Status:** CONGELADO em 2026-04-19.

---

## 1. Arquitetura de arquivos — estado-alvo da V1

A estrutura atual (HTMLs soltos, caminhos relativos bagunçados, duplicações `-alt`) será reorganizada para:

```
/
├── index.html                           ← Entry point. Contém roleta + controla todas as cenas.
├── assets/
│   ├── marca/
│   │   └── logo_tce.svg                 ← DONO fornece
│   ├── fontes/
│   │   ├── Inter-Regular.woff2
│   │   ├── Inter-Bold.woff2
│   │   └── Bungee-Regular.woff2
│   ├── ui/                              ← ícones, sprites da UI
│   ├── cenarios/                        ← fundos das 3 histórias + cena da lanterna
│   └── itens/                           ← ícones dos itens do coletor e da lanterna
├── src/
│   ├── main.js                          ← bootstrap + state machine + loop principal
│   ├── conteudo.js                      ← loader de JSONs de conteúdo
│   ├── estado.js                        ← state machine + idle timer
│   ├── orientacao.js                    ← helpers de detecção de orientação
│   ├── audio.js                         ← helpers de SFX (opcional, não bloqueante)
│   ├── cenas/
│   │   ├── attract.js                   ← roleta em idle
│   │   ├── abertura.js                  ← contexto da história sorteada
│   │   ├── jogo1_ligar.js               ← ligar pontos / drag-drop
│   │   ├── jogo2_lanterna.js            ← procurar com lanterna
│   │   ├── jogo3_coletor.js             ← coletor de itens que caem
│   │   └── final.js                     ← frase + QR + créditos
│   └── lib/
│       └── qrcode.min.js                ← biblioteca QR offline (~8KB)
├── styles/
│   ├── base.css                         ← reset, tipografia, cores, variáveis
│   ├── componentes.css                  ← botões, cards, modais comuns
│   ├── cenas.css                        ← estilos de cada cena
│   └── responsivo.css                   ← media queries de orientação
└── conteudo/                            ← JSONs editáveis em runtime (espelho de docs/20-conteudo/)
    ├── config.js
    ├── principios.json
    ├── instrumentos.json
    ├── textos-ui.json
    └── historias/
        ├── aterro.json
        ├── escolar.json
        └── transporte-urbano.json
```

**Importante:**
- `docs/20-conteudo/` é o **formato canônico editável pelo dono**. `conteudo/` na raiz é **cópia de trabalho** que o jogo lê em runtime. Frontend pode usar um script simples de cópia (ou symlink) para sincronizar. Alternativa: o jogo lê direto de `../docs/20-conteudo/` — **não recomendo**, porque polui o caminho de deploy. Decisão: **duplicar na build** (ou manualmente por cópia no início da sessão).
- Todos os arquivos HTML antigos (`memoria4.html`, `garagem.html`, `onibus.html`, etc.) serão **movidos para `_legacy/`** na primeira tarefa do Frontend. Não deletar — servem de consulta.
- Arquivos órfãos (`cai-cai.html`, `clima.html`, `pipoca.html`, `hospital.html`, `estrada*.html`, `municipio.html`, `parque*.html`, `pddoors.html`, `rodovia.html`, `subway.html`, `fase2.html`, `tela4.html.html`, `teste-*.html`, `index - Copia.html`, `*-alt.html`) → **todos para `_legacy/`**. Não apagar.

## 2. Máquina de estados

```
        [ATTRACT] ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ← ←
          │                                                       ↑
          │ toque                                         timeout 45s
          ↓                                                  em qualquer
        [ROLETA_GIRANDO] ← (dura ~4s) →                        estado
          │
          │ auto
          ↓
        [ABERTURA]                                                ↑
          │                                                       ↑
          │ toque "Iniciar"                                       ↑
          ↓                                                       ↑
        [JOGO1_LIGAR]                                             ↑
          │                                                       ↑
          │ vitória ou desistência                                ↑
          ↓                                                       ↑
        [JOGO2_LANTERNA]                                          ↑
          │                                                       ↑
          ↓                                                       ↑
        [JOGO3_COLETOR]                                           ↑
          │                                                       ↑
          ↓                                                       ↑
        [FINAL] ← (auto 10s) → → → → → → → → → → → → → → → → → → →
```

**Regras:**
- Todo estado tem um `onEnter()` que reseta timers, pinta a cena, conecta eventos touch.
- Todo estado tem um `onExit()` que limpa timers, desconecta listeners.
- `idleTimer` global: a cada toque em qualquer lugar, `resetIdleTimer()`. Se expirar 45s, força transição para `ATTRACT`.
- `sessao++` ao entrar em `ATTRACT` vindo de `FINAL` ou idle-reset. Define qual história será sorteada na próxima.

## 3. Idle timer — a coisa mais fácil de esquecer

```js
// src/estado.js (esqueleto)
let idleTimeout = null;
const IDLE_MS = 45_000;

function resetIdleTimer() {
  clearTimeout(idleTimeout);
  idleTimeout = setTimeout(() => irPara('ATTRACT'), IDLE_MS);
}

// Bind global: qualquer toque na tela reseta o timer
document.addEventListener('touchstart', resetIdleTimer, { passive: true });
document.addEventListener('click', resetIdleTimer, { passive: true });
```

Na tela `FINAL`, o idle é 10s em vez de 45s. Implementar como override local.

## 4. Orientação responsiva

Detecção e resposta em CSS puro:

```css
/* base.css — variáveis que dependem de orientação */
:root {
  --orientacao: 'portrait';
  --largura-util: 100vw;
  --altura-util: 100vh;
}

@media (orientation: landscape) {
  :root { --orientacao: 'landscape'; }
  /* layouts lado a lado */
}

@media (orientation: portrait) {
  :root { --orientacao: 'portrait'; }
  /* layouts empilhados */
}
```

Em JS, se precisar ler:
```js
const isPortrait = window.matchMedia('(orientation: portrait)').matches;
```

**Regras de design responsivo V1:**
- Nunca usar `px` fixo em dimensões de layout. Usar `vmin`, `vw`, `vh`, `%`.
- Fontes em `clamp(min, preferred, max)` para escalar entre 1080p e 4K.
- Alvos de toque usar `min-width: 80px; min-height: 80px`.
- Nenhum overflow horizontal em portrait. Nenhum overflow vertical em landscape.

## 5. Touch — padrão de interação

Regra: **nunca usar `mousemove`, `mousedown`, `mouseup`, `hover`**. Usar sempre:

```js
el.addEventListener('touchstart', handler, { passive: false });
el.addEventListener('touchmove',  handler, { passive: false });
el.addEventListener('touchend',   handler, { passive: false });
```

Onde `passive: false` é necessário para `preventDefault()` — impede zoom/scroll acidental no kiosk.

**Feedback tátil visual obrigatório:** todo elemento interativo tem um estado `:active` ou classe `.tocando` que aparece em ≤50ms após o toque. Sem isso, o jogador não sabe se registrou.

**Dupla compatibilidade** (para desenvolvimento em desktop): usar a lib nativa **PointerEvent** (`pointerdown`, `pointermove`, `pointerup`) em vez de touch raw — ela funciona em touch E em mouse, simplificando o teste no laptop.

```js
// Padrão V1 — usar sempre
el.addEventListener('pointerdown', handler);
el.addEventListener('pointermove', handler);
el.addEventListener('pointerup',   handler);
```

Testar no Chrome DevTools em modo device com "touch" ativado.

## 6. Carregamento de conteúdo

```js
// src/conteudo.js
import config from '../conteudo/config.js';

async function carregarTudo() {
  const [principios, instrumentos, textosUI] = await Promise.all([
    fetch('conteudo/principios.json').then(r => r.json()),
    fetch('conteudo/instrumentos.json').then(r => r.json()),
    fetch('conteudo/textos-ui.json').then(r => r.json()),
  ]);
  const historias = await Promise.all(
    config.historiasAtivas.map(id =>
      fetch(`conteudo/historias/${id}.json`).then(r => r.json())
    )
  );
  return { principios, instrumentos, textosUI, historias };
}

function sortearHistoria(historias, sessao) {
  return historias[sessao % historias.length];
}
```

**Obs:** `fetch` de arquivos locais funciona em `file://` apenas com bandeiras do Chromium. Para evitar dor de cabeça, Frontend deve **servir via HTTP local** mesmo em kiosk:
- Em dev: `python3 -m http.server 8000` + `chromium --kiosk http://localhost:8000`.
- Em produção: mesmo comando em script de inicialização do notebook do totem.

## 7. Cena — ATTRACT (roleta idle)

### Visual
- Roleta centralizada, girando infinitamente (animação CSS, não JS — mais eficiente).
- Texto grande em cima: "TOQUE PARA COMEÇAR" piscando suavemente (oscilação de opacidade 80-100%).
- Logo TCE-PE discreto no canto.
- Versão landscape: texto pode ir ao lado; versão portrait: texto acima e abaixo.

### Input
- Qualquer toque em qualquer lugar da tela → `ROLETA_GIRANDO`.

### Estado
- Resetar `idleTimer` interno (não se auto-reset).
- `idleTimer` global fica parado (já está em attract).

## 8. Cena — ROLETA_GIRANDO (transição teatral)

### Comportamento
- Animação de 4 segundos: roleta acelera, desacelera e para em uma posição fixa.
- Ao parar: texto "VAMOS JOGAR!" aparece 500ms.
- Auto-transição para `ABERTURA` após 2s, ou ao toque.
- **Importante:** não tentar dar "resultado aleatório" na roleta. O sorteio de história já é outra mecânica (sessão % 3). Roleta aqui é cerimônia visual.

## 9. Cena — ABERTURA

### Visual
- Fundo específico da história sorteada (definido no JSON `imagemFundo`).
- Overlay escuro 60% para legibilidade.
- Título grande: nome da história.
- Parágrafo curto (≤ 30 palavras) apresentando o conflito das duas cidades.
- Tag "Missão" chamativa.
- Botão grande **"INICIAR MISSÃO"** (mín. 240×80 px).

### Textos
Vêm do JSON da história:
```json
{
  "tituloAbertura": "Duas cidades. Um rio. Uma ponte.",
  "contextoAbertura": "Serra Verde e Boa Vista compartilham..."
}
```

### Input
- Toque em "INICIAR MISSÃO" → `JOGO1_LIGAR`.

## 10. Cena — JOGO 1: Ligar Pontos / Drag-and-Drop

### Objetivo
Ensinar a relação entre os **3 pilares** do consensualismo e exemplos concretos. Mecânica é drag-and-drop: arrastar "casos" para o pilar certo.

### Layout portrait
- 3 "caixas-pilar" no topo (cada uma = um dos 3 pilares: Diálogo e Cooperação / Eficiência e Resultado / Segurança Jurídica e Acordos).
- 6 "cartões-caso" embaralhados na metade inferior.
- Jogador arrasta cada cartão para a caixa-pilar correta.

### Layout landscape
- 3 caixas-pilar na esquerda, uma sobre a outra.
- 6 cartões na direita.

### Conteúdo (vem de `principios.json` — UX Writer define)
```json
{
  "pilares": [
    { "id": "dialogo", "nome": "Diálogo e Cooperação", "cor": "#..." },
    { "id": "eficiencia", "nome": "Eficiência e Resultado", "cor": "#..." },
    { "id": "seguranca", "nome": "Segurança Jurídica e Acordos", "cor": "#..." }
  ],
  "casos": [
    { "texto": "Reunião entre as partes para apresentar interesses", "pilarCorreto": "dialogo" },
    { "texto": "Solução em 90 dias em vez de 5 anos de processo", "pilarCorreto": "eficiencia" },
    { "texto": "Termo assinado com força de título executivo",   "pilarCorreto": "seguranca" },
    // ... total 6
  ]
}
```

### Mecânica
- Toque e arraste cartão para dentro da caixa-pilar.
- Acerto: cartão "gruda" na caixa, toca som suave, mostra check verde.
- Erro: cartão balança e volta ao pool, mostra X vermelho por 500ms. **Não** esconde o cartão — pode tentar de novo.
- Ao ligar os 6 corretamente: toca som de vitória, cartões flutuam, aparece botão **"AVANÇAR"** → `JOGO2_LANTERNA`.

### Timer
- Sem timer explícito que cause derrota. **Idle timer global** (45s) cuida do abandono.
- Opcionalmente exibir cronômetro de referência positivo ("Seu tempo: 00:23") sem pressão.

### Critérios de acerto
- Nome do pilar deve bater exatamente com `pilarCorreto` do cartão.
- Cartão está dentro da caixa se centro do cartão sobrepõe a área da caixa em ≥50%.

## 11. Cena — JOGO 2: Lanterna (herdada, com mudanças)

### Objetivo
Encontrar N itens escondidos em cenário escuro, usando lanterna que segue o dedo.

### Mudanças em relação ao legado (`garagem.html`)
- Touch em vez de mouse.
- Cenário e itens a encontrar **vêm do JSON da história sorteada** (não mais genérico "garagem").
- Cada item encontrado mostra um micro-insight contextual (herda a ideia do "insight modal" do `memoria4.html`).
- Itens "armadilha" (equivalentes ao `t1-t5`) têm nomes claros e explicação do por quê são armadilha.

### Layout
- Cena fullscreen (menos HUD).
- HUD mínimo: contador "X de 5 encontrados" + timer compacto.
- Sidebar do antigo `garagem.html` **sai** (comia 25% da tela — não cabe em portrait).

### Conteúdo do JSON da história
```json
{
  "lanterna": {
    "cenario": "assets/cenarios/aterro_lanterna.jpg",
    "itens": [
      { "id": "acordo",     "icone": "acordo.svg",    "nome": "Acordo Substitutivo", "insight": "..." },
      { "id": "tag",        "icone": "tag.svg",       "nome": "TAG",                  "insight": "..." },
      { "id": "mediacao",   "icone": "mediacao.svg",  "nome": "Mediação",             "insight": "..." },
      { "id": "tac",        "icone": "tac.svg",       "nome": "TAC",                  "insight": "..." },
      { "id": "arbitragem", "icone": "arbitragem.svg","nome": "Arbitragem",           "insight": "..." }
    ],
    "armadilhas": [
      { "id": "imposicao", "icone": "imposicao.svg", "nome": "Imposição unilateral", "explicacao": "Decidir sem ouvir a outra parte trava o acordo futuro." },
      { "id": "hostilidade", ... }
    ]
  }
}
```

### Mecânica
- Lanterna segue o dedo: `touchmove` move um círculo de revelação de ~180px de raio.
- Itens só aparecem quando dentro do círculo. Clicar (touchend sobre item dentro do círculo) coleta.
- Coletar item bom: +1 contador, mostra micro-insight por 2s (modal suave com nome + frase curta), continua.
- Clicar armadilha: descontar 5s do timer, shake visual, mostra motivo por 2s.

### Vitória
- 5 itens bons coletados → `JOGO3_COLETOR`.

### Derrota
- Timer 60s esgota → tela de derrota da fase → voltar para attract (ou dar 1 chance de "continuar" por 10s bonus).

## 12. Cena — JOGO 3: Coletor (nova mecânica)

### Objetivo
Receber "práticas adequadas" que caem do topo; evitar "práticas inadequadas".

### Layout
- **Portrait (recomendado):** tela vertical, ícones caem de cima para baixo, cesta/receptor na base, movido por touch-drag lateral.
- **Landscape:** mesma lógica, mas área mais ampla. Cesta maior.

### Mecânica
- A cada frame, chance de spawnar item no topo com `x` aleatório.
- Velocidade de queda aumenta progressivamente ao longo da partida (0-60s).
- Jogador arrasta o dedo horizontalmente na base da tela para mover a cesta.
- Item colide com cesta:
  - **Adequado:** +10 pontos, toca som positivo, flash verde.
  - **Inadequado:** -5 pontos ou -3s do timer, toca som grave, flash vermelho.
- Item passa da cesta: sem penalidade (não é vida, é pontos).

### Conteúdo (global, não por história)
```json
// instrumentos.json ou coletor.json
{
  "adequados": [
    { "id": "escuta",    "icone": "escuta.svg",    "nome": "Escuta ativa" },
    { "id": "transp",    "icone": "transp.svg",    "nome": "Transparência" },
    { "id": "cooperacao","icone": "cooperacao.svg","nome": "Cooperação" },
    // ... 5-6 total
  ],
  "inadequados": [
    { "id": "impasse",   "icone": "impasse.svg",   "nome": "Impasse" },
    { "id": "imposicao", "icone": "imposicao.svg", "nome": "Imposição" },
    { "id": "mafe",      "icone": "mafe.svg",      "nome": "Má-fé" },
    // ... 5-6 total
  ]
}
```

### HUD
- Pontuação grande no topo.
- Timer regressivo em canto.
- Feedback "+10" / "-5" flutuante brevemente onde o item foi coletado.

### Vitória
- Meta: 80 pontos em 60s.
- Ao atingir: zoom suave, confete visual (CSS), botão "VER RESULTADO" → `FINAL`.

### Derrota
- Timer esgota antes da meta: tela de "Quase lá!" → volta para attract.

### Touch específico
- Arrastar horizontal move cesta (`touchmove` on wrapper).
- Não é preciso "tocar na cesta" — arrastar em qualquer lugar da área de jogo move ela.
- **Desabilitar scroll/zoom** no body com `touch-action: none;`.

## 13. Cena — FINAL

### Visual
- Fundo escuro elegante, logo TCE-PE no topo, frase-síntese grande no centro, QR code à esquerda (ou em baixo em portrait), créditos em rodapé.
- Animação sutil de entrada (fade + slide).
- Auto-reset após 10s → `ATTRACT`.
- Botão discreto "TOCAR NOVAMENTE" para quem quiser reiniciar sem esperar os 10s.

### QR code
- Gerado em runtime pela lib `qrcode.min.js` (embarcada em `src/lib/`).
- URL em `config.js`:
  ```js
  export default {
    qrUrl: 'https://tce.pe.gov.br/consensualismo',  // PLACEHOLDER — dono troca depois
    ...
  };
  ```

### Conteúdo da tela final (de `textos-ui.json` e JSON da história)
```json
{
  "final": {
    "fraseSintese": "Consensualismo: uma alternativa quando o diálogo for possível.",
    "subtexto": "Nem sempre o caminho é o processo. Às vezes, é a conversa.",
    "inspiracao": "Inspirado em casos reais como o acordo de aquisição de trens urbanos entre Mato Grosso e Bahia.",
    "creditos": "Tribunal de Contas do Estado de Pernambuco — 2026"
  }
}
```

## 14. Áudio (opcional, não bloqueante)

- **Regra dura:** nenhuma regra de jogo depende de som.
- Se implementado: Web Audio API como no código legado, sem arquivos externos.
- SFX curtos para: acerto, erro, vitória de fase, toque de botão.
- Sem música de fundo (é ambiente público).
- Botão global de mute no canto inferior, persistente em `localStorage`.

## 15. Fontes embarcadas

Fontes baixadas e hospedadas localmente em `assets/fontes/`:

```css
/* base.css */
@font-face {
  font-family: 'Inter';
  src: url('../assets/fontes/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-display: block;
}
@font-face {
  font-family: 'Inter';
  src: url('../assets/fontes/Inter-Bold.woff2') format('woff2');
  font-weight: 700;
  font-display: block;
}
@font-face {
  font-family: 'Bungee';
  src: url('../assets/fontes/Bungee-Regular.woff2') format('woff2');
  font-display: block;
}
```

**Zero `@import url(https://fonts.googleapis.com/...)` em qualquer CSS.** Se aparecer, reprovar no review.

## 16. Compressão de assets

Imagens atuais pesam absurdo:
- `metro.png` 9.4MB, `parque-abandonado.png` 10MB, `bg.png` 9.5MB, `pista.jpg` 11MB, `nova.png` 7.7MB.

Alvo V1: **nenhum asset > 500KB**. Usar WebP para fotos, SVG para ícones, PNG 8-bit indexado quando inevitável.

Ferramentas sugeridas:
- **Squoosh CLI** (`npx @squoosh/cli --webp auto` — roda via `npx`, não precisa instalar global).
- Ou site `squoosh.app` (funciona no browser, sem instalação).

## 17. Critérios de aceitação (para o QA)

Um build V1 é aceitável se:

- [ ] Abre em Chrome/Chromium local offline (sem internet) via `http://localhost:8000`.
- [ ] Funciona em portrait 1080×1920 **e** em landscape 1920×1080 sem overflow.
- [ ] Todos os toques registram feedback visual em ≤50ms.
- [ ] Ao deixar ocioso por 45s em qualquer cena (exceto FINAL), volta para ATTRACT.
- [ ] Ao chegar em FINAL, volta para ATTRACT sozinho após 10s.
- [ ] Troca de história: fazer 3 partidas em sequência mostra 3 cenários diferentes.
- [ ] Toda mudança de texto no conteúdo (`conteudo/*.json`) reflete no jogo após recarregar, **sem editar HTML/JS**.
- [ ] QR code renderiza e é escaneável com celular.
- [ ] Logo TCE-PE aparece em abertura, final e attract.
- [ ] Nenhuma requisição a domínio externo no Network tab durante toda a partida.
- [ ] Nenhum asset > 500KB.
- [ ] Nenhum texto crítico dependente apenas de cor ou apenas de som.

## 18. Ordem de implementação recomendada (Frontend)

1. **Schema e loader de conteúdo** (vazio mas estruturado) — destrava UX Writer em paralelo.
2. **Setup base** (fontes, variáveis CSS, state machine esqueleto, idle timer).
3. **Cena ATTRACT** (roleta girando + toque → próxima).
4. **Cena ABERTURA** + carregamento de história sorteada.
5. **Cena FINAL** (mesmo sem jogos no meio, fecha o loop).
6. **Jogo 1 (ligar pontos)** — o mais novo, portanto mais risco.
7. **Jogo 2 (lanterna)** — reaproveita ideia do legado.
8. **Jogo 3 (coletor)** — mecânica nova mas simples.
9. **Transições e polimento** entre cenas.
10. **Compressão de assets**, teste cross-orientação, checklist do QA.

## 19. Definições de pronto

**Definição de "pronto" por cena:**
- HTML/CSS/JS implementados.
- Orientação portrait e landscape testadas em Chrome DevTools device mode.
- Toque funcionando via PointerEvent.
- Idle timer funcionando.
- Conteúdo vindo de JSON (não hardcoded).
- Transição de entrada e saída funcionando.
- Sem erros no console.

**Definição de "pronto" da V1 inteira:**
- Todos os critérios da seção 17 atendidos.
- Checklist `docs/40-checklist-totem.md` passou em simulação no notebook de dev.
- Merge de `v1-evento-amupe` → tag `v1.0.0`.

---

**Fim da spec V1.**
