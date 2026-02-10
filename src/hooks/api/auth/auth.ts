import { PAGE_ROUTES } from '@/constants/pageRoutes';
import { useAppDispatch } from '@/hooks/redux';
import { authApi, authKeys } from '@/services/api/auth';
import { logout, setAuthenticated } from '@/store/slices/authSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
	return useMutation({
		mutationKey: authKeys.register(),
		mutationFn: authApi.register,
	});
};

export const useLogin = () => {
	const dispatch = useAppDispatch();

	return useMutation({
		mutationFn: authApi.login,
		mutationKey: authKeys.login(),
		onSuccess: () => {
			dispatch(setAuthenticated(true));
		},
	});
};

export const useLogout = () => {
	const queryClient = useQueryClient();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: authApi.logout,
		onSuccess: () => {
			queryClient.clear();
			dispatch(logout());
			navigate(PAGE_ROUTES.HOME);
		},
	});
};

export const useCurrentUser = () => {
	return useQuery({
		queryKey: authKeys.profile(),
		queryFn: authApi.getCurrentUser,
		retry: false,
		staleTime: 24 * 60 * 60 * 1000,
		gcTime: 24 * 60 * 60 * 1000,
	});
};
