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
            <div className="absolute inset-0 -z-10">
                <Particles
                    particleColors={['#ffffff']}
                    particleCount={300}
                    particleSpread={30}
                    speed={0.2}
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
