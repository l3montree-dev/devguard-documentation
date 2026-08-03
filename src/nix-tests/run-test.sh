#!/usr/bin/env bash
set -euo pipefail

TMP_DIR="src/nix-tests/tmp"
SHELL_NIX="src/nix-tests/shell.nix"
SCRIPT_TIMEOUT="${SCRIPT_TIMEOUT:-300}"
NIXPKGS_URL="https://github.com/NixOS/nixpkgs/tarball/nixos-26.05"
EXAMPLE_REPO_URL="${EXAMPLE_REPO_URL:-https://github.com/l3montree-dev/devguard-example-repository.git}"
EXAMPLE_REPO_DIR="$TMP_DIR/example-repository"

MDX_FILES=(
    "src/pages/getting-started/first-scan.mdx"
)

export NIX_PATH="nixpkgs=$NIXPKGS_URL"

cleanup() {
    rm -rf "$TMP_DIR"
}
trap cleanup EXIT

rm -rf "$TMP_DIR"
mkdir -p "$TMP_DIR"

echo "Cloning $EXAMPLE_REPO_URL .."
git clone --depth 1 "$EXAMPLE_REPO_URL" "$EXAMPLE_REPO_DIR"

echo "Getting all the code blocks together.."
for mdx in "${MDX_FILES[@]}"; do
    node src/nix-tests/nixmd.mts "$mdx"
done

export DEVGUARD_APIURL="$apiUrl"
export DEVGUARD_TOKEN="$token"

failed=0

for script in "$TMP_DIR"/*.sh; do
    [ -e "$script" ] || break

    echo "==> $script"

    work_dir="$TMP_DIR/work/$(basename "$script" .sh)"
    mkdir -p "$TMP_DIR/work"
    rm -rf "$work_dir"
    cp -R "$EXAMPLE_REPO_DIR" "$work_dir"

    if nix-shell "$SHELL_NIX" --run "cd '$work_dir' && timeout $SCRIPT_TIMEOUT bash '$PWD/$script'" < /dev/null; then
        echo "OK: $script"
    else
        echo "FAILED: $script" >&2
        failed=1
    fi
done

exit "$failed"
