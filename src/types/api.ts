export type AffectedComponent = {
    id: number
    purl: string
    ecosystem: string
    version: string | null
    semverStart?: string | null
    semverEnd?: string | null
    versionIntroduced?: string | null
    versionFixed?: string | null
    Source?: string
    scheme?: string
    type?: string
    name?: string
    namespace?: string
    subpath?: string
}

export type AffectedComponents = AffectedComponent[]
