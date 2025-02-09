import React from 'react'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'
import Image from 'next/image'
import { useRouter } from 'next/router'

const config: DocsThemeConfig = {
    head() {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { asPath, defaultLocale, locale } = useRouter()
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { frontMatter, ...rest } = useConfig()
        const url =
            'https://devguard.org' +
            (defaultLocale === locale ? asPath : `/${locale}${asPath}`)

        return (
            <>
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
            </>
        )
    },
    banner: {
        key: 'development',
        content: (
            <a
                href="https://github.com/l3montree-dev/devguard"
                target="_blank"
                rel="noopener noreferrer"
            >
                🚧 DevGuard & this page is under active development. Visit the
                DevGuard Repo →
            </a>
        ),
        dismissible: false,
    },
    logo: (
        <Image
            src="/logo_inverse_horizontal.svg"
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
        'https://github.com/l3montree-dev/devguard-documentation',
    backgroundColor: {
        dark: '12,17,23',
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
        content: (
            <div className="flex w-full flex-col items-center text-sm sm:items-start">
                <div className="grid grid-cols-2 gap-4">
                    <a
                        className="text-l3-400 hover:text-l3-500"
                        title="Impressum"
                        href="https://l3montree.com/impressum"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>Imprint</span>
                    </a>
                    <a
                        className="text-l3-400 hover:text-l3-500"
                        title="Datenschutz"
                        href="https://l3montree.com/datenschutz"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>Privacy Statement</span>
                    </a>
                </div>
                <p className="mt-6 max-w-xl">
                    Except where otherwise noted, content on this site is
                    licensed under a{' '}
                    <a
                        target="_blank"
                        className="text-l3-400 hover:text-l3-500"
                        rel="noopener noreferrer"
                        href="https://github.com/l3montree-dev/devguard-docs/blob/main/LICENSE-docs.md"
                    >
                        Creative Commons Attribution 4.0 International
                    </a>{' '}
                    license. Icons by{' '}
                    <a
                        target="_blank"
                        className="text-l3-400 hover:text-l3-500"
                        rel="noopener noreferrer"
                        href="https://heroicons.com"
                    >
                        Heroicons
                    </a>
                    . The &apos;l3montree&apos; name and logo are trademarks of
                    L3montree UG (haftungsbeschränkt).
                </p>
                <p className="mt-4">
                    © {new Date().getFullYear()} L3montree UG
                    (haftungsbeschränkt) and the DevGuard Contributors
                </p>
            </div>
        ),
    },
}

export default config
