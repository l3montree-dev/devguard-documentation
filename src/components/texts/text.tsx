// Copyright 2025 rafaeishikho.
// SPDX-License-Identifier: Apache-2.0

interface CICDJobsTextProps {
    title: string
    description: React.ReactNode
}

export default function CICDJobsText(props: CICDJobsTextProps) {
    return (
        <div className="custom:mx-auto custom:mt-3 custom:max-w-7xl">
            <div className="custom:mx-auto custom:max-w-4xl">
                <h1 className="custom:text-3xl custom:font-bold custom:text-white">{props.title}</h1>
                <p className="custom:mt-4 custom:text-base">{props.description}</p>
            </div>
        </div>
    )
}
