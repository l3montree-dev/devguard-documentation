const HATCH_PATTERN =
    'h-8 border-t border-b border-t-(--grid-line-color) border-b-(--grid-line-color) bg-[repeating-linear-gradient(315deg,var(--grid-line-color)_0,var(--grid-line-color)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed opacity-80'

const FULL_WIDTH_CLASSES = 'relative left-1/2 w-screen ml-[-50vw]'

interface HatchBarProps {
    fullWidth?: boolean
    /** Full-width on mobile, constrained to parent at lg+ */
    fullWidthMobileOnly?: boolean
    className?: string
}

export default function HatchBar({
    fullWidth = false,
    fullWidthMobileOnly = false,
    className = '',
}: HatchBarProps) {
    const widthClasses = fullWidth
        ? FULL_WIDTH_CLASSES
        : fullWidthMobileOnly
          ? `${FULL_WIDTH_CLASSES} lg:left-auto lg:ml-0 lg:w-auto`
          : ''
    return (
        <div
            className={`pointer-events-none z-10 block ${HATCH_PATTERN} ${widthClasses} ${className}`}
        />
    )
}
