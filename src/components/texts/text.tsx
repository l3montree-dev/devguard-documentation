// Copyright 2025 rafaeishikho.
// SPDX-License-Identifier: Apache-2.0

interface CICDJobsTextProps {
    title: string
    description: React.ReactNode
}

export default function CICDJobsText(props: CICDJobsTextProps) {
    return (
        <div className="mx-auto mt-3 max-w-7xl">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold text-white">{props.title}</h1>
                <p className="mt-4 text-base">{props.description}</p>
            </div>
        </div>
    )
}
