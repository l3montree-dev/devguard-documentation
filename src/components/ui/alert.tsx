import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const alertVariants = cva(
    'custom:relative custom:w-full custom:rounded-lg custom:border custom:p-4 [&>svg~*]:custom:pl-7 [&>svg+div]:custom:translate-y-[-3px] [&>svg]:custom:absolute [&>svg]:custom:left-4 [&>svg]:custom:top-4 [&>svg]:custom:text-foreground',
    {
        variants: {
            variant: {
                default: 'custom:bg-background custom:text-foreground',
                destructive:
                    'custom:border-destructive/50 custom:text-destructive custom:dark:border-destructive [&>svg]:custom:text-destructive',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
)

const Alert = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
    <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
    />
))
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn(
            'custom:mb-1 custom:font-medium custom:leading-none custom:tracking-tight',
            className,
        )}
        {...props}
    />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('custom:text-sm [&_p]:custom:leading-relaxed', className)}
        {...props}
    />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
