"use client"; // Aseguramos que es un componente cliente

import React from 'react';
import { useTranslations } from 'next-intl'; // Para manejar las traducciones
import Image from 'next/image';

const HeroSection: React.FC = () => {
  const t = useTranslations('Hero'); // Scope 'Hero' para las traducciones del componente

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-between w-full h-screen p-8">
      {/* Columna de los textos */}
      <div className="w-1/2">
        <h1 className="text-black font-extrabold uppercase leading-none tracking-wider text-[4rem] md:text-[6rem] lg:text-[9rem] space-y-4">
          <span className="block"> {t('line1')} </span>
          <span className="block "> {t('line2')} </span>
          <span className="block"> {t('line3')} </span>
          <span className="block"> {t('line4')} </span>
        </h1>
      </div>

      {/* Columna de la imagen */}
      <div className="w-1/2 flex justify-center items-center mr-12 mt-12">
        <Image
          src="/assets/guacamayo-volando.png" // Ajusta la ruta de la imagen si es necesario
          alt="Guacamayo volando"
          width={800}
          height={800}
          className="object-cover max-w-full drop-shadow-lg mr-4"
        />
      </div>
    </div>
  );
};

export default HeroSection;
