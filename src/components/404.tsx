import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'

export default function NotFoundPage() {
    return (
        <>
            <main className="custom:grid custom:min-h-full custom:place-items-center custom:bg-[#0C0F14] custom:px-6 custom:py-24 custom:sm:py-32 custom:lg:px-8">
                <div className="custom:text-center">
                    <Image
                        src="/404-gopher-dark.png"
                        alt="404 Not Found"
                        width={500}
                        height={500}
                        className="custom:mx-auto custom:h-48 custom:w-auto"
                    />
                    <h1 className="custom:mt-4 custom:text-balance custom:text-4xl custom:font-semibold custom:tracking-tight custom:text-white custom:sm:text-5xl">
                        Page not found
                    </h1>
                    <p className="custom:mt-6 custom:text-pretty custom:text-lg custom:font-medium custom:text-gray-400 custom:sm:text-xl/8">
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                    <div className="custom:mt-10 custom:flex custom:items-center custom:justify-center custom:gap-x-6">
                        <Link href="/introduction">
                            <Button
                                variant="secondary"
                                className="custom:bg-l3-400 custom:!text-black custom:hover:bg-l3-500"
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
