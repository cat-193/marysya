import { API_ROUTES } from '../../constants/apiRoutes';
import { api } from '../../lib/axios';
import type { TMovie } from '../../types/movie.types';

export const favoritesKeys = {
	all: ['favorites'] as const,
	list: () => [...favoritesKeys.all, 'list'] as const,
	movie: (id: number) => [...favoritesKeys.all, 'movie', id] as const,
};

export const favoritesApi = {
	getFavorites: async (): Promise<TMovie[]> => {
		const response = await api.get(API_ROUTES.FAVORITES);
		if (!Array.isArray(response.data)) {
			return [];
		}
		return response.data;
	},

	addToFavorites: async (id: number): Promise<void> => {
		await api.post(API_ROUTES.FAVORITES, { id: id.toString() });
	},

	removeFromFavorites: async (movieId: number): Promise<void> => {
		await api.delete(`${API_ROUTES.FAVORITES}/${movieId.toString()}`);
	},
};
