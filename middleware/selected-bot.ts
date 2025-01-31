export default defineNuxtRouteMiddleware(async (to, from) => {
    const {currentBot} = useBotsApi();
    await currentBot.value.fetch()
    if (!currentBot.value.id) {
        navigateTo({name: 'bots'});
        return
    }
});
