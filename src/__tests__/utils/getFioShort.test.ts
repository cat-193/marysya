import { getFioShort } from '@/utils/getFioShort';
import { describe, expect, it } from 'vitest';

describe('getFioShort', () => {
	it('have all arguments', () =>
		expect(getFioShort('Иван', 'Петров')).toBe('ИП'));
	it('only name', () => expect(getFioShort('Иван', undefined)).toBe('И'));
	it('only surname', () => expect(getFioShort(undefined, 'Петров')).toBe('П'));
	it('empty string', () => expect(getFioShort('', '')).toBe('NN'));
	it('no arguments', () => expect(getFioShort()).toBe('NN'));
});
