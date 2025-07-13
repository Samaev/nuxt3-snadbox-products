// vitest.config.ts
import { defineVitestConfig } from '@nuxt/test-utils/config';
import vue from '@vitejs/plugin-vue'; // Import Vue plugin for Vite

export default defineVitestConfig({
    plugins: [
        vue(), // Add the Vue plugin
    ],
    test: {
        globals: true, // Makes test functions like 'describe', 'it', 'expect' globally available
        environment: 'jsdom', // Simulates a browser DOM environment
        setupFiles: ['./test/setup.ts'], // Path to a setup file for global mocks/configs
        include: [
            './**/*.test.ts', // Include all files ending with .test.ts in any subdirectory
            './**/*.spec.ts', // Also commonly used for test files
        ],
        coverage: {
            reporter: ['text', 'json', 'html'], // Output coverage in different formats
        },
        testTransformMode: {
            web: ['\\.vue$'], // This tells Vitest to process .vue files with Vite's web transformers
        },
        server: { // `server` configuration for vite-node
            deps: {
                inline: [ // `inline` here accepts RegExp
                    /@nuxt/,  // Use RegExp for scoped Nuxt packages
                    /@vue/,   // Use RegExp for scoped Vue packages
                    'nuxt',   // String for the main Nuxt package
                    // You might also need to include specific packages like:
                    // '@vue/test-utils', // If it causes issues, though less common here
                    // 'vue', // The 'vue' package itself
                ],
            },
        },
    },
});