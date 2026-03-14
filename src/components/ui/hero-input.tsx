import { ReactNode } from 'react'

interface HeroSectionProps {
    title: string
    subtitle: ReactNode
    children?: ReactNode
}

export function HeroSection({ title, subtitle, children }: HeroSectionProps) {
    return (
        <div className="pt-8 md:pt-0">
            <div className="mx-auto max-w-2xl">
                <h1 className="text-5xl font-medium tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-7xl">
                    {title}
                </h1>
                <p className="text-md relative block rounded-full p-2 pt-12 font-medium text-balance">
                    {subtitle}
                </p>
                {children}
            </div>
        </div>
    )
}
