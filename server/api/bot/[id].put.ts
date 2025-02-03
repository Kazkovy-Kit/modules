import z from "zod";
import prisma from "../../../lib/prisma";

export default defineEventHandler(async (event) => {
    const botId = parseInt(getRouterParam(event, 'id') as string)

    const body = await readValidatedBody(event, z.object({
        name: z.string(),
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
            name: body.name,
            icon: body.icon
        }
    });
});
