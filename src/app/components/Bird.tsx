import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BirdProps {
  position: THREE.Vector3;
  velocity: { current: THREE.Vector3 };
  birds: { position: THREE.Vector3; velocity: { current: THREE.Vector3 } }[];
}

const BOUNDS = 400;
const SEPARATION_DISTANCE = 20;
const ALIGNMENT_DISTANCE = 40;
const COHESION_DISTANCE = 20;

function Bird({ position, velocity, birds }: BirdProps) {
  const ref = useRef<THREE.Group>(null);

  const bodyGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      0, 0, -6,  // Punta frontal del cuerpo
      2, 0, 0,   // Lado derecho del cuerpo
      -2, 0, 0,  // Lado izquierdo del cuerpo
    ]);
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.computeVertexNormals();
    return geom;
  }, []);

  const wingGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      0, 0, 0,   // Base del triángulo, que estará en el cuerpo del ave
      8, 2, 0,   // Extremo trasero del ala
      8, -2, 0,  // Extremo delantero del ala
    ]);
    geom.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Hook para animar las alas y manejar la física del vuelo
  useFrame(() => {
    if (ref.current) {
      let separationForce = new THREE.Vector3();
      let alignmentForce = new THREE.Vector3();
      let cohesionForce = new THREE.Vector3();
      let count = 0;

      for (let i = 0; i < birds.length; i++) {
        const otherBird = birds[i];
        if (otherBird.position.equals(position)) continue;

        const distance = position.distanceTo(otherBird.position);

        // Separación
        if (distance < SEPARATION_DISTANCE) {
          const force = new THREE.Vector3().subVectors(position, otherBird.position).normalize();
          separationForce.add(force);
        }

        // Alineación
        if (distance < ALIGNMENT_DISTANCE) {
          alignmentForce.add(otherBird.velocity.current);
        }

        // Cohesión
        if (distance < COHESION_DISTANCE) {
          cohesionForce.add(otherBird.position);
          count++;
        }
      }

      // Calcula la fuerza de cohesión como el promedio de las posiciones de los pájaros cercanos
      if (count > 0) {
        cohesionForce.divideScalar(count);
        cohesionForce.sub(position).normalize();
      }

      // Ajusta las fuerzas de alineación y cohesión
      alignmentForce.normalize();
      velocity.current.add(separationForce.multiplyScalar(0.05));
      velocity.current.add(alignmentForce.multiplyScalar(0.05));
      velocity.current.add(cohesionForce.multiplyScalar(0.05));

      // Limitar la velocidad
      velocity.current.clampLength(0, 2);

      // Actualiza la posición del pájaro
      ref.current.position.add(velocity.current);

      // Aleteo de las alas
      const time = performance.now() * 0.001;
      ref.current.children[1].rotation.z = Math.sin(time * 10) * 0.3; // Ala izquierda
      ref.current.children[2].rotation.z = Math.sin(time * 10) * -0.3; // Ala derecha

      // Mantener los pájaros dentro de los límites
      if (ref.current.position.x > BOUNDS || ref.current.position.x < -BOUNDS) velocity.current.x *= -1;
      if (ref.current.position.y > BOUNDS || ref.current.position.y < -BOUNDS) velocity.current.y *= -1;
      if (ref.current.position.z > BOUNDS || ref.current.position.z < -BOUNDS) velocity.current.z *= -1;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh geometry={bodyGeometry}>
        <meshStandardMaterial color={'gray'} />
      </mesh>
      <mesh geometry={wingGeometry} position={[-2, 0, 0]} rotation={[0, 0, 0]}>
        <meshStandardMaterial color={'gray'} />
      </mesh>
      <mesh geometry={wingGeometry} position={[2, 0, 0]} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial color={'gray'} />
      </mesh>
    </group>
  );
}

export default Bird;
