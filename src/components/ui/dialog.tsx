import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { inter, lexend } from '../../fonts'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            'custom:fixed custom:inset-0 custom:z-50 custom:bg-black/80 data-[state=open]:custom:animate-in data-[state=closed]:custom:animate-out data-[state=closed]:custom:fade-out-0 data-[state=open]:custom:fade-in-0',
            className,
        )}
        {...props}
    />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                'custom:fixed custom:left-[50%] custom:top-[50%] custom:z-50 custom:grid custom:w-full custom:max-w-lg custom:translate-x-[-50%] custom:translate-y-[-50%] custom:gap-4 custom:border custom:bg-background custom:p-6 custom:font-sans custom:shadow-lg custom:duration-200 data-[state=open]:custom:animate-in data-[state=closed]:custom:animate-out data-[state=closed]:custom:fade-out-0 data-[state=open]:custom:fade-in-0 data-[state=closed]:custom:zoom-out-95 data-[state=open]:custom:zoom-in-95 data-[state=closed]:custom:slide-out-to-left-1/2 data-[state=closed]:custom:slide-out-to-top-[48%] data-[state=open]:custom:slide-in-from-left-1/2 data-[state=open]:custom:slide-in-from-top-[48%] custom:sm:rounded-lg',
                className,
                lexend.variable,
                inter.variable,
            )}
            {...props}
        >
            {children}
            <DialogPrimitive.Close className="custom:absolute custom:right-4 custom:top-4 custom:rounded-xs custom:opacity-70 custom:ring-offset-background custom:transition-opacity custom:hover:opacity-100 custom:focus:outline-none custom:focus:ring-2 custom:focus:ring-ring custom:focus:ring-offset-2 custom:disabled:pointer-events-none data-[state=open]:custom:bg-accent data-[state=open]:custom:text-muted-foreground">
                <X className="custom:h-4 custom:w-4" />
                <span className="custom:sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            'custom:flex custom:flex-col custom:space-y-1.5 custom:text-center custom:sm:text-left',
            className,
        )}
        {...props}
    />
)
DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            'custom:flex custom:flex-col-reverse custom:sm:flex-row custom:sm:justify-end custom:sm:space-x-2',
            className,
        )}
        {...props}
    />
)
DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn(
            'custom:text-lg custom:font-semibold custom:leading-none custom:tracking-tight',
            className,
        )}
        {...props}
    />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn('custom:text-sm custom:text-muted-foreground', className)}
        {...props}
    />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
}
