import { API_ROUTES } from '@/constants/apiRoutes';
import { api } from '../../lib/axios';
import {
	type TGenres,
	type TMovie,
	genresSchema,
	movieSchema,
} from '../../types/movie.types';

export const movieKeys = {
	all: ['movie'] as const,
	random: () => [...movieKeys.all, 'random'] as const,
	top: () => [...movieKeys.all, 'top'] as const,
	movie: (id: number) => [...movieKeys.all, id] as const,
	genres: () => [...movieKeys.all, 'genres'] as const,
	movies_by_genre: (genre: string) =>
		[...movieKeys.all, 'by-genre', genre] as const,
	search: (query: string) => [...movieKeys.all, 'search', query] as const,
};

export const moviesApi = {
	getRandomMovie: async (): Promise<TMovie> => {
		const response = await api.get(API_ROUTES.MOVIE_RANDOM);
		return movieSchema.parse(response.data);
	},

	getTopTenMovies: async (): Promise<TMovie[]> => {
		const response = await api.get(API_ROUTES.MOVIE_TOP);
		return movieSchema.array().parse(response.data);
	},

	getMovieById: async (id: number): Promise<TMovie> => {
		const response = await api.get(API_ROUTES.MOVIE_BY_ID(id));
		return movieSchema.parse(response.data);
	},

	getGenres: async (): Promise<TGenres> => {
		const response = await api.get(API_ROUTES.MOVIE_GENRES);
		return genresSchema.parse(response.data);
	},

	getByGenre: async (genre: string) => {
		const response = await api.get(API_ROUTES.MOVIES_BY_GENRE(genre));
		return response.data;
	},

	getSearchMovies: async (query: string): Promise<TMovie[]> => {
		const response = await api.get(API_ROUTES.MOVIE_SEARCH(query));
		return movieSchema.array().parse(response.data);
	},
};
