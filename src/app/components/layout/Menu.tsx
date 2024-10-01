import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Importamos el componente Image de Next.js

const Menu: React.FC = () => {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full px-10 py-4 z-50 flex items-center space-x-8">
      {/* Logo en la parte izquierda del menú */}
      <Link href="/">
        <Image
          src="/logos/logo-negro.png"
          alt="Logo Negro"
          width={50} // Puedes ajustar el tamaño según tus necesidades
          height={50}
          className="cursor-pointer"
        />
      </Link>

      {/* Secciones del Menú */}
      <nav className="flex space-x-8">
        <Link href="/" className="text-gray-700 hover:text-secondary transition duration-300">
          Home
        </Link>
        <Link href="/about" className="text-gray-700 hover:text-secondary transition duration-300">
          About
        </Link>
        <Link href="/services" className="text-gray-700 hover:text-secondary transition duration-300">
          Services
        </Link>
        <Link href="/contact" className="text-primary font-bold border-b-2 border-primary hover:text-secondary transition duration-300">
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default Menu;
