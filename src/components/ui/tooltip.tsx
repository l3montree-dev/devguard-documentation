import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@/lib/utils'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
            'custom:z-50 custom:overflow-hidden custom:rounded-md custom:bg-slate-900 custom:px-3 custom:py-1.5 custom:text-xs custom:text-white custom:animate-in custom:fade-in-0 custom:zoom-in-95 data-[state=closed]:custom:animate-out data-[state=closed]:custom:fade-out-0 data-[state=closed]:custom:zoom-out-95 data-[side=bottom]:custom:slide-in-from-top-2 data-[side=left]:custom:slide-in-from-right-2 data-[side=right]:custom:slide-in-from-left-2 data-[side=top]:custom:slide-in-from-bottom-2',
            className,
        )}
        {...props}
    />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
