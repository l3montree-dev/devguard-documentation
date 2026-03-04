import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.List>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            'custom:inline-flex custom:h-10 custom:items-center custom:justify-center custom:rounded-md custom:bg-muted custom:p-1 custom:text-muted-foreground',
            className,
        )}
        {...props}
    />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
            'custom:inline-flex custom:items-center custom:justify-center custom:whitespace-nowrap custom:rounded-sm custom:px-3 custom:py-1.5 custom:text-sm custom:font-medium custom:ring-offset-background custom:transition-all custom:focus-visible:outline-none custom:focus-visible:ring-2 custom:focus-visible:ring-ring custom:focus-visible:ring-offset-2 custom:disabled:pointer-events-none custom:disabled:opacity-50 data-[state=active]:custom:bg-background data-[state=active]:custom:text-foreground data-[state=active]:custom:shadow-sm',
            className,
        )}
        {...props}
    />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            'custom:mt-2 custom:ring-offset-background custom:focus-visible:outline-none custom:focus-visible:ring-2 custom:focus-visible:ring-ring custom:focus-visible:ring-offset-2',
            className,
        )}
        {...props}
    />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
