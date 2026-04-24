import { irPara, pararIdle } from '../estado.js';

const NUM_LUZES = 24;

let root = null;
let tAuto = null;
let tMsg = null;
let onToque = null;

const LABELS = ['Jogar', 'Desafio', 'Jogar', 'Desafio', 'Jogar', 'Desafio', 'Jogar', 'Prêmio'];

function criarLuzes(anel, raio) {
  for (let i = 0; i < NUM_LUZES; i++) {
    const ang = (i * (360 / NUM_LUZES)) * (Math.PI / 180);
    const luz = document.createElement('div');
    luz.className = 'roleta-luz';
    luz.style.left = (raio + raio * Math.cos(ang) - 5.5) + 'px';
    luz.style.top  = (raio + raio * Math.sin(ang) - 5.5) + 'px';
    anel.appendChild(luz);
  }
}

export function montar(app, ctx) {
  return {
    onEnter() {
      pararIdle();
      const t = ctx.textosUI.roletaGirando;

      const labelsHTML = LABELS.map(l =>
        `<div class="roleta-label"><span>${l}</span></div>`
      ).join('');

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

      root = app.querySelector('#cena-roleta');
      const msg = root.querySelector('.roleta-mensagem');

      requestAnimationFrame(() => {
        const anel = root.querySelector('#roleta-anel-spin');
        const raio = anel.offsetWidth / 2;
        criarLuzes(anel, raio);
      });

      tMsg  = setTimeout(() => msg.classList.add("visivel"), 3500);
      tAuto = setTimeout(() => irPara('INTRO_CONSENSUALISMO'), 9000);

      onToque = () => irPara('INTRO_CONSENSUALISMO');
      root.addEventListener('pointerdown', onToque, { passive: true });
    },
    onExit() {
      clearTimeout(tAuto);
      clearTimeout(tMsg);
      if (root && onToque) root.removeEventListener('pointerdown', onToque);
      root = null;
      tAuto = null;
      tMsg = null;
      onToque = null;
    },
  };
}
