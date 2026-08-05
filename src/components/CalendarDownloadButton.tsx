'use client'
import { useEffect } from 'react'
import { CalendarArrowDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CalendarDownloadButton() {
    useEffect(() => {
        if (window.location.hash === '#download-calendar') {
            const link = document.createElement('a')
            link.href = '/devguard-community-call.ics'
            link.download = 'devguard-community-call.ics'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        }
    }, [])

    return (
        <span id="download-calendar" className="block mt-3 mb-5">
            <Button asChild variant="outline" size="lg" className="gap-2">
                <a
                    href="/devguard-community-call.ics"
                    download="devguard-community-call.ics"
                >
                    <CalendarArrowDown size={18} />
                    Download Calendar File (.ics)
                </a>
            </Button>
        </span>
    )
}
