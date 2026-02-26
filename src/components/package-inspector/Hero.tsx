
import { Shield } from 'lucide-react'
import { Container } from '../ui/container'

export function PackageInspectorHero() {
    return (
        <div className="relative">
            <div className="absolute inset-14 bottom-10 rounded-xl bg-gradient-to-r from-gray-950 to-black ring-1 ring-inset ring-white/10" />
            <Container className="relative">
                <div className="px-0 pb-12 pt-16 text-center max-md:pl-2 sm:pt-20 md:px-12 md:pb-16 md:pt-24 2xl:px-0">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">
                        <Shield className="h-4 w-4" />
                        Powered by DevGuard
                    </div>
                    <h1 className="text-5xl font-semibold leading-tight tracking-tight text-white/90">
                        Package Inspector
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
                        Analyze the security state of open-source packages. Get
                        insights on maintenance, vulnerabilities, and supply
                        chain risks.
                    </p>
                </div>
            </Container>
        </div>
    )
}
