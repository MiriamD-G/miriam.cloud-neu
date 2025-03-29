let xPos
let yPos
let a
let sw = 2
let diameter1 = 300
let radius1 = diameter1/2
let diameter2 = diameter1*0.2
let radius2 = diameter2/2
let diameter3 = (diameter1-diameter2)*0.5
let radius3 = diameter3-radius2


let bgColor
let bgAlfa
// let radius3 = diameter3/2

function setup(){
// createCanvas (400, 400)
let canvas = createCanvas(500, 500);
canvas.parent("p5-container");
// stroke(20, 120, 230, 130)
// strokeWeight(3)

// rect(0, 0, width, height)

xPos = 0
yPos = 0
a = 0
}

function draw(){

    if (document.getElementById('check').checked) {
        console.log('checked')
        // document.body.style.backgroundColor = "rgb(20, 120, 230)";

        bgAlfa = 0
    } else {
        bgAlfa = 255
        console.log('not checked')
        // document.body.style.backgroundColor = "rgb(250, 240, 250)";

    }


    background(20, 120, 230, bgAlfa)
    strokeWeight(sw)
    translate(width/2, height/2)
    stroke(20, 120, 230, 130)
    // circle(0, 0, diameter1)

    let yA = sin(a)
    let xA = cos(a)
    xPos = xA * radius1
    yPos = yA * radius1
    circle(xPos, yPos, diameter2) // kleiner Kreis
    push()
    translate(xPos, yPos)
    let yPos3 = cos(a) * radius3
    let xPos3 = sin(a) * radius3
    circle(xPos3, yPos3, diameter3) // grösserer Kreis
    pop()

    a += 0.02



}


console.log(bgAlfa)