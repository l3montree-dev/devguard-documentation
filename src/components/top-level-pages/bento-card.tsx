'use client'

import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { Subheading } from './text'

export function BentoCard({
    className = '',
    eyebrow,
    title,
    description,
    graphic,
    fade = [],
}: {
    className?: string
    eyebrow: React.ReactNode
    title: React.ReactNode
    description: React.ReactNode
    graphic: React.ReactNode
    fade?: ('top' | 'bottom')[]
}) {
    return (
        <motion.div
            initial="idle"
            whileHover="active"
            variants={{ idle: {}, active: {} }}
            className={clsx(
                className,
                'group relative flex flex-col overflow-hidden rounded-lg',
                'shadow-xs bg-bgSecondary ring-1 ring-white/15',
            )}
        >
            <div className="relative h-80 shrink-0">
                {graphic}
                {fade.includes('top') && (
                    <div className="bg-linear-to-b absolute inset-0 from-gray-800 from-white from-[-25%] to-50%" />
                )}
                {fade.includes('bottom') && (
                    <div className="bg-linear-to-t absolute inset-0 from-white from-[-25%] to-50%" />
                )}
            </div>
            <div className="relative p-10">
                <Subheading as="h3" className="text-l3-400">
                    {eyebrow}
                </Subheading>
                <p className="mt-1 text-2xl/8 font-medium tracking-tight text-gray-950 text-white">
                    {title}
                </p>
                <p className="mt-2 max-w-[600px] text-sm/6 text-gray-400 text-gray-600">
                    {description}
                </p>
            </div>
        </motion.div>
    )
}
