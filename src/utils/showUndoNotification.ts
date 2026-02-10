import { favoritesApi, favoritesKeys } from '@/services/api/favorites';
import type { QueryClient } from '@tanstack/react-query';
import { getErrorMessage } from './errorMessage';
import { toastService } from './toast';

export const showUndoNotification = async (
	movieId: number,
	queryClient: QueryClient,
) => {
	const handleUndo = async () => {
		try {
			await favoritesApi.addToFavorites(movieId);
			await queryClient.invalidateQueries({ queryKey: favoritesKeys.list() });
			toastService.showSuccess('Фильм возвращен в избранное');
		} catch (error) {
			const message =
				error instanceof Error
					? `Не удалось вернуть фильм в избранное ${getErrorMessage(error.message)}`
					: 'Не удалось вернуть фильм в избранное';

			toastService.showError(message);
		}
	};

	toastService.undo(handleUndo);
};
