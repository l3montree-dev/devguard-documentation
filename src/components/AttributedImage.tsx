/* eslint-disable @next/next/no-img-element */
import React from 'react'

interface AttributedImageProps {
    src: string
    alt: string
    width?: string
    float?: 'left' | 'right' | 'none'
    // license links
    attribution?: React.ReactNode
    // optional override for the caption text style
    captionClassName?: string
    // description text
    children?: React.ReactNode
}

export function AttributedImage({
    src,
    alt,
    width = '100%',
    float = 'none',
    attribution,
    captionClassName = '',
    children,
}: AttributedImageProps) {
    let containerClasses = 'my-6 block'
    if (float === 'right') {
        containerClasses += ' md:float-right md:ml-6 md:mb-4 md:clear-right'
    } else if (float === 'left') {
        containerClasses += ' md:float-left md:mr-6 md:mb-4 md:clear-left'
    }

    const containerStyle =
        float !== 'none' ? { width: width } : { width: width, maxWidth: '100%' }

    return (
        <figure className={containerClasses} style={containerStyle}>
            <img
                src={src}
                alt={alt}
                className="h-auto w-full rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-black"
            />

            <figcaption className="text-left">
                {/* attribution/source */}
                {attribution && (
                    <div className="mt-1 text-[10px] leading-tight text-gray-500 dark:text-gray-500">
                        {attribution}
                    </div>
                )}
                {/* description caption */}
                {children && (
                    <div
                        className={`mt-2 text-xs font-medium text-gray-700 dark:text-gray-300 ${captionClassName}`}
                    >
                        {children}
                    </div>
                )}
            </figcaption>
        </figure>
    )
}
