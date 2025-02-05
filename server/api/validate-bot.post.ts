export default defineEventHandler(async (event) => {
    await requireUserSession(event);

    const {host} = await readBody(event)

    return await pingBotAPI({
        id: 0,
        host: host,
        icon: "",
        discord_id: "0",
        name: "",
    })
});
