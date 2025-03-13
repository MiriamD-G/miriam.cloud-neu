const svgns = "http://www.w3.org/2000/svg";

// Das SVG-Element generieren
const waverSVG = document.createElementNS(svgns, "svg");

// Das SVG-Element ins DOM integrieren
const section = document.getElementById("waver");
// document.body.appendChild(section);

section.appendChild(waverSVG);

// Das Kooridnatensystem definieren
waverSVG.setAttribute("viewBox", "0 0 1000 1000");

const farb = "#3f2b4f";

// Beine
const llegPath = `M 480, 540 C 450 870, 530 800, 430 1100 `;
const rlegPath = `M 570, 540 C 650 870, 630 900, 600 1100 `;

const legs = document.createElementNS(svgns, "g");
legs.setAttribute("fill", "transparent");
legs.setAttribute("stroke", farb);
legs.setAttribute("stroke-linecap", "round");
legs.setAttribute("stroke-width", 50);

const rleg = document.createElementNS(svgns, "path");
rleg.setAttribute("d", rlegPath);

const lleg = document.createElementNS(svgns, "path");
lleg.setAttribute("d", llegPath);

waverSVG.appendChild(legs);
legs.appendChild(lleg);
legs.appendChild(rleg);

// Haare

let a = 0;

function lineAnimate() {
  a += 0.01;
  let factor = Math.sin(a);
  let factorB = Math.cos(a);
  let l = 220; // Länge vom Strich
  let b = l * 0.2; // Breite vom Ausschlag
  let maxAmplitude = b; // maximale Schwingung, Ausschlag
  let posX = factor * maxAmplitude;
  let posXB = factorB * maxAmplitude;

  const myPath = {
    origin: {
      x: 0,
      y: 0,
    },
    anchor1: {
      x: l * 0.6,
      y: posX,
    },
    anchor2: {
      x: l * 0.9,
      y: posXB,
    },
    target: {
      x: l,
      y: posXB,
    },
  };

  const petalPath = `M ${myPath.origin.x} ${myPath.origin.y} C ${myPath.anchor1.x} ${myPath.anchor1.y}, ${myPath.anchor2.x} ${myPath.anchor2.y}, ${myPath.target.x} ${myPath.target.y} `;

  petal.setAttribute("d", petalPath);
}

let petal = document.createElementNS(svgns, "path");
petal.setAttribute("id", "lineLeaf");
petal.setAttribute("fill", "transparent");

setInterval(() => {
  lineAnimate();
}, 16);

function placeLeaf(x, y, ang, distance) {
  let swr = Math.random() * 20 + 1; // Unterschiedliche Strichstärke

  const g = document.createElementNS(svgns, "g");
  g.setAttribute(
    "transform",
    "translate (" + x + ", " + y + ") rotate(" + ang + ")"
  );

  const blatt = document.createElementNS(svgns, "use");
  blatt.setAttribute("href", "#lineLeaf");
  blatt.setAttribute("transform", "translate(" + distance + ", 0)");
  blatt.setAttribute("stroke-width", swr);
  blatt.setAttribute("stroke-opacity", "0.4");

  g.appendChild(blatt);
  return g;
}

function createFlower(x, y, leafNr) {
  for (var i = 0; i < leafNr; i++) {
    let dist = Math.random() * 250; // Distanz zur Mitte / strubligkeit
    const flower = placeLeaf(x, y, i * (360 / leafNr), dist);
    flower.setAttribute("stroke", farb);
    flower.setAttribute("stroke-linecap", "round");
    waverSVG.appendChild(flower);
  }
}

createFlower(500, 500, 700);

const face = document.createElementNS(svgns, "circle");
face.setAttribute("transform", "translate(500, 500)");
face.setAttribute("fill", farb);
face.setAttribute("r", 200);
waverSVG.appendChild(face);

function createEye(x, y) {
  const eyes = document.createElementNS(svgns, "g");
  eyes.setAttribute("transform", "translate(" + x + ", " + y + ")");

  const eyeWhite = document.createElementNS(svgns, "circle");
  eyeWhite.setAttribute("fill", "white");
  eyeWhite.setAttribute("r", 60);
  //   eyeWhite.setAttribute("visibility", "hidden")
  eyeWhite.setAttribute("class", "eyeWhite");

  const eyeBlack = document.createElementNS(svgns, "circle");
  eyeBlack.setAttribute("fill", farb);
  eyeBlack.setAttribute("r", 20);
  eyeBlack.setAttribute("class", "eyeBlack");


  eyes.appendChild(eyeWhite);
  eyes.appendChild(eyeBlack);
  waverSVG.appendChild(eyes);
}

createEye(440, 480);
createEye(620, 470);


// Mund
const mundPath = `M 0, 0 C 20 30, 60 30, 70 0 `;

const mund = document.createElementNS(svgns, "path");
mund.setAttribute("transform", "translate(480, 580)")
mund.setAttribute("fill", "transparent");
mund.setAttribute("stroke", "lightsalmon");
mund.setAttribute("stroke-linecap", "round");
mund.setAttribute("stroke-width", 10);
mund.setAttribute("d", mundPath);


waverSVG.appendChild(mund);

// Grafik-Elemente ins SVG einfügen

waverSVG.appendChild(petal);
waverSVG.setAttribute("id", "flower");
