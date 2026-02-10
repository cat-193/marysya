import { useLogout } from '@/hooks/api/auth/auth';
import { getErrorMessage } from '@/utils/errorMessage';
import { toastService } from '@/utils/toast';
import { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { closeLogoutConfirmModal } from '../../../store/slices/uiSlice';
import Button from '../../ui/Button/Button';
import Modal from '../../ui/Modal/Modal';
import './LogoutModal.scss';

export const LogoutConfirmModal = memo(() => {
	const logout = useLogout();
	const dispatch = useAppDispatch();
	const { isLogoutConfirmModalOpen } = useAppSelector((state) => state.ui);

	const handleClose = useCallback(() => {
		dispatch(closeLogoutConfirmModal());
	}, [dispatch]);

	const handleConfirm = useCallback(() => {
		try {
			logout.mutate();
			toastService.showSuccess('Вы успешно вышли из аккаунта!');
			handleClose();
		} catch (error) {
			if (error instanceof Error) {
				toastService.showError(getErrorMessage(error));
			} else {
				toastService.showError('Произошла неизвестная ошибка');
			}
		}
	}, [logout, handleClose]);

	return (
		<Modal
			isOpen={isLogoutConfirmModalOpen}
			onClose={handleClose}
			className='auth-modal-container logout-confirm-modal'
		>
			<img className='auth-modal__logo' src='logo-auth.svg' alt='logo' />
			<div className='logout-confirm-modal__content'>
				<h2 className='logout-confirm-modal__title'>Выход из аккаунта</h2>
				<p className='logout-confirm-modal__message'>
					Вы уверены, что хотите выйти из аккаунта?
				</p>

				<div className='logout-confirm-modal__actions'>
					<Button
						onClick={handleClose}
						className='logout-confirm-modal__cancel'
					>
						Отмена
					</Button>
					<Button
						onClick={handleConfirm}
						className='logout-confirm-modal__confirm'
						disabled={logout.isPending}
						isLoading={logout.isPending}
					>
						Выйти
					</Button>
				</div>
			</div>
		</Modal>
	);
});
