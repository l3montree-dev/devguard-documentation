import { ReactNode } from 'react'

interface HeroSectionProps {
    title: string
    subtitle: ReactNode
    children?: ReactNode
}

export function HeroSection({ title, subtitle, children }: HeroSectionProps) {
    return (
        <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
                <div className="max-w-lg">
                    <h1 className="text-6xl font-medium tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-7xl">
                        {title}
                    </h1>
                    <p className="pt-12 relative block rounded-full p-2 text-xl font-medium text-balance">
                        {subtitle}
                    </p>
                    {children}
                </div>
            </div>
        </div>
    )
}
