import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

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
			padding: {
				DEFAULT: '16px',
				sm: '24px',
				md: '32px',
				lg: '40px',
				xl: '48px',
			},
			screens: {
				sm: '600px',    // Material Design compact breakpoint
				md: '840px',    // Material Design medium breakpoint
				lg: '1200px',   // Material Design expanded breakpoint
				xl: '1600px',   // Material Design large breakpoint
				'2xl': '1840px' // Material Design extra-large breakpoint
			}
		},
		screens: {
			// Material Design 3 breakpoints
			'compact': '600px',
			'medium': '840px', 
			'expanded': '1200px',
			'large': '1600px',
			'extra-large': '1840px',
			// Standard breakpoints for compatibility
			'sm': '600px',
			'md': '840px',
			'lg': '1200px',
			'xl': '1600px',
			'2xl': '1840px',
		},
		extend: {
			fontFamily: {
				roboto: ['Roboto', 'sans-serif'],
				'roboto-mono': ['Roboto Mono', 'monospace'],
				inter: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			spacing: {
				// Material Design 3 spacing scale (8dp base unit)
				'0.5': '2px',   // 0.5 * 4px
				'1': '4px',     // 1 * 4px
				'2': '8px',     // 2 * 4px (base unit)
				'3': '12px',    // 3 * 4px
				'4': '16px',    // 4 * 4px
				'5': '20px',    // 5 * 4px
				'6': '24px',    // 6 * 4px
				'8': '32px',    // 8 * 4px
				'10': '40px',   // 10 * 4px
				'12': '48px',   // 12 * 4px
				'16': '64px',   // 16 * 4px
				'20': '80px',   // 20 * 4px
				'24': '96px',   // 24 * 4px
				'32': '128px',  // 32 * 4px
				'40': '160px',  // 40 * 4px
				'48': '192px',  // 48 * 4px
				'56': '224px',  // 56 * 4px
				'64': '256px',  // 64 * 4px
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
				// Material Design 3 Color System
				'md-sys-color': {
					// Primary color palette
					'primary': 'rgb(var(--md-sys-color-primary))',
					'on-primary': 'rgb(var(--md-sys-color-on-primary))',
					'primary-container': 'rgb(var(--md-sys-color-primary-container))',
					'on-primary-container': 'rgb(var(--md-sys-color-on-primary-container))',
					// Secondary color palette
					'secondary': 'rgb(var(--md-sys-color-secondary))',
					'on-secondary': 'rgb(var(--md-sys-color-on-secondary))',
					'secondary-container': 'rgb(var(--md-sys-color-secondary-container))',
					'on-secondary-container': 'rgb(var(--md-sys-color-on-secondary-container))',
					// Tertiary color palette
					'tertiary': 'rgb(var(--md-sys-color-tertiary))',
					'on-tertiary': 'rgb(var(--md-sys-color-on-tertiary))',
					'tertiary-container': 'rgb(var(--md-sys-color-tertiary-container))',
					'on-tertiary-container': 'rgb(var(--md-sys-color-on-tertiary-container))',
					// Error color palette
					'error': 'rgb(var(--md-sys-color-error))',
					'on-error': 'rgb(var(--md-sys-color-on-error))',
					'error-container': 'rgb(var(--md-sys-color-error-container))',
					'on-error-container': 'rgb(var(--md-sys-color-on-error-container))',
					// Warning color palette
					'warning': 'rgb(var(--md-sys-color-warning))',
					'on-warning': 'rgb(var(--md-sys-color-on-warning))',
					'warning-container': 'rgb(var(--md-sys-color-warning-container))',
					'on-warning-container': 'rgb(var(--md-sys-color-on-warning-container))',
					// Surface colors
					'surface': 'rgb(var(--md-sys-color-surface))',
					'on-surface': 'rgb(var(--md-sys-color-on-surface))',
					'surface-variant': 'rgb(var(--md-sys-color-surface-variant))',
					'on-surface-variant': 'rgb(var(--md-sys-color-on-surface-variant))',
					'surface-container-lowest': 'rgb(var(--md-sys-color-surface-container-lowest))',
					'surface-container-low': 'rgb(var(--md-sys-color-surface-container-low))',
					'surface-container': 'rgb(var(--md-sys-color-surface-container))',
					'surface-container-high': 'rgb(var(--md-sys-color-surface-container-high))',
					'surface-container-highest': 'rgb(var(--md-sys-color-surface-container-highest))',
					// Background colors
					'background': 'rgb(var(--md-sys-color-background))',
					'on-background': 'rgb(var(--md-sys-color-on-background))',
					// Outline colors
					'outline': 'rgb(var(--md-sys-color-outline))',
					'outline-variant': 'rgb(var(--md-sys-color-outline-variant))',
				},
				// Material Design 3 Tonal Palettes
				'md-primary': {
					'0': 'rgb(var(--md-sys-color-primary-0))',
					'10': 'rgb(var(--md-sys-color-primary-10))',
					'20': 'rgb(var(--md-sys-color-primary-20))',
					'30': 'rgb(var(--md-sys-color-primary-30))',
					'40': 'rgb(var(--md-sys-color-primary-40))',
					'50': 'rgb(var(--md-sys-color-primary-50))',
					'60': 'rgb(var(--md-sys-color-primary-60))',
					'70': 'rgb(var(--md-sys-color-primary-70))',
					'80': 'rgb(var(--md-sys-color-primary-80))',
					'90': 'rgb(var(--md-sys-color-primary-90))',
					'95': 'rgb(var(--md-sys-color-primary-95))',
					'99': 'rgb(var(--md-sys-color-primary-99))',
					'100': 'rgb(var(--md-sys-color-primary-100))',
				},
				'md-secondary': {
					'0': 'rgb(var(--md-sys-color-secondary-0))',
					'10': 'rgb(var(--md-sys-color-secondary-10))',
					'20': 'rgb(var(--md-sys-color-secondary-20))',
					'30': 'rgb(var(--md-sys-color-secondary-30))',
					'40': 'rgb(var(--md-sys-color-secondary-40))',
					'50': 'rgb(var(--md-sys-color-secondary-50))',
					'60': 'rgb(var(--md-sys-color-secondary-60))',
					'70': 'rgb(var(--md-sys-color-secondary-70))',
					'80': 'rgb(var(--md-sys-color-secondary-80))',
					'90': 'rgb(var(--md-sys-color-secondary-90))',
					'95': 'rgb(var(--md-sys-color-secondary-95))',
					'99': 'rgb(var(--md-sys-color-secondary-99))',
					'100': 'rgb(var(--md-sys-color-secondary-100))',
				},
				'md-tertiary': {
					'0': 'rgb(var(--md-sys-color-tertiary-0))',
					'10': 'rgb(var(--md-sys-color-tertiary-10))',
					'20': 'rgb(var(--md-sys-color-tertiary-20))',
					'30': 'rgb(var(--md-sys-color-tertiary-30))',
					'40': 'rgb(var(--md-sys-color-tertiary-40))',
					'50': 'rgb(var(--md-sys-color-tertiary-50))',
					'60': 'rgb(var(--md-sys-color-tertiary-60))',
					'70': 'rgb(var(--md-sys-color-tertiary-70))',
					'80': 'rgb(var(--md-sys-color-tertiary-80))',
					'90': 'rgb(var(--md-sys-color-tertiary-90))',
					'95': 'rgb(var(--md-sys-color-tertiary-95))',
					'99': 'rgb(var(--md-sys-color-tertiary-99))',
					'100': 'rgb(var(--md-sys-color-tertiary-100))',
				},
				'md-error': {
					'0': 'rgb(var(--md-sys-color-error-0))',
					'10': 'rgb(var(--md-sys-color-error-10))',
					'20': 'rgb(var(--md-sys-color-error-20))',
					'30': 'rgb(var(--md-sys-color-error-30))',
					'40': 'rgb(var(--md-sys-color-error-40))',
					'50': 'rgb(var(--md-sys-color-error-50))',
					'60': 'rgb(var(--md-sys-color-error-60))',
					'70': 'rgb(var(--md-sys-color-error-70))',
					'80': 'rgb(var(--md-sys-color-error-80))',
					'90': 'rgb(var(--md-sys-color-error-90))',
					'95': 'rgb(var(--md-sys-color-error-95))',
					'99': 'rgb(var(--md-sys-color-error-99))',
					'100': 'rgb(var(--md-sys-color-error-100))',
				},
				'md-warning': {
					'0': 'rgb(var(--md-sys-color-warning-0))',
					'10': 'rgb(var(--md-sys-color-warning-10))',
					'20': 'rgb(var(--md-sys-color-warning-20))',
					'30': 'rgb(var(--md-sys-color-warning-30))',
					'40': 'rgb(var(--md-sys-color-warning-40))',
					'50': 'rgb(var(--md-sys-color-warning-50))',
					'60': 'rgb(var(--md-sys-color-warning-60))',
					'70': 'rgb(var(--md-sys-color-warning-70))',
					'80': 'rgb(var(--md-sys-color-warning-80))',
					'90': 'rgb(var(--md-sys-color-warning-90))',
					'95': 'rgb(var(--md-sys-color-warning-95))',
					'99': 'rgb(var(--md-sys-color-warning-99))',
					'100': 'rgb(var(--md-sys-color-warning-100))',
				},
				// Legacy Google brand colors (for compatibility)
				'google-blue': 'hsl(var(--google-blue))',
				'google-blue-dark': 'hsl(var(--google-blue-dark))',
				'google-green': 'hsl(var(--google-green))',
				'google-yellow': 'hsl(var(--google-yellow))',
				'google-red': 'hsl(var(--google-red))',
				// Legacy color mappings (for compatibility)
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
				// Material Design 3 border radius tokens
				'none': '0px',
				'xs': '4px',     // Extra small
				'sm': '8px',     // Small
				'md': '12px',    // Medium (Material Design standard)
				'lg': '16px',    // Large
				'xl': '20px',    // Extra large
				'2xl': '24px',   // 2x Extra large
				'3xl': '28px',   // 3x Extra large
				'full': '9999px', // Fully rounded
				// Legacy support
				DEFAULT: '12px',
			},
			boxShadow: {
				// Material Design 3 elevation system
				'elevation-0': 'var(--md-sys-elevation-0)',
				'elevation-1': 'var(--md-sys-elevation-1)',
				'elevation-2': 'var(--md-sys-elevation-2)',
				'elevation-3': 'var(--md-sys-elevation-3)',
				'elevation-4': 'var(--md-sys-elevation-4)',
				'elevation-5': 'var(--md-sys-elevation-5)',
				// Semantic shadow names for easier usage
				'md-0': 'var(--md-sys-elevation-0)',
				'md-1': 'var(--md-sys-elevation-1)',
				'md-2': 'var(--md-sys-elevation-2)',
				'md-3': 'var(--md-sys-elevation-3)',
				'md-4': 'var(--md-sys-elevation-4)',
				'md-5': 'var(--md-sys-elevation-5)',
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
				},
				// Material Design 3 motion keyframes
				'md-fade-in': {
					from: {
						opacity: '0'
					},
					to: {
						opacity: '1'
					}
				},
				'md-fade-out': {
					from: {
						opacity: '1'
					},
					to: {
						opacity: '0'
					}
				},
				'md-scale-in': {
					from: {
						opacity: '0',
						transform: 'scale(0.8)'
					},
					to: {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'md-scale-out': {
					from: {
						opacity: '1',
						transform: 'scale(1)'
					},
					to: {
						opacity: '0',
						transform: 'scale(0.8)'
					}
				},
				'md-slide-in': {
					from: {
						opacity: '0',
						transform: 'translateY(16px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'md-slide-out': {
					from: {
						opacity: '1',
						transform: 'translateY(0)'
					},
					to: {
						opacity: '0',
						transform: 'translateY(-16px)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				// Material Design 3 motion tokens
				'md-fade-in': 'md-fade-in 150ms cubic-bezier(0.2, 0, 0, 1)',
				'md-fade-out': 'md-fade-out 75ms cubic-bezier(0.4, 0, 1, 1)',
				'md-scale-in': 'md-scale-in 150ms cubic-bezier(0.2, 0, 0, 1)',
				'md-scale-out': 'md-scale-out 75ms cubic-bezier(0.4, 0, 1, 1)',
				'md-slide-in': 'md-slide-in 200ms cubic-bezier(0.2, 0, 0, 1)',
				'md-slide-out': 'md-slide-out 150ms cubic-bezier(0.4, 0, 1, 1)',
			},
			transitionTimingFunction: {
				// Material Design 3 easing curves
				'md-standard': 'cubic-bezier(0.2, 0, 0, 1)',
				'md-standard-accelerate': 'cubic-bezier(0.3, 0, 1, 1)',
				'md-standard-decelerate': 'cubic-bezier(0, 0, 0, 1)',
				'md-emphasized': 'cubic-bezier(0.2, 0, 0, 1)',
				'md-emphasized-accelerate': 'cubic-bezier(0.3, 0, 0.8, 0.15)',
				'md-emphasized-decelerate': 'cubic-bezier(0.05, 0.7, 0.1, 1)',
			},
			transitionDuration: {
				// Material Design 3 duration tokens
				'md-short1': '50ms',
				'md-short2': '100ms',
				'md-short3': '150ms',
				'md-short4': '200ms',
				'md-medium1': '250ms',
				'md-medium2': '300ms',
				'md-medium3': '350ms',
				'md-medium4': '400ms',
				'md-long1': '450ms',
				'md-long2': '500ms',
				'md-long3': '550ms',
				'md-long4': '600ms',
				'md-extra-long1': '700ms',
				'md-extra-long2': '800ms',
				'md-extra-long3': '900ms',
				'md-extra-long4': '1000ms',
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
