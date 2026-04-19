// Configuração global do jogo.
// Editável pelo dono. Mudanças refletem ao recarregar a página.

export default {
  // Histórias ativas. A cada sessão, o jogo sorteia uma dessas pela rotação `sessao % N`.
  // Nome deve bater com o arquivo em ./historias/<nome>.json
  historiasAtivas: ['aterro', 'escolar', 'transporte-urbano'],

  // URL para onde o QR code da tela final aponta.
  // Placeholder até o dono fornecer a URL oficial.
  qrUrl: 'https://tce.pe.gov.br/consensualismo',

  // Tempo de inatividade (ms) antes de voltar para attract em qualquer tela.
  idleTimeoutMs: 45_000,

  // Tempo (ms) na tela final antes de voltar para attract sozinho.
  finalAutoResetMs: 10_000,

  // Meta de pontos para vencer o Jogo 3 (coletor) em 60s.
  coletorMetaPontos: 80,

  // Duração do Jogo 2 (lanterna) em segundos.
  lanternaDuracaoSeg: 60,

  // Créditos mostrados na tela final (e no rodapé do attract, se fizer sentido).
  creditos: {
    orgao: 'Tribunal de Contas do Estado de Pernambuco',
    ano: 2026,
    logoSrc: 'assets/marca/logo_tce.svg',
  },
};
