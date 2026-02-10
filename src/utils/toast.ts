import UndoNotification from '@/components/ui/notifications/UndoNotification';
import { toast } from 'react-toastify';
import { getErrorMessage } from './errorMessage';

export const toastService = {
	showSuccess: (message: string) => {
		toast.success(message);
	},

	showError: (error: unknown) => {
		toast.error(getErrorMessage(error));
	},

	undo: (onUndo: () => void) => {
		toast.info(UndoNotification, {
			closeButton: true,
			autoClose: 5000,
			closeOnClick: false,
			data: { onUndo },
		});
	},
};
