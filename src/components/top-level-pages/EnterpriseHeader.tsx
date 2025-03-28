import { Container } from './container'
import { Heading, Lead } from './text'

export default function EnterpriseHeader() {
    return (
        <Container className="mt-16">
            <Heading className="text-white" as="h1">
                Pricing that grows with your team size.
            </Heading>
            <Lead className="mt-6 max-w-3xl text-gray-400">
                Companies all over the world have closed millions of deals with
                Radiant. Sign up today and start selling smarter.
            </Lead>
        </Container>
    )
}
