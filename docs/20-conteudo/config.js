// Configuração global do jogo.
// Editável pelo dono. Mudanças refletem ao recarregar a página.

export default {
  // Histórias ativas. A cada sessão, o jogo sorteia uma dessas pela rotação `sessao % N`.
  // Nome deve bater com o arquivo em ./historias/<nome>.json
  historiasAtivas: ['transporte-urbano'],

  // URL para onde o QR code da tela final aponta.
  // Placeholder até o dono fornecer a URL oficial.
  qrUrl: 'https://forms.gle/LAmH4jpn6XWdDy6q8',

  // Tempo de inatividade (ms) antes de voltar para attract em qualquer tela.
  idleTimeoutMs: 45_000,

  // Tempo (ms) na tela final antes de voltar para attract sozinho.
  finalAutoResetMs: 60_000,

  // Meta de pontos para vencer o Jogo 1 (Coletor).
  coletorMetaPontos: 80,

  // Duração total do Jogo 1 (Coletor) em segundos.
  coletorDuracaoSeg: 40,

  // Velocidade inicial dos itens caindo (pixels por segundo).
  coletorVelocidadeInicial: 180,

  // A cada quantos segundos a velocidade aumenta.
  coletorAceleracaoIntervaloSeg: 8,

  // Quanto a velocidade aumenta a cada intervalo (multiplicador).
  coletorAceleracaoIncremento: 1.45,

  // Duração do Jogo 2 (lanterna) em segundos.
  lanternaDuracaoSeg: 60,

  // Créditos mostrados na tela final (e no rodapé do attract, se fizer sentido).
  creditos: {
    orgao: 'Tribunal de Contas do Estado de Pernambuco',
    ano: 2026,
    logoSrc: 'assets/marca/logo_tce.png',
  },
};
