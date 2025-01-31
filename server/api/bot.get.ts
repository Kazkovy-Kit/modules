import prisma from "../../lib/prisma";

export default defineEventHandler(async (event) => {
    const botId = parseInt(getCookie(event, 'selected:bot') ?? '')


    const config = useAppConfig()

    if (config.dev) {
        return [
            {
                id: 1,
                discord_id: "1",
                host: 'fake-host.com',
                icon: 'https://psverso.com.br/wp-content/uploads/2021/08/hydra-bot-1024x1024.png',
                name: 'Fake Bot',
                token: 'fake token',
                online: true
            }
        ].find(bot => bot.id === botId);
    }

    return (await prisma.botConfig.findMany())
        .map((botConfig) => ({
            ...botConfig,
            guildSum: Number(botConfig.guildSum)
        }))
        .find(bot => bot.id === botId)
});
