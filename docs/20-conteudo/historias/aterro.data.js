export default {
  "_descricao": "História 1: Aterro sanitário compartilhado entre duas cidades fictícias. UX Writer preenche todos os campos 'TODO'. Nomes das cidades podem ser mudados livremente (evitar nomes de cidades reais).",

  "id": "aterro",
  "titulo": "Aterro compartilhado",

  "cidades": {
    "cidadeA": "Serra Verde",
    "cidadeB": "Boa Vista do Rio"
  },

  "abertura": {
    "rotulo": "MISSÃO",
    "titulo": "Duas cidades. Um aterro. Um impasse.",
    "contexto": "O aterro de Serra Verde encerrou. Boa Vista do Rio tem capacidade, mas cobra compensação pelos custos e pelo passivo ambiental. Sem acordo, os resíduos se acumulam nas ruas. O tempo corre.",
    "imagemFundo": "cenarios/aterro_abertura.jpg"
  },

  "lanterna": {
    "cenario": "cenarios/aterro_lanterna.jpg",
    "dicaOnboarding": "Arraste o dedo para iluminar. Toque nos instrumentos que ajudam a construir o acordo.",
    "instrumentosAEscolher": [
      "mediacao",
      "tac",
      "acordo-substitutivo",
      "conciliacao",
      "tag"
    ],
    "armadilhas": [
      {
        "id": "imposicao-unilateral",
        "nome": "Imposição unilateral",
        "icone": "armadilhas/imposicao.svg",
        "explicacao": "Decidir sozinho e impor a conta ao outro município trava qualquer acordo futuro."
      },
      {
        "id": "atraso-resposta",
        "nome": "Atraso na resposta",
        "icone": "armadilhas/atraso.svg",
        "explicacao": "Sem resposta em tempo, o problema vira crise e o acordo fica mais caro."
      },
      {
        "id": "hostilidade",
        "nome": "Hostilidade",
        "icone": "armadilhas/hostilidade.svg",
        "explicacao": "Acusar antes de ouvir rompe a confiança e afasta a solução da mesa."
      }
    ]
  },

  "vitoria": {
    "titulo": "ACORDO FECHADO",
    "texto": "Serra Verde e Boa Vista do Rio assinaram um Termo de Ajustamento de Gestão. A destinação dos resíduos está garantida, com rateio de custos e prazos definidos."
  },

  "derrota": {
    "titulo": "IMPASSE CONTINUA",
    "texto": "Sem consenso, os resíduos se acumulam. A conta do impasse sai cara para a população das duas cidades."
  }
}
;