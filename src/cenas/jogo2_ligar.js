// Jogo 2 — Ligar Pontos (tap).
// Primeiro toque seleciona um cartão. Segundo toque num pilar faz o match.
// Acerto gruda e mostra feedback. Erro devolve ao estado inicial.

import { irPara, resetIdleTimer } from '../estado.js';
import { mostrarDerrota } from '../ui/derrota.js';
import { tocar } from '../audio.js';

let root = null;
let cleanup = [];

export function montar(app, ctx) {
  return {
    onEnter() {
      const t = ctx.textosUI.jogo2;
      const { pilares, casos } = ctx.principios;

      const iconePilar = {
        dialogo:    'assets/pilares/dialogo.svg',
        eficiencia: 'assets/pilares/eficiencia.svg',
        seguranca:  'assets/pilares/seguranca.svg',
      };

      const casosEmbaralhados = embaralhar(casos);

      app.innerHTML = `
        <section class="cena cena-jogo1" id="cena-jogo2-ligar">
          <div class="jogo1-topo">
            <h2 class="jogo1-titulo j2-titulo-escuro">${t.titulo}</h2>
            <p class="jogo1-instrucao j2-instrucao-escura">${t.instrucao}</p>
          </div>
          <div class="jogo1-stage">
            <div class="jogo1-casos" id="j1-casos">
              ${casosEmbaralhados.map((c) => `
                <div class="caso-card" data-caso-id="${c.id}" data-pilar-correto="${c.pilarCorreto}">
                  <p>${c.texto}</p>
                </div>
              `).join('')}
            </div>
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
          </div>
          <div class="jogo1-avanco">
            <button class="btn btn-primary escondido" id="btn-avancar1">${t.botaoAvancar}</button>
          </div>
          <div class="jogo1-feedback" id="j1-feedback"></div>
          <div class="modal-entrada visivel" id="modal-entrada">
            <div class="modal-entrada-card">
              <h2>${t.tituloModal}</h2>
              <p>${t.instrucaoModal}</p>
              <button class="btn btn-primary" id="btn-modal-jogar">${t.botaoIniciar}</button>
            </div>
          </div>
        </section>`;

      root = app.querySelector('#cena-jogo2-ligar');

      const bgProbe = new Image();
      bgProbe.onload = () => { root.style.backgroundImage = `url('assets/cenarios/jogo2_bg.jpg')`; };
      bgProbe.src = 'assets/cenarios/jogo2_bg.jpg';

      const pilaresEl = root.querySelector('#j1-pilares');
      const casosEl   = root.querySelector('#j1-casos');
      const feedback  = root.querySelector('#j1-feedback');
      const btnAv     = root.querySelector('#btn-avancar1');

      const caixas = Array.from(pilaresEl.querySelectorAll('.pilar-box'));
      let coletados = 0;
      const total   = casosEmbaralhados.length;
      let cartaoSelecionado = null; // elemento DOM do cartão selecionado

      function mostrarFeedback(texto, ok) {
        feedback.textContent = texto;
        feedback.classList.remove('ok', 'erro', 'visivel');
        feedback.classList.add(ok ? 'ok' : 'erro', 'visivel');
        clearTimeout(feedback._t);
        feedback._t = setTimeout(() => feedback.classList.remove('visivel'), 2500);
      }

      function desselecionarTodos() {
        casosEl.querySelectorAll('.caso-card.selecionado').forEach((c) => c.classList.remove('selecionado'));
        cartaoSelecionado = null;
      }

      function onCartaoToque(ev) {
        ev.stopPropagation();
        resetIdleTimer();
        const cartao = ev.currentTarget;
        if (cartao.classList.contains('acerto')) return;

        tocar('toque');

        if (cartaoSelecionado === cartao) {
          // Toque no mesmo → desselecionar
          cartao.classList.remove('selecionado');
          cartaoSelecionado = null;
          return;
        }

        desselecionarTodos();
        cartao.classList.add('selecionado');
        cartaoSelecionado = cartao;
      }

      function onPilarToque(ev) {
        ev.stopPropagation();
        resetIdleTimer();
        if (!cartaoSelecionado) return;

        const pilar = ev.currentTarget;
        const cartao = cartaoSelecionado;

        if (pilar.dataset.pilarId === cartao.dataset.pilarCorreto) {
          // Acerto
          tocar('acerto');
          const caso = casosEmbaralhados.find((c) => c.id === cartao.dataset.casoId);
          mostrarFeedback(caso?.insightAcerto || t.feedbackAcerto, true);
          cartao.classList.remove('selecionado');
          cartao.classList.add('acerto');
          cartao.style.pointerEvents = 'none';
          setTimeout(() => cartao.remove(), 400);
          cartaoSelecionado = null;
          coletados++;
          if (coletados === total) {
            tocar('vitoria');
            setTimeout(() => { btnAv.classList.remove('escondido'); }, 600);
          }
        } else {
          // Erro
          tocar('erro');
          mostrarFeedback(t.feedbackErro, false);
          cartao.classList.add('erro');
          setTimeout(() => cartao.classList.remove('erro'), 450);
          desselecionarTodos();
        }
      }

      // Toque fora → desselecionar
      function onFundoToque() {
        desselecionarTodos();
      }

      const modalEntrada = root.querySelector('#modal-entrada');
      const btnJogar = root.querySelector('#btn-modal-jogar');

      // Desativar interação antes do modal fechar
      casosEl.querySelectorAll('.caso-card').forEach((c) => {
        c.style.pointerEvents = 'none';
      });

      btnJogar.classList.add('btn-bloqueado');
      const lockTimer = setTimeout(() => {
        btnJogar.classList.remove('btn-bloqueado');
        btnJogar.classList.add('btn-desbloqueado');
      }, 5000);
      cleanup.push(() => clearTimeout(lockTimer));

      btnJogar.addEventListener('pointerdown', () => { btnJogar.classList.add('tocando'); tocar('toque'); });
      btnJogar.addEventListener('pointercancel', () => btnJogar.classList.remove('tocando'));
      btnJogar.addEventListener('pointerup', () => {
        if (btnJogar.classList.contains('btn-bloqueado')) return;
        btnJogar.classList.remove('tocando');
        modalEntrada.classList.remove('visivel');

        // Habilitar cartões e pilares
        casosEl.querySelectorAll('.caso-card').forEach((c) => {
          c.style.pointerEvents = '';
          c.addEventListener('pointerdown', onCartaoToque);
          cleanup.push(() => c.removeEventListener('pointerdown', onCartaoToque));
        });

        caixas.forEach((pilar) => {
          pilar.addEventListener('pointerdown', onPilarToque);
          cleanup.push(() => pilar.removeEventListener('pointerdown', onPilarToque));
        });

        root.addEventListener('pointerdown', onFundoToque);
        cleanup.push(() => root.removeEventListener('pointerdown', onFundoToque));
      });

      anexarBotao(btnAv, () => irPara('JOGO3_LANTERNA'));
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
  btn.addEventListener('pointerdown', () => { btn.classList.add('tocando'); tocar('toque'); });
  btn.addEventListener('pointerup',   () => { btn.classList.remove('tocando'); acao(); });
  btn.addEventListener('pointercancel', () => btn.classList.remove('tocando'));
  btn.addEventListener('pointerleave',  () => btn.classList.remove('tocando'));
}
