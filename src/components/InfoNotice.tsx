import { InformationCircleIcon } from '@heroicons/react/20/solid'

interface InfoNoticeProps {
    message: string
    details: string
    detailsLink: string
}

export default function InfoNotice(props: InfoNoticeProps) {
    return (
        <div className="mt-10 rounded-md bg-blue-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <InformationCircleIcon
                        aria-hidden="true"
                        className="h-5 w-5 text-blue-400"
                    />
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-blue-700">{props.message}</p>
                    <p className="mt-3 text-sm md:ml-6 md:mt-0">
                        <a
                            href={props.detailsLink}
                            className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                        >
                            {props.details}
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}
