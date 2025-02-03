// TODO: https://github.com/nuxt/module-builder/issues/141
import {} from 'nuxt/app'
import { defineNuxtPlugin, useBotsApi } from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
    if (!nuxtApp.payload.serverRendered) {
        await useBotsApi().currentBot.value.fetch()
    }
    else if (Boolean(nuxtApp.payload.prerenderedAt) || Boolean(nuxtApp.payload.isCached)) {
        // To avoid hydration mismatch
        nuxtApp.hook('app:mounted', async () => {
            await useBotsApi().currentBot.value.fetch()
        })
    }
})