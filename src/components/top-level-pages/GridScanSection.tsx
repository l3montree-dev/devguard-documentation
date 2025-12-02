import Link from 'next/link'
import { Container } from './container'
import { GridScan } from './grid-scan'
import { Button } from './button'

export default function GridScanSection() {
    return (
        <div className="pb-28">
            <Container className="">
                <div className="relative h-[500px] w-full overflow-hidden rounded-xl bg-bgSecondary/50 ring-1 ring-inset ring-white/10">
                    <GridScan
                        sensitivity={0.55}
                        lineThickness={1}
                        linesColor="#FCCE5C"
                        gridScale={0.1}
                        scanColor="#FCC743"
                        scanOpacity={0.3}
                        enablePost
                        bloomIntensity={0.6}
                        chromaticAberration={0.0}
                        noiseIntensity={0.01}
                    />
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                        <h2 className="text-balance text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                            X-Ray your Dependencies
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-pretty text-center text-lg/8 text-gray-200">
                            DevGuard provides you with insights into your
                            dependencies. Inlcuding licenses, the location in
                            your dependency tree, OpenSSF Scorecard data, GitHub
                            Stars/ Forks/ Issues and more.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="https://app.devguard.org/login"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="default"
                                    data-umami-event="look-at-devguard"
                                >
                                    Try DevGuard
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
