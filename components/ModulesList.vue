<script setup lang="ts">
import type {ExtendedModuleInfo, LocalModuleInfo} from "../types";

const props = defineProps<{
  allModulesEnabled?: Boolean,
  fetchGuildModules?: Boolean
}>()

const shownModule = ref<ExtendedModuleInfo | null>(null)
const route = useRoute()
const {t} = useI18n()

const appConfig = useAppConfig()
const modulesList: LocalModuleInfo[] = appConfig.modules || [] as LocalModuleInfo[]
const {modules: guildModules} = useModulesAPI(modulesList)


if (props.fetchGuildModules) {
  await guildModules.fetch()
}

const modules = computed(() =>
    (guildModules.list.value || [])
        .filter(guildModule => modulesList.find(moduleItem => moduleItem.id === guildModule.id))
        .map((guildModule) => ({
              ...modulesList.find(moduleItem => moduleItem.id === guildModule.id),
              enabled: props.allModulesEnabled ? true : guildModule.enabled
            })
        )
)

function showModule(module: ExtendedModuleInfo) {
  shownModule.value = module
}
</script>

<template>

  <Alert v-if="!modulesList.length" variant="destructive"
         class="mt-4 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:hidden">
    <AlertTitle>{{ t('alerts.error') }}.</AlertTitle>
    <AlertDescription>
      {{ t('no_modules_found') }}.
    </AlertDescription>
  </Alert>

  <Alert v-if="guildModules.status.value === 'error'" variant="destructive"
         class="mt-4 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:hidden">
    <AlertTitle>{{ t('alerts.error') }}.</AlertTitle>
    <AlertDescription>
      {{ t('alert') }}.
    </AlertDescription>
  </Alert>

  <template v-for="module in modules">
    <SidebarMenuButton
        v-if="!module.enabled"
        :tooltip="t(`modules.${module.id}.name`)"
        @click="showModule(module)"
    >
      <Tooltip>
        <TooltipTrigger as-child>
          <Icon :name="module.icon" class="text-gray-500"/>
        </TooltipTrigger>
        <TooltipContent>
          {{ t('notActive') }}
        </TooltipContent>
        <span>{{ t(`modules.${module.id}.name`) }}</span>
      </Tooltip>
    </SidebarMenuButton>

    <Collapsible
        v-else
        :key="module.id"
        as-child
        class="group/collapsible"
        :default-open="route.matched.findIndex(matched => matched.name === module.id) !== -1"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger as-child>
          <SidebarMenuButton :tooltip="module.title">
            <Tooltip>
              <TooltipTrigger as-child>
                <Icon :name="module.icon" class="text-green-500"/>
              </TooltipTrigger>
              <TooltipContent>
                {{ t('active') }}
              </TooltipContent>
              <span>{{ t(`modules.${module.id}.name`) }}</span>
              <Icon name="lucide:chevron-right"
                    class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
            </Tooltip>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem
                v-for="subItem in module.items"
                :key="subItem.title"
            >
              <SidebarMenuSubButton as-child :is-active="route.name === subItem.to.name">
                <NuxtLink :to="subItem.to">
                  <span>{{ t(`modules.${module.id}.items.${subItem.id}`) }}</span>
                </NuxtLink>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>

  </template>

  <ModalsModuleInfoModal v-if="shownModule" :module="shownModule" @close="shownModule = null"/>
</template>

<i18n lang="json">
{
  "en": {
    "no_modules_found": "We could not find any modules that are installed into your bot, and into panel",
    "alert": "We could not get information about available modules for your guild",
    "active": "Active",
    "notActive": "Not active"
  },
  "uk": {
    "no_modules_found": "Ми не змогли знайти жодного бота який був б встановлений у боті, та в панелі",
    "alert": "Ми не змогли отримати інформацію по доступним модулям для вашого серверу",
    "active": "Активний",
    "notActive": "Не активний"
  }
}
</i18n>
