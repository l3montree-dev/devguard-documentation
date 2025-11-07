import { Button } from './button'
import { Container } from './container'
import { Link } from './link'

export default function Hero() {
    return (
        <div className="relative">
            <div className="from-28% absolute inset-2 bottom-0 rounded-xl bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#FFFFFF] to-[#FCBE25] ring-1 ring-inset ring-black/5 sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))] md:inset-12" />
            <Container className="relative">
                <div className="px-0 pb-20 pt-16 max-md:pl-6 sm:pt-24 md:px-12 md:pb-32 md:pt-32 2xl:px-0">
                    <h1 className="break-words text-6xl font-semibold leading-tight tracking-tight text-background sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight lg:text-7xl xl:text-8xl">
                        Develop Secure
                        <br />
                        Software.
                    </h1>
                    <h2 className="font-regular mt-6 break-words text-2xl leading-tight tracking-tight text-background sm:text-3xl md:text-4xl md:leading-tight">
                        Get full transparency of your <br /> software supply
                        chain.
                    </h2>

                    <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
                        <Link
                            href="https://app.devguard.org/login"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="secondary"
                                data-umami-event="look-at-devguard"
                            >
                                Try DevGuard
                            </Button>
                        </Link>
                        <Link href="/introduction">
                            <Button
                                variant="secondary"
                                data-umami-event="hero-to-docs"
                            >
                                Read the docs
                            </Button>
                        </Link>
                        <Link
                            href="https://matrix.to/#/#devguard:matrix.org"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant="outline"
                                data-umami-event="Support"
                            >
                                Support (Element Chat)
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}
