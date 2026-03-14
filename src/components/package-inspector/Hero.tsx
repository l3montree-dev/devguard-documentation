import Image from 'next/image'
import { HeroSection } from '@/components/ui/hero-input'
import AnimatedContent from '@/components/ui/animated-content'
import CenterFlow from '@/components/animated-blocks/center-flow'
import PackageSearch from '@/components/package-inspector/PackageSearch'

const ECOSYSTEM_NODES = [
    { src: '/icons/eco-logos/npm-icon.svg', alt: 'npm' },
    { src: '/icons/eco-logos/go-programming-language-icon.svg', alt: 'Go' },
    { src: '/icons/eco-logos/debian-logo-icon.svg', alt: 'Debian' },
    {
        src: '/icons/eco-logos/python-programming-language-icon.svg',
        alt: 'Python',
    },
    { src: '/icons/eco-logos/Red_Hat_logo.svg', alt: 'Red Hat' },
    { src: '/icons/eco-logos/Apache_Maven_logo.svg', alt: 'Maven' },
    { src: '/icons/eco-logos/Alpine_logo.svg', alt: 'Alpine' },
    { src: '/icons/eco-logos/Git_icon.svg', alt: 'Git' },
]

const nodeItems = ECOSYSTEM_NODES.map((eco) => ({
    content: (
        <div className="flex h-full w-full items-center justify-center">
            <Image
                src={eco.src}
                alt={eco.alt}
                width={24}
                height={24}
                className="h-6 w-6 object-contain"
            />
        </div>
    ),
}))

const centerContent = (
    <div className="flex h-full w-full items-center justify-center">
        <Image
            src="/logo_icon.svg"
            alt="DevGuard Logo"
            width={24}
            height={24}
            className="h-11 w-auto"
        />
    </div>
)

interface PackageInspectorHeroProps {
    onSearch: (purl: string) => void
    error?: string | null
    isSearching?: boolean
}

export function PackageInspectorHero({
    onSearch,
    error,
    isSearching,
}: PackageInspectorHeroProps) {
    return (
        <div className="relative px-12 max-sm:px-0">
            <div className="mx-auto max-w-7xl pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-8 lg:py-40">
                <HeroSection
                    title="Package Inspector"
                    subtitle={
                        <>
                            Inspect open-source packages across ecosystems —
                            check scorecards, known vulnerabilities, and
                            malicious package flags.
                        </>
                    }
                >
                    <PackageSearch
                        onSubmit={onSearch}
                        error={error}
                        isSearching={isSearching}
                        autoFocus
                        className="mt-5"
                    />
                </HeroSection>

                <AnimatedContent
                    distance={40}
                    direction="vertical"
                    duration={0.7}
                    delay={0.15}
                >
                    <div className="hidden h-[400px] w-full lg:block">
                        <CenterFlow
                            nodeItems={nodeItems}
                            centerContent={centerContent}
                            centerSize={100}
                            nodeSize={48}
                            pulseDuration={5}
                            pulseInterval={10}
                            pulseLength={0.4}
                            lineWidth={1}
                            pulseWidth={1}
                            pulseSoftness={10}
                            lineColor="#323232"
                            lineColorLight="#e0e0e0"
                            pulseColor="#ffffff"
                            pulseColorLight="#f9bd24"
                            glowColor="#f9bd24"
                            glowColorLight="#f9bd24"
                            maxGlowIntensity={25}
                            glowDecay={0.95}
                            borderRadius={35}
                            nodeDistance={0.7}
                            disableBlinking={false}
                        />
                    </div>
                </AnimatedContent>
            </div>
        </div>
    )
}
