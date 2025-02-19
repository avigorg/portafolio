"use client";

import React, { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Boid from './Boid';
import Bird from './Bird';

function Flock() {
  const bounds = 250; // Radio de la esfera
  const center = new THREE.Vector3(0, 0, 0); // Centro de la esfera
  const [boids] = useState(() => {
    const initialBoids: { boid: Boid; size: number }[] = [];
    for (let i = 0; i < 200; i++) {
      const position = new THREE.Vector3(
        (Math.random() * 100) - 50,
        (Math.random() * 100) - 50,
        (Math.random() * 100) + 50
      );
      const boid = new Boid(position);
      const size = Math.random() * 1.0 + 2.0; // Tamaño entre 2.0 y 3.0
      initialBoids.push({ boid, size });
    }
    return initialBoids;
  });

  useFrame(() => {
    boids.forEach(({ boid }) => {
      boid.flock(boids.map(b => b.boid));
      boid.update();
      boid.boundaries(center, bounds);
    });
  });

  return (
    <>
      {boids.map(({ boid, size }, index) => (
        <Bird key={index} boid={boid} size={size} />
      ))}
    </>
  );
}

export default Flock;
