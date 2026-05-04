import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'

export interface FAQ {
    question: string
    answer: string
}

interface FAQProps {
    faqs: FAQ[]
    title?: string
}

export default function FAQSection({
    faqs,
    title = 'Frequently asked questions',
}: FAQProps) {
    const [open, setOpen] = useState<number | null>(null)

    return (
        <div className="relative z-10 mx-auto max-w-4xl py-24 sm:py-32">
            <h2 className="text-foreground text-xl font-semibold tracking-tight">
                {title}
            </h2>
            <dl className="divide-border mt-12 divide-y">
                {faqs.map((faq, i) => (
                    <div
                        key={faq.question}
                        className="py-6 first:pt-0 last:pb-0"
                    >
                        <dt>
                            <button
                                type="button"
                                className="text-foreground flex w-full items-start justify-between text-left"
                                onClick={() => setOpen(open === i ? null : i)}
                                aria-expanded={open === i}
                            >
                                <span className="text-sm font-semibold">
                                    {faq.question}
                                </span>
                                <span className="ml-6 flex h-7 shrink-0 items-center">
                                    {open === i ? (
                                        <Minus
                                            className="size-4"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <Plus
                                            className="size-4"
                                            aria-hidden="true"
                                        />
                                    )}
                                </span>
                            </button>
                        </dt>
                        {open === i && (
                            <dd className="mt-2 pr-12">
                                <p className="text-muted-foreground text-sm">
                                    {faq.answer}
                                </p>
                            </dd>
                        )}
                    </div>
                ))}
            </dl>
        </div>
    )
}
