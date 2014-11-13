/*global document,fabric*/

function $(elementID) {
    return document.getElementById(elementID)
}

function mousemove(ops) {
    distance += Math.sqrt(Math.pow(ops.e.movementX, 2) + Math.pow(ops.e.movementY, 2))

    try {
        if ( distance * 10 > parseFloat(data[currentCity].length) ) {
            console.log(data[currentCity].street)
            if ( colorIndex > colors.length - 1 ) { colorIndex = 0 }

            var points = c.freeDrawingBrush._points.concat([]),
                pathData = c.freeDrawingBrush.convertPointsToSVGPath(points).join(''),
                path = new fabric.Path(pathData)

            c.freeDrawingBrush._points = [new fabric.Point(0,0), new fabric.Point(0,0)]
            c._onMouseUpInDrawingMode(ops.e)

            c.clearContext(c.contextTop)
            path.set({
                fill : null,
                stroke : colors[colorIndex],
                strokeWidth : 5,
                //strokeLineJoin : 'round',
                strokeLineCap : 'round'
            }).on('mouseover', function(e) { console.log('hover') })
            c.add(path)

            colorIndex++
            c.freeDrawingBrush.color = colors[colorIndex]
            c._onMouseDownInDrawingMode(ops.e)

            distance -= parseFloat(data[currentCity].length)/10
            currentCity++
        }
    } catch(err) {
        console.warn('caught error')
        if (points.length < 2) {
            console.warn('removing mouse handler')
            c.off('mouse:move', mousemove)
        }
    }
}

function init() {
    xhr.responseText.split('\r').forEach(function(d, i, streets) {
        if ( i === 0 ) { return }
        var headers = streets[0].split(','),
            datum = d.split(','),
            dataObj = {}

        dataObj[headers[0]] = datum[0]
        dataObj[headers[1]] = datum[1]
        data.push(dataObj)
    })
    c = new fabric.Canvas($('maps'), {
        isDrawingMode : true
    })

    c.freeDrawingBrush.width = 5
    c.freeDrawingBrush.color = colors[0]

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

    window.onresize = _.debounce(canvasResize, 200, true)
}

var canvasResize, c, data = [], paths = [], distance = 0,
    xhr = new XMLHttpRequest(),
    currentCity = 0,
    colorIndex = 0,
    clear = $('clear'),
    colors = [
        "#D054DC",
        "#51AE33",
        "#DB4D2C",
        "#338C94",
        "#A25177",
        "#878327",
        "#6F6FD8",
        "#418C56",
        "#6295CE",
        "#CB872D",
        "#C84F57",
        "#B47EC3",
        "#D850A4",
        "#A0572C",
        "#DB3776",
        "#5C5F93",
        "#9643A1",
        "#568B2D"
    ]

clear.addEventListener('click', function(e) { c.clear() })

xhr.addEventListener('load', init)
xhr.open('get', 'data/cambridge_streets.csv')
xhr.send()


//window.onload = init

