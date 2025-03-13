let anzClods = 20; // Anzahl ganzer Wolken
let Cloudlist = [];
let c1; // untere Himmelfarbe
let c1r, c1g, c1b; // rgb für untere Himmelfarbe
let c2; // obere Himmelfarbe
let c2r, c2g, c2b; // rgb für obere Himmelfarbe
let ho, mi, se;
let now;

let containerHeight = 900;

function setup() {
  let canvas = createCanvas(windowWidth, containerHeight);
  canvas.parent("p5-container");

  for (let i = 0; i < anzClods; i++) {
    let posX = random(300, 0); // X-Position
    let posY = random(10, containerHeight - 10); // Y-Postition
    let cloudsize = map(posY, 0, containerHeight, 50, 180); // Grösse der Wolke, wird nach oben kleiner
    let clouddots = map(posY, 0, containerHeight, 10, 100); // Anzahl einzelner Punkte pro Wolke
    let cloudspeed = map(posY, 0, containerHeight, 0.9, 0.1); // Geschwindigkeit
    Cloudlist.push(new Cloud(posX, posY, cloudsize, clouddots, cloudspeed));
  }
  //   c1 = color(120, 200, 255); // untere Himmelfarbe
  //   c2 = color(30, 60, 105); // obere Himmelfarbe
}

function draw() {
  // Farbe der Tageszeit angepasst
  ho = hour();
  mi = minute();
  se = second();
  now = se + mi * 60 + ho * 60 * 60; // berechnet die aktuelle Sekunde vom Tag 0–86400

  //   if (se <= 29) {
  //     c1b = map(se, 0, 29, 100, 255);

  //   } else {
  //     c1b = map(se, 59, 29, 100, 255);

  //   }
  c1r = colormap(se, 60, 125, 200, 40, 59);
  c1g = colormap(se, 150, 220, 120, 170, 59);
  c1b = colormap(se, 180, 255, 200, 30, 59);

//   fill(c1r, c1g, c1b)
//   circle(width/2, height/2, 300)

  c1 = color(120, 200, c1b); // untere Himmelfarbe
  c2 = color(30, 60, 105); // obere Himmelfarbe

  gradientH(0, 0, width, height, c2, c1); // Verlauf als Fläche
  for (let i = 0; i < Cloudlist.length; i++) {
    Cloudlist[i].show();
    Cloudlist[i].update();
  }
  console.log(c1b);
}

function colormap(nowtime, nightC, morningC, lunchC, eveningC, totaltime) {
  let mappedcolor;
  let night = totaltime;
  let morning = totaltime*0.25;
  let lunch = totaltime*0.5;
  let evening = totaltime*0.75
  if (nowtime <= morning) {
    mappedcolor = map(nowtime, 0, morning, nightC, morningC);
  } else if (nowtime > morning && nowtime <= lunch) {
    mappedcolor = map(nowtime, morning, lunch, morningC, lunchC);

  }  else if (nowtime > lunch && nowtime <= evening) {
    mappedcolor = map(nowtime, lunch, evening, lunchC, eveningC);

  }
  else {
    mappedcolor = map(nowtime, evening, night, eveningC, nightC);

  } 
  return mappedcolor;
}

// In einer Cloud werden einzelne Dots zu einer Wolke gruppiert
class Cloud {
  constructor(x, y, size, numDots, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = size; // Grösse der Wolke
    this.numDots = numDots; // Anzahl Blasen pro Wolke

    this.dots = [];

    for (let i = 0; i < this.numDots; i++) {
      let offsetX = this.x + random(-this.size * 0.8, this.size * 0.8);
      let offsetY = this.y + random(-this.size / 4, this.size / 4);
      let dotSize = random(this.size / 5, this.size);
      this.dots.push(new Dot(offsetX, offsetY, dotSize));
    }
  }
  show() {
    push();
    translate(this.x, 0);

    for (let i = 0; i < this.numDots; i++) {
      this.dots[i].show();
      this.dots[i].update();
    }
    pop();
    if (this.x >= width) {
      this.x = 0 - width * 0.8;
    }
  }
  update() {
    this.x = this.x + this.speed; // sollte die ganze Wolke bewegen
  }
}

// Dot sind einzelne Kreise einer Wolke
class Dot {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.maxr = this.y * 0.3;
    this.minr = this.y * 0.1;
    this.alfa = 10;
    this.factor = 0.1;
  }
  update() {
    // push()
    // bewegt die Punkte innerhalb der Wolke einzeln
    if (this.r > this.maxr || this.r < this.minr) {
      this.factor = this.factor * -1;
    }
    this.r += this.factor;
    // this.alfa -= this.factor*1.5
    // this.alpha = map(this.r, 0, 300, 40, 0)
    // pop()
  }
  // Instanzen einzelner Kreise
  show() {
    push();
    noStroke();
    fill(255, this.alfa);
    circle(this.x, this.y, this.r);
    pop();
  }
}
function gradientV(x, y, w, h, c1, c2) {
  noFill();
  for (let i = x; i < x + w; i++) {
    let inter = map(i, x, x + w, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(i, y, i, y + h);
  }
}

function gradientH(x, y, w, h, c1, c2) {
  noFill();
  for (let i = y; i < y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}
