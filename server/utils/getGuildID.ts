import type {H3Event} from "h3";

export const getGuildID = (event: H3Event) => {
    const guildId = getCookie(event, 'selected:guild');
    if (!guildId) {
        throw createError({
            statusCode: 404,
            statusMessage: "Guild ID not found",
        });
    }
    return guildId;
}