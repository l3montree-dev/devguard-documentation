import * as React from 'react'
import { Loader2, Search } from 'lucide-react'

import { cn } from '@/lib/utils'

interface InputProps extends React.ComponentProps<'input'> {
    isLoading?: boolean
    onSearchClick?: () => void
}

function Input({
    className,
    type,
    placeholder,
    isLoading,
    onSearchClick,
    ...props
}: InputProps) {
    return (
        <div className={cn('group relative', className)}>
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2" />
            <input
                type={type}
                placeholder={placeholder}
                data-slot="input"
                className={cn(
                    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 border-input file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 disabled:bg-input/50 dark:bg-input/30 dark:disabled:bg-input/80 h-12 w-full min-w-0 rounded-md border bg-transparent py-0 pl-10 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-[3px] md:text-lg',
                    onSearchClick ? 'pr-24' : 'pr-2.5',
                )}
                {...props}
            />
            {onSearchClick && (
                <button
                    type="submit"
                    disabled={isLoading}
                    onClick={onSearchClick}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 absolute top-1/2 right-1.5 inline-flex h-9 -translate-y-1/2 items-center gap-1.5 rounded-sm px-3 text-sm font-medium transition-colors disabled:opacity-50"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Search className="h-4 w-4" />
                    )}
                    <span className="hidden sm:inline">Search</span>
                </button>
            )}
        </div>
    )
}

export { Input }
