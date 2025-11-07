import { BentoCard } from './bento-card'
import { Container } from './container'
import { LinkedAvatars } from './linked-avatars'
import { LogoCluster } from './logo-cluster'
import { Heading, Subheading } from './text'
import { Map } from './map'

export default function BentoSection() {
    return (
        <Container>
            <Subheading className="text-l3-400">
                Security & Compliance
            </Subheading>
            <Heading as="h3" className="mt-2 max-w-3xl text-white">
                Bridging Software Security and Compliance. With ease.
            </Heading>
            <p className="max-full mt-8 text-xl/7 font-medium text-white sm:text-2xl/8">
                DevGuard seamlessly integrates security into your
                software-development lifecycle, making security practices
                accessible and efficient for all, regardless of expertise.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
                <BentoCard
                    eyebrow="OWASP DevSecOps"
                    title="Get AppSec done with ease"
                    description="No need for hours of configuration or research. DevGuard provides you with a full OWASP DevSecOps pipeline, advanced supply chain security, and more."
                    graphic={
                        <div className="h-80 bg-[url(/screenshots/team.png)] bg-[size:1000px_560px] bg-no-repeat max-sm:bg-[left_-100px_top_0px]" />
                    }
                    fade={['bottom']}
                    className="max-lg:rounded-t-4xl lg:rounded-tl-4xl lg:col-span-3"
                />
                <BentoCard
                    eyebrow="Compliance & Audit"
                    title="Automated Tracking, Documentation & Reporting"
                    description="As a developer you love to code - probably not hasseling with compliance. DevGuard provides a pre-release checklist, prioritized todos, and a full audit trail."
                    graphic={
                        <div className="absolute inset-0 bg-[url(/screenshots/compliance-symbol.png)] bg-[size:1100px_650px] bg-[left_-40px_top_-100px] bg-no-repeat max-sm:bg-[left_-200px_top_-100px]" />
                    }
                    fade={['bottom']}
                    className="lg:rounded-tr-4xl lg:col-span-3"
                />
                <BentoCard
                    eyebrow="Automated setup"
                    title="Get started in seconds"
                    description="DevGuard is easy to set up. Use the auto setup for your GitLab Instance or GitHub or just add a few lines to your CI pipeline and you're good to go."
                    graphic={<LinkedAvatars />}
                    className="lg:rounded-bl-4xl lg:col-span-2"
                />
                <BentoCard
                    eyebrow="Made in Germany & EU"
                    title="Open Source Licensed"
                    description="The core team behind DevGuard is based in Bonn, Germany. We are committed to open source. Especially when it comes to security."
                    graphic={<Map />}
                    className="max-lg:rounded-b-4xl lg:rounded-br-4xl lg:col-span-2"
                />
                <BentoCard
                    eyebrow="Integrations"
                    title="Use with your favorite tools"
                    description="Keep using your favorite tools. DevGuard integrates with all major continous integration pipelines & software development tools."
                    graphic={<LogoCluster />}
                    className="lg:col-span-2"
                />
            </div>
        </Container>
    )
}
