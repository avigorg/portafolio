<template>
    <section class="hero bg-cover bg-center h-screen flex items-center justify-center text-white text-center" style="background-image: url('/path/to/your/image.jpg');">
      <div class="hero-content max-w-md p-5">
        <h1 class="text-4xl font-bold mb-4">Bienvenido a Mi Sitio Web</h1>
        <p class="mb-6">Este es un sitio web increíble creado con Nuxt.js</p>
        <button @click="scrollToContent" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Explorar Más
        </button>
      </div>
    </section>
  </template>
  
  <script setup>
  const scrollToContent = () => {
    const content = document.querySelector('#main-content');
    if (content) {
      content.scrollIntoView({ behavior: 'smooth' });
    }
  }
  </script>
  