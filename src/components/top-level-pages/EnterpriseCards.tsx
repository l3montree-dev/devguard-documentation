import { PlusIcon } from '@heroicons/react/20/solid'
import { tiers } from '../../data'
import { Button } from './button'
import { Container } from './container'
import { Gradient } from './gradient'
import { Subheading } from './text'
import { LogoLine } from './logo-line'
import { cn } from '../../lib/utils'

function FeatureItem({
    description,
    disabled = false,
}: {
    description: string
    disabled?: boolean
}) {
    return (
        <li
            className={cn(
                disabled && 'opacity-40',
                'data-disabled:text-gray-400/25 flex items-start gap-4 text-sm/6 text-gray-400',
            )}
        >
            <span className="inline-flex h-6 items-center">
                <PlusIcon className="size-[0.9375rem] shrink-0 fill-gray-400/50" />
            </span>
            {disabled && <span className="sr-only">Not included:</span>}
            {description}
        </li>
    )
}

function PricingCard({ tier }: { tier: (typeof tiers)[number] }) {
    return (
        <div className="-m-2 grid grid-cols-1 rounded-xl shadow-[inset_0_0_2px_1px_#ffffff4d] ring-1 ring-black/5 max-lg:mx-auto max-lg:w-full max-lg:max-w-md">
            <div className="grid grid-cols-1 rounded-xl p-2 shadow-md shadow-black/5">
                <div className="rounded-xl bg-bgSecondary p-10 pb-9 shadow-2xl ring-1 ring-black/5">
                    <Subheading className="text-l3-400">{tier.name}</Subheading>
                    <p className="mt-2 text-sm/6 text-gray-400">
                        {tier.description}
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                        <div className="text-5xl font-medium text-white">
                            ${tier.priceMonthly}
                        </div>
                        <div className="text-sm/5 text-gray-400">
                            <p>USD</p>
                            <p>per month</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <Button>Start a free trial</Button>
                    </div>
                    <div className="mt-8">
                        <h3 className="text-sm/6 font-medium text-white">
                            Start selling with:
                        </h3>
                        <ul className="mt-3 space-y-3">
                            {tier.highlights.map((props, featureIndex) => (
                                <FeatureItem key={featureIndex} {...props} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function EnterpriseCards() {
    return (
        <div className="relative py-24">
            <Gradient className="absolute inset-x-12 bottom-0 top-48 rounded-xl ring-1 ring-inset ring-black/5" />
            <Container className="relative">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {tiers.map((tier, tierIndex) => (
                        <PricingCard key={tierIndex} tier={tier} />
                    ))}
                </div>
                <div className="mt-24">
                    <LogoLine inverted={true} />
                </div>
            </Container>
        </div>
    )
}
