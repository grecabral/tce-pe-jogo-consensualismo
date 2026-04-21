// Jogo 1 — Coletor: itens caem, jogador move cesta por touch horizontal.
// Adequado +10, inadequado -5. Meta 80 em 40s vence → JOGO2_LIGAR.
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
      const meta      = ctx.config.coletorMetaPontos || 80;
      const duracao   = ctx.config.coletorDuracaoSeg || 40;
      const velInicial = ctx.config.coletorVelocidadeInicial || 220;
      const acIntervalo = ctx.config.coletorAceleracaoIntervaloSeg || 10;
      const acIncremento = ctx.config.coletorAceleracaoIncremento || 1.5;
      const adequados = ctx.coletor.adequados;
      const inadequados = ctx.coletor.inadequados;

      app.innerHTML = `
        <section class="cena cena-jogo3" id="cena-jogo1-coletor">
          <div class="coletor-palco" id="coletor-palco">
            <div class="coletor-hud">
              <span class="hud-pill accent" id="hud-pontos">
                <span>${t.hudPontuacao}:&nbsp;</span><span id="pontos-val">0</span>
              </span>
              <span class="hud-pill" id="hud-tempo">
                <img src="assets/ui/relogio.svg" alt="">
                <span id="tempo-val">${duracao}s</span>
              </span>
            </div>
            <div class="coletor-flash" id="coletor-flash"></div>
            <div class="coletor-cesta" id="coletor-cesta">
              <img src="assets/ui/cesta.svg" alt="" onerror="this.style.display='none'">
            </div>
          </div>
          <div class="modal-entrada visivel" id="modal-entrada">
            <div class="modal-entrada-card">
              <h2>${t.tituloModal}</h2>
              <p>${t.instrucaoModal}</p>
              <button class="btn btn-primary" id="btn-modal-jogar">${t.botaoIniciar}</button>
            </div>
          </div>
        </section>`;

      root = app.querySelector('#cena-jogo1-coletor');
      const palco = root.querySelector('#coletor-palco');
      const cesta = root.querySelector('#coletor-cesta');
      const flash = root.querySelector('#coletor-flash');
      const pontosVal = root.querySelector('#pontos-val');
      const tempoVal = root.querySelector('#tempo-val');
      const modalEntrada = root.querySelector('#modal-entrada');
      const btnJogar = root.querySelector('#btn-modal-jogar');

      let pontos = 0;
      let segundos = duracao;
      let cestaX = 0.5; // fracional (0..1) para responsividade
      let rect = palco.getBoundingClientRect();
      function recalcRect() { rect = palco.getBoundingClientRect(); }
      window.addEventListener('resize', recalcRect);
      cleanup.push(() => window.removeEventListener('resize', recalcRect));

      function posicionarCesta() {
        const largura = cesta.offsetWidth;
        const minX = largura / 2;
        const maxX = rect.width - largura / 2;
        const px = Math.max(minX, Math.min(maxX, cestaX * rect.width));
        cesta.style.left = px + 'px';
      }
      setTimeout(() => { recalcRect(); posicionarCesta(); }, 0);

      // Input touch: arrastar em qualquer lugar do palco move a cesta.
      let arrastando = false;
      function onDown(ev) {
        resetIdleTimer();
        arrastando = true;
        moverPara(ev.clientX);
      }
      function onMove(ev) {
        if (!arrastando) return;
        moverPara(ev.clientX);
      }
      function onUp() { arrastando = false; }
      function moverPara(clientX) {
        const x = clientX - rect.left;
        cestaX = Math.max(0, Math.min(1, x / rect.width));
        posicionarCesta();
      }
      palco.addEventListener('pointerdown', onDown);
      palco.addEventListener('pointermove', onMove);
      palco.addEventListener('pointerup', onUp);
      palco.addEventListener('pointercancel', onUp);
      cleanup.push(() => {
        palco.removeEventListener('pointerdown', onDown);
        palco.removeEventListener('pointermove', onMove);
        palco.removeEventListener('pointerup', onUp);
        palco.removeEventListener('pointercancel', onUp);
      });

      // Itens em queda.
      const ativos = [];
      let ultimoSpawn = 0;
      let velocidadeBase = velInicial;
      let intervaloAnterior = 0; // rastreia quantos intervalos de aceleração já aplicamos

      function spawnarItem() {
        const adequado = Math.random() < 0.6;
        const pool = adequado ? adequados : inadequados;
        const def = pool[Math.floor(Math.random() * pool.length)];
        const el = document.createElement('div');
        el.className = 'coletor-item ' + (adequado ? 'adequado' : 'inadequado');
        el.innerHTML = `<img src="assets/${def.icone}" alt="" onerror="this.style.visibility='hidden'">`;
        palco.appendChild(el);
        const x = 5 + Math.random() * 90;
        ativos.push({
          el, x, y: -5, adequado,
          velocidade: velocidadeBase * (0.9 + Math.random() * 0.3),
        });
      }

      function mostrarFlash(ok) {
        flash.classList.remove('ok', 'erro');
        flash.classList.add(ok ? 'ok' : 'erro');
        setTimeout(() => flash.classList.remove('ok', 'erro'), 240);
      }

      function flutuarPontos(delta, xPct) {
        const nota = document.createElement('div');
        nota.className = 'coletor-pontos-flutuante';
        nota.style.left = xPct + '%';
        nota.style.top = (cesta.offsetTop) + 'px';
        nota.style.color = delta > 0 ? 'var(--color-success-200)' : 'var(--color-error-200)';
        nota.textContent = (delta > 0 ? '+' : '') + delta;
        palco.appendChild(nota);
        setTimeout(() => nota.remove(), 900);
      }

      let lastT = performance.now();
      function loop(agora) {
        const dt = Math.min(0.05, (agora - lastT) / 1000);
        lastT = agora;

        if (agora - ultimoSpawn > 900 - Math.min(500, (duracao - segundos) * 8)) {
          spawnarItem();
          ultimoSpawn = agora;
        }

        // Aceleração por intervalo fixo (a cada N segundos decorridos).
        const intervaloAtual = Math.floor((duracao - segundos) / acIntervalo);
        if (intervaloAtual > intervaloAnterior) {
          velocidadeBase *= acIncremento;
          intervaloAnterior = intervaloAtual;
        }

        const alturaPalco = rect.height || palco.offsetHeight;
        const larguraPalco = rect.width || palco.offsetWidth;
        const cestaTop = cesta.offsetTop;
        const cestaLeftPx = parseFloat(cesta.style.left || (larguraPalco / 2));
        const cestaMeiaLarg = cesta.offsetWidth / 2;

        for (let i = ativos.length - 1; i >= 0; i--) {
          const it = ativos[i];
          it.y += (it.velocidade * dt / alturaPalco) * 100; // percentual
          const yPx = (it.y / 100) * alturaPalco;
          it.el.style.left = it.x + '%';
          it.el.style.top = yPx + 'px';

          // Colisão com cesta.
          if (yPx >= cestaTop - 10 && yPx <= cestaTop + 40) {
            const xPx = (it.x / 100) * larguraPalco;
            if (Math.abs(xPx - cestaLeftPx) < cestaMeiaLarg + 20) {
              const delta = it.adequado ? 10 : -5;
              pontos = Math.max(0, pontos + delta);
              pontosVal.textContent = pontos;
              mostrarFlash(it.adequado);
              flutuarPontos(delta, it.x);
              tocar(it.adequado ? 'coletou' : 'erro');
              it.el.remove();
              ativos.splice(i, 1);
              if (pontos >= meta) {
                encerrar(true);
                return;
              }
              continue;
            }
          }

          // Passou da tela.
          if (yPx > alturaPalco + 40) {
            it.el.remove();
            ativos.splice(i, 1);
          }
        }

        raf = requestAnimationFrame(loop);
      }

      function iniciarJogo() {
        lastT = performance.now();
        ultimoSpawn = lastT;
        raf = requestAnimationFrame(loop);
        tTimer = setInterval(() => {
          segundos--;
          tempoVal.textContent = segundos + 's';
          if (segundos <= 0) encerrar(pontos >= meta);
        }, 1000);
      }

      function encerrar(vitoria) {
        cancelAnimationFrame(raf);
        clearInterval(tTimer);
        raf = null;
        tTimer = null;
        if (vitoria) { tocar('vitoria'); irPara('JOGO2_LIGAR'); return; }
        tocar('derrota');
        mostrarDerrota({
          titulo: ctx.sessao.historiaAtual?.derrota?.titulo,
          texto:  t.derrota,
        }).then(() => {
          ctx.sessao.numero++;
          irPara('ATTRACT');
        });
      }
      // Modal de entrada
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
      raf = null;
      tTimer = null;
      cleanup.forEach((fn) => { try { fn(); } catch (_) {} });
      cleanup = [];
      root = null;
    },
  };
}
