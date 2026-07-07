import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { OG_LOGO_SVG } from '@/lib/og-logo'

export const config = { runtime: 'edge' }

export default async function handler(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const cveId = searchParams.get('cve') ?? 'CVE-XXXX-XXXXX'

    const logoUrl = `data:image/svg+xml,${encodeURIComponent(OG_LOGO_SVG)}`

    return new ImageResponse(
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: '#0b1014',
                padding: '60px 80px',
                position: 'relative',
                fontFamily: 'sans-serif',
            }}
        >
            {/* Hatch pattern sides */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 40,
                    height: '100%',
                    backgroundImage:
                        'repeating-linear-gradient(315deg, #5d5d5d 0px, #5d5d5d 1px, transparent 1px, transparent 50%)',
                    backgroundSize: '10px 10px',
                    borderLeft: '1px solid #5d5d5d',
                    borderRight: '1px solid #5d5d5d',
                    display: 'flex',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 40,
                    height: '100%',
                    backgroundImage:
                        'repeating-linear-gradient(315deg, #5d5d5d 0px, #5d5d5d 1px, transparent 1px, transparent 50%)',
                    backgroundSize: '10px 10px',
                    borderLeft: '1px solid #5d5d5d',
                    borderRight: '1px solid #5d5d5d',
                    display: 'flex',
                }}
            />

            {/* Logo top-left */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={logoUrl}
                alt="DevGuard"
                width={180}
                height={64}
                style={{ objectFit: 'contain', objectPosition: 'left' }}
            />

            {/* Content */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: 48,
                    flex: 1,
                }}
            >
                {/* Label */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 20,
                    }}
                >
                    {/* Shield icon */}
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FBBE24"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="m9 12 2 2 4-4" />
                    </svg>
                    <span
                        style={{
                            color: '#FBBE24',
                            fontSize: 14,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            fontFamily: 'monospace',
                        }}
                    >
                        Open-Source Security Intelligence
                    </span>
                </div>

                {/* Heading */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                    }}
                >
                    <span
                        style={{
                            color: '#f8fafc',
                            fontSize: 64,
                            fontWeight: 700,
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        Know {cveId}
                    </span>
                    <span
                        style={{
                            color: '#94a3b8',
                            fontSize: 64,
                            fontWeight: 400,
                            lineHeight: 1.1,
                            letterSpacing: '-0.02em',
                        }}
                    >
                        before it knows you.
                    </span>
                </div>

                {/* Description */}
                <p
                    style={{
                        color: '#64748b',
                        fontSize: 22,
                        lineHeight: 1.6,
                        marginTop: 28,
                        maxWidth: 700,
                    }}
                >
                    DevGuard continuously monitors your dependencies and alerts
                    you when CVEs like this one affect your stack — with
                    real-time threat intelligence built for developers.
                </p>
            </div>
        </div>,
        {
            width: 1200,
            height: 628,
        },
    )
}
