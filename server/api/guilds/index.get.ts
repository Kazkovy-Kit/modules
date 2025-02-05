import type {BotGuildResponse, DiscordUserGuildResponse} from "../../../types";

export default defineEventHandler(async (event) => {
    await requireUserSession(event);

    const guildsWhereBotIsRequest = callBotAPI<BotGuildResponse>(event, `guilds`)
    const discordUserGuildsRequest = await callDiscordAPI<DiscordUserGuildResponse>(event, 'users/@me/guilds')

    const [guildsWhereBotIs, discordUserGuilds] = await Promise.all([
        guildsWhereBotIsRequest,
        discordUserGuildsRequest,
    ]);

    const guildsWhereBotIsIds = Object.keys(guildsWhereBotIs);
    const guildsWhereUserIsAdmin = discordUserGuilds.filter((guild) =>
        (guild.permissions & 0x20) === 0x20,
    );

    return guildsWhereUserIsAdmin
        .filter((guild) => guildsWhereBotIsIds.includes(guild.id))
        .map((guild) => ({
            id: guild.id,
            logo: guild.icon ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png` : 'https://i1.wp.com/w7.pngwing.com/pngs/609/846/png-transparent-discord-logo-discord-computer-icons-logo-computer-software-avatar-miscellaneous-blue-angle.png',
            name: guild.name,
        }));
});
