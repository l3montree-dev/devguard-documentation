import * as React from 'react'
import { Loader2 } from 'lucide-react'

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
        <div className={cn('relative', className)}>
            <input
                type={type ?? 'text'}
                placeholder={placeholder}
                className="text-muted-foreground file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring aria-invalid:ring-destructive/20 aria-invalid:border-destructive border-searchbar-border bg-searchbar-background flex h-12 w-full rounded-md border px-5 py-1 text-sm shadow-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                {...props}
            />
            {onSearchClick && (
                <button
                    type="submit"
                    disabled={isLoading}
                    onClick={onSearchClick}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 absolute top-1/2 right-2 inline-flex h-9 -translate-y-1/2 cursor-pointer items-center gap-1.5 rounded-sm px-3 font-medium transition-colors disabled:opacity-50"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : null}
                    <span>Search</span>
                </button>
            )}
        </div>
    )
}

export { Input }
