import { getRatingColor } from '@/utils/getRatingColor';
import { describe, it, expect } from 'vitest';

describe('getRatingColor', () => {
	it('возвращает "excellent" для рейтинга 8 и выше', () => {
		expect(getRatingColor(8)).toBe('excellent');
		expect(getRatingColor(8.5)).toBe('excellent');
		expect(getRatingColor(10)).toBe('excellent');
	});

	it('возвращает "good" для рейтинга от 7 до 7.9', () => {
		expect(getRatingColor(7)).toBe('good');
		expect(getRatingColor(7.5)).toBe('good');
		expect(getRatingColor(7.9)).toBe('good');
	});

	it('возвращает "average" для рейтинга от 5 до 6.9', () => {
		expect(getRatingColor(5)).toBe('average');
		expect(getRatingColor(6)).toBe('average');
		expect(getRatingColor(6.9)).toBe('average');
	});

	it('возвращает "poor" для рейтинга ниже 5', () => {
		expect(getRatingColor(0)).toBe('poor');
		expect(getRatingColor(4.9)).toBe('poor');
		expect(getRatingColor(4)).toBe('poor');
	});
});
