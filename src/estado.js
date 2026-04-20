// State machine + idle timer globais.
// Cenas registram-se via `registrar(nome, { onEnter, onExit })` e
// navegam via `irPara(nome)`. Idle padrão em 45s; FINAL override em 10s.

const cenas = new Map();
let estadoAtual = null;
let cenaInstanciaAtual = null;
let idleTimeout = null;
let idleMsAtual = 45_000;
let aoMudarCena = () => {};
let avisoTimer = null;
let avisoTickTimer = null;

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

  const app = document.getElementById('app');
  const primeiraCena = cenaInstanciaAtual === null;

  if (!primeiraCena && app) {
    app.classList.add('trocando');
    await esperar(200);
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

  if (app) {
    requestAnimationFrame(() => app.classList.remove('trocando'));
  }

  resetIdleTimer();
}

function esperar(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export function estado() { return estadoAtual; }

export function configurarIdle(ms) {
  idleMsAtual = ms;
  resetIdleTimer();
}

export function resetIdleTimer() {
  clearTimeout(idleTimeout);
  clearTimeout(avisoTimer);
  clearInterval(avisoTickTimer);
  esconderAviso();
  if (idleMsAtual <= 0) return;
  if (estadoAtual === 'ATTRACT') return;
  idleTimeout = setTimeout(() => {
    irPara('ATTRACT');
  }, idleMsAtual);
  const avisoDelay = Math.max(0, idleMsAtual - 10_000);
  avisoTimer = setTimeout(() => iniciarAviso(10), avisoDelay);
}

export function pararIdle() {
  clearTimeout(idleTimeout);
  clearTimeout(avisoTimer);
  clearInterval(avisoTickTimer);
  esconderAviso();
}

function iniciarAviso(seg) {
  let restante = seg;
  mostrarAviso(`Volta em ${restante}s`);
  avisoTickTimer = setInterval(() => {
    restante--;
    if (restante <= 0) { clearInterval(avisoTickTimer); esconderAviso(); return; }
    mostrarAviso(`Volta em ${restante}s`);
  }, 1000);
}

function mostrarAviso(texto) {
  let el = document.getElementById('aviso-idle');
  if (!el) {
    el = document.createElement('div');
    el.id = 'aviso-idle';
    el.className = 'aviso-idle';
    document.body.appendChild(el);
  }
  el.textContent = texto;
}

function esconderAviso() {
  const el = document.getElementById('aviso-idle');
  if (el) el.remove();
}

export function iniciarIdleGlobal(msPadrao) {
  idleMsAtual = msPadrao;
  const eventos = ['pointerdown', 'pointermove', 'click', 'touchstart'];
  const handler = () => resetIdleTimer();
  for (const ev of eventos) {
    document.addEventListener(ev, handler, { passive: true });
  }
}
