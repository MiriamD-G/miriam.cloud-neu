let lx;
let lxmin = 10; // minimale Linienlänge
let lxmax = 340; // maximale Linienlänge
let grow = 1;
let lgrow = 1;
let a = 0;
let strke = 30


function setup() {
  // createCanvas(600, 600);
  let canvas = createCanvas(650, 650);
  canvas.parent("p5-container");
  lx = width / 2;
  angleMode(RADIANS);
}

function draw() {
  background(10, 40, 40);

  function strokeEinst() {
    strke = strk.value
  }

  const strk = document.querySelector('#strk')
  strk.addEventListener('change', strokeEinst)
  


  // Wuschel
  let anz = 317; // Anzahl Haare
  let ang = TAU / anz; // Winkel

  for (let i = 0; i < anz; i += 1) {
    let hl = 1; // Haarlänge
    hl = noise(ang * i) * lxmax;
    push();

    stroke(255, 220, 190, 30);
    strokeWeight(strke);
    translate(width / 2, height / 2);
    rotate((i * ang * (frameCount*2)) / 300);
    line(0, 0, hl, 0);

    pop();
  }

  console.log(strk.value);
}
