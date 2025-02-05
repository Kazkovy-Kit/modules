import type {DiscordUserGuildResponse} from "../../../../types";

export default defineEventHandler(async (event) => {
    await requireUserSession(event)

    const {id} = getRouterParams(event)

    return await callDiscordAPI<DiscordUserGuildResponse>(
        event,
        `guilds/${id}/channels`
    )
});
