import { ICONS } from '@/constants/icons';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import './Modal.scss';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	className?: string;
}

function Modal({ isOpen, onClose, children, className = '' }: ModalProps) {
	const [isVisible, setIsVisible] = useState(false);
	const [shouldRender, setShouldRender] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const previousActiveElement = useRef<HTMLElement | null>(null);

	const handleClose = useCallback(() => {
		setIsVisible(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [onClose]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				handleClose();
				return;
			}

			if (e.key === 'Tab' && modalRef.current) {
				const focusableElements = modalRef.current.querySelectorAll(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
				);
				const firstElement = focusableElements[0] as HTMLElement;
				const lastElement = focusableElements[
					focusableElements.length - 1
				] as HTMLElement;

				if (e.shiftKey) {
					if (document.activeElement === firstElement) {
						e.preventDefault();
						lastElement?.focus();
					}
				} else {
					if (document.activeElement === lastElement) {
						e.preventDefault();
						firstElement?.focus();
					}
				}
			}
		},
		[handleClose],
	);

	useEffect(() => {
		if (isOpen) {
			setShouldRender(true);
			previousActiveElement.current = document.activeElement as HTMLElement;
			document.addEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'hidden';

			setTimeout(() => {
				setIsVisible(true);
				const firstInput = modalRef.current?.querySelector(
					'input, textarea',
				) as HTMLElement;
				const elementToFocus =
					firstInput ||
					(modalRef.current?.querySelector(
						'button, [href], select, [tabindex]:not([tabindex="-1"])',
					) as HTMLElement);
				elementToFocus?.focus();
			}, 10);
		} else {
			setIsVisible(false);

			setTimeout(() => {
				setShouldRender(false);
				previousActiveElement.current?.focus();
			}, 300);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, handleKeyDown]);

	if (!shouldRender) return null;

	return (
		<div
			className={`modal-overlay ${isVisible ? 'modal-overlay--visible' : ''}`}
			onClick={handleClose}
		>
			<div
				ref={modalRef}
				className={`modal ${isVisible ? 'modal--visible' : ''} ${className}`}
				onClick={(e) => e.stopPropagation()}
				role='dialog'
				aria-modal='true'
			>
				<button className='modal__close' onClick={handleClose}>
					{ICONS.cross}
				</button>
				<div className='modal__content'>{children}</div>
			</div>
		</div>
	);
}

export default memo(Modal);
