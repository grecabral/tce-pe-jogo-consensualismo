import { irPara, configurarIdle, pararIdle } from '../estado.js';
import { tocar } from '../audio.js';

let root = null;
let tAuto = null;

export function montar(app, ctx) {
  return {
    onEnter() {
      const t = ctx.textosUI.final;
      const historia = ctx.sessao.historiaAtual;
      const vit = historia && historia.vitoria;
      const creditos = ctx.config.creditos;
      const logo = creditos.logoSrc;
      const neutro = ctx.sessao.modoFinal === 'neutro';

      if (neutro) {
        // Tela final de derrota — sem vitória, sem confetti, tom neutro
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
            <p class="final-creditos">${creditos.orgao} · ${creditos.ano}</p>
          </section>`;
      } else {
        // Tela final de vitória — com título da vitória e confetti
        app.innerHTML = `
          <section class="cena cena-final" id="cena-final">
            <img class="final-logo" src="${logo}" alt="TCE-PE" onerror="this.style.display='none'">
            ${vit ? `<h2 class="final-titulo-fase">${vit.titulo}</h2>` : ''}
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
            <p class="final-creditos">${creditos.orgao} · ${creditos.ano}</p>
            <div class="confetti-container" aria-hidden="true">${gerarConfetti()}</div>
          </section>`;

        tocar('vitoria');
      }

      root = app.querySelector('#cena-final');
      renderQR(ctx.config.qrUrl);

      const btnNovo = root.querySelector('#btn-novo');
      anexarBotao(btnNovo, () => {
        ctx.sessao.numero++;
        irPara('ATTRACT');
      });

      pararIdle();
      tAuto = setTimeout(() => {
        ctx.sessao.numero++;
        irPara('ATTRACT');
      }, ctx.config.finalAutoResetMs);
    },
    onExit() {
      clearTimeout(tAuto);
      tAuto = null;
      root = null;
      ctx.sessao.modoFinal = null;
      configurarIdle(ctx.config.idleTimeoutMs);
    },
  };
}

function renderQR(url) {
  try {
    const canvas = document.getElementById('final-qr-canvas');
    if (!canvas || typeof QRious === 'undefined') return;
    new QRious({
      element: canvas,
      value: url || '',
      size: 400,
      level: 'M',
      background: '#ffffff',
      foreground: '#003366',
    });
  } catch (e) {
    console.error('QR render falhou', e);
  }
}

function gerarConfetti() {
  const cores = ['#ffcc00', '#e6a800', '#ffffff', 'rgba(255,204,0,0.6)'];
  return Array.from({ length: 20 }, (_, i) => {
    const left  = (i * 5 + (i % 3) * 1.3).toFixed(1);
    const dur   = (2 + (i % 5) * 0.4).toFixed(1);
    const delay = (i * 0.12).toFixed(2);
    const rot   = (i * 37) % 360;
    const cor   = cores[i % cores.length];
    return `<div class="conf" style="left:${left}%;--cdur:${dur}s;--cd:${delay}s;--cr:${rot}deg;background:${cor}"></div>`;
  }).join('');
}

function anexarBotao(btn, acao) {
  btn.addEventListener('pointerdown', () => { btn.classList.add('tocando'); tocar('toque'); });
  btn.addEventListener('pointerup', () => { btn.classList.remove('tocando'); acao(); });
  btn.addEventListener('pointercancel', () => btn.classList.remove('tocando'));
  btn.addEventListener('pointerleave',  () => btn.classList.remove('tocando'));
}
