export default defineNuxtRouteMiddleware(async (to, from) => {
    const {currentBot} = useBotsApi();
    if (currentBot.value.id === undefined) {
        return navigateTo({name: 'bots'});
    }
});
