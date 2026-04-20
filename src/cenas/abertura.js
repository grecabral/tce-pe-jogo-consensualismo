import { irPara, configurarIdle } from '../estado.js';
import { sortearHistoria } from '../conteudo.js';

let root = null;
let onToque = null;

export function montar(app, ctx) {
  return {
    onEnter() {
      configurarIdle(ctx.config.idleTimeoutMs);
      const historia = sortearHistoria(ctx.historias, ctx.sessao.numero);
      ctx.sessao.historiaAtual = historia;

      const t = ctx.textosUI.abertura;
      const ab = historia.abertura;
      const bgPath = `assets/${ab.imagemFundo}`;

      app.innerHTML = `
        <section class="cena cena-abertura fundo-fallback-${historia.id}" id="cena-abertura">
          <span class="tag-missao">${ab.rotulo || t.rotuloMissao}</span>
          <h1 class="abertura-titulo">${ab.titulo}</h1>
          <p class="abertura-contexto">${ab.contexto}</p>
          <button class="btn btn-primary" id="btn-iniciar">${t.botaoIniciar}</button>
        </section>`;

      root = app.querySelector('#cena-abertura');

      // Tenta carregar imagem; se OK, usa como fundo. Se falhar, fica o gradiente.
      const imgProbe = new Image();
      imgProbe.onload = () => {
        if (!root) return;
        root.style.backgroundImage = `url('${bgPath}')`;
      };
      imgProbe.onerror = () => { /* gradiente-fallback já aplicado pela classe */ };
      imgProbe.src = bgPath;

      const btn = root.querySelector('#btn-iniciar');
      onToque = () => irPara('JOGO1_LIGAR');
      anexarBotao(btn, onToque);
    },
    onExit() {
      root = null;
      onToque = null;
    },
  };
}

function anexarBotao(btn, acao) {
  btn.addEventListener('pointerdown', () => btn.classList.add('tocando'));
  btn.addEventListener('pointerup',   () => {
    btn.classList.remove('tocando');
    acao();
  });
  btn.addEventListener('pointercancel', () => btn.classList.remove('tocando'));
  btn.addEventListener('pointerleave',  () => btn.classList.remove('tocando'));
}
