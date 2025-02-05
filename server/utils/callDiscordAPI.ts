import type {H3Event} from "h3";

export const callDiscordAPI = async <T>(event: H3Event, path: string, opts: {
    [key: string]: any
} = {}): Promise<T> => {
    const discordToken = await getDiscordToken(event);
    return $fetch<T>(
        "https://discord.com/api/" + path,
        {
            headers: {
                Authorization: discordToken,
            },
        },
    ) as T;
}