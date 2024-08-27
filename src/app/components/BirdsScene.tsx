"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import Bird from './Bird';
import { OrbitControls } from '@react-three/drei';

const getRandomPosition = (): [number, number, number] => {
  return [
    (Math.random() - 0.5) * 100, // Posición X
    (Math.random() - 0.5) * 100, // Posición Y
    (Math.random() - 0.5) * 100  // Posición Z
  ];
};

function BirdsScene() {
  const birdsArray = Array.from({ length: 100 }, () => getRandomPosition());

  return (
    <Canvas 
      style={{ height: '100vh', background: '#f0f0f0' }} 
      camera={{ position: [0, 0, 150], fov: 75 }}
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
