#!/usr/bin/env bash
set -e

echo "==> Preparing build environment for Hugo + OINK..."

# Detect OS and Arch
OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
ARCH="$(uname -m)"

case "$ARCH" in
  x86_64) ARCH="amd64" ;;
  aarch64|arm64) ARCH="arm64" ;;
esac

# 1. Install Hugo Extended if missing or outdated
if ! command -v hugo &> /dev/null; then
  echo "==> Hugo not found, installing Hugo Extended v0.166.0..."
  mkdir -p /tmp/hugo-bin
  if [ "$OS" = "darwin" ]; then
    curl -sL https://github.com/gohugoio/hugo/releases/download/v0.166.0/hugo_extended_0.166.0_darwin-universal.tar.gz | tar -xz -C /tmp/hugo-bin hugo
  else
    curl -sL https://github.com/gohugoio/hugo/releases/download/v0.166.0/hugo_extended_0.166.0_linux-amd64.tar.gz | tar -xz -C /tmp/hugo-bin hugo
  fi
  export PATH="/tmp/hugo-bin:$PATH"
fi

# 2. Install Go if missing (required for Hugo modules)
if ! command -v go &> /dev/null; then
  echo "==> Go not found, installing Go 1.27.1..."
  if [ "$OS" = "darwin" ]; then
    curl -sL "https://go.dev/dl/go1.27.1.darwin-${ARCH}.tar.gz" | tar -xz -C /tmp
  else
    curl -sL "https://go.dev/dl/go1.27.1.linux-${ARCH}.tar.gz" | tar -xz -C /tmp
  fi
  export PATH="/tmp/go/bin:$PATH"
fi

echo "==> Tooling versions:"
hugo version
go version

# 3. Build static site
echo "==> Building site with Hugo..."
hugo --gc --minify

echo "==> Build completed successfully into public/!"
