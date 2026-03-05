import { useState } from 'react'
import { useRouter } from 'next/router'
import { PackageInspectorHero } from './Hero'
import { Container } from '../ui/container'
import Particles from './particels'

export function PackageInspectorPage() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [isSearching, setIsSearching] = useState(false)

    const handleSearch = async (purl?: string) => {
        const trimmed = (purl ?? searchQuery).trim()
        if (!trimmed) return

        setError(null)
        setIsSearching(true)

        try {
            const response = await fetch(
                'https://api.main.devguard.org/api/v1/vulndb/purl-inspect/' +
                    encodeURIComponent(trimmed),
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
            router.push(
                '/package-inspector/' + encodeURIComponent(trimmed),
            )
        } catch {
            setError('Could not reach the API. Please try again.')
        } finally {
            setIsSearching(false)
        }
    }

    return (
        <Container>
            {/* Left edge grid pattern */}
            <div className="pointer-events-none fixed inset-y-0 left-0 z-50 hidden w-8 border-r border-r-[var(--grid-line-color)] bg-[repeating-linear-gradient(315deg,var(--grid-line-color)_0,var(--grid-line-color)_1px,transparent_0,transparent_50%)] [background-size:10px_10px] bg-fixed opacity-80 sm:block" />

            {/* Right edge grid pattern */}
            <div className="pointer-events-none fixed inset-y-0 right-0 z-50 hidden w-8 border-l border-l-[var(--grid-line-color)] bg-[repeating-linear-gradient(315deg,var(--grid-line-color)_0,var(--grid-line-color)_1px,transparent_0,transparent_50%)] [background-size:10px_10px] bg-fixed opacity-80 sm:block" />
            <div className="pointer-events-none fixed inset-0 -z-50">
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
            <PackageInspectorHero
                searchTerm={searchQuery}
                setSearchTerm={(v) => {
                    setSearchQuery(v)
                    setError(null)
                }}
                onSearch={handleSearch}
                error={error}
                isSearching={isSearching}
            />
        </Container>
    )
}
