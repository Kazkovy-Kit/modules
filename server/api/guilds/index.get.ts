import type {BotGuildResponse, DiscordUserGuildResponse} from "../../../types";

export default defineEventHandler(async (event) => {
    await requireUserSession(event);

    const guilds = await callBotAPI<BotGuildResponse>(event, `guilds`)

    return Object.values(guilds).map((guild) => ({
            id: guild.id,
            icon: guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : 'https://i1.wp.com/w7.pngwing.com/pngs/609/846/png-transparent-discord-logo-discord-computer-icons-logo-computer-software-avatar-miscellaneous-blue-angle.png',
            name: guild.name,
        }));
});
