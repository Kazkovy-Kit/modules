<script lang="ts" setup>
import type {ExtendedModuleInfo, LocalModuleInfo} from "../../types";

type Props = {
  module: ExtendedModuleInfo
}

defineProps<Props>()
const emit = defineEmits(['close'])

const {t} = useI18n()
const loading = ref(false)
const appConfig = useAppConfig()
const modulesList: LocalModuleInfo[] = appConfig.modules || []
const {module: moduleFactory, modules} = useModulesAPI(modulesList)

async function enable(module: ExtendedModuleInfo) {
  loading.value = true
  await moduleFactory(module).enable()
  loading.value = false

  toast({
    variant: 'success',
    title: t('alerts.success'),
    description: t(`enabled`, {module: t(`modules.${module.id}.name`)}),
  })

  await modules.refresh()
  emit('close')

}
</script>

<template>
  <Dialog :open="true" @update:open="$emit('close')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ t('title', {module: t(`modules.${module.id}.name`)}) }}</DialogTitle>
        <DialogDescription class="prose text-primary prose-strong:text-primary prose-strong:font-bolder">
          <MDC :value="t(`modules.${module.id}.description`)" tag="p"/>
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button varian="outline" @click="enable(module)" :loading="loading">{{ t('action') }}</Button>
        <DialogClose as-child>
          <Button variant="ghost">{{ t('cancel') }}</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Module \"{module}\"",
    "action": "Enable",
    "cancel": "Cancel",
    "enabled": "You have successfully turned on {module} module for your guild"
  },
  "uk": {
    "title": "Модуль \"{module}\"",
    "action": "Включити",
    "cancel": "Відмінити",
    "enabled": "Ви успішно включили модуль {module} для своєї гільдії"
  }
}
</i18n>
