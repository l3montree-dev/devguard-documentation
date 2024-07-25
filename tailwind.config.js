/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
    important: true,
    darkMode: 'class', // or 'media' or 'class'
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,md,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,md,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,md,mdx}',
        './theme.config.tsx'
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: "2rem",
                xl: "2rem",
            },
            screens: {
                'sm': '100%',
                'md': '100%',
                'lg': '73.125rem',
            }
        },
    },
    plugins: [require('@tailwindcss/forms')],
}

