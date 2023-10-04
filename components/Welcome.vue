<template>
  <div class="flex flex-col md:flex-row items-center justify-between bg-black text-white h-screen relative">

    <!-- Spline Viewer (Fondo) -->
    <spline-viewer url="https://prod.spline.design/fYQl61NQ50PhRRsV/scene.splinecode"></spline-viewer>
    <div class="mt-16 ml-16 justify-start h-full absolute left-0 top-0 z-10 pl-6">
    <div class="text-left md:w-1/2">
        <h1 class="text-8xl font-bold bebas-font">Innovación Digital a Tu Alcance</h1>
        <p class="text-lg  open-sans-font">
          Con años de experiencia y dedicación, Mauricio Gómez transforma tus desafíos en soluciones tecnológicas de alto impacto.
        </p>
    </div>
</div>

    <!-- Sección de ilustración (Asegúrate de que este contenedor no se superpone con el texto en pantallas más pequeñas) -->
    <div class="md:w-1/2 absolute right-0 top-0 z-10 flex items-center justify-center w-1/2 h-screen">
      <div id="3d-object" class="w-full h-full"></div>
    </div>
  </div>
</template>

<style scoped>
.roboto-font {
  font-family: 'Roboto', sans-serif;
}

.bebas-font {
  font-family: 'Bebas Neue', sans-serif;
}

.open-sans-font {
  font-family: 'Open Sans', sans-serif;
}
</style>


<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default {
  mounted() {
    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('3d-object').appendChild(renderer.domElement);

    // Agregar luz
    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);

    // Cargador GLTF
    let loader = new GLTFLoader();

    loader.load(
      '@/assets/3dmodels/model.glb', // Asegúrate de que esta ruta sea correcta
      (gltf) => {
        scene.add(gltf.scene);
        animate();
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.log('Error al cargar el modelo:', error);
      }
    );

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
  },
};


</script>
