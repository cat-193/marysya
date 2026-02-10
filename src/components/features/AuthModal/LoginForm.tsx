import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../../hooks/api/auth/auth';
import { type LoginFormData, loginSchema } from '../../../types/auth.types.';
import { getErrorMessage } from '../../../utils/errorMessage';
import { toastService } from '../../../utils/toast';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';

interface LoginFormProps {
	onSwitchMode: () => void;
	onClose: () => void;
}

function LoginForm({ onSwitchMode, onClose }: LoginFormProps) {
	const loginMutation = useLogin();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit = useCallback(
		async (data: LoginFormData) => {
			try {
				await loginMutation.mutateAsync(data);
				onClose();
				reset();
				toastService.showSuccess(
					'Авторизация прошла успешно! Добро пожаловать!',
				);
			} catch (error) {
				if (error instanceof Error) {
					toastService.showError(getErrorMessage(error));
				} else {
					toastService.showError('Произошла неизвестная ошибка');
				}
			}
		},
		[loginMutation, onClose, reset],
	);

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='auth-modal__content'>
				<Input
					autoFocus
					type='email'
					autoComplete='email'
					placeholder='Электронная почта'
					error={errors.email?.message}
					{...register('email')}
				/>
				<Input
					type='password'
					placeholder='Пароль'
					autoComplete='current-password'
					error={errors.password?.message}
					{...register('password')}
				/>
			</div>

			<div className='auth-modal__actions'>
				<Button type='submit' className='auth-modal__submit'>
					Войти
				</Button>

				<button
					type='button'
					className='auth-modal__switch'
					onClick={onSwitchMode}
				>
					Регистрация
				</button>
			</div>
		</form>
	);
}

export default memo(LoginForm);
