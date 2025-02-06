import type {BotGuildResponse, DiscordUserGuildResponse} from "../../../types";

export default defineEventHandler(async (event) => {
    await requireUserSession(event);

    const guilds = await callBotAPI<BotGuildResponse>(event, `guilds`)

    return Object.values(guilds).map((guild) => ({
        id: guild.id,
        icon: guild.icon,
        name: guild.name,
    }));
});
