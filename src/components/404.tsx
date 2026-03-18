import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'

export default function NotFoundPage() {
    return (
        <>
            <main className="grid place-items-center px-6 sm:py-32 lg:px-8">
                <div className="text-center">
                    <Image
                        src="/404-gopher.png"
                        alt="404 Not Found"
                        width={500}
                        height={500}
                        className="mx-auto h-48 w-auto"
                    />
                    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                        Page not found
                    </h1>
                    <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                        Sorry, we couldn&apos;t find the page you&apos;re
                        looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link href="/introduction">
                            <Button
                                variant="default"
                                className="rounded-sm !text-black"
                            >
                                Back to documentation
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}
