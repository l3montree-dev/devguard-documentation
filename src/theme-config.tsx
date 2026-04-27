import type { KernuxThemeConfig } from '@document-writing-tools/kernux-theme'
import { Head } from '@document-writing-tools/kernux-theme'
import Image from 'next/image'
import Script from 'next/script'
import Footer from './components/Footer'

const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL

const config: Partial<KernuxThemeConfig> = {
    umbrellaHeader: false,
    umbrellaFooter: false,
    project: {
        link: 'https://github.com/l3montree-dev/devguard-documentation',
    },
    theme: {
        forcedTheme: 'dark',
    },
    head: (
        <Head>
            {Boolean(websiteId) && Boolean(umamiUrl) && (
                <Script defer src={umamiUrl} data-website-id={websiteId} />
            )}
        </Head>
    ),
    logo: (
        <span aria-label="DevGuard - Back to homepage">
            <Image
                src="/logo-inverse-horizontal.svg"
                alt="DevGuard Logo"
                width={130}
                height={47}
            />
        </span>
    ),
    sidebar: {
        defaultMenuCollapseLevel: 1,
        disable: false,
        toggleButton: true,
    },
    search: {
        placeholder: 'Search documentation...',
        error: 'Failed to load search index.',
    },
    footer: {
        component: <Footer />,
        links: [], // custom Footer component handles all links internally
    },
    toc: {
        title: 'On This Page',
        footer: (
            <a
                href="https://github.com/l3montree-dev/devguard-documentation/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="kern-link"
            >
                Question? Give us feedback →
            </a>
        ),
    },
    editPage: {
        enabled: true,
        repoBaseUrl:
            'https://github.com/l3montree-dev/devguard-documentation/tree/main',
        icon: 'none',
    },
}

export default config
