---
title: devguard-scanner discover-baseimage-attestations — CLI Reference
description: "Reference for devguard-scanner discover-baseimage-attestations: Scan a directory for Dockerfile/Containerfile, extract the base image FROM line and attempt."
seo:
  keyword_primary: devguard-scanner discover-baseimage-attestations
  keywords_secondary:
    - DevGuard CLI
    - devguard-scanner commands
    - DevGuard security scanner
  robots: index,follow
  og:
    title: devguard-scanner discover-baseimage-attestations — CLI Reference
    description: "Reference for devguard-scanner discover-baseimage-attestations: Scan a directory for Dockerfile/Containerfile, extract the base image FROM line and attempt."
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

## discover-baseimage-attestations

Discover base image attestations from container files

### Synopsis

Scan a directory for Dockerfile/Containerfile, extract the base image FROM line and
attempt to discover any attestation documents for the base image. It will save the attestations to the output path as separate files.

Example:
  devguard-scanner discover-baseimage-attestations ./path/to/project/Containerfile


```shell
devguard-scanner discover-baseimage-attestations <path to containerfile> [flags]
```

### Options

```shell
  -h, --help                   help for discover-baseimage-attestations
      --output string          Output directory to save the discovered attestations. (default ".")
      --predicateType string   Predicate type to filter attestations (e.g. 'https://cyclonedx.org/vex'). If empty, all predicate types are retrieved.
```

### Options inherited from parent commands

```shell
  -l, --logLevel string   Set the log level. Options: debug, info, warn, error (default "info")
```
