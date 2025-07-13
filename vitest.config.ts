import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    test: {
        environment: 'jsdom', // Explicitly set jsdom
        globals: true,
        setupFiles: ['./tests/setup.ts'],
        include: ['tests/**/*.{test,spec}.{ts,js}'],
        environmentOptions: {
            jsdom: {
                resources: 'usable', // Ensure resources like TextEncoder are loaded
            },
        },
    },
    resolve: {
        alias: {
            '~': './',
        },
    },
})