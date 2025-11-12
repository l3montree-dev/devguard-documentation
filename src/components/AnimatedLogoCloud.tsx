// Instructions for integrating continuous logo animation in Tailwind CSS:
// Add the following configurations to the `extend` section of your `tailwind.config.js`:
// 1. Keyframes for 'logo-cloud' animation that continuously moves logos from right to left:
//    keyframes: {
//      'logo-cloud': {
//        from: { transform: 'translateX(0)' },
//        to: { transform: 'translateX(calc(-100% - 4rem))' },
//      },
//    }
// 2. Animation utility to apply this keyframe:
//    animation: {
//      'logo-cloud': 'logo-cloud 30s linear infinite', // Adjust duration and timing as needed for your design.
//    }

const logos = [
    {
        name: 'Bonn-Rhein-Sieg University of Applied Sciences',
        url: '/sponsors/sp-hbrs.svg',
    },
    {
        name: 'Justus-Liebig-Universität Gießen',
        url: '/sponsors/sp-jlu.svg',
    },
    {
        name: 'Ikor',
        url: '/sponsors/sp-ikor.svg',
    },
    {
        name: 'Heylogin',
        url: '/sponsors/heylogin-logo.svg',
    },
    {
        name: 'openCode',
        url: '/sponsors/opencode-logo.svg',
    },
    {
        name: 'OWASP',
        url: '/sponsors/sp-owasp.svg',
    },
    {
        name: 'openDesk',
        url: '/sponsors/opendesk-logo.svg',
    },
    {
        name: 'Cronn',
        url: '/sponsors/cronn-logo.svg',
    },
    {
        name: 'CPS',
        url: '/sponsors/cps-logo.svg',
    },
    {
        name: 'WhereGroup',
        url: '/sponsors/sp-wheregroup.svg',
    },
    {
        name: 'Wetteronline',
        url: '/sponsors/sp-wetteronline.svg',
    },
    {
        name: 'Businesscode',
        url: '/sponsors/bc-logo-white.png',
    },
    {
        name: 'BCG',
        url: '/sponsors/sp-bcg.png',
    },
]

const AnimatedLogoCloud = () => {
    return (
        <div className="w-full py-12">
            <div className="mx-auto w-full px-4 md:px-8">
                <div
                    className="group relative flex gap-6 overflow-hidden p-2"
                    style={{
                        maskImage:
                            'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
                    }}
                >
                    {Array(5)
                        .fill(null)
                        .map((index) => (
                            <div
                                key={index + Math.random()}
                                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-10"
                            >
                                {logos.map((logo, key) => (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        key={key}
                                        src={logo.url}
                                        className="h-9 w-auto px-2"
                                        alt={`${logo.name}`}
                                    />
                                ))}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default AnimatedLogoCloud
