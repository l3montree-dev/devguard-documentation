import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import Link from 'next/link'

export type Package = {
    purl: string
    type: string 
    name: string
}

export const columns: ColumnDef<Package>[] = [
    {
        accessorKey: 'purl',
        header: 'Package URL',
        size: 150,
        cell: ({ row }) => {
            const purl = row.getValue('purl') as string
            return (
            <Link href={`/reachability-analysis/${encodeURIComponent(purl)}`}>
                <div className="w-32">{purl}</div>
            </Link>
            ) 
        },
    },
    {
        accessorKey: 'type',
        header: 'Package Type',
        size: 600,
        cell: ({ row }) => {
            const description = row.getValue('type') as string
            return <div className="w-108">{description}</div>
        },
    },
    {
        accessorKey: 'name',
        size: 150,
        header: ({ column }) => {
            return (
                <div
                    className="flex cursor-pointer items-center hover:text-accent-foreground"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Package Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => {
            const purl = row.getValue('name') as string
            return <div className="w-32">{purl}</div>
        },
    },
]