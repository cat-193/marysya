import type { ToastContentProps } from 'react-toastify';
import './UndoNotification.scss';
import Button from '../Button/Button';

interface IUndoNotificationData {
	onUndo: () => void;
}

function UndoNotification({
	closeToast,
	data,
}: ToastContentProps<IUndoNotificationData>) {
	const handleUndo = () => {
		data.onUndo();
		closeToast(true);
	};

	return (
		<div className='notification-undo'>
			Фильм удален из избранного
			<Button className='notification-undo__button' onClick={handleUndo}>
				Отмена
			</Button>
		</div>
	);
}

export default UndoNotification;
