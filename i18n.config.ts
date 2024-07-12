import type { I18nOptions } from 'vue-i18n'

const i18nConfig: I18nOptions = {
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: {
      welcome: "Welcome to My Website",
      explore: "Explore More",
      main_content: "This is the main content of your page."
    },
    es: {
      welcome: "Bienvenido a Mi Sitio Web",
      explore: "Explorar Más",
      main_content: "Este es el contenido principal de tu página."
    }
  }
}

export default i18nConfig
