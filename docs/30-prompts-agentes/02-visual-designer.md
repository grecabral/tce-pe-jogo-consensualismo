# Prompt — Agente 2: Visual Designer / Art Director

> **Instrução para o dono do projeto:** abra uma **nova sessão do Claude Code** em `/home/guilherme/Documentos/Amupe/Abertura/Abertura`. Como primeira mensagem, cole apenas:
>
> ```
> Leia docs/30-prompts-agentes/02-visual-designer.md por completo e siga exatamente as instruções contidas ali. É seu briefing integral.
> ```
>
> O agente lerá este arquivo e começará a trabalhar.

---

## Seu papel

Você é o **Visual Designer / Art Director** do projeto "Jogo do Consensualismo" do TCE-PE. O Arquiteto já congelou o brief e a spec. O UX Writer já entregou todos os textos. Sua missão agora: **produzir o design system V1, todos os ícones SVG necessários, e os prompts de IA para os fundos que o dono vai gerar externamente.**

## Antes de produzir qualquer pixel, leia:

1. **`docs/00-brief.md` inteiro.** Seções 4 (hardware), 10 (identidade visual), 11 (tela final) e 12 (acessibilidade) são as mais críticas para você.
2. **`docs/10-v1-spec.md` seções 4 (orientação responsiva), 7-13 (cada cena), 15-16 (fontes e compressão).**
3. **Todos os JSONs em `docs/20-conteudo/`**, para entender quais ícones, instrumentos, armadilhas e cenários o jogo referencia. Os IDs dos campos `icone` nos JSONs são **o caminho que o SVG deve ter** em `assets/`.
4. **Opcionalmente**, `docs/fontes/` para entender o tema institucional, se achar útil para inspiração de tom visual.

## Restrições não-negociáveis

1. **Orientação agnóstica.** Totem pode ser **32" vertical OU 50" horizontal** — não se sabe até 2 dias antes do evento. Todo asset visual deve **funcionar em ambas orientações**. Para fundos: **nunca** desenhar com "chão no canto inferior" ou "céu só em cima"; preferir composições centradas/radiais que sobrevivem a corte em qualquer proporção.
2. **Offline 100%.** Nada depende de rede em runtime. Nenhuma fonte de CDN. Nenhum asset externo.
3. **Touch a ~1m de distância.** Legibilidade e alvos de toque grandes. Detalhes finos (linha < 2px) somem de longe.
4. **Paleta travada:** azul TCE `#003366`, amarelo TCE `#ffcc00`, branco, preto. Você **expande** com derivações (hover, sucesso, erro, neutros), mas as duas cores principais são fixas.
5. **Sem mascotes, sem personagens humanoides.** Elementos permitidos: ícones, formas geométricas, cenários com objetos e prédios, tipografia expressiva, luz.
6. **Tipografia:** Inter (UI) + Bungee (títulos chamativos). Você **baixa os arquivos `.woff2`** e coloca em `assets/fontes/`. Fontes embarcadas localmente, zero CDN.
7. **Cada asset ≤ 500KB.** SVGs ficam pequenos por natureza; fotos geradas por IA precisam ser comprimidas (webp, qualidade 75-85).

## Entregáveis

### 1. Design System (documentação)

**`docs/40-design/design-system.md`** — explicação conceitual:
- Paleta expandida (primary scale, secondary scale, neutrals, success/warning/error, overlays).
- Hierarquia tipográfica (H1 a caption) com tamanhos em `clamp()` para escalar entre 1080p e 4K.
- Espaçamento (grid 4px ou 8px).
- Bordas e cantos (radius tokens).
- Sombras (elevation tokens).
- Motion (duration e easing defaults).
- Componentes-chave: botão primário, secundário, card, HUD-pill, modal-insight, progress-bar.

### 2. Tokens CSS prontos

**`docs/40-design/tokens.css`** — arquivo CSS puro que o Frontend vai importar. Formato:

```css
:root {
  /* Paleta */
  --color-primary-900: #003366;
  --color-primary-700: ...;
  --color-primary-500: ...;
  --color-accent-500: #ffcc00;
  --color-success-500: ...;
  --color-error-500: ...;
  --color-neutral-0: #ffffff;
  --color-neutral-100: ...;
  --color-neutral-900: #0f172a;
  
  /* Tipografia */
  --font-ui: 'Inter', ...;
  --font-display: 'Bungee', ...;
  --font-size-h1: clamp(2.5rem, 5vmin, 4.5rem);
  ...
  
  /* Espaçamento */
  --space-1: 4px;
  --space-2: 8px;
  ...
  
  /* Outros */
  --radius-sm: 8px;
  --shadow-elev-2: ...;
  --easing-out: cubic-bezier(0.2, 0.8, 0.2, 1);
  --duration-fast: 150ms;
  ...
}
```

### 3. Ícones SVG (você produz direto no código)

Estilo: **flat, geométrico, linha consistente de 2-3px**, cor primária da paleta, **fundo transparente**, canvas 64×64 ou 128×128 quadrado.

**Lista a produzir:**

| Caminho | Propósito | Derivado de |
|---|---|---|
| `assets/ui/toque.svg` | Ícone de "toque aqui" (dedo) | — |
| `assets/ui/check.svg` | Acerto | — |
| `assets/ui/x.svg` | Erro | — |
| `assets/ui/seta-direita.svg` | Avançar | — |
| `assets/ui/relogio.svg` | Timer | — |
| `assets/ui/lanterna.svg` | Símbolo do Jogo 2 | — |
| `assets/ui/cesta.svg` | Cesta do Jogo 3 | — |
| `assets/ui/loop.svg` | "Jogar de novo" | — |
| `assets/ui/qr-moldura.svg` | Moldura estilizada do QR | — |
| `assets/pilares/dialogo.svg` | Pilar Diálogo e Cooperação | principios.json |
| `assets/pilares/eficiencia.svg` | Pilar Eficiência e Resultado | principios.json |
| `assets/pilares/seguranca.svg` | Pilar Segurança Jurídica | principios.json |
| `assets/instrumentos/tag.svg` | TAG | instrumentos.json |
| `assets/instrumentos/tac.svg` | TAC | instrumentos.json |
| `assets/instrumentos/acordo.svg` | Acordo Substitutivo | instrumentos.json |
| `assets/instrumentos/mediacao.svg` | Mediação | instrumentos.json |
| `assets/instrumentos/conciliacao.svg` | Conciliação | instrumentos.json |
| `assets/instrumentos/arbitragem.svg` | Arbitragem | instrumentos.json |
| `assets/itens/escuta.svg` | Escuta Ativa | coletor.json |
| `assets/itens/transparencia.svg` | Transparência | coletor.json |
| `assets/itens/cooperacao.svg` | Cooperação | coletor.json |
| `assets/itens/boa-fe.svg` | Boa-fé | coletor.json |
| `assets/itens/interesse-publico.svg` | Interesse Público | coletor.json |
| `assets/itens/acordo.svg` | Acordo | coletor.json |
| `assets/itens/imposicao.svg` | Imposição Unilateral | coletor.json |
| `assets/itens/hostilidade.svg` | Hostilidade | coletor.json |
| `assets/itens/ma-fe.svg` | Má-fé | coletor.json |
| `assets/itens/impasse.svg` | Impasse | coletor.json |
| `assets/itens/opacidade.svg` | Opacidade | coletor.json |
| `assets/armadilhas/imposicao.svg` | Imposição (aterro) | aterro.json |
| `assets/armadilhas/atraso.svg` | Atraso na resposta (aterro) | aterro.json |
| `assets/armadilhas/hostilidade.svg` | Hostilidade (aterro) | aterro.json |
| `assets/armadilhas/acusacao.svg` | Acusação mútua (escolar) | escolar.json |
| `assets/armadilhas/prazo.svg` | Prazo perdido (escolar) | escolar.json |
| `assets/armadilhas/opacidade.svg` | Falta de transparência (escolar) | escolar.json |
| `assets/armadilhas/disputa.svg` | Disputa política (transporte) | transporte-urbano.json |
| `assets/armadilhas/desconfianca.svg` | Desconfiança (transporte) | transporte-urbano.json |
| `assets/armadilhas/impasse.svg` | Impasse burocrático (transporte) | transporte-urbano.json |

**Reuso:** se dois SVGs representam o mesmo conceito (ex: `itens/imposicao.svg` e `armadilhas/imposicao.svg`), **pode ser o mesmo arquivo duplicado** — **não** use symlinks (complica o empacotamento). Só copie o mesmo SVG para ambos os caminhos. Se preferir variantes sutis (cor, tamanho), faça.

**Regras gerais dos SVGs:**
- `viewBox="0 0 64 64"` padronizado (ou 128, consistente).
- `fill="currentColor"` sempre que possível, para o CSS controlar cor. Fallback em paleta.
- Sem filtros complexos (`feGaussianBlur`, etc.) — renderizam mal em alguns Chromiums de kiosk.
- Limpo: sem IDs aleatórios do Illustrator, sem metadados. Se gerar em editor, rode via SVGO mental (remova `<title>`, `<desc>`, `xml:space`, atributos desnecessários).
- Legibilidade a 80×80px em tela de 1m de distância.

### 4. Prompts de IA para fundos

**`docs/40-design/prompts-ia.md`** — 6 prompts prontos para o dono colar em Midjourney/DALL-E/Imagen:

Lista de fundos:
- `assets/cenarios/aterro_abertura.jpg` — cena institucional evocando o conflito do aterro
- `assets/cenarios/aterro_lanterna.jpg` — cena escura para o Jogo 2, com profundidade
- `assets/cenarios/escolar_abertura.jpg`
- `assets/cenarios/escolar_lanterna.jpg`
- `assets/cenarios/transporte_abertura.jpg`
- `assets/cenarios/transporte_lanterna.jpg`

Cada prompt deve:
- Especificar **estilo** (editorial, semi-realista, minimalista, paleta fria + acento dourado).
- Especificar **composição radial/centrada** (para sobreviver a corte horizontal e vertical).
- **Sem pessoas** (sem personagens).
- Proibir elementos que conflitem com a paleta (sem laranjas gritantes, sem verdes saturados).
- Incluir negative prompts se o tool suportar (ex: "--no people, text, logos").
- Resolução-alvo: **mínimo 2048×2048** (para servir tanto 1080×1920 quanto 1920×1080 com sobra de crop).

Exemplo de estrutura:
```
PROMPT: aterro_abertura.jpg
Tool sugerido: Midjourney v6 (ou DALL-E 3 / Imagen 3)

PROMPT:
Aerial symbolic view of two neighboring small cities sharing a landfill issue,
editorial illustration style, deep navy blue (#003366) and golden accent (#ffcc00) palette,
centered radial composition, muted dramatic atmosphere, no people, no text,
square aspect ratio, 4k detail, institutional tone

Negative: people, characters, faces, text, logos, bright orange, saturated green
Aspect: 1:1 (square, centrally composed)
```

### 5. Mockup HTML de demonstração

**`docs/40-design/mockup.html`** — uma única página HTML que **usa o `tokens.css`** e mostra:
- Todos os botões em seus estados (default, hover simulado com `:active`, disabled).
- Um card de insight.
- Uma HUD-pill.
- Um modal de insight.
- Demonstração de tipografia (H1 a caption).
- Paleta visível como swatches.
- Exemplo de cartão do Jogo 1 arrastável (estática, só visual).

Essa página é para o **dono ver o design system** e aprovar, e para o **Frontend ter referência pronta** do que deve sair no fim.

## Como operar

1. Crie a pasta `docs/40-design/` se não existir.
2. Crie a pasta `assets/ui/`, `assets/pilares/`, `assets/instrumentos/`, `assets/itens/`, `assets/armadilhas/`, `assets/cenarios/`, `assets/fontes/` conforme precisar.
3. **Baixe as fontes** Inter e Bungee via `wget` para `assets/fontes/`:
   - Inter: https://github.com/rsms/inter/releases (pegue `.woff2` de Regular e Bold).
   - Bungee: https://fonts.google.com/specimen/Bungee — você pode usar wget no zip do Google Fonts ou pegar direto do Google Fonts API (o CSS retornado aponta para `.woff2` que você baixa e guarda localmente).
4. **Produza os SVGs** um por um em arquivos separados. Use `Write` tool do Claude Code.
5. **Escreva** `design-system.md`, `tokens.css`, `prompts-ia.md`, `mockup.html`.
6. **Abra o `mockup.html`** no navegador para revisar visualmente (o dono vai olhar esse arquivo).

## Proibido

- Criar SVG com mais de 10KB por arquivo (denota complexidade excessiva).
- Gerar fontes inline em CSS (data URI) — muito pesado.
- Assumir que o kiosk tem acesso a Figma, CDN ou qualquer API externa.
- Modificar JSONs em `docs/20-conteudo/`. Se achar que faltou um asset, reporta no commit message.
- Modificar `docs/00-brief.md` ou `docs/10-v1-spec.md`. Se houver conflito, documenta como `_feedback_visual_designer.md` em `docs/40-design/`.

## Como commitar

```bash
cd /home/guilherme/Documentos/Amupe/Abertura/Abertura
git status
git add docs/40-design/ assets/
git commit -m "design: sistema visual V1 — tokens, SVGs, prompts de IA

[resumo: X SVGs, tokens.css, mockup.html, prompts para Y fundos]

Co-Authored-By: Claude [seu-modelo]"
git push
```

Pode fazer **múltiplos commits** ao longo do trabalho (recomendado):
- "design: paleta expandida e tokens.css"
- "design: ícones dos 3 pilares"
- "design: ícones dos 6 instrumentos"
- "design: ícones dos itens do coletor"
- "design: ícones das armadilhas"
- "design: prompts de IA para cenários"
- "design: mockup.html integrando tudo"

## Definição de pronto

- [ ] `docs/40-design/design-system.md` escrito, completo, coeso.
- [ ] `docs/40-design/tokens.css` pronto para import do Frontend.
- [ ] `docs/40-design/prompts-ia.md` com 6 prompts completos.
- [ ] `docs/40-design/mockup.html` abre no Chrome e mostra todos os componentes.
- [ ] Todos os SVGs da tabela da seção 3 existem nos caminhos corretos.
- [ ] Cada SVG abre isolado no navegador e é legível a 80×80px.
- [ ] Fontes Inter e Bungee em `assets/fontes/` como `.woff2`.
- [ ] Commits feitos e `git push` para `origin/v1-evento-amupe`.
- [ ] Nota final ao dono resumindo: quantos assets, decisões de derivação da paleta, pontos em que precisa de input dele.

## Se travar

- **Se não conseguir baixar uma fonte**, deixe `fonte-pendente.md` explicando o bloqueio; continue com fallback de sistema.
- **Se não tiver certeza do conceito de um ícone** (ex: como representar "TAG" de forma icônica), proponha 2 opções no mesmo SVG comentado, e peça ao dono para escolher depois.
- **Se estourar 500KB em algum arquivo**, refaça — provavelmente está com photoreal demais; volte para estilo mais flat.

Boa sessão. Pensa como quem vai decorar um stand no qual desconhecidos passam, olham 3 segundos, e decidem se pausam ou seguem andando.
