// DWT theme styles must be imported first so project overrides take precedence
import { cn } from '@/lib/utils'
import '../styles/globals.css'
import { inter, lexend } from '../fonts'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function MyApp({ Component, pageProps }: any) {
    return (
        <TooltipProvider>
            {/* Edge grid patterns – global, hidden on mobile */}
            <div className="pointer-events-none fixed inset-y-0 left-0 z-10 hidden w-8 border-r border-r-[var(--grid-line-color)] bg-[repeating-linear-gradient(315deg,var(--grid-line-color)_0,var(--grid-line-color)_1px,transparent_0,transparent_50%)] [background-size:10px_10px] bg-fixed opacity-80 lg:block" />
            <div className="pointer-events-none fixed inset-y-0 right-0 z-10 hidden w-8 border-l border-l-[var(--grid-line-color)] bg-[repeating-linear-gradient(315deg,var(--grid-line-color)_0,var(--grid-line-color)_1px,transparent_0,transparent_50%)] [background-size:10px_10px] bg-fixed opacity-80 lg:block" />
            <main
                className={cn(
                    inter.variable,
                    lexend.variable,
                    'font-sans text-base',
                )}
            >
                <Component {...pageProps} />
            </main>
        </TooltipProvider>
    )
}
