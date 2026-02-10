import { memo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import {
	closeAuthModal,
	setAuthModalMode,
} from '../../../store/slices/uiSlice';
import Modal from '../../ui/Modal/Modal';
import './AuthModal.scss';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import RegistrationSuccessModal from './RegistrationSuccessModal';

function AuthModal() {
	const dispatch = useAppDispatch();
	const { isAuthModalOpen, authModalMode } = useAppSelector(
		(state) => state.ui,
	);

	const isLogin = authModalMode === 'login';

	const handleClose = useCallback(() => {
		dispatch(closeAuthModal());
	}, [dispatch]);

	const handleSwitchMode = useCallback(() => {
		const newMode = isLogin ? 'register' : 'login';
		dispatch(setAuthModalMode(newMode));
	}, [isLogin, dispatch]);

	return (
		<>
			<Modal
				isOpen={isAuthModalOpen}
				onClose={handleClose}
				className='auth-modal-container'
			>
				<img className='auth-modal__logo' src='logo-auth.svg' alt='logo' />
				{isLogin ? (
					<LoginForm onSwitchMode={handleSwitchMode} onClose={handleClose} />
				) : (
					<RegisterForm onSwitchMode={handleSwitchMode} onClose={handleClose} />
				)}
			</Modal>
			<RegistrationSuccessModal />
		</>
	);
}

export default memo(AuthModal);
