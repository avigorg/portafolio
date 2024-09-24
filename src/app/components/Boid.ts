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
    ).setLength(Math.random() * 1.5); // Velocidad inicial con variación
    this.acceleration = new THREE.Vector3();
    this.maxSpeed = 2.0; // Velocidad máxima ajustada para un movimiento más suave
    this.maxForce = 0.05; // Fuerza máxima reducida para evitar aceleraciones bruscas
  }

  applyForce(force: THREE.Vector3) {
    this.acceleration.add(force);
  }

  update() {
    // Añadir una pequeña fuerza aleatoria
    const randomForce = new THREE.Vector3(
      (Math.random() - 0.5) * 0.01,
      (Math.random() - 0.5) * 0.01,
      (Math.random() - 0.5) * 0.01
    );
    this.applyForce(randomForce);

    this.velocity.add(this.acceleration);
    this.velocity.clampLength(0, this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.multiplyScalar(0);
  }

  borders(bounds: number) {
    const margin = 50;
    const turnFactor = 0.1;
    const steer = new THREE.Vector3();

    if (this.position.x < -bounds + margin) steer.x = turnFactor;
    if (this.position.x > bounds - margin) steer.x = -turnFactor;
    if (this.position.y < -bounds + margin) steer.y = turnFactor;
    if (this.position.y > bounds - margin) steer.y = -turnFactor;
    if (this.position.z < -bounds + margin) steer.z = turnFactor;
    if (this.position.z > bounds - margin) steer.z = -turnFactor;

    this.applyForce(steer);
  }

  flock(boids: Boid[]) {
    const separation = this.separate(boids).multiplyScalar(2.0);
    const alignment = this.align(boids).multiplyScalar(1.0);
    const cohesion = this.cohesion(boids).multiplyScalar(1.0);

    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);
  }

  separate(boids: Boid[]): THREE.Vector3 {
    const desiredSeparation = 50; // Mayor separación
    const steer = new THREE.Vector3();
    let count = 0;

    boids.forEach(other => {
      const d = this.position.distanceTo(other.position);
      if (d > 0 && d < desiredSeparation) {
        const diff = new THREE.Vector3().subVectors(this.position, other.position);
        diff.normalize();
        diff.divideScalar(d);
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
    const neighborDist = 80; // Mayor distancia para considerar vecinas
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
    const distance = desired.length();
    desired.normalize();

    // Ajustar la velocidad según la distancia al objetivo
    if (distance < 100) {
      desired.multiplyScalar(this.maxSpeed * (distance / 100));
    } else {
      desired.multiplyScalar(this.maxSpeed);
    }

    const steer = new THREE.Vector3().subVectors(desired, this.velocity);
    steer.clampLength(0, this.maxForce);
    return steer;
  }
}

export default Boid;
