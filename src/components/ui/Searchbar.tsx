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
        <div className="relative right-1/2 left-1/2 -mx-[50vw] w-screen px-4">
            <div className="mx-auto max-w-2xl">
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="focus:border-primary focus:ring-primary dark:focus:border-primary w-full rounded-xl border border-gray-300 bg-white py-4 pr-32 pl-12 text-gray-900 placeholder-gray-500 focus:outline-none dark:border-gray-800 dark:bg-gray-950 dark:text-white"
                            placeholder={placeholder}
                        />
                        <Button
                            type="submit"
                            className="absolute top-1/2 right-2 -translate-y-1/2"
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
