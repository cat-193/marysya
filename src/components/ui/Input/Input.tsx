import { inputIcons } from '@/constants/inputIcons';
import React, { forwardRef, memo } from 'react';
import './Input.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	className?: string;
}

const Input = memo(
	forwardRef<HTMLInputElement, InputProps>(
		({ type = 'text', error, className = '', ...props }, ref) => {
			const icon = inputIcons[type as keyof typeof inputIcons];

			return (
				<div
					className={`input-wrapper ${className}`}
					data-testid='input-wrapper'
				>
					<div className='input-wrapper__box'>
						{icon && (
							<span className='input-icon' data-testid='input-icon'>
								{icon}
							</span>
						)}
						<input
							ref={ref}
							type={type}
							className={`input input--${type} ${error ? 'input--error' : ''}`}
							data-testid='input-field'
							{...props}
						/>
					</div>
					{error && (
						<span className='input__error' data-testid='input-error'>
							{error}
						</span>
					)}
				</div>
			);
		},
	),
);

Input.displayName = 'Input';

export default Input;
