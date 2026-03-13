import { clsx } from 'clsx'

const gridClass = [
    'pointer-events-none inset-x-0 z-50 hidden lg:block h-8',
    'border-t border-b',
    'bg-[repeating-linear-gradient(315deg,var(--grid-line-color)_0,var(--grid-line-color)_1px,transparent_0,transparent_50%)]',
    'bg-[length:10px_10px] bg-fixed opacity-80',
].join(' ')

export function Container({
    className,
    showTopGrid = false,
    showBottomGrid = false,
    children,
}: {
    className?: string
    children: React.ReactNode
    showTopGrid?: boolean
    showBottomGrid?: boolean
}) {
    return (
        <>
            {showTopGrid && (
                <div
                    className={gridClass}
                    style={{ borderColor: 'var(--grid-line-color)' }}
                />
            )}
            <section className={clsx(className, 'px-6 lg:px-8')}>
                <div className="mx-auto max-w-2xl lg:max-w-7xl">{children}</div>
            </section>
            {showBottomGrid && (
                <div
                    className={gridClass}
                    style={{ borderColor: 'var(--grid-line-color)' }}
                />
            )}
        </>
    )
}
