import ReachabilityAnalysisHero from 'src/components/reachabilityAnalysis/reachability-analysis-hero'

import { DataTable } from 'src/components/reachabilityAnalysis/reachability-analysis-results-table'
import { columns } from 'src/components/reachabilityAnalysis/columns'
import { Container } from 'src/components/top-level-pages/container'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { fetcher } from 'src/lib/fetcher'
import useSWR from 'swr'

const apiBaseURL = 'http://localhost:8080/api/v1/vulndb/reachability/'

export default function ReachabilityAnalysisPage() {
    const router = useRouter()
    const queryParam = router.query.query
    const pageParam = router.query.page
    const [searchTerm, setSearchTerm] = useState((queryParam as string) ?? '')
    const tableRef = useRef<HTMLDivElement>(null)

    const query = (queryParam as string)?.toUpperCase() ?? ''
    const page = pageParam as string

    let url = null
    if (router.isReady && pageParam) {
        url = `http://localhost:8080/api/v1/vulndb/reachability?pageSize=10&page=${page}`
        if (query) {
            url += `&filterQuery[npm][like]=%25${query}%25`
        }
    }

    const { data: apiResponse, error, isLoading } = useSWR(url, fetcher)

    const data = apiResponse?.data ?? []
    const total = apiResponse?.total ?? 0

    useEffect(() => {
        if (router.isReady && router.query.query) {
            setSearchTerm(router.query.query as string)
        }
    }, [router.isReady, router.query.query])

    useEffect(() => {
        if (apiResponse?.data && apiResponse.data.length > 0) {
            tableRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [apiResponse])

    const handleSearch = () => {
        router.push({ query: { query: searchTerm, page: 1 } }, undefined, {
            scroll: false,
        })
    }

    const APPROX_ROW_HEIGHT = 60

    return (
        <Container>
            <ReachabilityAnalysisHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch}/>
            <div ref={tableRef} style={{ scrollMarginTop: `${Math.max(80,520 - data.length * APPROX_ROW_HEIGHT)}px`}}>
                <DataTable
                    columns={columns}
                    data={data}
                    isLoading={isLoading}
                    total={total}
                    page={Number(pageParam) || 1}
                    onPageChange={(page) =>
                        router.push(
                            { query: { ...router.query, page } },
                            undefined,
                            { scroll: false },
                        )
                    }
                />
            </div>
        </Container>
    )
}