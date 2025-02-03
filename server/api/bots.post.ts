import prisma from "../../lib/prisma";
import z from "zod";

export default defineEventHandler(async (event) => {
    const body = await readValidatedBody(event, z.object({
        name: z.string(),
        icon: z.string().url(),
        host: z.string().url()
    }).parse)

    const botConfigs = await prisma.botConfig.findMany()

    return prisma.botConfig.create({
        data: {
            host: body.host,
            name: body.name,
            icon: body.icon
        }
    });
});
