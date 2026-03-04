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
        <footer className="custom:bg-[#161B23]">
            <div className="custom:mx-auto custom:max-w-7xl custom:px-6 custom:pb-8 custom:pt-16 custom:sm:pt-24 custom:lg:px-8 custom:lg:pt-32">
                <div className="custom:xl:grid custom:xl:grid-cols-3 custom:xl:gap-8">
                    <div className="custom:space-y-8">
                        <Image
                            width={200}
                            height={50}
                            alt="DevGuard Logo"
                            src="/logo-inverse-horizontal.svg"
                            className="custom:h-12 custom:w-auto"
                        />
                        <p className="custom:text-balance custom:text-sm/6 custom:text-gray-300">
                            The bond between the most important building blocks
                            of software security - simple, powerful & European
                            <span className="custom:ml-2 custom:text-xl">🇪🇺</span>
                        </p>
                        <div className="custom:flex custom:gap-x-6">
                            {navigation.social.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="custom:hover:opacity-50"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="custom:sr-only">{item.name}</span>
                                    <Image
                                        src={item.icon}
                                        alt={item.name}
                                        width={24}
                                        height={24}
                                        className="custom:h-6 custom:w-6 custom:opacity-80"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="custom:mt-16 custom:grid custom:grid-cols-2 custom:gap-8 custom:xl:col-span-2 custom:xl:mt-0">
                        <div className="custom:md:grid custom:md:grid-cols-2 custom:md:gap-8">
                            <div>
                                <h3 className="custom:text-sm/6 custom:font-semibold custom:text-white">
                                    Product
                                </h3>
                                <ul role="list" className="custom:mt-6 custom:space-y-4">
                                    {navigation.product.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="custom:text-sm/6 custom:text-gray-400 custom:hover:text-white"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="custom:mt-10 custom:md:mt-0">
                                <h3 className="custom:text-sm/6 custom:font-semibold custom:text-white">
                                    Support
                                </h3>
                                <ul role="list" className="custom:mt-6 custom:space-y-4">
                                    {navigation.support.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="custom:text-sm/6 custom:text-gray-400 custom:hover:text-white"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="custom:md:grid custom:md:grid-cols-2 custom:md:gap-8">
                            <div>
                                <h3 className="custom:text-sm/6 custom:font-semibold custom:text-white">
                                    Company
                                </h3>
                                <ul role="list" className="custom:mt-6 custom:space-y-4">
                                    {navigation.company.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="custom:text-sm/6 custom:text-gray-400 custom:hover:text-white"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="custom:mt-10 custom:md:mt-0">
                                <h3 className="custom:text-sm/6 custom:font-semibold custom:text-white">
                                    Legal
                                </h3>
                                <ul role="list" className="custom:mt-6 custom:space-y-4">
                                    {navigation.legal.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="custom:text-sm/6 custom:text-gray-400 custom:hover:text-white"
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
                <div className="custom:mt-16 custom:border-t custom:border-white/10 custom:pt-8 custom:sm:mt-20 custom:lg:mt-24">
                    <p className="custom:text-sm/6 custom:text-gray-400">
                        © {new Date().getFullYear()} L3montree GmbH and the
                        DevGuard Contributors
                    </p>
                </div>
            </div>
        </footer>
    )
}
