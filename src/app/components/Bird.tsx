"use client";

import React, { useRef, useEffect, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as THREE from 'three';
import Boid from './Boid';

interface BirdProps {
  boid: Boid;
  size: number;
}

const Bird = ({ boid, size }: BirdProps) => {
  const ref = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/bird.gltf');
  const clonedScene = useMemo(() => clone(scene), [scene]);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach(action => {
        if (action) {
          action.play();
          action.timeScale = 0.5; // Reduce la velocidad de la animación a la mitad
        }
      });
    }
  }, [actions]);

  useFrame(({ clock }) => {
    if (ref.current) {
      // Actualizar posición con un movimiento vertical ondulatorio
      const time = clock.getElapsedTime();
      const verticalOffset = Math.sin(time * 5 + boid.position.x * 0.1) * 2;
      ref.current.position.copy(
        boid.position.clone().add(new THREE.Vector3(0, verticalOffset, 0))
      );

      // Orientar el ave en la dirección de su velocidad
      const velocity = boid.velocity.clone().normalize();

      // Crear una matriz de rotación que alinee el eje Z positivo con la dirección de la velocidad
      const matrix = new THREE.Matrix4();
      matrix.lookAt(
        new THREE.Vector3(0, 0, 0),
        velocity,
        new THREE.Vector3(0, 1, 0)
      );

      // Extraer el quaternion de la matriz de rotación
      const rotation = new THREE.Quaternion();
      rotation.setFromRotationMatrix(matrix);

      // Aplicar suavizado a la rotación
      ref.current.quaternion.slerp(rotation, 0.1);
    }
  });

  return <primitive ref={ref} object={clonedScene} scale={[size, size, size]} />;
};

export default Bird;
