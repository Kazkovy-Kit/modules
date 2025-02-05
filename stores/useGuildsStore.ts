import type {GuildInfo} from "../types";

export const useGuildsStore = defineStore('guilds', () => {
    const currentGuildId = useCookie<number | undefined>("selected:guild")
    const guildsState = useFetch<GuildInfo[]>('/api/guilds', {
        dedupe: 'defer',
        default: () => [],
        immediate: false
    })
    const currentGuildState = useFetch<GuildInfo | null>('/api/guild', {
        dedupe: 'defer',
        default: () => null,
        immediate: false,
        watch: [currentGuildId]
    });

    return {
        guilds: {
            list: guildsState.data,
            fetch: guildsState.execute,
            status: guildsState.status
        },
        currentGuild: {
            data: currentGuildState.data,
            fetch: currentGuildState.execute,
            select: (id: number) => {
                currentGuildId.value = id
            },
            reset: () => {
                currentGuildId.value = undefined
            }
        }
    }
})