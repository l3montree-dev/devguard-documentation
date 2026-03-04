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
    let containerClasses = 'custom:my-6 custom:block'
    if (float === 'right') {
        containerClasses += ' custom:md:float-right custom:md:ml-6 custom:md:mb-4 custom:md:clear-right'
    } else if (float === 'left') {
        containerClasses += ' custom:md:float-left custom:md:mr-6 custom:md:mb-4 custom:md:clear-left'
    }

    const containerStyle =
        float !== 'none' ? { width: width } : { width: width, maxWidth: '100%' }

    return (
        <figure className={containerClasses} style={containerStyle}>
            <img
                src={src}
                alt={alt}
                className="custom:h-auto custom:w-full custom:rounded-lg custom:border custom:border-gray-200 custom:bg-white custom:shadow-sm custom:dark:border-gray-700 custom:dark:bg-black"
            />

            <figcaption className="custom:text-left">
                {/* attribution/source */}
                {attribution && (
                    <div className="custom:mt-1 custom:text-[10px] custom:leading-tight custom:text-gray-500 custom:dark:text-gray-500">
                        {attribution}
                    </div>
                )}
                {/* description caption */}
                {children && (
                    <div
                        className={`custom:mt-2 custom:text-xs custom:font-medium custom:text-gray-700 custom:dark:text-gray-300 ${captionClassName}`}
                    >
                        {children}
                    </div>
                )}
            </figcaption>
        </figure>
    )
}
