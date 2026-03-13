import React from 'react'
import Link from 'next/link'
import { Package } from 'lucide-react'

interface SearchResultCardProps {
    name: string
    description?: string
    version: string
    purl: string
}

export function SearchResultCard({
    name,
    description,
    version,
    purl,
}: SearchResultCardProps) {
    const encodedPurl = encodeURIComponent(purl)

    return (
        <Link
            href={`/package-inspector/${encodedPurl}`}
            className="flex items-center gap-4 rounded-lg border border-gray-700 bg-gray-800 p-4 transition-colors hover:border-gray-600 hover:bg-gray-700"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-700">
                <Package className="h-5 w-5 text-gray-300" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{name}</span>
                    <span className="text-sm text-gray-500">v{version}</span>
                </div>
                {description && (
                    <p className="truncate text-sm text-gray-400">
                        {description}
                    </p>
                )}
            </div>
        </Link>
    )
}
