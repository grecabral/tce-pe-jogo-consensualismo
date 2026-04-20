import { irPara, pararIdle } from '../estado.js';

let root = null;
let tAuto = null;
let tMsg = null;
let onToque = null;

export function montar(app, ctx) {
  return {
    onEnter() {
      pararIdle();
      const t = ctx.textosUI.roletaGirando;
      app.innerHTML = `
        <section class="cena cena-attract cena-roleta-girando" id="cena-roleta">
          <div class="attract-roleta">
            <div class="roleta-centro">CONSENSO</div>
            <div class="roleta-mensagem">${t.mensagemParou}</div>
          </div>
        </section>`;
      root = app.querySelector('#cena-roleta');
      const msg = root.querySelector('.roleta-mensagem');

      tMsg = setTimeout(() => msg.classList.add('visivel'), 3500);
      tAuto = setTimeout(() => irPara('ABERTURA'), 4200);

      onToque = () => irPara('ABERTURA');
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
