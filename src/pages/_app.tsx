import { cn } from '@/lib/utils'
import '../styles/globals.scss'
import { inter, lexend } from '../fonts'
import { TooltipProvider } from '@/components/ui/tooltip'

export default function MyApp({ Component, pageProps }: any) {
    return (
        <TooltipProvider>
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
