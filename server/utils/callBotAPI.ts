import type {H3Event} from "h3";

export const callBotAPI = async <T>(event: H3Event, path: string, opts: any = {}): Promise<T> => {
    const botConfig = await getBotConfig(event);
    return await $fetch<T>(
        botConfig.host + path,
        {
            ...opts,
            headers: {
                Authorization: `Bearer ${botConfig.token}`,
            },
        },
    ) as T;
}