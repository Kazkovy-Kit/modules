import type {BotConfig} from "@prisma/client";

export const pingBotAPI = async (botConfig: BotConfig): Promise<boolean> => {
    try {
        const data = await $fetch(
            botConfig.host,
            {
                headers: {
                    Authorization: `Bearer ${botConfig.token}`
                }
            }
        )
        return true
    } catch (e) {
        return false;
    }
}