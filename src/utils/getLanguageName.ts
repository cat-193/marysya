import { LANGUAGES } from '@/constants/language';

export const getLanguageName = (code: string | null): string => {
	if (!code) return 'Не указан';
	return LANGUAGES[code as keyof typeof LANGUAGES] || 'Неизвестный язык';
};
