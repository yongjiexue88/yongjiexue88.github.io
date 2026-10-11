#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

HUGO_VERSION="0.167.0"
GO_VERSION="$(awk '$1 == "go" { print $2 }' go.mod)"
BUILD_OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
BUILD_ARCH="$(uname -m)"

case "$BUILD_OS" in
  darwin|linux) ;;
  *) echo "Unsupported build OS: $BUILD_OS" >&2; exit 1 ;;
esac
case "$BUILD_ARCH" in
  x86_64) BUILD_ARCH="amd64" ;;
  aarch64|arm64) BUILD_ARCH="arm64" ;;
  *) echo "Unsupported build architecture: $BUILD_ARCH" >&2; exit 1 ;;
esac

# Keep downloaded tools separate from the user's installed versions. All build
# entry points use these same pins, including machines with older tools on PATH.
TOOLS_DIR="${XDG_CACHE_HOME:-${TMPDIR:-/tmp}}/yongjiexue-site-tools"
HUGO_DIR="$TOOLS_DIR/hugo-$HUGO_VERSION-$BUILD_OS-$BUILD_ARCH"
GO_DIR="$TOOLS_DIR/go-$GO_VERSION-$BUILD_OS-$BUILD_ARCH"
export PATH="$HUGO_DIR:$GO_DIR/go/bin:$PATH"
DOWNLOAD_DIR="$(mktemp -d)"
trap 'rm -rf "$DOWNLOAD_DIR"' EXIT

hugo_is_current() {
  command -v hugo >/dev/null 2>&1 || return 1
  local version
  version="$(hugo version)"
  [[ "$version" == "hugo v${HUGO_VERSION}"[+-]* && "$version" == *"+extended"* ]]
}

go_is_current() {
  command -v go >/dev/null 2>&1 &&
    [[ "$(go version)" == "go version go${GO_VERSION} "* ]]
}

if ! hugo_is_current; then
  echo "==> Installing Hugo Extended $HUGO_VERSION..."
  mkdir -p "$HUGO_DIR"
  if [ "$BUILD_OS" = "darwin" ]; then
    # Recent Hugo macOS releases ship a .pkg instead of a .tar.gz. Expanding it
    # extracts the binary without running an installer or requiring sudo.
    curl --fail --show-error --location --retry 3 \
      "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_darwin-universal.pkg" \
      --output "$DOWNLOAD_DIR/hugo.pkg"
    pkgutil --expand-full "$DOWNLOAD_DIR/hugo.pkg" "$DOWNLOAD_DIR/hugo-expanded"
    HUGO_BINARY="$(find "$DOWNLOAD_DIR/hugo-expanded" -type f -name hugo -print -quit)"
    test -n "$HUGO_BINARY"
    cp "$HUGO_BINARY" "$HUGO_DIR/hugo"
    chmod +x "$HUGO_DIR/hugo"
  else
    curl --fail --show-error --location --retry 3 \
      "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-${BUILD_ARCH}.tar.gz" \
      --output "$DOWNLOAD_DIR/hugo.tar.gz"
    tar -xzf "$DOWNLOAD_DIR/hugo.tar.gz" -C "$HUGO_DIR" hugo
  fi
fi

if ! go_is_current; then
  echo "==> Installing Go $GO_VERSION..."
  mkdir -p "$GO_DIR"
  curl --fail --show-error --location --retry 3 \
    "https://go.dev/dl/go${GO_VERSION}.${BUILD_OS}-${BUILD_ARCH}.tar.gz" \
    --output "$DOWNLOAD_DIR/go.tar.gz"
  tar -xzf "$DOWNLOAD_DIR/go.tar.gz" -C "$GO_DIR"
fi

hugo_is_current
go_is_current
echo "==> Tooling versions:"
hugo version
go version

if [ "$#" -eq 0 ]; then
  set -- --gc --minify --cleanDestinationDir
fi
hugo "$@"
