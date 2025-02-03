// TODO: https://github.com/nuxt/module-builder/issues/141
import {} from 'nuxt/app'
import { defineNuxtPlugin, useRequestEvent, useBotsApi } from '#imports'

export default defineNuxtPlugin({
    name: 'current-bot-fetch-plugin',
    enforce: 'pre',
    async setup(nuxtApp) {
        // Flag if request is cached
        nuxtApp.payload.isCached = Boolean(useRequestEvent()?.context.cache)
        if (nuxtApp.payload.serverRendered && !nuxtApp.payload.prerenderedAt && !nuxtApp.payload.isCached) {
            await useBotsApi().currentBot.value.fetch()
        }
    },
})