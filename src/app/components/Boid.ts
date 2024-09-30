"use client";

import * as THREE from 'three';

class Boid {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  acceleration: THREE.Vector3;
  maxSpeed: number;
  maxForce: number;

  constructor(position: THREE.Vector3) {
    this.position = position.clone();
    this.velocity = new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ).setLength(2.0);
    this.acceleration = new THREE.Vector3();
    this.maxSpeed = 2.0;
    this.maxForce = 0.03;
  }

  applyForce(force: THREE.Vector3) {
    this.acceleration.add(force);
    // Limitar la aceleración máxima
    this.acceleration.clampLength(0, this.maxForce);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.clampLength(0, this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.multiplyScalar(0);
  }

  // Nuevo método para mantener las aves dentro de una esfera
  boundaries(center: THREE.Vector3, radius: number) {
    const distanceFromCenter = this.position.distanceTo(center);
    if (distanceFromCenter > radius) {
      // Calcula una fuerza dirigida hacia el centro
      const desired = new THREE.Vector3().subVectors(center, this.position);
      desired.normalize();
      desired.multiplyScalar(this.maxSpeed);
      const steer = new THREE.Vector3().subVectors(desired, this.velocity);
      steer.clampLength(0, this.maxForce);
      this.applyForce(steer);
    }
  }

  flock(boids: Boid[]) {
    const separation = this.separate(boids).multiplyScalar(2.0); // Peso aumentado
    const alignment = this.align(boids).multiplyScalar(0.8);     // Peso reducido
    const cohesion = this.cohesion(boids).multiplyScalar(0.8);   // Peso reducido

    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);
  }

  separate(boids: Boid[]): THREE.Vector3 {
    const desiredSeparation = 100; // Aumentado de 70 a 100
    const steer = new THREE.Vector3();
    let count = 0;

    boids.forEach(other => {
      const d = this.position.distanceTo(other.position);
      if (d > 0 && d < desiredSeparation) {
        const diff = new THREE.Vector3().subVectors(this.position, other.position);
        diff.normalize();
        steer.add(diff);
        count++;
      }
    });

    if (count > 0) {
      steer.divideScalar(count);
    }

    if (steer.lengthSq() > 0) {
      steer.normalize();
      steer.multiplyScalar(this.maxSpeed);
      steer.sub(this.velocity);
      steer.clampLength(0, this.maxForce);
    }

    return steer;
  }

  align(boids: Boid[]): THREE.Vector3 {
    const neighborDist = 80;
    const sum = new THREE.Vector3();
    let count = 0;

    boids.forEach(other => {
      const d = this.position.distanceTo(other.position);
      if (d > 0 && d < neighborDist) {
        sum.add(other.velocity);
        count++;
      }
    });

    if (count > 0) {
      sum.divideScalar(count);
      sum.normalize();
      sum.multiplyScalar(this.maxSpeed);
      const steer = new THREE.Vector3().subVectors(sum, this.velocity);
      steer.clampLength(0, this.maxForce);
      return steer;
    } else {
      return new THREE.Vector3();
    }
  }

  cohesion(boids: Boid[]): THREE.Vector3 {
    const neighborDist = 80;
    const sum = new THREE.Vector3();
    let count = 0;

    boids.forEach(other => {
      const d = this.position.distanceTo(other.position);
      if (d > 0 && d < neighborDist) {
        sum.add(other.position);
        count++;
      }
    });

    if (count > 0) {
      sum.divideScalar(count);
      return this.seek(sum);
    } else {
      return new THREE.Vector3();
    }
  }

  seek(target: THREE.Vector3): THREE.Vector3 {
    const desired = new THREE.Vector3().subVectors(target, this.position);
    desired.normalize();
    desired.multiplyScalar(this.maxSpeed);
    const steer = new THREE.Vector3().subVectors(desired, this.velocity);
    steer.clampLength(0, this.maxForce);
    return steer;
  }
}

export default Boid;
