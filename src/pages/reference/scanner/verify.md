---
title: "devguard-scanner intoto verify — DevGuard CLI Reference"
description: "Reference for the devguard-scanner intoto verify command — DevGuard CLI tool for SBOM, SARIF, and attestation workflows in DevSecOps pipelines."
seo:
  keyword_primary: "devguard-scanner intoto verify"
  keywords_secondary:
    - "DevGuard CLI"
    - "devguard-scanner commands"
    - "DevGuard security scanner"
lang: "en-US"
og:
  title: "devguard-scanner intoto verify — DevGuard CLI Reference"
  description: "Reference for the devguard-scanner intoto verify command — DevGuard CLI tool for SBOM, SARIF, and attestation workflows in DevSecOps pipelines."
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

## intoto verify

Verify a supply chain

```shell
devguard-scanner intoto verify [flags]
```

### Options

```shell
  -h, --help                   help for verify
      --layoutKey string       Path to the layout key
      --supplyChainId string   Supply chain ID
      --token string           Token
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
```
