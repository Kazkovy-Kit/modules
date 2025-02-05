import {fileURLToPath} from 'node:url'

export default defineNuxtConfig({
    extends: ['..', [
        'github:Kazkovy-Kit/temporary_voice', {install: true}
    ]],
    modules: ['@nuxt/eslint'],
    // ssr: false,
    eslint: {
        config: {
            // Use the generated ESLint config for "lint" root project as well
            rootDir: fileURLToPath(new URL('..', import.meta.url))
        }
    },

    i18n: {
        locales: [
            {
                code: 'en',
                file: 'en.js'
            },
            {
                code: 'uk',
                file: 'uk.js'
            }
        ]
    },

    compatibilityDate: '2025-01-30'
})