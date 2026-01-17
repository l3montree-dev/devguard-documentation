import Image from 'next/image'

const navigation = {
    product: [
        { name: 'Getting started', href: '/getting-started' },
        { name: 'How to Guides', href: '/how-to-guides' },
    {
            name: 'Core Concepts',
            href: '/explanations/core-concepts/what-is-devguard',
        },
        {
            name: 'Administration',
            href: '/how-to-guides/administration',
        },
        { name: 'Contributing', href: '/contributing/getting-started' },
    ],
    support: [
        {
            name: 'Submit ticket',
            href: 'https://github.com/l3montree-dev/devguard/issues',
        },
        { name: 'Documentation', href: '/introduction' },
        {
            name: 'Risk Mitigation Guides',
            href: '/how-to-guides/risk-mitigation-guides',
        },
        {
            name: 'Status Page',
            href: 'https://status.devguard.org',
        },
    ],
    company: [
        {
            name: 'Homepage (DE)',
            href: 'https://l3montree.com/',
        },
        {
            name: 'Publications (DE)',
            href: 'https://l3montree.com/publikationen',
        },
        { name: 'Jobs', href: 'https://join.com/companies/l3montree' },
    ],
    legal: [
        { name: 'Imprint', href: 'https://l3montree.com/impressum' },
        { name: 'Privacy policy', href: '/privacy-policy' },
        {
            name: 'License',
            href: 'https://github.com/l3montree-dev/devguard/blob/main/LICENSE.txt',
        },
        {
            name: 'Terms of Use (SaaS)',
            href: '/terms-of-use',
        },
    ],
    social: [
        {
            name: 'GitHub',
            href: 'https://github.com/l3montree-dev/',
            icon: '/github-icon.svg',
        },
        {
            name: 'GitLab',
            href: 'https://gitlab.com/l3montree/devguard',
            icon: '/gitlab-icon-white.svg',
        },
        {
            name: 'openCode',
            href: 'https://gitlab.opencode.de/l3montree',
            icon: '/opencode-icon-white.svg',
        },
    ],
}

export default function Footer() {
    return (
        <footer className="bg-[#161B23]">
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Image
                            width={200}
                            height={50}
                            alt="DevGuard Logo"
                            src="/logo_inverse_horizontal.svg"
                            className="h-12 w-auto"
                        />
                        <p className="text-balance text-sm/6 text-gray-300">
                            The bond between the most important building blocks
                            of software security - simple, powerful & European
                            <span className="ml-2 text-xl">🇪🇺</span>
                        </p>
                        <div className="flex gap-x-6">
                            {navigation.social.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="hover:opacity-50"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="sr-only">{item.name}</span>
                                    <Image
                                        src={item.icon}
                                        alt={item.name}
                                        width={24}
                                        height={24}
                                        className="h-6 w-6 opacity-80"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm/6 font-semibold text-white">
                                    Product
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.product.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm/6 text-gray-400 hover:text-white"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm/6 font-semibold text-white">
                                    Support
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.support.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm/6 text-gray-400 hover:text-white"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm/6 font-semibold text-white">
                                    Company
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.company.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm/6 text-gray-400 hover:text-white"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm/6 font-semibold text-white">
                                    Legal
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.legal.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm/6 text-gray-400 hover:text-white"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-sm/6 text-gray-400">
                        © {new Date().getFullYear()} L3montree GmbH and the
                        DevGuard Contributors
                    </p>
                </div>
            </div>
        </footer>
    )
}
