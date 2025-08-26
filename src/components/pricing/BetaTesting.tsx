import {
    AdjustmentsHorizontalIcon,
    TicketIcon,
    UsersIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Button } from '../top-level-pages/button'
import Image from 'next/image'

const features = [
    {
        name: 'Shape DevGuard',
        description:
            'Membership in the DevGuard Beta program allows you to help shape DevGuard from the early days. Your feedback and comments carry weight, and we work together to create an open-source solution for secure software development. ',
        href: '#',
        icon: AdjustmentsHorizontalIcon,
    },
    {
        name: 'Priority support & direct collaboration',
        description:
            'In the DevGuard Beta program, we are working hand in hand on the future of secure software development. We rely on feedback and discussions from real users. If you experience any problems or need help, our development team is directly available for you. We meet regularly to discuss how we can best support each other.',
        href: '#',
        icon: UsersIcon,
    },
    {
        name: 'Discounts on future plans',
        description:
            'The Beta program is open to companies and larger teams. As a thank you for your participation, we offer discounts on future plans. This way, you can benefit from the full potential of DevGuard at a reduced price.',
        href: '#',
        icon: TicketIcon,
    },
]

export default function BetaTesting() {
    return (
        <div className="pb-20 pt-24 sm:pt-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl lg:mx-0">
                    <h2 className="text-pretty text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        DevGuard Beta Testing Programm 🇪🇺🚀
                    </h2>
                    <p className="mt-6 text-lg/8 text-gray-300">
                        We are currently accepting applications for our public
                        Beta testing program. Be the first to experience
                        DevGuard, shape it with your feedback, and help us make
                        it better.
                    </p>
                </div>
                <div className="mt-12">
                    <Link
                        href="https://cal.com/frederic-noppe/15min"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button
                            variant={'default'}
                            data-umami-event="cta-join-alpha"
                        >
                            Schedule a meeting
                        </Button>
                    </Link>
                </div>
                <div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex flex-col">
                                <dt className="text-base/7 font-semibold text-white">
                                    <div className="mb-6 flex size-10 items-center justify-center rounded-lg ring-1 ring-l3-500">
                                        <feature.icon
                                            aria-hidden="true"
                                            className="size-6 text-white"
                                        />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-1 flex flex-auto flex-col text-base/7 text-gray-300">
                                    <p className="flex-auto">
                                        {feature.description}
                                    </p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
                <div className="flex justify-between py-16 opacity-60 max-sm:mx-auto max-sm:max-w-md max-sm:flex-wrap max-sm:justify-evenly max-sm:gap-x-4 max-sm:gap-y-10 sm:py-24">
                    <Image
                        alt="Transistor"
                        src="/sponsors/sp-owasp.svg"
                        className="h-9 max-sm:mx-auto sm:h-8 lg:h-10"
                        height={200}
                        width={200}
                    />
                    <Image
                        alt="Laravel"
                        src="/sponsors/sp-hbrs.svg"
                        className="h-9 max-sm:mx-auto sm:h-8 lg:h-10"
                        height={200}
                        width={200}
                    />
                    <Image
                        alt="Tuple"
                        src="/sponsors/sp-jlu.svg"
                        className="h-9 max-sm:mx-auto sm:h-8 lg:h-10"
                        height={200}
                        width={200}
                    />
                    <Image
                        alt="SavvyCal"
                        src="/sponsors/sp-ikor.svg"
                        height={200}
                        width={200}
                        className="h-9 max-sm:mx-auto sm:h-8 lg:h-10"
                    />
                    <Image
                        alt="Statamic"
                        src="/sponsors/sp-wheregroup.svg"
                        className="h-9 max-sm:mx-auto sm:h-8 lg:h-10"
                        height={200}
                        width={200}
                    />
                </div>
            </div>
        </div>
    )
}
