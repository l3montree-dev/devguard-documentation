import { Button } from './button'
import { Container } from './container'
import { Link } from './link'

export default function Hero() {
    return (
        <div className="relative">
            <div className="from-28% absolute inset-2 bottom-0 rounded-xl bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#FFFFFF] to-[#FCBE25] ring-1 ring-inset ring-black/5 sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))] md:inset-12" />
            <Container className="relative">
                <div className="pb-20 pt-16 sm:pt-24 md:pb-32 md:pt-32">
                    <h1 className="text-balance text-6xl/[0.9] font-semibold tracking-tight text-background sm:text-8xl/[0.8] md:text-9xl/[0.8]">
                        Develop Secure Software.
                    </h1>
                    <p className="mt-8 max-w-lg text-xl/7 font-medium text-background/75 sm:text-2xl/8">
                        DevGuard seamlessly integrates security into your
                        software development lifecycle, making security
                        practices accessible and efficient for all, regardless
                        of expertise.
                    </p>
                    <div className="mt-12 flex flex-col gap-x-6 gap-y-4 sm:flex-row">
                        <Link href="/introduction">
                            <Button variant="secondary">Read the docs</Button>
                        </Link>
                        <Link
                            href="https://cal.com/frederic-noppe/15min"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button variant="outline">
                                Join the alpha program
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}
