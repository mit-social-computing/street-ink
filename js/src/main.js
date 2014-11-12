/*global document,fabric*/

function $(elementID) {
    return document.getElementById(elementID)
}

function mousemove(ops) {
    distance += Math.sqrt(Math.pow(ops.e.movementX, 2) + Math.pow(ops.e.movementY, 2))
    console.log('distance:', distance )
    console.log( 'street length:', parseFloat(data[currentCity].length/100) )
    if ( distance > parseFloat(data[currentCity].length/100) ) {
        if ( colorIndex > colors.length - 1 ) { colorIndex = 0 }
        c.freeDrawingBrush._finalizeAndAddPath()
        colorIndex++
        c.freeDrawingBrush.color = colors[colorIndex]

        distance -= parseFloat(data[currentCity].length/100)
        currentCity++
    }
}

function init() {
    c = new fabric.Canvas($('maps'), {
        isDrawingMode : true
    })

    c.on('object:added', function(e) {
        if ( e.target.type === 'path' ) {
            e.target.selectable = false
            e.target.perPixelTargetFind = true
        }
    })

    c.on('mouse:down', function mousedown(e) {
        c.on('mouse:move', mousemove)
    })

    c.on('mouse:up', function() {
        c.off('mouse:move', mousemove)
    })

    canvasResize = function() {
        c.setWidth(document.body.clientWidth)
        c.setHeight(document.body.clientHeight)
    }

    canvasResize()

    d3.csv('data/cambridge_streets.csv', function(error, d) {
        data = d
    })

    window.onresize = _.debounce(canvasResize, 200, true)
}

var canvasResize, c, data, paths = [], distance = 0,
    currentCity = 0,
    colorIndex = 0,
    clear = $('clear'),
    colors = [
        "#4F7A38",
        "#59E341",
        "#C3EAAC",
        "#B8DE70",
        "#66E175",
        "#4DAA6F",
        "#56B435",
        "#9DE13D",
        "#96B372",
        "#77E39C",
        "#5E7D59",
        "#56922D"
    ]

clear.addEventListener('click', function(e) { c.clear() })
window.onload = init

