<script setup lang="ts">
import type {ExtendedModuleInfo} from "../types";

const shownModule = ref<ExtendedModuleInfo | null>(null)
const route = useRoute()
const {t} = useI18n()
const modulesList = useAppConfig().modules || []
const {modules: guildModules} = useModulesStore()
const props = defineProps<{
  allModulesEnabled?: Boolean,
}>()

await guildModules.fetch()

const modules = computed(() =>
    (guildModules.list)
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

<style scoped>

</style>