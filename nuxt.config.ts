export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ['nuxt-markdown-render'],
    extends: [
        ['github:Kazkovy-Kit/ui', {install: true}],
    ]
})
