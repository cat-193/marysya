/* eslint-disable prettier/prettier */
import { defineConfig } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/setupTests.ts',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			include: ['src/**/*.{ts,tsx}'],
			exclude: [
				'src/**/*.test.{ts,tsx}',
				'src/**/*.spec.{ts,tsx}',
				'src/main.tsx',
				'src/vite-env.d.ts',
				'src/**/*.d.ts',
				'src/constants'
			],
			thresholds: {
				statements: 80,
				branches: 50,
				functions: 50,
				lines: 50,
			},
		},
	},
});
