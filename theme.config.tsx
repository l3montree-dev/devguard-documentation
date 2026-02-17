import React from 'react'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Footer from './src/components/Footer'

const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID
const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL

const config: DocsThemeConfig = {
    head() {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { asPath, defaultLocale, locale } = useRouter()
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { frontMatter, ...rest } = useConfig()
        const url =
            'https://docs.devguard.org' +
            (defaultLocale === locale ? asPath : `/${locale}${asPath}`)

        return (
            <>
                <link rel="canonical" href={url} />
                <meta property="og:url" content={url} />
                <meta
                    property="og:title"
                    content={
                        (frontMatter.title ?? rest.title) + ' | DevGuard' ||
                        'DevGuard'
                    }
                />
                <title>
                    {(frontMatter.title ?? rest.title) + ' | DevGuard' ||
                        'DevGuard'}
                </title>
                {frontMatter.description && (
                    <meta
                        name="description"
                        content={frontMatter.description}
                    />
                )}
                {Boolean(websiteId) && Boolean(umamiUrl) && (
                    <script
                        defer
                        src={umamiUrl}
                        data-website-id={websiteId}
                    ></script>
                )}
            </>
        )
    },

    logo: (
        <Image
            src="/logo-inverse-horizontal.svg"
            alt="DevGuard Logo"
            width={220}
            height={80}
            className="h-12 w-auto"
        />
    ),
    sidebar: {
        defaultMenuCollapseLevel: 1,
    },
    project: {
        link: 'https://github.com/l3montree-dev/devguard',
    },
    docsRepositoryBase:
        'https://github.com/l3montree-dev/devguard-documentation/tree/main',
    backgroundColor: {
        dark: '13,17,22',
        light: '240,242,245',
    },
    color: {
        hue: {
            dark: 43,
            light: 229,
        },
        saturation: {
            dark: 96,
            light: 100,
        },
        lightness: {
            dark: 56,
            light: 47,
        },
    },
    darkMode: false,
    nextThemes: {
        defaultTheme: 'dark',
        forcedTheme: 'dark',
    },
    footer: {
        component: <Footer />,
    },
}

export default config
