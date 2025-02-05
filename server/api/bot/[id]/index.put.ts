import z from "zod";
import prisma from "../../../../lib/prisma";

export default defineEventHandler(async (event) => {
    await requireUserSession(event)

    const botId = parseInt(getRouterParam(event, 'id') as string)

    const body = await readValidatedBody(event, z.object({
        name: z.string(),
        discord_id: z.string(),
        icon: z.string().url(),
        host: z.string().url()
    }).parse)

    const botConfigs = await prisma.botConfig.findMany()

    return prisma.botConfig.update({
        where: {
            id: botId
        },
        data: {
            host: body.host,
            discord_id: body.discord_id,
            name: body.name,
            icon: body.icon
        }
    });
});
