export const config = {
	API_BASE_URL:
		import.meta.env.VITE_API_BASE_URL ||
		'https://defi-security-monitor-c64c8cf280f0.herokuapp.com/api',
	ENV: import.meta.env.MODE,
	IS_PRODUCTION: import.meta.env.PROD,
};
