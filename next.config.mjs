// Legacy Nextra docs-theme config (kept for reference during migration):
// import nextra from 'nextra'
//
// const withNextra = nextra({
//     theme: 'nextra-theme-docs',
//     themeConfig: './theme.config.tsx',
// })
//
// export default withNextra({ ... })

import { withMarkdownWebBook } from '@document-writing-tools/kernux-theme/withMarkdownWebBook'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))


const config = withMarkdownWebBook({
    env: {
        DWT_DEFAULT_LOCALE: 'en',
    },
    trailingSlash: true,
    compiler: {
        removeConsole: false,
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false }
        config.resolve.alias['react'] = path.resolve(
        __dirname,
        'node_modules/react',
        )
        config.resolve.alias['react-dom'] = path.resolve(
        __dirname,
        'node_modules/react-dom',
        )
        return config
    },
    basePath: process.env.BASE_PATH,
    async redirects() {
        return [
            {
                source: '/introduction',
                destination: '/',
                permanent: true,
            },
            {
                source: '/concept-guides/container-hardening/process',
                destination: '/tutorials/container-hardening/process',
                permanent: true,
            },
            {
                source: '/concept-guides/container-hardening/cve-decision',
                destination: '/tutorials/container-hardening/cve-decision',
                permanent: true,
            },
            {
                source: '/imprint',
                destination: 'https://l3montree.com/impressum',
                permanent: false,
            },
        ]
    },
})

export default config
