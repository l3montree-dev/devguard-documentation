export function Map() {
    return (
        <div aria-hidden="true" className="relative size-full">
            <div className="absolute inset-0 bg-[url(/map.png)] bg-[length:530px_430px] bg-[center_-75px] bg-no-repeat opacity-60 [mask-image:linear-gradient(to_bottom,black_50%,transparent)]" />
            <div className="absolute inset-0 hover:animate-pulse">
                <div
                    style={
                        {
                            '--offset': `-2px`,
                            top: 54,
                        } as React.CSSProperties
                    }
                    className="absolute left-[calc(50%+var(--offset))] size-[38px] drop-shadow-[0_3px_1px_rgba(0,0,0,.15)]"
                >
                    <svg
                        fill="none"
                        viewBox="0 0 38 38"
                        className="absolute size-full"
                    >
                        <path
                            d="M29.607 5.193c5.858 5.857 5.858 15.355 0 21.213l-9.9 9.9-.707.706-.708-.708-9.899-9.898c-5.857-5.858-5.857-15.356 0-21.213 5.858-5.858 15.356-5.858 21.214 0Z"
                            className="fill-black/5"
                        />
                        <path
                            d="m28.9 25.698-9.9 9.9-9.9-9.9C3.634 20.232 3.634 11.367 9.1 5.9 14.569.432 23.433.432 28.9 5.9c5.467 5.468 5.467 14.332 0 19.8Z"
                            className="fill-l3-500"
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}
