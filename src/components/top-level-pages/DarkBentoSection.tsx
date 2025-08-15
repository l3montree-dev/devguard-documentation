import { BentoCard } from './bento-card'
import { Container } from './container'
import { Heading, Subheading } from './text'

export default function DarkBentoSection() {
    return (
        <div className="mx-12 mt-2 rounded-2xl bg-bgSecondary py-32 max-sm:mx-4 max-sm:py-16">
            <Container>
                <Subheading className="text-l3-400">
                    Devs Peace of Mind
                </Subheading>
                <Heading as="h3" dark className="mt-2 max-w-3xl text-white">
                    Built for developers
                </Heading>

                <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-1">
                    <BentoCard
                        eyebrow="CI Components & Workflows"
                        title="Integrate in your CI"
                        description="DevGuard is designed to be developer-friendly, with a focus on ease of use and integration."
                        graphic={
                            <div className="h-80 bg-[url(/screenshots/snipet.png)] bg-[size:851px_344px] bg-no-repeat" />
                        }
                        className="lg:rounded-bl-4xl lg:col-span-2"
                    />
                    <BentoCard
                        eyebrow="Sync with GitHub, GitLab & more"
                        title="Manage in your Tickets"
                        description="You can easily manage vulnerabilities in your issue tracker. Use slash commands to mitigate vulnerabilities, and stay in your workflow."
                        graphic={
                            <div className="h-80 bg-[url(/screenshots/tickets.png)] bg-[size:851px_344px] bg-no-repeat" />
                        }
                        fade={['top']}
                        className="max-lg:rounded-b-4xl lg:rounded-br-4xl lg:col-span-4"
                    />
                </div>
            </Container>
        </div>
    )
}
