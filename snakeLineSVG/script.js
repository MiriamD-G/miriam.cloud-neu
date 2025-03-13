const svgns = "http://www.w3.org/2000/svg"

// Das SVG-Element generieren
const mySVG = document.createElementNS(svgns, "svg")

// Das SVG-Element ins DOM integrieren
const section = document.createElement("section");
document.body.appendChild(section);

section.appendChild(mySVG)


// Das Kooridnatensystem definieren
mySVG.setAttribute("viewBox", "0 0 1000 1000")

// Grafik-Elemente generieren
const myLine = document.createElementNS(svgns, "line")


// Definition vom einzelnen Pfad

let a = 0

function lineAnimate(){
    a += 0.03
    let factor = Math.sin(a)
    let factorB = Math.cos(a)
    let l = 390 // Länge vom Strich
    let b = l*0.4 // Breite vom Ausschlag
    let maxAmplitude = b // maximale Schwingung, Ausschlag
    let posX = factor * maxAmplitude
    let posXB = factorB * maxAmplitude

    const myPath = {
        origin: {
            x:0,
            y:0
        },
        anchor1: {
            x: l*0.3,
            y: posX
        },
        anchor2: {
            x: l*0.7,
            y: posXB
        },
        target: {
            x:l,
            y:0
        },
    }

    const petalPath = `M ${myPath.origin.x} ${myPath.origin.y} C ${myPath.anchor1.x} ${myPath.anchor1.y}, ${myPath.anchor2.x} ${myPath.anchor2.y}, ${myPath.target.x} ${myPath.target.y} `

    petal.setAttribute("d", petalPath)
}

let petal = document.createElementNS(svgns, "path")
petal.setAttribute("id", "lineLeaf")
petal.setAttribute("fill", "transparent")
petal.setAttribute("stroke-opacity", "0.6")

setInterval(() => {
    lineAnimate()
    }, 16)

function placeLeaf(x, y, ang, distance){
    const g = document.createElementNS(svgns, "g")
    g.setAttribute("transform", "translate ("+x+", "+y+") rotate("+ang+")")

    const blatt = document.createElementNS(svgns, "use")
    blatt.setAttribute("href", "#lineLeaf")
    blatt.setAttribute("transform", "translate("+distance+", 0)")
    g.appendChild(blatt)
    return g
}   

function createFlower(x, y, sw, leafNr) {
    for(var i=0; i<leafNr; i++){
        const flower = placeLeaf(x, y, i*(360/leafNr), 35)
        flower.setAttribute("stroke", "green")
        flower.setAttribute("stroke-width", sw)
        flower.setAttribute("stroke-linecap", "round")
        mySVG.appendChild(flower)
    }
}

createFlower(500, 500, 30, 7)

// Grafik-Elemente ins SVG einfügen

mySVG.appendChild(petal)
mySVG.setAttribute("id", "flower")

