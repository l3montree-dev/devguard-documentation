import { Container } from './container'
import { Screenshot } from './screenshot'
import { Heading } from './text'

export default function FeatureSection() {
    return (
        <div className="overflow-hidden">
            <Container className="p-24">
                <Heading as="h2" className="max-w-3xl text-white">
                    Software Development Lifecycle Posture Assessment.
                </Heading>
                <Screenshot
                    width={1216}
                    height={768}
                    src="/screenshots/dashboard.png"
                    className="mt-16 h-[36rem] sm:h-auto sm:w-[76rem]"
                />
            </Container>
        </div>
    )
}
