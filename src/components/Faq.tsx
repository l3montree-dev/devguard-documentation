import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'

type Faq = {
    question: string
    answer: React.ReactNode
}

interface FaqProps {
    faqs: Faq[]
}

export default function Faq({ faqs }: FaqProps) {
    return (
        <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl">
                <dl className="mt-16 divide-y divide-white/10">
                    {faqs.map((faq) => (
                        <Disclosure
                            key={faq.question}
                            as="div"
                            className="py-6 first:pt-0 last:pb-0"
                        >
                            <dt>
                                <DisclosureButton className="group flex w-full items-start justify-between text-left text-white">
                                    <span className="text-base/7 font-semibold">
                                        {faq.question}
                                    </span>
                                    <span className="ml-6 flex h-7 items-center">
                                        <PlusSmallIcon
                                            aria-hidden="true"
                                            className="size-6 group-data-[open]:hidden"
                                        />
                                        <MinusSmallIcon
                                            aria-hidden="true"
                                            className="size-6 group-[&:not([data-open])]:hidden"
                                        />
                                    </span>
                                </DisclosureButton>
                            </dt>
                            <DisclosurePanel as="dd" className="mt-2 pr-12">
                                {faq.answer}
                            </DisclosurePanel>
                        </Disclosure>
                    ))}
                </dl>
            </div>
        </div>
    )
}
