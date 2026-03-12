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
                <div className="max-w-lg">
                    <h1 className="text-5xl font-medium tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-7xl">
                        {title}
                    </h1>
                    <p className="text-md relative block text-balance rounded-full p-2 pt-12 font-medium">
                        {subtitle}
                    </p>
                    {children}
                </div>
            </div>
        </div>
    )
}
