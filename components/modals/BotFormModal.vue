<script setup lang="ts">
import {useForm, Field} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import z from "zod";
import type {BotInfo} from "../../types";

type Props = {
  bot?: BotInfo
}

const {t} = useI18n()
const props = defineProps<Props>()
const valid = ref<boolean | null>(null)
const validationError = ref<string | null>(null)
const pending = ref(false)
const emit = defineEmits(['updated', 'close'])

const form = useForm({
  validationSchema: toTypedSchema(z.object({
    name: z.string(),
    icon: z.string().url(),
    host: z.string().url()
  })),
  initialValues: {
    name: props.bot?.name,
    icon: props.bot?.icon,
    host: props.bot?.host ?? "http://127.0.0.1:8080/",
  }
})

const validate = async () => {
  pending.value = true
  validationError.value = null
  valid.value = null
  try {
    await form.validate()
    valid.value = await $fetch('/api/validate-bot', {
      method: "POST",
      body: {
        host: form.values.host
      }
    })
  } catch (e: any) {
    validationError.value = e
  }
  pending.value = false
}

if (props.bot) {
  await validate()
}

const onSubmit = form.handleSubmit(async (values: any) => {
  pending.value = true
  if (props.bot) {
    await $fetch('/api/bot/' + props.bot.id, {
      method: 'PUT',
      body: values,
    })
    toast({
      variant: "success",
      title: t('alerts.success'),
      description: t('alert.updated')
    })
  } else {
    await $fetch('/api/bots', {
      method: 'POST',
      body: values,
    })
    toast({
      variant: "success",
      title: t('alerts.success'),
      description: t('alert.added')
    })
  }

  pending.value = false
  emit('updated') //@todo Maybe we should send separate events

})

</script>

<template>
  <Dialog :open="true" @update:open="$emit('close')">
    <form @submit="onSubmit">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ t('title') }}</DialogTitle>
        </DialogHeader>


        <Field v-slot="{componentField}" name="name">
          <FormItem>
            <FormLabel>
              {{ t('name.name') }}
            </FormLabel>
            <Input type="text" v-bind="componentField"/>
            <FormMessage/>
          </FormItem>
        </Field>

        <Field v-slot="{componentField}" name="icon">
          <FormItem>
            <FormLabel>
              {{ t('icon.name') }}
            </FormLabel>
            <div class="flex items-center gap-2">
              <Input type="text" v-bind="componentField"/>
              <Avatar>
                <AvatarImage :src="componentField.modelValue"/>
              </Avatar>
            </div>
            <FormMessage/>
            <FormDescription>
              {{ t('icon.description') }}: <code class="bg-primary p-0.5 rounded text-primary-foreground">https://example.com/icon.png</code>
            </FormDescription>
          </FormItem>
        </Field>

        <Field v-slot="{componentField}" name="host">
          <FormItem>
            <FormLabel>
              {{ t('host.name') }}
            </FormLabel>
            <Input type="text" v-bind="componentField"/>
            <FormMessage/>
            <FormDescription>
              {{ t('host.description') }}
            </FormDescription>
          </FormItem>
        </Field>


        <Alert variant="info" v-if="valid === true">
          <AlertDescription>
            {{ t('success') }}
          </AlertDescription>
        </Alert>

        <Alert variant="destructive" v-if="valid === false">
          <AlertDescription>
            {{ t('not_valid') }}
          </AlertDescription>
        </Alert>

        <Alert variant="destructive" v-if="validationError">
          <AlertDescription>{{ validationError }}</AlertDescription>
        </Alert>

        <DialogFooter>
          <Button class="mr-auto" variant="secondary" :loading="pending" :disabled="pending" @click="validate">
            {{ t('validate') }}
          </Button>
          <Button varian="outline" @click="onSubmit" :loading="pending" :disabled="!valid || pending">
            {{ props.bot ? t('update') : t('add') }}
          </Button>
          <DialogClose as-child>
            <Button variant="ghost" :loading="pending" :disabled="pending">
              {{ t('cancel') }}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </form>

  </Dialog>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Add your bot instance",
    "validate": "Validate",
    "update": "Update",
    "add": "Add",
    "success": "Connection to your bot was successful. You can proceed",
    "not_valid": "We could not connect to your bot. Check the 'host' field value",
    "host": {
      "name": "Host",
      "description": "Web API address to your bot instance."
    },
    "icon": {
      "name": "Icon",
      "description": "Link to your bot icon in format"
    },
    "name": {
      "name": "Name"
    },
    "alert": {
      "added": "Bot was successfully added to database",
      "updated": "Bot was successfully updated"
    }
  },
  "uk": {
    "title": "Додайте свій інстанс бота",
    "validate": "Провірити",
    "update": "Оновити",
    "add": "Додати",
    "success": "Зєднання із вашим ботом вдалось. Ви можете додати його.",
    "not_valid": "Ми не змогли зєднатись із вашим ботом. Перевірте значення поля 'хост'",
    "host": {
      "name": "Хост",
      "description": "Посилання на Web API адреса до вашого бота"
    },
    "icon": {
      "name": "Іконка",
      "description": "Посилання на зображення в форматі"
    },
    "name": {
      "name": "Назва"
    },
    "alert": {
      "added": "Бот був успішно доданий до бази",
      "updated": "Бот був успішно оновлено"
    }
  }
}
</i18n>