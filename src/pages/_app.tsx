// DWT theme styles must be imported first so project overrides take precedence
import { cn } from '@/lib/utils'
import Layout, { findPage } from '@document-writing-tools/kernux-theme'
import { useRouter } from 'next/router'
import { pageMap } from '../../pageMap'
import themeConfig from '../theme-config'
import { inter, lexend } from '../fonts'
import '../styles/globals.css'



export default function MyApp({ Component, pageProps }: any) {
    const router = useRouter()
    const page = findPage(pageMap, router.pathname)
    const frontMatter = page?.frontMatter ?? {}
    const toc = page?.toc ?? []
    const title = frontMatter.title ?? pageProps.title ?? ''

    const pageOpts = {
        pageMap,
        frontMatter,
        title,
        filePath: router.pathname,
    }

    return (
        <div className={cn(inter.variable, lexend.variable)}>
            {/* Edge grid patterns – global, hidden on mobile */}
            <div className="pointer-events-none fixed inset-y-0 left-0 z-10 hidden w-8 border-r border-r-(--grid-line-color) bg-[repeating-linear-gradient(315deg,var(--grid-line-color)_0,var(--grid-line-color)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed opacity-80 lg:block" />
            <div className="pointer-events-none fixed inset-y-0 right-0 z-10 hidden w-8 border-l border-l-(--grid-line-color) bg-[repeating-linear-gradient(315deg,var(--grid-line-color)_0,var(--grid-line-color)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed opacity-80 lg:block" />
            <Layout pageOpts={pageOpts} themeConfig={themeConfig}>
                <Component {...pageProps} toc={toc} />
            </Layout>
        </div>
    )
}
