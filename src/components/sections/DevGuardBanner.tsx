import { Button } from '@/components/ui/button'
import { ExternalLink, ShieldCheck, SquareArrowOutUpRight } from 'lucide-react'

interface VulnDbBannerProps {
    heading?: string
    subheading?: string
    description?: string
    primaryLabel?: string
    primaryHref?: string
    secondaryLabel?: string
    secondaryHref?: string
}

export default function DevGuardBanner({
    heading,
    subheading,
    description,
    primaryLabel,
    primaryHref,
    secondaryLabel,
    secondaryHref,
}: VulnDbBannerProps) {
    return (
        <div className="border-border/50 from-background via-muted/20 to-background overflow-hidden px-10 py-10 sm:px-10 sm:py-10 md:px-20 md:py-12">
            <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <div className="mb-3 flex items-center gap-2">
                        <ShieldCheck className="text-primary h-4 w-4 flex-shrink-0" />
                        <span className="text-primary truncate font-mono text-[10px] tracking-widest uppercase sm:text-[11px]">
                            Open-Source Security Intelligence
                        </span>
                    </div>
                    <h2 className="mb-4 text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
                        {heading}
                        <div className="mt-2 sm:mt-3">
                            <span className="text-muted-foreground font-normal">
                                {subheading}
                            </span>
                        </div>
                    </h2>
                    <p className="text-muted-foreground max-w-full text-xs leading-relaxed sm:text-sm md:max-w-[550px]">
                        {description}
                    </p>
                </div>
                <div className="flex flex-col gap-2 sm:w-full sm:flex-row sm:gap-3 md:w-auto md:shrink-0 md:flex-col md:items-end">
                    <Button
                        asChild
                        variant="default"
                        size="default"
                        className="w-full gap-2 sm:flex-1 md:w-auto"
                    >
                        <a
                            href={primaryHref}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="truncate">{primaryLabel}</span>
                        </a>
                    </Button>
                    <a
                        href={secondaryHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5 text-xs transition-colors sm:justify-start md:justify-end"
                    >
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{secondaryLabel}</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
