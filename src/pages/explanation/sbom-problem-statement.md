# Container SBOM & Security Scanning Workflow

## Motivation

It can be useful to ensure that:

- All dependencies in a container are visible.
- Security advisories provided by the binaries themselves are captured.  
- Dependencies brought in by any custom binaries are accounted for.

This provides a complete and auditable picture of what’s running and what might be vulnerable.

---

## Scenario: Custom Binaries Often Overlooked

Consider a container with a custom binary `binary-x`:

```
/app/binary-x   (version 1.2.3)
```

A standard Trivy scan might detect OS packages and language dependencies, but the binary itself may not appear. As well as all the dependencies of binary-x.


> For Bitnami images, Trivy can read SBOMs and use the Bitnami Vulnerability Database.  
> It examines `/opt/bitnami/<component>/.spdx-<component>.spdx` files and matches components against known CVEs.  
> Still, binaries not represented in the SBOM are missed unless additional metadata or attestations are provided.

---

## 1. Generate an Initial SBOM of the Container Dependencies (solves 1.)

Use [Syft](https://github.com/anchore/syft) to create a baseline SBOM:

```bash
syft <container-or-dir> -o cyclonedx-json > container-sbom.json
```

This captures:

* OS packages
* Language dependencies
* Automatically detectable components

Custom binaries like `binary-x` may not appear yet. As well as all the dependencies of binary-x.

---

## 2. Check Release Attestations to Identify missed binaries (solves 2.)

1. Check if the container has any release attestations. If so, add the purl to the SBOM.

```json
{
  "type": "application",
  "name": "binary-x",
  "version": "1.2.3",
  "purl": "pkg:generic/binary-x@1.2.3",
}
```

This allows to track security advisories for the binary itself.
The last thing missing are the dependencies of binary-x.

## 3. Generate SBOMs for Custom Binaries (solves 3.)

Foreach custom binary identified through release attestations (e.g. binary-x):

1. Check if there are any sboms inside /opt/sboms/<component>
2. Merge them into the main SBOM

---

## 3. Scan the SBOM

Run Trivy on the combined SBOM:

```bash
trivy sbom container-sbom.json
```

* Detects public vulnerabilities (NVD, OSV)
* Includes custom binaries via SBOM entries
* Leverages **first-party advisories embedded in release attestations**

---

## Benefits

* Visibility into all binaries, including custom/in-house binaries.
* Automatically incorporates the **binary’s own security advisories** via attestations.
* Provides an **auditable trail** of software, versions, and attestations.
* Can be integrated into CI/CD pipelines for container hardening and vulnerability validation.

---

## References

* [Trivy Documentation](https://aquasecurity.github.io/trivy/)
* [Syft SBOM Tool](https://github.com/anchore/syft)
* [CycloneDX SBOM Specification](https://cyclonedx.org/)