import axios from 'axios';
import type { ErrorResponse } from 'react-router-dom';
import { api } from '../../lib/axios';
import {
	errorResponseSchema,
	type IUser,
	type LoginFormData,
	type RegisterFormData,
	type SuccessResponse,
	successResponseSchema,
	userProfileSchema,
} from '../../types/auth.types.';
import { API_ROUTES } from '../../constants/apiRoutes';

export const authKeys = {
	register: () => ['register'] as const,
	login: () => ['login'] as const,
	profile: () => ['profile'] as const,
};

export const authApi = {
	login: async (
		data: LoginFormData,
	): Promise<SuccessResponse | ErrorResponse> => {
		const response = await api.post(API_ROUTES.LOGIN, data);
		try {
			return successResponseSchema.parse(response.data);
		} catch {
			const errorData = errorResponseSchema.parse(response.data);
			throw new Error(errorData.error);
		}
	},

	register: async (
		data: Omit<RegisterFormData, 'confirmPassword'>,
	): Promise<SuccessResponse | ErrorResponse> => {
		const response = await api.post(API_ROUTES.REGISTER, data);
		try {
			return successResponseSchema.parse(response.data);
		} catch {
			const errorData = errorResponseSchema.parse(response.data);
			throw new Error(errorData.error);
		}
	},

	logout: async (): Promise<void> => {
		const response = await api.get(API_ROUTES.LOGOUT);
		return response.data;
	},

	getCurrentUser: async (): Promise<IUser | null> => {
		try {
			const response = await api.get(API_ROUTES.PROFILE);

			if (!response.data) {
				return null;
			}

			return userProfileSchema.parse(response.data);
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 401) {
				return null;
			}
			throw error;
		}
	},
};
