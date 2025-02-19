"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const Menu: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('Menu');

  // Obtener el locale actual y determinar cuál es la URL base
  const currentLocale = pathname.startsWith('/es') ? 'es' : 'en';
  const basePath = pathname.replace(/^\/(es|en)/, ''); // Quita '/es' o '/en' para obtener la ruta base

  // Función para cambiar el idioma sin duplicar en la URL
  const changeLanguage = (newLocale: string) => {
    const newUrl = `/${newLocale}${basePath}`; // Construir la nueva URL con el nuevo idioma y la ruta base
    router.push(newUrl); // Navegar a la nueva URL con el idioma cambiado
  };

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full px-10 py-4 z-50 flex items-center space-x-8">
      {/* Logo a la izquierda */}
      <Link href={`/${currentLocale}`}>
        <Image src="/logos/logo-negro.png" alt="Logo Negro" width={50} height={50} className="cursor-pointer" />
      </Link>

      {/* Menú de Navegación */}
      <nav className="flex space-x-8">
        <Link href={`/${currentLocale}`} className="text-primary font-bold border-b-2 border-primary hover:text-secondary transition duration-300">
          {t('home')}
        </Link>
        <Link href={`/${currentLocale}/about`} className="text-gray-700 hover:text-secondary transition duration-300">
          {t('about')}
        </Link>
        <Link href={`/${currentLocale}/services`} className="text-gray-700 hover:text-secondary transition duration-300">
          {t('services')}
        </Link>
        <Link href={`/${currentLocale}/contact`} className="text-gray-700 hover:text-secondary transition duration-300">
          {t('contact')}
        </Link>
      </nav>

      {/* Icono de Bandera para Cambiar Idioma */}
      <div className="flex items-center space-x-4">
        {currentLocale === 'es' ? (
          // Mostrar icono de bandera del Reino Unido cuando el idioma actual es Español
          <button onClick={() => changeLanguage('en')} className="focus:outline-none">
            <Image src="/assets/reino-unido.png" alt="Inglés" width={30} height={30} className="cursor-pointer" />
          </button>
        ) : (
          // Mostrar icono de bandera de España cuando el idioma actual es Inglés
          <button onClick={() => changeLanguage('es')} className="focus:outline-none">
            <Image src="/assets/espana.png" alt="Español" width={30} height={30} className="cursor-pointer" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Menu;
