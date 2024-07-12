// https://nuxt.com/docs/api/configuration/nuxt-config
import type { NuxtI18nOptions } from '@nuxtjs/i18n'
import i18nConfig from './i18n.config'

const i18nOptions: NuxtI18nOptions = {
  locales: [
    { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
    { code: 'es', name: 'Español', iso: 'es-ES', file: 'es.json' },
  ],
  lazy: true,
  langDir: 'locales/',
  defaultLocale: 'en',
  vueI18n: './i18n.config',
}

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/i18n',
  ],
  i18n: i18nOptions,
  css: [
    '~/assets/css/tailwind.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})