import type {LocalModuleInfo, ModuleInfo} from "../types";

export const useModulesStore = defineStore('modules', () => {
    const modulesList = useAppConfig().modules || []


    const modulesState = useAsyncData<ModuleInfo[]>("modules", () => $fetch(`/api/modules`), {
        default: () => modulesList.map(module => ({
            id: module.id,
            name: module.id,
            enabled: false
        })),
        immediate: false,
        dedupe: 'defer'
    });

    async function enable(module: ModuleInfo) {
        return await $fetch(`/api/modules/${module.id}/enable`, {
            method: 'POST',
        })
    }

    return {
        modules: {
            list: modulesState.data,
            status: modulesState.status,
            fetch: modulesState.execute
        },
        module: (module: ModuleInfo) => ({
            enable: () => enable(module)
        })
    }
})