import Image from 'next/image'
import { cn } from '../../lib/utils'

export function LogoLine({ inverted = false }: { inverted?: boolean }) {
    return (
        <div
            className={
                'flex justify-between max-sm:mx-auto max-sm:max-w-md max-sm:flex-wrap max-sm:justify-evenly max-sm:gap-x-4 max-sm:gap-y-8'
            }
        >
            <Image
                alt="OWASP Logo"
                src="/sponsors/sp-owasp.svg"
                className={cn(
                    inverted && 'invert',
                    'h-9 w-auto max-sm:mx-auto sm:h-8 lg:h-11',
                )}
                width={300}
                height={100}
            />
            <Image
                alt="Ikor part of X1 Logo"
                src="/sponsors/sp-ikor.svg"
                className={cn(
                    inverted && 'invert',
                    'h-9 w-auto max-sm:mx-auto sm:h-8 lg:h-11',
                )}
                width={300}
                height={100}
            />
            <Image
                alt="Bonn-Rhein-Sieg University of Applied Sciences Logo"
                src="/sponsors/sp-hbrs.svg"
                className={cn(
                    inverted && 'invert',
                    'h-9 w-auto max-sm:mx-auto sm:h-8 lg:h-11',
                )}
                width={300}
                height={100}
            />
            <Image
                alt="University of Giessen Logo"
                src="/sponsors/sp-jlu.svg"
                className={cn(
                    inverted && 'invert',
                    'h-9 w-auto max-sm:mx-auto sm:h-8 lg:h-11',
                )}
                width={300}
                height={100}
            />
            <Image
                alt="Wheregroup Logo"
                src="/sponsors/sp-wheregroup.svg"
                className={cn(
                    inverted && 'invert',
                    'h-9 w-auto max-sm:mx-auto sm:h-8 lg:h-11',
                )}
                width={300}
                height={100}
            />
        </div>
    )
}
