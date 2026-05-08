import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html data-kern-theme="dark" lang="en" style={{ colorScheme: 'dark' }}>
            <Head>
                <script src="https://devguard.org/chat-widget.js" data-library="/websites/devguard" async />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
