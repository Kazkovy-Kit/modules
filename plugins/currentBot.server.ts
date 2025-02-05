// TODO: https://github.com/nuxt/module-builder/issues/141
import {} from 'nuxt/app'
import {defineNuxtPlugin, useRequestEvent} from '#imports'

export default defineNuxtPlugin({
    name: 'current-bot-fetch-plugin',
    enforce: 'pre',
    dependsOn: ['session-fetch-plugin', 'pinia'],
    async setup(nuxtApp) {
        // Flag if request is cached
        nuxtApp.payload.isCached = Boolean(useRequestEvent()?.context.cache)
        if (nuxtApp.payload.serverRendered && !nuxtApp.payload.prerenderedAt && !nuxtApp.payload.isCached) {
            await useBotsStore(nuxtApp.vueApp.$nuxt.$pinia).currentBot.fetch()
        }
    },
})