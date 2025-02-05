import prisma from "../../lib/prisma";

export default defineEventHandler(async (event) => {
    await requireUserSession(event);

    const config = useAppConfig()

    if (config.dev) {
        return [
            {
                id: 1,
                discord_id: "1",
                host: 'fake-host.com',
                icon: 'https://psverso.com.br/wp-content/uploads/2021/08/hydra-bot-1024x1024.png',
                name: 'Fake Bot',
                online: true
            }
        ]
    }


    const botConfigs = await prisma.botConfig.findMany()
    const pingPromises = botConfigs.map(botConfig => pingBotAPI(botConfig))
    const pings = await Promise.all(pingPromises)

    return botConfigs.map((botConfig, key) => ({
        ...botConfig,
        online: pings[key]
    }))
});
