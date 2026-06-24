import { OpenAPIV3 } from 'openapi-types'

const SPEC_URL = 'https://raw.githubusercontent.com/l3montree-dev/devguard/refs/heads/main/docs/swagger.json'

let cache: Promise<OpenAPIV3.Document> | null = null

export function fetchSpec(): Promise<OpenAPIV3.Document> {
    if (!cache) {
        cache = fetch(SPEC_URL, { cache: 'force-cache' })
            .then(r => r.json())
            .catch(err => { cache = null; throw err })
    }
    return cache
}
