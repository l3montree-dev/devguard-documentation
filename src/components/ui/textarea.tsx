import * as React from 'react'

import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
    return (
        <textarea
            className={cn(
                'custom:flex custom:min-h-[80px] custom:w-full custom:resize-none custom:rounded-md custom:border custom:border-input custom:bg-background custom:px-3 custom:py-2 custom:text-base custom:ring-offset-background custom:placeholder:text-muted-foreground custom:focus-visible:outline-none custom:focus-visible:ring-2 custom:focus-visible:ring-ring custom:focus-visible:ring-offset-2 custom:disabled:cursor-not-allowed custom:disabled:opacity-50 custom:md:text-sm',
                className,
            )}
            ref={ref}
            {...props}
        />
    )
})
Textarea.displayName = 'Textarea'

export { Textarea }
