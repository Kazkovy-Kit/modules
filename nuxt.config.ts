import {fileURLToPath} from 'url'
import {dirname, join} from 'path'

const currentDir = dirname(fileURLToPath(import.meta.url))


export default defineNuxtConfig({
    devtools: {enabled: true},
    modules: ['@prisma/nuxt'],
    extends: ['@kazkovy-kit/ui'],
    prisma: {
        prismaRoot: join(currentDir, './'),
        prismaSchemaPath: join(currentDir, './prisma/schema.prisma'),
    },
})
