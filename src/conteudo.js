// Loader dos dados de conteúdo.
// Versão offline: importa direto como módulos JS (sem fetch).

import config from '../docs/20-conteudo/config.js';
import principios from '../docs/20-conteudo/principios.data.js';
import instrumentos from '../docs/20-conteudo/instrumentos.data.js';
import coletor from '../docs/20-conteudo/coletor.data.js';
import textosUI from '../docs/20-conteudo/textos-ui.data.js';
import historiaTransporte from '../docs/20-conteudo/historias/transporte-urbano.data.js';
import historiaAterro from '../docs/20-conteudo/historias/aterro.data.js';
import historiaEscolar from '../docs/20-conteudo/historias/escolar.data.js';

const todasHistorias = {
  'transporte-urbano': historiaTransporte,
  'aterro': historiaAterro,
  'escolar': historiaEscolar,
};

export async function carregarTudo() {
  const historias = config.historiasAtivas.map((id) => todasHistorias[id]);

  return {
    config,
    principios,
    instrumentos,
    coletor,
    textosUI,
    historias,
  };
}

export function sortearHistoria(historias) {
  return historias[0];
}
