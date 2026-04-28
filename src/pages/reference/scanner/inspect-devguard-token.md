---
title: devguard-scanner inspect-devguard-token — DevGuard CLI Reference
description: "Reference for devguard-scanner inspect-devguard-token: Decode a DevGuard hex token and print the corresponding private and public keys in PEM and hex."
seo:
  keyword_primary: devguard-scanner inspect-devguard-token
  keywords_secondary:
    - DevGuard CLI
    - devguard-scanner commands
    - DevGuard security scanner
  robots: index,follow
  og:
    title: devguard-scanner inspect-devguard-token — DevGuard CLI Reference
    description: "Reference for devguard-scanner inspect-devguard-token: Decode a DevGuard hex token and print the corresponding private and public keys in PEM and hex."
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

## inspect-devguard-token

Decode and display a DevGuard token's keys

### Synopsis

Decode a DevGuard hex token and print the corresponding private and public keys in PEM and hex formats.

This is intended for debugging and key inspection only.

Warning: the private key will be printed to stdout; handle output carefully and avoid exposing
private keys in logs or shared screens.

```shell
devguard-scanner inspect-devguard-token <hex-token> [flags]
```

### Examples

```shell
  # Inspect a DevGuard token
  devguard-scanner inspect-devguard-token 4a6f...

  # Save output to file
  devguard-scanner inspect-devguard-token 4a6f... > keys.txt
```

### Options

```shell
  -h, --help   help for inspect-devguard-token
```

### Options inherited from parent commands

```shell
  -l, --logLevel string   Set the log level. Options: debug, info, warn, error (default "info")
```
