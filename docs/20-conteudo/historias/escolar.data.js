export default {
  "_descricao": "História 2: Transporte escolar intermunicipal. Alunos de CIDADE-A estudam em escolas de CIDADE-B. Disputa sobre vagas, rotas, compensação. Consensualismo = acordo de cooperação educacional.",

  "id": "escolar",
  "titulo": "Transporte escolar compartilhado",

  "cidades": {
    "cidadeA": "Alto Cedro",
    "cidadeB": "Campo Florido"
  },

  "abertura": {
    "rotulo": "MISSÃO",
    "titulo": "Duas cidades. Uma geração. Um impasse.",
    "contexto": "Alunos de Alto Cedro precisam de vagas nas escolas de Campo Florido. Há desacordo sobre rateio do transporte, quantidade de vagas e compensação financeira. O ano letivo está em risco.",
    "imagemFundo": "cenarios/escolar_abertura.jpg"
  },

  "lanterna": {
    "cenario": "cenarios/escolar_lanterna.jpg",
    "dicaOnboarding": "Arraste o dedo para iluminar. Toque nos instrumentos que ajudam a cooperação educacional.",
    "instrumentosAEscolher": [
      "mediacao",
      "acordo-substitutivo",
      "conciliacao",
      "tag",
      "tac"
    ],
    "armadilhas": [
      {
        "id": "acusacao-mutua",
        "nome": "Acusação mútua",
        "icone": "armadilhas/acusacao.svg",
        "explicacao": "Trocar acusações substitui a busca de solução e aprofunda a desconfiança."
      },
      {
        "id": "prazo-perdido",
        "nome": "Prazo perdido",
        "icone": "armadilhas/prazo.svg",
        "explicacao": "Perder o calendário escolar deixa alunos sem aula. Perde o cidadão."
      },
      {
        "id": "falta-transparencia",
        "nome": "Falta de transparência",
        "icone": "armadilhas/opacidade.svg",
        "explicacao": "Esconder custos e dados inviabiliza qualquer cálculo justo de compensação."
      }
    ]
  },

  "vitoria": {
    "titulo": "COOPERAÇÃO EDUCACIONAL",
    "texto": "Alto Cedro e Campo Florido firmaram acordo de cooperação. As vagas e o transporte estão garantidos, com rateio transparente de custos e revisão anual."
  },

  "derrota": {
    "titulo": "ANO LETIVO EM RISCO",
    "texto": "Sem acordo, alunos ficam sem aula. O custo do impasse recai sobre a geração que depende da escola pública."
  }
}
;