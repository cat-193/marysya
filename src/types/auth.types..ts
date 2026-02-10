import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email('Некорректный формат email'),
	password: z.string().min(6, 'Пароль должен содержать не менее 6 символов'),
});

export const registerSchema = z
	.object({
		email: z.email('Некорректный email'),
		name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
		surname: z.string().min(2, 'Фамилия должна содержать минимум 2 символа'),
		password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	});

export const successResponseSchema = z.object({
	result: z.literal(true),
});

export const errorResponseSchema = z.object({
	error: z.string(),
});

export const userProfileSchema = z.object({
	name: z.string(),
	surname: z.string(),
	email: z.string().email(),
	favorites: z.array(z.string()),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type IUser = z.infer<typeof userProfileSchema>;
export type SuccessResponse = z.infer<typeof successResponseSchema>;
export type ErrorResponse = z.infer<typeof errorResponseSchema>;
