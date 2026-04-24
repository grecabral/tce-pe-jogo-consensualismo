import { irPara, resetIdleTimer, configurarIdle } from '../estado.js';
import { sortearHistoria } from '../conteudo.js';
import { tocar } from '../audio.js';

let root = null;
let cleanup = [];

function calcularTempoLeitura(_texto) {
  return 6000;
}

export function montar(app, ctx) {
  return {
    onEnter() {
      configurarIdle(ctx.config.idleTimeoutMs);
      ctx.sessao.historiaAtual = sortearHistoria(ctx.historias, ctx.sessao.numero);

      const t = ctx.textosUI.introConsensualism;
      const blocos = t.texto.split('\n\n').filter((b) => b.trim() !== '');
      const paragrafosHTML = blocos.map((b, i) => {
        const destaque = i === blocos.length - 1;
        const delay = (0.2 + i * 0.6).toFixed(1);
        return `<p class="intro-paragrafo${destaque ? ' intro-destaque' : ''}" style="animation-delay:${delay}s">${b.trim()}</p>`;
      }).join('');

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

      root = app.querySelector('#cena-intro');
      root.addEventListener('pointerdown', resetIdleTimer, { passive: true });

      const btn = root.querySelector('#btn-intro');
      const textoCompleto = blocos.join(' ');
      const tLeitura = calcularTempoLeitura(textoCompleto);
      const tid = setTimeout(() => {
        if (!btn) return;
        btn.classList.remove('btn-bloqueado');
        btn.classList.add('btn-desbloqueado');
      }, tLeitura);
      cleanup.push(() => clearTimeout(tid));

      anexarBotao(btn, () => irPara('JOGO1_COLETOR'));
    },
    onExit() {
      cleanup.forEach((fn) => { try { fn(); } catch (_) {} });
      cleanup = [];
      root = null;
    },
  };
}

function anexarBotao(btn, acao) {
  btn.addEventListener('pointerdown', () => { btn.classList.add('tocando'); tocar('toque'); });
  btn.addEventListener('pointerup',   () => { btn.classList.remove('tocando'); acao(); });
  btn.addEventListener('pointercancel', () => btn.classList.remove('tocando'));
  btn.addEventListener('pointerleave',  () => btn.classList.remove('tocando'));
}
