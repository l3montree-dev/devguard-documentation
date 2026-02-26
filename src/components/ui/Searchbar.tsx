import { Button } from './button'
import { Search } from 'lucide-react'

interface SearchbarProps {
    value: string
    onChange: (value: string) => void
    onSubmit: () => void
    isLoading?: boolean
    placeholder?: string
    // TODO: make button name customizable
}

export function Searchbar({
    value,
    onChange,
    onSubmit,
    isLoading = false,
    placeholder,
}: SearchbarProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit()
    }

    return (
        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen px-4">
            <div className="mx-auto max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 bg-white py-4 pl-12 pr-32 text-gray-900 placeholder-gray-500 focus:border-primary focus:outline-none focus:ring-primary dark:border-gray-800 dark:bg-gray-950 dark:text-white dark:focus:border-primary"
                            placeholder={placeholder}
                        />
                        <Button
                            type="submit"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Searching...' : 'Inspect'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
