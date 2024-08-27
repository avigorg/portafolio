"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import Bird from './Bird';
import { OrbitControls } from '@react-three/drei';

const getSphericalPosition = (radius: number): [number, number, number] => {
  const theta = Math.random() * 2 * Math.PI; // Ángulo alrededor del eje vertical
  const phi = Math.acos(2 * Math.random() - 1); // Ángulo desde el polo

  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  return [x, y, z];
};

function BirdsScene() {
  const radius = 500; // Radio de la esfera
  const birdsArray = Array.from({ length: 100 }, () => getSphericalPosition(radius));

  return (
    <Canvas 
      style={{ height: '100vh', background: '#f0f0f0' }} 
      camera={{ position: [0, 0, 200], fov: 75 }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />
      {birdsArray.map((position, index) => (
        <Bird key={index} position={position} />
      ))}
      <OrbitControls />
    </Canvas>
  );
}

export default BirdsScene;
