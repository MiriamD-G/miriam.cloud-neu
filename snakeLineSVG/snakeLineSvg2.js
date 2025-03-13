// const svgns = "http://www.w3.org/2000/svg"

// Das SVG-Element generieren
const mySVG2 = document.createElementNS(svgns, "svg")

// Das SVG-Element ins DOM integrieren

section.appendChild(mySVG2)


// Das Kooridnatensystem definieren
mySVG2.setAttribute("viewBox", "0 0 1000 1000")

// Grafik-Elemente generieren
const myLine2 = document.createElementNS(svgns, "line")


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
        const flower = placeLeaf(x, y, i*(360/leafNr), 80)
        flower.setAttribute("stroke", "blue")
        flower.setAttribute("stroke-width", sw)
        flower.setAttribute("stroke-linecap", "round")

        mySVG2.appendChild(flower)
    }
}


createFlower(500, 500, 12, 130)

// Grafik-Elemente ins SVG einfügen
mySVG2.appendChild(petal)
mySVG2.setAttribute("id", "eye")