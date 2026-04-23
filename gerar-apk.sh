#!/bin/bash
# Gera o APK do Jogo Consensualismo TCE-PE.
# Rode após qualquer alteração no jogo para atualizar o .apk.

set -e

export ANDROID_HOME=$HOME/Android/Sdk
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin

PROJETO="$(cd "$(dirname "$0")" && pwd)"
APK_SAIDA="$PROJETO/JogoConsensualismoTCEPE.apk"

echo "==> Sincronizando arquivos do jogo..."
rm -rf "$PROJETO/www"
mkdir -p "$PROJETO/www"
cp "$PROJETO/index.html" "$PROJETO/www/"
cp -r "$PROJETO/assets" "$PROJETO/www/"
cp -r "$PROJETO/src" "$PROJETO/www/"
cp -r "$PROJETO/styles" "$PROJETO/www/"
cp -r "$PROJETO/docs" "$PROJETO/www/"

echo "==> Sincronizando Capacitor..."
cd "$PROJETO"
npx cap sync android

echo "==> Compilando APK..."
cd "$PROJETO/android"
./gradlew assembleDebug

echo "==> Copiando APK para raiz..."
cp "$PROJETO/android/app/build/outputs/apk/debug/app-debug.apk" "$APK_SAIDA"

echo ""
echo "✓ APK gerado: $APK_SAIDA"
du -sh "$APK_SAIDA"
