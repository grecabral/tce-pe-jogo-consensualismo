import { irPara, configurarIdle } from '../estado.js';
import { sortearHistoria } from '../conteudo.js';

let root = null;
let onToque = null;
let cleanup = [];

function calcularTempoLeitura(texto) {
  const palavras = texto.trim().split(/\s+/).length;
  return Math.max(2500, Math.ceil((palavras / 200) * 60 * 1000));
}

function revelarEmBlocos(texto) {
  const blocos = texto.split(/(?<=[.!?])\s+|\n/).filter((b) => b.trim());
  const totalPalavras = blocos.reduce((acc, b) => acc + b.trim().split(/\s+/).length, 0);
  let acumulado = 0;
  return blocos.map((bloco) => {
    const palavrasBloco = bloco.trim().split(/\s+/).length;
    const delay = (acumulado / Math.max(1, totalPalavras) * 2).toFixed(2);
    acumulado += palavrasBloco;
    return `<span class="bloco-texto" style="animation-delay:${delay}s">${bloco.trim()} </span>`;
  }).join('');
}

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
          <p class="abertura-contexto">${revelarEmBlocos(ab.contexto)}</p>
          <button class="btn btn-primary btn-bloqueado" id="btn-iniciar">${t.botaoIniciar}</button>
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
      const tLeitura = calcularTempoLeitura(ab.contexto);
      const tid = setTimeout(() => {
        if (!btn) return;
        btn.classList.remove('btn-bloqueado');
        btn.classList.add('btn-desbloqueado');
      }, tLeitura);
      cleanup.push(() => clearTimeout(tid));

      onToque = () => irPara('JOGO1_LIGAR');
      anexarBotao(btn, onToque);
    },
    onExit() {
      cleanup.forEach((fn) => { try { fn(); } catch (_) {} });
      cleanup = [];
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
