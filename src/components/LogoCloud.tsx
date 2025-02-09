import Image from 'next/image'

export default function LogoCloud() {
    return (
        <div className="mt-12">
            <div className="mx-auto max-w-7xl">
                <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
                    <div className="bg-dg-300 p-8 sm:p-10">
                        <a
                            href="https://owasp.org/www-project-devguard/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                alt="OWASP"
                                src="/sponsors/sp-owasp.svg"
                                width={158}
                                height={48}
                                className="max-h-12 w-full object-contain"
                            />
                        </a>
                    </div>
                    <div className="bg-dg-300 p-6 sm:p-10">
                        <a
                            href="https://ikor.one/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                alt="Ikor One"
                                src="/sponsors/sp-ikor.svg"
                                width={158}
                                height={48}
                                className="max-h-12 w-full object-contain"
                            />
                        </a>
                    </div>
                    <div className="bg-dg-300 p-6 sm:p-10">
                        <a
                            href="https://www.h-brs.de/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                alt="Hochschule Bonn-Rhein-Sieg"
                                src="/sponsors/sp-hbrs.svg"
                                width={158}
                                height={48}
                                className="max-h-12 w-full object-contain"
                            />
                        </a>
                    </div>
                    <div className="bg-dg-300 p-6 sm:p-10">
                        <a
                            href="https://gitlab.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                alt="GitLab"
                                src="/sponsors/sp-gitlab.svg"
                                width={158}
                                height={48}
                                className="max-h-12 w-full object-contain"
                            />
                        </a>
                    </div>
                    <div className="bg-dg-300 p-6 sm:p-10">
                        <a
                            href="https://wheregroup.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                alt="WhereGroup"
                                src="/sponsors/sp-wheregroup.svg"
                                width={158}
                                height={48}
                                className="max-h-12 w-full object-contain"
                            />
                        </a>
                    </div>
                    <div className="bg-dg-300 p-6 sm:p-10">
                        <a
                            href="https://digitalhub.de/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                alt="DIGITALHUB.DE"
                                src="/sponsors/sp-digitalhub.svg"
                                width={158}
                                height={48}
                                className="max-h-12 w-full object-contain"
                            />
                        </a>
                    </div>
                    <div className="bg-dg-300 p-6 sm:p-10">
                        <a
                            href="https://wetteronline.de/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                alt="Wetteronline"
                                src="/sponsors/sp-wetteronline.svg"
                                width={158}
                                height={48}
                                className="max-h-12 w-full object-contain"
                            />
                        </a>
                    </div>
                    <div className="bg-dg-300 p-6 sm:p-10">
                        <a
                            href="https://www.uni-giessen.de/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                alt="Universität Gießen"
                                src="/sponsors/sp-jlu.svg"
                                width={158}
                                height={48}
                                className="max-h-12 w-full object-contain"
                            />
                        </a>
                    </div>
                    <div className="bg-dg-300 p-6 sm:p-10">
                        <a
                            href="https://l3montree.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                alt="L3montree"
                                src="/sponsors/sp-l3montree.svg"
                                width={158}
                                height={48}
                                className="max-h-12 w-full object-contain"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
