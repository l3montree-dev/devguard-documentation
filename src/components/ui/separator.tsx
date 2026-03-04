import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'

import { cn } from '@/lib/utils'

const Separator = React.forwardRef<
    React.ElementRef<typeof SeparatorPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
    (
        { className, orientation = 'horizontal', decorative = true, ...props },
        ref,
    ) => (
        <SeparatorPrimitive.Root
            ref={ref}
            decorative={decorative}
            orientation={orientation}
            className={cn(
                'custom:shrink-0 custom:bg-border',
                orientation === 'horizontal'
                    ? 'custom:h-[1px] custom:w-full'
                    : 'custom:h-full custom:w-[1px]',
                className,
            )}
            {...props}
        />
    ),
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
