import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['**/*.test.ts'],
        exclude: ['node_modules', 'dist'],
        testTimeout: 10000,
        setupFiles: ['allure-vitest/setup'],
        reporters: [
            'default',
            ['allure-vitest/reporter', {
                resultsDir: './allure-results',
            }]
        ],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            reportsDirectory: './coverage'
        }
    }
});