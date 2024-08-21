import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Configura los idiomas soportados
const locales = ['en', 'es'];

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
