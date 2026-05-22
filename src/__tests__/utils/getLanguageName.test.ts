import { getLanguageName } from '@/utils/getLanguageName';
import { describe, expect, it } from 'vitest';

describe('getLanguageName', () => {
	it('возвращает название для существующего кода', () => {
		expect(getLanguageName('ru')).toBe('Русский');
		expect(getLanguageName('en')).toBe('Английский');
		expect(getLanguageName('uk')).toBe('Украинский');
	});

	it('возвращает "Неизвестный язык" для неподдерживаемого кода', () => {
		expect(getLanguageName('xx')).toBe('Неизвестный язык');
		expect(getLanguageName('latin')).toBe('Неизвестный язык');
	});

	it('возвращает "Не указан" если код отсутствует', () => {
		expect(getLanguageName(null)).toBe('Не указан');
		expect(getLanguageName('')).toBe('Не указан');
	});
});
