type DiscordUserGuildResponse = Array<{
    id: string;
    name: string;
    icon: string;
    banner: string;
    owner: boolean;
    permissions: number;
    permissions_new: string;
    features: any[];
}>;

export default defineEventHandler(async (event) => {
    await requireUserSession(event);
    const guildId = getCookie(event, 'selected:guild');
    if(!guildId) return null;

    return await callBotAPI(event, `guilds/${guildId}`)
});
