'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
    const [copied, setCopied] = useState(false)

    const copy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        })
    }

    return (
        <Button variant="secondary" size="sm" onClick={copy}>
            {copied ? 'Copied!' : 'Copy'}
        </Button>
    )
}

export default CopyButton
