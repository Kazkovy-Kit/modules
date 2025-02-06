<script setup lang="ts">
const router = useRouter()
const {currentGuild} = useGuildsStore()

async function handleResetBot() {
  await currentGuild.reset()
  await router.push({name: 'bots'})
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