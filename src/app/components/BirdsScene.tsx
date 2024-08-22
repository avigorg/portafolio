'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import Bird from './Bird';
import { OrbitControls } from '@react-three/drei';

function BirdsScene() {
  return (
    <Canvas 
      style={{ height: '100vh', background: '#f0f0f0' }} 
      camera={{ position: [0, 0, 50], fov: 75 }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />
      <Bird />
      <OrbitControls />
    </Canvas>
  );
}

export default BirdsScene;
