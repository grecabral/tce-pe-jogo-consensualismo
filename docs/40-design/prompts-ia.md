# Prompts de IA — Cenários de fundo (V1)

> **Para o dono:** estes 6 prompts são para gerar os fundos em **Midjourney v6** (preferido), DALL-E 3 ou Imagen 3. Cole exatamente como está. Depois de gerar, comprima para WebP qualidade 75–85 e salve no caminho indicado em cada bloco. **Alvo: ≤ 500KB por arquivo.**
>
> **Por que esses parâmetros são travados:**
> - **Composição centrada/radial:** o totem pode ser 32" portrait ou 50" landscape — não se sabe até 2 dias antes do evento. Composição radial sobrevive a corte em qualquer proporção; nada importante mora nos cantos.
> - **Aspect 1:1 (square):** gera com sobra para crop em 9:16 ou 16:9. Resolução-alvo ≥ 2048×2048.
> - **Sem pessoas, sem texto, sem logos:** brief §10.3 ("sem mascotes, sem personagens humanoides") + acessibilidade (texto institucional só nas overlays do CSS, nunca dentro da imagem).
> - **Paleta restrita** (azul TCE `#003366` + acento dourado `#ffcc00`): garante coesão visual e contraste com a tipografia institucional.
> - **Sem laranjas/verdes saturados:** quebram a paleta. Eventuais elementos verdes em cenas naturais devem ser **dessaturados, esverdeados quase azulados**.

**Como usar:**
1. Copie o bloco PROMPT inteiro para a ferramenta.
2. Use o trecho NEGATIVE em ferramentas que suportam (Midjourney com `--no`, DALL-E ignora — o suficiente está dentro do prompt principal).
3. Gere 4 variações, escolha a que se centra melhor.
4. Faça upscale para ≥ 2048×2048.
5. Comprima para WebP em [Squoosh](https://squoosh.app) — qualidade 75 a 85, alvo < 500KB.
6. Salve no caminho indicado.

---

## 1. `assets/cenarios/aterro_abertura.jpg`

**Cena:** abertura da história "Aterro compartilhado" (Serra Verde × Boa Vista do Rio).
**Tom emocional:** impasse institucional, peso da decisão, esperança contida.

```
PROMPT:
Aerial symbolic view of two small neighboring fictional Brazilian cities sharing
a landfill issue, editorial illustration style, deep navy blue (#003366) and
golden accent (#ffcc00) palette, centered radial composition with the contested
landfill at the geometric center, twin small-town silhouettes mirrored on left
and right with bridges and roads converging inward, muted dramatic atmosphere,
desaturated colors, soft volumetric institutional light from above, no people,
no text, no logos, no flags, square aspect ratio, 4k detail, institutional
documentary tone, cinematic mood

NEGATIVE: people, characters, faces, hands, text, letters, logos, brand marks,
saturated orange, bright green, magenta, photorealistic faces, watermark
ASPECT: 1:1 (square, centrally composed, safe crop both 9:16 and 16:9)
TOOL: Midjourney v6 (also works in DALL-E 3, Imagen 3)
```

---

## 2. `assets/cenarios/aterro_lanterna.jpg`

**Cena:** Jogo 2 (Lanterna) da história "Aterro". Cena escura, jogador revela com toque.
**Tom:** noturno, profundo, espera por revelação. **Crítico que o centro fique escuro** — a lanterna é que abre.

```
PROMPT:
Dark symbolic isometric scene of a fictional shared municipal landfill yard at
night, deep navy blue (#001a33) ambient with subtle golden specks (#ffcc00) of
light hidden among scattered geometric objects (boxes, pipes, gates, scales,
folders), centered radial composition with even darkness across the frame so
that no single area dominates, soft moody chiaroscuro lighting from a single
hidden source, editorial flat-isometric illustration style, no people, no text,
no logos, square aspect ratio, 4k detail, hidden-object atmosphere, cinematic
ink-and-shadow mood

NEGATIVE: people, characters, faces, hands, text, letters, logos, brand marks,
bright daylight, saturated orange, bright green, magenta, watermark, sharp
single light spot in the center
ASPECT: 1:1 (square, centrally composed, safe crop both 9:16 and 16:9)
TOOL: Midjourney v6
```

---

## 3. `assets/cenarios/escolar_abertura.jpg`

**Cena:** abertura da história "Transporte escolar compartilhado" (Alto Cedro × Campo Florido).
**Tom:** futuro suspenso, geração que depende da decisão.

```
PROMPT:
Aerial symbolic view of two small neighboring fictional Brazilian cities sharing
a school transportation route, editorial illustration style, deep navy blue
(#003366) palette with golden accent (#ffcc00) on a winding shared road,
centered radial composition with two small-town silhouettes mirrored, school
buildings on each side, a single road connecting them through the geometric
center, muted institutional atmosphere, soft daylight from above, no people,
no buses with drivers visible, no text, no logos, square aspect ratio, 4k
detail, documentary editorial tone, hopeful but unresolved mood

NEGATIVE: people, characters, faces, hands, students, drivers, text, letters,
logos, brand marks, saturated orange, neon green, magenta, watermark
ASPECT: 1:1 (square, centrally composed, safe crop both 9:16 and 16:9)
TOOL: Midjourney v6
```

---

## 4. `assets/cenarios/escolar_lanterna.jpg`

**Cena:** Jogo 2 (Lanterna) da história "Escolar". Cena escura — interior simbólico de escola/biblioteca.

```
PROMPT:
Dark symbolic isometric scene of a fictional empty school hallway at night,
abstract architectural geometry, deep navy blue (#001a33) ambient with subtle
golden specks (#ffcc00) of light hidden among scattered geometric objects
(books, lockers, calendars, clocks, folders, pencil cups), centered radial
composition with evenly distributed darkness, editorial flat-isometric
illustration style, soft moody chiaroscuro lighting from a hidden source, no
people, no faces in posters, no text, no logos, square aspect ratio, 4k detail,
hidden-object atmosphere, cinematic ink-and-shadow mood

NEGATIVE: people, characters, faces, hands, students, text, letters, written
numbers, logos, brand marks, bright daylight, saturated orange, neon green,
magenta, watermark
ASPECT: 1:1 (square, centrally composed, safe crop both 9:16 and 16:9)
TOOL: Midjourney v6
```

---

## 5. `assets/cenarios/transporte_abertura.jpg`

**Cena:** abertura da história "Transporte urbano compartilhado" (São Pedro das Pedras × Riachão do Norte). Esta é a história mais próxima do caso real MG×BA citado na tela final.
**Tom:** infraestrutura urbana, fluxo, integração metropolitana.

```
PROMPT:
Aerial symbolic view of two fictional Brazilian conurbated municipalities
sharing a metropolitan BRT/light-rail corridor, editorial illustration style,
deep navy blue (#003366) palette with a luminous golden corridor (#ffcc00)
running through the geometric center connecting both sides, centered radial
composition with twin city silhouettes mirrored left and right, abstract
station nodes along the corridor, muted institutional atmosphere, soft top
light, no people, no vehicles with drivers visible, no text, no logos, square
aspect ratio, 4k detail, documentary editorial tone, infrastructural mood

NEGATIVE: people, characters, faces, hands, drivers, passengers, text,
letters, station signs, logos, brand marks, saturated orange, neon green,
magenta, watermark
ASPECT: 1:1 (square, centrally composed, safe crop both 9:16 and 16:9)
TOOL: Midjourney v6
```

---

## 6. `assets/cenarios/transporte_lanterna.jpg`

**Cena:** Jogo 2 (Lanterna) da história "Transporte". Cena escura — interior simbólico de estação/oficina.

```
PROMPT:
Dark symbolic isometric scene of a fictional empty BRT/light-rail station hall
at night, abstract architectural geometry, deep navy blue (#001a33) ambient
with subtle golden specks (#ffcc00) of light hidden among scattered geometric
objects (turnstiles, ticket gates, benches, signal towers, toolboxes,
folders), centered radial composition with evenly distributed darkness,
editorial flat-isometric illustration style, soft moody chiaroscuro lighting
from a hidden source, no people, no text on signage, no logos, square aspect
ratio, 4k detail, hidden-object atmosphere, cinematic ink-and-shadow mood

NEGATIVE: people, characters, faces, hands, passengers, workers, text,
letters, written numbers, station names, logos, brand marks, bright daylight,
saturated orange, neon green, magenta, watermark
ASPECT: 1:1 (square, centrally composed, safe crop both 9:16 and 16:9)
TOOL: Midjourney v6
```

---

## Checklist pós-geração (para o dono)

Para cada uma das 6 imagens, antes de salvar:

- [ ] Composição é radial/centrada (nada importante nos cantos).
- [ ] Não há pessoas, rostos, mãos ou silhuetas humanas.
- [ ] Não há texto/letras/números legíveis dentro da imagem.
- [ ] Não há logos, brasões ou marcas reais.
- [ ] Paleta é coerente com azul TCE + acento dourado.
- [ ] Resolução final ≥ 2048×2048.
- [ ] Após compressão WebP qualidade 75–85, arquivo ≤ 500KB.
- [ ] Salvo no caminho exato listado no título da seção.

## Se a IA escapar da paleta

Se aparecerem cores fora do permitido (laranja, verde vivo, magenta), **regenere**. Não tente "corrigir em pós" no Photoshop — fica sintético e contrasta mal com a UI.

## Fallback se a geração travar

Se em 2 horas não houver imagem aceitável para um dado slot, usar **fundo de cor sólida** com gradiente radial sutil:
```css
background: radial-gradient(circle at center, var(--color-primary-700), var(--color-primary-900));
```
A cena ainda funciona; perde só a riqueza visual. Documentar no commit que o fundo ficou pendente.
