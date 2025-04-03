let hex;
let gridWidth = 1300;
let gridHeight = 900;
let hexSize = 100;
let hexRadius = hexSize / 2;
let hexInnerRadius; // innerer Radius
let gridCol = gridWidth / hexSize;
let gridRow = gridHeight / hexSize;

let Hexes = [];
let grid = [];

function setup() {
  let canvas = createCanvas(1200, 820)
  canvas.parent(`p5-container`)
  background(200, 170, 55);

  hexInnerRadius = sqrt(sq(hexRadius) - sq(hexRadius * 0.5)); // innerer Radius

  // Erstellt einen Array für die Postitionen im Raster von den Hexes
  for (let i = 0; i < 1; i++) {
    count = 0;
    for (let y = 0; y < gridHeight; y += hexInnerRadius) {
      for (let x = 0; x < gridWidth; x += hexSize * 1.5) {
        let xPos = x + hexSize * (count % 2 == 0) * 0.75;
        let yPos = y;
        let pos = { x: xPos, y: yPos };
        grid.push(pos);
      }
      count++;
    }
  }

  for (let i = 0; i < grid.length; i++) {
    let pos = grid[i];
    Hexes[i] = new Hexa(pos.x, pos.y, hexRadius);
  }

  hex = new Hexa(300, 200, 200);
}

function draw() {
  for (let i = 0; i < Hexes.length; i++) {
    Hexes[i].show();
    Hexes[i].polySensor()
  }

}


// Class für ein einzelens Hexagon welches die Farbe wechselt
class Hexa {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r; // Radius
    this.ir = sqrt(sq(this.r) - sq(this.r * 0.5)); // innerer Radius

    this.rC = 200; // Farbe rot
    this.gC = 170; // Farbe grün
    this.bC = 55; // Farbe blau
    this.cC = 1; // Farb-Veränderungsfaktor beim Sensor
    this.rCc = this.cC // Farb-Veränderungsfaktor für rot
    this.gCc = this.cC // Farb-Veränderungsfaktor für grün
    this.bCc = this.cC // Farb-Veränderungsfaktor für blau


    // alle Koordinaten für die 6 Eckpunkte vom Hexagon
    this.x1 = this.x - this.r;
    this.x2 = this.x - this.r * 0.5;
    this.x3 = this.x + this.r * 0.5;
    this.x4 = this.x + this.r;
    this.y1 = this.y - this.ir;
    this.y2 = this.y;
    this.y3 = this.y + this.ir;

    // Array für ein Polygon (unten links)
    this.polygonUL = [];

    this.polygonUL[0] = createVector(this.x, this.y);
    this.polygonUL[1] = createVector(this.x3, this.y3);
    this.polygonUL[2] = createVector(this.x2, this.y3);
    this.polygonUL[3] = createVector(this.x1, this.y);

    // Array für ein Polygon (oben links)
    this.polygonOL = [];

    this.polygonOL[0] = createVector(this.x, this.y);
    this.polygonOL[1] = createVector(this.x1, this.y);
    this.polygonOL[2] = createVector(this.x2, this.y1);
    this.polygonOL[3] = createVector(this.x3, this.y1);

    // Array für ein Polygon (rechts)
    this.polygonR = [];

    this.polygonR[0] = createVector(this.x, this.y);
    this.polygonR[1] = createVector(this.x3, this.y1);
    this.polygonR[2] = createVector(this.x4, this.y);
    this.polygonR[3] = createVector(this.x3, this.y3);
  }

  show() {
    fill(this.rC, this.gC, this.bC);

    // Hexagon Form
    noStroke();
    beginShape();
    for (let a = 0; a < TAU; a += TAU / 6) {
      vertex(this.x + this.r * cos(a), this.y + this.r * sin(a));
    }
    endShape(CLOSE);

  }
  // Sensor für Polygon
  polySensor() {
    // Anwendung vom Polygonsensor
    this.polyhit = this.polyPoint(this.polygonUL, mouseX, mouseY);
    if (this.polyhit) {
        if(this.bC < 0 || this.bC > 255){
            this.bCc = this.bCc *-1
        }
        this.bC += this.bCc
    }
    this.polyhit = this.polyPoint(this.polygonOL, mouseX, mouseY);
    if (this.polyhit) {
        if(this.gC < 0 || this.gC > 255){
            this.gCc = this.gCc *-1
        }
        this.gC += this.gCc
    }
    this.polyhit = this.polyPoint(this.polygonR, mouseX, mouseY);
    if (this.polyhit) {
        if(this.rC < 0 || this.rC > 255){
            this.rCc = this.rCc *-1
        }
        this.rC += this.rCc
    }
  }


  // Funktion für den Polygonsensor
  polyPoint(vertices, px, py) {
    let collision = false;

    let next = 0;

    for (let current = 0; current < vertices.length; current++) {
      next = current + 1;

      if (next == vertices.length) {
        next = 0;
      }

      let vc = vertices[current];
      let vn = vertices[next];

      // compare position, flip 'collision' variable
      // back and forth
      if (
        ((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) &&
        px < ((vn.x - vc.x) * (py - vc.y)) / (vn.y - vc.y) + vc.x
      ) {
        collision = !collision;
      }

      //   print(collision);
    }

    return collision;
  }
}
