<template>
    <div>
      <HeroSection />
      <section id="main-content">
        <h2>Contenido Principal</h2>
        <p>Aquí va el contenido principal de tu página.</p>
      </section>
    </div>
  </template>
  
  <script setup>
  import HeroSection from '~/components/index/HeroSection.vue'
  </script>
  
  <style scoped>
  section {
    padding: 20px;
  }
  </style>
  