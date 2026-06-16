'use client'

import React, { useEffect, useState } from 'react'
import { OpenAPIV3 } from 'openapi-types'
import { fetchSpec } from '@/services/spec-cache'
import { Badge } from './ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import { Separator } from './ui/separator'
import { Skeleton } from './ui/skeleton'
import CopyButton from './CopyButton'
import { Button } from './ui/button'

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'] as const

function resolveRef(ref: string, spec: OpenAPIV3.Document): OpenAPIV3.SchemaObject | null {
    const parts = ref.replace('#/', '').split('/')
    let node: any = spec
    for (const part of parts) node = node?.[part]
    return node ?? null
}

function schemaToExample(schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject, spec: OpenAPIV3.Document, depth = 0): unknown {
    if (depth > 5) return null
    if ('$ref' in schema) {
        const resolved = resolveRef(schema.$ref, spec)
        return resolved ? schemaToExample(resolved, spec, depth + 1) : null
    }
    if (schema.example !== undefined) return schema.example
    if (schema.allOf) return schemaToExample(schema.allOf[0], spec, depth + 1)
    if (schema.oneOf) return schemaToExample(schema.oneOf[0], spec, depth + 1)
    if (schema.anyOf) return schemaToExample(schema.anyOf[0], spec, depth + 1)
    if (schema.type === 'object' || schema.properties) {
        const obj: Record<string, unknown> = {}
        for (const [k, v] of Object.entries(schema.properties ?? {})) {
            obj[k] = schemaToExample(v, spec, depth + 1)
        }
        return obj
    }
    if (schema.type === 'array' && schema.items) return [schemaToExample(schema.items, spec, depth + 1)]
    if (schema.enum) return schema.enum[0]
    const defaults: Record<string, unknown> = { string: 'string', integer: 0, number: 0, boolean: true }
    return defaults[schema.type ?? ''] ?? null
}

function getOperationsForTag(spec: OpenAPIV3.Document, tag: string) {
    const ops: Array<{ path: string; method: string; op: OpenAPIV3.OperationObject }> = []
    for (const [path, item] of Object.entries(spec.paths ?? {})) {
        if (!item) continue
        for (const method of HTTP_METHODS) {
            const op = item[method] as OpenAPIV3.OperationObject | undefined
            if (!op) continue
            if ((op.tags?.[0] ?? 'Other') === tag) ops.push({ path, method, op })
        }
    }
    return ops
}

function opId(method: string, path: string) {
    return `${method}-${path}`.replace(/[^a-z0-9]/gi, '-').toLowerCase()
}

function buildCurl(method: string, path: string, op: OpenAPIV3.OperationObject, spec: OpenAPIV3.Document): string {
    const base = (spec as any).servers?.[0]?.url ?? 'https://api.devguard.org'
    const params = (op.parameters ?? []).filter((p): p is OpenAPIV3.ParameterObject => !('$ref' in p))
    const required = params.filter(p => p.in === 'query' && p.required)

    let url = base + path.replace(/\{(\w+)\}/g, ':$1')
    if (required.length) url += '?' + required.map(p => `${p.name}=VALUE`).join('&')

    const lines = [
        `curl --request ${method.toUpperCase()} \\`,
        `  --url '${url}' \\`,
        `  --header 'Authorization: Bearer dvg_…'`,
    ]

    const body = op.requestBody && !('$ref' in op.requestBody) ? op.requestBody as OpenAPIV3.RequestBodyObject : undefined
    if (body?.content?.['application/json']?.schema) {
        const example = schemaToExample(body.content['application/json'].schema, spec)
        lines[lines.length - 1] += ' \\'
        lines.push(`  --header 'Content-Type: application/json' \\`)
        lines.push(`  --data '${JSON.stringify(example)}'`)
    }

    return lines.join('\n')
}

const OperationSection: React.FC<{ path: string; method: string; op: OpenAPIV3.OperationObject; spec: OpenAPIV3.Document }> = ({ path, method, op, spec }) => {
    const params = (op.parameters ?? []).filter((p): p is OpenAPIV3.ParameterObject => !('$ref' in p))
    const body = op.requestBody && !('$ref' in op.requestBody) ? op.requestBody as OpenAPIV3.RequestBodyObject : undefined
    const responses = op.responses
        ? Object.entries(op.responses).filter(([, res]) => {
            const r = '$ref' in res ? null : res as OpenAPIV3.ResponseObject
            return !!r?.content?.['application/json']?.schema
        })
        : []

    return (
        <section id={opId(method, path)} className="scroll-mt-16 space-y-8">
            <div>

                <h2 className="font-semibold">{op.summary ?? path}</h2>
                {op.description && <p className="text-muted-foreground mt-2">{op.description}</p>}
                <div className="relative mt-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">Endpoint Path</p>
                        <CopyButton text={`${method.toUpperCase()} ${path}`} />
                    </div>
                    <pre className="rounded-md bg-muted px-4 py-3 whitespace-pre-wrap! break-all! pr-20">{method.toUpperCase()} {path}</pre>
                </div>
            </div>

            {params.length > 0 && (
                <div>
                    <p className="font-medium mb-2">Parameters</p>
                    <div className="border rounded-md p-4">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border text-left text-muted-foreground">
                                    <th className="pb-2 pl-2 pr-6 font-medium">Name</th>
                                    <th className="pb-2 pl-2 pr-6 font-medium">In</th>
                                    <th className="pb-2 pl-2 pr-6 font-medium">Type</th>
                                    <th className="pb-2 font-medium">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {params.map((p, i) => {
                                    const s = p.schema && !('$ref' in p.schema) ? p.schema as OpenAPIV3.SchemaObject : undefined
                                    return (
                                        <tr key={i} className="border-b border-border/40 odd:bg-muted last:border-0">
                                            <td className="p-2 pr-6 align-top font-mono">{p.name}{p.required && <span className="text-destructive">*</span>}</td>
                                            <td className="p-2 pr-6 align-top text-muted-foreground">{p.in}</td>
                                            <td className="p-2 pr-6 align-top font-mono text-muted-foreground">{s?.type ?? '—'}</td>
                                            <td className="p-2 align-top text-muted-foreground">{p.description ?? '—'}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div>
                <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Example request</p>
                    <CopyButton text={buildCurl(method, path, op, spec)} />
                </div>
                <pre className="rounded-md bg-muted px-4 py-3 whitespace-pre-wrap! break-all!">{buildCurl(method, path, op, spec)}</pre>
            </div>

            {responses.length > 0 && (
                <div>
                    <p className="font-medium mb-2">Responses</p>
                    <div className="space-y-2">
                        {responses.map(([code, res]) => {
                            const r = res as OpenAPIV3.ResponseObject
                            const json = r.content!['application/json']
                            const s = json.schema && !('$ref' in json.schema) ? json.schema as OpenAPIV3.SchemaObject : undefined
                            const example = json.example ?? s?.example ?? schemaToExample(json.schema!, spec)
                            return (
                                <Collapsible key={code}>
                                    <div className="flex items-center justify-between rounded-md bg-muted px-4 py-3">
                                        <div>
                                            <span className="font-mono font-medium mr-2">{code}</span>
                                            {r.description && <span className="text-muted-foreground">{r.description}</span>}
                                        </div>
                                        <CollapsibleTrigger >
                                            <Button variant={"secondary"} size={"sm"}>Show example</Button>             </CollapsibleTrigger>
                                    </div>
                                    <CollapsibleContent>
                                        <pre className="rounded-md bg-muted px-4 py-3 mt-2 whitespace-pre-wrap! break-all!">{JSON.stringify(example, null, 2)}</pre>
                                    </CollapsibleContent>
                                </Collapsible>
                            )
                        })}
                    </div>
                </div>
            )}
        </section>
    )
}

function injectToc(operations: Array<{ path: string; method: string; op: OpenAPIV3.OperationObject }>) {
    const tocInner = document.getElementById('toc-inner')
    if (!tocInner) return
    tocInner.querySelector('#api-toc-list')?.remove()

    const ul = document.createElement('ul')
    ul.id = 'api-toc-list'
    ul.className = 'mt-4 flex flex-col gap-1'
    ul.style.maxHeight = 'calc(100vh - 200px)'
    ul.style.overflowY = 'auto'

    operations.forEach(({ path, method, op }) => {
        const li = document.createElement('li')
        const a = document.createElement('a')
        a.href = `#${opId(method, path)}`
        a.className = 'kern-link block transition-colors duration-200'
        a.textContent = op.summary ?? path
        li.appendChild(a)
        ul.appendChild(li)
    })

    const tocFooter = document.getElementById('toc-footer')
    tocInner.insertBefore(ul, tocFooter)
}

const ApiTagPage: React.FC<{ tag: string }> = ({ tag }) => {
    const [spec, setSpec] = useState<OpenAPIV3.Document | null>(null)

    useEffect(() => {
        fetchSpec().then(setSpec).catch(console.error)
    }, [])

    useEffect(() => {
        if (!spec) return
        const ops = getOperationsForTag(spec, tag)
        injectToc(ops)
        return () => { document.getElementById('api-toc-list')?.remove() }
    }, [spec, tag])

    if (!spec) {
        return (
            <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-3">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                ))}
            </div>
        )
    }

    const operations = getOperationsForTag(spec, tag)

    return (
        <div>
            {operations.map(({ path, method, op }, i) => (
                <React.Fragment key={`${method}-${path}`}>
                    {i > 0 && <Separator className="my-16" />}
                    <OperationSection path={path} method={method} op={op} spec={spec} />
                </React.Fragment>
            ))}
        </div>
    )
}

export default ApiTagPage
