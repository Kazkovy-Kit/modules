<script setup lang="ts">
const {currentBot} = useBotsStore()
const emits = defineEmits(['reset'])
const {t} = useI18n()

async function resetSelectedBot() {
  await currentBot.reset()
  await nextTick(() => {
    emits('reset')
  })
}
</script>

<template>
  <Button variant="outline" class="" @click="resetSelectedBot">
    <Icon name="lucide:bot" class="h-[1.2rem] w-[1.2rem]"/>
    <span class="sr-only">{{ t('select') }}</span>
  </Button>
</template>

<i18n lang="json">
{
  "en": {
    "select": "Select Bot"
  },
  "uk": {
    "select": "Обрати бота"
  }
}
</i18n>