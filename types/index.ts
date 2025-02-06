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

export type BotInfo = {
    id: number
    discord_id: string,
    host: string,
    icon: string,
    name: string,
    token: string,
    online: boolean
}

export type BotGuildResponse = {
    [key: string]: {
        id: string;
        name: string;
        icon: string;
    }
}

export type DiscordUserGuildResponse = Array<{
    id: string;
    name: string;
    icon: string;
    banner: string;
    owner: boolean;
    permissions: number;
    permissions_new: string;
    features: any[];
}>

export type BotAuthResponse = {
    token: string,
    user: {
        id: string,
        username: string
    }
}

export type GuildInfo = {
    id: number,
    icon: string,
    name: string,
}


declare module '#auth-utils' {

    interface SecureSessionData {
        bot_token: string
    }
}