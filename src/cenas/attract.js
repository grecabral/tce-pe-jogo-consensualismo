import { irPara, pararIdle } from '../estado.js';
import { toggleMute, isMuted } from '../audio.js';

const LABELS = ['Jogar', 'Desafio', 'Jogar', 'Desafio', 'Jogar', 'Tente de novo', 'Jogar', 'Prêmio'];
const NUM_LUZES = 24;

let root = null;
let onToque = null;

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
      const t = ctx.textosUI.attract;
      const logo = ctx.config.creditos.logoSrc;

      const labelsHTML = LABELS.map(l =>
        `<div class="roleta-label"><span>${l}</span></div>`
      ).join('');

      app.innerHTML = `
        <section class="cena cena-attract" id="cena-attract">
          <p class="attract-supertitulo">TCE-PE apresenta</p>
          <img class="attract-logo" src="${logo}" alt="TCE-PE" onerror="this.style.display='none'">
          <div class="attract-roleta-outer">
            <div class="roleta-ponteiro"></div>
            <div class="attract-roleta-anel" id="roleta-anel"></div>
            <div class="attract-roleta-disco"></div>
            <div class="roleta-labels">${labelsHTML}</div>
            <div class="roleta-centro">GIRAR<br>ROLETA</div>
          </div>
          <h1 class="attract-chamada entrada-1">${t.chamada}</h1>
          <p class="attract-subtitulo entrada-2">${t.subtitulo}</p>
          <button class="btn-mute" id="btn-mute" aria-label="Alternar som"></button>
          <div class="attract-particulas" aria-hidden="true">
            ${Array.from({length:12}, () => '<span class="particula"></span>').join('')}
          </div>
        </section>`;

      root = app.querySelector('#cena-attract');

      // Gera luzes após render para ter dimensões reais
      requestAnimationFrame(() => {
        const anel = root.querySelector('#roleta-anel');
        const raio = anel.offsetWidth / 2;
        criarLuzes(anel, raio);
      });

      // Botão mute
      const btnMute = root.querySelector('#btn-mute');
      function atualizarIconeMute() {
        btnMute.textContent = isMuted() ? '🔇' : '🔊';
      }
      atualizarIconeMute();
      btnMute.addEventListener('pointerdown', (ev) => {
        ev.stopPropagation(); // não dispara irPara
        toggleMute();
        atualizarIconeMute();
      });

      onToque = () => irPara('ROLETA_GIRANDO');
      root.addEventListener('pointerdown', onToque, { passive: true });
    },
    onExit() {
      if (root && onToque) root.removeEventListener('pointerdown', onToque);
      root = null;
      onToque = null;
    },
  };
}
