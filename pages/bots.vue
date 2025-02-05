<script setup lang="ts">
import BotFormModal from "../components/modals/BotFormModal.vue";
import type {BotInfo} from "../types";

definePageMeta({
  middleware: ['not-selected-bot']
})

const {bots, currentBot} = useBotsStore()

await bots.fetch()

const loading = ref(false)
const router = useRouter()
const {t} = useI18n({
  useScope: 'local'
})

const botForEditing = ref<BotInfo | undefined>(undefined)
const showFormModal = ref(false)

const submitSelection = async (id: number) => {
  loading.value = true;
  try {
    await $fetch(`api/bot/${id}/auth`)
    await currentBot.select(id);
    await router.push({
      name: 'index'
    })
  } catch (e) {
    toast({
      variant: 'destructive',
      title: t('alerts.error'),
      description: String(e)
    })
  }
  loading.value = false;
};
const showForm = (bot: BotInfo | undefined = undefined) => {
  botForEditing.value = bot
  showFormModal.value = true
}
const deleteBot = async (bot: BotInfo) => {
  loading.value = true
  await $fetch(`api/bot/${bot.id}`, {
    method: "DELETE"
  })
  await bots.fetch()
  loading.value = false
  toast({
    variant: "success",
    title: t('alerts.success'),
    description: t('alert.deleted')
  })
}
const onBotUpdated = async () => {
  showFormModal.value = false
  botForEditing.value = undefined
  await bots.fetch()
}
</script>

<template>
  <div
      class="min-h-screen bg-background flex flex-col items-center justify-center p-4"
  >
    <div class="w-full max-w-4xl">
      <h1 class="text-3xl font-bold text-foreground mb-2 text-center">
        {{ t('welcome') }}
      </h1>
      <p class="text-xl text-muted-foreground mb-8 text-center">
        {{ t('description') }}.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Button
            :disabled="loading || !bot.online"
            :loading="loading"
            :class="{'hover:cursor-not-allowed': !bot.online}"
            v-for="(bot, index) in bots.list"
            :key="bot.id"
            class="group w-full h-full p-0 relative aspect-square rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-300 hover:cursor-pointer"
        >

          <img
              :src="bot.icon"
              :alt="bot.name"
              class="h-full w-full object-cover"
              :class="{'opacity-15': loading}"
          />

          <div v-if="!bot.online"
               class="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-primary-foreground/90 text-primary">
            <Icon name="lucide:power-off" class="w-24 h-24"/>
            <span class="text-4xl">{{ t('offline') }}</span>
          </div>

          <div
              class="absolute inset-0 bg-black bg-opacity-40 p-4 flex flex-col justify-between"
              :class="{'opacity-15': loading}"
              @click.self="submitSelection(bot.id)"
          >
            <div class="flex justify-between items-start">
              <h3 class="text-white text-xl font-semibold">
                {{ bot.name }}
              </h3>

              <div class="gap-2 hidden group-hover:flex">
                <Button variant="secondary" @click="showForm(bot)">
                  <Icon name="lucide:pencil"/>
                </Button>
                <Button variant="destructive" @click="deleteBot(bot)">
                  <Icon name="lucide:trash"/>
                </Button>
              </div>

            </div>
          </div>
        </Button>

        <!-- Custom Bot Request Block -->
        <button
            @click="showForm()"
            class="relative aspect-square rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-300 bg-primary text-secondary"
        >
          <div
              class="absolute inset-0 p-4 flex flex-col items-center justify-center"
          >
            <Icon name="lucide:plus" class="h-12 w-12 mb-2"/>
            <h3
                class="text-xl font-semibold text-center"
            >
              {{ t('add_own_bot') }}
            </h3>
          </div>
        </button>
        <BotFormModal v-if="showFormModal" @updated="onBotUpdated" @close="showFormModal = false" :bot="botForEditing"/>
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "welcome": "Welcome",
    "description": "Please choose your bot, or add a new one",
    "add_own_bot": "Add your own bot",
    "offline": "Offline",
    "alert": {
      "deleted": "Bot was successfully removed from database"
    }
  },
  "uk": {
    "welcome": "Вітаємо",
    "description": "Будь ласка оберіть бота або створіть свого",
    "add_own_bot": "Додайте власного бота",
    "offline": "Виключений",
    "alert": {
      "deleted": "Ви успішно видалили бота із бази даних"
    }
  }
}
</i18n>