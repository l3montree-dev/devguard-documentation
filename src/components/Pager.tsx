import { ChevronLeft, ChevronRight } from 'lucide-react'

const BUTTON_CLASS =
    'text-muted-foreground hover:bg-muted-foreground/30 hover:text-foreground flex cursor-pointer items-center gap-1 rounded-md border px-2.5 py-1.5 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-30'

interface Props {
    page: number
    totalPages: number
    onChange: (page: number) => void
}

export default function Pager({ page, totalPages, onChange }: Props) {
    return (
        <div className="mt-3 flex items-center justify-between">
            <button
                type="button"
                disabled={page === 0}
                onClick={() => onChange(Math.max(0, page - 1))}
                className={BUTTON_CLASS}
            >
                <ChevronLeft className="h-3.5 w-3.5" />
                Previous
            </button>
            <span className="text-muted-foreground font-mono text-sm">
                {page + 1} / {totalPages}
            </span>
            <button
                type="button"
                disabled={page >= totalPages - 1}
                onClick={() => onChange(Math.min(totalPages - 1, page + 1))}
                className={BUTTON_CLASS}
            >
                Next
                <ChevronRight className="h-3.5 w-3.5" />
            </button>
        </div>
    )
}
