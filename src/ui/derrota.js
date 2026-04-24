// Overlay de derrota com escolha: jogar de novo ou ver resultado final.
// Resolve com 'repetir' ou 'final' conforme botão tocado.

import { tocar } from '../audio.js';

export function mostrarDerrota({ titulo, texto }) {
  return new Promise((resolve) => {
    const el = document.createElement('div');
    el.className = 'overlay-derrota';
    el.setAttribute('role', 'alertdialog');
    el.innerHTML = `
      <div class="overlay-derrota-card">
        ${titulo ? `<h2>${titulo}</h2>` : ''}
        ${texto  ? `<p>${texto}</p>`    : ''}
        <div class="derrota-botoes">
          <button class="btn btn-primary" id="btn-derrota-repetir">JOGAR DE NOVO</button>
          <button class="btn btn-derrota-final" id="btn-derrota-final">FINALIZAR</button>
        </div>
      </div>`;
    document.body.appendChild(el);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => el.classList.add('visivel'));
    });

    function fechar(escolha) {
      el.classList.remove('visivel');
      setTimeout(() => { el.remove(); resolve(escolha); }, 300);
    }

    const btnRepetir = el.querySelector('#btn-derrota-repetir');
    const btnFinal   = el.querySelector('#btn-derrota-final');

    btnRepetir.addEventListener('pointerdown', () => { btnRepetir.classList.add('tocando'); tocar('toque'); });
    btnRepetir.addEventListener('pointerup',   () => { btnRepetir.classList.remove('tocando'); fechar('repetir'); });

    btnFinal.addEventListener('pointerdown', () => { btnFinal.classList.add('tocando'); });
    btnFinal.addEventListener('pointerup',   () => { btnFinal.classList.remove('tocando'); fechar('final'); });
  });
}
