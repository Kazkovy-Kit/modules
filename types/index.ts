import type {RouteLocationRaw} from "#vue-router";

export type ModuleInfo = {
    id: string,
    name: string,
    enabled: boolean,
}

export type LocalModuleInfo = {
    id: string,
    icon: string,
    items: {
        title: string,
        to: RouteLocationRaw
    }[],
}

export type ExtendedModuleInfo = ModuleInfo & LocalModuleInfo