import { cn } from '@/lib/utils'
import '../styles/globals.scss'
import { Inter, Lexend } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

const lexend = Lexend({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lexend',
})

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: any) {
    return (
        <main className={cn(inter.variable, lexend.variable, 'font-sans')}>
            <Component {...pageProps} />
        </main>
    )
}
