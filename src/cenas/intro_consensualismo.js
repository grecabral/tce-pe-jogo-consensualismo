import { irPara, resetIdleTimer, configurarIdle } from '../estado.js';
import { sortearHistoria } from '../conteudo.js';

let root = null;

export function montar(app, ctx) {
  return {
    onEnter() {
      configurarIdle(ctx.config.idleTimeoutMs);
      ctx.sessao.historiaAtual = sortearHistoria(ctx.historias, ctx.sessao.numero);

      const t = ctx.textosUI.introConsensualism;
      const paragrafos = t.texto.split('\n\n').map((p) => `<p class="intro-texto">${p}</p>`).join('');

      app.innerHTML = `
        <section class="cena cena-intro" id="cena-intro">
          <div class="intro-conteudo">
            <img class="intro-icone" src="assets/ui/toque.svg" alt=""
              onerror="this.style.display='none'">
            <h1 class="intro-titulo">${t.titulo}</h1>
            ${paragrafos}
            <button class="btn btn-primary" id="btn-intro">${t.botaoContinuar}</button>
          </div>
        </section>`;

      root = app.querySelector('#cena-intro');
      root.addEventListener('pointerdown', resetIdleTimer, { passive: true });
      anexarBotao(root.querySelector('#btn-intro'), () => irPara('JOGO1_COLETOR'));
    },
    onExit() {
      root = null;
    },
  };
}

function anexarBotao(btn, acao) {
  btn.addEventListener('pointerdown', () => btn.classList.add('tocando'));
  btn.addEventListener('pointerup',   () => { btn.classList.remove('tocando'); acao(); });
  btn.addEventListener('pointercancel', () => btn.classList.remove('tocando'));
  btn.addEventListener('pointerleave',  () => btn.classList.remove('tocando'));
}
