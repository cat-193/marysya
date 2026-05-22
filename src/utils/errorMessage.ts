// errorMessage.ts
export const getErrorMessage = (error: unknown): string => {
	if (typeof error === 'string') return error;

	if (typeof error !== 'object' || error === null) {
		return 'Произошла неизвестная ошибка';
	}

	const errorObj = error as Record<string, unknown>;

	const status = errorObj.status;
	if (typeof status === 'number') {
		switch (status) {
			case 400:
				return 'Некорректные данные. Проверьте введенную информацию';
			case 409:
				return 'Пользователь с таким email уже существует';
			case 422:
				return 'Ошибка валидации данных';
			case 429:
				return 'Слишком много запросов. Попробуйте позже';
			case 500:
				return 'Внутренняя ошибка сервера. Попробуйте позже';
			default:
				return 'Произошла ошибка. Попробуйте еще раз';
		}
	}

	const message =
		(typeof errorObj.message === 'string' && errorObj.message) ||
		(typeof errorObj.data === 'object' &&
			errorObj.data !== null &&
			typeof (errorObj.data as Record<string, unknown>).message === 'string' &&
			((errorObj.data as Record<string, unknown>).message as string));

	if (typeof message === 'string') {
		if (message.includes('Network Error')) {
			return 'Проблемы с соединением. Проверьте интернет';
		}
		if (message.includes('timeout')) {
			return 'Превышено время ожидания. Попробуйте позже';
		}
		return humanizeErrorMessage(message);
	}

	if (error instanceof Error) {
		return error.message;
	}

	return 'Произошла неизвестная ошибка. Попробуйте еще раз';
};

const humanizeErrorMessage = (message: string): string => {
	const humanizedMessages: Record<string, string> = {
		'user already exists': 'Пользователь с таким email уже существует',
		'invalid credentials': 'Неверный email или пароль',
		'password too weak': 'Пароль слишком простой',
		'email already taken': 'Этот email уже используется',
		'validation failed': 'Проверьте правильность введенных данных',
		'internal server error': 'Внутренняя ошибка сервера',
	};

	const lowerMessage = message.toLowerCase();

	for (const [techMessage, humanMessage] of Object.entries(humanizedMessages)) {
		if (lowerMessage.includes(techMessage)) {
			return humanMessage;
		}
	}

	return message.replace(/Error:|Exception:|at .*/, '').trim();
};
