export default defineNuxtRouteMiddleware(async (to, from) => {
    const {currentBot} = useBotsStore(useNuxtApp().$pinia);
    if (currentBot.data && currentBot.data.id) {
        return navigateTo({name: 'index'})
    }
});
