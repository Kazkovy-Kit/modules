import type {H3Event} from "h3";
import prisma from "../../lib/prisma";

export const getBotConfig = async (event: H3Event) => {
    let {'x-bot-id': botId} = getHeaders(event)

    if (!botId) {
        botId = getCookie(event, 'selected:bot')
    }

    if (!botId) {
        throw createError({
            statusCode: 404,
            statusMessage: "Bot ID not found",
        });
    }


    const data = await prisma.botConfig.findFirst({
        where: {
            id: parseInt(botId),
        },
    });

    if (!data) {
        throw createError({
            statusCode: 404,
            statusMessage: "Bot config not found",
        });
    }

    return {
        ...data,
        host: data.host.replace(/\/$|$/, '/')
    };
}