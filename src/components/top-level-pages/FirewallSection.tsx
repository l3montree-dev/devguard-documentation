import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'
import { Container } from './container'
import Lightning from './lightning'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { Button } from './button'

export default function FirewallSection() {
    return (
        <Container className="pb-36">
            <div className="relative isolate overflow-hidden rounded-2xl py-16 ring-1 ring-white/15 sm:py-24">
                <div className="absolute inset-0 -z-10 max-sm:opacity-30">
                    <Lightning
                        hue={39}
                        xOffset={-0.1}
                        speed={0.5}
                        intensity={0.5}
                        size={1.5}
                        backgroundColor="#0D1017"
                    />
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-16">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        <div className="max-w-xl lg:max-w-lg">
                            <Badge variant="upcoming">
                                Upcoming Feature 🎉
                            </Badge>
                            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white">
                                Dependency Firewall
                            </h2>
                            <p className="mt-4 text-base text-gray-300">
                                DevGuard will soon introduce a Dependency
                                Firewall, blocking the install of known
                                malicious packages. It will support npm and GO.
                            </p>
                        </div>
                        <div></div>
                        <dl className="flex items-center justify-end">
                            <div className="flex flex-col items-end text-right">
                                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                    <HandRaisedIcon
                                        aria-hidden="true"
                                        className="size-6 text-white"
                                    />
                                </div>
                                <dt className="mt-4 text-base font-semibold text-white">
                                    Prevent Supply Chain Attacks
                                </dt>
                                <dd className="mt-2 text-sm/6 text-gray-400">
                                    Prevent attacks like the recent Shai Hulud
                                    incident. Protect your software supply chain
                                    by blocking malicious dependencies before
                                    they reach your codebase.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </Container>
    )
}
