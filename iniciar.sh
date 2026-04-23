#!/bin/bash
# Inicia o jogo localmente sem precisar de terminal.
# Duplo clique neste arquivo para rodar.

cd "$(dirname "$0")"

# Mata qualquer servidor anterior na porta 5173
fuser -k 5173/tcp 2>/dev/null

# Inicia servidor em background
python3 -m http.server 5173 > /dev/null 2>&1 &

# Aguarda servidor subir
sleep 1

# Abre no Chrome/Chromium (tenta os nomes mais comuns)
if command -v google-chrome &>/dev/null; then
  google-chrome --app=http://localhost:5173 --start-fullscreen
elif command -v chromium-browser &>/dev/null; then
  chromium-browser --app=http://localhost:5173 --start-fullscreen
elif command -v chromium &>/dev/null; then
  chromium --app=http://localhost:5173 --start-fullscreen
elif command -v firefox &>/dev/null; then
  firefox http://localhost:5173
else
  xdg-open http://localhost:5173
fi
