import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

const Bird = () => {
  const ref = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/bird.gltf');
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (actions) {
      const actionKeys = Object.keys(actions);
      if (actionKeys.length > 0) {
        const action = actions[actionKeys[0]];
        if (action) {
          action.play(); // Reproduce la animación
        }
      }
    }
  }, [actions]);

  return <primitive ref={ref} object={scene} scale={[10, 10, 10]} />;
};

export default Bird;
