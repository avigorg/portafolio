"use client";

import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import * as THREE from 'three';

const Bird = ({ position }: { position?: [number, number, number] }) => {
  const ref = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/bird.gltf');
  
  // Clonar la escena para asegurarse de que cada instancia sea única
  const clonedScene = clone(scene);
  
  // Usar las animaciones con la escena clonada
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (actions) {
      const actionKeys = Object.keys(actions);
      if (actionKeys.length > 0) {
        const action = actions[actionKeys[0]];
        if (action) {
          action.play();
        }
      }
    }
  }, [actions]);

  return <primitive ref={ref} object={clonedScene} position={position} scale={[10, 10, 10]} />;
};

export default Bird;
