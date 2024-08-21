'use client';

import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Bird from './Bird'; // Asegúrate de que la ruta sea correcta
import * as THREE from 'three';

const BIRD_COUNT = 200;
const BOUNDS = 400;

function BirdsScene() {
  const birds = useMemo(() => {
    const birdsArray = [];
    for (let i = 0; i < BIRD_COUNT; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * BOUNDS * 2,
        (Math.random() - 0.5) * BOUNDS * 2,
        (Math.random() - 0.5) * BOUNDS * 2
      );

      const velocity = {
        current: new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ),
      };

      birdsArray.push({ position, velocity });
    }
    return birdsArray;
  }, []);

  return (
    <Canvas style={{ height: '100vh' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {birds.map((bird, index) => (
        <Bird key={index} position={bird.position} velocity={bird.velocity} birds={birds} />
      ))}
      <OrbitControls />
    </Canvas>
  );
}

export default BirdsScene;
