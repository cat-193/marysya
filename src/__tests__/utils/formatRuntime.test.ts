import { formatRuntime } from '@/utils/formatRuntime';
import { describe, it, expect } from 'vitest';

describe('formatRuntime', () => {
	it('Format hours and minutes', () => {
		expect(formatRuntime(90)).toBe('1 ч 30 мин');
	});

	it('handles boundary values', () => {
		expect(formatRuntime(0)).toBe('0 ч 0 мин');
		expect(formatRuntime(60)).toBe('1 ч 0 мин');
	});

	it('Format minutes only', () => {
		expect(formatRuntime(45)).toBe('0 ч 45 мин');
	});
});
