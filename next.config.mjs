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
                source: '/explanations/vulnerability-management/false-positive-detection',
                destination:
                    '/explanations/vulnerability-management/reduce-false-positives',
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
                source: '/how-to-guides/vulnerability-management/vex-rules',
                destination: '/how-to-guides/vex/vex-rules',
                permanent: true,
            },
            {
                source: '/how-to-guides/vex/cel-reference',
                destination: '/reference/vex-cel-reference',
                permanent: true,
            },
            {
                source: '/how-to-guides/vex/mechanical-justifications',
                destination:
                    '/how-to-guides/vex#choose-a-mechanical-justification',
                permanent: true,
            },
            {
                source: '/how-to-guides/vexing/vexing-debian-packages',
                destination: '/how-to-guides/vex/prove-not-affected',
                permanent: true,
            },
            {
                source: '/how-to-guides/vexing',
                destination: '/how-to-guides/vex',
                permanent: true,
            },
            {
                source: '/how-to-guides/compliance/generate-vex-documents',
                destination: '/how-to-guides/vex/export-vex',
                permanent: true,
            },
            {
                source: '/how-to-guides/compliance/generate-csaf-reports',
                destination:
                    '/how-to-guides/vulnerability-management/csaf-common-security-advisory-framework',
                permanent: true,
            },
            {
                source: '/tutorials/compliance/generating-csaf-reports',
                destination:
                    '/how-to-guides/vulnerability-management/csaf-common-security-advisory-framework',
                permanent: true,
            },
            {
                source: '/explanations/vulnerability-management/external-vuln-sync',
                destination:
                    '/how-to-guides/vulnerability-management/sync-external-data',
                permanent: true,
            },
            {
                source: '/reference/api/cve',
                destination: '/reference/api/cve-database',
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
