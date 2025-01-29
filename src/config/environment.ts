export const config = {
	API_BASE_URL:
		import.meta.env.VITE_API_BASE_URL ||
		'https://backend-defi.onrender.com/api',
	ENV: import.meta.env.MODE,
	IS_PRODUCTION: import.meta.env.PROD,
};
