# DevGuard Documentation - Comprehensive Diataxis Structure

## STRUCTURE SUMMARY

```
/
├── getting-started/          (Quick wins - 15 min setup)
├── tutorials/                (Learning-oriented - NEW)
├── how-to-guides/           (Problem-oriented - Task-focused)
├── reference/               (Information-oriented - NEW)
├── explanation/             (Understanding-oriented - Concepts)
├── comparison/              (Keep existing)
├── contributing/            (Keep existing)
├── changelog/               (NEW - Version history)
├── troubleshooting/         (NEW - Common issues)
└── faq/                     (Keep existing)
```

---

## DETAILED STRUCTURE

### 1. Getting Started (Keep & Enhance)
**Goal**: Get users productive in < 15 minutes

```
/getting-started/
├── index.mdx                    # What is DevGuard? (30-sec pitch)
├── quick-start.mdx              # 5-minute installation
├── first-scan.mdx               # Run your first vulnerability scan
├── understanding-results.mdx    # How to read vulnerability reports
├── key-concepts.mdx             # Core concepts in 5 minutes
└── choose-your-path.mdx         # Different user personas
    ├── for-developers.mdx
    ├── for-devops.mdx
    ├── for-security-teams.mdx
    └── for-compliance-officers.mdx
```

---

### 2. Tutorials (NEW)
**Goal**: Step-by-step learning for new users

```
/tutorials/
├── index.mdx                           # Tutorials overview
│
├── basics/
│   ├── your-first-scan.mdx            # 15 min tutorial
│   ├── understanding-sbom.mdx          # Working with SBOMs
│   ├── managing-vulnerabilities.mdx    # Vuln lifecycle
│   └── setting-up-projects.mdx         # Org → Project → Asset hierarchy
│
├── vulnerability-management/
│   ├── triaging-vulnerabilities.mdx    # How to triage
│   ├── risk-assessment.mdx             # CIA rating tutorial
│   ├── creating-mitigation-plans.mdx   # VEX and mitigation
│   └── tracking-remediation.mdx        # From detection to fix
│
├── ci-cd-integration/
│   ├── github-actions-setup.mdx        # Complete GitHub Actions setup
│   ├── github-actions-workflows.mdx    # Using devguard-action
│   ├── gitlab-ci-setup.mdx             # GitLab CI integration
│   ├── gitlab-ci-components.mdx        # Using devguard-ci-component
│   ├── jenkins-integration.mdx         # Jenkins pipeline
│   └── automated-scanning.mdx          # Continuous scanning
│
├── compliance/
│   ├── cyber-resilience-act.mdx        # EU CRA compliance tutorial
│   ├── iso-27001-mapping.mdx           # ISO compliance
│   ├── generating-csaf-reports.mdx     # CSAF/VEX generation
│   └── audit-trails.mdx                # Creating audit logs
│
└── advanced/
    ├── supply-chain-security.mdx       # In-toto attestations
    ├── dependency-proxy-setup.mdx      # Full proxy setup
    ├── multi-tenant-setup.mdx          # Organizations & teams
    └── custom-policies.mdx             # Policy creation
```

---

### 3. How-to Guides (Rename from feature-guides)
**Goal**: Task-oriented solutions for experienced users

```
/how-to-guides/
├── index.mdx                              # How-to overview
│
├── scanning/
│   ├── scan-docker-images.mdx            # Container scanning
│   ├── scan-source-code.mdx              # SAST scanning
│   ├── scan-dependencies.mdx             # SCA scanning
│   ├── upload-sbom.mdx                   # Upload existing SBOMs
│   ├── upload-vex.mdx                    # Upload VEX documents
│   └── scheduled-scans.mdx               # Automated scanning
│
├── vulnerability-management/
│   ├── mark-as-false-positive.mdx        # False positive handling
│   ├── accept-risk.mdx                   # Risk acceptance
│   ├── track-fix-progress.mdx            # Remediation tracking
│   ├── create-vuln-events.mdx            # Event management
│   ├── sync-external-data.mdx            # External vuln sync
│   └── customize-risk-scores.mdx         # Risk scoring (CIA)
│
├── dependency-management/
│   ├── view-dependency-tree.mdx          # Dependency graph
│   ├── find-vulnerable-deps.mdx          # Vulnerability search
│   ├── license-compliance.mdx            # License management
│   ├── override-license-decisions.mdx    # License overrides
│   └── component-search.mdx              # Find components
│
├── integrations/
│   ├── github/
│   │   ├── setup-github-app.mdx         # GitHub App installation
│   │   ├── auto-setup.mdx               # Auto-setup feature
│   │   ├── webhooks.mdx                 # Webhook configuration
│   │   └── permission-sync.mdx          # RBAC sync
│   │
│   ├── gitlab/
│   │   ├── setup-gitlab-integration.mdx
│   │   ├── webhooks.mdx
│   │   ├── permission-sync.mdx
│   │   ├── ci-components/
│   │   │   ├── overview.mdx             # GitLab CI/CD Components overview
│   │   │   ├── full-pipeline.mdx        # Complete security pipeline
│   │   │   ├── secret-scanning.mdx      # Secret detection component
│   │   │   ├── sast.mdx                 # SAST component
│   │   │   ├── iac-scanning.mdx         # IaC scanning component
│   │   │   ├── sca.mdx                  # SCA component
│   │   │   ├── container-scanning.mdx   # Container scanning
│   │   │   ├── build-oci-image.mdx      # Image building (Kaniko)
│   │   │   ├── push-oci-image.mdx       # Image pushing
│   │   │   ├── sign-oci-image.mdx       # Image signing (Cosign)
│   │   │   ├── attest.mdx               # Attestation creation
│   │   │   ├── container-lifecycle.mdx  # Full container lifecycle
│   │   │   ├── base-image-inspection.mdx # Base image attestations
│   │   │   ├── sbom-upload.mdx          # SBOM upload
│   │   │   ├── vex-upload.mdx           # VEX upload
│   │   │   ├── sarif-upload.mdx         # SARIF upload
│   │   │   └── generate-tag.mdx         # Tag generation
│   │
│   ├── jira/
│   │   ├── connect-jira.mdx
│   │   ├── issue-creation.mdx
│   │   └── sync-status.mdx
│   │
│   └── custom-webhooks/
│       ├── create-webhook.mdx
│       ├── webhook-events.mdx
│       └── webhook-security.mdx
│
├── security/
│   ├── dependency-proxy/
│   │   ├── setup-npm-proxy.mdx          # NPM proxy (EXISTING)
│   │   ├── setup-pypi-proxy.mdx         # PyPI proxy (EXISTING)
│   │   ├── setup-go-proxy.mdx           # Go proxy (EXISTING)
│   │   ├── malicious-package-blocking.mdx
│   │   └── cache-management.mdx
│   │
│   ├── supply-chain/
│   │   ├── create-in-toto-links.mdx     # In-toto links
│   │   ├── verify-supply-chain.mdx      # Supply chain verification
│   │   ├── manage-attestations.mdx      # Attestation management
│   │   └── signing-artifacts.mdx        # Artifact signing
│   │
│   └── access-control/
│       ├── manage-users.mdx              # User management
│       ├── setup-rbac.mdx                # Role-based access
│       ├── organization-roles.mdx        # Org-level permissions
│       ├── project-roles.mdx             # Project-level permissions
│       ├── asset-roles.mdx               # Asset-level permissions
│       └── api-tokens.mdx                # PAT management
│
├── compliance/
│   ├── generate-csaf-reports.mdx         # CSAF generation
│   ├── generate-vex-documents.mdx        # VEX generation
│   ├── export-sbom.mdx                   # SBOM export
│   ├── compliance-dashboards.mdx         # Compliance views
│   ├── audit-logs.mdx                    # Audit trail
│   └── attestation-policies.mdx          # Policy evaluation
│
├── api-usage/
│   ├── authenticate-with-api.mdx         # API authentication
│   ├── upload-scan-results.mdx           # API scanning
│   ├── query-vulnerabilities.mdx         # API queries
│   ├── manage-assets-via-api.mdx         # Asset management
│   └── webhooks-api.mdx                  # Webhook management
│
└── administration/
    ├── manage-organizations.mdx          # Org management
    ├── manage-projects.mdx               # Project management
    ├── manage-assets.mdx                 # Asset management
    ├── configure-database.mdx            # Database setup
    ├── backup-restore.mdx                # Backup procedures
    ├── monitoring-metrics.mdx            # Prometheus metrics
    └── update-devguard.mdx               # Upgrade guide
```

---

### 4. Reference (NEW)
**Goal**: Comprehensive technical documentation

```
/reference/
├── index.mdx                             # Reference overview
│
├── api/
│   ├── overview.mdx                      # API introduction
│   ├── authentication.mdx                # Auth methods (PAT, Session)
│   ├── rate-limits.mdx                   # Rate limiting
│   ├── error-handling.mdx                # Error responses
│   │
│   ├── rest-api/
│   │   ├── organizations.mdx             # Org endpoints
│   │   ├── projects.mdx                  # Project endpoints
│   │   ├── assets.mdx                    # Asset endpoints
│   │   ├── artifacts.mdx                 # Artifact endpoints
│   │   ├── vulnerabilities.mdx           # Vulnerability endpoints
│   │   ├── dependencies.mdx              # Dependency endpoints
│   │   ├── components.mdx                # Component endpoints
│   │   ├── scans.mdx                     # Scan endpoints
│   │   ├── sbom.mdx                      # SBOM endpoints
│   │   ├── vex.mdx                       # VEX endpoints
│   │   ├── csaf.mdx                      # CSAF endpoints
│   │   ├── attestations.mdx              # Attestation endpoints
│   │   ├── intoto.mdx                    # In-toto endpoints
│   │   ├── supply-chain.mdx              # Supply chain endpoints
│   │   ├── licenses.mdx                  # License endpoints
│   │   ├── policies.mdx                  # Policy endpoints
│   │   ├── webhooks.mdx                  # Webhook endpoints
│   │   ├── integrations.mdx              # Integration endpoints
│   │   ├── statistics.mdx                # Statistics endpoints
│   │   ├── dependency-proxy.mdx          # Proxy endpoints
│   │   └── users.mdx                     # User/member endpoints
│   │
│   └── openapi.mdx                       # OpenAPI spec viewer
│
├── cli/
│   ├── devguard-scanner/
│   │   ├── installation.mdx              # Scanner installation
│   │   ├── commands.mdx                  # Command reference
│   │   ├── sca.mdx                       # SCA command
│   │   ├── sast.mdx                      # SAST command
│   │   ├── container.mdx                 # Container scanning
│   │   ├── sbom.mdx                      # SBOM generation
│   │   ├── configuration.mdx             # Config options
│   │   └── exit-codes.mdx                # Exit codes
│   │
│   └── devguard-cli/
│       ├── installation.mdx              # CLI installation
│       ├── commands.mdx                  # Command reference
│       ├── vulndb.mdx                    # VulnDB commands
│       ├── daemon.mdx                    # Daemon commands
│       ├── licenses.mdx                  # License commands
│       └── configuration.mdx             # CLI config
│
├── ci-cd-workflows/
│   ├── github-actions/
│   │   ├── overview.mdx                  # GitHub Actions overview
│   │   ├── full-workflow.mdx             # Complete security scan
│   │   ├── sca.mdx                       # SCA workflow
│   │   ├── sast.mdx                      # SAST workflow
│   │   ├── secret-scanning.mdx           # Secret scanning workflow
│   │   ├── container-scanning.mdx        # Container scanning workflow
│   │   ├── iac.mdx                       # IaC scanning workflow
│   │   ├── build-image.mdx               # Image building workflow
│   │   ├── deploy.mdx                    # Deployment workflow
│   │   ├── sign.mdx                      # Signing workflow
│   │   ├── attest.mdx                    # Attestation workflow
│   │   ├── code-risk.mdx                 # Code risk workflow
│   │   ├── dependency-risk.mdx           # Dependency risk workflow
│   │   ├── inputs-outputs.mdx            # All inputs/outputs
│   │   └── secrets.mdx                   # Secrets configuration
│   │
│   └── gitlab-components/
│       ├── overview.mdx                  # GitLab components overview
│       ├── component-vs-remote.mdx       # Component vs remote syntax
│       ├── full.mdx                      # Full pipeline component
│       ├── secret-scanning.mdx           # Secret scanning component
│       ├── sast.mdx                      # SAST component
│       ├── iac-scanning.mdx              # IaC component
│       ├── sca.mdx                       # SCA component
│       ├── container-scanning.mdx        # Container scanning component
│       ├── build-oci-image.mdx           # Kaniko build
│       ├── build-oci-image-docker.mdx    # Docker build
│       ├── push-oci-image.mdx            # Push component
│       ├── sign-oci-image.mdx            # Cosign signing
│       ├── attest.mdx                    # Attestation component
│       ├── container-lifecycle.mdx       # Complete lifecycle
│       ├── base-image-inspection.mdx     # Extended lifecycle
│       ├── discover-baseimage.mdx        # Base image attestations
│       ├── sbom-upload.mdx               # SBOM upload
│       ├── vex-upload.mdx                # VEX upload
│       ├── sarif-upload.mdx              # SARIF upload
│       ├── generate-tag.mdx              # Tag generation
│       ├── container-scan-attest.mdx     # Combined scan+attest
│       ├── inputs-variables.mdx          # All inputs/variables
│       └── self-hosted-gitlab.mdx        # Self-hosted setup
│
├── configuration/
│   ├── environment-variables.mdx         # All env vars
│   ├── database-config.mdx               # Database setup
│   ├── authentication-config.mdx         # Auth providers (Kratos)
│   ├── storage-config.mdx                # File storage
│   ├── integration-config.mdx            # Integration settings
│   ├── security-config.mdx               # Security settings
│   └── feature-flags.mdx                 # Feature toggles
│
├── data-models/
│   ├── organization.mdx                  # Organization model
│   ├── project.mdx                       # Project model
│   ├── asset.mdx                         # Asset model
│   ├── asset-version.mdx                 # AssetVersion model
│   ├── artifact.mdx                      # Artifact model
│   ├── vulnerability.mdx                 # Vulnerability base
│   ├── dependency-vuln.mdx               # DependencyVuln model
│   ├── first-party-vuln.mdx              # FirstPartyVuln model
│   ├── license-risk.mdx                  # LicenseRisk model
│   ├── component.mdx                     # Component model
│   ├── vuln-event.mdx                    # VulnEvent model
│   ├── attestation.mdx                   # Attestation model
│   ├── intoto-link.mdx                   # InTotoLink model
│   ├── supply-chain.mdx                  # SupplyChain model
│   └── affected-component.mdx            # AffectedComponent model
│
├── vulnerability-database/
│   ├── data-sources.mdx                  # OSV, NVD, etc.
│   ├── malicious-packages.mdx            # OSSF DB
│   ├── cve-enrichment.mdx                # CVE data
│   ├── exploitability-data.mdx           # EPSS/KEV
│   └── update-schedule.mdx               # DB sync
│
├── compliance-frameworks/
│   ├── cyber-resilience-act.mdx          # EU CRA
│   ├── iso-27001.mdx                     # ISO 27001
│   ├── csaf-vex.mdx                      # CSAF/VEX spec
│   ├── cyclonedx.mdx                     # CycloneDX
│   ├── spdx.mdx                          # SPDX
│   ├── in-toto.mdx                       # In-toto spec
│   └── sarif.mdx                         # SARIF format
│
└── metrics/
    ├── prometheus-metrics.mdx            # All Prometheus metrics
    ├── custom-metrics.mdx                # Custom metrics
    └── monitoring-setup.mdx              # Monitoring guide
```

---

### 5. Explanation (Rename from concepts)
**Goal**: Understand why and how things work

```
/explanation/
├── index.mdx                             # Explanation overview
│
├── core-concepts/
│   ├── what-is-devguard.mdx             # Core mission
│   ├── organizations-projects-assets.mdx # Hierarchy
│   ├── asset-versions.mdx                # Branching model
│   ├── artifacts.mdx                     # Artifact concept
│   ├── vulnerability-types.mdx           # Dependency vs. first-party
│   ├── risk-scoring.mdx                  # Risk calculation
│   └── sbom-vex-relationship.mdx         # SBOM vs VEX
│
├── architecture/
│   ├── system-overview.mdx               # High-level architecture (DIAGRAM)
│   ├── data-flow.mdx                     # Data flow (DIAGRAM)
│   ├── security-model.mdx                # Security architecture (DIAGRAM)
│   ├── database-schema.mdx               # Database design
│   ├── authentication-flow.mdx           # Auth (Kratos integration)
│   ├── scanner-architecture.mdx          # Scanner design
│   └── scalability.mdx                   # Horizontal scaling
│
├── vulnerability-management/
│   ├── vulnerability-lifecycle.mdx       # Vuln states
│   ├── risk-assessment-methodology.mdx   # CIA + EPSS + CVSS
│   ├── mitigation-strategies.mdx         # How to mitigate
│   ├── false-positive-detection.mdx      # Why false positives
│   ├── vulnerability-events.mdx          # Event system
│   └── external-vuln-sync.mdx            # Third-party sync
│
├── dependency-management/
│
├── ci-cd-integration/
│   ├── overview.mdx                      # CI/CD integration overview
│   ├── github-actions-architecture.mdx   # How GitHub Actions workflows integrate
│   ├── gitlab-components-architecture.mdx # How GitLab components integrate
│   ├── authentication-flow.mdx           # API token authentication
│   ├── data-upload-mechanism.mdx         # How scans are uploaded
│   ├── risk-based-failures.mdx           # fail-on-risk and fail-on-cvss
│   ├── multi-artifact-handling.mdx       # Multiple artifacts in one pipeline
│   ├── container-lifecycle-flow.mdx      # Build → Scan → Sign → Attest → Deploy
│   ├── base-image-attestations.mdx       # Base image attestation discovery
│   └── supply-chain-verification.mdx     # Cosign + In-toto integration
│   ├── dependency-resolution.mdx         # How deps are resolved
│   ├── dependency-graph.mdx              # Graph visualization
│   ├── transitive-dependencies.mdx       # Direct vs transitive
│   ├── version-matching.mdx              # Semver matching
│   └── package-ecosystems.mdx            # npm, PyPI, Go, Maven, etc.
│
├── license-management/
│   ├── license-detection.mdx             # How licenses are detected
│   ├── license-compatibility.mdx         # OSI licenses
│   ├── license-risk-scoring.mdx          # Risk assessment
│   └── license-compliance.mdx            # Legal compliance
│
├── supply-chain-security/
│   ├── what-is-supply-chain-security.mdx # Overview
│   ├── in-toto-framework.mdx             # In-toto explained
│   ├── attestations.mdx                  # Attestation types
│   ├── supply-chain-verification.mdx     # Verification process
│   ├── slsa-framework.mdx                # SLSA levels
│   └── provenance-tracking.mdx           # Build provenance
│
├── compliance/
│   ├── why-compliance-matters.mdx        # Business case
│   ├── cyber-resilience-act.mdx          # EU CRA explained
│   ├── iso-27001-mapping.mdx             # ISO requirements
│   ├── csaf-vex-explained.mdx            # CSAF/VEX standards
│   ├── sbom-standards.mdx                # CycloneDX vs SPDX
│   └── audit-trails.mdx                  # Audit logging
│
├── security/
│   ├── dependency-proxy-security.mdx     # Proxy security model
│   ├── malicious-package-detection.mdx   # OSSF DB integration
│   ├── cache-integrity.mdx               # SHA256 verification
│   ├── rbac-model.mdx                    # Casbin RBAC
│   ├── api-security.mdx                  # API security
│   └── secrets-management.mdx            # PAT handling
│
├── integrations/
│   ├── integration-architecture.mdx      # How integrations work
│   ├── github-integration.mdx            # GitHub App design
│   ├── gitlab-integration.mdx            # GitLab integration
│   ├── jira-integration.mdx              # Jira integration
│   ├── webhook-system.mdx                # Webhook design
│   └── external-entity-providers.mdx     # External auth
│
└── advanced-topics/
    ├── daemon-pipeline.mdx               # Background jobs
    ├── open-source-insights.mdx          # Google OSI integration
    ├── fixed-version-detection.mdx       # Auto-fix detection
    ├── statistics-calculation.mdx        # Risk history
    ├── multi-tenancy.mdx                 # Org isolation
    └── performance-optimization.mdx      # Scaling tips
```

---

### 6. Troubleshooting (NEW)
**Goal**: Solve common problems quickly

```
/troubleshooting/
├── index.mdx                             # Troubleshooting guide
│
├── installation/
│   ├── docker-compose-issues.mdx
│   ├── kubernetes-issues.mdx
│   ├── database-connection.mdx
│   └── network-issues.mdx
│
├── scanning/
│   ├── scanner-not-detecting-deps.mdx
│   ├── false-negatives.mdx
│   ├── scan-timeout.mdx
│   └── unsupported-languages.mdx
│
├── integrations/
│   ├── github-webhook-failures.mdx
│   ├── gitlab-sync-issues.mdx
│   ├── jira-connection-errors.mdx
│   └── permission-sync-problems.mdx
│
├── dependency-proxy/
│   ├── proxy-not-caching.mdx
│   ├── malicious-package-false-positive.mdx
│   ├── package-download-failures.mdx
│   └── cache-corruption.mdx
│
├── api-errors/
│   ├── authentication-failures.mdx
│   ├── 403-forbidden-errors.mdx
│   ├── 500-internal-errors.mdx
│   └── rate-limiting.mdx
│
└── common-issues/
    ├── slow-performance.mdx
    ├── high-memory-usage.mdx
    ├── disk-space-issues.mdx
    └── debugging-guide.mdx
```

---

### 7. Comparison (Keep Existing)
```
/comparison/
├── index.mdx
├── vs-snyk.mdx
├── vs-dependabot.mdx
├── vs-grype.mdx
└── feature-matrix.mdx
```

---

### 8. Changelog (NEW)
```
/changelog/
├── index.mdx                    # Latest releases
├── v2.0.0.mdx                   # Major versions
├── v1.5.0.mdx
├── v1.4.0.mdx
└── migration-guides/
    ├── v1-to-v2.mdx
    └── v0-to-v1.mdx
```

---

### 9. Contributing (Keep Existing)
```
/contributing/
├── index.mdx
├── code-of-conduct.mdx
├── development-setup.mdx
├── coding-standards.mdx
├── testing-guide.mdx
└── pull-request-process.mdx
```

---

### 10. FAQ (Keep Existing)
```
/faq/
├── index.mdx
├── general.mdx
├── licensing.mdx
├── security.mdx
├── integrations.mdx
└── compliance.mdx
```

## EXAMPLES & CODE SAMPLES

Create `/examples/` directory with:
```
/examples/
/examples/
├── github-actions/
│   ├── basic-scan.yml
│   ├── multi-project.yml
│   ├── sbom-generation.yml
│   ├── full-devguard-scan.yml
│   ├── sca-only.yml
│   ├── container-lifecycle.yml
│   ├── multi-artifact-build.yml
│   └── custom-workflow.yml
│
├── gitlab-ci/
│   ├── .gitlab-ci.yml
│   ├── multi-stage.yml
│   ├── full-component.yml
│   ├── secret-scanning-only.yml
│   ├── container-lifecycle.yml
│   ├── multi-image-build.yml
│   └── self-hosted-gitlab.yml
│
├── docker-compose/
│   ├── simple-setup.yml
│   └── production.yml
│
├── kubernetes/
│   ├── deployment.yaml
│   ├── ingress.yaml
│   └── secrets.yaml
│
├── api-clients/
│   ├── python/
│   ├── javascript/
│   ├── go/
│   └── curl/
│
└── policies/
    ├── compliance/
    └── attestation/
```

---

## CONTENT TEMPLATES

Create templates for:
- Tutorial page (step-by-step)
- How-to guide (task-focused)
- API endpoint (OpenAPI)
- CLI command reference
- Concept explanation
- Troubleshooting issue
