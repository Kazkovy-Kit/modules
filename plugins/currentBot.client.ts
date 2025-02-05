// TODO: https://github.com/nuxt/module-builder/issues/141
import {} from 'nuxt/app'
import {defineNuxtPlugin} from '#imports'

export default defineNuxtPlugin(async (nuxtApp) => {
    if (!nuxtApp.payload.serverRendered) {
        if (useUserSession().loggedIn.value) {
            console.log(useBotsStore())
            await useBotsStore(nuxtApp.vueApp.$nuxt.$pinia).currentBot.fetch()
        }
    } else if (Boolean(nuxtApp.payload.prerenderedAt) || Boolean(nuxtApp.payload.isCached)) {
        // To avoid hydration mismatch
        nuxtApp.hook('app:mounted', async () => {
            if (useUserSession().loggedIn.value) {
                await useBotsStore(nuxtApp.vueApp.$nuxt.$pinia).currentBot.fetch()
            }
        })
    }
})