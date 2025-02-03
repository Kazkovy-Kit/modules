export default defineEventHandler(async (event) => {
    const {host} = await readBody(event)
    return await pingBotAPI({
        id: 0,
        host: host,
        discord_id: "0",
        icon: "",
        token: "",
        name: "",
        guildSum: BigInt(0)
    })
});
