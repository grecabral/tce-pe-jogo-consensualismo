import { irPara, pararIdle } from '../estado.js';

let root = null;
let onToque = null;

export function montar(app, ctx) {
  return {
    onEnter() {
      pararIdle();
      const t = ctx.textosUI.attract;
      const logo = ctx.config.creditos.logoSrc;
      app.innerHTML = `
        <section class="cena cena-attract" id="cena-attract">
          <img class="attract-logo" src="${logo}" alt="TCE-PE" onerror="this.style.display='none'">
          <div class="attract-roleta"><div class="roleta-centro">CONSENSO</div></div>
          <h1 class="attract-chamada">${t.chamada}</h1>
          <p class="attract-subtitulo">${t.subtitulo}</p>
        </section>`;
      root = app.querySelector('#cena-attract');
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
