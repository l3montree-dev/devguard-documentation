'use client'

import React, { useEffect } from 'react'
import SwaggerUI from 'swagger-ui-react'
import { uniq } from 'lodash'

/**
 * Injects API tag links into the DWT theme's #toc-inner element.
 */
const SwaggerTOC: React.FC<{ tags: Array<string> }> = ({ tags }) => {
    useEffect(() => {
        if (tags.length === 0) return

        const tocInner = document.getElementById('toc-inner')
        if (!tocInner) return

        tocInner.querySelector('#swagger-toc-list')?.remove()

        const ul = document.createElement('ul')
        ul.id = 'swagger-toc-list'
        ul.className = 'mt-4 flex flex-col gap-1'
        ul.style.maxHeight = 'calc(100vh - 200px)'
        ul.style.overflowY = 'auto'

        tags.forEach((tag) => {
            const li = document.createElement('li')
            const a = document.createElement('a')
            a.href = `#operations-tag-${tag}`
            a.className = 'kern-link block transition-colors duration-200'
            a.textContent = tag
            li.appendChild(a)
            ul.appendChild(li)
        })

        const tocFooter = document.getElementById('toc-footer')
        tocInner.insertBefore(ul, tocFooter)

        return () => {
            tocInner.querySelector('#swagger-toc-list')?.remove()
        }
    }, [tags])

    return null
}

interface SwaggerSpec {
    paths: {
        [key: string]: {
            [method: string]: {
                tags?: string[]
            }
        }
    }
    tags: string[]
}

const SwaggerReference: React.FC = () => {
    const [swaggerSpec, setSwaggerSpec] = React.useState<
        any & { tags: Array<string> }
    >(null)

    React.useEffect(() => {
        fetch(
            'https://raw.githubusercontent.com/l3montree-dev/devguard/refs/heads/main/docs/swagger.json',
        )
            .then((res) => res.json())
            .then((spec: SwaggerSpec) => {
                const tags = Object.values(spec.paths)
                    .map((v) => Object.values(v).flatMap((op) => op.tags || []))
                    .flat()
                spec['tags'] = uniq(tags)
                setSwaggerSpec(spec)
            })
            .catch((err) => {
                console.error('Failed to fetch swagger spec:', err)
            })
    }, [])

    return (
        <>
            <div className="mt-6">
                {swaggerSpec && (
                    <SwaggerUI
                        spec={swaggerSpec}
                        docExpansion="list"
                        defaultModelsExpandDepth={1}
                        displayRequestDuration={true}
                        tryItOutEnabled={true}
                        persistAuthorization={true}
                    />
                )}
            </div>

            {swaggerSpec?.tags && <SwaggerTOC tags={swaggerSpec.tags} />}
        </>
    )
}

export default SwaggerReference
