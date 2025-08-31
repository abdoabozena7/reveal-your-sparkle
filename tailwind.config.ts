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
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					glow: 'hsl(var(--secondary-glow))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					glow: 'hsl(var(--accent-glow))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
					glow: 'hsl(var(--success-glow))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
					glow: 'hsl(var(--warning-glow))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-20px) rotate(2deg)' },
					'66%': { transform: 'translateY(-10px) rotate(-1deg)' }
				},
				'float-reverse': {
					'0%, 100%': { transform: 'translateY(-20px) rotate(0deg)' },
					'50%': { transform: 'translateY(20px) rotate(180deg)' }
				},
				'glow-pulse': {
					'0%, 100%': { 
						boxShadow: '0 0 30px hsl(280 100% 70% / 0.4), 0 0 60px hsl(195 100% 50% / 0.2)',
						filter: 'brightness(1)'
					},
					'50%': { 
						boxShadow: '0 0 60px hsl(280 100% 70% / 0.8), 0 0 120px hsl(195 100% 50% / 0.4)',
						filter: 'brightness(1.5)'
					}
				},
				'rainbow-pulse': {
					'0%': { 
						boxShadow: '0 0 30px hsl(280 100% 70% / 0.6)'
					},
					'25%': { 
						boxShadow: '0 0 30px hsl(195 100% 50% / 0.6)'
					},
					'50%': { 
						boxShadow: '0 0 30px hsl(340 100% 65% / 0.6)'
					},
					'75%': { 
						boxShadow: '0 0 30px hsl(120 100% 50% / 0.6)'
					},
					'100%': { 
						boxShadow: '0 0 30px hsl(280 100% 70% / 0.6)'
					}
				},
				'rotate-slow': {
					from: { transform: 'rotate(0deg)' },
					to: { transform: 'rotate(360deg)' }
				},
				'rotate-reverse': {
					from: { transform: 'rotate(0deg)' },
					to: { transform: 'rotate(-360deg)' }
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(60px)',
						filter: 'blur(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
						filter: 'blur(0px)'
					}
				},
				'fade-in-scale': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.8)',
						filter: 'blur(5px)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)',
						filter: 'blur(0px)'
					}
				},
				'slide-in-left': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-100px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'slide-in-right': {
					'0%': {
						opacity: '0',
						transform: 'translateX(100px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'bounce-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.3)'
					},
					'50%': {
						transform: 'scale(1.1)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				'text-shimmer': {
					'0%': {
						backgroundPosition: '0% 50%'
					},
					'100%': {
						backgroundPosition: '100% 50%'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'float-reverse': 'float-reverse 8s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'rainbow-pulse': 'rainbow-pulse 3s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 20s linear infinite',
				'rotate-reverse': 'rotate-reverse 15s linear infinite',
				'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
				'fade-in-scale': 'fade-in-scale 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				'slide-in-left': 'slide-in-left 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.6s ease-out',
				'bounce-in': 'bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'text-shimmer': 'text-shimmer 2s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
