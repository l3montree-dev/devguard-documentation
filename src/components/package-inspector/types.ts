export interface ScoreCardCheck {
    name: string
    score: number
    reason: string
}

export interface ScoreCard {
    checks: ScoreCardCheck[]
}

export interface PackageInfo {
    purl: string
    component: string
    ecosystem: string
    name: string
    version: string
}
