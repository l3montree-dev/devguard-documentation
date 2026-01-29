import { useState } from 'react'
import { Searchbar } from '@/components/ui/Searchbar'
import { SearchResultCard } from './SearchResultCard'
import { PackageInspectorHero } from './Hero'
import mockData from './mock-data.json'

export function PackageInspectorPage() {
    const [searchQuery, setSearchQuery] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const [results, setResults] = useState<any[]>([])

    const [hasSearched, setHasSearched] = useState(false)

    const handleSearch = async () => {
        if (!searchQuery.trim()) return

        setIsLoading(true)
        setHasSearched(true)

        // TODO: replace with real API call when backend is ready
        // simulate delay to test search button working and return mock data
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setResults([mockData])
        setIsLoading(false)
    }

    return (
        <>
            <PackageInspectorHero />
            <div className="pb-16">
                <Searchbar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSubmit={handleSearch}
                    isLoading={isLoading}
                    placeholder={'Search by package name or PURL'}
                />

                {hasSearched && (
                    <div className="mx-auto mt-8 max-w-2xl">
                        {results.map((result) => (
                            <SearchResultCard
                                key={result.purl}
                                name={result.name}
                                description={result.project?.description}
                                version={result.version}
                                purl={result.purl}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
