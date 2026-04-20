// Loader dos JSONs de conteúdo.
// V1: lê direto de docs/20-conteudo/ (sem duplicar — decisão do briefing).
// Se o dono editar um JSON, o próximo reload pega.

import config from '../docs/20-conteudo/config.js';

const BASE = 'docs/20-conteudo';

async function lerJson(caminho) {
  const resp = await fetch(caminho, { cache: 'no-store' });
  if (!resp.ok) throw new Error(`Falha ao carregar ${caminho}: HTTP ${resp.status}`);
  return resp.json();
}

export async function carregarTudo() {
  const [principios, instrumentos, coletor, textosUI] = await Promise.all([
    lerJson(`${BASE}/principios.json`),
    lerJson(`${BASE}/instrumentos.json`),
    lerJson(`${BASE}/coletor.json`),
    lerJson(`${BASE}/textos-ui.json`),
  ]);

  const historias = await Promise.all(
    config.historiasAtivas.map((id) => lerJson(`${BASE}/historias/${id}.json`))
  );

  return {
    config,
    principios,
    instrumentos,
    coletor,
    textosUI,
    historias,
  };
}

export function sortearHistoria(historias, sessao) {
  return historias[sessao % historias.length];
}
