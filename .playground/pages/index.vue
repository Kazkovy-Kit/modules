<script lang="ts" setup>
definePageMeta({
  layout: 'app',
  middleware: ['auth', 'selected-bot']
})

const {currentBot} = useBotsStore()

</script>

<template>
  <div class="flex gap-2 p-6" v-if="currentBot.data">
    <Avatar>
      <AvatarImage :src="currentBot.data.icon"/>
      <AvatarFallback>{{ currentBot.data.name }}</AvatarFallback>
    </Avatar>
    <div class="before:content-['◂'] before:absolute before:-ml-3.5 before:-mt-2 before:text-5xl">
      <div class="bg-primary text-primary-foreground rounded-md p-6">
        <div>Hello, my name is <b>{{ currentBot.data.name }}</b></div>
        <div>I live at <b>{{ currentBot.data.host }}</b></div>
      </div>
    </div>
  </div>
</template>