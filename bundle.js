// docs/20-conteudo/config.js
var config_default = {
  // Histórias ativas. A cada sessão, o jogo sorteia uma dessas pela rotação `sessao % N`.
  // Nome deve bater com o arquivo em ./historias/<nome>.json
  historiasAtivas: ["transporte-urbano"],
  // URL para onde o QR code da tela final aponta.
  // Placeholder até o dono fornecer a URL oficial.
  qrUrl: "https://forms.gle/LAmH4jpn6XWdDy6q8",
  // Tempo de inatividade (ms) antes de voltar para attract em qualquer tela.
  idleTimeoutMs: 45e3,
  // Tempo (ms) na tela final antes de voltar para attract sozinho.
  finalAutoResetMs: 6e4,
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
    orgao: "TCE-PE",
    ano: 2026,
    logoSrc: "assets/marca/logo_tce.png"
  }
};

// docs/20-conteudo/principios.data.js
var principios_data_default = {
  "_descricao": "Conte\xFAdo do Jogo 1 (Ligar Pontos). UX Writer preenche. Estrutura: 3 pilares institucionais \xD7 6 casos concretos (2 por pilar, o jogador arrasta cada caso para o pilar correto).",
  "pilares": [
    {
      "id": "dialogo",
      "nome": "Di\xE1logo e Coopera\xE7\xE3o",
      "descricaoCurta": "Ouvir antes de decidir. Buscar interesses comuns."
    },
    {
      "id": "eficiencia",
      "nome": "Efici\xEAncia e Resultado",
      "descricaoCurta": "Resolver o problema real no menor tempo poss\xEDvel."
    },
    {
      "id": "seguranca",
      "nome": "Seguran\xE7a Jur\xEDdica e Acordos",
      "descricaoCurta": "Compromissos claros, formais e com validade legal."
    }
  ],
  "casos": [
    {
      "id": "caso1",
      "texto": "Reuni\xE3o entre as duas partes para entender os interesses de cada lado.",
      "pilarCorreto": "dialogo",
      "insightAcerto": "Ouvir o outro lado revela caminhos que a disputa esconde."
    },
    {
      "id": "caso2",
      "texto": "Convidar um terceiro neutro para mediar a conversa sobre o conflito.",
      "pilarCorreto": "dialogo",
      "insightAcerto": "Um terceiro imparcial ajuda a destravar o di\xE1logo sem tomar partido."
    },
    {
      "id": "caso3",
      "texto": "Resolver o impasse em 90 dias em vez de cinco anos na Justi\xE7a.",
      "pilarCorreto": "eficiencia",
      "insightAcerto": "Quando o problema \xE9 atual, a solu\xE7\xE3o tamb\xE9m precisa ser."
    },
    {
      "id": "caso4",
      "texto": "Manter o servi\xE7o p\xFAblico funcionando durante toda a negocia\xE7\xE3o.",
      "pilarCorreto": "eficiencia",
      "insightAcerto": "Bom acordo \xE9 o que n\xE3o deixa o cidad\xE3o sem atendimento."
    },
    {
      "id": "caso5",
      "texto": "Termo assinado pelas partes com for\xE7a de t\xEDtulo executivo.",
      "pilarCorreto": "seguranca",
      "insightAcerto": "O acordo escrito vale como senten\xE7a: quebrou, cobra-se direto."
    },
    {
      "id": "caso6",
      "texto": "Cl\xE1usula que define prazos, contrapartidas e penalidades por descumprimento.",
      "pilarCorreto": "seguranca",
      "insightAcerto": "Regras claras hoje evitam disputa amanh\xE3."
    }
  ]
};

// docs/20-conteudo/instrumentos.data.js
var instrumentos_data_default = {
  "_descricao": "Lista can\xF4nica de instrumentos do consensualismo.",
  "instrumentos": [
    {
      "id": "interesse-publico",
      "nome": "Interesse p\xFAblico",
      "nomeCompleto": "Interesse p\xFAblico",
      "icone": "instrumentos/interesse p\xFAblico.png",
      "insight": "O interesse p\xFAblico deve ser o alvo absoluto das pr\xE1ticas consensuais."
    },
    {
      "id": "boa-fe",
      "nome": "Boa-f\xE9",
      "nomeCompleto": "Boa-f\xE9",
      "icone": "instrumentos/empatia.png",
      "insight": "Com boa-f\xE9 busca-se uma solu\xE7\xE3o justa e equilibrada, evitando abusos ou protela\xE7\xF5es."
    },
    {
      "id": "legalidade",
      "nome": "Legalidade",
      "nomeCompleto": "Legalidade",
      "icone": "instrumentos/legalidade.png",
      "insight": "A legalidade garante que a vontade das partes n\xE3o viole direitos indispon\xEDveis, a ordem p\xFAblica ou o interesse p\xFAblico."
    },
    {
      "id": "conciliacao",
      "nome": "Concilia\xE7\xE3o",
      "nomeCompleto": "Concilia\xE7\xE3o",
      "icone": "instrumentos/concilia\xE7\xE3o.png",
      "insight": "Um terceiro prop\xF5e caminhos poss\xEDveis para o acordo. As partes avaliam e decidem se aceitam."
    },
    {
      "id": "arbitragem",
      "nome": "Arbitragem",
      "nomeCompleto": "Arbitragem",
      "icone": "instrumentos/arbitragem.png",
      "insight": "As partes escolhem um especialista para decidir o conflito. A decis\xE3o tem for\xE7a vinculante, como alternativa ao Judici\xE1rio."
    },
    {
      "id": "mediacao",
      "nome": "Media\xE7\xE3o",
      "nomeCompleto": "Media\xE7\xE3o",
      "icone": "instrumentos/mediacao.svg",
      "insight": "Um terceiro imparcial facilita o di\xE1logo e ajuda as partes a constru\xEDrem juntas a pr\xF3pria solu\xE7\xE3o, sem decidir por elas."
    },
    {
      "id": "tag",
      "nome": "TAG",
      "nomeCompleto": "Termo de Ajustamento de Gest\xE3o",
      "icone": "instrumentos/tag.svg",
      "insight": "Acordo entre gestor e Tribunal de Contas para corrigir falhas com prazos e metas."
    },
    {
      "id": "tac",
      "nome": "TAC",
      "nomeCompleto": "Termo de Ajustamento de Conduta",
      "icone": "instrumentos/tac.svg",
      "insight": "Acordo firmado com o Minist\xE9rio P\xFAblico para adequar uma conduta \xE0 lei."
    },
    {
      "id": "acordo-substitutivo",
      "nome": "Acordo Substitutivo",
      "nomeCompleto": "Acordo Substitutivo",
      "icone": "instrumentos/acordo.svg",
      "insight": "Substitui a san\xE7\xE3o administrativa por compromissos assumidos pelo ente."
    }
  ]
};

// docs/20-conteudo/coletor.data.js
var coletor_data_default = {
  "_descricao": "Itens do Jogo 1 (Coletor). Caem do topo da tela. Jogador move cesta para pegar os ADEQUADOS e evitar os INADEQUADOS. Conte\xFAdo compartilhado entre as hist\xF3rias (n\xE3o muda por sess\xE3o).",
  "adequados": [
    {
      "id": "boa-fe",
      "nome": "Boa-f\xE9",
      "icone": "itens/boa-fe.svg",
      "cor": "#10b981"
    },
    {
      "id": "rapidez",
      "nome": "Rapidez",
      "icone": "itens/interesse-publico.svg",
      "cor": "#10b981"
    },
    {
      "id": "dialogo",
      "nome": "Di\xE1logo",
      "icone": "itens/cooperacao.svg",
      "cor": "#10b981"
    },
    {
      "id": "etica",
      "nome": "\xC9tica",
      "icone": "itens/transparencia.svg",
      "cor": "#10b981"
    },
    {
      "id": "empatia",
      "nome": "Empatia",
      "icone": "itens/escuta.svg",
      "cor": "#10b981"
    },
    {
      "id": "acordos-mutuos",
      "nome": "Acordos m\xFAtuos",
      "icone": "itens/acordo.svg",
      "cor": "#10b981"
    },
    {
      "id": "cooperacao",
      "nome": "Coopera\xE7\xE3o",
      "icone": "itens/cooperacao.svg",
      "cor": "#10b981"
    },
    {
      "id": "escuta",
      "nome": "Escuta",
      "icone": "itens/escuta.svg",
      "cor": "#10b981"
    }
  ],
  "inadequados": [
    {
      "id": "polarizacao",
      "nome": "Polariza\xE7\xE3o",
      "icone": "itens/hostilidade.svg",
      "cor": "#ef4444"
    },
    {
      "id": "processo",
      "nome": "Processo",
      "icone": "itens/impasse.svg",
      "cor": "#ef4444"
    },
    {
      "id": "adversario",
      "nome": "Advers\xE1rio",
      "icone": "itens/ma-fe.svg",
      "cor": "#ef4444"
    },
    {
      "id": "imposicao",
      "nome": "Imposi\xE7\xE3o",
      "icone": "itens/imposicao.svg",
      "cor": "#ef4444"
    },
    {
      "id": "julgado",
      "nome": "Julgado",
      "icone": "itens/opacidade.svg",
      "cor": "#ef4444"
    }
  ]
};

// docs/20-conteudo/textos-ui.data.js
var textos_ui_data_default = {
  "_descricao": "Textos curtos da interface. Qualquer string que aparece na tela e n\xE3o \xE9 espec\xEDfica de uma hist\xF3ria vem daqui. Estrutura agrupada por cena.",
  "attract": {
    "chamada": "TOQUE PARA COME\xC7AR",
    "subtitulo": "Conhe\xE7a o consensualismo na gest\xE3o p\xFAblica"
  },
  "roletaGirando": {
    "mensagemParou": "Bem-vindo ao Jogo!\nHoje queremos te convidar para conhecer o Consensualismo"
  },
  "introConsensualism": {
    "titulo": "Mas o que \xE9 Consensualismo?",
    "texto": "Sabe aquele problema na sua prefeitura que parece n\xE3o ter sa\xEDda? Uma obra parada h\xE1 anos porque o <strong>pre\xE7o dos materiais</strong> subiu, ou um <strong>contrato de coleta de lixo</strong> travado por uma <strong>briga judicial</strong> sem fim?\n\n<strong>Di\xE1logo</strong>, <strong>coopera\xE7\xE3o</strong> e <strong>boa-f\xE9</strong> podem ser uma alternativa para encontrar solu\xE7\xF5es <strong>r\xE1pidas e eficientes</strong> em prol do <strong>interesse p\xFAblico</strong>.\n\nO Consensualismo \xE9 esse caminho!",
    "botaoContinuar": "ENTENDI, VAMOS JOGAR"
  },
  "abertura": {
    "rotuloMissao": "MISS\xC3O",
    "botaoIniciar": "INICIAR MISS\xC3O"
  },
  "jogo1": {
    "titulo": "Colete as pr\xE1ticas certas",
    "instrucao": "Arraste a cesta para pegar pr\xE1ticas adequadas. Evite as inadequadas.",
    "tituloModal": "Vamos come\xE7ar!",
    "instrucaoModal": "Toque diretamente nos itens para coletar os valores do consensualismo. Evite os que atrapalham!",
    "botaoIniciar": "JOGAR",
    "hudPontuacao": "Pontos",
    "hudTempo": "Tempo",
    "aoAtingirMeta": "Parab\xE9ns! Voc\xEA reconheceu as pr\xE1ticas do consensualismo.",
    "derrota": "Faltou pouco. Cada pr\xE1tica conta."
  },
  "jogo2": {
    "titulo": "Ligue cada caso ao seu pilar",
    "instrucao": "Selecione cada cart\xE3o e toque no pilar que ele representa.",
    "tituloModal": "Agora vamos praticar!",
    "instrucaoModal": "Agora que voc\xEA entendeu o conceito e sabe os valores do consensualismo, vamos ver como ele funciona na pr\xE1tica. Conecte cada caso ao pilar correto.",
    "botaoIniciar": "JOGAR",
    "feedbackAcerto": "Certo!",
    "feedbackErro": "N\xE3o \xE9 esse pilar. Tente outro.",
    "botaoAvancar": "AVAN\xC7AR",
    "aoCompletar": "Voc\xEA conectou os tr\xEAs pilares do consensualismo."
  },
  "jogo3": {
    "titulo": "Encontre os instrumentos",
    "tituloTransicao": "Uma cidade e um trajeto de solu\xE7\xE3o.",
    "textoTransicao": "O risco da paralisia: um contrato de transporte p\xFAblico de passageiros defasado pela infla\xE7\xE3o e imprevistos t\xE9cnicos amea\xE7ava deixar a popula\xE7\xE3o sem transporte.\n\nO contratado alegava preju\xEDzo na opera\xE7\xE3o e o gestor temia assinar aditivos e enfrentar multas ou longos processos por anos.",
    "botaoTransicao": "Agir",
    "tituloListaItens": "Encontre os instrumentos:",
    "instrucaoJogo": "Ilumine o cen\xE1rio e toque nos instrumentos do consensualismo para destravarem o caso.",
    "hudContador": "Encontrados",
    "feedbackArmadilha": "Isso trava o acordo.",
    "botaoAvancar": "CONTINUAR",
    "derrota": "O tempo acabou. Acordos tamb\xE9m precisam de ritmo."
  },
  "final": {
    "fraseSintese": "Consensualismo: uma alternativa quando o di\xE1logo \xE9 poss\xEDvel.",
    "subtexto": "N\xE3o substitui processo, auditoria ou julgamento. Oferece um caminho a mais quando o di\xE1logo \xE9 vi\xE1vel e o interesse p\xFAblico ganha com a solu\xE7\xE3o negociada.",
    "inspiracao": "Sabemos que o di\xE1logo e a constru\xE7\xE3o pactuada de solu\xE7\xF5es podem ajudar a aumentar a efici\xEAncia da Administra\xE7\xE3o P\xFAblica. Por isso, sua opini\xE3o \xE9 importante! Queremos entender sua percep\xE7\xE3o sobre esse tema. Acesse o QR Code ao lado, responda a pesquisa e conhe\xE7a o fato real. Contamos com voc\xEA!",
    "qrLegenda": "Sua opini\xE3o \xE9 importante! Acesse o QR Code ao lado e responda a pesquisa. Contamos com voc\xEA!",
    "qrLegendaVitoria": "Sua opini\xE3o \xE9 importante! Acesse o QR Code ao lado e responda a pesquisa. Contamos com voc\xEA!",
    "botaoJogarNovo": "VOLTAR AO IN\xCDCIO"
  },
  "acessibilidade": {
    "mensagemIdle": "Volta automaticamente em {segundos}s",
    "botaoMute": "Silenciar som",
    "botaoUnmute": "Ativar som"
  }
};

// docs/20-conteudo/historias/transporte-urbano.data.js
var transporte_urbano_data_default = {
  "_descricao": "Hist\xF3ria 3 (neutra): Contrato de transporte urbano em munic\xEDpio \xFAnico fict\xEDcio. An\xE1loga ao caso real MG\xD7BA de trens urbanos. Esta \xE9 a hist\xF3ria mais pr\xF3xima do caso real \u2014 e \xE9 a que a tela final vai citar como refer\xEAncia.",
  "id": "transporte-urbano",
  "municipio": "Vilanova do Rio",
  "titulo": "Vilanova do Rio: o contrato parado",
  "abertura": {
    "rotulo": "MISS\xC3O",
    "titulo": "Um munic\xEDpio. Um contrato. Uma sa\xEDda.",
    "contexto": "Vilanova do Rio enfrentava anos de crise no transporte p\xFAblico. O contrato com a empresa operadora estava defasado, os ve\xEDculos sucateados e a popula\xE7\xE3o insatisfeita. Prefeitura e empresa precisavam encontrar uma sa\xEDda sem recorrer ao lit\xEDgio.",
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
        "nome": "Disputa pol\xEDtica",
        "icone": "armadilhas/disputa.svg",
        "explicacao": "Transformar o servi\xE7o em palanque paralisa a obra e encarece o projeto."
      },
      {
        "id": "desconfianca",
        "nome": "Desconfian\xE7a m\xFAtua",
        "icone": "armadilhas/desconfianca.svg",
        "explicacao": "Duvidar da inten\xE7\xE3o do outro trava qualquer desenho compartilhado de gest\xE3o."
      },
      {
        "id": "impasse",
        "nome": "Impasse burocr\xE1tico",
        "icone": "armadilhas/impasse.svg",
        "explicacao": "Cada parte esperando a outra ceder significa meses a mais sem solu\xE7\xE3o."
      }
    ]
  },
  "vitoria": {
    "titulo": "CASO RESOLVIDO!",
    "texto": "Com esses conhecimentos voc\xEA ajudou o munic\xEDpio a encontrar solu\xE7\xF5es consensuais para continuidade do transporte p\xFAblico e do interesse da popula\xE7\xE3o. Essa hist\xF3ria foi inspirada em fatos reais."
  },
  "derrota": {
    "titulo": "CONTRATO PARALISADO",
    "texto": "Sem acordo, o impasse continua. A popula\xE7\xE3o de Vilanova do Rio segue enfrentando \xF4nibus lotados e hor\xE1rios imprevis\xEDveis enquanto prefeitura e empresa travam na justi\xE7a."
  }
};

// docs/20-conteudo/historias/aterro.data.js
var aterro_data_default = {
  "_descricao": "Hist\xF3ria 1: Aterro sanit\xE1rio compartilhado entre duas cidades fict\xEDcias. UX Writer preenche todos os campos 'TODO'. Nomes das cidades podem ser mudados livremente (evitar nomes de cidades reais).",
  "id": "aterro",
  "titulo": "Aterro compartilhado",
  "cidades": {
    "cidadeA": "Serra Verde",
    "cidadeB": "Boa Vista do Rio"
  },
  "abertura": {
    "rotulo": "MISS\xC3O",
    "titulo": "Duas cidades. Um aterro. Um impasse.",
    "contexto": "O aterro de Serra Verde encerrou. Boa Vista do Rio tem capacidade, mas cobra compensa\xE7\xE3o pelos custos e pelo passivo ambiental. Sem acordo, os res\xEDduos se acumulam nas ruas. O tempo corre.",
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
        "nome": "Imposi\xE7\xE3o unilateral",
        "icone": "armadilhas/imposicao.svg",
        "explicacao": "Decidir sozinho e impor a conta ao outro munic\xEDpio trava qualquer acordo futuro."
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
        "explicacao": "Acusar antes de ouvir rompe a confian\xE7a e afasta a solu\xE7\xE3o da mesa."
      }
    ]
  },
  "vitoria": {
    "titulo": "ACORDO FECHADO",
    "texto": "Serra Verde e Boa Vista do Rio assinaram um Termo de Ajustamento de Gest\xE3o. A destina\xE7\xE3o dos res\xEDduos est\xE1 garantida, com rateio de custos e prazos definidos."
  },
  "derrota": {
    "titulo": "IMPASSE CONTINUA",
    "texto": "Sem consenso, os res\xEDduos se acumulam. A conta do impasse sai cara para a popula\xE7\xE3o das duas cidades."
  }
};

// docs/20-conteudo/historias/escolar.data.js
var escolar_data_default = {
  "_descricao": "Hist\xF3ria 2: Transporte escolar intermunicipal. Alunos de CIDADE-A estudam em escolas de CIDADE-B. Disputa sobre vagas, rotas, compensa\xE7\xE3o. Consensualismo = acordo de coopera\xE7\xE3o educacional.",
  "id": "escolar",
  "titulo": "Transporte escolar compartilhado",
  "cidades": {
    "cidadeA": "Alto Cedro",
    "cidadeB": "Campo Florido"
  },
  "abertura": {
    "rotulo": "MISS\xC3O",
    "titulo": "Duas cidades. Uma gera\xE7\xE3o. Um impasse.",
    "contexto": "Alunos de Alto Cedro precisam de vagas nas escolas de Campo Florido. H\xE1 desacordo sobre rateio do transporte, quantidade de vagas e compensa\xE7\xE3o financeira. O ano letivo est\xE1 em risco.",
    "imagemFundo": "cenarios/escolar_abertura.jpg"
  },
  "lanterna": {
    "cenario": "cenarios/escolar_lanterna.jpg",
    "dicaOnboarding": "Arraste o dedo para iluminar. Toque nos instrumentos que ajudam a coopera\xE7\xE3o educacional.",
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
        "nome": "Acusa\xE7\xE3o m\xFAtua",
        "icone": "armadilhas/acusacao.svg",
        "explicacao": "Trocar acusa\xE7\xF5es substitui a busca de solu\xE7\xE3o e aprofunda a desconfian\xE7a."
      },
      {
        "id": "prazo-perdido",
        "nome": "Prazo perdido",
        "icone": "armadilhas/prazo.svg",
        "explicacao": "Perder o calend\xE1rio escolar deixa alunos sem aula. Perde o cidad\xE3o."
      },
      {
        "id": "falta-transparencia",
        "nome": "Falta de transpar\xEAncia",
        "icone": "armadilhas/opacidade.svg",
        "explicacao": "Esconder custos e dados inviabiliza qualquer c\xE1lculo justo de compensa\xE7\xE3o."
      }
    ]
  },
  "vitoria": {
    "titulo": "COOPERA\xC7\xC3O EDUCACIONAL",
    "texto": "Alto Cedro e Campo Florido firmaram acordo de coopera\xE7\xE3o. As vagas e o transporte est\xE3o garantidos, com rateio transparente de custos e revis\xE3o anual."
  },
  "derrota": {
    "titulo": "ANO LETIVO EM RISCO",
    "texto": "Sem acordo, alunos ficam sem aula. O custo do impasse recai sobre a gera\xE7\xE3o que depende da escola p\xFAblica."
  }
};

// src/conteudo.js
var todasHistorias = {
  "transporte-urbano": transporte_urbano_data_default,
  "aterro": aterro_data_default,
  "escolar": escolar_data_default
};
async function carregarTudo() {
  const historias = config_default.historiasAtivas.map((id) => todasHistorias[id]);
  return {
    config: config_default,
    principios: principios_data_default,
    instrumentos: instrumentos_data_default,
    coletor: coletor_data_default,
    textosUI: textos_ui_data_default,
    historias
  };
}
function sortearHistoria(historias) {
  return historias[0];
}

// src/estado.js
var cenas = /* @__PURE__ */ new Map();
var estadoAtual = null;
var cenaInstanciaAtual = null;
var idleTimeout = null;
var idleMsAtual = 45e3;
var aoMudarCena = () => {
};
var avisoTimer = null;
var avisoTickTimer = null;
function registrar(nome, defs) {
  cenas.set(nome, defs);
}
function onMudarCena(cb) {
  aoMudarCena = cb;
}
async function irPara(nome, args = {}) {
  if (!cenas.has(nome)) {
    console.error("Cena desconhecida:", nome);
    return;
  }
  const app = document.getElementById("app");
  const primeiraCena = cenaInstanciaAtual === null;
  if (!primeiraCena && app) {
    app.classList.add("trocando");
    await esperar(200);
  }
  if (cenaInstanciaAtual && typeof cenaInstanciaAtual.onExit === "function") {
    try {
      cenaInstanciaAtual.onExit();
    } catch (e) {
      console.error("onExit falhou", e);
    }
  }
  estadoAtual = nome;
  const defs = cenas.get(nome);
  cenaInstanciaAtual = { ...defs };
  aoMudarCena(nome);
  if (typeof cenaInstanciaAtual.onEnter === "function") {
    try {
      await cenaInstanciaAtual.onEnter(args);
    } catch (e) {
      console.error("onEnter falhou", e);
    }
  }
  if (app) {
    requestAnimationFrame(() => app.classList.remove("trocando"));
  }
  resetIdleTimer();
}
function esperar(ms) {
  return new Promise((r) => setTimeout(r, ms));
}
function configurarIdle(ms) {
  idleMsAtual = ms;
  resetIdleTimer();
}
function resetIdleTimer() {
  clearTimeout(idleTimeout);
  clearTimeout(avisoTimer);
  clearInterval(avisoTickTimer);
  esconderAviso();
  if (idleMsAtual <= 0) return;
  if (estadoAtual === "ATTRACT") return;
  idleTimeout = setTimeout(() => {
    irPara("ATTRACT");
  }, idleMsAtual);
  const avisoDelay = Math.max(0, idleMsAtual - 1e4);
  avisoTimer = setTimeout(() => iniciarAviso(10), avisoDelay);
}
function pararIdle() {
  clearTimeout(idleTimeout);
  clearTimeout(avisoTimer);
  clearInterval(avisoTickTimer);
  esconderAviso();
}
function iniciarAviso(seg) {
  let restante = seg;
  mostrarAviso(`Volta em ${restante}s`);
  avisoTickTimer = setInterval(() => {
    restante--;
    if (restante <= 0) {
      clearInterval(avisoTickTimer);
      esconderAviso();
      return;
    }
    mostrarAviso(`Volta em ${restante}s`);
  }, 1e3);
}
function mostrarAviso(texto) {
  let el = document.getElementById("aviso-idle");
  if (!el) {
    el = document.createElement("div");
    el.id = "aviso-idle";
    el.className = "aviso-idle";
    document.body.appendChild(el);
  }
  el.textContent = texto;
}
function esconderAviso() {
  const el = document.getElementById("aviso-idle");
  if (el) el.remove();
}
function iniciarIdleGlobal(msPadrao) {
  idleMsAtual = msPadrao;
  const eventos = ["pointerdown", "pointermove", "click", "touchstart"];
  const handler = () => resetIdleTimer();
  for (const ev of eventos) {
    document.addEventListener(ev, handler, { passive: true });
  }
}

// src/audio.js
var sons = {};
var ARQUIVOS = ["toque", "acerto", "erro", "coletou", "armadilha", "vitoria", "derrota"];
var silenciado = false;
function carregarSons() {
  silenciado = localStorage.getItem("muted") === "true";
  ARQUIVOS.forEach((id) => {
    const audio = new Audio(`assets/sons/${id}.wav`);
    audio.preload = "auto";
    sons[id] = audio;
  });
}
function tocar(id) {
  const s = sons[id];
  if (!s || silenciado) return;
  const clone = s.cloneNode();
  clone.volume = 0.7;
  clone.play().catch(() => {
  });
}
function toggleMute() {
  silenciado = !silenciado;
  localStorage.setItem("muted", silenciado);
  return silenciado;
}
function isMuted() {
  return silenciado;
}

// src/cenas/attract.js
var LABELS = ["Jogar", "Desafio", "Jogar", "Desafio", "Jogar", "Desafio", "Jogar", "Pr\xEAmio"];
var NUM_LUZES = 24;
var root = null;
var onToque = null;
function criarLuzes(anel, raio) {
  for (let i = 0; i < NUM_LUZES; i++) {
    const ang = i * (360 / NUM_LUZES) * (Math.PI / 180);
    const luz = document.createElement("div");
    luz.className = "roleta-luz";
    luz.style.left = raio + raio * Math.cos(ang) - 5.5 + "px";
    luz.style.top = raio + raio * Math.sin(ang) - 5.5 + "px";
    anel.appendChild(luz);
  }
}
function montar(app, ctx) {
  return {
    onEnter() {
      pararIdle();
      const t = ctx.textosUI.attract;
      const logo = ctx.config.creditos.logoSrc;
      const labelsHTML = LABELS.map(
        (l) => `<div class="roleta-label"><span>${l}</span></div>`
      ).join("");
      app.innerHTML = `
        <section class="cena cena-attract" id="cena-attract">
          <img class="attract-logo" src="${logo}" alt="TCE-PE" onerror="this.style.display='none'">
          <div class="attract-roleta-outer">
            <div class="roleta-ponteiro"></div>
            <div class="attract-roleta-anel" id="roleta-anel"></div>
            <div class="attract-roleta-disco"></div>
            <div class="roleta-labels">${labelsHTML}</div>
            <div class="roleta-centro">GIRAR<br>ROLETA</div>
          </div>
          <h1 class="attract-chamada entrada-1">${t.chamada}</h1>
          <p class="attract-subtitulo entrada-2">${t.subtitulo}</p>
          <img class="attract-logo-prisma entrada-2" src="assets/marca/Logo_prisma.png" alt="" onerror="this.style.display='none'">
          <button class="btn-mute" id="btn-mute" aria-label="Alternar som"></button>
          <div class="attract-particulas" aria-hidden="true">
            ${Array.from({ length: 12 }, () => '<span class="particula"></span>').join("")}
          </div>
        </section>`;
      root = app.querySelector("#cena-attract");
      requestAnimationFrame(() => {
        const anel = root.querySelector("#roleta-anel");
        const raio = anel.offsetWidth / 2;
        criarLuzes(anel, raio);
      });
      const btnMute = root.querySelector("#btn-mute");
      function atualizarIconeMute() {
        btnMute.textContent = isMuted() ? "\u{1F507}" : "\u{1F50A}";
      }
      atualizarIconeMute();
      btnMute.addEventListener("pointerdown", (ev) => {
        ev.stopPropagation();
        toggleMute();
        atualizarIconeMute();
      });
      onToque = () => irPara("ROLETA_GIRANDO");
      root.addEventListener("pointerdown", onToque, { passive: true });
    },
    onExit() {
      if (root && onToque) root.removeEventListener("pointerdown", onToque);
      root = null;
      onToque = null;
    }
  };
}

// src/cenas/roleta_girando.js
var NUM_LUZES2 = 24;
var root2 = null;
var tAuto = null;
var tMsg = null;
var onToque2 = null;
var LABELS2 = ["Jogar", "Desafio", "Jogar", "Desafio", "Jogar", "Desafio", "Jogar", "Pr\xEAmio"];
function criarLuzes2(anel, raio) {
  for (let i = 0; i < NUM_LUZES2; i++) {
    const ang = i * (360 / NUM_LUZES2) * (Math.PI / 180);
    const luz = document.createElement("div");
    luz.className = "roleta-luz";
    luz.style.left = raio + raio * Math.cos(ang) - 5.5 + "px";
    luz.style.top = raio + raio * Math.sin(ang) - 5.5 + "px";
    anel.appendChild(luz);
  }
}
function montar2(app, ctx) {
  return {
    onEnter() {
      pararIdle();
      const t = ctx.textosUI.roletaGirando;
      const labelsHTML = LABELS2.map(
        (l) => `<div class="roleta-label"><span>${l}</span></div>`
      ).join("");
      app.innerHTML = `
        <section class="cena cena-attract cena-roleta-girando" id="cena-roleta">
          <div class="attract-roleta-outer">
            <div class="roleta-ponteiro"></div>
            <div class="attract-roleta-anel" id="roleta-anel-spin"></div>
            <div class="attract-roleta-disco"></div>
            <div class="roleta-labels">${labelsHTML}</div>
            <div class="roleta-centro">GIRAR<br>ROLETA</div>
            <div class="roleta-mensagem">${t.mensagemParou}</div>
          </div>
        </section>`;
      root2 = app.querySelector("#cena-roleta");
      const msg = root2.querySelector(".roleta-mensagem");
      requestAnimationFrame(() => {
        const anel = root2.querySelector("#roleta-anel-spin");
        const raio = anel.offsetWidth / 2;
        criarLuzes2(anel, raio);
      });
      tMsg = setTimeout(() => msg.classList.add("visivel"), 3500);
      tAuto = setTimeout(() => irPara("INTRO_CONSENSUALISMO"), 9e3);
      onToque2 = () => irPara("INTRO_CONSENSUALISMO");
      root2.addEventListener("pointerdown", onToque2, { passive: true });
    },
    onExit() {
      clearTimeout(tAuto);
      clearTimeout(tMsg);
      if (root2 && onToque2) root2.removeEventListener("pointerdown", onToque2);
      root2 = null;
      tAuto = null;
      tMsg = null;
      onToque2 = null;
    }
  };
}

// src/cenas/intro_consensualismo.js
var root3 = null;
var cleanup = [];
function calcularTempoLeitura(_texto) {
  return 6e3;
}
function montar3(app, ctx) {
  return {
    onEnter() {
      configurarIdle(ctx.config.idleTimeoutMs);
      ctx.sessao.historiaAtual = sortearHistoria(ctx.historias, ctx.sessao.numero);
      const t = ctx.textosUI.introConsensualism;
      const blocos = t.texto.split("\n\n").filter((b) => b.trim() !== "");
      const paragrafosHTML = blocos.map((b, i) => {
        const destaque = i === blocos.length - 1;
        const delay = (0.2 + i * 0.6).toFixed(1);
        return `<p class="intro-paragrafo${destaque ? " intro-destaque" : ""}" style="animation-delay:${delay}s">${b.trim()}</p>`;
      }).join("");
      app.innerHTML = `
        <section class="cena cena-intro" id="cena-intro">
          <div class="intro-conteudo">
            <img class="intro-icone" src="assets/ui/toque.svg" alt=""
              onerror="this.style.display='none'">
            <h1 class="intro-titulo">${t.titulo}</h1>
            ${paragrafosHTML}
            <button class="btn btn-primary btn-bloqueado" id="btn-intro">${t.botaoContinuar}</button>
          </div>
        </section>`;
      root3 = app.querySelector("#cena-intro");
      root3.addEventListener("pointerdown", resetIdleTimer, { passive: true });
      const btn = root3.querySelector("#btn-intro");
      const textoCompleto = blocos.join(" ");
      const tLeitura = calcularTempoLeitura(textoCompleto);
      const tid = setTimeout(() => {
        if (!btn) return;
        btn.classList.remove("btn-bloqueado");
        btn.classList.add("btn-desbloqueado");
      }, tLeitura);
      cleanup.push(() => clearTimeout(tid));
      anexarBotao(btn, () => irPara("JOGO1_COLETOR"));
    },
    onExit() {
      cleanup.forEach((fn) => {
        try {
          fn();
        } catch (_) {
        }
      });
      cleanup = [];
      root3 = null;
    }
  };
}
function anexarBotao(btn, acao) {
  btn.addEventListener("pointerdown", () => {
    btn.classList.add("tocando");
    tocar("toque");
  });
  btn.addEventListener("pointerup", () => {
    btn.classList.remove("tocando");
    acao();
  });
  btn.addEventListener("pointercancel", () => btn.classList.remove("tocando"));
  btn.addEventListener("pointerleave", () => btn.classList.remove("tocando"));
}

// src/ui/derrota.js
function mostrarDerrota({ titulo, texto }) {
  return new Promise((resolve) => {
    const el = document.createElement("div");
    el.className = "overlay-derrota";
    el.setAttribute("role", "alertdialog");
    el.innerHTML = `
      <div class="overlay-derrota-card">
        ${titulo ? `<h2>${titulo}</h2>` : ""}
        ${texto ? `<p>${texto}</p>` : ""}
        <div class="derrota-botoes">
          <button class="btn btn-primary" id="btn-derrota-repetir">JOGAR DE NOVO</button>
          <button class="btn btn-derrota-final" id="btn-derrota-final">FINALIZAR</button>
        </div>
      </div>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => el.classList.add("visivel"));
    });
    function fechar(escolha) {
      el.classList.remove("visivel");
      setTimeout(() => {
        el.remove();
        resolve(escolha);
      }, 300);
    }
    const btnRepetir = el.querySelector("#btn-derrota-repetir");
    const btnFinal = el.querySelector("#btn-derrota-final");
    btnRepetir.addEventListener("pointerdown", () => {
      btnRepetir.classList.add("tocando");
      tocar("toque");
    });
    btnRepetir.addEventListener("pointerup", () => {
      btnRepetir.classList.remove("tocando");
      fechar("repetir");
    });
    btnFinal.addEventListener("pointerdown", () => {
      btnFinal.classList.add("tocando");
    });
    btnFinal.addEventListener("pointerup", () => {
      btnFinal.classList.remove("tocando");
      fechar("final");
    });
  });
}

// src/cenas/jogo1_coletor.js
var raf = null;
var tTimer = null;
var root4 = null;
var cleanup2 = [];
function montar4(app, ctx) {
  return {
    onEnter() {
      const t = ctx.textosUI.jogo1;
      const meta = ctx.config.coletorMetaPontos || 80;
      const duracao = ctx.config.coletorDuracaoSeg || 40;
      const velInicial = ctx.config.coletorVelocidadeInicial || 220;
      const acIntervalo = ctx.config.coletorAceleracaoIntervaloSeg || 10;
      const acIncremento = ctx.config.coletorAceleracaoIncremento || 1.5;
      const adequados = ctx.coletor.adequados;
      const inadequados = ctx.coletor.inadequados;
      const adequadosUnicos = adequados.filter((a, i, arr) => arr.findIndex((x) => x.id === a.id) === i);
      const invHTML = adequadosUnicos.map((a) => `
        <div class="inv-slot" data-inv-id="${a.id}">
          <img src="assets/${a.icone}" alt="" onerror="this.style.visibility='hidden'">
          <div class="inv-slot-info">
            <span class="inv-slot-nome">${a.nome || a.id}</span>
            <div class="inv-stars"></div>
          </div>
        </div>`).join("");
      app.innerHTML = `
        <section class="cena cena-jogo3" id="cena-jogo1-coletor">
          <div class="coletor-palco" id="coletor-palco">
            <div class="bokeh" id="coletor-bokeh"></div>
            <div class="coletor-hud">
              <span class="hud-pill accent" id="hud-pontos">
                <span>${t.hudPontuacao}:&nbsp;</span><span id="pontos-val">0</span>
              </span>
              <div class="timer-anel hud-pill" id="hud-tempo">
                <svg class="timer-svg" viewBox="0 0 44 44" aria-hidden="true">
                  <circle class="timer-trilha" cx="22" cy="22" r="18"/>
                  <circle class="timer-prog" id="timer-prog" cx="22" cy="22" r="18"/>
                </svg>
                <span class="timer-num" id="tempo-val">${duracao}</span>
              </div>
            </div>
            <div class="coletor-flash" id="coletor-flash"></div>
            <div class="item-coletado-notif" id="item-coletado-notif" aria-hidden="true">
              <img id="notif-icone" src="" alt="">
              <span id="notif-nome"></span>
            </div>
          </div>
          <aside class="coletor-inventory" id="coletor-inventory">
            <h3 class="inv-titulo">COLETADOS</h3>
            <div class="inv-slots" id="inv-slots">${invHTML}</div>
          </aside>
          <div class="modal-entrada visivel" id="modal-entrada">
            <div class="modal-entrada-card">
              <h2>${t.tituloModal}</h2>
              <p>${t.instrucaoModal}</p>
              <button class="btn btn-primary" id="btn-modal-jogar">${t.botaoIniciar}</button>
            </div>
          </div>
        </section>`;
      root4 = app.querySelector("#cena-jogo1-coletor");
      (function makeBokeh(id, n) {
        const el = root4.querySelector("#" + id);
        if (!el) return;
        const palette = ["rgba(255,204,0,", "rgba(0,214,143,", "rgba(14,165,233,", "rgba(255,255,255,"];
        for (let i = 0; i < n; i++) {
          const d = document.createElement("div");
          d.className = "b";
          const sz = 3 + Math.random() * 12;
          const col = palette[i % palette.length];
          const op = (0.04 + Math.random() * 0.18).toFixed(2);
          const op2 = Math.min(1, +op + 0.18).toFixed(2);
          d.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random() * 100}%;bottom:${-sz}px;background:radial-gradient(circle at 35% 35%,${col}${op2}) 0%,${col}0) 100%);animation-duration:${7 + Math.random() * 14}s;animation-delay:${-Math.random() * 18}s;`;
          el.appendChild(d);
        }
      })("coletor-bokeh", 20);
      const palco = root4.querySelector("#coletor-palco");
      const flash = root4.querySelector("#coletor-flash");
      const pontosVal = root4.querySelector("#pontos-val");
      const tempoVal = root4.querySelector("#tempo-val");
      const timerProg = root4.querySelector("#timer-prog");
      const invSlotsEl = root4.querySelector("#inv-slots");
      const CIRCUM = 2 * Math.PI * 18;
      const modalEntrada = root4.querySelector("#modal-entrada");
      const btnJogar = root4.querySelector("#btn-modal-jogar");
      let pontos = 0;
      let segundos = duracao;
      let jogoAtivo = false;
      let rect = palco.getBoundingClientRect();
      function recalcRect() {
        rect = palco.getBoundingClientRect();
      }
      window.addEventListener("resize", recalcRect);
      cleanup2.push(() => window.removeEventListener("resize", recalcRect));
      const ativos = [];
      let ultimoSpawn = 0;
      let velocidadeBase = velInicial;
      let intervaloAnterior = 0;
      const inventarioContagem = {};
      let notifTimer = null;
      cleanup2.push(() => clearTimeout(notifTimer));
      function mostrarNotifItem(icone, nome) {
        const notif = root4.querySelector("#item-coletado-notif");
        if (!notif) return;
        notif.querySelector("#notif-icone").src = "assets/" + icone;
        notif.querySelector("#notif-nome").textContent = nome;
        notif.classList.add("visivel");
        clearTimeout(notifTimer);
        notifTimer = setTimeout(() => notif.classList.remove("visivel"), 1200);
      }
      function onPalcoToque(ev) {
        resetIdleTimer();
        if (!jogoAtivo) return;
        const larguraPalco = rect.width || palco.offsetWidth;
        const alturaPalco = rect.height || palco.offsetHeight;
        const touchX = ev.clientX - rect.left;
        const touchY = ev.clientY - rect.top;
        const HIT_RAIO = 160;
        let closestIdx = -1;
        let closestDist = HIT_RAIO;
        for (let i = 0; i < ativos.length; i++) {
          const it2 = ativos[i];
          const itemCX = it2.x / 100 * larguraPalco;
          const itemCY = it2.y / 100 * alturaPalco;
          const dist = Math.hypot(touchX - itemCX, touchY - itemCY);
          if (dist < closestDist) {
            closestDist = dist;
            closestIdx = i;
          }
        }
        if (closestIdx < 0) return;
        const it = ativos[closestIdx];
        ativos.splice(closestIdx, 1);
        it.el.remove();
        const delta = it.adequado ? 10 : -5;
        pontos = Math.max(0, pontos + delta);
        pontosVal.textContent = pontos;
        mostrarFlash(it.adequado);
        const xPx = it.x / 100 * larguraPalco;
        const yPx = it.y / 100 * alturaPalco;
        floatNome(it.nome, xPx, yPx, it.adequado);
        tocar(it.adequado ? "coletou" : "erro");
        clearTimeout(pontosVal._tt);
        pontosVal.classList.remove("score-tick");
        void pontosVal.offsetWidth;
        pontosVal.classList.add("score-tick");
        pontosVal._tt = setTimeout(() => pontosVal.classList.remove("score-tick"), 280);
        if (it.adequado) {
          inventarioContagem[it.defId] = (inventarioContagem[it.defId] || 0) + 1;
          adicionarEstrela(it.defId);
          spawnBurst(xPx, yPx);
        }
      }
      palco.addEventListener("pointerdown", onPalcoToque);
      cleanup2.push(() => palco.removeEventListener("pointerdown", onPalcoToque));
      function spawnarItem() {
        const adequado = Math.random() < 0.6;
        const pool = adequado ? adequados : inadequados;
        const def = pool[Math.floor(Math.random() * pool.length)];
        const el = document.createElement("div");
        el.className = "coletor-item " + (adequado ? "adequado" : "inadequado") + " spawn-in";
        el.innerHTML = `<img src="assets/${def.icone}" alt="" onerror="this.style.visibility='hidden'">`;
        el.style.touchAction = "none";
        el.style.pointerEvents = "none";
        palco.appendChild(el);
        setTimeout(() => el.classList.remove("spawn-in"), 220);
        const x = 5 + Math.random() * 90;
        ativos.push({
          el,
          x,
          y: -5,
          adequado,
          defId: def.id,
          icone: def.icone,
          nome: def.nome,
          velocidade: velocidadeBase * (0.9 + Math.random() * 0.3)
        });
      }
      function adicionarEstrela(defId) {
        const slotEl = invSlotsEl.querySelector(`[data-inv-id="${defId}"]`);
        if (!slotEl) return;
        slotEl.classList.add("inv-slot-coletado");
        const count = inventarioContagem[defId];
        if (count <= 5) {
          const starsEl = slotEl.querySelector(".inv-stars");
          const star = document.createElement("span");
          star.className = "inv-star nova";
          star.textContent = "\u2605";
          starsEl.appendChild(star);
          requestAnimationFrame(() => star.classList.remove("nova"));
        }
      }
      function mostrarFlash(ok) {
        flash.classList.remove("ok", "erro");
        flash.classList.add(ok ? "ok" : "erro");
        setTimeout(() => flash.classList.remove("ok", "erro"), 240);
      }
      function floatNome(nome, xPx, yPx, adequado) {
        const nota = document.createElement("div");
        nota.className = "float-pts float-nome " + (adequado ? "pos" : "neg");
        nota.style.left = xPx + "px";
        nota.style.top = yPx + "px";
        nota.textContent = nome;
        root4.appendChild(nota);
        setTimeout(() => nota.remove(), 1400);
      }
      function spawnBurst(xPx, yPx) {
        for (let i = 0; i < 6; i++) {
          const p = document.createElement("div");
          p.className = "burst-part";
          p.style.cssText = `left:${xPx}px;top:${yPx}px;--bang:${Math.round(i / 6 * 360)}deg`;
          palco.appendChild(p);
          setTimeout(() => p.remove(), 700);
        }
      }
      let lastT = performance.now();
      function loop(agora) {
        const dt = Math.min(0.05, (agora - lastT) / 1e3);
        lastT = agora;
        if (agora - ultimoSpawn > 950 - Math.min(600, (duracao - segundos) * 14)) {
          spawnarItem();
          ultimoSpawn = agora;
        }
        const intervaloAtual = Math.floor((duracao - segundos) / acIntervalo);
        if (intervaloAtual > intervaloAnterior) {
          velocidadeBase = Math.min(velocidadeBase * acIncremento, 420);
          intervaloAnterior = intervaloAtual;
        }
        const alturaPalco = rect.height || palco.offsetHeight;
        for (let i = ativos.length - 1; i >= 0; i--) {
          const it = ativos[i];
          it.y += it.velocidade * dt / alturaPalco * 100;
          const yPx = it.y / 100 * alturaPalco;
          it.el.style.left = it.x + "%";
          it.el.style.top = yPx + "px";
          if (yPx > alturaPalco + 40) {
            it.el.remove();
            ativos.splice(i, 1);
          }
        }
        raf = requestAnimationFrame(loop);
      }
      function iniciarJogo() {
        jogoAtivo = true;
        recalcRect();
        lastT = performance.now();
        ultimoSpawn = lastT;
        if (timerProg) timerProg.style.strokeDashoffset = 0;
        raf = requestAnimationFrame(loop);
        tTimer = setInterval(() => {
          segundos--;
          tempoVal.textContent = segundos;
          if (timerProg) {
            timerProg.style.strokeDashoffset = CIRCUM * (1 - segundos / duracao);
            if (segundos <= 10) timerProg.classList.add("urgente");
          }
          if (segundos <= 0) encerrar(pontos >= meta);
        }, 1e3);
      }
      function encerrar(vitoria) {
        jogoAtivo = false;
        cancelAnimationFrame(raf);
        clearInterval(tTimer);
        raf = null;
        tTimer = null;
        if (vitoria) {
          tocar("vitoria");
          mostrarVitoriaJogo1();
          return;
        }
        tocar("derrota");
        mostrarDerrota({
          titulo: ctx.sessao.historiaAtual?.derrota?.titulo,
          texto: t.derrota
        }).then((escolha) => {
          if (escolha === "repetir") {
            irPara("JOGO1_COLETOR");
          } else {
            ctx.sessao.modoFinal = "neutro";
            irPara("FINAL");
          }
        });
      }
      function gerarConfetti3() {
        const cores = ["#ffcc00", "#e6a800", "#ffffff", "rgba(255,204,0,0.6)"];
        return Array.from({ length: 20 }, (_, i) => {
          const left = (i * 5 + i % 3 * 1.3).toFixed(1);
          const dur = (2 + i % 5 * 0.4).toFixed(1);
          const delay = (i * 0.12).toFixed(2);
          const rot = i * 37 % 360;
          const cor = cores[i % cores.length];
          return `<div class="conf" style="left:${left}%;--cdur:${dur}s;--cd:${delay}s;--cr:${rot}deg;background:${cor}"></div>`;
        }).join("");
      }
      function mostrarVitoriaJogo1() {
        const listaHTML = Object.entries(inventarioContagem).sort((a, b) => b[1] - a[1]).map(([id, qtd]) => {
          const def = ctx.coletor.adequados.find((a) => a.id === id);
          return `<li><img src="assets/${def?.icone || ""}" alt=""> ${def?.nome || id} <strong>\xD7${qtd}</strong></li>`;
        }).join("");
        const overlay = document.createElement("div");
        overlay.className = "j1-vitoria-overlay";
        overlay.innerHTML = `
          <div class="j1-vitoria-card">
            <div class="confetti-container" aria-hidden="true">${gerarConfetti3()}</div>
            <h2 class="j1-vitoria-titulo">${t.tituloVitoria || "PARAB\xC9NS!"}</h2>
            <p class="j1-vitoria-pontos">${pontos} pontos</p>
            <ul class="j1-vitoria-lista">${listaHTML}</ul>
            <button class="btn btn-primary" id="btn-j1-avancar">${t.botaoAvancar || "AVAN\xC7AR"}</button>
          </div>`;
        root4.appendChild(overlay);
        requestAnimationFrame(() => overlay.classList.add("visivel"));
        const btn = overlay.querySelector("#btn-j1-avancar");
        btn.addEventListener("pointerdown", () => {
          btn.classList.add("tocando");
          tocar("toque");
        });
        btn.addEventListener("pointerup", () => {
          btn.classList.remove("tocando");
          irPara("JOGO2_LIGAR");
        });
        const autoTimer = setTimeout(() => irPara("JOGO2_LIGAR"), 1e4);
        cleanup2.push(() => clearTimeout(autoTimer));
      }
      btnJogar.addEventListener("pointerdown", () => {
        btnJogar.classList.add("tocando");
        tocar("toque");
      });
      btnJogar.addEventListener("pointercancel", () => btnJogar.classList.remove("tocando"));
      btnJogar.addEventListener("pointerup", () => {
        btnJogar.classList.remove("tocando");
        modalEntrada.classList.remove("visivel");
        setTimeout(iniciarJogo, 100);
      });
    },
    onExit() {
      cancelAnimationFrame(raf);
      clearInterval(tTimer);
      raf = null;
      tTimer = null;
      cleanup2.forEach((fn) => {
        try {
          fn();
        } catch (_) {
        }
      });
      cleanup2 = [];
      root4 = null;
    }
  };
}

// src/cenas/jogo2_ligar.js
var root5 = null;
var cleanup3 = [];
function montar5(app, ctx) {
  return {
    onEnter() {
      const t = ctx.textosUI.jogo2;
      const { pilares, casos } = ctx.principios;
      const iconePilar = {
        dialogo: "assets/pilares/dialogo.svg",
        eficiencia: "assets/pilares/eficiencia.svg",
        seguranca: "assets/pilares/seguranca.svg"
      };
      const casosEmbaralhados = embaralhar(casos);
      app.innerHTML = `
        <section class="cena cena-jogo1" id="cena-jogo2-ligar">
          <div class="jogo1-topo">
            <h2 class="jogo1-titulo j2-titulo-escuro">${t.titulo}</h2>
            <p class="jogo1-instrucao j2-instrucao-escura">${t.instrucao}</p>
          </div>
          <div class="jogo1-stage">
            <div class="jogo1-casos" id="j1-casos">
              ${casosEmbaralhados.map((c) => `
                <div class="caso-card" data-caso-id="${c.id}" data-pilar-correto="${c.pilarCorreto}">
                  <p>${c.texto}</p>
                </div>
              `).join("")}
            </div>
            <div class="jogo1-pilares" id="j1-pilares">
              ${pilares.map((p) => `
                <div class="pilar-box" data-pilar-id="${p.id}">
                  <img src="${iconePilar[p.id] || ""}" alt="" onerror="this.style.visibility='hidden'">
                  <span>
                    <span class="pilar-nome">${p.nome}</span>
                    <span class="pilar-desc">${p.descricaoCurta || ""}</span>
                  </span>
                </div>
              `).join("")}
            </div>
          </div>
          <div class="jogo1-avanco">
            <button class="btn btn-primary escondido" id="btn-avancar1">${t.botaoAvancar}</button>
          </div>
          <div class="jogo1-feedback" id="j1-feedback"></div>
          <div class="modal-entrada visivel" id="modal-entrada">
            <div class="modal-entrada-card">
              <h2>${t.tituloModal}</h2>
              <p>${t.instrucaoModal}</p>
              <button class="btn btn-primary" id="btn-modal-jogar">${t.botaoIniciar}</button>
            </div>
          </div>
        </section>`;
      root5 = app.querySelector("#cena-jogo2-ligar");
      const bgProbe = new Image();
      bgProbe.onload = () => {
        root5.style.backgroundImage = `url('assets/cenarios/jogo2_bg.jpg')`;
      };
      bgProbe.src = "assets/cenarios/jogo2_bg.jpg";
      const pilaresEl = root5.querySelector("#j1-pilares");
      const casosEl = root5.querySelector("#j1-casos");
      const feedback = root5.querySelector("#j1-feedback");
      const btnAv = root5.querySelector("#btn-avancar1");
      const caixas = Array.from(pilaresEl.querySelectorAll(".pilar-box"));
      let coletados = 0;
      const total = casosEmbaralhados.length;
      let cartaoSelecionado = null;
      function mostrarFeedback(texto, ok) {
        feedback.textContent = texto;
        feedback.classList.remove("ok", "erro", "visivel");
        feedback.classList.add(ok ? "ok" : "erro", "visivel");
        clearTimeout(feedback._t);
        feedback._t = setTimeout(() => feedback.classList.remove("visivel"), 2500);
      }
      function desselecionarTodos() {
        casosEl.querySelectorAll(".caso-card.selecionado").forEach((c) => c.classList.remove("selecionado"));
        cartaoSelecionado = null;
      }
      function onCartaoToque(ev) {
        ev.stopPropagation();
        resetIdleTimer();
        const cartao = ev.currentTarget;
        if (cartao.classList.contains("acerto")) return;
        tocar("toque");
        if (cartaoSelecionado === cartao) {
          cartao.classList.remove("selecionado");
          cartaoSelecionado = null;
          return;
        }
        desselecionarTodos();
        cartao.classList.add("selecionado");
        cartaoSelecionado = cartao;
      }
      function onPilarToque(ev) {
        ev.stopPropagation();
        resetIdleTimer();
        if (!cartaoSelecionado) return;
        const pilar = ev.currentTarget;
        const cartao = cartaoSelecionado;
        if (pilar.dataset.pilarId === cartao.dataset.pilarCorreto) {
          tocar("acerto");
          const caso = casosEmbaralhados.find((c) => c.id === cartao.dataset.casoId);
          mostrarFeedback(caso?.insightAcerto || t.feedbackAcerto, true);
          cartao.classList.remove("selecionado");
          cartao.classList.add("acerto");
          cartao.style.pointerEvents = "none";
          setTimeout(() => cartao.remove(), 400);
          cartaoSelecionado = null;
          coletados++;
          if (coletados === total) {
            tocar("vitoria");
            setTimeout(() => {
              btnAv.classList.remove("escondido");
            }, 600);
          }
        } else {
          tocar("erro");
          mostrarFeedback(t.feedbackErro, false);
          cartao.classList.add("erro");
          setTimeout(() => cartao.classList.remove("erro"), 450);
          desselecionarTodos();
        }
      }
      function onFundoToque() {
        desselecionarTodos();
      }
      const modalEntrada = root5.querySelector("#modal-entrada");
      const btnJogar = root5.querySelector("#btn-modal-jogar");
      casosEl.querySelectorAll(".caso-card").forEach((c) => {
        c.style.pointerEvents = "none";
      });
      btnJogar.classList.add("btn-bloqueado");
      const lockTimer = setTimeout(() => {
        btnJogar.classList.remove("btn-bloqueado");
        btnJogar.classList.add("btn-desbloqueado");
      }, 5e3);
      cleanup3.push(() => clearTimeout(lockTimer));
      btnJogar.addEventListener("pointerdown", () => {
        btnJogar.classList.add("tocando");
        tocar("toque");
      });
      btnJogar.addEventListener("pointercancel", () => btnJogar.classList.remove("tocando"));
      btnJogar.addEventListener("pointerup", () => {
        if (btnJogar.classList.contains("btn-bloqueado")) return;
        btnJogar.classList.remove("tocando");
        modalEntrada.classList.remove("visivel");
        casosEl.querySelectorAll(".caso-card").forEach((c) => {
          c.style.pointerEvents = "";
          c.addEventListener("pointerdown", onCartaoToque);
          cleanup3.push(() => c.removeEventListener("pointerdown", onCartaoToque));
        });
        caixas.forEach((pilar) => {
          pilar.addEventListener("pointerdown", onPilarToque);
          cleanup3.push(() => pilar.removeEventListener("pointerdown", onPilarToque));
        });
        root5.addEventListener("pointerdown", onFundoToque);
        cleanup3.push(() => root5.removeEventListener("pointerdown", onFundoToque));
      });
      anexarBotao2(btnAv, () => irPara("JOGO3_LANTERNA"));
    },
    onExit() {
      cleanup3.forEach((fn) => {
        try {
          fn();
        } catch (_) {
        }
      });
      cleanup3 = [];
      root5 = null;
    }
  };
}
function embaralhar(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function anexarBotao2(btn, acao) {
  btn.addEventListener("pointerdown", () => {
    btn.classList.add("tocando");
    tocar("toque");
  });
  btn.addEventListener("pointerup", () => {
    btn.classList.remove("tocando");
    acao();
  });
  btn.addEventListener("pointercancel", () => btn.classList.remove("tocando"));
  btn.addEventListener("pointerleave", () => btn.classList.remove("tocando"));
}

// src/cenas/jogo3_lanterna.js
function calcularTempoLeitura2(texto) {
  const palavras = texto.trim().split(/\s+/).length;
  return Math.max(2500, Math.ceil(palavras / 200 * 60 * 1e3));
}
var raf2 = null;
var tTimer2 = null;
var root6 = null;
var cleanup4 = [];
var fase = "transicao";
var RAIO = 360;
var COLETAR_ALVO = 5;
var CIRCUM_J3 = 2 * Math.PI * 42;
function montar6(app, ctx) {
  return {
    onEnter() {
      const t = ctx.textosUI.jogo3;
      const historia = ctx.sessao.historiaAtual;
      if (ctx.sessao.modoJ3Direto) {
        ctx.sessao.modoJ3Direto = false;
        fase = "jogo";
        renderJogo(t, historia);
        return;
      }
      fase = "transicao";
      app.innerHTML = `
        <section class="cena cena-jogo3-transicao" id="cena-jogo3-trans">
          <div class="intro-conteudo">
            <h1 class="intro-titulo">${t.tituloTransicao}</h1>
            ${t.textoTransicao.split("\n\n").map((b) => `<p class="intro-texto bloco-texto">${b.trim()}</p>`).join("")}
            <button class="btn btn-primary btn-bloqueado" id="btn-transicao">${t.botaoTransicao}</button>
          </div>
        </section>`;
      root6 = app.querySelector("#cena-jogo3-trans");
      root6.addEventListener("pointerdown", resetIdleTimer, { passive: true });
      const bgTrans = new Image();
      bgTrans.onload = () => {
        if (root6) root6.style.backgroundImage = `url('assets/cenarios/transporte_lanterna.jpg')`;
      };
      bgTrans.src = "assets/cenarios/transporte_lanterna.jpg";
      const btnTrans = root6.querySelector("#btn-transicao");
      const tLeitura = calcularTempoLeitura2(t.textoTransicao);
      const tidTrans = setTimeout(() => {
        if (!btnTrans) return;
        btnTrans.classList.remove("btn-bloqueado");
        btnTrans.classList.add("btn-desbloqueado");
      }, tLeitura);
      cleanup4.push(() => clearTimeout(tidTrans));
      btnTrans.addEventListener("pointerdown", () => {
        btnTrans.classList.add("tocando");
        tocar("toque");
      });
      btnTrans.addEventListener("pointercancel", () => btnTrans.classList.remove("tocando"));
      btnTrans.addEventListener("pointerup", () => {
        btnTrans.classList.remove("tocando");
        renderJogo(t, historia);
      });
    },
    onExit() {
      cancelAnimationFrame(raf2);
      clearInterval(tTimer2);
      raf2 = null;
      tTimer2 = null;
      fase = "transicao";
      cleanup4.forEach((fn) => {
        try {
          fn();
        } catch (_) {
        }
      });
      cleanup4 = [];
      root6 = null;
    }
  };
  function renderJogo(t, historia) {
    fase = "jogo";
    const lanternaCfg = historia.lanterna;
    const duracao = ctx.config.lanternaDuracaoSeg || 60;
    const instrumentos = ctx.instrumentos.instrumentos;
    const instrumentosNaCena = lanternaCfg.instrumentosAEscolher.map((id) => instrumentos.find((x) => x.id === id)).filter(Boolean);
    const armadilhas = lanternaCfg.armadilhas || [];
    const invHTML = instrumentosNaCena.map((inst) => `
      <div class="j3-inv-slot" data-inst-id="${inst.id}">
        <img src="assets/${inst.icone}" alt="" onerror="this.style.visibility='hidden'">
        <div class="j3-inv-slot-info">
          <span class="j3-inv-slot-nome">${inst.nomeCompleto || inst.nome}</span>
          <span class="j3-inv-slot-status">N\xC3O ENCONTRADO</span>
        </div>
      </div>`).join("");
    const app2 = document.getElementById("app");
    app2.innerHTML = `
      <section class="cena cena-jogo2" id="cena-jogo3-jogo">
        <div class="lanterna-palco fundo-fallback-${historia.id}" id="lanterna-palco"></div>
        <div class="lanterna-mascara" id="lanterna-mascara"></div>

        <div class="j3-timer-grande" id="j3-timer-grande">
          <svg class="j3-timer-svg" viewBox="0 0 100 100" aria-hidden="true">
            <circle class="j3-timer-trilha" cx="50" cy="50" r="42"/>
            <circle class="j3-timer-prog" id="timer-prog-j3" cx="50" cy="50" r="42"/>
          </svg>
          <span class="j3-timer-num" id="hud-seg">${duracao}</span>
        </div>

        <div class="lanterna-hud">
          <span class="hud-pill" id="hud-contador">
            <img src="assets/ui/lanterna.svg" alt="">
            <span id="hud-num">0</span>/${COLETAR_ALVO}
          </span>
        </div>

        <div class="lanterna-onboarding" id="lanterna-onboarding">${lanternaCfg.dicaOnboarding || t.instrucaoJogo}</div>

        <div class="lanterna-modal" id="lanterna-modal" aria-hidden="true">
          <div class="card">
            <img id="modal-icone" src="" alt="" onerror="this.style.display='none'">
            <h3 id="modal-titulo"></h3>
            <p id="modal-texto"></p>
          </div>
        </div>

        <div class="insight-modal" id="insight-modal" aria-hidden="true">
          <div class="insight-card">
            <button class="insight-fechar" id="insight-fechar">\u2715</button>
            <img id="insight-icone" src="" alt="" onerror="this.style.display='none'">
            <h3 id="insight-titulo"></h3>
            <p id="insight-texto"></p>
          </div>
        </div>

        <aside class="j3-inv" id="j3-inv">
          <h3 class="j3-inv-titulo">INSTRUMENTOS</h3>
          <div class="j3-inv-slots">${invHTML}</div>
          <div class="j3-inv-contador" id="j3-inv-contador">0/${COLETAR_ALVO} encontrados</div>
        </aside>
      </section>`;
    root6 = app2.querySelector("#cena-jogo3-jogo");
    const palco = root6.querySelector("#lanterna-palco");
    const mascara = root6.querySelector("#lanterna-mascara");
    const hudNum = root6.querySelector("#hud-num");
    const hudSeg = root6.querySelector("#hud-seg");
    const timerProgJ3 = root6.querySelector("#timer-prog-j3");
    const onboarding = root6.querySelector("#lanterna-onboarding");
    const invEl = root6.querySelector("#j3-inv");
    const invContEl = root6.querySelector("#j3-inv-contador");
    const insightModal = root6.querySelector("#insight-modal");
    const insightFechar = root6.querySelector("#insight-fechar");
    function fecharInsight() {
      insightModal.classList.remove("visivel");
      timerPausado = false;
    }
    insightFechar.addEventListener("pointerup", fecharInsight);
    insightModal.addEventListener("pointerup", (ev) => {
      if (ev.target === insightModal) fecharInsight();
    });
    const bgPath = `assets/${lanternaCfg.cenario}`;
    const probe = new Image();
    probe.onload = () => {
      palco.style.backgroundImage = `url('${bgPath}')`;
    };
    probe.src = bgPath;
    const itens = instrumentosNaCena.map((inst) => ({
      tipo: "instrumento",
      id: inst.id,
      nome: inst.nomeCompleto || inst.nome,
      icone: `assets/${inst.icone}`,
      texto: inst.insight
    }));
    const posicoes = gerarPosicoes(itens.length, palco);
    const itensEls = itens.map((item, i) => {
      const el = document.createElement("div");
      el.className = "lanterna-item" + (item.tipo === "armadilha" ? " armadilha" : "");
      el.dataset.tipo = item.tipo;
      el.dataset.id = item.id;
      el.style.left = posicoes[i].x + "%";
      el.style.top = posicoes[i].y + "%";
      el.innerHTML = `<img src="${item.icone}" alt="" onerror="this.style.visibility='hidden'">`;
      palco.appendChild(el);
      el._data = item;
      return el;
    });
    let coletados = 0;
    let secundos = duracao;
    hudSeg.textContent = secundos;
    if (timerProgJ3) timerProgJ3.style.strokeDashoffset = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    function atualizarMascara() {
      mascara.style.setProperty("--mx", mouseX + "px");
      mascara.style.setProperty("--my", mouseY + "px");
      itensEls.forEach((el) => {
        if (el.classList.contains("coletado")) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        el.classList.toggle("revelado", Math.hypot(cx - mouseX, cy - mouseY) <= RAIO);
      });
      raf2 = requestAnimationFrame(atualizarMascara);
    }
    function onMove(ev) {
      resetIdleTimer();
      mouseX = ev.clientX;
      mouseY = ev.clientY;
      onboarding.style.opacity = "0";
    }
    function onTap(ev) {
      if (insightModal.classList.contains("visivel")) {
        insightModal.classList.remove("visivel");
        return;
      }
      const alvo = ev.target.closest(".lanterna-item");
      if (!alvo || !alvo.classList.contains("revelado")) return;
      const data = alvo._data;
      if (alvo.classList.contains("coletado")) return;
      if (data.tipo === "instrumento") {
        alvo.classList.add("coletado");
        coletados++;
        hudNum.textContent = coletados;
        const slotEl = invEl.querySelector(`[data-inst-id="${data.id}"]`);
        if (slotEl) {
          slotEl.classList.add("inv-encontrado");
          slotEl.querySelector(".j3-inv-slot-status").textContent = "\u2713 ENCONTRADO";
        }
        invContEl.textContent = `${coletados}/${COLETAR_ALVO} encontrados`;
        tocar("coletou");
        mostrarInsight(data);
        if (coletados >= COLETAR_ALVO) {
          tocar("vitoria");
          clearInterval(tTimer2);
          tTimer2 = null;
          cancelAnimationFrame(raf2);
          raf2 = null;
          setTimeout(() => mostrarVitoriaJogo3(t, historia), 600);
        }
      } else {
        tocar("armadilha");
        secundos = Math.max(0, secundos - 5);
        hudSeg.textContent = secundos;
        alvo.classList.add("tocada");
        setTimeout(() => alvo.classList.remove("tocada"), 400);
        root6.classList.add("shake");
        setTimeout(() => root6.classList.remove("shake"), 350);
        mostrarInsight(data);
      }
    }
    let timerPausado = false;
    function mostrarInsight(data) {
      timerPausado = true;
      timerPausado = true;
      insightModal.querySelector("#insight-icone").src = data.icone;
      insightModal.querySelector("#insight-titulo").textContent = data.nome;
      insightModal.querySelector("#insight-texto").textContent = data.texto;
      insightModal.classList.add("visivel");
    }
    function mostrarVitoriaJogo3(t2, historia2) {
      const vit = historia2.vitoria;
      const overlay = document.createElement("div");
      overlay.className = "j3-vitoria-overlay";
      overlay.innerHTML = `
        <div class="j3-vitoria-card">
          <div class="confetti-container" aria-hidden="true">${gerarConfetti()}</div>
          <h2 class="j3-vitoria-titulo">${t2.tituloVitoria || "CASO RESOLVIDO!"}</h2>
          <p class="j3-vitoria-texto">${vit?.texto || ""}</p>
          <button class="btn btn-primary" id="btn-j3-resultado">${t2.botaoAvancar || "VER RESULTADO"}</button>
        </div>`;
      root6.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add("visivel"));
      const btn = overlay.querySelector("#btn-j3-resultado");
      btn.addEventListener("pointerdown", () => {
        btn.classList.add("tocando");
        tocar("toque");
      });
      btn.addEventListener("pointerup", () => {
        btn.classList.remove("tocando");
        irPara("FINAL");
      });
      const autoTimer = setTimeout(() => irPara("FINAL"), 8e3);
      cleanup4.push(() => clearTimeout(autoTimer));
      const bgVit = "assets/cenarios/transporte_vitoria.jpg";
      const pv = new Image();
      pv.onload = () => {
        overlay.style.backgroundImage = `url('${bgVit}')`;
      };
      pv.src = bgVit;
    }
    palco.addEventListener("pointermove", onMove);
    palco.addEventListener("pointerdown", onMove);
    palco.addEventListener("pointerup", onTap);
    cleanup4.push(() => {
      palco.removeEventListener("pointermove", onMove);
      palco.removeEventListener("pointerdown", onMove);
      palco.removeEventListener("pointerup", onTap);
    });
    raf2 = requestAnimationFrame(atualizarMascara);
    tTimer2 = setInterval(() => {
      if (timerPausado) return;
      secundos--;
      hudSeg.textContent = secundos;
      if (timerProgJ3) {
        timerProgJ3.style.strokeDashoffset = CIRCUM_J3 * (1 - secundos / duracao);
        if (secundos <= 10) timerProgJ3.classList.add("urgente");
      }
      if (secundos <= 0) {
        clearInterval(tTimer2);
        tTimer2 = null;
        tocar("derrota");
        mostrarDerrota({
          titulo: historia.derrota?.titulo,
          texto: t.derrota
        }).then((escolha) => {
          if (escolha === "repetir") {
            ctx.sessao.modoJ3Direto = true;
            irPara("JOGO3_LANTERNA");
          } else {
            ctx.sessao.modoFinal = "neutro";
            irPara("FINAL");
          }
        });
      }
    }, 1e3);
  }
}
function gerarConfetti() {
  const cores = ["#ffcc00", "#e6a800", "#ffffff", "rgba(255,204,0,0.6)"];
  return Array.from({ length: 20 }, (_, i) => {
    const left = (i * 5 + i % 3 * 1.3).toFixed(1);
    const dur = (2 + i % 5 * 0.4).toFixed(1);
    const delay = (i * 0.12).toFixed(2);
    const rot = i * 37 % 360;
    const cor = cores[i % cores.length];
    return `<div class="conf" style="left:${left}%;--cdur:${dur}s;--cd:${delay}s;--cr:${rot}deg;background:${cor}"></div>`;
  }).join("");
}
function gerarPosicoes(n, palco) {
  const cols = Math.ceil(Math.sqrt(n));
  const rows = Math.ceil(n / cols);
  const isPortrait = window.innerHeight > window.innerWidth;
  const margemX = 10;
  const margemY = isPortrait ? 28 : 22;
  const passoX = (100 - margemX * 2) / Math.max(1, cols - 1);
  const passoY = (100 - margemY * 2) / Math.max(1, rows - 1);
  const ps = [];
  for (let i = 0; i < n; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    ps.push({
      x: margemX + (cols > 1 ? c * passoX : 50 - margemX) + (Math.random() - 0.5) * 6,
      y: margemY + (rows > 1 ? r * passoY : 50 - margemY) + (Math.random() - 0.5) * 6
    });
  }
  for (let i = ps.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ps[i], ps[j]] = [ps[j], ps[i]];
  }
  return ps;
}

// src/cenas/final.js
var root7 = null;
var tAuto2 = null;
function montar7(app, ctx) {
  return {
    onEnter() {
      const t = ctx.textosUI.final;
      const historia = ctx.sessao.historiaAtual;
      const vit = historia && historia.vitoria;
      const creditos = ctx.config.creditos;
      const logo = creditos.logoSrc;
      const neutro = ctx.sessao.modoFinal === "neutro";
      if (neutro) {
        app.innerHTML = `
          <section class="cena cena-final cena-final-neutro" id="cena-final">
            <img class="final-logo" src="${logo}" alt="TCE-PE" onerror="this.style.display='none'">
            <div class="final-grid">
              <div class="final-texto">
                <p class="final-frase final-bloco" style="animation-delay:0.2s">${t.fraseSintese}</p>
                <p class="final-sub final-bloco" style="animation-delay:0.8s">${t.subtexto}</p>
                <p class="final-inspiracao">${t.inspiracao}</p>
              </div>
              <div class="final-qr final-bloco" style="animation-delay:1.2s">
                <canvas id="final-qr-canvas" width="400" height="400"></canvas>
                <span class="final-qr-legenda">${t.qrLegenda}</span>
              </div>
            </div>
            <div class="final-acoes final-bloco" style="animation-delay:1.8s">
              <button class="btn btn-secondary" id="btn-novo">${t.botaoJogarNovo}</button>
            </div>
            <p class="final-creditos">${creditos.orgao} \xB7 ${creditos.ano}</p>
          </section>`;
      } else {
        app.innerHTML = `
          <section class="cena cena-final" id="cena-final">
            <img class="final-logo" src="${logo}" alt="TCE-PE" onerror="this.style.display='none'">
            ${vit ? `<h2 class="final-titulo-fase">${vit.titulo}</h2>` : ""}
            <div class="final-grid">
              <div class="final-texto">
                <p class="final-frase final-bloco" style="animation-delay:0.2s">${t.fraseSintese}</p>
                <p class="final-sub final-bloco" style="animation-delay:0.8s">${t.subtexto}</p>
                <p class="final-inspiracao">${t.inspiracao}</p>
              </div>
              <div class="final-qr final-bloco" style="animation-delay:1.4s">
                <canvas id="final-qr-canvas" width="400" height="400"></canvas>
                <span class="final-qr-legenda">${t.qrLegendaVitoria || t.qrLegenda}</span>
              </div>
            </div>
            <div class="final-acoes final-bloco" style="animation-delay:2.0s">
              <button class="btn btn-secondary" id="btn-novo">${t.botaoJogarNovo}</button>
            </div>
            <p class="final-creditos">${creditos.orgao} \xB7 ${creditos.ano}</p>
            <div class="confetti-container" aria-hidden="true">${gerarConfetti2()}</div>
          </section>`;
        tocar("vitoria");
      }
      root7 = app.querySelector("#cena-final");
      renderQR(ctx.config.qrUrl);
      const btnNovo = root7.querySelector("#btn-novo");
      anexarBotao3(btnNovo, () => {
        ctx.sessao.numero++;
        irPara("ATTRACT");
      });
      pararIdle();
      tAuto2 = setTimeout(() => {
        ctx.sessao.numero++;
        irPara("ATTRACT");
      }, ctx.config.finalAutoResetMs);
    },
    onExit() {
      clearTimeout(tAuto2);
      tAuto2 = null;
      root7 = null;
      ctx.sessao.modoFinal = null;
      configurarIdle(ctx.config.idleTimeoutMs);
    }
  };
}
function renderQR(url) {
  try {
    const canvas = document.getElementById("final-qr-canvas");
    if (!canvas || typeof QRious === "undefined") return;
    new QRious({
      element: canvas,
      value: url || "",
      size: 400,
      level: "M",
      background: "#ffffff",
      foreground: "#003366"
    });
  } catch (e) {
    console.error("QR render falhou", e);
  }
}
function gerarConfetti2() {
  const cores = ["#ffcc00", "#e6a800", "#ffffff", "rgba(255,204,0,0.6)"];
  return Array.from({ length: 20 }, (_, i) => {
    const left = (i * 5 + i % 3 * 1.3).toFixed(1);
    const dur = (2 + i % 5 * 0.4).toFixed(1);
    const delay = (i * 0.12).toFixed(2);
    const rot = i * 37 % 360;
    const cor = cores[i % cores.length];
    return `<div class="conf" style="left:${left}%;--cdur:${dur}s;--cd:${delay}s;--cr:${rot}deg;background:${cor}"></div>`;
  }).join("");
}
function anexarBotao3(btn, acao) {
  btn.addEventListener("pointerdown", () => {
    btn.classList.add("tocando");
    tocar("toque");
  });
  btn.addEventListener("pointerup", () => {
    btn.classList.remove("tocando");
    acao();
  });
  btn.addEventListener("pointercancel", () => btn.classList.remove("tocando"));
  btn.addEventListener("pointerleave", () => btn.classList.remove("tocando"));
}

// src/main.js
async function main() {
  const app = document.getElementById("app");
  carregarSons();
  let conteudo;
  try {
    conteudo = await carregarTudo();
  } catch (e) {
    mostrarErro(app, "Conte\xFAdo indispon\xEDvel.", "Contate o mediador. (" + e.message + ")");
    console.error(e);
    return;
  }
  const sessao = { numero: 0, historiaAtual: null };
  const ctx = { ...conteudo, sessao };
  onMudarCena((nome) => {
    document.body.setAttribute("data-estado", nome);
  });
  registrar("ATTRACT", montar(app, ctx));
  registrar("ROLETA_GIRANDO", montar2(app, ctx));
  registrar("INTRO_CONSENSUALISMO", montar3(app, ctx));
  registrar("JOGO1_COLETOR", montar4(app, ctx));
  registrar("JOGO2_LIGAR", montar5(app, ctx));
  registrar("JOGO3_LANTERNA", montar6(app, ctx));
  registrar("FINAL", montar7(app, ctx));
  iniciarIdleGlobal(ctx.config.idleTimeoutMs);
  configurarIdle(ctx.config.idleTimeoutMs);
  const params = new URLSearchParams(location.search);
  const cenaInicial = params.get("cena");
  const historiaId = params.get("historia");
  if (historiaId) {
    const idx = ctx.historias.findIndex((h) => h.id === historiaId);
    if (idx >= 0) sessao.numero = idx;
  }
  if (cenaInicial && cenaInicial !== "ATTRACT") {
    sessao.historiaAtual = ctx.historias[0];
  }
  await irPara(cenaInicial && validaCena(cenaInicial) ? cenaInicial : "ATTRACT");
}
function validaCena(nome) {
  return [
    "ATTRACT",
    "ROLETA_GIRANDO",
    "INTRO_CONSENSUALISMO",
    "JOGO1_COLETOR",
    "JOGO2_LIGAR",
    "JOGO3_LANTERNA",
    "FINAL"
  ].includes(nome);
}
function mostrarErro(app, titulo, detalhe) {
  app.innerHTML = `
    <div class="tela-erro">
      <h1>${titulo}</h1>
      <p>${detalhe}</p>
    </div>`;
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
