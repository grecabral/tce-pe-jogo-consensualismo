// Jogo 1 — Ligar Pontos (drag-and-drop).
// Arrastar 6 cartões-caso para as 3 caixas-pilar corretas.
// Acerto gruda e mostra feedback. Erro balança e devolve ao pool.

import { irPara, resetIdleTimer } from '../estado.js';

let root = null;
let cleanup = [];

export function montar(app, ctx) {
  return {
    onEnter() {
      const t = ctx.textosUI.jogo1;
      const { pilares, casos } = ctx.principios;

      const pilarPorId = Object.fromEntries(pilares.map((p) => [p.id, p]));
      const iconePilar = {
        dialogo:    'assets/pilares/dialogo.svg',
        eficiencia: 'assets/pilares/eficiencia.svg',
        seguranca:  'assets/pilares/seguranca.svg',
      };

      const casosEmbaralhados = embaralhar(casos);

      app.innerHTML = `
        <section class="cena cena-jogo1" id="cena-jogo1">
          <div class="jogo1-topo">
            <h2 class="jogo1-titulo">${t.titulo}</h2>
            <p class="jogo1-instrucao">${t.instrucao}</p>
          </div>
          <div class="jogo1-stage">
            <div class="jogo1-pilares" id="j1-pilares">
              ${pilares.map((p) => `
                <div class="pilar-box" data-pilar-id="${p.id}">
                  <img src="${iconePilar[p.id] || ''}" alt="" onerror="this.style.visibility='hidden'">
                  <span>
                    <span class="pilar-nome">${p.nome}</span>
                    <span class="pilar-desc">${p.descricaoCurta || ''}</span>
                  </span>
                </div>
              `).join('')}
            </div>
            <div class="jogo1-casos" id="j1-casos">
              ${casosEmbaralhados.map((c) => `
                <div class="caso-card" data-caso-id="${c.id}" data-pilar-correto="${c.pilarCorreto}">
                  <span class="tag-missao">CASO</span>
                  <p style="margin: var(--space-2) 0 0;">${c.texto}</p>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="jogo1-avanco">
            <button class="btn btn-primary escondido" id="btn-avancar1">${t.botaoAvancar}</button>
          </div>
          <div class="jogo1-feedback" id="j1-feedback"></div>
        </section>`;

      root = app.querySelector('#cena-jogo1');
      const pilaresEl = root.querySelector('#j1-pilares');
      const casosEl = root.querySelector('#j1-casos');
      const feedback = root.querySelector('#j1-feedback');
      const btnAv = root.querySelector('#btn-avancar1');

      const caixas = Array.from(pilaresEl.querySelectorAll('.pilar-box'));
      let coletados = 0;
      const total = casosEmbaralhados.length;

      function mostrarFeedback(texto, ok) {
        feedback.textContent = texto;
        feedback.classList.remove('ok', 'erro', 'visivel');
        feedback.classList.add(ok ? 'ok' : 'erro', 'visivel');
        clearTimeout(feedback._t);
        feedback._t = setTimeout(() => feedback.classList.remove('visivel'), 1400);
      }

      function anexarDrag(cartao) {
        let arrastando = false;
        let pointerId = null;
        let offsetX = 0;
        let offsetY = 0;

        function onDown(ev) {
          ev.preventDefault();
          resetIdleTimer();
          pointerId = ev.pointerId;
          arrastando = true;
          const r = cartao.getBoundingClientRect();
          offsetX = ev.clientX - r.left;
          offsetY = ev.clientY - r.top;
          cartao.style.width = r.width + 'px';
          cartao.style.height = r.height + 'px';
          cartao.style.left = r.left + 'px';
          cartao.style.top = r.top + 'px';
          cartao.classList.add('arrastando');
          try { cartao.setPointerCapture(pointerId); } catch (_) {}
        }

        function onMove(ev) {
          if (!arrastando || ev.pointerId !== pointerId) return;
          ev.preventDefault();
          cartao.style.left = (ev.clientX - offsetX) + 'px';
          cartao.style.top  = (ev.clientY - offsetY) + 'px';
          marcarDropAtivo(ev.clientX, ev.clientY);
        }

        function onUp(ev) {
          if (!arrastando || ev.pointerId !== pointerId) return;
          arrastando = false;
          try { cartao.releasePointerCapture(pointerId); } catch (_) {}
          const alvo = pilarSobPonto(ev.clientX, ev.clientY);
          limparDropAtivo();

          if (alvo && alvo.dataset.pilarId === cartao.dataset.pilarCorreto) {
            // Acerto.
            const caso = casosEmbaralhados.find((c) => c.id === cartao.dataset.casoId);
            mostrarFeedback(caso?.insightAcerto || t.feedbackAcerto, true);
            cartao.classList.remove('arrastando');
            cartao.classList.add('acerto');
            cartao.style.pointerEvents = 'none';
            setTimeout(() => cartao.remove(), 400);
            coletados++;
            if (coletados === total) {
              setTimeout(() => { btnAv.classList.remove('escondido'); }, 600);
            }
          } else {
            // Erro ou soltou fora.
            cartao.classList.remove('arrastando');
            cartao.removeAttribute('style');
            if (alvo) {
              mostrarFeedback(t.feedbackErro, false);
              cartao.classList.add('erro');
              setTimeout(() => cartao.classList.remove('erro'), 450);
            }
          }
        }

        cartao.addEventListener('pointerdown', onDown);
        cartao.addEventListener('pointermove', onMove);
        cartao.addEventListener('pointerup',   onUp);
        cartao.addEventListener('pointercancel', onUp);
        cleanup.push(() => {
          cartao.removeEventListener('pointerdown', onDown);
          cartao.removeEventListener('pointermove', onMove);
          cartao.removeEventListener('pointerup',   onUp);
          cartao.removeEventListener('pointercancel', onUp);
        });
      }

      function pilarSobPonto(x, y) {
        return caixas.find((c) => {
          const r = c.getBoundingClientRect();
          return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
        });
      }

      function marcarDropAtivo(x, y) {
        const alvo = pilarSobPonto(x, y);
        caixas.forEach((c) => c.classList.toggle('drop-ativo', c === alvo));
      }

      function limparDropAtivo() {
        caixas.forEach((c) => c.classList.remove('drop-ativo'));
      }

      casosEl.querySelectorAll('.caso-card').forEach(anexarDrag);

      anexarBotao(btnAv, () => irPara('JOGO2_LANTERNA'));
    },
    onExit() {
      cleanup.forEach((fn) => { try { fn(); } catch (_) {} });
      cleanup = [];
      root = null;
    },
  };
}

function embaralhar(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function anexarBotao(btn, acao) {
  btn.addEventListener('pointerdown', () => btn.classList.add('tocando'));
  btn.addEventListener('pointerup',   () => { btn.classList.remove('tocando'); acao(); });
  btn.addEventListener('pointercancel', () => btn.classList.remove('tocando'));
  btn.addEventListener('pointerleave',  () => btn.classList.remove('tocando'));
}
