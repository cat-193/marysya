import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useRegister } from '../../../hooks/api/auth/auth';
import { useAppDispatch } from '../../../hooks/redux';
import { openRegistrationSuccessModal } from '../../../store/slices/uiSlice';
import {
	type RegisterFormData,
	registerSchema,
} from '../../../types/auth.types.';
import { getErrorMessage } from '../../../utils/errorMessage';
import { toastService } from '../../../utils/toast';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';

interface RegisterFormProps {
	onSwitchMode: () => void;
	onClose: () => void;
}

function RegisterForm({ onSwitchMode, onClose }: RegisterFormProps) {
	const registerMutation = useRegister();
	const dispatch = useAppDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
		watch,
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const watchedPassword = watch('password');
	const watchedConfirmPassword = watch('confirmPassword');

	const onSubmit = useCallback(
		(data: RegisterFormData) => {
			try {
				const registerData = {
					email: data.email,
					name: data.name,
					surname: data.surname,
					password: data.password,
				};

				registerMutation.mutate(registerData);

				onClose();
				reset();
				dispatch(openRegistrationSuccessModal());
				toastService.showSuccess(
					'Регистрация прошла успешно! Добро пожаловать!',
				);
			} catch (error) {
				if (error instanceof Error) {
					toastService.showError(getErrorMessage(error));
				} else {
					toastService.showError('Произошла неизвестная ошибка');
				}
			}
		},
		[registerMutation, onClose, reset, dispatch],
	);

	const passwordsMatch = useMemo(() => {
		return watchedPassword === watchedConfirmPassword;
	}, [watchedPassword, watchedConfirmPassword]);

	return (
		<form noValidate onSubmit={handleSubmit(onSubmit)}>
			<h2 className='auth-modal__title'>Регистрация</h2>
			<div className='auth-modal__content'>
				<Input
					autoFocus
					type='email'
					autoComplete='email'
					placeholder='Электронная почта'
					error={errors.email?.message}
					disabled={isSubmitting}
					{...register('email')}
				/>
				<Input
					type='text'
					placeholder='Имя'
					autoComplete='username'
					error={errors.name?.message}
					disabled={isSubmitting}
					{...register('name')}
				/>
				<Input
					type='text'
					placeholder='Фамилия'
					autoComplete='family-name'
					error={errors.surname?.message}
					disabled={isSubmitting}
					{...register('surname')}
				/>

				<Input
					type='password'
					placeholder='Пароль'
					autoComplete='new-password'
					error={errors.password?.message}
					disabled={isSubmitting}
					{...register('password')}
				/>

				<Input
					type='password'
					placeholder='Подтвердите пароль'
					autoComplete='new-password'
					error={errors.confirmPassword?.message}
					disabled={isSubmitting}
					{...register('confirmPassword')}
				/>

				{watchedPassword && watchedConfirmPassword && (
					<div
						className={`password-match ${
							passwordsMatch
								? 'password-match--valid'
								: 'password-match--invalid'
						}`}
					></div>
				)}
			</div>

			<div className='auth-modal__actions'>
				<Button
					type='submit'
					className='auth-modal__submit'
					disabled={isSubmitting}
					isLoading={isSubmitting}
				>
					{isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
				</Button>

				<button
					type='button'
					className='auth-modal__switch'
					onClick={onSwitchMode}
					disabled={isSubmitting}
				>
					У меня есть пароль
				</button>
			</div>
		</form>
	);
}

export default memo(RegisterForm);
