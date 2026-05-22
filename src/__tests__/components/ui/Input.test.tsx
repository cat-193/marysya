import Input from '@/components/ui/Input/Input';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('Input', () => {
	it('рендерит input с правильным типом', () => {
		render(<Input type='text' />);
		const input = screen.getByTestId('input-field');
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('type', 'text');
	});

	it('показывает иконку для типа text', () => {
		render(<Input type='text' />);
		expect(document.querySelector('svg')).toBeInTheDocument();
	});

	it('показывает иконку для типа email', () => {
		render(<Input type='email' />);
		expect(document.querySelector('svg')).toBeInTheDocument();
	});

	it('показывает иконку для типа password', () => {
		render(<Input type='password' />);
		expect(document.querySelector('svg')).toBeInTheDocument();
	});

	it('показывает иконку для типа search', () => {
		render(<Input type='search' />);
		expect(document.querySelector('svg')).toBeInTheDocument();
	});

	it('показывает сообщение об ошибке', () => {
		render(<Input error='Обязательное поле' />);
		const error = screen.getByTestId('input-error');
		expect(error).toBeInTheDocument();
		expect(error).toHaveTextContent('Обязательное поле');
		expect(error).toHaveClass('input__error');
	});

	it('добавляет класс input--error при ошибке', () => {
		render(<Input error='Ошибка' />);
		const input = screen.getByTestId('input-field');
		expect(input).toHaveClass('input--error');
	});

	it('пробрасывает placeholder и disabled', () => {
		render(<Input placeholder='Введите текст' disabled />);
		const input = screen.getByTestId('input-field');
		expect(input).toHaveAttribute('placeholder', 'Введите текст');
		expect(input).toBeDisabled();
	});

	it('вызывает onChange при вводе', async () => {
		const user = userEvent.setup();
		const handleChange = vi.fn();
		render(<Input onChange={handleChange} />);

		const input = screen.getByTestId('input-field');
		await user.type(input, 'test');
		expect(handleChange).toHaveBeenCalledTimes(4);
	});

	it('пробрасывает ref к DOM элементу', () => {
		const ref = { current: null };
		render(<Input ref={ref} />);
		expect(ref.current).toBeInstanceOf(HTMLInputElement);
	});

	it('применяет кастомный className к wrapper', () => {
		render(<Input className='custom-wrapper' />);
		const wrapper = screen.getByTestId('input-wrapper');
		expect(wrapper).toHaveClass('custom-wrapper');
	});

	it('применяет класс input--{type}', () => {
		render(<Input type='password' />);
		const input = screen.getByTestId('input-field');
		expect(input).toHaveClass('input--password');
	});

	it('не показывает ошибку когда error не передан', () => {
		render(<Input />);
		expect(screen.queryByTestId('input-error')).not.toBeInTheDocument();
	});
});
