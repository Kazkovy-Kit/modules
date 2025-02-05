import prisma from "../../../../lib/prisma";
import type {BotAuthResponse} from "../../../../types";

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
    const user = session.user as { id: string }

    const botId = parseInt(getRouterParam(event, 'id') as string)

    const botConfig = await prisma.botConfig.findFirst({
        where: {
            id: botId
        }
    })

    if (!botConfig) {
        throw createError({
            statusCode: 404
        })
    }

    const discordToken = await getDiscordToken(event);


    let bat = await prisma.botAccessToken.findFirst({
        where: {
            botConfigId: botConfig.id,
            user_id: user.id
        }
    })

    if (!bat) {
        const authToken = await $fetch<BotAuthResponse>(
            botConfig?.host + 'auth',
            {
                method: "POST",
                body: {
                    token: discordToken
                }
            },
        )
        bat = await prisma.botAccessToken.create({
            data: {
                bot_config: {
                    connect: {
                        id: botConfig.id
                    }
                },
                user_id: authToken.user.id,
                token: authToken.token
            }
        })
    }

    await setUserSession(event, {
        secure: {
            bot_token: bat.token
        }
    })

    return 'ok'
});
