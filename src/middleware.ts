import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'es'],  // Idiomas soportados
  defaultLocale: 'en'     // Idioma por defecto
});

export const config = {
  matcher: ['/', '/(en|es)/:path*']  // Coincidir solo con rutas internacionalizadas
};
