import type {BotConfig} from "@prisma/client";
import prisma from "../../../lib/prisma";

export default defineEventHandler(async (event) => {
    const botId = parseInt(getRouterParam(event, 'id') as string)

    return prisma.botConfig.delete({
        where: {
            id: botId
        }
    });
});
