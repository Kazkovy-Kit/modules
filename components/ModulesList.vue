<script setup lang="ts">
const props = defineProps<{
  allModulesEnabled?: Boolean,
}>()

const {t} = useI18n()
const modulesList = useAppConfig().modules || []
const {modules: guildModules} = useModulesStore()
const {currentGuild} = useGuildsStore()


</script>

<template>
  <Alert v-if="!currentGuild.data" variant="info"
         class="mt-4 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:hidden">
    <AlertTitle>{{ t('alerts.info') }}.</AlertTitle>
    <AlertDescription>
      {{ t('please_select_guild') }}.
    </AlertDescription>
  </Alert>

  <Alert v-if="!modulesList.length" variant="destructive"
         class="mt-4 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:hidden">
    <AlertTitle>{{ t('alerts.error') }}.</AlertTitle>
    <AlertDescription>
      {{ t('no_modules_found') }}.
    </AlertDescription>
  </Alert>

  <Alert v-if="guildModules.status === 'error'" variant="destructive"
         class="mt-4 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:hidden">
    <AlertTitle>{{ t('alerts.error') }}.</AlertTitle>
    <AlertDescription>
      {{ t('error') }}.
    </AlertDescription>
  </Alert>

  <Modules v-if="currentGuild.data" :all-modules-enabled="allModulesEnabled"/>

</template>

<i18n lang="json">
{
  "en": {
    "no_modules_found": "We could not find any modules that are installed into your bot, and into panel",
    "please_select_guild": "Please select your guild before accessing any module",
    "error": "We could not get information about available modules for your guild",
    "active": "Active",
    "notActive": "Not active"
  },
  "uk": {
    "no_modules_found": "Ми не змогли знайти жодного бота який був б встановлений у боті, та в панелі",
    "please_select_guild": "Будь ласка оберіть свій сервер перед тим як отримати доступ до модулів",
    "error": "Ми не змогли отримати інформацію по доступним модулям для вашого серверу",
    "active": "Активний",
    "notActive": "Не активний"
  }
}
</i18n>
