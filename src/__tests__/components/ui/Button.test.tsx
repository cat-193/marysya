import Button from '@/components/ui/Button/Button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/components/ui/Loader/Loader', () => ({
	Loader: () => <div data-testid='loader'>Loading...</div>,
}));

describe('Button', () => {
	it('рендерит кнопку с текстом', () => {
		render(<Button>Click me</Button>);
		expect(screen.getByText('Click me')).toBeInTheDocument();
	});

	it('применяет правильные CSS классы для разных вариантов', () => {
		const { rerender } = render(<Button variant='primary'>Btn</Button>);
		expect(screen.getByRole('button')).toHaveClass('btn--primary');

		rerender(<Button variant='secondary'>Btn</Button>);
		expect(screen.getByRole('button')).toHaveClass('btn--secondary');

		rerender(<Button variant='empty'>Btn</Button>);
		expect(screen.getByRole('button')).toHaveClass('btn--empty');
	});

	it('применяет правильные CSS классы для разных размеров', () => {
		const { rerender } = render(<Button size='small'>Btn</Button>);
		expect(screen.getByRole('button')).toHaveClass('btn--small');

		rerender(<Button size='medium'>Btn</Button>);
		expect(screen.getByRole('button')).toHaveClass('btn--medium');

		rerender(<Button size='large'>Btn</Button>);
		expect(screen.getByRole('button')).toHaveClass('btn--large');
	});

	it('вызывает onClick при клике', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Click</Button>);

		await user.click(screen.getByRole('button'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('не вызывает onClick когда disabled', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(
			<Button disabled onClick={handleClick}>
				Click
			</Button>,
		);

		await user.click(screen.getByRole('button'));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('имеет правильный type', () => {
		render(<Button type='submit'>Submit</Button>);
		expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
	});

	it('показывает Loader когда isLoading=true', () => {
		render(<Button isLoading>Loading</Button>);
		expect(screen.getByTestId('loader')).toBeInTheDocument();
		expect(screen.queryByText('Loading')).not.toBeInTheDocument();
	});

	it('disabled=true когда isLoading=true', () => {
		render(<Button isLoading>Loading</Button>);
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('не вызывает onClick когда isLoading', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(
			<Button isLoading onClick={handleClick}>
				Click
			</Button>,
		);

		await user.click(screen.getByRole('button'));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('применяет кастомный className', () => {
		render(<Button className='custom-class'>Btn</Button>);
		expect(screen.getByRole('button')).toHaveClass('custom-class');
	});
});
