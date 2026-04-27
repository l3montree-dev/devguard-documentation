---
title: "devguard-scanner intoto start — DevGuard CLI Reference"
description: "Reference for the devguard-scanner intoto start command — DevGuard CLI tool for SBOM, SARIF, and attestation workflows in DevSecOps pipelines."
seo:
  keyword_primary: "devguard-scanner intoto start"
  keywords_secondary:
    - "DevGuard CLI"
    - "devguard-scanner commands"
    - "DevGuard security scanner"
lang: "en-US"
og:
  title: "devguard-scanner intoto start — DevGuard CLI Reference"
  description: "Reference for the devguard-scanner intoto start command — DevGuard CLI tool for SBOM, SARIF, and attestation workflows in DevSecOps pipelines."
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

## intoto start

Start in-toto recording

```shell
devguard-scanner intoto start [flags]
```

### Options

```shell
  -h, --help   help for start
```

### Options inherited from parent commands

```shell
      --apiUrl string            The devguard api url
      --assetName string         The asset name to use
      --generateSlsaProvenance   Generate SLSA provenance for the in-toto link. The provenance will be stored in <stepname>.provenance.json. It will be signed using the intoto token.
      --ignore stringArray       The ignore patterns for the in-toto link (default [.git/**/*])
  -l, --logLevel string          Set the log level. Options: debug, info, warn, error (default "info")
      --materials stringArray    The materials to include in the in-toto link. Default is the current directory (default [.])
      --products stringArray     The products to include in the in-toto link. Default is the current directory (default [.])
      --step string              The name of the in-toto link
      --supplyChainId string     The supply chain id to use. If empty, tries to extract the current commit hash.
      --token string             The token to use for in-toto
```
