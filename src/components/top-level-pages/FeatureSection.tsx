import { Container } from './container'
import { Screenshot } from './screenshot'
import { Heading, Subheading } from './text'

export default function FeatureSection() {
    return (
        <div className="overflow-hidden">
            <Container className="flex flex-col items-center justify-center p-36">
                <Subheading className="text-center text-l3-400">
                    For your Code & Dependencies
                </Subheading>
                <Heading as="h2" className="mt-2 text-center text-white">
                    Central Vulnerability Management
                </Heading>

                <Screenshot
                    width={1216}
                    height={702}
                    src="/screenshots/management.png"
                    className="mt-16 h-[36rem] sm:h-auto sm:w-[76rem]"
                />
            </Container>
        </div>
    )
}
