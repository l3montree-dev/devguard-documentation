#!/usr/bin/env bash
set -euo pipefail

TMP_DIR="src/nix-tests/tmp"
SHELL_NIX="src/nix-tests/shell.nix"
SCRIPT_TIMEOUT="${SCRIPT_TIMEOUT:-300}"

cleanup() {
    rm -rf "$TMP_DIR"
}
trap cleanup EXIT

echo "Getting all the code blocks together.."
node src/nix-tests/nixmd.mts

export DEVGUARD_APIURL="$apiUrl"
export DEVGUARD_TOKEN="$token"

failed=0

for script in "$TMP_DIR"/*.sh; do
    [ -e "$script" ] || break

    echo "==> $script"

    work_dir="$TMP_DIR/work/$(basename "$script" .sh)"
    mkdir -p "$work_dir"

    if nix-shell "$SHELL_NIX" --run "cd '$work_dir' && timeout $SCRIPT_TIMEOUT bash '$PWD/$script'" < /dev/null; then
        echo "OK: $script"
    else
        echo "FAILED: $script" >&2
        failed=1
    fi
done

exit "$failed"
