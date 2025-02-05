<script setup lang="ts">
const router = useRouter()

async function handleResetBot() {
  await router.push({name: 'bots'})
  console.log('bots redirect')
}
</script>

<template>
  <DashboardLayout>

    <template #guilds>
      <GuildChoose/>
    </template>

    <template #modules>
      <ModulesList/>
    </template>

    <template #top-buttons>
      <LanguageSelect/>
      <ThemeSelect/>
      <BotSelectButton @reset="handleResetBot"/>
    </template>

    <template #auth>
      <AuthButton />
    </template>

    <slot/>

  </DashboardLayout>
</template>