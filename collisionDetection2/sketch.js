
let num = 7; // Anzahl
let monoSynth;


let particles = [];

function setup() {
  createCanvas(600, 600);
  let canvas = createCanvas(600, 600);
  canvas.parent("p5-container");
  for (let i = 0; i < num; i++) {
    let x = random(width);
    let y = random(height);
    particles.push(new Particle(x, y));
  }
  monoSynth = new p5.MonoSynth();

}

function draw() {
  background(40, 80, 230);

  for (let i = 0; i < particles.length; i++) {
    let particleA = particles[i];
    for (let j = i + 1; j < particles.length; j++) {
      particleB = particles[j];
      particleA.collide(particleB);
    }
  }

  for (let particle of particles) {

    particle.update();
    particle.edges();
    particle.rotat();
    particle.show();
  }
}
