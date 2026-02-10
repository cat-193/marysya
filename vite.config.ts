import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
// import { fileURLToPath, URL } from 'node:url';

export default defineConfig(({ mode }) => {
	const isProd = mode === 'production';

	return {
		base: isProd ? '/marysya/' : '/',
		plugins: [react()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
				// '@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
					@use "@/styles/variables.scss" as *;
          @use "@/styles/fonts.scss" as *;
          @use "@/styles/mixins.scss" as *;
        `,
				},
			},
		},
	};
});
