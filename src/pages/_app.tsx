// DWT theme styles must be imported first so project overrides take precedence
import '@document-writing-tools/kernux-nextra-theme/style.css'
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
                    'custom:font-sans custom:text-base',
                )}
            >
                <Component {...pageProps} />
            </main>
        </TooltipProvider>
    )
}
