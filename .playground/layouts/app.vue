<script setup lang="ts">
const router = useRouter()

function handleResetBot() {
  router.push({name: 'bots'})
}
</script>

<template>
  <DashboardLayout>

    <template #modules>
      <ModulesList />
    </template>

    <template #top-buttons>
      <LanguageSelect/>
      <ThemeSelect/>
      <BotSelectButton @reset="handleResetBot"/>
    </template>

    <slot/>

  </DashboardLayout>
</template>