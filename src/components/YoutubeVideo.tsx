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
                    'custom:my-12 custom:ring-1 custom:ring-muted-foreground/50 custom:sm:rounded-lg',
                    props.className,
                )}
            >
                <div className="custom:items-center custom:px-4 custom:py-5 custom:text-center custom:sm:p-6">
                    <p className="custom:text-base custom:font-semibold custom:text-white">
                        YouTube Video
                    </p>
                    <p className="custom:mx-auto custom:mt-2 custom:max-w-xl custom:text-sm custom:text-muted-foreground">
                        We require your consent. This content is provided by
                        YouTube. If you activate the content, personal data may
                        be processed and cookies may be set.
                    </p>
                    <div className="custom:mt-6">
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
        <div className="custom:my-12">
            <iframe
                className="custom:aspect-video custom:h-full custom:rounded-xl custom:shadow-2xl custom:ring-1 custom:ring-white/10"
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
