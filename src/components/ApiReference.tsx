'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { OpenAPIV3 } from 'openapi-types'
import { fetchSpec } from '@/services/spec-cache'
import { Card, CardContent } from './ui/card'
import { Skeleton } from './ui/skeleton'

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const

function groupByTag(spec: OpenAPIV3.Document) {
    const groups: Record<string, Array<{ method: string; op: OpenAPIV3.OperationObject }>> = {}
    for (const item of Object.values(spec.paths ?? {})) {
        if (!item) continue
        for (const method of HTTP_METHODS) {
            const op = item[method] as OpenAPIV3.OperationObject | undefined
            if (!op) continue
            const tag = op.tags?.[0] ?? 'Other'
            groups[tag] ??= []
            groups[tag].push({ method, op })
        }
    }
    return groups
}

const ApiReference: React.FC = () => {
    const [groups, setGroups] = useState<Record<string, Array<{ method: string; op: OpenAPIV3.OperationObject }>> | null>(null)

    useEffect(() => {
        fetchSpec().then(spec => setGroups(groupByTag(spec))).catch(console.error)
    }, [])

    if (!groups) return (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[...Array(9)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}
        </div>
    )

    return (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Object.entries(groups).sort(([a], [b]) => a.localeCompare(b)).map(([tag, ops]) => (
                <Link key={tag} href={`/reference/api/${tag.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Card className="h-full transition-colors hover:bg-muted/40">
                        <CardContent className="px-4 py-3">
                            <p className="font-medium">{tag}</p>
                            <p className="text-muted-foreground">{ops.length} endpoint{ops.length !== 1 ? 's' : ''}</p>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </div>
    )
}

export default ApiReference
