'use client'

import React, { useEffect, useRef, useState } from 'react'
import SwaggerUI from 'swagger-ui-react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Textarea } from './ui/textarea'
import { uniq } from 'lodash'

import { signRequest } from '../services/request-signing'

/**
 * Injects API tag links into the DWT theme's #toc-inner element.
 */
const SwaggerTOC: React.FC<{ tags: Array<string> }> = ({ tags }) => {
    useEffect(() => {
        if (tags.length === 0) return

        const tocInner = document.getElementById('toc-inner')
        if (!tocInner) return

        // Remove any previously injected swagger TOC list
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

export interface SwaggerSpec {
    paths: {
        [key in string]: {
            [method in string]: {
                tags?: string[]
            }
        }
    }
    tags: string[]
}

const SwaggerReference: React.FC = () => {
    // hard caching of request interceptor - thus we need to use refs
    const keyRef = useRef<string | null>(null)
    const [privateKey, setPrivateKey] = useState('')
    const [showDialog, setShowDialog] = useState(false)
    const [isConfigured, setIsConfigured] = useState(false)
    const [swaggerSpec, setSwaggerSpec] = useState<
        any & { tags: Array<string> }
    >(null)

    // Fetch Swagger spec once to use for both SwaggerUI and TOC
    React.useEffect(() => {
        fetch(
            'https://raw.githubusercontent.com/l3montree-dev/devguard/refs/heads/main/docs/swagger.json',
        )
            .then((res) => res.json())
            .then((spec: SwaggerSpec) => {
                // extract all tags for the toc
                const tags = Object.values(spec.paths)
                    .map((v) => Object.values(v).flatMap((op) => op.tags || []))
                    .flat()
                // unique
                spec['tags'] = uniq(tags)

                setSwaggerSpec(spec)
            })
            .catch((err) => {
                console.error('Failed to fetch swagger spec:', err)
            })

        // Check session storage for existing private key
        const storedKey = sessionStorage.getItem('pat')
        if (storedKey) {
            keyRef.current = storedKey
            setPrivateKey(storedKey)
            setIsConfigured(true)
        }
    }, [])

    const handleSaveKey = () => {
        if (privateKey.trim()) {
            // Validate hex format
            if (!/^[0-9a-fA-F]+$/.test(privateKey.trim())) {
                alert('Invalid private key format. Must be a hex string.')
                return
            }
            // set in session storage
            sessionStorage.setItem('pat', privateKey.trim())
            keyRef.current = privateKey.trim()
            setIsConfigured(true)
            setShowDialog(false)
        }
    }

    const handleClearKey = () => {
        setPrivateKey('')
        setIsConfigured(false)
    }

    const requestInterceptor = async (req: any) => {
        // Only sign if private key is configured
        if (!keyRef.current?.trim()) {
            return req
        }

        try {
            return await signRequest(req, keyRef.current.trim())
        } catch (error) {
            console.error('Failed to sign request:', error)
            alert('Failed to sign request: ' + (error as Error).message)
            return req
        }
    }

    return (
        <>
            <div className="mt-6">
                {/* PAT Configuration Banner */}
                <Alert
                    className={`mb-5 ${isConfigured ? 'border-success/30 bg-success/10' : ''}`}
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="mb-1 text-sm font-semibold">
                                Personal Access Token (PAT) Authentication
                            </h3>
                            <AlertDescription>
                                {isConfigured
                                    ? 'Private key configured. Requests will be signed automatically.'
                                    : 'Configure your private key to enable automatic request signing.'}
                            </AlertDescription>
                        </div>
                        <div className="flex gap-2">
                            {isConfigured && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleClearKey}
                                >
                                    Clear Key
                                </Button>
                            )}
                            <Button
                                size="sm"
                                onClick={() => setShowDialog(true)}
                            >
                                {isConfigured ? 'Update Key' : 'Configure PAT'}
                            </Button>
                        </div>
                    </div>
                </Alert>

                {/* PAT Configuration Dialog */}
                <Dialog open={showDialog} onOpenChange={setShowDialog}>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>
                                Configure Personal Access Token
                            </DialogTitle>
                            <DialogDescription>
                                Enter your personal access token. This token is
                                a hex-encoded private key used to sign HTTP
                                requests for authentication.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div>
                                <label
                                    htmlFor="private-key"
                                    className="mb-2 block font-semibold"
                                >
                                    Personal Access Token
                                </label>
                                <Textarea
                                    id="private-key"
                                    value={privateKey}
                                    onChange={(e) =>
                                        setPrivateKey(e.target.value)
                                    }
                                    placeholder="Enter your hex-encoded private key..."
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setShowDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveKey}
                                disabled={!privateKey.trim()}
                            >
                                Save
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Swagger UI */}
                {swaggerSpec && (
                    <SwaggerUI
                        spec={swaggerSpec}
                        requestInterceptor={requestInterceptor}
                        docExpansion="list"
                        defaultModelsExpandDepth={1}
                        displayRequestDuration={true}
                        tryItOutEnabled={true}
                        persistAuthorization={false}
                    />
                )}
            </div>

            {/* Custom TOC for Swagger API tags */}
            {swaggerSpec?.tags && <SwaggerTOC tags={swaggerSpec.tags} />}
        </>
    )
}

export default SwaggerReference
