import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { HTMLAttributeReferrerPolicy } from 'react'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

type YoutubeAttributes = {
    src: string
    title: string
    allow: string
    allowfullscreen: boolean | undefined
    loading: 'eager' | 'lazy' | undefined
    name: string
    referrerpolicy: HTMLAttributeReferrerPolicy | undefined
    sandbox: string
    seamless: boolean | undefined
    srcdoc: string
}

export function extractPackageName(purl: string): string {
    return purl
        .split('?')[0]
        .split('@')
        .slice(0, -1)
        .join('@')
        .split('/')
        .slice(1)
        .join('/')
}

export function extractAttributes(iFrame: string): YoutubeAttributes {
    const attributes = iFrame
        .split(' ')
        .filter((attribute) => attribute.includes('='))

    return attributes.reduce((acc, attribute) => {
        const [key, value] = attribute.split('=')
        return {
            ...acc,
            [key]: value.replace(/"/g, ''),
        }
    }, {} as YoutubeAttributes)
}
