// Gerenciador de áudio. cloneNode() permite sobreposição do mesmo som.
// autoplay pode ser bloqueado pelo browser — play() sempre com .catch(()=>{}).

const sons = {};
const ARQUIVOS = ['toque', 'acerto', 'erro', 'coletou', 'armadilha', 'vitoria', 'derrota'];

let silenciado = false;

export function carregarSons() {
  silenciado = localStorage.getItem('muted') === 'true';
  ARQUIVOS.forEach((id) => {
    const audio = new Audio(`assets/sons/${id}.wav`);
    audio.preload = 'auto';
    sons[id] = audio;
  });
}

export function tocar(id) {
  const s = sons[id];
  if (!s || silenciado) return;
  const clone = s.cloneNode();
  clone.volume = 0.7;
  clone.play().catch(() => {});
}

export function tocarBeep() {
  const s = sons['toque'];
  if (!s || silenciado) return;
  const clone = s.cloneNode();
  clone.volume = 0.08;
  clone.playbackRate = 2.5;
  clone.play().catch(() => {});
}

export function toggleMute() {
  silenciado = !silenciado;
  localStorage.setItem('muted', silenciado);
  return silenciado;
}

export function isMuted() { return silenciado; }
