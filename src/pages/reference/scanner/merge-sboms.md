---
title: devguard-scanner merge-sboms — DevGuard CLI Reference
description: "Reference for devguard-scanner merge-sboms: Merge multiple CycloneDX SBOMs into a single SBOM. The command expects a JSON configuration file with the target."
seo:
  keyword_primary: devguard-scanner merge-sboms
  keywords_secondary:
    - DevGuard CLI
    - devguard-scanner commands
    - DevGuard security scanner
  robots: index,follow
  og:
    title: devguard-scanner merge-sboms — DevGuard CLI Reference
    description: "Reference for devguard-scanner merge-sboms: Merge multiple CycloneDX SBOMs into a single SBOM. The command expects a JSON configuration file with the target."
    image: /og-image.png
    type: article
    schema:
      type: TechArticle
lang: en-US
ignoreChecks:
  - checkIfKeywordDensityInRange
  - checkIfMinimumInternalLinks
  - checkIfHeadingContainsKeywordPrimary
  - checkIfTitleContainsKeywordPrimary
  - checkIfHeadingOrderCorrect
---

## merge-sboms

Merge multiple SBOMs into one SBOM

### Synopsis

Merge multiple CycloneDX SBOMs into a single SBOM.

The command expects a JSON configuration file with the target purl and a list
of SBOM file paths to merge. The merged SBOM is written to stdout in pretty JSON.

Example config file:
  { "purl": "pkg:foo/bar@1.2.3", "sboms": ["a.json", "b.json"] }

```shell
devguard-scanner merge-sboms <config file> [flags]
```

### Examples

```shell
  # Merge SBOMs using config file
  devguard-scanner merge-sboms config.json

  # Redirect output to file
  devguard-scanner merge-sboms config.json > merged-sbom.json
```

### Options

```shell
  -h, --help   help for merge-sboms
```

### Options inherited from parent commands

```shell
  -l, --logLevel string   Set the log level. Options: debug, info, warn, error (default "info")
```
