import { Container } from './container'
import { Screenshot } from './screenshot'
import { Heading, Subheading } from './text'

export default function FeatureSection() {
    return (
        <div className="overflow-hidden">
            <Container className="p-36">
                <Subheading className="text-l3-400 sm:text-center">
                    For your Code & Dependencies
                </Subheading>
                <Heading as="h2" className="mt-2 text-white sm:text-center">
                    Central Vulnerability Management
                </Heading>
                <div className="flex flex-col items-center justify-center">
                    <Screenshot
                        width={1216}
                        height={702}
                        src="/screenshots/management.png"
                        className="mt-8 h-auto sm:mt-16 sm:w-[76rem]"
                    />
                </div>
            </Container>
        </div>
    )
}
