import { clsx } from 'clsx'
import Image from 'next/image'

export function Screenshot({
    width,
    height,
    src,
    className,
}: {
    width: number
    height: number
    src: string
    className?: string
}) {
    return (
        <div
            style={
                { '--width': width, '--height': height } as React.CSSProperties
            }
            className={clsx(
                className,
                'relative aspect-[var(--width)/var(--height)] rounded-lg',
            )}
        >
            <div className="shadow-xs absolute -inset-3 rounded-lg shadow-red-500 ring-1 ring-white/5" />
            <Image
                width={width}
                height={height}
                alt=""
                src={src}
                className="h-full rounded-lg shadow-2xl shadow-l3-500/10 ring-1 ring-white/10"
            />
        </div>
    )
}
