import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
	closeRegistrationSuccessModal,
	openAuthModal,
} from '../../../store/slices/uiSlice';
import Button from '../../ui/Button/Button';
import Modal from '../../ui/Modal/Modal';

function RegistrationSuccessModal() {
	const dispatch = useAppDispatch();
	const { isRegistrationSuccessModalOpen } = useAppSelector(
		(state) => state.ui,
	);

	const handleClose = () => {
		dispatch(closeRegistrationSuccessModal());
	};

	const handleLogin = () => {
		dispatch(closeRegistrationSuccessModal());
		dispatch(openAuthModal('login'));
	};

	return (
		<Modal
			isOpen={isRegistrationSuccessModalOpen}
			onClose={handleClose}
			className='auth-modal-container registration-success'
		>
			<img className='auth-modal__logo' src='/logo-auth.svg' alt='logo' />
			<div className='registration-success__content'>
				<h2 className='registration-success__title'>Регистрация завершена</h2>
				<p className='registration-success__message'>
					Используйте вашу электронную почту для входа
				</p>
				<div className='registration-success__actions'>
					<Button onClick={handleLogin} className='auth-modal__submit'>
						Войти
					</Button>
				</div>
			</div>
		</Modal>
	);
}

export default RegistrationSuccessModal;
