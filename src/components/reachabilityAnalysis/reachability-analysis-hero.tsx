import { Input } from 'src/components/ui/input'


interface HeroProps {
    searchTerm: string
    setSearchTerm: (value: string) => void
    onSearch: () => void
}

export default function ReachabilityAnalysisHero({searchTerm,setSearchTerm,onSearch}: HeroProps){
    return (
        <>
            <div className="mx-auto max-w-7xl ml-16 pb-40 pt-32">
                <div className="px-6">
                    <div className="mx-auto max-w-2xl">
                        <div className="max-w-lg">
                            <h1 className="mt-10 text-pretty text-5xl text-center font-semibold tracking-tight text-white sm:text-7xl">
                                Reachability Analysis
                            </h1>
                            <p className="mt-4 text-pretty text-center text-lg font-large text-gray-400 sm:text-xl/8">
                                Lorem Ipsum
                            </p>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    onSearch()
                                }}
                            >
                                <Input
                                    className="mt-8 !text-2xl py-6 text-center rounded-full"
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
