<script lang="ts" setup>
definePageMeta({
  layout: 'app',
  middleware: 'selected-bot'
})

const {currentBot} = useBotsApi()

</script>

<template>
  <div class="flex gap-2 p-6">
    <Avatar>
      <AvatarImage :src="currentBot.icon"/>
      <AvatarFallback>{{ currentBot.name }}</AvatarFallback>
    </Avatar>
    <div class="before:content-['◂'] before:absolute before:-ml-3.5 before:-mt-2 before:text-5xl">
      <div class="bg-primary text-primary-foreground rounded-md p-6">
        <div>Hello, my name is <b>{{ currentBot.name }}</b></div>
        <div>I live at <b>{{ currentBot.host }}</b></div>
      </div>
    </div>
  </div>
</template>