# Design System — V1 do Jogo do Consensualismo (TCE-PE)

> **Status:** congelado em 2026-04-19 (V1).
> **Audiência:** Frontend Developer (consome `tokens.css`), QA (referência visual de aceitação) e dono (aprovação).
> **Premissas vindas do brief (`docs/00-brief.md` §10–12) e da spec (`docs/10-v1-spec.md` §4, §15):**
> totem touch a 1m, paleta TCE travada, orientação agnóstica (32" portrait OU 50" landscape), 100% offline.

---

## 1. Princípios de design

1. **Legível do outro lado do stand.** Texto de corpo ≥ 28px na tela física, títulos chamativos ≥ 48px.
   Tudo escala via `clamp()` em função de `vmin` para sobreviver de 1080p a 4K **sem dobrar arte**.
2. **Toque grande, sempre.** Alvo mínimo 80×80px (`--touch-target-min`). Botões de ação ≥ 240×80.
3. **Cor é decoração; forma é informação.** Nenhuma mensagem crítica depende **apenas** de cor.
   Acerto = check + cor; erro = X + cor; armadilha = ícone + texto.
4. **Limpo, geométrico, institucional.** Sem mascotes, sem personagens humanoides, sem ilustração figurativa de pessoas. O TCE-PE é o sujeito.
5. **Movimento serve à compreensão.** Transições curtas (≤ 240ms) entre estados. Animações longas só em ATTRACT (chamariz).

## 2. Paleta

### 2.1. Cores travadas pelo brief
- **Azul TCE** `#003366` — `--color-primary-700` — tom institucional principal.
- **Amarelo TCE** `#ffcc00` — `--color-accent-500` — chamariz, acerto, foco.
- **Branco** `#ffffff` — `--color-neutral-0`.
- **Preto institucional** `#0f172a` — `--color-neutral-900` (não `#000` puro: cinza-azulado profundo, casa melhor com o azul TCE).

### 2.2. Escalas derivadas
- **Primary scale** (azul): `900 → 50` em 10 paradas. `700` é o oficial; tons mais escuros (`800/900`) para fundo de cena escura, mais claros (`100–300`) para cards e estados sutis.
- **Accent scale** (amarelo): `500` é o oficial. `400/300/200/100` para hover, halo, fundo suave de destaque.
- **Neutros**: 11 paradas (Tailwind-like) entre branco e preto.

### 2.3. Estados semânticos
| Token | Cor | Uso |
|---|---|---|
| `--color-success-500` | `#10b981` | Acertos do jogo, +pontos, instrumentos coletados. |
| `--color-warning-500` | `#f59e0b` | Timer baixo, "quase no limite". |
| `--color-error-500`   | `#ef4444` | Armadilhas, -pontos, feedback de erro. |

### 2.4. Overlays
- `--overlay-scrim-strong` (78% azul-escuro): fundo de imagem de abertura, **garante contraste ≥ 4.5:1** do título sobre a foto.
- `--overlay-scrim-soft` (45%): HUD sobre cena de jogo.
- `--overlay-modal` (65% preto): fundo de modal de insight.
- `--overlay-glow-accent` (18% amarelo): halo de foco/hover em botão primário.

### 2.5. Decisões de derivação
- **Por que não usar `#000` para o preto?** O brief lista "preto/cinza escuro" — `#0f172a` (slate-900) preserva a temperatura fria do azul institucional sem arrancar a vista no totem.
- **Por que `#001a33` como fundo de app?** É o azul TCE puxado para escuro. Mantém a identidade mesmo na cena de lanterna (que precisa ser escura) sem virar "preto genérico".
- **Por que verde/vermelho semânticos fora da paleta institucional?** Sucesso e erro são convenções universais (semáforo). Forçar amarelo para "acerto" criaria ambiguidade com o accent geral. A paleta TCE manda no chrome; semáforo manda no feedback de regra de jogo.

## 3. Tipografia

### 3.1. Famílias
- **Inter** (UI, corpo, números) — embarcada local em `assets/fontes/Inter-{Regular,Bold}.woff2`.
- **Bungee** (títulos chamativos, "MISSÃO", "ACORDO FECHADO", "TOQUE PARA COMEÇAR") — embarcada local em `assets/fontes/Bungee-Regular.woff2`.

Bungee é display, geometria block, ótima para stand visto de longe. Inter é a workhorse: legibilidade neutra a qualquer tamanho.

### 3.2. Escala (de `tokens.css`)
| Token | Valor | Uso típico |
|---|---|---|
| `--font-size-display` | `clamp(3.5rem, 9vmin, 7rem)` | Bungee — "TOQUE PARA COMEÇAR", frase-síntese final. |
| `--font-size-h1`      | `clamp(2.25rem, 5.5vmin, 4.5rem)` | Bungee — título de cena (ABERTURA, vitória/derrota). |
| `--font-size-h2`      | `clamp(1.75rem, 4vmin, 3.25rem)`  | Inter Bold — título de seção dentro da cena. |
| `--font-size-h3`      | `clamp(1.375rem, 3vmin, 2.25rem)` | Inter Bold — nome de pilar, nome de instrumento. |
| `--font-size-body-lg` | `clamp(1.25rem, 2.4vmin, 1.875rem)` | Inter — texto de contexto da abertura. |
| `--font-size-body`    | `clamp(1.125rem, 2vmin, 1.5rem)` | Inter — corpo geral, insights. |
| `--font-size-small`   | `clamp(0.95rem, 1.6vmin, 1.25rem)` | Inter — HUD secundária. |
| `--font-size-caption` | `clamp(0.85rem, 1.3vmin, 1.05rem)` | Inter — créditos, legendas QR. |

### 3.3. Hierarquia recomendada
- **Bungee** **só** em display, h1 e tags rotuladas (caixa-alta). Nunca em corpo — vira ilegível.
- **Inter Bold** em h2/h3 e botões.
- **Inter Regular** em body/small/caption.
- Evitar **3 níveis tipográficos** na mesma tela. Manter dois (display/h1 + body) ou três no máximo (h1 + h3 + body).

### 3.4. Acessibilidade
- `line-height` corpo = `1.45` (`--line-height-normal`); títulos display = `1.15`.
- `letter-spacing` em tags caixa-alta = `0.06em` (legibilidade).
- Contraste mínimo verificado: amarelo (`#ffcc00`) sobre azul (`#003366`) = 8.6:1 (AAA); branco sobre azul = 11.7:1; corpo Inter sobre branco = AAA.

## 4. Espaçamento

Grid base **4px** com escala em saltos crescentes (Material/Tailwind híbrido):

| Token | Valor | Uso |
|---|---|---|
| `--space-1` | 4px  | gap fino entre ícone e texto. |
| `--space-2` | 8px  | padding interno de tag/pill. |
| `--space-3` | 12px | gap entre elementos relacionados. |
| `--space-4` | 16px | padding interno padrão de card. |
| `--space-5` | 24px | gap entre cards. |
| `--space-6` | 32px | padding de seção. |
| `--space-7` | 48px | margem inferior de título de cena. |
| `--space-8` | 64px | safe-area lateral em portrait. |
| `--space-9` | 96px | margem de bloco hero. |
| `--space-10`| 128px | safe-area de borda de tela em landscape 4K. |

**Safe area do totem:** sempre deixar **≥ 64px (`--space-8`)** de respiro nas bordas. Conteúdo interativo nunca encosta no chassis.

## 5. Bordas e cantos

| Token | Valor | Uso |
|---|---|---|
| `--radius-xs`  | 4px  | tag pequena. |
| `--radius-sm`  | 8px  | input, badge. |
| `--radius-md`  | 12px | botão, card. |
| `--radius-lg`  | 20px | modal, painel. |
| `--radius-xl`  | 32px | hero panel, cartão drag. |
| `--radius-pill`| 999px | HUD-pill, chips. |
| `--radius-circle` | 50% | avatar, ícone-botão circular. |

Padrão de borda ativa: 2px `--color-primary-700` (`--border-thick`) em estado focado de cartão arrastável.

## 6. Sombras (elevation)

Quatro paradas. Sem `feGaussianBlur` em SVG — só `box-shadow` CSS. Razão: alguns Chromiums de kiosk renderizam blur SVG com glitch.

| Token | Uso |
|---|---|
| `--shadow-elev-1` | tag, badge sutil. |
| `--shadow-elev-2` | card no estado default. |
| `--shadow-elev-3` | card no estado arrastado / hover. |
| `--shadow-elev-4` | modal de insight. |
| `--shadow-glow-accent` | halo amarelo em torno de botão primário focado. |

## 7. Motion

| Token | Valor | Uso |
|---|---|---|
| `--duration-instant` | 80ms  | feedback de toque (regra: ≤50ms perceptual; usamos 80ms para garantir frame). |
| `--duration-fast`    | 150ms | hover/active de botão. |
| `--duration-base`    | 240ms | mostrar/esconder modal de insight. |
| `--duration-slow`    | 400ms | shake de erro, "wiggle" do cartão errado. |
| `--duration-scene`   | 600ms | transição entre cenas (fade + slide). |

Easing default: `--easing-standard` (`cubic-bezier(0.2, 0.8, 0.2, 1)` — clássico Material).
Para entradas dramáticas (vitória de fase): `--easing-emphasized`.

`@media (prefers-reduced-motion: reduce)` em `tokens.css` zera todas as durações — preserva funcionalidade, corta animação.

## 8. Componentes-chave

### 8.1. Botão primário
- Fundo: `--color-accent-500`. Texto: `--color-neutral-900`. Tipografia: Inter Bold em `--font-size-body-lg`, caixa-alta, `letter-spacing: --letter-spacing-wide`.
- Mínimo: 240×80px (`--touch-target-min` no eixo curto).
- Padding: `--space-4 --space-6`.
- Borda: `--radius-md`.
- Estado `:active` (touch-down): scale `0.97`, transição `--duration-instant`. Halo `--shadow-glow-accent` por `--duration-fast` após touch.
- Estado disabled: `opacity: 0.4`, `pointer-events: none`.

### 8.2. Botão secundário
- Fundo: transparente. Borda: 2px `--color-neutral-0`. Texto: `--color-neutral-0`.
- Restante igual ao primário. Uso: "TOCAR NOVAMENTE" na tela final (discreto), "Pular" se houver.

### 8.3. Card de insight
- Fundo: `--color-neutral-0`. Texto: `--color-neutral-900`.
- Borda esquerda 4px sólida `--color-accent-500` (faixa de destaque institucional).
- Padding: `--space-5`. Radius: `--radius-md`. Sombra: `--shadow-elev-2`.
- Conteúdo: ícone (32–48px) + nome (h3) + frase de insight (body).

### 8.4. HUD-pill
- Pílula horizontal pequena. Fundo: `--overlay-scrim-soft` (azul-escuro 45%). Texto: `--color-neutral-0`.
- Padding: `--space-2 --space-4`. Radius: `--radius-pill`.
- Conteúdo: ícone (24px) + número/label.
- Uso: contador "3 de 5", timer regressivo, pontuação no Jogo 3.

### 8.5. Modal de insight (Jogo 2)
- Centralizado, largura `min(80vw, 720px)`.
- Fundo de tela: `--overlay-modal`.
- Card: fundo `--color-neutral-0`, radius `--radius-lg`, sombra `--shadow-elev-4`, padding `--space-7`.
- Cabeçalho: ícone do instrumento (96px) + nome (h2 Bungee).
- Corpo: insight (body-lg).
- Auto-fechamento em 2s ou ao toque em qualquer lugar (já volta ao jogo).

### 8.6. Progress bar / contador de fase
- Trilha: `--color-primary-600`, altura 8px, radius `--radius-pill`.
- Preenchimento: `--color-accent-500`, mesmo radius.
- Transição de largura: `--duration-base --easing-out`.

### 8.7. Cartão arrastável (Jogo 1)
- Fundo: `--color-neutral-0`. Texto: `--color-neutral-900`.
- Padding: `--space-5`. Radius: `--radius-xl` (mais redondo, parece "cartão" físico). Sombra: `--shadow-elev-2`.
- Estado `arrastando`: scale `1.04`, sombra `--shadow-elev-3`, `cursor: grabbing` (irrelevante em touch, mas inofensivo).
- Estado `acerto`: borda 3px `--color-success-500` por `--duration-base`, depois "gruda" no pilar com fade.
- Estado `erro`: shake horizontal 200ms (ease-in-out, `translateX` ±8px) + borda `--color-error-500` por `--duration-slow`.

### 8.8. Caixa-pilar (Jogo 1)
- Fundo: `--color-primary-700`. Texto: `--color-neutral-0`.
- Padding: `--space-6`. Radius: `--radius-lg`. Borda superior 4px `--color-accent-500` (assinatura visual).
- Cabeçalho: ícone do pilar (64px, branco) + nome (h3 caixa-alta).
- Estado `dropAtivo` (cartão pairando dentro): fundo `--color-primary-600`, borda interna 2px tracejada `--color-accent-500`.

### 8.9. Tag/Rótulo "MISSÃO"
- Fundo: `--color-accent-500`. Texto: `--color-neutral-900`. Tipografia: Bungee em `--font-size-small`, caixa-alta, `letter-spacing: --letter-spacing-wide`.
- Padding: `--space-1 --space-3`. Radius: `--radius-xs`.
- Uso: rótulo curto antes do título de abertura.

## 9. Iconografia

### 9.1. Estilo
- **Flat geométrico, linha consistente 2.5px** em canvas 64×64 (`viewBox="0 0 64 64"`).
- Cor primária via `currentColor` — o consumidor decide a cor por CSS.
- Sem gradientes, sem filtros, sem `<title>`/`<desc>`/metadados.
- Cantos das linhas: `stroke-linecap="round" stroke-linejoin="round"` (mais amigável visualmente).

### 9.2. Famílias
- **`assets/ui/`** — ícones de interface puros (toque, check, x, seta, relógio, lanterna, cesta, loop, qr-moldura).
- **`assets/pilares/`** — 3 ícones-símbolo dos pilares (diálogo, eficiência, segurança).
- **`assets/instrumentos/`** — 6 ícones representando instrumentos legais (TAG, TAC, acordo-substitutivo, mediação, conciliação, arbitragem).
- **`assets/itens/`** — 11 ícones do Jogo 3 (6 adequados + 5 inadequados).
- **`assets/armadilhas/`** — 9 ícones específicos por história.

### 9.3. Reuso
Quando o conceito é o mesmo (ex.: "imposição" aparece como item inadequado **e** como armadilha do aterro), o **mesmo SVG** é copiado para os dois caminhos. Não usamos symlinks (rompem em empacotamento).

### 9.4. Acessibilidade dos ícones
- Cada ícone, isolado em 80×80px, deve ser reconhecível a 1m. Detalhes finos somem.
- Em UI, sempre acompanhar o ícone de um label de texto. Ícone sozinho **só** em botões muito convencionais (X de fechar, seta de avançar).

## 10. Conteúdo de imagem (cenários gerados por IA)

Os 6 cenários (3 aberturas + 3 lanternas) ficam em `assets/cenarios/`.

**Regras visuais:**
- Composição **centrada/radial**. Nunca "horizonte fixo no terço inferior" — o crop horizontal/vertical destruiria.
- Paleta restrita: tons frios (azuis profundos, cinzas), com **acento dourado** correspondendo a `--color-accent-500`. Proibir laranjas saturados, verdes vívidos, magentas.
- **Sem pessoas, sem rostos, sem texto, sem logos** dentro da imagem.
- Resolução-alvo ≥ 2048×2048; comprimir para WebP qualidade 75–85, alvo ≤ 500KB.

Prompts prontos em `prompts-ia.md` deste mesmo diretório.

## 11. Cobrindo as duas orientações

Princípio: **layout decide orientação; assets são neutros**.

Em CSS:
```css
@media (orientation: portrait) {
  /* pilares empilham na horizontal acima dos cartões */
}
@media (orientation: landscape) {
  /* pilares empilham na vertical à esquerda dos cartões */
}
```

Imagens de fundo: `background-size: cover; background-position: center`. Centro garantido como zona segura.

## 12. Estados de toque — checklist de ouro

Para qualquer elemento interativo, **três estados visuais explícitos** são obrigatórios:

1. **Default** — visível à primeira leitura.
2. **Tocando** (`:active` ou classe `.tocando`) — feedback em ≤80ms (`--duration-instant`). Scale, halo, ou mudança de cor — algo que diga "registrei".
3. **Confirmação** — após a ação (acerto/erro), feedback visual + textual de pelo menos 240ms (`--duration-base`).

Sem 1+2+3, o jogador não confia no totem.

## 13. O que **não** fazer

- ❌ Importar Google Fonts via `@import` ou `<link href="https://fonts.googleapis.com/...">`. Tudo local.
- ❌ Usar `box-shadow` com mais de 4 camadas (custo de render alto).
- ❌ Animar `width`/`height`/`top`/`left` — usar `transform` e `opacity`.
- ❌ Usar emojis. Sempre SVG da paleta institucional.
- ❌ Texto sobre foto sem `--overlay-scrim-strong`. Falha contraste imediato.
- ❌ Botão menor que `--touch-target-min` (80×80) em qualquer eixo.

---

**Como usar este documento:**
- Frontend: `tokens.css` é a fonte da verdade. Este `.md` é só explicação.
- QA: usar este doc + `mockup.html` como referência para revisar cenas implementadas.
- Dono: aprovar via `mockup.html` (visual) + leitura desta seção 1–8.
