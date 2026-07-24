import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        port: 5173,
        host: '0.0.0.0',
        watch: {
            usePolling: true, // nécessaire dans Docker
        },
    },
});
