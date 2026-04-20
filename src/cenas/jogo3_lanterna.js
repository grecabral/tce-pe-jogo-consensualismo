// Jogo 3 — Lanterna: revelar instrumentos em cenário escuro.
// Máscara radial segue o dedo (PointerEvent). Itens escondidos só aparecem
// dentro do círculo. Tocar instrumento → coleta + insight modal 2s.
// Tocar armadilha → -5s + shake + explicação.

import { irPara, resetIdleTimer } from '../estado.js';
import { mostrarDerrota } from '../ui/derrota.js';

let raf = null;
let tTimer = null;
let root = null;
let cleanup = [];
let fase = 'transicao'; // reset em onExit

const RAIO = 180;
const COLETAR_ALVO = 5;

export function montar(app, ctx) {
  return {
    onEnter() {
      fase = 'transicao';
      const t = ctx.textosUI.jogo3;
      const historia = ctx.sessao.historiaAtual;

      app.innerHTML = `
        <section class="cena cena-jogo3-transicao" id="cena-jogo3-trans">
          <div class="intro-conteudo">
            <h1 class="intro-titulo">${t.tituloTransicao}</h1>
            <p class="intro-texto">${t.textoTransicao}</p>
            <button class="btn btn-primary" id="btn-transicao">${t.botaoTransicao}</button>
          </div>
        </section>`;

      root = app.querySelector('#cena-jogo3-trans');
      root.addEventListener('pointerdown', resetIdleTimer, { passive: true });

      const btnTrans = root.querySelector('#btn-transicao');
      btnTrans.addEventListener('pointerdown', () => btnTrans.classList.add('tocando'));
      btnTrans.addEventListener('pointercancel', () => btnTrans.classList.remove('tocando'));
      btnTrans.addEventListener('pointerup', () => {
        btnTrans.classList.remove('tocando');
        renderJogo(t, historia);
      });
    },
    onExit() {
      cancelAnimationFrame(raf);
      clearInterval(tTimer);
      raf = null;
      tTimer = null;
      fase = 'transicao';
      cleanup.forEach((fn) => { try { fn(); } catch (_) {} });
      cleanup = [];
      root = null;
    },
  };

  function renderJogo(t, historia) {
    fase = 'jogo';
    const lanternaCfg = historia.lanterna;
    const duracao = ctx.config.lanternaDuracaoSeg || 60;
    const instrumentos = ctx.instrumentos.instrumentos;

    const instrumentosNaCena = lanternaCfg.instrumentosAEscolher
      .map((id) => instrumentos.find((x) => x.id === id))
      .filter(Boolean);

    const armadilhas = lanternaCfg.armadilhas || [];

    const listaHTML = instrumentosNaCena.map((inst) => `
      <li class="j3-lista-item" data-inst-id="${inst.id}">
        <img src="assets/${inst.icone}" alt="" onerror="this.style.visibility='hidden'">
        <span>${inst.nomeCompleto || inst.nome}</span>
      </li>`).join('');

    const app = document.getElementById('app');
    app.innerHTML = `
      <section class="cena cena-jogo2" id="cena-jogo3-jogo">
        <div class="lanterna-palco fundo-fallback-${historia.id}" id="lanterna-palco"></div>
        <div class="lanterna-mascara" id="lanterna-mascara"></div>
        <div class="lanterna-hud">
          <span class="hud-pill" id="hud-contador">
            <img src="assets/ui/lanterna.svg" alt="">
            <span id="hud-num">0</span>/${COLETAR_ALVO}
          </span>
          <span class="hud-pill" id="hud-timer">
            <img src="assets/ui/relogio.svg" alt="">
            <span id="hud-seg">${String(duracao).padStart(2, '0')}s</span>
          </span>
        </div>
        <div class="lanterna-onboarding" id="lanterna-onboarding">${lanternaCfg.dicaOnboarding || t.instrucaoJogo}</div>
        <div class="lanterna-modal" id="lanterna-modal" aria-hidden="true">
          <div class="card">
            <img id="modal-icone" src="" alt="" onerror="this.style.display='none'">
            <h3 id="modal-titulo"></h3>
            <p id="modal-texto"></p>
          </div>
        </div>
        <aside class="j3-lista" id="j3-lista">
          <h3 class="j3-lista-titulo">${t.tituloListaItens}</h3>
          <ul>${listaHTML}</ul>
        </aside>
      </section>`;

    root = app.querySelector('#cena-jogo3-jogo');
    const palco = root.querySelector('#lanterna-palco');
    const mascara = root.querySelector('#lanterna-mascara');
    const hudNum = root.querySelector('#hud-num');
    const hudSeg = root.querySelector('#hud-seg');
    const modal = root.querySelector('#lanterna-modal');
    const onboarding = root.querySelector('#lanterna-onboarding');
    const listaEl = root.querySelector('#j3-lista');

    // Fundo (tenta imagem, fallback já via classe).
    const bgPath = `assets/${lanternaCfg.cenario}`;
    const probe = new Image();
    probe.onload = () => { palco.style.backgroundImage = `url('${bgPath}')`; };
    probe.src = bgPath;

    const itens = [
      ...instrumentosNaCena.map((inst) => ({
        tipo: 'instrumento',
        id: inst.id,
        nome: inst.nomeCompleto || inst.nome,
        icone: `assets/${inst.icone}`,
        texto: inst.insight,
      })),
      ...armadilhas.map((arm) => ({
        tipo: 'armadilha',
        id: arm.id,
        nome: arm.nome,
        icone: `assets/${arm.icone}`,
        texto: arm.explicacao,
      })),
    ];

    const posicoes = gerarPosicoes(itens.length, palco);
    const itensEls = itens.map((item, i) => {
      const el = document.createElement('div');
      el.className = 'lanterna-item' + (item.tipo === 'armadilha' ? ' armadilha' : '');
      el.dataset.tipo = item.tipo;
      el.dataset.id = item.id;
      el.style.left = posicoes[i].x + '%';
      el.style.top  = posicoes[i].y + '%';
      el.innerHTML = `<img src="${item.icone}" alt="" onerror="this.style.visibility='hidden'">`;
      palco.appendChild(el);
      el._data = item;
      return el;
    });

    let coletados = 0;
    let secundos = duracao;
    hudSeg.textContent = String(secundos).padStart(2, '0') + 's';

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    function atualizarMascara() {
      mascara.style.setProperty('--mx', mouseX + 'px');
      mascara.style.setProperty('--my', mouseY + 'px');
      itensEls.forEach((el) => {
        if (el.classList.contains('coletado')) return;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        el.classList.toggle('revelado', Math.hypot(cx - mouseX, cy - mouseY) <= RAIO);
      });
      raf = requestAnimationFrame(atualizarMascara);
    }

    function onMove(ev) {
      resetIdleTimer();
      mouseX = ev.clientX;
      mouseY = ev.clientY;
      onboarding.style.opacity = '0';
    }

    function onTap(ev) {
      const alvo = ev.target.closest('.lanterna-item');
      if (!alvo || !alvo.classList.contains('revelado')) return;
      if (alvo.classList.contains('coletado')) return;
      const data = alvo._data;
      if (data.tipo === 'instrumento') {
        alvo.classList.add('coletado');
        coletados++;
        hudNum.textContent = coletados;
        listaEl.querySelector(`[data-inst-id="${data.id}"]`)?.classList.add('encontrado');
        mostrarModal(data, false);
        if (coletados >= COLETAR_ALVO) {
          setTimeout(() => irPara('FINAL'), 1800);
        }
      } else {
        secundos = Math.max(0, secundos - 5);
        hudSeg.textContent = String(secundos).padStart(2, '0') + 's';
        alvo.classList.add('tocada');
        setTimeout(() => alvo.classList.remove('tocada'), 400);
        root.classList.add('shake');
        setTimeout(() => root.classList.remove('shake'), 350);
        mostrarModal(data, true);
      }
    }

    let modalTimer = null;
    function mostrarModal(data, armadilha) {
      clearTimeout(modalTimer);
      modal.querySelector('#modal-icone').src = data.icone;
      modal.querySelector('#modal-titulo').textContent = data.nome;
      modal.querySelector('#modal-texto').textContent = data.texto;
      modal.classList.toggle('armadilha', !!armadilha);
      modal.classList.add('visivel');
      modalTimer = setTimeout(() => modal.classList.remove('visivel'), 1800);
    }

    palco.addEventListener('pointermove', onMove);
    palco.addEventListener('pointerdown', onMove);
    palco.addEventListener('pointerup',   onTap);
    cleanup.push(() => {
      palco.removeEventListener('pointermove', onMove);
      palco.removeEventListener('pointerdown', onMove);
      palco.removeEventListener('pointerup',   onTap);
    });

    raf = requestAnimationFrame(atualizarMascara);

    tTimer = setInterval(() => {
      secundos--;
      hudSeg.textContent = String(secundos).padStart(2, '0') + 's';
      if (secundos <= 0) {
        clearInterval(tTimer);
        tTimer = null;
        mostrarDerrota({
          titulo: historia.derrota?.titulo,
          texto:  t.derrota,
        }).then(() => {
          ctx.sessao.numero++;
          irPara('ATTRACT');
        });
      }
    }, 1000);
  }
}

function gerarPosicoes(n, palco) {
  const cols = Math.ceil(Math.sqrt(n));
  const rows = Math.ceil(n / cols);
  const margemX = 15;
  const margemY = 22;
  const passoX = (100 - margemX * 2) / Math.max(1, cols - 1);
  const passoY = (100 - margemY * 2) / Math.max(1, rows - 1);
  const ps = [];
  for (let i = 0; i < n; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    ps.push({
      x: margemX + (cols > 1 ? c * passoX : 50 - margemX) + (Math.random() - 0.5) * 6,
      y: margemY + (rows > 1 ? r * passoY : 50 - margemY) + (Math.random() - 0.5) * 6,
    });
  }
  for (let i = ps.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ps[i], ps[j]] = [ps[j], ps[i]];
  }
  return ps;
}
