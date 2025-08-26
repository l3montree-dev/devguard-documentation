import Link from 'next/link'
import { Button } from './button'
import { Container } from './container'
import { Gradient } from './gradient'

export function CallToAction() {
    return (
        <Gradient className="relative">
            <Container>
                <div className="relative pb-16 pt-20 text-center sm:py-24">
                    <hgroup>
                        <p className="mt-6 text-3xl font-medium tracking-tight text-gray-950 sm:text-5xl">
                            Ready to dive in?
                            <br />
                            Become an beta tester today.
                        </p>
                    </hgroup>
                    <p className="mx-auto mt-6 max-w-md text-sm/6 text-gray-700">
                        We are currently accepting applications for our public
                        beta testing program. Be the first to experience
                        DevGuard, shape it with your feedback, and help us make
                        it better.
                    </p>
                    <div className="mt-6 flex justify-center gap-x-4">
                        <Link
                            href="https://cal.com/frederic-noppe/15min"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant={'secondary'}
                                data-umami-event="cta-join-alpha"
                            >
                                Schedule a meeting
                            </Button>
                        </Link>
                        <Link
                            href="mailto:info@l3montree.com?cc=frederic.noppe@l3montree.com&subject=DevGuard%20Testing-Programm%20"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                variant={'secondary'}
                                data-umami-event="cta-join-alpha-mail"
                            >
                                Write an E-Mail
                            </Button>
                        </Link>
                    </div>
                </div>
            </Container>
        </Gradient>
    )
}
