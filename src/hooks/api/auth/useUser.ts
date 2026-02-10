import { useEffect } from 'react';
import { setAuthenticated } from '../../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux';
import { useCurrentUser } from './auth';

export const useUser = () => {
	const { data: user, isLoading, error, refetch } = useCurrentUser();
	const dispatch = useAppDispatch();
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	useEffect(() => {
		if (!isLoading) {
			dispatch(setAuthenticated(!!user));
		}
	}, [user, isLoading, dispatch]);

	useEffect(() => {
		if (isAuthenticated && !user && !isLoading) {
			refetch();
		}
	}, [isAuthenticated, user, isLoading, refetch]);

	return {
		user: user || null,
		isLoading,
		error,
		isAuthenticated: !!user && !isLoading,
		refetch,
	};
};
