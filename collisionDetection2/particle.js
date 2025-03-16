class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(2, 6));
    this.acceleration = createVector(0, 0);
    this.mass = random(1, 6);
    this.r = sqrt(this.mass) * 25;
    this.alpha = random(40, 100);

    this.rotate = 0;
    this.rotationsdirection = 0.1;

    userStartAudio();
  }

  // Method to update position
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  // Collision Detection and Resolution
  collide(other) {
    let impactVector = p5.Vector.sub(other.position, this.position);
    let d = impactVector.mag();
    if (d < this.r + other.r) {
      // Push the particles out so that they are not overlapping
      let overlap = d - (this.r + other.r);
      let dir = impactVector.copy();
      dir.setMag(overlap * 0.5);
      this.position.add(dir);
      other.position.sub(dir);

      // Correct the distance!
      d = this.r + other.r;
      impactVector.setMag(d);

      let mSum = this.mass + other.mass;
      let vDiff = p5.Vector.sub(other.velocity, this.velocity);
      // Particle A (this)
      let num = vDiff.dot(impactVector);
      let den = mSum * d * d;
      let deltaVA = impactVector.copy();
      deltaVA.mult((2 * other.mass * num) / den);
      this.velocity.add(deltaVA);
      this.rotationsdirection *= -1;
      monoSynth.play('G4', 1, 0, 1/16);


      // Particle B (other)
      let deltaVB = impactVector.copy();
      deltaVB.mult((-2 * this.mass * num) / den);
      other.velocity.add(deltaVB);
      other.rotationsdirection *= -1;
      monoSynth.play('B4', 1, 0, 1/4);

    }
  }

  // Bounce edges
  edges() {
    if (this.position.x > width - this.r) {
      this.position.x = width - this.r;
      this.velocity.x *= -1;
      this.rotationsdirection *= -1;
      monoSynth.play('B4', 1, 0, 1/12);

    } else if (this.position.x < this.r) {
      this.position.x = this.r;
      this.velocity.x *= -1;
      this.rotationsdirection *= -1;
      monoSynth.play('B4', 1, 0, 1/12);

    }

    if (this.position.y > height - this.r) {
      this.position.y = height - this.r;
      this.velocity.y *= -1;
      this.rotationsdirection *= -1;
      monoSynth.play('G4', 1, 0, 1/12);

    } else if (this.position.y < this.r) {
      this.position.y = this.r;
      this.velocity.y *= -1;
      this.rotationsdirection *= -1;
      monoSynth.play('G4', 1, 0, 1/12);

    }
  }

  // Rotation
  rotat() {
    this.rotate = this.rotate + this.rotationsdirection;
  }

  // Method to display
  show() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.rotate);
    noStroke();
    fill(110, 255, 180, this.alpha);
    arc(0, 0, this.r * 2, this.r * 2, 0, PI);
    circle(0, 0, this.r * 2);
    // circle(0, 0, this.r*1.3)
    pop();
  }
}
