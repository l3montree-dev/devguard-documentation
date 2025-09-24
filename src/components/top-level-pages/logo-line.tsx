import Image from 'next/image'
import { cn } from '../../lib/utils'

export function LogoLine({ inverted = false }: { inverted?: boolean }) {
    return (
        <div className="flex flex-wrap justify-center gap-x-[100px] gap-y-[100px] max-sm:gap-x-4 max-sm:gap-y-4">
            <a
                href="https://owasp.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    alt="OWASP Logo"
                    src="/sponsors/sp-owasp.svg"
                    className={cn(inverted && 'invert')}
                    width={300}
                    height={100}
                    style={{
                        flex: '0 0 auto',
                        width: '200px',
                        height: '100px',
                    }}
                />
            </a>

            <a
                href="https://ikor.one"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    alt="Ikor Logo"
                    src="/sponsors/sp-ikor.svg"
                    className={cn(inverted && 'invert')}
                    width={300}
                    height={100}
                    style={{
                        flex: '0 0 auto',
                        width: '200px',
                        height: '100px',
                    }}
                />
            </a>

            <a
                href="https://h-brs.de"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    alt="HBRS Logo"
                    src="/sponsors/sp-hbrs.svg"
                    className={cn(inverted && 'invert')}
                    width={300}
                    height={100}
                    style={{
                        flex: '0 0 auto',
                        width: '200px',
                        height: '100px',
                    }}
                />
            </a>

            <a
                href="https://www.uni-giessen.de/de"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    alt="JLU Logo"
                    src="/sponsors/sp-jlu.svg"
                    className={cn(inverted && 'invert')}
                    width={300}
                    height={100}
                    style={{
                        flex: '0 0 auto',
                        width: '200px',
                        height: '100px',
                    }}
                />
            </a>

            <a
                href="https://wheregroup.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    alt="Wheregroup Logo"
                    src="/sponsors/sp-wheregroup.svg"
                    className={cn(inverted && 'invert')}
                    width={300}
                    height={100}
                    style={{
                        flex: '0 0 auto',
                        width: '200px',
                        height: '100px',
                    }}
                />
            </a>

            <a
                href="https://businesscode.de"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    alt="BusinessCode Logo"
                    src="/sponsors/bc-logo-white.png"
                    className={cn(inverted && 'invert')}
                    width={300}
                    height={100}
                    style={{ flex: '0 0 auto', width: '200px', height: '40px' }}
                />
            </a>

            <a
                href="https://www.cps-it.de/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Image
                    alt="CPS Logo"
                    src="/sponsors/CPS_Logo_weiß.png"
                    className={cn(inverted && 'invert')}
                    width={300}
                    height={100}
                    style={{
                        flex: '0 0 auto',
                        width: '200px',
                        height: '100px',
                    }}
                />
            </a>
        </div>
    )
}
