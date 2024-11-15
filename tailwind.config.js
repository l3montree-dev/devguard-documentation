/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,md,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,md,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,md,mdx}',
        './theme.config.tsx'
    ],
    theme: {   
        extend: {
            colors: {
                l3: {
                    50: '#fbfcea',
                    100: '#f9f9c8',
                    200: '#f5f193',
                    300: '#efe355',
                    400: '#e9d432',
                    500: '#d8ba1a',
                    600: '#ba9214',
                    700: '#956b13',
                    800: '#7c5517',
                    900: '#69461a',
                    950: '#3d250b',
                },
                dg: {
                   400: "#0C1117",
                   950: "#02040A",
                }
            },
        }
    },
}

