import { cn } from '@/lib/utils'
import '../styles/globals.scss'
import { inter, lexend } from '../fonts'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: any) {
    return (
        <main
            className={cn(
                inter.variable,
                lexend.variable,
                'font-sans text-base',
            )}
        >
            <Component {...pageProps} />
        </main>
    )
}
