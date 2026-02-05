import { Button } from './button'
import { Container } from './container'
import { Link } from './link'
import SplitText from '../SplitText'
import AnimatedContent from '../AnimatedContent'
import FloatingLines from '../FloatingLines'

export default function Hero() {
    return (
        <div className="relative flex min-h-[87vh] items-center justify-center overflow-hidden bg-dg-950 pt-10 md:pt-0">
            {/* Gradient Blinds Background */}
            <div className="absolute inset-0 opacity-90">
                <FloatingLines
                    linesGradient={['#fbbd23', '#fbbd23a', '#fbbd23']}
                    enabledWaves={['middle']}
                    // Array - specify line count per wave; Number - same count for all waves
                    lineCount={3}
                    // Array - specify line distance per wave; Number - same distance for all waves
                    lineDistance={25.5}
                    bendRadius={5}
                    bendStrength={-0.5}
                    interactive={false}
                    parallax={true}
                />
            </div>

            <Container className="relative z-10">
                {/* Radial blurred backdrop to improve text readability */}
                <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center blur-3xl" />
                <div className="z-10 flex flex-col items-center justify-center text-center">
                    {/* Main Headline with Split Text Animation */}
                    <div className="mb-2">
                        <SplitText
                            text="Develop Secure"
                            className="text-5xl font-medium tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl"
                            delay={30}
                            duration={0.8}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 50 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            tag="h1"
                            textAlign="center"
                        />
                    </div>
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-black/10 blur-3xl" />
                        <SplitText
                            text="Software."
                            className="text-5xl font-medium tracking-tight text-amber-300 sm:text-6xl md:text-7xl lg:text-8xl"
                            delay={30}
                            duration={0.8}
                            ease="power3.out"
                            splitType="chars"
                            from={{ opacity: 0, y: 50 }}
                            to={{ opacity: 1, y: 0 }}
                            threshold={0.1}
                            tag="h1"
                            textAlign="center"
                        />
                    </div>

                    {/* Shiny Subheadline */}
                    <AnimatedContent
                        distance={40}
                        direction="vertical"
                        duration={0.7}
                        delay={0.4}
                    >
                        <div className="max-w-3xl">
                            <div className="absolute inset-0 bg-black blur-2xl" />
                            <span className="font-base relative rounded-md p-2 text-2xl leading-relaxed tracking-tight">
                                Get full transparency of your
                                Software-Supply-Chain. Open Source.
                            </span>
                        </div>
                    </AnimatedContent>

                    {/* CTA Buttons */}
                    <AnimatedContent
                        distance={50}
                        direction="vertical"
                        duration={0.7}
                        delay={0.6}
                    >
                        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                            <Link
                                href="https://app.devguard.org/login"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="default"
                                    className="h-12 bg-white px-8 text-base font-semibold text-dg-950 hover:opacity-80"
                                    data-umami-event="look-at-devguard"
                                >
                                    Try DevGuard
                                </Button>
                            </Link>
                            <Link href="/introduction">
                                <Button
                                    variant="outline"
                                    className="h-12 border-white/30 px-8 text-base text-white hover:bg-white/10"
                                    data-umami-event="hero-to-docs"
                                >
                                    Read the docs
                                </Button>
                            </Link>

                            <Link
                                href="https://github.com/l3montree-dev/devguard"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="outline"
                                    className="h-12 border-white/30 px-8 text-base text-white hover:bg-white/10"
                                    data-umami-event="hero-github"
                                >
                                    <svg
                                        className="mr-2 h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    GitHub
                                </Button>
                            </Link>
                        </div>
                    </AnimatedContent>

                    {/* Feature highlights */}
                    <AnimatedContent
                        distance={60}
                        direction="vertical"
                        duration={0.7}
                        delay={0.8}
                    >
                        <div className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-4 text-base text-white">
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>Vulnerability Management</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>DevSecOps</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>Container Security</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                <span>Dependency Firewall</span>
                            </div>
                        </div>
                    </AnimatedContent>
                </div>
            </Container>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block">
                <AnimatedContent
                    distance={20}
                    direction="vertical"
                    duration={0.5}
                    delay={1.2}
                >
                    <div className="flex flex-col items-center gap-2 text-white/50">
                        <span className="text-xs uppercase tracking-widest">
                            Scroll
                        </span>
                        <div className="flex h-8 w-5 justify-center rounded-full border border-gray-500/50 pt-1.5">
                            <div className="h-2 w-1 animate-bounce rounded-full bg-gray-400" />
                        </div>
                    </div>
                </AnimatedContent>
            </div>
        </div>
    )
}
