import { useState } from 'react'
import { useRouter } from 'next/router'
import { PackageInspectorHero } from './Hero'
import { Container } from '../ui/container'
import Particles from './particels'
import VulnDBFAQ, { type FAQ } from '@/components/vulnerability-database/faq'
import VulnDBCTA from '@/components/vulnerability-database/cta'

const packageInspectorFaqs: FAQ[] = [
    {
        question: 'What is a Package URL (PURL)?',
        answer: 'A Package URL (PURL) is a standardized string that uniquely identifies a software package across ecosystems. It encodes the package type, namespace, name, and version — for example: pkg:npm/%40angular/core@17.0.0 or pkg:pypi/requests@2.31.0.',
    },
    {
        question: 'Which ecosystems are supported?',
        answer: 'The Package Inspector supports npm, PyPI, Maven, Go, RubyGems, NuGet, Debian, Alpine, Red Hat, and more. Coverage is sourced from OSV, GitHub Advisory Database, and NVD.',
    },
    {
        question: 'What is an OpenSSF Scorecard?',
        answer: 'The OpenSSF Scorecard is an automated tool that assesses the security posture of open-source projects. It checks for practices like branch protection, signed releases, dependency update automation, and code review policies — producing a score from 0 to 10.',
    },
    {
        question: 'What does the malicious package flag mean?',
        answer: 'A malicious package flag indicates that the package or a specific version has been identified as intentionally harmful — for example through typosquatting, dependency confusion, or injected backdoors. DevGuard sources these flags from OSV and other threat intelligence feeds.',
    },
    {
        question: 'How are vulnerability counts aggregated per package?',
        answer: 'Vulnerability counts reflect all known advisories (CVEs and GHSAs) that affect the specified package version. Each advisory is deduplicated across sources so you see a consolidated view rather than duplicates from multiple databases.',
    },
    {
        question: 'Can I inspect a specific version of a package?',
        answer: 'Yes — include the version in your PURL query (e.g. pkg:npm/lodash@4.17.20). Without a version, the inspector returns aggregated data for the package across all known versions.',
    },
]

export function PackageInspectorPage() {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [isSearching, setIsSearching] = useState(false)

    const handleSearch = async (purl: string) => {
        const trimmed = purl.trim()
        if (!trimmed) return

        setError(null)
        setIsSearching(true)

        try {
            const response = await fetch(
                `/api/vulndb/purl-inspect/${encodeURIComponent(trimmed)}`,
            )
            if (!response.ok) {
                setError('Package not found. Please check your purl.')
                return
            }
            const data = await response.json()
            if (!data?.component) {
                setError('Package not found. Please check your purl.')
                return
            }
            router.push('/package-inspector/' + encodeURIComponent(trimmed))
        } catch {
            setError('Could not reach the API. Please try again.')
        } finally {
            setIsSearching(false)
        }
    }

    return (
        <>
            <Container showTopGrid={true} className="section-outer">
                <div className="z-10">
                    <PackageInspectorHero
                        onSearch={handleSearch}
                        error={error}
                        isSearching={isSearching}
                    />
                </div>
                <div className="pointer-events-none fixed inset-0 -z-10">
                    <Particles
                        particleColors={['#ffffff']}
                        particleCount={300}
                        particleSpread={30}
                        speed={0.05}
                        particleBaseSize={100}
                        alphaParticles={false}
                        disableRotation
                        pixelRatio={1}
                    />
                </div>
            </Container>
            <Container showTopGrid={true} showBottomGrid={true}>
                <VulnDBFAQ
                    faqs={packageInspectorFaqs}
                    title="Frequently asked questions"
                />
            </Container>
            <Container showBottomGrid={true}>
                <VulnDBCTA
                    heading="Understand your supply chain risk — automatically."
                    description="Connect your repositories and let DevGuard continuously scan your dependencies for known vulnerabilities, malicious packages, and weak scorecard signals — so you can fix what matters."
                    primaryLabel="Get started for free"
                    primaryHref="https://app.devguard.org"
                    secondaryLabel="Read the docs"
                    secondaryHref="/docs"
                />
            </Container>
        </>
    )
}
