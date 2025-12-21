#!/bin/bash
#
# GPG Signature Verification Script
# Verifies a detached signature against a document using an ASCII-armored public key
#
# Usage: verify-signature.sh <ascii-armored-keyfile> <signature-file> [document-file]
#
# Example: ./verify-signature.sh pubkey.asc cve-2025-54880.json.asc cve-2025-54880.json
# 

set -euo pipefail

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print usage information
usage() {
    cat << EOF
Usage: $(basename "$0") <keyfile> <signature-file> [document-file]

Arguments:
    keyfile         ASCII-armored public key file (.asc)
    signature-file  Detached signature file (.asc or .sig)
    document-file   Document to verify (optional, auto-detected from signature filename)

Example:
    $(basename "$0") pubkey.asc cve-2025-54880.json.asc cve-2025-54880.json
    $(basename "$0") pubkey.asc document.sig document.txt

EOF
    exit 1
}

# Check arguments
if [ $# -lt 2 ] || [ $# -gt 3 ]; then
    usage
fi

KEYFILE="$1"
SIGFILE="$2"

# Try to determine document file if not provided
if [ $# -eq 3 ]; then
    DOCFILE="$3"
else
    # Try to auto-detect by removing .asc or .sig extension
    DOCFILE="${SIGFILE%.asc}"
    DOCFILE="${DOCFILE%.sig}"
    
    if [ "$DOCFILE" = "$SIGFILE" ]; then
        echo -e "${RED}Error:${NC} Cannot auto-detect document file. Please specify it explicitly."
        usage
    fi
    
    echo -e "${BLUE}Info:${NC} Auto-detected document file: $DOCFILE"
fi

# Validate input files
if [ ! -f "$KEYFILE" ]; then
    echo -e "${RED}Error:${NC} Key file not found: $KEYFILE"
    exit 1
fi

if [ ! -f "$SIGFILE" ]; then
    echo -e "${RED}Error:${NC} Signature file not found: $SIGFILE"
    exit 1
fi

if [ ! -f "$DOCFILE" ]; then
    echo -e "${RED}Error:${NC} Document file not found: $DOCFILE"
    exit 1
fi

# Create temporary keyring
TEMPKEY=$(mktemp -t verify-sig.XXXXXX).gpg

cleanup() {
    rm -f "$TEMPKEY"
}
trap cleanup EXIT

# Convert ASCII-armored key to binary keyring
echo -e "${BLUE}Info:${NC} Converting public key to keyring..."
if ! gpg2 --yes -o "$TEMPKEY" --dearmor "$KEYFILE" 2>/dev/null; then
    echo -e "${RED}Error:${NC} Failed to import public key"
    exit 1
fi

# Verify signature
echo -e "${BLUE}Info:${NC} Verifying signature..."
echo

OUTPUT=$(gpg2 --status-fd 1 --no-default-keyring --keyring "$TEMPKEY" --trust-model always --verify "$SIGFILE" "$DOCFILE" 2>/dev/null)

echo "$OUTPUT"

# Check verification result
if echo "$OUTPUT" | grep -q "GOODSIG"; then
    echo -e "${GREEN}✓ VALID SIGNATURE${NC}"
    echo
    
    # Extract key information
    KEY_ID=$(echo "$OUTPUT" | grep "GOODSIG" | awk '{print $3}')
    KEY_USER=$(echo "$OUTPUT" | grep "GOODSIG" | cut -d' ' -f4-)
    
    echo -e "Signed by: ${GREEN}$KEY_USER${NC}"
    echo -e "Key ID: ${GREEN}$KEY_ID${NC}"
    
    # Extract signature date if available
    if echo "$OUTPUT" | grep -q "VALIDSIG"; then
        SIG_TIMESTAMP=$(echo "$OUTPUT" | grep "VALIDSIG" | awk '{print $5}')
        if [ -n "$SIG_TIMESTAMP" ]; then
            SIG_DATE=$(date -d "@$SIG_TIMESTAMP" "+%Y-%m-%d %H:%M:%S %Z" 2>/dev/null || date -r "$SIG_TIMESTAMP" "+%Y-%m-%d %H:%M:%S %Z" 2>/dev/null || echo "Unknown")
            echo -e "Signature date: ${GREEN}$SIG_DATE${NC}"
        fi
    fi
    
    exit 0
elif echo "$OUTPUT" | grep -q "BADSIG"; then
    echo -e "${RED}✗ INVALID SIGNATURE${NC}"
    echo -e "${RED}Warning:${NC} The signature does NOT match the document!"
    exit 1
elif echo "$OUTPUT" | grep -q "NODATA"; then
    echo -e "${RED}✗ NO DATA${NC}"
    echo -e "${RED}Error:${NC} No signature data found or signature file is invalid"
    exit 1
else
    echo -e "${YELLOW}? UNKNOWN STATUS${NC}"
    echo -e "${YELLOW}Warning:${NC} Could not determine signature status"
    echo
    echo "Raw output:"
    echo "$OUTPUT"
    exit 2
fi