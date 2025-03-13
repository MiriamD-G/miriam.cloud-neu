var circleX = 300;
var circleY = 300;
var xSpeed = 3;
var ySpeed = 5;
var circleW = 350;
let h = 0;
let s = 100


function setup() {
  createCanvas(600, 600);
  let canvas = createCanvas(800, 800)
  canvas.parent(`p5-container`)

  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(0, 10, 80, 5);
  noStroke();
  fill(h, s, 100, 20);
  circle(circleX, circleY, circleW);
  circleX += xSpeed;
  circleY += ySpeed;
  //console.log(circleY)

  // wenn der Kreis die Breite erreicht wird der xSpeed negativ (-5)
  if (circleX > width - circleW / 2 || circleX < circleW / 2) {
    xSpeed = -xSpeed;
    h = (h+30)%360
  }

  if (circleY > height - circleW / 2 || circleY < circleW / 2) {
    ySpeed = -ySpeed;
    h = (h+30)%360

  }
h = (h+1)%360
  // console.log(xSpeed)
  // console.log(ySpeed)
}
