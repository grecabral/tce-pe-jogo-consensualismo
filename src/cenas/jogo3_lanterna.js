// Jogo 3 — Lanterna: revelar instrumentos em cenário escuro.
// Máscara radial segue o dedo (PointerEvent). Itens escondidos só aparecem
// dentro do círculo. Tocar instrumento → coleta + insight modal 2s.
// Tocar armadilha → -5s + shake + explicação.
// Tocar instrumento JÁ coletado → abre modal de insight detalhado.

import { irPara, resetIdleTimer } from '../estado.js';
import { mostrarDerrota } from '../ui/derrota.js';
import { tocar } from '../audio.js';

function calcularTempoLeitura(texto) {
  const palavras = texto.trim().split(/\s+/).length;
  return Math.max(2500, Math.ceil((palavras / 200) * 60 * 1000));
}

function revelarEmBlocos(texto) {
  const blocos = texto.split(/(?<=[.!?])\s+|\n/).filter((b) => b.trim());
  const totalPalavras = blocos.reduce((acc, b) => acc + b.trim().split(/\s+/).length, 0);
  let acumulado = 0;
  return blocos.map((bloco) => {
    const palavrasBloco = bloco.trim().split(/\s+/).length;
    const delay = (acumulado / Math.max(1, totalPalavras) * 2).toFixed(2);
    acumulado += palavrasBloco;
    return `<span class="bloco-texto" style="animation-delay:${delay}s">${bloco.trim()} </span>`;
  }).join('');
}

let raf = null;
let tTimer = null;
let root = null;
let cleanup = [];
let fase = 'transicao'; // reset em onExit

const RAIO = 180;
const COLETAR_ALVO = 5;
// Circunferência do anel SVG grande (r=42): 2π×42 ≈ 263.9
const CIRCUM_J3 = 2 * Math.PI * 42;

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
            <p class="intro-texto">${revelarEmBlocos(t.textoTransicao)}</p>
            <button class="btn btn-primary btn-bloqueado" id="btn-transicao">${t.botaoTransicao}</button>
          </div>
        </section>`;

      root = app.querySelector('#cena-jogo3-trans');
      root.addEventListener('pointerdown', resetIdleTimer, { passive: true });

      const bgTrans = new Image();
      bgTrans.onload = () => { if (root) root.style.backgroundImage = `url('assets/cenarios/transporte_lanterna.jpg')`; };
      bgTrans.src = 'assets/cenarios/transporte_lanterna.jpg';

      const btnTrans = root.querySelector('#btn-transicao');
      const tLeitura = calcularTempoLeitura(t.textoTransicao);
      const tidTrans = setTimeout(() => {
        if (!btnTrans) return;
        btnTrans.classList.remove('btn-bloqueado');
        btnTrans.classList.add('btn-desbloqueado');
      }, tLeitura);
      cleanup.push(() => clearTimeout(tidTrans));

      btnTrans.addEventListener('pointerdown', () => { btnTrans.classList.add('tocando'); tocar('toque'); });
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

    const invHTML = instrumentosNaCena.map((inst) => `
      <div class="j3-inv-slot" data-inst-id="${inst.id}">
        <img src="assets/${inst.icone}" alt="" onerror="this.style.visibility='hidden'">
        <div class="j3-inv-slot-info">
          <span class="j3-inv-slot-nome">${inst.nomeCompleto || inst.nome}</span>
          <span class="j3-inv-slot-status">NÃO ENCONTRADO</span>
        </div>
      </div>`).join('');

    const app = document.getElementById('app');
    app.innerHTML = `
      <section class="cena cena-jogo2" id="cena-jogo3-jogo">
        <div class="lanterna-palco fundo-fallback-${historia.id}" id="lanterna-palco"></div>
        <div class="lanterna-mascara" id="lanterna-mascara"></div>

        <div class="j3-timer-grande" id="j3-timer-grande">
          <svg class="j3-timer-svg" viewBox="0 0 100 100" aria-hidden="true">
            <circle class="j3-timer-trilha" cx="50" cy="50" r="42"/>
            <circle class="j3-timer-prog" id="timer-prog-j3" cx="50" cy="50" r="42"/>
          </svg>
          <span class="j3-timer-num" id="hud-seg">${duracao}</span>
        </div>

        <div class="lanterna-hud">
          <span class="hud-pill" id="hud-contador">
            <img src="assets/ui/lanterna.svg" alt="">
            <span id="hud-num">0</span>/${COLETAR_ALVO}
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

        <div class="insight-modal" id="insight-modal" aria-hidden="true">
          <div class="insight-card">
            <button class="insight-fechar" id="insight-fechar">✕</button>
            <img id="insight-icone" src="" alt="" onerror="this.style.display='none'">
            <h3 id="insight-titulo"></h3>
            <p id="insight-texto"></p>
          </div>
        </div>

        <aside class="j3-inv" id="j3-inv">
          <h3 class="j3-inv-titulo">INSTRUMENTOS</h3>
          <div class="j3-inv-slots">${invHTML}</div>
          <div class="j3-inv-contador" id="j3-inv-contador">0/${COLETAR_ALVO} encontrados</div>
        </aside>
      </section>`;

    root = app.querySelector('#cena-jogo3-jogo');
    const palco       = root.querySelector('#lanterna-palco');
    const mascara     = root.querySelector('#lanterna-mascara');
    const hudNum      = root.querySelector('#hud-num');
    const hudSeg      = root.querySelector('#hud-seg');
    const timerProgJ3 = root.querySelector('#timer-prog-j3');
    const modal       = root.querySelector('#lanterna-modal');
    const onboarding  = root.querySelector('#lanterna-onboarding');
    const invEl       = root.querySelector('#j3-inv');
    const invContEl   = root.querySelector('#j3-inv-contador');
    const insightModal  = root.querySelector('#insight-modal');
    const insightFechar = root.querySelector('#insight-fechar');

    // Insight modal — fecha ao tocar fora ou no ✕.
    insightFechar.addEventListener('pointerup', () => insightModal.classList.remove('visivel'));
    insightModal.addEventListener('pointerup', (ev) => {
      if (ev.target === insightModal) insightModal.classList.remove('visivel');
    });

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
      el.dataset.id   = item.id;
      el.style.left   = posicoes[i].x + '%';
      el.style.top    = posicoes[i].y + '%';
      el.innerHTML = `<img src="${item.icone}" alt="" onerror="this.style.visibility='hidden'">`;
      palco.appendChild(el);
      el._data = item;
      return el;
    });

    let coletados = 0;
    let secundos  = duracao;
    hudSeg.textContent = secundos;
    if (timerProgJ3) timerProgJ3.style.strokeDashoffset = 0;

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;

    function atualizarMascara() {
      mascara.style.setProperty('--mx', mouseX + 'px');
      mascara.style.setProperty('--my', mouseY + 'px');
      itensEls.forEach((el) => {
        if (el.classList.contains('coletado')) return;
        const r  = el.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
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
      // Insight modal fecha ao toque no palco, mas não ativa coleta.
      if (insightModal.classList.contains('visivel')) {
        insightModal.classList.remove('visivel');
        return;
      }

      const alvo = ev.target.closest('.lanterna-item');
      if (!alvo || !alvo.classList.contains('revelado')) return;

      const data = alvo._data;

      // Item já coletado → abre insight detalhado.
      if (alvo.classList.contains('coletado')) {
        mostrarInsight(data);
        return;
      }

      if (data.tipo === 'instrumento') {
        alvo.classList.add('coletado');
        coletados++;
        hudNum.textContent = coletados;
        const slotEl = invEl.querySelector(`[data-inst-id="${data.id}"]`);
        if (slotEl) {
          slotEl.classList.add('inv-encontrado');
          slotEl.querySelector('.j3-inv-slot-status').textContent = '✓ ENCONTRADO';
        }
        invContEl.textContent = `${coletados}/${COLETAR_ALVO} encontrados`;
        tocar('coletou');
        mostrarModal(data, false);
        if (coletados >= COLETAR_ALVO) {
          tocar('vitoria');
          clearInterval(tTimer);
          tTimer = null;
          cancelAnimationFrame(raf);
          raf = null;
          setTimeout(() => mostrarVitoriaJogo3(t, historia), 600);
        }
      } else {
        tocar('armadilha');
        secundos = Math.max(0, secundos - 5);
        hudSeg.textContent = secundos;
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
      modal.querySelector('#modal-texto').textContent  = data.texto;
      modal.classList.toggle('armadilha', !!armadilha);
      modal.classList.add('visivel');
      modalTimer = setTimeout(() => modal.classList.remove('visivel'), 1800);
    }

    function mostrarInsight(data) {
      insightModal.querySelector('#insight-icone').src = data.icone;
      insightModal.querySelector('#insight-titulo').textContent = data.nome;
      insightModal.querySelector('#insight-texto').textContent  = data.texto;
      insightModal.classList.add('visivel');
    }

    function mostrarVitoriaJogo3(t, historia) {
      const vit = historia.vitoria;
      const overlay = document.createElement('div');
      overlay.className = 'j3-vitoria-overlay';
      overlay.innerHTML = `
        <div class="j3-vitoria-card">
          <div class="confetti-container" aria-hidden="true">${gerarConfetti()}</div>
          <h2 class="j3-vitoria-titulo">${t.tituloVitoria || 'CASO RESOLVIDO!'}</h2>
          <p class="j3-vitoria-texto">${vit?.texto || ''}</p>
          <button class="btn btn-primary" id="btn-j3-resultado">${t.botaoAvancar || 'VER RESULTADO'}</button>
        </div>`;
      root.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add('visivel'));

      const btn = overlay.querySelector('#btn-j3-resultado');
      btn.addEventListener('pointerdown', () => { btn.classList.add('tocando'); tocar('toque'); });
      btn.addEventListener('pointerup',   () => { btn.classList.remove('tocando'); irPara('FINAL'); });

      const autoTimer = setTimeout(() => irPara('FINAL'), 8000);
      cleanup.push(() => clearTimeout(autoTimer));

      const bgVit = 'assets/cenarios/transporte_vitoria.jpg';
      const pv = new Image();
      pv.onload = () => { overlay.style.backgroundImage = `url('${bgVit}')`; };
      pv.src = bgVit;
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
      hudSeg.textContent = secundos;
      if (timerProgJ3) {
        timerProgJ3.style.strokeDashoffset = CIRCUM_J3 * (1 - secundos / duracao);
        if (secundos <= 10) timerProgJ3.classList.add('urgente');
      }
      if (secundos <= 0) {
        clearInterval(tTimer);
        tTimer = null;
        tocar('derrota');
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

function gerarConfetti() {
  const cores = ['#ffcc00', '#e6a800', '#ffffff', 'rgba(255,204,0,0.6)'];
  return Array.from({ length: 20 }, (_, i) => {
    const left  = (i * 5 + (i % 3) * 1.3).toFixed(1);
    const dur   = (2 + (i % 5) * 0.4).toFixed(1);
    const delay = (i * 0.12).toFixed(2);
    const rot   = (i * 37) % 360;
    const cor   = cores[i % cores.length];
    return `<div class="conf" style="left:${left}%;--cdur:${dur}s;--cd:${delay}s;--cr:${rot}deg;background:${cor}"></div>`;
  }).join('');
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
