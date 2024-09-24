"use client";

import React, { useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Boid from './Boid';
import Bird from './Bird';

function Flock() {
  const bounds = 250; // Límites de la escena
  const [boids] = useState(() => {
    const initialBoids: { boid: Boid; size: number }[] = [];
    for (let i = 0; i < 100; i++) {
      const position = new THREE.Vector3(
        Math.random() * bounds * 2 - bounds,
        Math.random() * bounds * 2 - bounds,
        Math.random() * bounds * 2 - bounds
      );
      const boid = new Boid(position);
      const size = Math.random() * 0.5 + 0.75; // Tamaño entre 0.75 y 1.25
      initialBoids.push({ boid, size });
    }
    return initialBoids;
  });

  const target = new THREE.Vector3(0, 0, 0); // Centro de la escena

  useFrame(() => {
    boids.forEach(({ boid }) => {
      boid.flock(boids.map(b => b.boid));

      // Añadir atracción hacia el objetivo
      const attraction = boid.seek(target).multiplyScalar(0.01);
      boid.applyForce(attraction);

      boid.update();
      boid.borders(bounds);
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
