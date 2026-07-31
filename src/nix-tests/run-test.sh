#!/usr/bin/env bash
set -euo pipefail

TMP_DIR="src/nix-tests/tmp"
SHELL_NIX="src/nix-tests/shell.nix"

cleanup() {
    rm -rf "$TMP_DIR"
}
trap cleanup EXIT

echo "Getting all the code blocks together.."
node src/nix-tests/nixmd.mts

failed=0

for script in "$TMP_DIR"/*.sh; do
    [ -e "$script" ] || break

    echo "==> $script"

    if nix-shell "$SHELL_NIX" --run "bash '$script'"; then
        echo "OK: $script"
    else
        echo "FAILED: $script" >&2
        failed=1
    fi
done

exit "$failed"
