'use client'

import { cn, extractAttributes } from '@/lib/utils'
import React from 'react'
import { FunctionComponent } from 'react'
import { Button } from './ui/button'

const YoutubeVideo: FunctionComponent<{
    iFrame: string
    className?: string
}> = (props) => {
    const attrs = extractAttributes(props.iFrame)

    const [display, setDisplay] = React.useState<boolean>(false)

    React.useEffect(() => {
        // check if we are allowed to display a youtube video
        // if yes, set display to true
        if (localStorage.getItem('youtube') === 'true') setDisplay(true)
    }, [])

    const allowDisplay = () => {
        // set display to true
        setDisplay(true)
        // set local storage to true
        localStorage.setItem('youtube', 'true')
    }

    if (!display) {
        return (
            <div
                className={cn(
                    'my-12 ring-1 ring-muted-foreground/50 sm:rounded-lg',
                    props.className,
                )}
            >
                <div className="items-center px-4 py-5 text-center sm:p-6">
                    <p className="text-base font-semibold text-white">
                        YouTube Video
                    </p>
                    <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
                        We require your consent. This content is provided by
                        YouTube. If you activate the content, personal data may
                        be processed and cookies may be set.
                    </p>
                    <div className="mt-6">
                        <Button
                            variant="secondary"
                            className=""
                            onClick={allowDisplay}
                        >
                            Show the YouTube Video
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="my-12">
            <iframe
                className="aspect-video h-full rounded-xl shadow-2xl ring-1 ring-white/10"
                width={'100%'}
                src={attrs.src}
                title={attrs.title}
                allow={attrs.allow}
                allowFullScreen={attrs.allowfullscreen}
                loading={attrs.loading}
                name={attrs.name}
                referrerPolicy={attrs.referrerpolicy}
                sandbox={attrs.sandbox}
                seamless={attrs.seamless}
                srcDoc={attrs.srcdoc}
            />
        </div>
    )
}

export default YoutubeVideo
