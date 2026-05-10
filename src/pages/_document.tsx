import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    const chatWidgetSrc = process.env.NEXT_PUBLIC_CHAT_WIDGET_SRC
    const chatWidgetIntegrity = process.env.NEXT_PUBLIC_CHAT_WIDGET_INTEGRITY

    return (
        <Html data-kern-theme="dark" lang="en" style={{ colorScheme: 'dark' }}>
            <Head>
                {chatWidgetSrc && (
                    <script
                        src={chatWidgetSrc}
                        data-library="/websites/devguard"
                        async
                        {...(chatWidgetIntegrity && {
                            integrity: chatWidgetIntegrity,
                            crossOrigin: 'anonymous',
                        })}
                    />
                )}
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
