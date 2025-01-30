export const config = {
	API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://0.0.0.0:8000/api',
	ENV: import.meta.env.MODE,
	IS_PRODUCTION: import.meta.env.PROD,
};
