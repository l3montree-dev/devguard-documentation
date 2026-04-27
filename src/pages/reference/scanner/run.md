---
title: "devguard-scanner intoto run — DevGuard CLI Reference"
description: "Reference for the devguard-scanner intoto run command — DevGuard CLI tool for SBOM, SARIF, and attestation workflows in DevSecOps pipelines."
seo:
  keyword_primary: "devguard-scanner intoto run"
  keywords_secondary:
    - "DevGuard CLI"
    - "devguard-scanner commands"
    - "DevGuard security scanner"
lang: "en-US"
og:
  title: "devguard-scanner intoto run — DevGuard CLI Reference"
  description: "Reference for the devguard-scanner intoto run command — DevGuard CLI tool for SBOM, SARIF, and attestation workflows in DevSecOps pipelines."
  image: "/og-image.png"
  type: "article"
  schema:
    type: "TechArticle"
robots: "index,follow"
ignoreChecks: 
  - "checkIfKeywordDensityInRange"
  - "checkIfMinimumInternalLinks"
  - "checkIfHeadingContainsKeywordPrimary"
  - "checkIfTitleContainsKeywordPrimary"
  - "checkIfHeadingOrderCorrect"
---

## intoto run



```shell
devguard-scanner intoto run [flags]
```

### Options

```shell
      --apiUrl string                    The URL of the devguard API
  -h, --help                             help for run
      --step string                      The step to run
      --supplyChainOutputDigest string   If defined, sends this digest to devguard. This should be the digest of the whole supply chain.
```

### Options inherited from parent commands

```shell
      --assetName string         The asset name to use
      --generateSlsaProvenance   Generate SLSA provenance for the in-toto link. The provenance will be stored in <stepname>.provenance.json. It will be signed using the intoto token.
      --ignore stringArray       The ignore patterns for the in-toto link (default [.git/**/*])
  -l, --logLevel string          Set the log level. Options: debug, info, warn, error (default "info")
      --materials stringArray    The materials to include in the in-toto link. Default is the current directory (default [.])
      --products stringArray     The products to include in the in-toto link. Default is the current directory (default [.])
      --supplyChainId string     The supply chain id to use. If empty, tries to extract the current commit hash.
      --token string             The token to use for in-toto
```
