// Overlay de derrota compartilhado entre Jogo 2 e Jogo 3.
// Mostra título + texto curto, fade-in 300ms, hold 2500ms, fade-out 300ms.
// Promise resolve quando o overlay já foi removido do DOM — a cena que
// chamou pode então transitar (normalmente para ATTRACT).

export function mostrarDerrota({ titulo, texto }) {
  return new Promise((resolve) => {
    const el = document.createElement('div');
    el.className = 'overlay-derrota';
    el.setAttribute('role', 'alert');
    el.innerHTML = `
      <div class="overlay-derrota-card">
        ${titulo ? `<h2>${titulo}</h2>` : ''}
        ${texto  ? `<p>${texto}</p>`     : ''}
      </div>`;
    document.body.appendChild(el);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => el.classList.add('visivel'));
    });

    setTimeout(() => el.classList.remove('visivel'), 300 + 2500);
    setTimeout(() => { el.remove(); resolve(); }, 300 + 2500 + 300);
  });
}
