// Bootstrap + wiring da state machine.

import { carregarTudo } from './conteudo.js';
import { registrar, irPara, iniciarIdleGlobal, configurarIdle, onMudarCena } from './estado.js';

import { montar as montarAttract }        from './cenas/attract.js';
import { montar as montarRoletaGirando }  from './cenas/roleta_girando.js';
import { montar as montarAbertura }       from './cenas/abertura.js';
import { montar as montarJogo1 }          from './cenas/jogo1_ligar.js';
import { montar as montarJogo2 }          from './cenas/jogo2_lanterna.js';
import { montar as montarJogo3 }          from './cenas/jogo3_coletor.js';
import { montar as montarFinal }          from './cenas/final.js';

async function main() {
  const app = document.getElementById('app');

  let conteudo;
  try {
    conteudo = await carregarTudo();
  } catch (e) {
    mostrarErro(app, 'Conteúdo indisponível.', 'Contate o mediador. (' + e.message + ')');
    console.error(e);
    return;
  }

  const sessao = { numero: 0, historiaAtual: null };
  const ctx = { ...conteudo, sessao };

  onMudarCena((nome) => {
    document.body.setAttribute('data-estado', nome);
  });

  registrar('ATTRACT',         montarAttract(app, ctx));
  registrar('ROLETA_GIRANDO',  montarRoletaGirando(app, ctx));
  registrar('ABERTURA',        montarAbertura(app, ctx));
  registrar('JOGO1_LIGAR',     montarJogo1(app, ctx));
  registrar('JOGO2_LANTERNA',  montarJogo2(app, ctx));
  registrar('JOGO3_COLETOR',   montarJogo3(app, ctx));
  registrar('FINAL',           montarFinal(app, ctx));

  iniciarIdleGlobal(ctx.config.idleTimeoutMs);
  configurarIdle(ctx.config.idleTimeoutMs);

  // Debug: ?cena=NOME permite pular direto (uso do QA). ?historia=ID
  // força a história sorteada. Em produção, URL fica limpa e cai no ATTRACT.
  const params = new URLSearchParams(location.search);
  const cenaInicial = params.get('cena');
  const historiaId = params.get('historia');
  if (historiaId) {
    const idx = ctx.historias.findIndex((h) => h.id === historiaId);
    if (idx >= 0) sessao.numero = idx;
  }
  // Quando pulamos direto para uma cena que depende de historiaAtual,
  // pré-seleciona (no fluxo normal, ABERTURA que faz isso).
  if (cenaInicial && cenaInicial !== 'ATTRACT') {
    sessao.historiaAtual = ctx.historias[sessao.numero % ctx.historias.length];
  }
  await irPara(cenaInicial && validaCena(cenaInicial) ? cenaInicial : 'ATTRACT');
}

function validaCena(nome) {
  return ['ATTRACT','ROLETA_GIRANDO','ABERTURA','JOGO1_LIGAR','JOGO2_LANTERNA','JOGO3_COLETOR','FINAL'].includes(nome);
}

function mostrarErro(app, titulo, detalhe) {
  app.innerHTML = `
    <div class="tela-erro">
      <h1>${titulo}</h1>
      <p>${detalhe}</p>
    </div>`;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
