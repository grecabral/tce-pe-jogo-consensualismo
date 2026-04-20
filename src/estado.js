// State machine + idle timer globais.
// Cenas registram-se via `registrar(nome, { onEnter, onExit })` e
// navegam via `irPara(nome)`. Idle padrão em 45s; FINAL override em 10s.

const cenas = new Map();
let estadoAtual = null;
let cenaInstanciaAtual = null;
let idleTimeout = null;
let idleMsAtual = 45_000;
let aoMudarCena = () => {};

export function registrar(nome, defs) {
  cenas.set(nome, defs);
}

export function onMudarCena(cb) {
  aoMudarCena = cb;
}

export async function irPara(nome, args = {}) {
  if (!cenas.has(nome)) {
    console.error('Cena desconhecida:', nome);
    return;
  }

  if (cenaInstanciaAtual && typeof cenaInstanciaAtual.onExit === 'function') {
    try { cenaInstanciaAtual.onExit(); } catch (e) { console.error('onExit falhou', e); }
  }

  estadoAtual = nome;
  const defs = cenas.get(nome);
  cenaInstanciaAtual = { ...defs };

  aoMudarCena(nome);

  if (typeof cenaInstanciaAtual.onEnter === 'function') {
    try { await cenaInstanciaAtual.onEnter(args); }
    catch (e) { console.error('onEnter falhou', e); }
  }

  resetIdleTimer();
}

export function estado() { return estadoAtual; }

export function configurarIdle(ms) {
  idleMsAtual = ms;
  resetIdleTimer();
}

export function resetIdleTimer() {
  clearTimeout(idleTimeout);
  if (idleMsAtual <= 0) return;
  if (estadoAtual === 'ATTRACT') return;
  idleTimeout = setTimeout(() => {
    irPara('ATTRACT');
  }, idleMsAtual);
}

export function pararIdle() {
  clearTimeout(idleTimeout);
}

export function iniciarIdleGlobal(msPadrao) {
  idleMsAtual = msPadrao;
  const eventos = ['pointerdown', 'pointermove', 'click', 'touchstart'];
  const handler = () => resetIdleTimer();
  for (const ev of eventos) {
    document.addEventListener(ev, handler, { passive: true });
  }
}
