
export interface ReachabilityAnalysisResponse{
    bomFormat : string
    specVersion : string
    serialNumber : string
    version : number
    metadata : Metadata
    components : Component[]
    vulnerabilities : Vulnerability[]
}

interface Metadata{
    timestamp : string
    tools : Tool[]
}

interface Tool{
    vendor : string
    name : string
    version : string
}

interface Component {
    type : string
    name : string
    purl : string
    "bom-ref" : string
}

interface Vulnerability{
    "bom-ref" : string
    id : string
    description : string
    affects : Affect[]
    analysis : Analysis
}

interface Affect{
    ref : string
}

interface Analysis {
    state : string
    detail : string
    evidence : Evidence[]
}

interface Evidence {
    path : PathElement[]
}


interface PathElement{
    id: number;
    cve_id: string;
    signature: string;
    filename: string;
    start_line: number;
    end_line: number;
    evidence: string;
    purl: string;
    calls_id: number | null;
}