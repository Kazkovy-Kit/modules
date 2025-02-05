import {fileURLToPath} from 'url'
import {dirname, join} from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))


export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ['@prisma/nuxt', '@pinia/nuxt'],
    extends: ['@kazkovy-kit/ui', '@kazkovy-kit/auth'],
    prisma: {
        prismaRoot: join(currentDir, './'),
        prismaSchemaPath: join(currentDir, './prisma/schema.prisma'),
    },
    pinia: {
        storesDirs: [
            join(currentDir, './stores/*')
        ]
    }
})
