import Link from 'next/link'
import { Container } from './container'
import { Heading, Lead, Subheading } from './text'
import Image from 'next/image'
import { AnimatedNumber } from './animated-number'

export default function MissionSection() {
    return (
        <Container className="pb-40 pt-24">
            <Heading className="text-white" as="h2">
                Helping FOSS Projects & Enterprises
            </Heading>
            <Lead className="mt-6 max-w-2xl text-gray-400">
                We&apos;re on a mission to transform the way software is
                developed and secured.
            </Lead>
            <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
                <div className="max-w-lg">
                    <h2 className="text-2xl font-medium tracking-tight">
                        Our mission
                    </h2>
                    <p className="mt-6 text-sm/6 text-gray-400">
                        DevGuard aims to make application security easier and
                        more accessible for developers. By integrating essential
                        security tools such as SCA, secret scanning, and
                        container scanning into a single CLI, DevGuard is
                        designed to reduce the burden on developers while
                        seamlessly fitting into dev workflows. Our goal is to
                        help developers build secure software without the need
                        for specialized security knowledge.
                    </p>
                    <p className="mt-2 text-sm/6 text-gray-400">
                        Our team,{' '}
                        <Link
                            href="https://l3montree.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-l3-400 underline hover:text-l3-500"
                        >
                            L3montree
                        </Link>
                        , is a small but highly dedicated startup focused on
                        software security, cloud-native security, and
                        open-source software consulting and implementation.
                        Founded by a group of friends during our computer
                        science studies, we are passionate about building a
                        secure and equitable digital future for everyone. Our
                        strong commitment to open-source values and security
                        drives us to collaborate with the community, public
                        institutions and private organizations alike.
                    </p>
                    <p className="mt-2 text-sm/6 text-gray-400">
                        DevGuard is free for other open source projects. Get in
                        touch with us to learn more. We are happy to help. To
                        appreciate the work of FOSS maintainers, we decided to
                        return a part of our revenue of DevGuard to the open
                        source projects we use and rely on.
                    </p>
                </div>
                <div className="pt-20 lg:row-span-2 lg:-mr-16 xl:mr-auto">
                    <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
                        <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                            <Image
                                alt=""
                                src="/company/1.png"
                                className=""
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
                            <Image
                                alt=""
                                src="/company/2.png"
                                className=""
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className="aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10">
                            <Image
                                alt=""
                                src="/company/3.png"
                                className=""
                                width={400}
                                height={400}
                            />
                        </div>
                        <div className="-mt-8 aspect-square overflow-hidden rounded-xl shadow-xl outline-1 -outline-offset-1 outline-black/10 lg:-mt-32">
                            <Image
                                alt=""
                                src="/company/4.png"
                                className=""
                                width={400}
                                height={400}
                            />
                        </div>
                    </div>
                </div>
                <div className="max-lg:mt-16 lg:col-span-1">
                    <Subheading className="text-l3-400">The Numbers</Subheading>
                    <hr className="mt-6 border-t border-gray-200" />
                    <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                            <dt className="text-sm/6 text-gray-400">
                                Aggregated data sources
                            </dt>
                            <dd className="order-first text-6xl font-medium tracking-tight">
                                +<AnimatedNumber start={10} end={22} />
                            </dd>
                        </div>
                        <div className="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4">
                            <dt className="text-sm/6 text-gray-400">
                                Records of known vulnerabilities
                            </dt>
                            <dd className="order-first text-6xl font-medium tracking-tight">
                                +<AnimatedNumber start={250} end={300} />K
                            </dd>
                        </div>
                        <div className="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-200 max-sm:pb-4">
                            <dt className="text-sm/6 text-gray-400">
                                Factor of possible cost savings when fixing
                                flaws early in dev compared to fixing in
                                production
                            </dt>
                            <dd className="order-first text-6xl font-medium tracking-tight">
                                x<AnimatedNumber start={10} end={28} />
                            </dd>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <dt className="text-sm/6 text-gray-400">
                                Enterprises currently in alpha programme
                            </dt>
                            <dd className="order-first text-6xl font-medium tracking-tight">
                                <AnimatedNumber start={1} end={10} />
                            </dd>
                        </div>
                    </dl>
                </div>
            </section>
        </Container>
    )
}
