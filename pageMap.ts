import type { PageMapItem } from "@document-writing-tools/kernux-theme";

export const pageMap: PageMapItem[] = [
  {
    "name": "404",
    "route": "/404",
    "frontMatter": {
      "disableToc": true
    }
  },
  {
    "name": "api",
    "route": "/api",
    "children": [
      {
        "name": "cve",
        "route": "/api/cve",
        "children": []
      },
      {
        "name": "vulndb",
        "route": "/api/vulndb",
        "children": [
          {
            "name": "purl-inspect",
            "route": "/api/vulndb/purl-inspect",
            "children": []
          }
        ]
      }
    ]
  },
  {
    "name": "comparison",
    "route": "/comparison",
    "children": [
      {
        "name": "aboutcode",
        "route": "/comparison/aboutcode",
        "frontMatter": {}
      },
      {
        "name": "index",
        "route": "/comparison",
        "frontMatter": {}
      }
    ]
  },
  {
    "name": "contributing",
    "route": "/contributing",
    "children": [
      {
        "name": "code-of-conduct",
        "route": "/contributing/code-of-conduct",
        "frontMatter": {
          "sidebar_position": 3
        }
      },
      {
        "name": "getting-started",
        "route": "/contributing/getting-started",
        "frontMatter": {
          "sidebar_position": 1
        }
      },
      {
        "name": "roadmap",
        "route": "/contributing/roadmap",
        "frontMatter": {
          "sidebar_position": 2,
          "title": "Projects Roadmap",
          "description": "DevGuard's roadmap and upcoming features."
        }
      }
    ]
  },
  {
    "name": "explanations",
    "route": "/explanations",
    "children": [
      {
        "name": "advanced-topics",
        "route": "/explanations/advanced-topics",
        "children": [
          {
            "name": "daemon-pipeline",
            "route": "/explanations/advanced-topics/daemon-pipeline",
            "frontMatter": {}
          },
          {
            "name": "fixed-version-detection",
            "route": "/explanations/advanced-topics/fixed-version-detection",
            "frontMatter": {}
          },
          {
            "name": "multi-tenancy",
            "route": "/explanations/advanced-topics/multi-tenancy",
            "frontMatter": {}
          },
          {
            "name": "open-source-insights",
            "route": "/explanations/advanced-topics/open-source-insights",
            "frontMatter": {}
          },
          {
            "name": "performance-optimization",
            "route": "/explanations/advanced-topics/performance-optimization",
            "frontMatter": {}
          },
          {
            "name": "statistics-calculation",
            "route": "/explanations/advanced-topics/statistics-calculation",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "architecture",
        "route": "/explanations/architecture",
        "children": [
          {
            "name": "authentication-flow",
            "route": "/explanations/architecture/authentication-flow",
            "frontMatter": {}
          },
          {
            "name": "data-flow",
            "route": "/explanations/architecture/data-flow",
            "frontMatter": {}
          },
          {
            "name": "database-schema",
            "route": "/explanations/architecture/database-schema",
            "frontMatter": {}
          },
          {
            "name": "scalability",
            "route": "/explanations/architecture/scalability",
            "frontMatter": {}
          },
          {
            "name": "scanner-architecture",
            "route": "/explanations/architecture/scanner-architecture",
            "frontMatter": {}
          },
          {
            "name": "security-model",
            "route": "/explanations/architecture/security-model",
            "frontMatter": {}
          },
          {
            "name": "system-overview",
            "route": "/explanations/architecture/system-overview",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "attestations-provenance",
        "route": "/explanations/attestations-provenance",
        "children": [
          {
            "name": "index",
            "route": "/explanations/attestations-provenance",
            "frontMatter": {}
          },
          {
            "name": "slsa-level-3",
            "route": "/explanations/attestations-provenance/slsa-level-3",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "compliance",
        "route": "/explanations/compliance",
        "children": [
          {
            "name": "audit-trails",
            "route": "/explanations/compliance/audit-trails",
            "frontMatter": {}
          },
          {
            "name": "compliance-as-code",
            "route": "/explanations/compliance/compliance-as-code",
            "frontMatter": {}
          },
          {
            "name": "csaf-vex-explained",
            "route": "/explanations/compliance/csaf-vex-explained",
            "frontMatter": {}
          },
          {
            "name": "cyber-resilience-act",
            "route": "/explanations/compliance/cyber-resilience-act",
            "frontMatter": {
              "sidebar_position": 1,
              "title": "Cyber Resilience Act"
            }
          },
          {
            "name": "iso-27001-mapping",
            "route": "/explanations/compliance/iso-27001-mapping",
            "frontMatter": {
              "sidebar_position": 1
            }
          },
          {
            "name": "sbom-standards",
            "route": "/explanations/compliance/sbom-standards",
            "frontMatter": {}
          },
          {
            "name": "why-compliance-matters",
            "route": "/explanations/compliance/why-compliance-matters",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "core-concepts",
        "route": "/explanations/core-concepts",
        "children": [
          {
            "name": "artifacts",
            "route": "/explanations/core-concepts/artifacts",
            "frontMatter": {}
          },
          {
            "name": "open-standards",
            "route": "/explanations/core-concepts/open-standards",
            "frontMatter": {}
          },
          {
            "name": "organization-groups-repos",
            "route": "/explanations/core-concepts/organization-groups-repos",
            "frontMatter": {}
          },
          {
            "name": "repository-versions",
            "route": "/explanations/core-concepts/repository-versions",
            "frontMatter": {}
          },
          {
            "name": "risk-scoring",
            "route": "/explanations/core-concepts/risk-scoring",
            "frontMatter": {}
          },
          {
            "name": "vulnerability-types",
            "route": "/explanations/core-concepts/vulnerability-types",
            "frontMatter": {}
          },
          {
            "name": "what-is-devguard",
            "route": "/explanations/core-concepts/what-is-devguard",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "devsecops",
        "route": "/explanations/devsecops",
        "children": [
          {
            "name": "container-scanning",
            "route": "/explanations/devsecops/container-scanning",
            "frontMatter": {
              "sidebar_position": 6,
              "title": "Container Scanning"
            }
          },
          {
            "name": "dast",
            "route": "/explanations/devsecops/dast",
            "frontMatter": {
              "sidebar_position": 3,
              "title": "Dynamic Application Security Testing (DAST)"
            }
          },
          {
            "name": "iac",
            "route": "/explanations/devsecops/iac",
            "frontMatter": {
              "sidebar_position": 4,
              "title": "Infrastructure as Code (IaC)"
            }
          },
          {
            "name": "sast",
            "route": "/explanations/devsecops/sast",
            "frontMatter": {
              "sidebar_position": 2,
              "title": "Static Application Security Testing (SAST)"
            }
          },
          {
            "name": "secret-scanning",
            "route": "/explanations/devsecops/secret-scanning",
            "frontMatter": {
              "sidebar_position": 1,
              "title": "Secret Scanning"
            }
          },
          {
            "name": "software-composition-analysis",
            "route": "/explanations/devsecops/software-composition-analysis",
            "frontMatter": {
              "sidebar_position": 5,
              "title": "Software Composition Analysis (SCA)"
            }
          },
          {
            "name": "understanding-owasp-devsecops-pipeline",
            "route": "/explanations/devsecops/understanding-owasp-devsecops-pipeline",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "explaining-sboms",
        "route": "/explanations/explaining-sboms",
        "frontMatter": {}
      },
      {
        "name": "index",
        "route": "/explanations",
        "frontMatter": {
          "sidebar_position": 1
        }
      },
      {
        "name": "integrations",
        "route": "/explanations/integrations",
        "children": [
          {
            "name": "external-entity-providers",
            "route": "/explanations/integrations/external-entity-providers",
            "frontMatter": {}
          },
          {
            "name": "github-integration",
            "route": "/explanations/integrations/github-integration",
            "frontMatter": {}
          },
          {
            "name": "gitlab-integration",
            "route": "/explanations/integrations/gitlab-integration",
            "frontMatter": {}
          },
          {
            "name": "integration-architecture",
            "route": "/explanations/integrations/integration-architecture",
            "frontMatter": {}
          },
          {
            "name": "jira-integration",
            "route": "/explanations/integrations/jira-integration",
            "frontMatter": {}
          },
          {
            "name": "webhook-system",
            "route": "/explanations/integrations/webhook-system",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "license-management",
        "route": "/explanations/license-management",
        "children": [
          {
            "name": "license-compliance",
            "route": "/explanations/license-management/license-compliance",
            "frontMatter": {}
          },
          {
            "name": "license-detection",
            "route": "/explanations/license-management/license-detection",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "personal-access-token",
        "route": "/explanations/personal-access-token",
        "frontMatter": {}
      },
      {
        "name": "sbom-problem-statement",
        "route": "/explanations/sbom-problem-statement",
        "frontMatter": {}
      },
      {
        "name": "security",
        "route": "/explanations/security",
        "children": [
          {
            "name": "api-security",
            "route": "/explanations/security/api-security",
            "frontMatter": {}
          },
          {
            "name": "cache-integrity",
            "route": "/explanations/security/cache-integrity",
            "frontMatter": {}
          },
          {
            "name": "dependency-proxy-security",
            "route": "/explanations/security/dependency-proxy-security",
            "frontMatter": {}
          },
          {
            "name": "malicious-package-detection",
            "route": "/explanations/security/malicious-package-detection",
            "frontMatter": {}
          },
          {
            "name": "rbac-model",
            "route": "/explanations/security/rbac-model",
            "frontMatter": {}
          },
          {
            "name": "secrets-management",
            "route": "/explanations/security/secrets-management",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "supply-chain-security",
        "route": "/explanations/supply-chain-security",
        "children": [
          {
            "name": "attestations",
            "route": "/explanations/supply-chain-security/attestations",
            "frontMatter": {}
          },
          {
            "name": "in-toto-framework",
            "route": "/explanations/supply-chain-security/in-toto-framework",
            "frontMatter": {}
          },
          {
            "name": "provenance-tracking",
            "route": "/explanations/supply-chain-security/provenance-tracking",
            "frontMatter": {}
          },
          {
            "name": "slsa-framework",
            "route": "/explanations/supply-chain-security/slsa-framework",
            "frontMatter": {}
          },
          {
            "name": "supply-chain-verification",
            "route": "/explanations/supply-chain-security/supply-chain-verification",
            "frontMatter": {}
          },
          {
            "name": "what-is-supply-chain-security",
            "route": "/explanations/supply-chain-security/what-is-supply-chain-security",
            "frontMatter": {
              "title": "What is supply chain security?",
              "description": "Learn what supply chain security means for software development, which threats exist, and how to mitigate risks in your software lifecycle."
            }
          }
        ]
      },
      {
        "name": "vulnerability-management",
        "route": "/explanations/vulnerability-management",
        "children": [
          {
            "name": "external-vuln-sync",
            "route": "/explanations/vulnerability-management/external-vuln-sync",
            "frontMatter": {}
          },
          {
            "name": "false-positive-detection",
            "route": "/explanations/vulnerability-management/false-positive-detection",
            "frontMatter": {}
          },
          {
            "name": "mitigation-strategies",
            "route": "/explanations/vulnerability-management/mitigation-strategies",
            "frontMatter": {}
          },
          {
            "name": "risk-assessment-methodology",
            "route": "/explanations/vulnerability-management/risk-assessment-methodology",
            "frontMatter": {}
          },
          {
            "name": "vulnerability-events",
            "route": "/explanations/vulnerability-management/vulnerability-events",
            "frontMatter": {}
          },
          {
            "name": "vulnerability-lifecycle",
            "route": "/explanations/vulnerability-management/vulnerability-lifecycle",
            "frontMatter": {}
          },
          {
            "name": "vulnerability-matching",
            "route": "/explanations/vulnerability-management/vulnerability-matching",
            "frontMatter": {
              "title": "Vulnerability Matching",
              "description": "How DevGuard matches SBOM components against the vulnerability database to find dependency vulnerabilities."
            }
          }
        ]
      }
    ]
  },
  {
    "name": "getting-started",
    "route": "/getting-started",
    "children": [
      {
        "name": "choose-your-path",
        "route": "/getting-started/choose-your-path",
        "children": [
          {
            "name": "for-compliance-officers",
            "route": "/getting-started/choose-your-path/for-compliance-officers",
            "frontMatter": {}
          },
          {
            "name": "for-developers",
            "route": "/getting-started/choose-your-path/for-developers",
            "frontMatter": {}
          },
          {
            "name": "for-devops",
            "route": "/getting-started/choose-your-path/for-devops",
            "frontMatter": {}
          },
          {
            "name": "for-security-teams",
            "route": "/getting-started/choose-your-path/for-security-teams",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "first-scan",
        "route": "/getting-started/first-scan",
        "frontMatter": {
          "title": "Your First Scan",
          "description": "Run a dependency scan against your project and view results in DevGuard"
        }
      },
      {
        "name": "index",
        "route": "/getting-started",
        "frontMatter": {
          "title": "Quick Start Guide",
          "description": "Run your first DevGuard security scan in under 5 minutes",
          "difficulty": "beginner",
          "readingTime": 5,
          "lastUpdated": "2025-12-21T00:00:00.000Z",
          "tags": [
            "getting-started",
            "quickstart",
            "tutorial"
          ]
        }
      },
      {
        "name": "installation",
        "route": "/getting-started/installation",
        "frontMatter": {
          "title": "Installation Guide",
          "description": "Complete installation guide for DevGuard scanner and platform",
          "difficulty": "beginner",
          "readingTime": 10,
          "lastUpdated": "2025-12-21T00:00:00.000Z",
          "tags": [
            "getting-started",
            "installation"
          ]
        }
      },
      {
        "name": "key-concepts",
        "route": "/getting-started/key-concepts",
        "frontMatter": {}
      }
    ]
  },
  {
    "name": "how-to-guides",
    "route": "/how-to-guides",
    "children": [
      {
        "name": "administration",
        "route": "/how-to-guides/administration",
        "children": [
          {
            "name": "backup-restore",
            "route": "/how-to-guides/administration/backup-restore",
            "frontMatter": {}
          },
          {
            "name": "customize-ui",
            "route": "/how-to-guides/administration/customize-ui",
            "frontMatter": {}
          },
          {
            "name": "database-maintenance",
            "route": "/how-to-guides/administration/database-maintenance",
            "frontMatter": {}
          },
          {
            "name": "deploy-with-docker",
            "route": "/how-to-guides/administration/deploy-with-docker",
            "frontMatter": {}
          },
          {
            "name": "deploy-with-helm",
            "route": "/how-to-guides/administration/deploy-with-helm",
            "frontMatter": {}
          },
          {
            "name": "index",
            "route": "/how-to-guides/administration",
            "frontMatter": {}
          },
          {
            "name": "monitoring-metrics",
            "route": "/how-to-guides/administration/monitoring-metrics",
            "frontMatter": {}
          },
          {
            "name": "restricting-access",
            "route": "/how-to-guides/administration/restricting-access",
            "frontMatter": {}
          },
          {
            "name": "uninstalling-devguard",
            "route": "/how-to-guides/administration/uninstalling-devguard",
            "frontMatter": {}
          },
          {
            "name": "upgrade-devguard",
            "route": "/how-to-guides/administration/upgrade-devguard",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "api-usage",
        "route": "/how-to-guides/api-usage",
        "children": [
          {
            "name": "authenticate-with-api",
            "route": "/how-to-guides/api-usage/authenticate-with-api",
            "frontMatter": {}
          },
          {
            "name": "manage-assets-via-api",
            "route": "/how-to-guides/api-usage/manage-assets-via-api",
            "frontMatter": {}
          },
          {
            "name": "query-vulnerabilities",
            "route": "/how-to-guides/api-usage/query-vulnerabilities",
            "frontMatter": {}
          },
          {
            "name": "upload-scan-results",
            "route": "/how-to-guides/api-usage/upload-scan-results",
            "frontMatter": {}
          },
          {
            "name": "webhooks-api",
            "route": "/how-to-guides/api-usage/webhooks-api",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "compliance",
        "route": "/how-to-guides/compliance",
        "children": [
          {
            "name": "attestation-policies",
            "route": "/how-to-guides/compliance/attestation-policies",
            "frontMatter": {
              "title": "Manage Compliance & Attestation Policies",
              "description": "Create compliance-as-code policies, monitor compliance dashboards, and track policy violations across your organization"
            }
          },
          {
            "name": "audit-logs",
            "route": "/how-to-guides/compliance/audit-logs",
            "frontMatter": {
              "title": "View Vulnerability Event History",
              "description": "Track vulnerability decisions and compliance actions through event timelines"
            }
          },
          {
            "name": "compliance-dashboards",
            "route": "/how-to-guides/compliance/compliance-dashboards",
            "frontMatter": {
              "title": "View Compliance Dashboards",
              "description": "Monitor compliance control status and track policy violations across your organization"
            }
          },
          {
            "name": "export-sbom",
            "route": "/how-to-guides/compliance/export-sbom",
            "frontMatter": {
              "title": "Export SBOM Documents",
              "description": "Download and manage Software Bill of Materials for your components"
            }
          },
          {
            "name": "generate-csaf-reports",
            "route": "/how-to-guides/compliance/generate-csaf-reports",
            "frontMatter": {
              "title": "Generate CSAF Reports",
              "description": "Create Common Security Advisory Framework reports for vulnerability disclosure"
            }
          },
          {
            "name": "generate-vex-documents",
            "route": "/how-to-guides/compliance/generate-vex-documents",
            "frontMatter": {
              "title": "Generate VEX Documents",
              "description": "Create Vulnerability Exploitability Exchange documents for vulnerability statements"
            }
          }
        ]
      },
      {
        "name": "dependency-management",
        "route": "/how-to-guides/dependency-management",
        "children": [
          {
            "name": "component-search",
            "route": "/how-to-guides/dependency-management/component-search",
            "frontMatter": {
              "title": "Search for Components",
              "description": "Find and analyze component usage across your repositories"
            }
          },
          {
            "name": "find-vulnerable-deps",
            "route": "/how-to-guides/dependency-management/find-vulnerable-deps",
            "frontMatter": {
              "title": "Find Vulnerable Dependencies",
              "description": "Search and filter dependencies with known security vulnerabilities"
            }
          },
          {
            "name": "license-compliance",
            "route": "/how-to-guides/dependency-management/license-compliance",
            "frontMatter": {
              "title": "Manage License Compliance",
              "description": "Monitor and track component licenses for compliance requirements"
            }
          },
          {
            "name": "override-license-decisions",
            "route": "/how-to-guides/dependency-management/override-license-decisions",
            "frontMatter": {
              "title": "Override License Decisions",
              "description": "Correct or replace detected component licenses"
            }
          },
          {
            "name": "view-dependency-tree",
            "route": "/how-to-guides/dependency-management/view-dependency-tree",
            "frontMatter": {
              "title": "View Dependency Tree",
              "description": "Explore and analyze your application's dependency tree to understand component relationships and identify vulnerable dependencies"
            }
          }
        ]
      },
      {
        "name": "index",
        "route": "/how-to-guides",
        "frontMatter": {}
      },
      {
        "name": "integrations",
        "route": "/how-to-guides/integrations",
        "children": [
          {
            "name": "create-webhook",
            "route": "/how-to-guides/integrations/create-webhook",
            "frontMatter": {}
          },
          {
            "name": "custom-webhooks",
            "route": "/how-to-guides/integrations/custom-webhooks",
            "frontMatter": {}
          },
          {
            "name": "github",
            "route": "/how-to-guides/integrations/github",
            "children": [
              {
                "name": "auto-setup",
                "route": "/how-to-guides/integrations/github/auto-setup",
                "frontMatter": {}
              },
              {
                "name": "permission-sync",
                "route": "/how-to-guides/integrations/github/permission-sync",
                "frontMatter": {}
              },
              {
                "name": "setup-github-integration",
                "route": "/how-to-guides/integrations/github/setup-github-integration",
                "frontMatter": {
                  "sidebar_position": 3
                }
              },
              {
                "name": "webhooks",
                "route": "/how-to-guides/integrations/github/webhooks",
                "frontMatter": {}
              }
            ]
          },
          {
            "name": "gitlab",
            "route": "/how-to-guides/integrations/gitlab",
            "children": [
              {
                "name": "permission-sync",
                "route": "/how-to-guides/integrations/gitlab/permission-sync",
                "frontMatter": {}
              },
              {
                "name": "setup-gitlab-integration",
                "route": "/how-to-guides/integrations/gitlab/setup-gitlab-integration",
                "frontMatter": {
                  "sidebar_position": 2
                }
              },
              {
                "name": "webhooks",
                "route": "/how-to-guides/integrations/gitlab/webhooks",
                "frontMatter": {}
              }
            ]
          },
          {
            "name": "jira",
            "route": "/how-to-guides/integrations/jira",
            "children": [
              {
                "name": "connect-jira",
                "route": "/how-to-guides/integrations/jira/connect-jira",
                "frontMatter": {}
              },
              {
                "name": "issue-creation",
                "route": "/how-to-guides/integrations/jira/issue-creation",
                "frontMatter": {}
              },
              {
                "name": "sync-status",
                "route": "/how-to-guides/integrations/jira/sync-status",
                "frontMatter": {}
              }
            ]
          },
          {
            "name": "webhook-events",
            "route": "/how-to-guides/integrations/webhook-events",
            "frontMatter": {}
          },
          {
            "name": "webhook-security",
            "route": "/how-to-guides/integrations/webhook-security",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "scanning",
        "route": "/how-to-guides/scanning",
        "children": [
          {
            "name": "scan-dependencies",
            "route": "/how-to-guides/scanning/scan-dependencies",
            "frontMatter": {
              "title": "Scan Dependencies",
              "description": "Analyze project dependencies for vulnerabilities using Software Composition Analysis (SCA)"
            }
          },
          {
            "name": "scan-docker-images",
            "route": "/how-to-guides/scanning/scan-docker-images",
            "frontMatter": {
              "title": "Scan OCI Images",
              "description": "Scan container images for known vulnerabilities (CVEs) and generate SBOMs"
            }
          },
          {
            "name": "scan-source-code",
            "route": "/how-to-guides/scanning/scan-source-code",
            "frontMatter": {
              "title": "Scan Source Code",
              "description": "Run SAST, IaC and secret scanning on your source code to identify first-party vulnerabilities"
            }
          },
          {
            "name": "scan-with-github-actions",
            "route": "/how-to-guides/scanning/scan-with-github-actions",
            "frontMatter": {
              "title": "Scan with GitHub Actions",
              "description": "Integrate DevGuard scanning into your GitHub Actions CI/CD pipeline"
            }
          },
          {
            "name": "scan-with-gitlab-ci",
            "route": "/how-to-guides/scanning/scan-with-gitlab-ci",
            "frontMatter": {
              "title": "Scan with GitLab CI",
              "description": "Integrate DevGuard scanning into your GitLab CI/CD pipeline"
            }
          },
          {
            "name": "scheduled-scans",
            "route": "/how-to-guides/scanning/scheduled-scans",
            "frontMatter": {
              "title": "Scheduled Scans",
              "description": "Automate continuous security scanning and vulnerability updates with scheduled daemon tasks"
            }
          },
          {
            "name": "upload-sbom",
            "route": "/how-to-guides/scanning/upload-sbom",
            "frontMatter": {
              "title": "Upload SBOM",
              "description": "Upload existing Software Bill of Materials to DevGuard for vulnerability scanning"
            }
          },
          {
            "name": "upload-vex",
            "route": "/how-to-guides/scanning/upload-vex",
            "frontMatter": {
              "title": "Upload VEX",
              "description": "Upload Vulnerability Exploitability eXchange documents to DevGuard"
            }
          }
        ]
      },
      {
        "name": "security",
        "route": "/how-to-guides/security",
        "children": [
          {
            "name": "access-control",
            "route": "/how-to-guides/security/access-control",
            "children": [
              {
                "name": "api-tokens",
                "route": "/how-to-guides/security/access-control/api-tokens",
                "frontMatter": {
                  "title": "Create and Manage API Tokens",
                  "description": "Generate personal access tokens for programmatic API access and automation"
                }
              },
              {
                "name": "manage-users",
                "route": "/how-to-guides/security/access-control/manage-users",
                "frontMatter": {
                  "title": "Manage Users and Members",
                  "description": "Add, remove, and manage team members with role-based access control"
                }
              }
            ]
          },
          {
            "name": "dependency-proxy",
            "route": "/how-to-guides/security/dependency-proxy",
            "children": [
              {
                "name": "cache-management",
                "route": "/how-to-guides/security/dependency-proxy/cache-management",
                "frontMatter": {}
              },
              {
                "name": "malicious-package-blocking",
                "route": "/how-to-guides/security/dependency-proxy/malicious-package-blocking",
                "frontMatter": {}
              },
              {
                "name": "setup-go-proxy",
                "route": "/how-to-guides/security/dependency-proxy/setup-go-proxy",
                "frontMatter": {}
              },
              {
                "name": "setup-npm-proxy",
                "route": "/how-to-guides/security/dependency-proxy/setup-npm-proxy",
                "frontMatter": {}
              },
              {
                "name": "setup-pypi-proxy",
                "route": "/how-to-guides/security/dependency-proxy/setup-pypi-proxy",
                "frontMatter": {}
              }
            ]
          },
          {
            "name": "dependency-proxy",
            "route": "/how-to-guides/security/dependency-proxy",
            "frontMatter": {}
          },
          {
            "name": "supply-chain",
            "route": "/how-to-guides/security/supply-chain",
            "children": [
              {
                "name": "create-in-toto-links",
                "route": "/how-to-guides/security/supply-chain/create-in-toto-links",
                "frontMatter": {}
              },
              {
                "name": "manage-attestations",
                "route": "/how-to-guides/security/supply-chain/manage-attestations",
                "frontMatter": {}
              },
              {
                "name": "signing-artifacts",
                "route": "/how-to-guides/security/supply-chain/signing-artifacts",
                "frontMatter": {}
              },
              {
                "name": "verify-supply-chain",
                "route": "/how-to-guides/security/supply-chain/verify-supply-chain",
                "frontMatter": {}
              }
            ]
          }
        ]
      },
      {
        "name": "vexing",
        "route": "/how-to-guides/vexing",
        "children": [
          {
            "name": "vexing-debian-packages",
            "route": "/how-to-guides/vexing/vexing-debian-packages",
            "frontMatter": {
              "title": "Investigate CVE Findings in Debian Packages",
              "description": "A repeatable, evidence-based playbook for determining whether a CVE in a Debian package is a false positive or requires an accept-risk justification using binary analysis."
            }
          }
        ]
      },
      {
        "name": "vulnerability-management",
        "route": "/how-to-guides/vulnerability-management",
        "children": [
          {
            "name": "create-vuln-events",
            "route": "/how-to-guides/vulnerability-management/create-vuln-events",
            "frontMatter": {
              "title": "Create Vulnerability Events",
              "description": "Document vulnerability assessments and track actions taken on vulnerabilities using events"
            }
          },
          {
            "name": "csaf-common-security-advisory-framework",
            "route": "/how-to-guides/vulnerability-management/csaf-common-security-advisory-framework",
            "frontMatter": {}
          },
          {
            "name": "customize-risk-scores",
            "route": "/how-to-guides/vulnerability-management/customize-risk-scores",
            "frontMatter": {
              "title": "Customize Risk Scores",
              "description": "Adjust vulnerability risk calculations based on your asset's operational context using CIA requirements"
            }
          },
          {
            "name": "sync-external-data",
            "route": "/how-to-guides/vulnerability-management/sync-external-data",
            "frontMatter": {}
          },
          {
            "name": "track-fix-progress",
            "route": "/how-to-guides/vulnerability-management/track-fix-progress",
            "frontMatter": {
              "title": "Track Fix Progress",
              "description": "Monitor the remediation journey of vulnerabilities from discovery to resolution using DevGuard's tracking capabilities."
            }
          }
        ]
      }
    ]
  },
  {
    "name": "index",
    "route": "/",
    "frontMatter": {
      "sidebar_position": 1,
      "title": "Introduction"
    }
  },
  {
    "name": "other",
    "route": "/other",
    "children": [
      {
        "name": "acknowledgements",
        "route": "/other/acknowledgements",
        "frontMatter": {}
      },
      {
        "name": "index",
        "route": "/other",
        "frontMatter": {}
      },
      {
        "name": "sponsors-partners",
        "route": "/other/sponsors-partners",
        "frontMatter": {
          "sidebar_position": 2,
          "title": "Sponsors & Partners"
        }
      }
    ]
  },
  {
    "name": "package-inspector",
    "route": "/package-inspector",
    "children": [
      {
        "name": "[purl]",
        "route": "/package-inspector/[purl]",
        "frontMatter": {
          "disableToc": true
        }
      }
    ]
  },
  {
    "name": "package-inspector",
    "route": "/package-inspector",
    "frontMatter": {
      "title": "Package Inspector",
      "description": "Analyze the security state of open-source packages. Get insights on maintenance, vulnerabilities, and supply chain risks.",
      "disableToc": true
    }
  },
  {
    "name": "privacy-policy",
    "route": "/privacy-policy",
    "frontMatter": {}
  },
  {
    "name": "reference",
    "route": "/reference",
    "children": [
      {
        "name": "github-workflows",
        "route": "/reference/github-workflows",
        "children": [
          {
            "name": "build-image",
            "route": "/reference/github-workflows/build-image",
            "frontMatter": {}
          },
          {
            "name": "code-risk-identification",
            "route": "/reference/github-workflows/code-risk-identification",
            "frontMatter": {}
          },
          {
            "name": "container-scanning",
            "route": "/reference/github-workflows/container-scanning",
            "frontMatter": {}
          },
          {
            "name": "dependency-risk-identification",
            "route": "/reference/github-workflows/dependency-risk-identification",
            "frontMatter": {}
          },
          {
            "name": "deploy",
            "route": "/reference/github-workflows/deploy",
            "frontMatter": {}
          },
          {
            "name": "full-scan",
            "route": "/reference/github-workflows/full-scan",
            "frontMatter": {}
          },
          {
            "name": "iac",
            "route": "/reference/github-workflows/iac",
            "frontMatter": {}
          },
          {
            "name": "sast",
            "route": "/reference/github-workflows/sast",
            "frontMatter": {}
          },
          {
            "name": "sca",
            "route": "/reference/github-workflows/sca",
            "frontMatter": {}
          },
          {
            "name": "secret-scanning",
            "route": "/reference/github-workflows/secret-scanning",
            "frontMatter": {}
          },
          {
            "name": "sign",
            "route": "/reference/github-workflows/sign",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "gitlab-components",
        "route": "/reference/gitlab-components",
        "children": [
          {
            "name": "build-image",
            "route": "/reference/gitlab-components/build-image",
            "frontMatter": {}
          },
          {
            "name": "code-risk-identification",
            "route": "/reference/gitlab-components/code-risk-identification",
            "frontMatter": {}
          },
          {
            "name": "container-scanning",
            "route": "/reference/gitlab-components/container-scanning",
            "frontMatter": {}
          },
          {
            "name": "dependency-risk-identification",
            "route": "/reference/gitlab-components/dependency-risk-identification",
            "frontMatter": {}
          },
          {
            "name": "deploy",
            "route": "/reference/gitlab-components/deploy",
            "frontMatter": {}
          },
          {
            "name": "full-scan",
            "route": "/reference/gitlab-components/full-scan",
            "frontMatter": {}
          },
          {
            "name": "iac",
            "route": "/reference/gitlab-components/iac",
            "frontMatter": {}
          },
          {
            "name": "sast",
            "route": "/reference/gitlab-components/sast",
            "frontMatter": {
              "title": "SAST Gitlab Component",
              "description": "Configure the DevGuard SAST GitLab component to scan source code for vulnerabilities. See all available inputs, defaults, and usage examples."
            }
          },
          {
            "name": "sca",
            "route": "/reference/gitlab-components/sca",
            "frontMatter": {}
          },
          {
            "name": "secret-scanning",
            "route": "/reference/gitlab-components/secret-scanning",
            "frontMatter": {}
          },
          {
            "name": "sign",
            "route": "/reference/gitlab-components/sign",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "index",
        "route": "/reference",
        "frontMatter": {}
      },
      {
        "name": "scanner",
        "route": "/reference/scanner",
        "children": [
          {
            "name": "attest",
            "route": "/reference/scanner/attest",
            "frontMatter": {}
          },
          {
            "name": "attestations",
            "route": "/reference/scanner/attestations",
            "frontMatter": {}
          },
          {
            "name": "clean",
            "route": "/reference/scanner/clean",
            "frontMatter": {}
          },
          {
            "name": "container-scanning",
            "route": "/reference/scanner/container-scanning",
            "frontMatter": {}
          },
          {
            "name": "curl",
            "route": "/reference/scanner/curl",
            "frontMatter": {}
          },
          {
            "name": "devguard-scanner",
            "route": "/reference/scanner/devguard-scanner",
            "frontMatter": {}
          },
          {
            "name": "discover-baseimage-attestations",
            "route": "/reference/scanner/discover-baseimage-attestations",
            "frontMatter": {}
          },
          {
            "name": "fetch-links",
            "route": "/reference/scanner/fetch-links",
            "frontMatter": {}
          },
          {
            "name": "generate-tag",
            "route": "/reference/scanner/generate-tag",
            "frontMatter": {}
          },
          {
            "name": "get",
            "route": "/reference/scanner/get",
            "frontMatter": {}
          },
          {
            "name": "help",
            "route": "/reference/scanner/help",
            "frontMatter": {}
          },
          {
            "name": "iac",
            "route": "/reference/scanner/iac",
            "frontMatter": {}
          },
          {
            "name": "inspect-devguard-token",
            "route": "/reference/scanner/inspect-devguard-token",
            "frontMatter": {}
          },
          {
            "name": "inspect",
            "route": "/reference/scanner/inspect",
            "frontMatter": {}
          },
          {
            "name": "intoto",
            "route": "/reference/scanner/intoto",
            "frontMatter": {}
          },
          {
            "name": "kyverno2sarif",
            "route": "/reference/scanner/kyverno2sarif",
            "frontMatter": {}
          },
          {
            "name": "login",
            "route": "/reference/scanner/login",
            "frontMatter": {}
          },
          {
            "name": "merge-sboms",
            "route": "/reference/scanner/merge-sboms",
            "frontMatter": {}
          },
          {
            "name": "run",
            "route": "/reference/scanner/run",
            "frontMatter": {}
          },
          {
            "name": "sarif",
            "route": "/reference/scanner/sarif",
            "frontMatter": {}
          },
          {
            "name": "sarif2markdown",
            "route": "/reference/scanner/sarif2markdown",
            "frontMatter": {}
          },
          {
            "name": "sast",
            "route": "/reference/scanner/sast",
            "frontMatter": {}
          },
          {
            "name": "sbom",
            "route": "/reference/scanner/sbom",
            "frontMatter": {}
          },
          {
            "name": "sca",
            "route": "/reference/scanner/sca",
            "frontMatter": {}
          },
          {
            "name": "secret-scanning",
            "route": "/reference/scanner/secret-scanning",
            "frontMatter": {}
          },
          {
            "name": "setup",
            "route": "/reference/scanner/setup",
            "frontMatter": {}
          },
          {
            "name": "sign",
            "route": "/reference/scanner/sign",
            "frontMatter": {}
          },
          {
            "name": "slug",
            "route": "/reference/scanner/slug",
            "frontMatter": {}
          },
          {
            "name": "start",
            "route": "/reference/scanner/start",
            "frontMatter": {}
          },
          {
            "name": "stop",
            "route": "/reference/scanner/stop",
            "frontMatter": {}
          },
          {
            "name": "verify",
            "route": "/reference/scanner/verify",
            "frontMatter": {}
          },
          {
            "name": "version",
            "route": "/reference/scanner/version",
            "frontMatter": {}
          },
          {
            "name": "vex",
            "route": "/reference/scanner/vex",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "vulnerability-database",
        "route": "/reference/vulnerability-database",
        "children": [
          {
            "name": "cve-enrichment",
            "route": "/reference/vulnerability-database/cve-enrichment",
            "frontMatter": {}
          },
          {
            "name": "data-sources",
            "route": "/reference/vulnerability-database/data-sources",
            "frontMatter": {}
          },
          {
            "name": "exploitability-data",
            "route": "/reference/vulnerability-database/exploitability-data",
            "frontMatter": {}
          },
          {
            "name": "malicious-packages",
            "route": "/reference/vulnerability-database/malicious-packages",
            "frontMatter": {}
          },
          {
            "name": "update-schedule",
            "route": "/reference/vulnerability-database/update-schedule",
            "frontMatter": {
              "title": "Update Schedule",
              "description": "How DevGuard's vulnerability database is built, signed, distributed, and kept up to date"
            }
          }
        ]
      }
    ]
  },
  {
    "name": "terms-of-use",
    "route": "/terms-of-use",
    "frontMatter": {}
  },
  {
    "name": "tutorials",
    "route": "/tutorials",
    "children": [
      {
        "name": "advanced",
        "route": "/tutorials/advanced",
        "children": [
          {
            "name": "dependency-proxy-setup",
            "route": "/tutorials/advanced/dependency-proxy-setup",
            "frontMatter": {}
          },
          {
            "name": "discover-base-image-attestations",
            "route": "/tutorials/advanced/discover-base-image-attestations",
            "frontMatter": {}
          },
          {
            "name": "multi-tenant-setup",
            "route": "/tutorials/advanced/multi-tenant-setup",
            "frontMatter": {}
          },
          {
            "name": "supply-chain-security",
            "route": "/tutorials/advanced/supply-chain-security",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "basics",
        "route": "/tutorials/basics",
        "children": [
          {
            "name": "managing-vulnerabilities",
            "route": "/tutorials/basics/managing-vulnerabilities",
            "frontMatter": {}
          },
          {
            "name": "setting-up-projects",
            "route": "/tutorials/basics/setting-up-projects",
            "frontMatter": {}
          },
          {
            "name": "understanding-sbom",
            "route": "/tutorials/basics/understanding-sbom",
            "frontMatter": {}
          },
          {
            "name": "your-first-scan",
            "route": "/tutorials/basics/your-first-scan",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "ci-cd-integration",
        "route": "/tutorials/ci-cd-integration",
        "children": [
          {
            "name": "github-actions-setup",
            "route": "/tutorials/ci-cd-integration/github-actions-setup",
            "frontMatter": {}
          },
          {
            "name": "github-actions-workflows",
            "route": "/tutorials/ci-cd-integration/github-actions-workflows",
            "frontMatter": {}
          },
          {
            "name": "gitlab-ci-components",
            "route": "/tutorials/ci-cd-integration/gitlab-ci-components",
            "frontMatter": {}
          },
          {
            "name": "gitlab-ci-setup",
            "route": "/tutorials/ci-cd-integration/gitlab-ci-setup",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "compliance",
        "route": "/tutorials/compliance",
        "children": [
          {
            "name": "audit-trails",
            "route": "/tutorials/compliance/audit-trails",
            "frontMatter": {}
          },
          {
            "name": "cyber-resilience-act",
            "route": "/tutorials/compliance/cyber-resilience-act",
            "frontMatter": {}
          },
          {
            "name": "generating-csaf-reports",
            "route": "/tutorials/compliance/generating-csaf-reports",
            "frontMatter": {}
          },
          {
            "name": "iso-27001-mapping",
            "route": "/tutorials/compliance/iso-27001-mapping",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "container-hardening",
        "route": "/tutorials/container-hardening",
        "children": [
          {
            "name": "container-hardening-checklist",
            "route": "/tutorials/container-hardening/container-hardening-checklist",
            "frontMatter": {}
          },
          {
            "name": "cve-decision",
            "route": "/tutorials/container-hardening/cve-decision",
            "frontMatter": {}
          },
          {
            "name": "examples",
            "route": "/tutorials/container-hardening/examples",
            "frontMatter": {}
          },
          {
            "name": "index",
            "route": "/tutorials/container-hardening",
            "frontMatter": {}
          },
          {
            "name": "process",
            "route": "/tutorials/container-hardening/process",
            "frontMatter": {}
          }
        ]
      },
      {
        "name": "index",
        "route": "/tutorials",
        "frontMatter": {}
      },
      {
        "name": "vulnerability-management",
        "route": "/tutorials/vulnerability-management",
        "children": [
          {
            "name": "creating-mitigation-plans",
            "route": "/tutorials/vulnerability-management/creating-mitigation-plans",
            "frontMatter": {}
          },
          {
            "name": "risk-assessment",
            "route": "/tutorials/vulnerability-management/risk-assessment",
            "frontMatter": {}
          },
          {
            "name": "tracking-remediation",
            "route": "/tutorials/vulnerability-management/tracking-remediation",
            "frontMatter": {}
          },
          {
            "name": "triaging-vulnerabilities",
            "route": "/tutorials/vulnerability-management/triaging-vulnerabilities",
            "frontMatter": {}
          }
        ]
      }
    ]
  },
  {
    "name": "vulnerability-database",
    "route": "/vulnerability-database",
    "children": [
      {
        "name": "[ID]",
        "route": "/vulnerability-database/[ID]",
        "frontMatter": {
          "disableToc": true
        }
      }
    ]
  },
  {
    "name": "vulnerability-database",
    "route": "/vulnerability-database",
    "frontMatter": {
      "title": "Vulnerability Database - Search CVEs, Analyze Risks",
      "description": "Search and explore known vulnerabilities (CVE, RHSA, GHSA) with CVSS scores, EPSS probabilities, affected components, and risk analysis.",
      "disableToc": true
    }
  }
];
