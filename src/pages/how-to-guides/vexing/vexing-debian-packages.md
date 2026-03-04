---
title: Investigate CVE Findings in Debian Packages
description: A repeatable, evidence-based playbook for determining whether a CVE in a Debian package is a false positive or requires an accept-risk justification using binary analysis.
---

# How to Investigate CVE Findings in Debian Packages (False Positive vs. Accept Risk)

This playbook describes a repeatable, evidence-based process for evaluating CVE findings in Debian packages — specifically for determining whether a vulnerability is a **False Positive** or requires an **Accept Risk** justification.

It applies to any context where Debian packages are present in your workload: container images, VMs, bare-metal servers, or CI pipelines.

---

## Background

Vulnerability scanners report CVEs based on the presence of a package. However, a package being present does not mean the vulnerable code path is actually reachable. This process uses binary analysis to prove whether the vulnerable function is ever called.

**Two possible outcomes:**

| Outcome | Meaning |
|---|---|
| **False Positive** | The vulnerable function is never called in this workload. The code path is structurally unreachable. |
| **Accept Risk** | The vulnerable function could theoretically be called, but the risk is acceptable (e.g. deprecated feature, DoS-only, Debian classifies as minor). |

---

## Required Tools

- `curl` — to download `.deb` packages
- `ar` + `tar` — to extract `.deb` packages
- `nm` / `objdump` — to inspect binary symbols (part of `binutils`)
- `dpkg` — to inspect package metadata
- `python3` — to parse `config.amd64.json`

### Reproducible Environment with Nix

All required tools are provided as a Nix flake for a fully reproducible analysis environment. This is the recommended way to run the analysis, especially on macOS or in CI.

[Download flake.nix](/labs/binary-analysis/flake.nix)

```nix
# flake.nix — provides: curl, tar, binutils (nm, objdump, ar), dpkg
```

**Usage:**

```bash
# Enter the dev shell (installs all tools automatically)
nix develop

# Or run a single command without entering the shell
nix develop --command nm -D <binary>
```

> **Note:** The flake targets `x86_64-linux` for Debian binary analysis. On macOS (Apple Silicon), use a remote builder or a Linux VM/container. The `nm -D` analysis must be run against the amd64 Debian binaries, not your host's native architecture.

---

## Step-by-Step Process

### Step 1 — Understand the Dependency Path

Note the full path shown in your scanner, e.g.:

```
Your application → debian/wget → debian/libgnutls30t64 → debian/libtasn1-6
```

This tells you:
- Which package is **vulnerable** (the last node)
- Which package **pulls it in** (the intermediate node)
- You need to prove whether the intermediate package actually calls the vulnerable function

---

### Step 2 — Research the CVE

Before doing any binary analysis, understand what you're looking for.

**Search for:**
```
CVE-XXXX-XXXXX <library-name> vulnerable function details
CVE-XXXX-XXXXX debian security tracker
```

**Key questions to answer:**
1. **What is the exact vulnerable function?** (e.g. `asn1_expand_octet_string`)
2. **What triggers the vulnerability?** Does it require a specific call pattern or input?
3. **How does Debian classify it?**
   - Check: `https://security-tracker.debian.org/tracker/CVE-XXXX-XXXXX`
   - `<no-dsa>` = Minor issue, Debian does not plan a security update → additional argument for Accept Risk

---

### Step 3 — Get the Package URLs

You need the **exact version** of the package that is present in your container image. Debian's [snapshot archive](https://snapshot.debian.org) preserves every historical package version and is the canonical source for downloading them.

#### 3a — Find the exact version

The version is usually reported directly by your scanner. If you need to verify it on the system itself:

```bash
dpkg -l | grep <package-name>
# Example output: ii  libgnutls30t64  3.8.3-1.1  amd64  GNU TLS library ...
```

#### 3b — Look up the package on Debian Snapshot

Go to **https://snapshot.debian.org/binary/\<package-name\>/** and find the exact version. The direct download URL follows this pattern:

```
https://snapshot.debian.org/archive/debian/<timestamp>/pool/<section>/<letter>/<package>/<package>_<version>_amd64.deb
```

**Example** for `libgnutls30t64` version `3.8.3-1.1`:
```
https://snapshot.debian.org/archive/debian/20240831T204032Z/pool/main/g/gnutls28/libgnutls30t64_3.8.6-2_amd64.deb
```

> **Tip:** If you know the package version but not the timestamp, use the binary search page at `https://snapshot.debian.org/binary/<package-name>/` — it lists all available versions with direct download links.


---

### Step 4 — Download and Extract the .deb Packages (Run in `nix develop`)

```bash
# Download
curl -L "<url-from-config>" -o <package>.deb

# Extract
mkdir <package>-extracted && cd <package>-extracted
ar x ../<package>.deb
tar xf data.tar.xz
cd ..
```

Repeat for each relevant package in the dependency chain.

---

### Step 5 — Binary Analysis

This is the core of the investigation. Use `nm -D` to inspect which external symbols a binary references at runtime.

> **How to read `nm -D` output:**
> - `U` = Undefined = the binary **calls** this function from an external library
> - If a function does **not appear** in the output → it is **never called**

#### 5a — Is the vulnerable library linked at all?

```bash
nm -D <binary> | grep -i "<library-keyword>"
# e.g. for libexpat:
nm -D usr/bin/git | grep -i "xml"
```

No output → the binary is not linked against the library → **strong False Positive signal**

#### 5b — Is the specific vulnerable function called?

```bash
nm -D <library>.so* | grep -i "<vulnerable_function>"
# e.g.:
nm -D usr/lib/x86_64-linux-gnu/libgnutls.so.30* | grep -i "expand_octet"
```

No output → the function is never called by this library → **False Positive**

#### 5c — For packages with multiple binaries (e.g. git-core)

```bash
for f in usr/lib/git-core/*; do
  result=$(nm -D "$f" 2>/dev/null | grep -i "<keyword>")
  if [ -n "$result" ]; then
    echo "=== $f ==="
    echo "$result"
  fi
done
```

This reveals exactly which sub-binary uses the vulnerable library.

---

### Step 6 — Make the Decision

| Situation | Decision |
|---|---|
| Vulnerable function does not appear in any binary's symbol table | **False Positive** → "Vulnerable Code Not In Execute Path" |
| Vulnerable function is only used by a legacy/deprecated sub-binary that is never invoked | **False Positive** → with justification |
| Vulnerable function is called, but the specific trigger condition is never met | **False Positive** → with detailed justification |
| Vulnerable function is reachable, risk is low (DoS-only, `<no-dsa>`, mitigated by other controls) | **Accept Risk** |

---

### Step 7 — Write the VEX Comment (English)

A good VEX comment always contains these three parts:

1. **What is the vulnerability** — the vulnerable function and what it does
2. **Binary analysis result** — what `nm -D` showed (or didn't show) and why that proves the code path is unreachable
3. **Supporting evidence** (optional but recommended) — Debian's `<no-dsa>` classification, deprecated feature status, etc.

**False Positive template:**
```
CVE-XXXX-XXXXX is assessed as a false positive.

The vulnerability is a <type> in the <function_name> function of <library>.
According to the official security advisory, exploitation requires that the
target program explicitly calls <function_name>.

Binary analysis of the extracted Debian package (<package_version>.deb) via
nm -D confirms that <intermediate_library> does not reference or call
<function_name> at all. Since <top_level_package> accesses <library>
exclusively through <intermediate_library>, and <intermediate_library> never
invokes the vulnerable function, the vulnerable code path is never reached.

[Optional: Additionally, Debian's security team has classified this CVE as a
minor issue (<no-dsa>) for Trixie and does not plan a dedicated security update.]

This finding is therefore classified as a false positive.
```

**Accept Risk template:**
```
CVE-XXXX-XXXXX is assessed as accepted risk.

The vulnerability affects <library> version <version>, which is present as a
[direct/transitive] dependency of <package>. The vulnerable function
<function_name> is called by <binary>, which implements <feature>.

Risk is considered acceptable for the following reasons:
1. <reason 1 — e.g. feature is deprecated/not used in this workload>
2. <reason 2 — e.g. vulnerability class is DoS only, no RCE>
3. <reason 3 — e.g. Debian classifies as <no-dsa>, no patch planned>

We will re-evaluate once Debian ships a patched version.
```

---

## Real Examples

### Example 1 — False Positive: CVE-2025-59375 (libexpat via git)

**Path:** `Your application → debian/git → debian/libexpat1`

**CVE:** Stack overflow in libexpat via recursive XML entity expansion (DoS). Fixed in 2.7.2.

**Analysis:**
```bash
nm -D usr/bin/git | grep -i xml
# → no output (git binary not linked against libexpat)

for f in usr/lib/git-core/*; do
  result=$(nm -D "$f" 2>/dev/null | grep -i xml)
  if [ -n "$result" ]; then echo "=== $f ==="; echo "$result"; fi
done
# → only git-http-push uses XML symbols
```

**Decision:** False Positive — libexpat is only used by `git-http-push`, a deprecated legacy binary implementing WebDAV-based HTTP push, which is never invoked in this workload.

---

### Example 2 — False Positive: CVE-2025-13151 (libtasn1 via libgnutls via wget)

**Path:** `Your application → debian/wget → debian/libgnutls30t64 → debian/libtasn1-6`

**CVE:** Stack-based buffer overflow in `asn1_expand_octet_string`. Exploitation requires the target program to **explicitly call** this function.

**Analysis:**
```bash
nm -D usr/lib/x86_64-linux-gnu/libgnutls.so.30* | grep -i "expand_octet"
# → no output
```

**Decision:** False Positive — libgnutls never calls `asn1_expand_octet_string`. Since wget accesses libtasn1 exclusively through libgnutls, the vulnerable function is never reached.

---

## Notes

- `nm -D` only works on **dynamically linked** binaries. Statically linked binaries require `nm` without `-D`
- The absence of a symbol in `nm -D` output is **definitive proof** that the function is never called at runtime via dynamic linking
- Debian's `<no-dsa>` classification is supporting evidence, not proof by itself — always combine with binary analysis