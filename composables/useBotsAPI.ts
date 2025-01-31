import type {BotInfo} from "../types";

export const useBotsApi = function () {

    const bots = useAsyncData<BotInfo[] | null>('bots', () => $fetch('/api/bots'), {
        default: () => null,
        immediate: false,
        dedupe: 'defer'
    })

    const currentBotId = useCookie<number | undefined>('selected:bot')

    const currentBot = useAsyncData<BotInfo | null>('bot', () => currentBotId.value ? $fetch('/api/bot') : Promise.resolve(null), {
        dedupe: 'defer',
        default: () => null,
        watch: [currentBotId]
    })

    return {
        bots: computed(() => ({
            data: bots.data.value,
            status: bots.status,
            fetch: bots.execute
        })),
        currentBot: computed(() => ({
            ...currentBot.data.value,
            status: currentBot.status,
            fetch: currentBot.execute,
            select: (id: number) => {
                currentBotId.value = id
            },
            reset: () => {
                currentBotId.value = undefined
            }
        })),
    }
}