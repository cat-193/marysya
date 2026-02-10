export const API_ROUTES = {
	LOGIN: '/auth/login',
	LOGOUT: '/auth/logout',
	REGISTER: '/user',
	PROFILE: '/profile',
	FAVORITES: '/favorites',
	MOVIE_RANDOM: '/movie/random',
	MOVIE_TOP: '/movie/top10',
	MOVIE_GENRES: '/movie/genres',
	MOVIE_BY_ID: (id: number) => `/movie/${id}`,
	MOVIES_BY_GENRE: (genre: string) =>
		`/movie?genre=${encodeURIComponent(genre)}`,
	MOVIE_SEARCH: (query: string) => `/movie?title=${encodeURIComponent(query)}`,
} as const;
