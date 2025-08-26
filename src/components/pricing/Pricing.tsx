import { PlusIcon } from '@heroicons/react/16/solid'
import { Button } from '../top-level-pages/button'

const tiers = [
    {
        name: 'Open Source',
        description:
            'Fully-fledged solution with community support. Free of charge for every FLOSS project.',
        priceMonthly: 'Free',
        href: 'mailto:community@devguard.org?subject=DevGuard%20Inquiry%20-%20Open%20Source%20Project',
        highlights: [
            {
                description:
                    'Lifetime access for public projects with OSI approved license',
            },
            { description: 'All features included' },
            { description: 'Community Support' },
        ],
    },
    {
        name: 'Business SaaS',
        description:
            'The carefree package, ideal for organizations that want to get started quickly with a high-performance service.',
        priceMonthly: 'tba',
        href: 'mailto:community@devguard.org?subject=DevGuard%20Inquiry%20-%20Business%20Saas',
        highlights: [
            { description: 'Fully managed DevGuard hosted in Germany 🇩🇪' },
            { description: 'Sovereign open source software' },
            { description: 'Core team from Europe 🇪🇺' },
            { description: 'Unlimited users' },
            { description: 'Initial 4 hours setup workshop' },
            { description: '8x5 E-Mail Support Hours' },
            { description: 'Option for custom domains' },
        ],
    },
    {
        name: 'Enterprise Maintenance & Support',
        description:
            'With SLA and support options for operation in your infrastructure. Ideal for large organizations or the security domain.',
        priceMonthly: 'Custom',
        href: 'mailto:community@devguard.org?subject=DevGuard%20Inquiry%20-%20Enterprise%20Maintenance%20%26%20Support',
        highlights: [
            { description: 'DevGuard in your data center or cloud' },
            { description: 'Sovereign open source software' },
            { description: 'Core team from Europe 🇪🇺' },
            { description: 'Unlimited users, projects & assets' },
            { description: 'Custom maintenance contract' },
            { description: 'Custom support & training' },
            { description: 'Custom SLA' },
            { description: 'Priority phone support' },
            {
                description: 'Customization for special requirements',
            },
            {
                description: 'Help with setting up the infrastructure',
            },
        ],
    },
]

export default function Pricing() {
    return (
        <div className="pt-24 sm:pt-32">
            <div className="mx-auto max-w-4xl px-6 max-lg:text-center lg:max-w-7xl lg:px-8">
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-pretty">
                    Secure Software Development & Pricing made easy
                </h1>
                <p className="mt-6 max-w-2xl text-pretty text-lg font-medium text-gray-400 max-lg:mx-auto sm:text-xl/8">
                    Protect your code with confidence — DevGuard simplifies
                    secure software development while offering flexible pricing
                    tailored to your needs.
                </p>
            </div>
            <div className="relative py-16 sm:py-20">
                <div className="absolute inset-x-0 bottom-0 top-48 bg-[radial-gradient(circle_at_center_center,#FFFFFF,#FDCC5F,#0C1117_70%)] lg:bg-[radial-gradient(circle_at_center_150%,#FFFFFF,#FDCC5F,#0C1117_70%)]" />
                <div className="relative mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                        {tiers.map((tier) => (
                            <div
                                key={tier.name}
                                className="-m-2 grid grid-cols-1 rounded-[2rem] shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md"
                            >
                                <div className="grid grid-cols-1 rounded-[2rem] p-2 shadow-md shadow-black/5">
                                    <div className="rounded-3xl bg-bgSecondary p-10 pb-9 shadow-2xl ring-1 ring-black/5">
                                        <h2 className="text-sm font-semibold text-l3-500">
                                            {tier.name}{' '}
                                            <span className="sr-only">
                                                plan
                                            </span>
                                        </h2>
                                        <p className="mt-2 text-pretty text-sm/6 text-gray-400">
                                            {tier.description}
                                        </p>

                                        <div className="mt-10 flex items-center gap-4">
                                            <div className="text-5xl font-semibold text-white">
                                                {tier.priceMonthly}
                                            </div>
                                            {tier.priceMonthly !== 'Free' &&
                                                tier.priceMonthly !==
                                                    'Custom' && (
                                                    <div className="text-sm text-gray-400">
                                                        <p>Starting at</p>
                                                        <p>EUR net per month</p>
                                                    </div>
                                                )}
                                        </div>
                                        <div className="mt-10">
                                            <a href={tier.href}>
                                                <Button
                                                    variant={'ghost'}
                                                    aria-label={`Start a free trial on the ${tier.name} plan`}
                                                    className="ring-1 ring-l3-600"
                                                >
                                                    Coming soon - contact us
                                                </Button>
                                            </a>
                                        </div>
                                        <div className="mt-8">
                                            <h3 className="text-sm/6 font-medium text-white">
                                                What’s included
                                            </h3>
                                            <ul className="mt-3 space-y-3">
                                                {tier.highlights.map(
                                                    (highlight) => (
                                                        <li
                                                            key={
                                                                highlight.description
                                                            }
                                                            className="group flex items-start gap-4 text-sm/6 text-gray-400"
                                                        >
                                                            <span className="inline-flex h-6 items-center">
                                                                <PlusIcon
                                                                    aria-hidden="true"
                                                                    className="size-4 fill-gray-400"
                                                                />
                                                            </span>
                                                            {
                                                                highlight.description
                                                            }
                                                        </li>
                                                    ),
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-14 flex flex-col items-start gap-x-8 gap-y-6 rounded-3xl bg-bgSecondary/80 p-8 ring-2 ring-gray-100/20 sm:gap-y-10 sm:p-10 lg:col-span-2 lg:flex-row lg:items-center">
                        <div className="lg:min-w-0 lg:flex-1">
                            <h3 className="text-iwhite text-base/7 font-semibold">
                                We return at least 5% of DevGuard&apos;s profit
                                to the open source community ❤️
                            </h3>
                            <p className="mt-1 text-base/7 text-gray-400">
                                Like all software (whether proprietary junk or
                                awesome FLOSS), DevGuard is based on a lot of
                                OSS dependencies and other projects. We are
                                therefore committed to a minimum contribution to
                                the community. To this end, we will publish a
                                report once a year that discloses which projects
                                we have supported and how.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
