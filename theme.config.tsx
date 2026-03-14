import React from 'react'
import type { KernuxThemeConfig } from '@document-writing-tools/kernux-nextra-theme'
import { useConfig } from '@document-writing-tools/kernux-nextra-theme'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Footer from './src/components/Footer'
import Script from 'next/script'

const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL

const config: Partial<KernuxThemeConfig> = {
    defaultLocale: 'en',
    umbrellaHeader: false,
    umbrellaFooter: false,
    project: {
        link: 'https://github.com/l3montree-dev/devguard-documentation',
    },
    head: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { asPath, defaultLocale, locale } = useRouter()
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { frontMatter, title } = useConfig()
        const url =
            'https://docs.devguard.org' +
            (defaultLocale === locale ? asPath : `/${locale}${asPath}`)
        const pageTitle = (frontMatter.title ?? title) + ' | DevGuard'

        return (
            <>
                <meta httpEquiv="content-language" content="en" />
                <link rel="canonical" href={url} />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={pageTitle} />
                <title>{pageTitle}</title>
                {frontMatter.description && (
                    <meta
                        name="description"
                        content={frontMatter.description as string}
                    />
                )}
                {Boolean(websiteId) && Boolean(umamiUrl) && (
                    <Script defer src={umamiUrl} data-website-id={websiteId} />
                )}
            </>
        )
    },
    logo: (
        <span aria-label="DevGuard - Back to homepage">
            <Image
                src="/logo-inverse-horizontal.svg"
                alt="DevGuard Logo"
                width={220}
                height={80}
                className="h-12 w-auto"
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
