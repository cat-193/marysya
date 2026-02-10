export const getRatingColor = (rating: number): string => {
	if (rating >= 8) return 'excellent';
	if (rating >= 7) return 'good';
	if (rating >= 5) return 'average';
	return 'poor';
};
