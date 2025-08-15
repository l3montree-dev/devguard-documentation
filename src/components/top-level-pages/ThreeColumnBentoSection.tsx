import Image from 'next/image'
import { Container } from './container'
import { Subheading, Heading } from './text'

export default function ThreeColumnBentoSection() {
    return (
        <Container className="pb-36">
            <Subheading className="text-l3-400">
                Insights & Innovation
            </Subheading>
            <Heading as="h2" className="mt-2 max-w-3xl text-white">
                Advanced Security Features
            </Heading>
            <div className="mx-auto max-w-2xl lg:max-w-7xl">
                <div className="grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
                    <div className="relative lg:row-span-2">
                        <div className="absolute inset-px rounded-lg bg-bgSecondary lg:rounded-l-[1rem]" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(1rem+1px)]">
                            <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                                <p className="mt-2 text-lg font-semibold tracking-tight text-white max-lg:text-center">
                                    Advanced Risk Assessment
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-muted-foreground max-lg:text-center">
                                    Based on your Environment (CVSS-BE),
                                    additional data about Exploits and exploit
                                    probability, and more - DevGuard provides
                                    you with a real risk assessment where most
                                    findings are deprioritized.
                                </p>
                            </div>
                            <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                                <div className="absolute inset-x-10 bottom-0 top-10 overflow-hidden rounded-t-lg outline outline-1 outline-white/10">
                                    <Image
                                        width={400}
                                        height={1200}
                                        alt="Screenshot of the DevGuard Risk Assessment per CVE"
                                        src="/screenshots/risk-assessment.png"
                                        className="size-full object-cover object-top"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow outline outline-1 outline-white/15 lg:rounded-l-[1rem]" />
                    </div>
                    <div className="relative max-lg:row-start-1">
                        <div className="absolute inset-px rounded-lg bg-bgSecondary max-lg:rounded-t-[1rem]" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(1rem+1px)]">
                            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                <p className="mt-2 text-lg font-semibold tracking-tight text-gray-950 dark:text-white max-lg:text-center">
                                    Sharing in your Org & Beyond (VEX)
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-muted-foreground max-lg:text-center">
                                    DevGuard enables you to share your
                                    management decisions accross your org. You
                                    can easily share to your customers using the
                                    VEX standard.
                                </p>
                            </div>
                            <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                                <Image
                                    width={400}
                                    height={1200}
                                    alt="Screenshot of the DevGuard Risk Assessment per CVE"
                                    src="/screenshots/sharing-actions.png"
                                    className="my-4 h-auto w-full rounded-lg outline outline-1 outline-white/10"
                                />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow outline outline-1 outline-white/15 max-lg:rounded-t-[1rem]" />
                    </div>
                    <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
                        <div className="absolute inset-px rounded-lg bg-bgSecondary" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                            <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                                <p className="mt-2 text-lg font-semibold tracking-tight text-gray-950 dark:text-white max-lg:text-center">
                                    Powerful SBOM & SARIF APIs
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-muted-foreground max-lg:text-center">
                                    Use your arbitrary SBOM or SARIF data (e.g.
                                    from your already bought SAST Tool) and
                                    manage using DevGuard.
                                </p>
                            </div>
                            <div className="isolate overflow-hidden">
                                <div className="flex flex-1 items-center [container-type:inline-size] max-lg:py-6 lg:pb-2">
                                    <Image
                                        width={1200}
                                        height={400}
                                        alt=""
                                        src="/screenshots/sarif-sbom-icons.svg"
                                        className="my-2 h-[min(152px,40cqw)]"
                                    />
                                </div>
                                <svg
                                    viewBox="0 0 1024 1024"
                                    aria-hidden="true"
                                    className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                                >
                                    <circle
                                        r={512}
                                        cx={512}
                                        cy={512}
                                        fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                                        fillOpacity="0.3"
                                    />
                                    <defs>
                                        <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                                            <stop stopColor="#161B23" />
                                            <stop
                                                offset={1}
                                                stopColor="#FBBD25"
                                            />
                                        </radialGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow outline outline-1 outline-white/15" />
                    </div>
                    <div className="relative lg:row-span-2">
                        <div className="absolute inset-px rounded-lg bg-bgSecondary max-lg:rounded-b-[1rem] lg:rounded-r-[1rem]" />
                        <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(1rem+1px)] lg:rounded-r-[calc(1rem+1px)]">
                            <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                                <p className="mt-2 text-lg font-semibold tracking-tight text-white max-lg:text-center">
                                    X-Ray your Dependencies
                                </p>
                                <p className="mt-2 max-w-lg text-sm/6 text-muted-foreground max-lg:text-center">
                                    DevGuard provides you with insights into
                                    your dependencies. Inlcuding licenses, the
                                    location in your dependency tree, OpenSSF
                                    Scorecard data, GitHub Stars/ Forks/ Issues
                                    and more.
                                </p>
                            </div>
                            <div className="relative min-h-[30rem] w-full grow">
                                <div className="absolute bottom-0 left-10 right-0 top-10 overflow-hidden rounded-tl-lg bg-gray-900 shadow-2xl outline outline-1 outline-white/10 dark:bg-gray-900/60 dark:shadow-none">
                                    <div className="flex bg-gray-900 outline outline-1 outline-white/5">
                                        <Image
                                            width={400}
                                            height={1200}
                                            alt="Screenshot of the DevGuard Risk Assessment per CVE"
                                            src="/screenshots/scorecards.png"
                                            className="h-full w-auto object-cover object-top"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow outline outline-1 outline-white/15 max-lg:rounded-b-[1rem] lg:rounded-r-[1rem]" />
                    </div>
                </div>
            </div>
        </Container>
    )
}
