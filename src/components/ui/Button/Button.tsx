import React, { memo } from 'react';
import { Loader } from '../Loader/Loader';
import './Button.scss';

interface ButtonProps {
	children: React.ReactNode;
	variant?: 'primary' | 'secondary' | 'secondary-icon' | 'empty';
	size?: 'small' | 'medium' | 'large';
	disabled?: boolean;
	isLoading?: boolean;
	onClick?: () => void;
	type?: 'button' | 'submit' | 'reset';
	className?: string;
}

function Button({
	children,
	variant = 'primary',
	size = 'medium',
	disabled,
	isLoading,
	onClick,
	type = 'button',
	className = '',
}: ButtonProps) {
	return (
		<button
			type={type}
			className={`btn btn--${variant} btn--${size} ${className}`}
			disabled={disabled || isLoading}
			onClick={onClick}
		>
			{isLoading ? <Loader /> : children}
		</button>
	);
}

export default memo(Button);
