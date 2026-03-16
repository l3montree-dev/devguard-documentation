<br />
<div align="center">
  
  <picture>
    <source srcset="images/logo-inverse-horizontal.svg"  media="(prefers-color-scheme: dark)">
    <img src="images/logo-horizontal.svg" alt="DevGuard by L3montree Logo" width="240" height="80">
  </picture>
  
  <h3 align="center">DevGuard - Develop Secure Software - Documentation</h3>

  <p align="center">
    Manage your CVEs seamlessly, Integrate your Vulnerability Scanners, Documentation made easy, Compliance to security Frameworks
    <br />
    <br />
    <a href="https://github.com/l3montree-dev/devguard-documentation/issues">Report Bug</a>
    ·
    <a href="https://github.com/l3montree-dev/devguard-documentation/issues">Request Feature</a>
  </p>
</div>

# DevGuard Documentation

## Link Checking

Broken links are checked automatically on every push via the [Link Check](.github/workflows/link-check.yaml) workflow. The build continues even when broken links are found — results appear in the GitHub Actions job summary.

To run the check locally, install [lychee](https://github.com/lycheeverse/lychee) and then:

```sh
lychee src/pages --root-dir $PWD/src/pages
```

Configuration (excluded domains, fallback extensions, path remapping for `public/` assets) lives in [`lychee.toml`](lychee.toml).

