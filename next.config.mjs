import nextra from 'nextra'

const withNextra = nextra({
    theme: 'nextra-theme-docs',
    themeConfig: './theme.config.tsx',
})

export default withNextra({
    async redirects() {
        return [
        {
            source: "/concept-guides/container-hardening/process",
            destination: "/tutorials/container-hardening/process",
            permanent: true,
        },
        {   
            source: "/concept-guides/container-hardening/cve-decision",
            destination: "/tutorials/container-hardening/cve-decision",
            permanent: true,
        }
        ];
    },
})