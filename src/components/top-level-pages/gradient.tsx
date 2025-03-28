import { clsx } from 'clsx'

export function Gradient({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) {
    return (
        <div
            {...props}
            className={clsx(
                className,
                'from-28% bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#FFFFFF] to-[#FCBE25] sm:bg-[linear-gradient(145deg,var(--tw-gradient-stops))]',
            )}
        />
    )
}

export function GradientBackground() {
    return (
        <div className="relative mx-auto max-w-7xl">
            <div
                className={clsx(
                    'opacity-15',
                    'absolute -right-60 -top-44 h-60 w-[36rem] transform-gpu md:right-0',
                    'from-12% bg-[linear-gradient(115deg,var(--tw-gradient-stops))] from-[#FFFFFF] to-[#FCBE25]',
                    'rotate-[-10deg] rounded-full blur-3xl',
                )}
            />
        </div>
    )
}
