// Copyright 2025 Zentrum für Digitale Souveränität der Öffentlichen Verwaltung (ZenDiS) GmbH.
// SPDX-License-Identifier: 	AGPL-3.0-or-later

import { XMarkIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useState } from 'react'

export default function FrosconTalkBanner() {
    const [showBanner, setShowBanner] = useState(true)

    return (
        <>
            {showBanner && (
                <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 sm:flex sm:justify-center sm:px-6 sm:pb-5 lg:px-8">
                    <div className="pointer-events-auto flex items-center justify-between gap-x-4 bg-bgSecondary px-6 py-2.5 ring-1 ring-inset ring-bgSecondary/20 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
                        <p className="text-sm/6 text-white">
                            <Link
                                href="https://media.ccc.de/v/froscon2025-3322-develop_secure_software_-_the_devguard_project"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-white/80"
                            >
                                <strong className="font-semibold">
                                    FrOSCon 2025 ❤️
                                </strong>
                                {' - '}
                                Watch the talk about DevGuard (German)
                            </Link>
                        </p>
                        <button
                            type="button"
                            className="-m-1.5 flex-none p-1.5"
                            onClick={() => setShowBanner(false)}
                        >
                            <span className="sr-only">Dismiss</span>
                            <XMarkIcon
                                aria-hidden="true"
                                className="size-5 text-white"
                            />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
