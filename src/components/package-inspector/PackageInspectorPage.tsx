import { useState } from 'react'
import { useRouter } from 'next/router'
import { Searchbar } from '@/components/ui/Searchbar'
import { SearchResultCard } from './SearchResultCard'
import { PackageInspectorHero } from './Hero'
import { extractPackageName } from '@/lib/utils'
export function PackageInspectorPage() {
    const router = useRouter()

    const [searchQuery, setSearchQuery] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    const [results, setResults] = useState<any[]>([])

    const handleSearch = async () => {
        if (!searchQuery.trim()) return

        setIsLoading(true)

        try {
            const response = await fetch(
                'https://api.main.devguard.org/api/v1/vulndb/purl-inspect/' +
                    encodeURIComponent(searchQuery.trim()),
            )
            if (!response.ok) {
                setResults([])
                return
            }
            const data = await response.json()
            const items = Array.isArray(data) ? data : [data]
            setResults(
                items.filter(
                    (item: any) => item.component?.project?.description,
                ),
            )
        } catch {
            setResults([])
        } finally {
            setIsLoading(false)
        }
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
                    placeholder={'Search by PURL'}
                />

                {results.length > 0 && (
                    <div className="mx-auto mt-8 max-w-2xl">
                        {results.map((result) => (
                            <SearchResultCard
                                key={result.purl}
                                name={extractPackageName(result.purl)}
                                description={
                                    result.component.project?.description
                                }
                                version={result.component.version}
                                purl={result.purl}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}
