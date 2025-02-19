"use client";

import React from 'react';
import { Canvas } from '@react-three/fiber';
import Flock from './Flock';

function BirdsScene() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 300], fov: 75 }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />
      <Flock />
    </Canvas>
  );
}

export default BirdsScene;
