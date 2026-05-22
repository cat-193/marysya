export function getTrailerUrl(
	trailerUrl: string | null,
	trailerYoutubeId: string | null,
) {
	if (trailerYoutubeId) {
		return trailerYoutubeId;
	}

	if (trailerUrl) {
		return getVideoIdFromWatchUrl(trailerUrl);
	}
}

function getVideoIdFromWatchUrl(url: string) {
	const urlObj = new URL(url);
	return urlObj.searchParams.get('v');
}
