import type {BotInfo} from "../types";
import type {AsyncDataExecuteOptions} from "#app/composables/asyncData";

export const useBotsApi = function () {

    const bots = useAsyncData<BotInfo[] | null>('bots', () => $fetch('/api/bots'), {
        default: () => null,
        immediate: false,
        dedupe: 'defer'
    })

    const currentBotId = useCookie<number | null>('selected:bot')

    const {
        data: currentBotData,
        execute: fetchCurrentBot,
        refresh: refreshCurrentBot
    } = useAsyncData<BotInfo | null>('bot', () => $fetch('/api/bot'), {
        dedupe: 'defer',
        immediate: false,
        default: () => null,
    })


    const currentBot = useState<BotInfo | null>('current:bot', () => currentBotData.value)


    return {
        bots: computed(() => ({
            data: bots.data.value,
            status: bots.status,
            fetch: bots.execute,
            refresh: bots.refresh,
        })),
        currentBot: computed(() => ({
            ...currentBot.value,
            fetch: async (ops: AsyncDataExecuteOptions = {}) => {
                await fetchCurrentBot(ops)
                currentBot.value = currentBotData.value
            },
            select: async (id: number, ops: AsyncDataExecuteOptions = {}) => {
                currentBotId.value = id
                await fetchCurrentBot(ops)
                currentBot.value = currentBotData.value
            },
            reset: () => {
                currentBotId.value = null
                currentBot.value = null
            }
        })),
    }
}