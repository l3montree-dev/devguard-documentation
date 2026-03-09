import Image from 'next/image'

export default function PrivacyIconsStatement() {
    return (
        <div className="py-10">
            <h3 className="mb-6 text-xl font-semibold text-white">
                Art der personenbezogene Daten
            </h3>
            <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-2">
                <div className="flex flex-col items-start bg-[#151C23]/50 p-8">
                    <Image
                        alt="Allgemeine personenbezogene Daten Icon"
                        src="/privacy-icons/000-pi-general-data.svg"
                        width={158}
                        height={48}
                        className="max-h-14 w-auto self-start object-contain invert"
                    />
                    <p className="mt-4 text-sm font-medium text-white">
                        Allgemeine personenbezogene Daten
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                        Wir verarbeiten allgemeine personenbezogene Daten über
                        Sie, z.B. Name und Kontaktdaten.
                    </p>
                </div>
                <div className="bg-[#151C23]/50 p-8">
                    <Image
                        alt="Finanzdaten Icon"
                        src="/privacy-icons/002-pi-financial-data.svg"
                        width={158}
                        height={48}
                        className="max-h-14 w-auto self-start object-contain invert"
                    />
                    <p className="mt-4 text-sm font-medium text-white">
                        Finanzdaten
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                        Wir verarbeiten Ihre Finanzdaten, wenn Sie unsere
                        kostenpflichten Dienste nutzen.
                    </p>
                </div>
            </div>
            <h3 className="mb-6 mt-12 text-xl font-semibold text-white">
                Quelle der personenbezogene Daten
            </h3>
            <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
                <div className="flex flex-col items-start bg-[#151C23]/50 p-8">
                    <Image
                        alt="Überlassene Daten Icon"
                        src="/privacy-icons/012-pi-provided-data.svg"
                        width={158}
                        height={48}
                        className="max-h-14 w-auto self-start object-contain invert"
                    />
                    <p className="mt-4 text-sm font-medium text-white">
                        Überlassene Daten
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                        Wir verarbeiten personenbezogene Daten, die Sie uns zur
                        Verfügung stellen.
                    </p>
                </div>
                <div className="flex flex-col items-start bg-[#151C23]/50 p-8">
                    <Image
                        alt="Keine erhobenen Daten Icon"
                        src="/privacy-icons/015-pi-collected-data-neg.svg"
                        width={158}
                        height={48}
                        className="max-h-14 w-auto self-start object-contain invert"
                    />
                    <p className="mt-4 text-sm font-medium text-white">
                        Keine erhobenen Daten
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                        Wir bearbeiten keine personenbezogene Daten, die wir
                        über Sie erhobenen haben.
                    </p>
                </div>
                <div className="flex flex-col items-start bg-[#151C23]/50 p-8">
                    <Image
                        alt="Keine erhaltenen Daten Icon"
                        src="/privacy-icons/017-pi-received-data-neg.svg"
                        width={158}
                        height={48}
                        className="max-h-14 w-auto self-start object-contain invert"
                    />
                    <p className="mt-4 text-sm font-medium text-white">
                        Keine erhaltenen Daten
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                        Wir verarbeiten keine personenbezogene Daten, die wir
                        von Dritten über Sie erhalten haben.
                    </p>
                </div>
            </div>
            <h3 className="mb-6 mt-12 text-xl font-semibold text-white">
                Zweck der Verarbeitung
            </h3>
            <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
                <div className="flex flex-col items-start bg-[#151C23]/50 p-8">
                    <Image
                        alt="Produktentwicklung Icon"
                        src="/privacy-icons/020-pi-product-development.svg"
                        width={158}
                        height={48}
                        className="max-h-14 w-auto self-start object-contain invert"
                    />
                    <p className="mt-4 text-sm font-medium text-white">
                        Produktentwicklung
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                        Wir nutzen Ihre personenbezogene Daten für die
                        Entwicklung und Verbesserung von Produkten und
                        Dienstleistungen.
                    </p>
                </div>
                <div className="flex flex-col items-start bg-[#151C23]/50 p-8">
                    <Image
                        alt="Kein Marketing Icon"
                        src="/privacy-icons/019-pi-marketing-neg.svg"
                        width={158}
                        height={48}
                        className="max-h-14 w-auto self-start object-contain invert"
                    />
                    <p className="mt-4 text-sm font-medium text-white">
                        Kein Marketing
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                        Wir nutzen Ihre personenbezogene Daten nicht für
                        Marketing und Werbung.
                    </p>
                </div>
                <div className="flex flex-col items-start bg-[#151C23]/50 p-8">
                    <Image
                        alt="Keine weiteren Zwecke Icon"
                        src="/privacy-icons/023-pi-other-purposes-neg.svg"
                        width={158}
                        height={48}
                        className="max-h-14 w-auto self-start object-contain invert"
                    />
                    <p className="mt-4 text-sm font-medium text-white">
                        Keine weiteren Zwecke
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                        Wir nutzen Ihre personenbezogene Daten nicht für weitere
                        Zwecke ohne Zusammenhang mit der Kernleistung.
                    </p>
                </div>
            </div>
            <h3 className="mb-6 mt-12 text-xl font-semibold text-white">
                Weitergabe an Dritte
            </h3>
            <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-2">
                <div className="flex flex-col items-start bg-[#151C23]/50 p-8">
                    <Image
                        alt="Keine Datenweitergabe Icon"
                        src="/privacy-icons/031-pi-data-transfers-neg.svg"
                        width={158}
                        height={48}
                        className="max-h-14 w-auto self-start object-contain invert"
                    />
                    <p className="mt-4 text-sm font-medium text-white">
                        Keine Datenweitergabe
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                        Wir geben Ihre personenbezogene Daten nicht an andere
                        Unternehmen weiter, die selber entscheiden können, wie
                        sie die Daten nutzen.
                    </p>
                </div>
                <div className="bg-[#151C23]/50 p-8">
                    <Image
                        alt="Kein Datenverkauf Icon"
                        src="/privacy-icons/033-pi-data-sale-neg.svg"
                        width={158}
                        height={48}
                        className="max-h-14 w-auto self-start object-contain invert"
                    />
                    <p className="mt-4 text-sm font-medium text-white">
                        Kein Datenverkauf
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                        Wir verkaufen Ihre personenbezogene Daten nicht.
                    </p>
                </div>
            </div>
        </div>
    )
}
