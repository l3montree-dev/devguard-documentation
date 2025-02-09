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
                   300: "#161B23",
                   400: "#0C1117",
                   950: "#02040A",
                },
				bgSecondary: '#161B23',
                border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    		},
        }
    },
}

