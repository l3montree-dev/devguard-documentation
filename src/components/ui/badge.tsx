import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
                outline: 'text-foreground',
                goodFirstIssueBadge:
                    'bg-[#26264a] text-[#c2b8ff] ring-1 ring-[#565280] text-sm h-5',
                devguardBadge:
                    'bg-[#26264a] text-[#c2b8ff] ring-1 ring-[#565280] text-sm h-5',
                devguardWebBadge:
                    'bg-[#162c41] text-[#3aadff] ring-1 ring-[#1d4d73] text-sm h-5',
                upcoming:
                    'bg-blue-400/10 text-blue-400 ring-1 ring-blue-400 text-sm h-6',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
)

export interface BadgeProps
    extends
        React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <span
            className={cn(badgeVariants({ variant }), className)}
            {...props}
        />
    )
}

export { Badge, badgeVariants }
