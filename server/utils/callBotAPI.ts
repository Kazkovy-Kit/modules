import type {H3Event} from "h3";

export const callBotAPI = async <T>(event: H3Event, path: string, opts: any = {}): Promise<T> => {
    const botConfig = await getBotConfig(event);
    const {secure} = await getUserSession(event)
    return await $fetch<T>(
        botConfig.host + path,
        {
            ...opts,
            headers: {
                Authorization: `Bearer ${secure?.bot_token}`,
            },
        },
    ) as T;
}