import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'

export default function NotFoundPage() {
    return (
        <>
            <main className="grid min-h-full place-items-center bg-[#0C0F14] px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <Image
                        src="/404-gopher-dark.png"
                        alt="404 Not Found"
                        width={500}
                        height={500}
                        className="mx-auto h-48 w-auto"
                    />
                    <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                        Page not found
                    </h1>
                    <p className="mt-6 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link href="/introduction">
                            <Button
                                variant="secondary"
                                className="bg-l3-400 !text-black hover:bg-l3-500"
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
