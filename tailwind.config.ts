import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				sans: ["'Orbitron'", "'Rajdhani'", "'Share Tech Mono'", ...fontFamily.sans],
				mono: ["'Share Tech Mono'", "'VT323'", "'Space Mono'", ...fontFamily.mono],
				cyber: ["'Orbitron'", "'Rajdhani'", "'Share Tech Mono'", ...fontFamily.sans],
				tech: ["'VT323'", "'Share Tech Mono'", "'Space Mono'", ...fontFamily.mono],
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			typography: (theme) => ({
				DEFAULT: {
					css: {
						color: theme("colors.slate.300"),
						a: {
							color: theme("colors.cyan.400"),
							"&:hover": {
								color: theme("colors.cyan.300"),
							},
						},
						h1: {
							color: theme("colors.cyan.300"),
							fontFamily: theme("fontFamily.cyber").join(", "),
						},
						h2: {
							color: theme("colors.cyan.400"),
							fontFamily: theme("fontFamily.cyber").join(", "),
						},
						h3: {
							color: theme("colors.cyan.500"),
							fontFamily: theme("fontFamily.cyber").join(", "),
						},
						h4: {
							color: theme("colors.cyan.600"),
							fontFamily: theme("fontFamily.cyber").join(", "),
						},
						blockquote: {
							color: theme("colors.cyan.300"),
							borderLeftColor: theme("colors.cyan.800"),
						},
						code: {
							color: theme("colors.cyan.400"),
							backgroundColor: theme("colors.slate.800"),
							padding: "0.25rem",
							borderRadius: "0.25rem",
							fontWeight: "400",
							fontFamily: theme("fontFamily.tech").join(", "),
						},
						"code::before": {
							content: '""',
						},
						"code::after": {
							content: '""',
						},
						hr: {
							borderColor: theme("colors.slate.700"),
						},
						strong: {
							color: theme("colors.slate.200"),
						},
					},
				},
			}),
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography"),
		function ({ addUtilities }) {
			addUtilities({
				".custom-scrollbar": {
					"&::-webkit-scrollbar": {
						width: "8px",
						height: "8px",
					},
					"&::-webkit-scrollbar-track": {
						background: "rgba(0, 0, 0, 0.1)",
						borderRadius: "4px",
					},
					"&::-webkit-scrollbar-thumb": {
						background: "#02d8fc",
						borderRadius: "4px",
						"&:hover": {
							background: "#00b8d9",
						},
					},
				},
			});
		},
	],
} satisfies Config;

export default config;
