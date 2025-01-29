import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	breakpoints: {
		sm: '320px',
		md: '768px',
		lg: '960px',
		xl: '1200px',
	},
	styles: {
		global: {
			body: {
				bg: '#0B1120', // Darker blue background
				color: '#e2e8f0',
			},
			'::-webkit-scrollbar': {
				width: '10px',
			},
			'::-webkit-scrollbar-track': {
				bg: '#0B1120',
			},
			'::-webkit-scrollbar-thumb': {
				bg: '#1E293B',
				borderRadius: '5px',
			},
		},
	},
	colors: {
		brand: {
			primary: '#3B82F6', // Bright blue
			secondary: '#10b981', // Emerald
			accent: '#8b5cf6', // Purple
			success: '#059669', // Green
			error: '#dc2626', // Red
			warning: '#d97706', // Amber
		},
		background: {
			primary: '#0B1120', // Darker blue
			secondary: '#1E293B',
			card: '#1E293B',
		},
	},
	components: {
		Button: {
			baseStyle: {
				fontWeight: 'semibold',
				borderRadius: 'xl',
			},
			variants: {
				solid: {
					bg: 'brand.primary',
					color: 'white',
					_hover: {
						bg: 'brand.primary',
						opacity: 0.9,
					},
					_active: {
						bg: 'brand.primary',
						opacity: 0.8,
					},
				},
			},
		},
		Card: {
			baseStyle: {
				container: {
					bg: 'background.card',
					borderRadius: 'xl',
					borderWidth: '1px',
					borderColor: 'whiteAlpha.100',
					boxShadow: 'xl',
				},
			},
		},
		Input: {
			variants: {
				filled: {
					field: {
						bg: '#1E293B',
						border: 'none',
						_hover: {
							bg: '#1E293B',
						},
						_focus: {
							bg: '#1E293B',
							borderColor: 'brand.primary',
						},
					},
				},
			},
			defaultProps: {
				variant: 'filled',
			},
		},
		Container: {
			baseStyle: {
				maxW: { base: '100%', md: '800px' },
				px: { base: 4, md: 6 },
			},
		},
	},
});

export default theme;
