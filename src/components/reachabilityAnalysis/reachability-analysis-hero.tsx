import { Input } from 'src/components/ui/input'


interface HeroProps {
    searchTerm: string
    setSearchTerm: (value: string) => void
    onSearch: () => void
}

export default function ReachabilityAnalysisHero({searchTerm,setSearchTerm,onSearch}: HeroProps){
    return (
        <>
            <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
                <div className="px-6 lg:px-0 lg:pt-4">
                    <div className="mx-auto max-w-2xl">
                        <div className="max-w-lg">
                            <h1 className="mt-10 text-pretty text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                                Reachability Analysis
                            </h1>
                            <p className="mt-6 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
                                Find out if your packages are affected
                            </p>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    onSearch()
                                }}
                            >
                                <Input
                                    className="mt-5"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
