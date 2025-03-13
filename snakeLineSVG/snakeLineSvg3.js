// const svgns = "http://www.w3.org/2000/svg"

// Das SVG-Element generieren
const mySVG3 = document.createElementNS(svgns, "svg")

// Das SVG-Element ins DOM integrieren
section.appendChild(mySVG3)

// Das Kooridnatensystem definieren
mySVG3.setAttribute("viewBox", "0 0 1000 1000")

// Grafik-Elemente generieren
const myLine3 = document.createElementNS(svgns, "line")



setInterval(() => {
    lineAnimate()
    }, 16)


function createFlower(x, y, sw, ds, leafNr) {
    for(var i=0; i<leafNr; i++){
        const flower = placeLeaf(x, y, i*(360/leafNr), 35)
        flower.setAttribute("stroke", "red")
        mySVG3.appendChild(flower)
        mySVG3.setAttribute("stroke-dasharray", (ds*0.02, ds*2))
        mySVG3.setAttribute("stroke-width", sw)
        mySVG3.setAttribute("stroke-linecap", "butt")

    }
}

const flowerAnim = document.createElementNS(svgns, "animateTransform")
mySVG3.appendChild(flowerAnim)
flowerAnim.setAttribute("attributeName", "transform")
flowerAnim.setAttribute("attributeType", "XML")
flowerAnim.setAttribute("type", "rotate")
flowerAnim.setAttribute("from", "0 0 0")
flowerAnim.setAttribute("to", "360 0 0")
flowerAnim.setAttribute("dur", "15s")
flowerAnim.setAttribute("repeatCount", "indefinite")



createFlower(500, 500, 180, 3, 15)


// Grafik-Elemente ins SVG einfügen
mySVG3.appendChild(petal)
mySVG3.setAttribute("id", "eye")