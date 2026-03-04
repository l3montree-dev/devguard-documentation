import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'custom:inline-flex custom:items-center custom:justify-center custom:gap-2 custom:whitespace-nowrap custom:rounded-md custom:text-sm custom:font-medium custom:ring-offset-background custom:transition-colors custom:focus-visible:outline-none custom:focus-visible:ring-2 custom:focus-visible:ring-ring custom:focus-visible:ring-offset-2 custom:disabled:pointer-events-none custom:disabled:opacity-50 [&_svg]:custom:pointer-events-none [&_svg]:custom:size-4 [&_svg]:custom:shrink-0',
    {
        variants: {
            variant: {
                default:
                    'custom:bg-primary custom:text-primary-foreground custom:hover:bg-primary/90',
                destructive:
                    'custom:bg-destructive custom:text-destructive-foreground custom:hover:bg-destructive/90',
                outline:
                    'custom:border custom:border-input custom:bg-background custom:hover:bg-accent custom:hover:text-accent-foreground',
                secondary:
                    'custom:bg-secondary custom:text-secondary-foreground custom:hover:bg-secondary/80',
                ghost: 'custom:hover:bg-accent custom:hover:text-accent-foreground',
                link: 'custom:text-primary custom:underline-offset-4 custom:hover:underline',
            },
            size: {
                default: 'custom:h-10 custom:px-4 custom:py-2',
                sm: 'custom:h-9 custom:rounded-md custom:px-3',
                lg: 'custom:h-11 custom:rounded-md custom:px-8',
                icon: 'custom:h-10 custom:w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

export interface ButtonProps
    extends
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
