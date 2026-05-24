import { defineConfig } from 'orval';
export default defineConfig({
	cinemaguide: {
		input: {
			target: 'https://cinemaguide.skillbox.cc/api-docs',
		},
		output: {
			mode: 'tags-split',
			target: 'src/api/cinema.ts',
			schemas: 'src/api/model',
			client: 'react-query',
			mock: true,
			override: {
				mutator: {
					path: './src/lib/mutator.ts',
				},
			},
		},
		hooks: {
			afterAllFilesWrite: 'prettier --write',
		},
	},
	cinemaguideZod: {
		input: {
			target: 'https://cinemaguide.skillbox.cc/api-docs',
		},
		output: {
			mode: 'tags-split',
			client: 'zod',
			target: 'src/api/endpoints',
			fileExtension: '.zod.ts',
		},
		hooks: {
			afterAllFilesWrite: 'prettier --write',
		},
	},
});
