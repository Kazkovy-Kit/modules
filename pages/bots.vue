<script setup lang="ts">
import BotFormModal from "../components/modals/BotFormModal.vue";
import type {BotInfo} from "../types";

definePageMeta({
  middleware: ['not-selected-bot']
})

const {bots, currentBot} = useBotsApi()
await bots.value.fetch()
const loading = ref(false)
const router = useRouter()
const {t} = useI18n({
  useScope: 'local'
})

const botForEditing = ref<BotInfo | undefined>(undefined)
const showFormModal = ref(false)

const submitSelection = async (id: number) => {
  await currentBot.value.select(id);
  loading.value = true;
  await router.push({
    name: 'index'
  })
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
  await bots.value.refresh()
  loading.value = false
  toast({
    variant: "success",
    title: "Успішно",
    description: "Зміни успішно збережені"
  })
}
const onBotUpdated = async() => {
  showFormModal.value = false
  botForEditing.value = undefined
  await bots.value.refresh()
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
        <div
            :disabled="loading || !bot.online"
            :class="{'hover:cursor-not-allowed': !bot.online}"
            v-for="(bot, index) in bots.data"
            :key="bot.id"
            class="group relative aspect-square rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-300 hover:cursor-pointer"
        >
          <Icon name="lucide:loader-circle"
                class="absolute z-20 inset-0 h-2/4 animate-spin self-center w-full object-cover text-gray-300 border-gray-700"
                v-if="loading"/>

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
                <Button variant="outline" @click="showForm(bot)">
                  <Icon name="lucide:pencil"/>
                </Button>
                <Button variant="destructive" @click="deleteBot(bot)">
                  <Icon name="lucide:trash"/>
                </Button>
              </div>

            </div>
          </div>
        </div>

        <!-- Custom Bot Request Block -->
        <button
            @click="showForm(null)"
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
    "offline": "Offline"
  },
  "uk": {
    "welcome": "Вітаємо",
    "description": "Будь ласка оберіть бота або створіть свого",
    "add_own_bot": "Додайте власного бота",
    "offline": "Виключений"
  }
}
</i18n>