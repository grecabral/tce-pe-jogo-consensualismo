# Brief do Projeto — Jogo do Consensualismo (TCE-PE)

> **Status:** CONGELADO em 2026-04-19. Mudanças a partir daqui só por alteração explícita deste documento.
> **Audiência:** todo agente (UX Writer, Visual Designer, Frontend, QA) deve ler este brief **inteiro** antes de começar sua sessão.

---

## 1. Propósito

Jogo interativo para totem, produzido pelo **TCE-PE** (Tribunal de Contas do Estado de Pernambuco), que apresenta o **consensualismo** como uma **alternativa possível** para a resolução de conflitos na gestão pública municipal — sem panfletarismo, e sem sugerir que substitui os processos tradicionais.

## 2. Evento

- **Onde será exposto:** evento da **AMUPE** (Associação Municipalista de Pernambuco), dias **27 e 28 de abril de 2026**.
- **Dono do conteúdo e da aprovação:** TCE-PE (sem participação institucional da AMUPE, que é só o hospedeiro do evento).
- **Deadline interno da V1:** **22 de abril de 2026** (3 dias úteis a partir de 19/04).

## 3. Público e experiência

- **Quem joga:** gestores e servidores públicos municipais passando pelo stand do TCE-PE.
- **Duração da sessão:** **máximo 5 minutos** pelo fluxo completo (roleta → jogo 1 → jogo 2 → jogo 3 → tela final).
- **Sem mediador humano.** O jogo precisa se explicar, acolher, ensinar e se auto-resetar.
- **Mensagem-chave para o jogador:** "o consensualismo é uma ferramenta a mais, útil em casos específicos, que complementa (não substitui) os métodos tradicionais".

## 4. Hardware e ambiente

| Item | Valor |
|---|---|
| Display | **TV 32" vertical (portrait)** OU **TV 50" horizontal (landscape)** — **a decidir 2 dias antes do evento** |
| Resolução | Presumida 1080×1920 (vertical) / 1920×1080 (horizontal), 4K possível |
| Input | **Touch-only**. Sem mouse, sem teclado. |
| Conectividade | **100% offline.** Nenhuma requisição externa em runtime. |
| Áudio | Disponível mas **ambiente pode ser barulhento** → **nenhuma regra de jogo depende de som**. Áudio é opcional/enriquecimento. |
| Processamento | Notebook local (especificação não conhecida ainda) |

**Consequência arquitetural:** o jogo é **responsivo a orientação**. CSS detecta landscape vs portrait via `@media (orientation: ...)` e ajusta layout. Assets visuais devem ser **neutros quanto à orientação** (centrados, sem horizonte óbvio) para servir ambas sem dobrar trabalho de arte.

## 5. Comportamento kiosk

- **Reset automático após 45s de inatividade** → volta para a tela de roleta (attract mode).
- **Reset automático após 10s na tela final** (vitória ou derrota) → volta para a roleta.
- **Roleta = attract mode.** Animação contínua que chama visualmente do outro lado do stand. Sempre leva para o primeiro jogo quando tocada (o resultado do sorteio é decorativo — intencional).

## 6. Narrativa

### 6.1. O que foi abandonado
A narrativa antiga ("ônibus parados impedindo atendimento médico em outra cidade, inspirada no caso MG×BA de trens") **foi descartada**. Era muito específica e mixava o caso real com a ficção do jogo.

### 6.2. Nova narrativa
O jogo se passa em **duas cidades fictícias** que precisam cooperar para resolver um problema de **infraestrutura compartilhada**, **inspirado** pelo caso real MG×BA (mas não replicando-o).

### 6.3. Três histórias rotativas
Cada nova partida sorteia uma das 3 histórias. Todas têm a mesma estrutura e mesma mecânica; muda apenas a "pele narrativa" (nomes das cidades, problema específico, texto da abertura e da vitória, imagem de fundo).

| ID | Título | Resumo |
|---|---|---|
| `aterro` | **Aterro sanitário compartilhado** | Cidade-A teve seu aterro fechado. Cidade-B tem capacidade. Disputa sobre pagamento, prazos e responsabilidade ambiental. Consensualismo = acordo de uso com contrapartida. |
| `escolar` | **Transporte escolar intermunicipal** | Alunos da Cidade-A estudam em escolas da Cidade-B. Disputa sobre vagas, custos de transporte e compensação financeira. Consensualismo = acordo de cooperação educacional. |
| `transporte-urbano` | **Transporte urbano metropolitano (neutra)** | Dois municípios conurbados precisam de um sistema de BRT/VLT compartilhado. Análoga ao caso MG×BA, mas entre municípios fictícios. |

### 6.4. Caso real
O **caso MG×BA (aquisição compartilhada de trens urbanos resolvida por métodos consensuais)** só aparece na **tela final** como "inspiração real", sem virar protagonista narrativo.

### 6.5. Tom
- Não panfletário.
- Não dizer "consensualismo é sempre melhor".
- Usar linguagem de **"uma abordagem nova, possível em casos específicos"**.
- Respeitar a importância dos métodos tradicionais (processo, auditoria, julgamento).

## 7. Conteúdo — espinha conceitual

### 7.1. Três pilares (espinha dorsal do jogo)
Estes três princípios do TCE-PE organizam toda a mensagem:

1. **Diálogo e Cooperação**
2. **Eficiência e Resultado**
3. **Segurança Jurídica e Acordos**

### 7.2. Instrumentos do consensualismo (rascunho — UX Writer valida)
Lista inicial, 100% editável em JSON:
- TAG — Termo de Ajustamento de Gestão
- TAC — Termo de Ajustamento de Conduta
- Acordo Substitutivo
- Mediação
- Conciliação
- Arbitragem

### 7.3. Princípios/técnicas para o quiz (rascunho — UX Writer valida)
As seis técnicas que estavam no `memoria4.html` antigo (Escuta Ativa, Linguagem Eu, Conotação Positiva, Parafrasear, Perguntas Abertas, Resumo) **foram explicitamente marcadas como descartáveis** pelo dono. O UX Writer **deve substituí-las** por princípios alinhados com os 3 pilares da seção 7.1.

### 7.4. Regra dura — conteúdo = dado, não código
**Zero texto de conteúdo hardcoded no HTML.** Todos os textos (aberturas, vitórias, derrotas, nomes de instrumentos, princípios, textos-UI, CTA final) ficam em arquivos JSON em `docs/20-conteudo/`. Alterações no conteúdo não exigem mexer em HTML/JS.

### 7.5. Fontes de referência
O dono vai colocar textos de consulta em **`docs/fontes/`**. O UX Writer deve usar essa pasta como base de consulta. Arquivos com prefixo `rascunho_` não são oficiais e não podem ser citados textualmente.

## 8. Mecânicas dos jogos (V1)

### 8.1. Jogo 1 — Ligar Pontos / Drag-and-Drop Quiz
**Substitui** o antigo "Jogo da Memória" (`memoria4.html`), que não funcionou bem na prática.

**Mecânica V1:** o jogador arrasta conceitos de uma coluna esquerda (ou topo, dependendo da orientação) para o alvo correto na coluna direita (ou base). Erros dão feedback visual suave; acertos mostram um micro-insight educativo.

### 8.2. Jogo 2 — Lanterna (procurar na escuridão)
**Mantém** a mecânica central de `garagem.html` (arrastar lanterna para revelar itens).
**Muda:**
- Cenário (TBD — não necessariamente garagem).
- Itens a encontrar (TBD — Visual Designer + UX Writer decidem).
- Feedback de acerto e erro precisa ser mais claro e educativo.
- **Touch:** substituir `mousemove` por `touchmove`.

### 8.3. Jogo 3 — Coletor de itens que caem
**Substitui** `onibus.html` (corrida + esquiva com mouse).

**Mecânica V1:** itens caem do topo da tela. Jogador move uma "cesta" / "receptor" na base (touch-drag ou toque em faixas). Dois tipos de item:
- **Adequados ao consensualismo** → coletar (pontos positivos).
- **Atrapalham o consensualismo** → evitar (descontam pontos ou tempo).

Naturalmente compatível com touch E com orientação vertical.

### 8.4. Roleta / Attract
**Mantém** visual e animação básica do `index.html`. Ajustes:
- Remover dependências online (Google Fonts).
- Texto "Toque para começar" grande e visível do longe.
- Animação continua rodando quando inativa para atrair olhar.

## 9. Fluxo geral

```
[Attract: roleta girando eternamente]
   ↓ (toque)
[Roleta gira uma vez, mostra "VAMOS JOGAR"]
   ↓ (auto após 2s ou toque)
[Tela de abertura — contexto da história da partida]
   ↓
[Jogo 1: Ligar Pontos]
   ↓ (transição fluida, breve "parabéns")
[Jogo 2: Lanterna]
   ↓ (transição fluida)
[Jogo 3: Coletor]
   ↓
[Tela final: frase-síntese + QR + créditos]
   ↓ (auto após 10s)
[Volta para attract]
```

**Timeout global de ociosidade:** 45s em qualquer tela → volta para attract.

## 10. Identidade visual

### 10.1. Paleta base
- **Azul TCE:** `#003366`
- **Amarelo TCE:** `#ffcc00`
- **Branco:** `#ffffff`
- **Preto / cinza escuro:** `#0f172a`
- Derivações (hover, sucesso, erro, neutros) ficam na spec do Visual Designer.

### 10.2. Tipografia
- **UI:** Inter (embarcada localmente, `.woff2`).
- **Títulos chamativos:** Bungee (embarcada localmente, `.woff2`).
- **Nada de Google Fonts em runtime.** Todas fontes são bundle local.

### 10.3. Tom visual
- **Limpo + didático + gamificado.**
- Sem mascotes. Sem personagens humanoides. Sem ilustração figurativa de pessoas.
- Elementos visuais permitidos: ícones, formas geométricas, cenários (prédios, paisagens, objetos), tipografia expressiva, animações sutis, luz.

### 10.4. Arte gerada por IA
**Liberada.** Visual Designer pode usar Midjourney, DALL-E, Imagen ou equivalente para produzir fundos, ícones e elementos. Deve fornecer os **prompts usados** documentados no entregável.

### 10.5. Logo TCE-PE
Será colocado em `assets/marca/logo_tce.svg` (ou `.png` se for o formato disponível). O Frontend Developer não deve assumir qualquer outro caminho.

## 11. Tela final

Três elementos obrigatórios:
1. **Frase-síntese** (grande, central). Exemplo de tom: "Consensualismo: uma alternativa quando o diálogo for possível".
2. **QR code** renderizado em runtime a partir de URL no `config.js`. URL inicial é **placeholder**; dono vai substituir depois.
3. **Créditos institucionais:** logo TCE-PE + "Tribunal de Contas do Estado de Pernambuco" + ano.

**Não** incluir: convite a falar com equipe humana, formulário de e-mail, ou qualquer captura de dados do visitante.

## 12. Acessibilidade — mínimo pragmático V1

Não há exigência formal de eMAG/WCAG no escopo. V1 adota:
- **Contraste alto** em todos os textos críticos.
- **Alvos de toque mínimos de 80×80px** (é kiosk, há espaço de sobra).
- **Texto de corpo ≥ 28px**, títulos ≥ 48px (leitura a ~1m).
- **Nenhuma informação crítica** apenas por cor ou apenas por som.
- **Timers generosos** e "mais tempo" / "tente de novo" quando fizer sentido.

**Fora de escopo V1:** leitor de tela, Libras, modo de alto contraste alternativo.

## 13. Stack técnica

### V1 (evento AMUPE — 3 dias)
**HTML/CSS/JS vanilla**, sem build, sem Phaser, sem TypeScript, sem transpilação. Roda abrindo `index.html` no Chrome/Chromium. Justificativa: 3 dias não comportam migração de stack com segurança.

### V2 (pós-evento)
Reescrita em **Phaser 3 + Vite + TypeScript**, com testes automatizados e deploy. Fora do escopo da V1.

## 14. Versionamento

- Repositório Git local inicializado em 2026-04-19.
- **Branch `main`:** congelada no commit V0 (`b688913` — snapshot pré-reforma). Não recebe commits durante a V1.
- **Branch `v1-evento-amupe`:** branch ativa de trabalho. Todo commit da V1 vai aqui.
- Após aprovação do evento, `v1-evento-amupe` pode ser merged em `main`.

GitHub remoto será vinculado em separado; não é bloqueador.

## 15. Estrutura de documentos da V1

```
docs/
├── 00-brief.md                          ← este arquivo, congelado
├── 10-v1-spec.md                        ← spec técnica (fluxo, mecânicas, touch, reset)
├── 20-conteudo/                         ← JSONs editáveis (VERDADE sobre textos)
│   ├── config.js                        ← qual história está ativa, URL do QR, etc.
│   ├── principios.json                  ← conteúdo do quiz (princípios)
│   ├── instrumentos.json                ← instrumentos do consensualismo
│   ├── textos-ui.json                   ← textos de interface (botões, avisos)
│   └── historias/
│       ├── aterro.json
│       ├── escolar.json
│       └── transporte-urbano.json
├── 30-prompts-agentes/                  ← prompts prontos para cada sessão
│   ├── 01-ux-writer.md
│   ├── 02-visual-designer.md
│   ├── 03-frontend-developer.md
│   └── 04-qa-tester.md
├── 40-checklist-totem.md                ← roteiro de validação no dia do evento
├── 50-v2-roadmap.md                     ← o que fica para pós-evento
└── fontes/                              ← DONO coloca textos de referência aqui
```

## 16. Elenco de agentes (V1)

| Agente | Sessão separada | Responsabilidade V1 |
|---|---|---|
| **UX Writer / Content** | 1ª | Escreve 3 JSONs de história, define instrumentos e princípios, refina textos-UI. Usa `docs/fontes/` como base. |
| **Visual Designer** | 2ª (paralelo com Frontend quando possível) | Paleta expandida, tipografia, design system V1, prompts para IA, geração dos assets. |
| **Frontend Developer** | 3ª | Reescreve os 4 HTMLs em vanilla, integra JSONs, implementa touch e responsivo, reset ocioso, transições. |
| **QA / Tester** | 4ª | Checklist de totem, testes touch, validação no dia do evento. |

**Não ativos na V1:** Backend Engineer, Mobile Developer, Database Specialist, DevOps, Sound Designer, Accessibility Specialist. Fica para V2 se necessário.

## 17. Ferramentas

### Instaladas/configuradas
- `git` 2.43.0 (pré-existente).
- `gh` 2.90.0 CLI em `~/.local/bin/gh`.
- Git local inicializado; branches `main` e `v1-evento-amupe` criadas.

### A instalar conforme necessidade
- Extensão **Live Server** no VSCode (hot reload enquanto edita HTML).
- `squoosh-cli` ou equivalente para comprimir as imagens gigantes (bg.png 9.5MB, pista.jpg 11MB, etc.).
- Conta em ferramenta de IA de imagem (Midjourney / DALL-E / Imagen) — **o dono escolhe e autentica**.

### Não usar na V1
- MCPs específicos.
- Build tools (Vite, Webpack).
- Transpiladores (Babel, TypeScript).
- Frameworks (React, Vue, Phaser).

## 18. O que ainda está em aberto

Itens que o dono vai resolver em momento específico, não bloqueiam o início:

1. **URL final do QR code** na tela final → placeholder no `config.js` até o dono informar.
2. **Logo TCE-PE oficial** (SVG ou PNG) → dono coloca em `assets/marca/`.
3. **Conteúdo de `docs/fontes/`** → dono coloca textos de referência para o UX Writer consultar.
4. **Nomes fictícios das cidades** das 3 histórias → UX Writer propõe, dono aprova.
5. **Resolução exata da TV** (e se é 32" vertical ou 50" horizontal) → só 2 dias antes do evento. Design responsivo cobre ambos.

## 19. Riscos conhecidos da V1

| Risco | Mitigação |
|---|---|
| 3 dias é prazo curto para 3 mecânicas novas | Manter HTML vanilla, não migrar stack, paralelizar agentes, aceitar polimento para V2. |
| TV pode ser 4K e assets ficarem pixelizados | Visual Designer gera assets em pelo menos 2x da resolução esperada; SVG onde possível. |
| Offline com imagens grandes pode demorar a carregar | Comprimir todos os assets antes do commit final; usar WebP/AVIF onde o Chromium do kiosk suportar. |
| Reset ocioso mal calibrado deixa totem travado | QA valida explicitamente esse caso. Timeout conservador (45s). |
| Touch não funciona em uma das mecânicas | Frontend usa `touchstart/move/end`, testa em modo device do Chrome DevTools e no totem real antes do evento. |
| História sorteada pode parecer "aleatória demais" ao observador | Transições claras mostrando "nova partida = novo cenário". |
| Texto demais afasta passante | UX Writer trabalha com texto curto, hierárquico, escaneável. Nada de parágrafo em tela. |

---

**Fim do brief.** Documentos seguintes (10-v1-spec.md, prompts de agentes, etc.) detalham como cada peça é implementada.
