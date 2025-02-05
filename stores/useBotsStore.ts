import type {BotInfo} from "../types";

export const useBotsStore = defineStore('bots', () => {
    const currentBotId = useCookie<number | undefined>('selected:bot')

    const botsState = useFetch<BotInfo[]>('api/bots', {
        dedupe: 'defer',
        default: () => [],
    })

    const currentBotState = useFetch<BotInfo | null>('/api/bot', {
        dedupe: 'defer',
        immediate: false,
        default: () => null,
        watch: [currentBotId]
    })


    return {
        bots: {
            list: botsState.data,
            fetch: botsState.execute
        },
        currentBot: {
            data: currentBotState.data,
            fetch: currentBotState.execute,
            select: async (id: number) => {
                currentBotId.value = id
                await currentBotState.refresh()
            },
            reset: async () => {
                currentBotId.value = undefined
                await currentBotState.refresh()
            }
        }
    }
})