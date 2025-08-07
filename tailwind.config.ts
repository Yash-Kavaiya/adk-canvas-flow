import type { Config } from "tailwindcss";

export default {
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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				surface: {
					DEFAULT: 'hsl(var(--surface))',
					dim: 'hsl(var(--surface-dim))',
					bright: 'hsl(var(--surface-bright))',
					container: 'hsl(var(--surface-container))',
					'container-high': 'hsl(var(--surface-container-high))',
				},
				'google-blue': 'hsl(var(--google-blue))',
				'google-blue-dark': 'hsl(var(--google-blue-dark))',
				'google-green': 'hsl(var(--google-green))',
				'google-yellow': 'hsl(var(--google-yellow))',
				'google-red': 'hsl(var(--google-red))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					hover: 'hsl(var(--primary-hover))',
					muted: 'hsl(var(--primary-muted))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
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
				canvas: {
					background: 'hsl(var(--canvas-background))',
					grid: 'hsl(var(--canvas-grid))',
					selection: 'hsl(var(--canvas-selection))',
				},
				agent: {
					llm: 'hsl(var(--agent-llm))',
					sequential: 'hsl(var(--agent-sequential))',
					parallel: 'hsl(var(--agent-parallel))',
					loop: 'hsl(var(--agent-loop))',
					tool: 'hsl(var(--agent-tool))',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					border: 'hsl(var(--sidebar-border))',
					hover: 'hsl(var(--sidebar-hover))',
					active: 'hsl(var(--sidebar-active))',
				},
				properties: {
					background: 'hsl(var(--properties-background))',
					border: 'hsl(var(--properties-border))',
					header: 'hsl(var(--properties-header))',
				},
				code: {
					background: 'hsl(var(--code-background))',
					foreground: 'hsl(var(--code-foreground))',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
