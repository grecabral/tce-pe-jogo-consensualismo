import { irPara, configurarIdle, pararIdle } from '../estado.js';

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

      app.innerHTML = `
        <section class="cena cena-final" id="cena-final">
          <img class="final-logo" src="${logo}" alt="TCE-PE" onerror="this.style.display='none'">
          ${vit ? `<h2 class="final-titulo-fase">${vit.titulo}</h2>` : ''}
          <div class="final-grid">
            <div class="final-texto">
              <p class="final-frase">${t.fraseSintese}</p>
              <p class="final-sub">${t.subtexto}</p>
              <p class="final-inspiracao">${t.inspiracao}</p>
            </div>
            <div class="final-qr">
              <canvas id="final-qr-canvas" width="400" height="400"></canvas>
              <span class="final-qr-legenda">${t.qrLegenda}</span>
            </div>
          </div>
          <div class="final-acoes">
            <button class="btn btn-secondary" id="btn-novo">${t.botaoJogarNovo}</button>
          </div>
          <p class="final-creditos">${creditos.orgao} · ${creditos.ano}</p>
        </section>`;

      root = app.querySelector('#cena-final');

      renderQR(ctx.config.qrUrl);

      const btnNovo = root.querySelector('#btn-novo');
      anexarBotao(btnNovo, () => {
        ctx.sessao.numero++;
        irPara('ATTRACT');
      });

      // Auto-reset 10s para attract (override do idle padrão).
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

function anexarBotao(btn, acao) {
  btn.addEventListener('pointerdown', () => btn.classList.add('tocando'));
  btn.addEventListener('pointerup', () => {
    btn.classList.remove('tocando');
    acao();
  });
  btn.addEventListener('pointercancel', () => btn.classList.remove('tocando'));
  btn.addEventListener('pointerleave',  () => btn.classList.remove('tocando'));
}
