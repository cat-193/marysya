import { getErrorMessage } from '@/utils/errorMessage';
import { toastService } from '@/utils/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { favoritesApi, favoritesKeys } from '../../../services/api/favorites';
import { openAuthModal } from '../../../store/slices/uiSlice';
import { useAppDispatch } from '../../redux';
import { useUser } from '../auth/useUser';
import { showUndoNotification } from '@/utils/showUndoNotification';

export const useFavorites = () => {
	const { user } = useUser();

	return useQuery({
		queryKey: favoritesKeys.list(),
		queryFn: favoritesApi.getFavorites,
		enabled: !!user,
		staleTime: 5 * 60 * 1000,
	});
};

export const useFavoriteStatus = (movieId: number) => {
	const { data: favorites } = useFavorites();

	const isFavorite = favorites?.some((movie) => movie.id === movieId);

	return {
		isFavorite: favorites ? isFavorite : false,
	};
};

const useFavoriteMutation = (
	mutationFn: (movieId: number) => Promise<unknown>,
	actionType: 'add' | 'remove',
) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn,
		onSuccess: (_, movieId) => {
			queryClient.invalidateQueries({
				queryKey: favoritesKeys.list(),
			});

			if (actionType === 'add') {
				toastService.showSuccess('Фильм добавлен в избранное');
			} else {
				showUndoNotification(movieId, queryClient);
			}
		},
		onError: (error: Error) => {
			const action = actionType === 'add' ? 'добавлении' : 'удалении';
			toastService.showError(
				`Ошибка при ${action} фильма: ${getErrorMessage(error.message)}`,
			);
		},
	});
};

export const useAddToFavorites = () => {
	return useFavoriteMutation(favoritesApi.addToFavorites, 'add');
};

export const useRemoveFromFavorites = () => {
	return useFavoriteMutation(favoritesApi.removeFromFavorites, 'remove');
};

export const useToggleFavorite = () => {
	const dispatch = useAppDispatch();
	const { user } = useUser();
	const addMutation = useAddToFavorites();
	const removeMutation = useRemoveFromFavorites();
	const { data: favorites } = useFavorites();

	const toggleFavorite = async (movieId: number) => {
		if (!user) {
			dispatch(openAuthModal('login'));
			return;
		}
		const isCurrentlyFavorite = favorites?.some(
			(movie) => movie.id === movieId,
		);

		if (isCurrentlyFavorite) {
			await removeMutation.mutateAsync(movieId);
		} else {
			await addMutation.mutateAsync(movieId);
		}
	};

	return {
		toggleFavorite,
		isLoading: addMutation.isPending || removeMutation.isPending,
		isAuthenticated: !!user,
	};
};
