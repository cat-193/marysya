import { Component, type ReactNode } from 'react';
import Button from '../ui/Button/Button';

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
	state: State = { hasError: false };

	static getDerivedStateFromError(): State {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return (
				this.props.fallback || (
					<div
						style={{
							padding: '2rem',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<h2
							style={{
								color: '#fff',
								fontSize: '2rem',
								marginBottom: '1rem',
							}}
						>
							Что-то пошло не так
						</h2>
						<Button
							variant='secondary'
							onClick={() => window.location.reload()}
						>
							Обновить страницу
						</Button>
					</div>
				)
			);
		}
		return this.props.children;
	}
}
