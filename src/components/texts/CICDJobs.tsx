// Copyright 2025 rafaeishikho.
// SPDX-License-Identifier: Apache-2.0

import CICDJobsText from './text'

export function SCA() {
    return (
        <CICDJobsText
            title="Software Composition Analysis (SCA)"
            description="The software-composition-analysis (SCA) workflow performs Software Composition Analysis (SCA) to detect vulnerabilities in your project’s dependencies. It scans your software for outdated or vulnerable third-party libraries, helping you manage risks early in the development process."
        />
    )
}

export function SecretScanning() {
    return (
        <CICDJobsText
            title="Secret Scanning"
            description="The secret-scanning workflow is designed to identify sensitive information such as API keys, passwords, and other secrets within your codebase. By integrating secret scanning into your CI/CD pipeline, developers can proactively prevent the accidental exposure of confidential data, enhancing the overall security posture of the application."
        />
    )
}

export function Sign() {
    return (
        <CICDJobsText
            title="Sign"
            description="The sign component is used to sign your code and artifacts. This ensures that the code you are deploying is the same code that was built and tested, providing an additional layer of security and trust in your deployment process."
        />
    )
}

export function Build() {
    return (
        <CICDJobsText
            title="Build Image"
            description="This workflow uses Kaniko to build and archive a Docker image. The image tag is created based on user inputs, Git tags, or commit information. The image is built, saved as a `.tar` file, and the digest is retrieved using crane. Finally, the image, tag, and digest are uploaded as artifacts. To use this component, you need to have a `Dockerfile` in your repository's root directory."
        />
    )
}

export function CodeRiskIdentification() {
    return (
        <CICDJobsText
            title="Code Risk Identification"
            description="This workflow identifies potential security vulnerabilities in your codebase. It requires a sarif file as input to analyze and ensure that all code is secure and up to date."
        />
    )
}

export function DependencyRiskIdentification() {
    return (
        <CICDJobsText
            title="Dependency Risk Identification"
            description="This workflow identifies potential security vulnerabilities in a project's dependencies. It requires a Software Bill of Materials (SBOM) as input to analyze and ensure that all dependencies are secure and up to date."
        />
    )
}

export function ContainerScanning() {
    return (
        <CICDJobsText
            title="Container Scanning"
            description="The container-scanning component scans your container images for vulnerabilities. This ensures that your Docker images do not contain known vulnerabilities before they are deployed."
        />
    )
}

export function SAST() {
    return (
        <CICDJobsText
            title="Static Application Security Testing"
            description="The Static Application Security Testing (sast) component focuses on Static Application Security Testing (SAST) to analyze your source code for vulnerabilities without executing it. This component helps in identifying security flaws early in the development cycle, ensuring that code quality and security are prioritized before deployment."
        />
    )
}

export function IAC() {
    return (
        <CICDJobsText
            title="Infrastructure as Code"
            description="The Infrastructure as Code (iac) component focuses on analyzing your infrastructure code for security vulnerabilities. This component helps in identifying misconfigurations and security risks in your infrastructure setup, ensuring that your cloud resources are configured securely before deployment."
        />
    )
}

export function Deploy() {
    return (
        <CICDJobsText
            title="Deploy "
            description=<p>
                The devguard-deploy component deploys the created OCI (Open
                Container Initiative) image to the GitLab container registry.
                This ensures that your images are securely stored and ready for
                deployment in your infrastructure. The deploy step runs only if
                the following jobs complete successfully: build-image,
                container-scanning, software-composition-analysis, sast, and
                secret-scanning.
            </p>
        />
    )
}

export function Full() {
    return (
        <CICDJobsText
            title="Full DevGuard Scan"
            description={
                <div>
                    This reusable workflow performs a comprehensive security
                    scan of your codebase using DevGuard. <br />
                    It includes:
                    <ul className="mt-1 list-disc pl-5">
                        <li>Container Scanning</li>
                        <li>Static Application Security Testing (SAST)</li>
                        <li>Software Composition Analysis (SCA)</li>
                        <li>Secret Scanning</li>
                        <li>Infrastructure as Code (IaC) scanning</li>
                        <li>Image building </li>
                        <li>Image signing </li>
                        <li>Image deployment</li>
                    </ul>
                </div>
            }
        />
    )
}
