import type {ModuleInfo, LocalModuleInfo} from "../types";

export const useModulesAPI = function (dashboardModules: LocalModuleInfo[] = []) {

    const modules = useAsyncData<ModuleInfo[]>("modules", () => $fetch(`/api/modules`), {
        default: () => dashboardModules,
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
            list: useNuxtData<ModuleInfo[]>('modules').data,
            fetch: modules.execute,
            status: modules.status,
            refresh: modules.refresh
        },
        module: (module: ModuleInfo) => ({
            enable: () => enable(module),
        })
    }
}