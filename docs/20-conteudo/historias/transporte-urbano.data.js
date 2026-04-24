export default {
  "_descricao": "História 3 (neutra): Contrato de transporte urbano em município único fictício. Análoga ao caso real MG×BA de trens urbanos. Esta é a história mais próxima do caso real — e é a que a tela final vai citar como referência.",

  "id": "transporte-urbano",
  "municipio": "Vilanova do Rio",
  "titulo": "Vilanova do Rio: o contrato parado",

  "abertura": {
    "rotulo": "MISSÃO",
    "titulo": "Um município. Um contrato. Uma saída.",
    "contexto": "Vilanova do Rio enfrentava anos de crise no transporte público. O contrato com a empresa operadora estava defasado, os veículos sucateados e a população insatisfeita. Prefeitura e empresa precisavam encontrar uma saída sem recorrer ao litígio.",
    "imagemFundo": "cenarios/transporte_abertura.jpg"
  },

  "lanterna": {
    "cenario": "cenarios/transporte_lanterna.jpg",
    "instrumentosAEscolher": [
      "interesse-publico",
      "boa-fe",
      "legalidade",
      "conciliacao",
      "arbitragem"
    ],
    "armadilhas": [
      {
        "id": "disputa-politica",
        "nome": "Disputa política",
        "icone": "armadilhas/disputa.svg",
        "explicacao": "Transformar o serviço em palanque paralisa a obra e encarece o projeto."
      },
      {
        "id": "desconfianca",
        "nome": "Desconfiança mútua",
        "icone": "armadilhas/desconfianca.svg",
        "explicacao": "Duvidar da intenção do outro trava qualquer desenho compartilhado de gestão."
      },
      {
        "id": "impasse",
        "nome": "Impasse burocrático",
        "icone": "armadilhas/impasse.svg",
        "explicacao": "Cada parte esperando a outra ceder significa meses a mais sem solução."
      }
    ]
  },

  "vitoria": {
    "titulo": "CASO RESOLVIDO!",
    "texto": "Com esses conhecimentos você ajudou o município a encontrar soluções consensuais para continuidade do transporte público e do interesse da população. Essa história foi inspirada em fatos reais."
  },

  "derrota": {
    "titulo": "CONTRATO PARALISADO",
    "texto": "Sem acordo, o impasse continua. A população de Vilanova do Rio segue enfrentando ônibus lotados e horários imprevisíveis enquanto prefeitura e empresa travam na justiça."
  }
}
;