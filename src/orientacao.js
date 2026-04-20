// Helpers de orientação.

export function isPortrait() {
  return window.matchMedia('(orientation: portrait)').matches;
}

export function onOrientacao(cb) {
  const mql = window.matchMedia('(orientation: portrait)');
  const handler = () => cb(mql.matches ? 'portrait' : 'landscape');
  mql.addEventListener('change', handler);
  return () => mql.removeEventListener('change', handler);
}
