import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html data-kern-theme="dark" lang="en" style={{ colorScheme: 'dark' }}>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
