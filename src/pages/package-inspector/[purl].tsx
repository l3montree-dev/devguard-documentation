import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { extractPackageName } from '@/lib/utils'

export default function PackageDetailsPage() {
    const router = useRouter()
    const { purl } = router.query

    const [packageInfo, setPackageInfo] = useState<PackageInfo | null>(null)

    const [isLoading, setIsLoading] = useState(true)

    const [error, setError] = useState<string | null>(null)

    const purlString = typeof purl === 'string' ? purl : ''
    const packageName = purlString ? extractPackageName(decodeURIComponent(purlString)) : ''

    useEffect(() => {
        if (!purlString) return

        const fetchPackageInfo = async () => {
            setIsLoading(true)
            setError(null)
            const decodedPurl = decodeURIComponent(purlString)

            const response = await fetch(
                'https://api.main.devguard.org/api/v1/vulndb/purl-inspect/' +
                    decodedPurl,
            )

            if (response) {
                setPackageInfo(response)
            } else {
                setError('Package not found')
            }

            setIsLoading(false)
        }
        fetchPackageInfo()
    }, [purlString])
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-900">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent"></div>
                    <p className="text-gray-600">
                        Loading package information...
                    </p>
                </div>
            </div>
        )
    }
}
