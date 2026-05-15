import type { GetServerSideProps } from 'next'
import PurlPageComponent from '@/components/package-inspector/purlPage'
import { API_BASE_URL } from '@/lib/fetcher'
import type { PackageInspectResult } from '@/components/package-inspector/types'
import { extractPackageName } from '@/lib/utils'

interface Props {
    result: PackageInspectResult
    purl: string
    title: string
}

export default function PurlDetailPage({ result, purl }: Props) {
    return (
        <>
            <style jsx global>{`
                #sidebar {
                    display: none !important;
                }
                #toc {
                    display: none !important;
                }
                .min-h-svh {
                    min-height: fit-content !important;
                }
                body {
                    overflow-x: clip;
                }
            `}</style>
            <PurlPageComponent purl={purl} initialData={result} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const { purl } = ctx.params as { purl: string }

    if (!purl) {
        return { notFound: true }
    }

    try {
        const res = await fetch(`${API_BASE_URL}/vulndb/purl-inspect/${purl}`)
        if (res.status === 404) return { notFound: true }
        if (!res.ok) return { notFound: true }

        const result: PackageInspectResult = await res.json()
        const packageName = extractPackageName(decodeURIComponent(purl))
        const title = `${packageName} | Package Inspector – DevGuard`
        return { props: { result, purl, title } }
    } catch {
        return { notFound: true }
    }
}
