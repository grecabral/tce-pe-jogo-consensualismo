// Jogo 1 — Coletor: itens caem, jogador toca diretamente para coletar.
// Adequado +10, inadequado -5. Timer zera → vitória se >= meta, derrota se <.
// Velocidade cresce a cada coletorAceleracaoIntervaloSeg segundos.

import { irPara, resetIdleTimer } from '../estado.js';
import { mostrarDerrota } from '../ui/derrota.js';
import { tocar } from '../audio.js';

let raf = null;
let tTimer = null;
let root = null;
let cleanup = [];

export function montar(app, ctx) {
  return {
    onEnter() {
      const t = ctx.textosUI.jogo1;
      const meta         = ctx.config.coletorMetaPontos || 80;
      const duracao      = ctx.config.coletorDuracaoSeg || 40;
      const velInicial   = ctx.config.coletorVelocidadeInicial || 220;
      const acIntervalo  = ctx.config.coletorAceleracaoIntervaloSeg || 10;
      const acIncremento = ctx.config.coletorAceleracaoIncremento || 1.5;
      const adequados    = ctx.coletor.adequados;
      const inadequados  = ctx.coletor.inadequados;

      const adequadosUnicos = adequados.filter((a, i, arr) => arr.findIndex((x) => x.id === a.id) === i);

      const invHTML = adequadosUnicos.map((a) => `
        <div class="inv-slot" data-inv-id="${a.id}">
          <img src="assets/${a.icone}" alt="" onerror="this.style.visibility='hidden'">
          <div class="inv-slot-info">
            <span class="inv-slot-nome">${a.nome || a.id}</span>
            <div class="inv-stars"></div>
          </div>
        </div>`).join('');

      app.innerHTML = `
        <section class="cena cena-jogo3" id="cena-jogo1-coletor">
          <div class="coletor-palco" id="coletor-palco">
            <div class="bokeh" id="coletor-bokeh"></div>
            <div class="coletor-hud">
              <span class="hud-pill accent" id="hud-pontos">
                <span>${t.hudPontuacao}:&nbsp;</span><span id="pontos-val">0</span>
              </span>
              <div class="timer-anel hud-pill" id="hud-tempo">
                <svg class="timer-svg" viewBox="0 0 44 44" aria-hidden="true">
                  <circle class="timer-trilha" cx="22" cy="22" r="18"/>
                  <circle class="timer-prog" id="timer-prog" cx="22" cy="22" r="18"/>
                </svg>
                <span class="timer-num" id="tempo-val">${duracao}</span>
              </div>
            </div>
            <div class="coletor-flash" id="coletor-flash"></div>
            <div class="item-coletado-notif" id="item-coletado-notif" aria-hidden="true">
              <img id="notif-icone" src="" alt="">
              <span id="notif-nome"></span>
            </div>
          </div>
          <aside class="coletor-inventory" id="coletor-inventory">
            <h3 class="inv-titulo">COLETADOS</h3>
            <div class="inv-slots" id="inv-slots">${invHTML}</div>
          </aside>
          <div class="modal-entrada visivel" id="modal-entrada">
            <div class="modal-entrada-card">
              <h2>${t.tituloModal}</h2>
              <p>${t.instrucaoModal}</p>
              <button class="btn btn-primary" id="btn-modal-jogar">${t.botaoIniciar}</button>
            </div>
          </div>
        </section>`;

      root = app.querySelector('#cena-jogo1-coletor');

      // Bokeh particles
      (function makeBokeh(id, n) {
        const el = root.querySelector('#' + id);
        if (!el) return;
        const palette = ['rgba(255,204,0,','rgba(0,214,143,','rgba(14,165,233,','rgba(255,255,255,'];
        for (let i = 0; i < n; i++) {
          const d = document.createElement('div');
          d.className = 'b';
          const sz  = 3 + Math.random() * 12;
          const col = palette[i % palette.length];
          const op  = (0.04 + Math.random() * 0.18).toFixed(2);
          const op2 = Math.min(1, +op + 0.18).toFixed(2);
          d.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;bottom:${-sz}px;` +
            `background:radial-gradient(circle at 35% 35%,${col}${op2}) 0%,${col}0) 100%);` +
            `animation-duration:${7+Math.random()*14}s;animation-delay:${-Math.random()*18}s;`;
          el.appendChild(d);
        }
      })('coletor-bokeh', 20);

      const palco      = root.querySelector('#coletor-palco');
      const flash      = root.querySelector('#coletor-flash');
      const pontosVal  = root.querySelector('#pontos-val');
      const tempoVal   = root.querySelector('#tempo-val');
      const timerProg  = root.querySelector('#timer-prog');
      const invSlotsEl = root.querySelector('#inv-slots');
      const CIRCUM = 2 * Math.PI * 18;
      const modalEntrada = root.querySelector('#modal-entrada');
      const btnJogar     = root.querySelector('#btn-modal-jogar');

      let pontos   = 0;
      let segundos = duracao;
      let jogoAtivo = false;
      let rect     = palco.getBoundingClientRect();
      function recalcRect() { rect = palco.getBoundingClientRect(); }
      window.addEventListener('resize', recalcRect);
      cleanup.push(() => window.removeEventListener('resize', recalcRect));

      const ativos = [];
      let ultimoSpawn    = 0;
      let velocidadeBase = velInicial;
      let intervaloAnterior = 0;

      const inventarioContagem = {};
      let notifTimer = null;
      cleanup.push(() => clearTimeout(notifTimer));

      function mostrarNotifItem(icone, nome) {
        const notif = root.querySelector('#item-coletado-notif');
        if (!notif) return;
        notif.querySelector('#notif-icone').src = 'assets/' + icone;
        notif.querySelector('#notif-nome').textContent = nome;
        notif.classList.add('visivel');
        clearTimeout(notifTimer);
        notifTimer = setTimeout(() => notif.classList.remove('visivel'), 1200);
      }

      // Coleta pelo palco — proximity-based para funcionar em qualquer velocidade
      function onPalcoToque(ev) {
        resetIdleTimer();
        if (!jogoAtivo) return;

        const larguraPalco = rect.width  || palco.offsetWidth;
        const alturaPalco  = rect.height || palco.offsetHeight;
        const touchX = ev.clientX - rect.left;
        const touchY = ev.clientY - rect.top;
        const HIT_RAIO = 110; // px — raio de detecção

        let closestIdx = -1;
        let closestDist = HIT_RAIO;

        for (let i = 0; i < ativos.length; i++) {
          const it = ativos[i];
          // CSS usa transform:translate(-50%,-50%), então left/top já é o centro do item
          const itemCX = (it.x / 100) * larguraPalco;
          const itemCY = (it.y / 100) * alturaPalco;
          const dist = Math.hypot(touchX - itemCX, touchY - itemCY);
          if (dist < closestDist) { closestDist = dist; closestIdx = i; }
        }

        if (closestIdx < 0) return;

        const it = ativos[closestIdx];
        ativos.splice(closestIdx, 1);
        it.el.remove();

        const delta = it.adequado ? 10 : -5;
        pontos = Math.max(0, pontos + delta);
        pontosVal.textContent = pontos;
        mostrarFlash(it.adequado);
        const xPx = (it.x / 100) * larguraPalco;
        const yPx = (it.y / 100) * alturaPalco;
        floatNome(it.nome, xPx, yPx, it.adequado);
        tocar(it.adequado ? 'coletou' : 'erro');

        clearTimeout(pontosVal._tt);
        pontosVal.classList.remove('score-tick');
        void pontosVal.offsetWidth;
        pontosVal.classList.add('score-tick');
        pontosVal._tt = setTimeout(() => pontosVal.classList.remove('score-tick'), 280);

        if (it.adequado) {
          inventarioContagem[it.defId] = (inventarioContagem[it.defId] || 0) + 1;
          adicionarEstrela(it.defId);
          mostrarNotifItem(it.icone, it.nome);
          spawnBurst(xPx, yPx);
        }
      }

      palco.addEventListener('pointerdown', onPalcoToque);
      cleanup.push(() => palco.removeEventListener('pointerdown', onPalcoToque));

      function spawnarItem() {
        const adequado = Math.random() < 0.6;
        const pool = adequado ? adequados : inadequados;
        const def  = pool[Math.floor(Math.random() * pool.length)];
        const el   = document.createElement('div');
        el.className = 'coletor-item ' + (adequado ? 'adequado' : 'inadequado') + ' spawn-in';
        el.innerHTML = `<img src="assets/${def.icone}" alt="" onerror="this.style.visibility='hidden'">`;
        el.style.touchAction = 'none';
        el.style.pointerEvents = 'none'; // tudo vai pelo palco
        palco.appendChild(el);
        setTimeout(() => el.classList.remove('spawn-in'), 220);
        const x = 5 + Math.random() * 90;
        ativos.push({
          el, x, y: -5, adequado, defId: def.id,
          icone: def.icone, nome: def.nome,
          velocidade: velocidadeBase * (0.9 + Math.random() * 0.3),
        });
      }

      function adicionarEstrela(defId) {
        const slotEl = invSlotsEl.querySelector(`[data-inv-id="${defId}"]`);
        if (!slotEl) return;
        slotEl.classList.add('inv-slot-coletado');
        const count = inventarioContagem[defId];
        if (count <= 5) {
          const starsEl = slotEl.querySelector('.inv-stars');
          const star = document.createElement('span');
          star.className = 'inv-star nova';
          star.textContent = '★';
          starsEl.appendChild(star);
          requestAnimationFrame(() => star.classList.remove('nova'));
        }
      }

      function mostrarFlash(ok) {
        flash.classList.remove('ok', 'erro');
        flash.classList.add(ok ? 'ok' : 'erro');
        setTimeout(() => flash.classList.remove('ok', 'erro'), 240);
      }

      function floatNome(nome, xPx, yPx, adequado) {
        const nota = document.createElement('div');
        nota.className = 'float-pts float-nome ' + (adequado ? 'pos' : 'neg');
        nota.style.left = xPx + 'px';
        nota.style.top  = yPx + 'px';
        nota.textContent = nome;
        root.appendChild(nota);
        setTimeout(() => nota.remove(), 1400);
      }

      function spawnBurst(xPx, yPx) {
        for (let i = 0; i < 6; i++) {
          const p = document.createElement('div');
          p.className = 'burst-part';
          p.style.cssText = `left:${xPx}px;top:${yPx}px;--bang:${Math.round(i / 6 * 360)}deg`;
          palco.appendChild(p);
          setTimeout(() => p.remove(), 700);
        }
      }

      let lastT = performance.now();
      function loop(agora) {
        const dt = Math.min(0.05, (agora - lastT) / 1000);
        lastT = agora;

        if (agora - ultimoSpawn > 900 - Math.min(500, (duracao - segundos) * 8)) {
          spawnarItem();
          ultimoSpawn = agora;
        }

        const intervaloAtual = Math.floor((duracao - segundos) / acIntervalo);
        if (intervaloAtual > intervaloAnterior) {
          velocidadeBase *= acIncremento;
          intervaloAnterior = intervaloAtual;
        }

        const alturaPalco = rect.height || palco.offsetHeight;

        for (let i = ativos.length - 1; i >= 0; i--) {
          const it = ativos[i];
          it.y += (it.velocidade * dt / alturaPalco) * 100;
          const yPx = (it.y / 100) * alturaPalco;
          it.el.style.left = it.x + '%';
          it.el.style.top  = yPx + 'px';

          if (yPx > alturaPalco + 40) {
            it.el.remove();
            ativos.splice(i, 1);
          }
        }

        raf = requestAnimationFrame(loop);
      }

      function iniciarJogo() {
        jogoAtivo = true;
        recalcRect();
        lastT = performance.now();
        ultimoSpawn = lastT;
        if (timerProg) timerProg.style.strokeDashoffset = 0;
        raf = requestAnimationFrame(loop);
        tTimer = setInterval(() => {
          segundos--;
          tempoVal.textContent = segundos;
          if (timerProg) {
            timerProg.style.strokeDashoffset = CIRCUM * (1 - segundos / duracao);
            if (segundos <= 10) timerProg.classList.add('urgente');
          }
          if (segundos <= 0) encerrar(pontos >= meta);
        }, 1000);
      }

      function encerrar(vitoria) {
        jogoAtivo = false;
        cancelAnimationFrame(raf);
        clearInterval(tTimer);
        raf = null; tTimer = null;
        if (vitoria) { tocar('vitoria'); mostrarVitoriaJogo1(); return; }
        tocar('derrota');
        mostrarDerrota({
          titulo: ctx.sessao.historiaAtual?.derrota?.titulo,
          texto:  t.derrota,
        }).then((escolha) => {
          if (escolha === 'repetir') {
            irPara('JOGO1_COLETOR');
          } else {
            ctx.sessao.modoFinal = 'neutro';
            irPara('FINAL');
          }
        });
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

      function mostrarVitoriaJogo1() {
        const listaHTML = Object.entries(inventarioContagem)
          .sort((a, b) => b[1] - a[1])
          .map(([id, qtd]) => {
            const def = ctx.coletor.adequados.find((a) => a.id === id);
            return `<li><img src="assets/${def?.icone || ''}" alt=""> ${def?.nome || id} <strong>×${qtd}</strong></li>`;
          }).join('');

        const overlay = document.createElement('div');
        overlay.className = 'j1-vitoria-overlay';
        overlay.innerHTML = `
          <div class="j1-vitoria-card">
            <div class="confetti-container" aria-hidden="true">${gerarConfetti()}</div>
            <h2 class="j1-vitoria-titulo">${t.tituloVitoria || 'PARABÉNS!'}</h2>
            <p class="j1-vitoria-pontos">${pontos} pontos</p>
            <ul class="j1-vitoria-lista">${listaHTML}</ul>
            <button class="btn btn-primary" id="btn-j1-avancar">${t.botaoAvancar || 'AVANÇAR'}</button>
          </div>`;
        root.appendChild(overlay);
        requestAnimationFrame(() => overlay.classList.add('visivel'));

        const btn = overlay.querySelector('#btn-j1-avancar');
        btn.addEventListener('pointerdown', () => { btn.classList.add('tocando'); tocar('toque'); });
        btn.addEventListener('pointerup', () => { btn.classList.remove('tocando'); irPara('JOGO2_LIGAR'); });

        const autoTimer = setTimeout(() => irPara('JOGO2_LIGAR'), 10000);
        cleanup.push(() => clearTimeout(autoTimer));
      }

      btnJogar.addEventListener('pointerdown', () => { btnJogar.classList.add('tocando'); tocar('toque'); });
      btnJogar.addEventListener('pointercancel', () => btnJogar.classList.remove('tocando'));
      btnJogar.addEventListener('pointerup', () => {
        btnJogar.classList.remove('tocando');
        modalEntrada.classList.remove('visivel');
        setTimeout(iniciarJogo, 100);
      });
    },
    onExit() {
      cancelAnimationFrame(raf);
      clearInterval(tTimer);
      raf = null; tTimer = null;
      cleanup.forEach((fn) => { try { fn(); } catch (_) {} });
      cleanup = [];
      root = null;
    },
  };
}
