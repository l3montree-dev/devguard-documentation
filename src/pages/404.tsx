import NotFoundPage from '@/components/404'
import type { GetStaticProps } from 'next'
import Head from 'next/head'

const TITLE = 'Page Not Found - DevGuard Documentation'
const DESCRIPTION =
    'The page you are looking for does not exist on the DevGuard documentation site. Return to the DevGuard homepage or use the search to find what you need.'

interface Props {
    title: string
}

export default function NotFound() {
    return (
        <>
            <Head>
                <meta name="description" content={DESCRIPTION} />
                <meta name="robots" content="noindex,nofollow" />
                <meta property="og:title" content={TITLE} />
                <meta property="og:description" content={DESCRIPTION} />
                <meta property="og:image" content="/og-image.png" />
                <meta property="og:type" content="website" />
            </Head>
            <style jsx global>{`
                #sidebar,
                #toc {
                    display: none !important;
                }
                .min-h-svh {
                    min-height: fit-content !important;
                }
            `}</style>
            <NotFoundPage />
        </>
    )
}

export const getStaticProps: GetStaticProps<Props> = () => ({
    props: { title: TITLE },
})
