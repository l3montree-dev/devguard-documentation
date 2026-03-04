import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
    'custom:inline-flex custom:items-center custom:rounded-full custom:border custom:px-2.5 custom:py-0.5 custom:text-xs custom:font-semibold custom:transition-colors custom:focus:outline-none custom:focus:ring-2 custom:focus:ring-ring custom:focus:ring-offset-2',
    {
        variants: {
            variant: {
                default:
                    'custom:border-transparent custom:bg-primary custom:text-primary-foreground custom:hover:bg-primary/80',
                secondary:
                    'custom:border-transparent custom:bg-secondary custom:text-secondary-foreground custom:hover:bg-secondary/80',
                destructive:
                    'custom:border-transparent custom:bg-destructive custom:text-destructive-foreground custom:hover:bg-destructive/80',
                outline: 'custom:text-foreground',
                goodFirstIssueBadge:
                    'custom:bg-[#26264a] custom:text-[#c2b8ff] custom:ring-1 custom:ring-[#565280] custom:text-sm custom:h-5',
                devguardBadge:
                    'custom:bg-[#26264a] custom:text-[#c2b8ff] custom:ring-1 custom:ring-[#565280] custom:text-sm custom:h-5',
                devguardWebBadge:
                    'custom:bg-[#162c41] custom:text-[#3aadff] custom:ring-1 custom:ring-[#1d4d73] custom:text-sm custom:h-5',
                documentationRequired:
                    'custom:bg-[#cfbe50]/[0.18] custom:text-[#cfbe4f] custom:ring-1 custom:ring-[#cfbe4f]/[0.3] custom:text-sm custom:h-5',
                upcoming:
                    'custom:bg-blue-400/10 custom:text-blue-400 custom:ring-1 custom:ring-blue-400 custom:text-sm custom:h-6',
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
