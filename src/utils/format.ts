export const formatNumber = (num: number | undefined | null): string => {
	if (num === undefined || num === null) {
		return 'N/A';
	}
	if (num >= 1e9) {
		return (num / 1e9).toFixed(2) + 'B';
	}
	if (num >= 1e6) {
		return (num / 1e6).toFixed(2) + 'M';
	}
	if (num >= 1e3) {
		return (num / 1e3).toFixed(2) + 'K';
	}
	return num.toFixed(2);
};

export const formatDate = (timestamp: number): string => {
	return new Date(timestamp * 1000).toLocaleString();
};
