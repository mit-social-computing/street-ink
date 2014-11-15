/*global document,fabric*/

function $(elementID) {
    return document.getElementById(elementID)
}

function mousedown(e) {
    c.on('mouse:move', mousemove)
}

function mouseup(e) {
    c.off('mouse:move', mousemove)
}

function mousemove(ops) {
    var deltaX, deltaY, e = ops.e
    if ( ops.e.type.match(/touch/) )  {
        deltaX = e.changedTouches[0].screenX - e.targetTouches[0].screenX
        deltaY = e.changedTouches[0].screenY - e.targetTouches[0].screenY
    } else {
        deltaX = e.movementX
        deltaY = e.movementY
    }

    distance += Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2))

    try {
        if ( distance * 10 > data[currentCity].length ) {
            console.log(data[currentCity].street)
            if ( colorIndex > colors.length - 1 ) { colorIndex = 0 }

            var points = c.freeDrawingBrush._points.concat([]),
                pathData = c.freeDrawingBrush.convertPointsToSVGPath(points).join(''),
                path = new fabric.Path(pathData)

            // the brush needs some points or will throw an error
            // give it two points with no delta and it will return early
            c.freeDrawingBrush._points = [new fabric.Point(0,0), new fabric.Point(0,0)]
            c._onMouseUpInDrawingMode(ops.e)
            c.clearContext(c.contextTop)

            path.set({
                fill : null,
                stroke : colors[colorIndex],
                strokeWidth : 5,
                strokeLineCap : 'round',
                name : data[currentCity].street,
                length : data[currentCity].length,
                cid : data[currentCity].cid
            })
            c.add(path)

            if ( currentCity === data.length - 1 ) {
                c.isDrawingMode = false
                c.off('mouse:move', mousemove)
                c.off('mouse:down', mousedown)
                c.off('mouse:up', mouseup)
                c.getObjects().forEach(function(path) {
                    path.selectable =  false
                })
                return 
            } else {
                colorIndex++
                c.freeDrawingBrush.color = colors[colorIndex]
                c._onMouseDownInDrawingMode(ops.e)

                distance -= data[currentCity].length/10
                currentCity++

                table.rows[currentCity].style.color = colors[colorIndex]
            }
        }
    } catch(err) {
        //console.warn('caught error')
        if (points.length < 2) {
            //console.warn('removing mouse handler')
            c.off('mouse:move', mousemove)
        }
    }
}

function addPathData(ops) {
    var path = ops.path
    path.set({
        name : data[currentCity].street,
        length : data[currentCity].length,
        cid : data[currentCity].cid
    })
}

function init() {

    xhr.responseText.split('\r').forEach(function(d, i, streets) {
        if ( i === 0 ) { return }
        var headers = streets[0].split(','),
            datum = d.split(','),
            dataObj = {},
            row = table.insertRow(),
            cell1 = row.insertCell(),
            cell2 = row.insertCell()

        cell1.innerHTML = dataObj[headers[0]] = datum[0]
        cell2.innerHTML = dataObj[headers[1]] = parseFloat(datum[1])
        cell2.innerHTML = (parseInt(cell2.innerHTML, 10) * 0.000189394).toFixed(2) + ' mi'
        dataObj.cid = i

        data.push(dataObj)
    })

    c = new fabric.Canvas($('maps'), {
        isDrawingMode : true,
        perPixelTargetFind : true,
        targetFindTolerance : 25
    })

    c.freeDrawingBrush.width = 5
    c.freeDrawingBrush.color = colors[0]
    table.rows[0].style.color = colors[0]

    c.on('path:created', addPathData)
    c.on('mouse:down', mousedown)
    c.on('mouse:up', mouseup)

    c.on('mouse:move', function(ops) {
        var target = c.findTarget(ops.e),
            e = ops.e
        if ( !c.pathCache &&
            target !== undefined &&
            !c._isCurrentlyDrawing ) {
            // just entered a path

            c.pathCache = target
            c.pathCache.animate('opacity', 0.5, {
                onChange : c.renderAll.bind(c),
                duration : 75
            })

            tip.innerHTML = c.pathCache.name
            tip.style.transform = 'translateX(' + e.x + 'px) translateY(' + e.y + 'px)'
            tip.classList.add('show')

        } else if ( c.pathCache && 
            target === undefined &&
            !c._isCurrentlyDrawing ) {
            // just left a path

            c.pathCache.animate('opacity', 1, {
                onChange : c.renderAll.bind(c),
                duration : 75
            })

            tip.classList.remove('show')
            tip.innerHTML = c.pathCache = null
            setTimeout(function() {
                tip.style.transform = ''
            }, 150)

        } else if ( c.pathCache &&
            target !== undefined &&
            !c._isCurrentlyDrawing ) {
            // moving along a path
            tip.style.transform = 'translateX(' + e.x + 'px) translateY(' + e.y + 'px)'
        }
    })

    canvasResize = function() {
        c.setWidth($('canvasContainer').clientWidth)
        // compute inner height for main
        var main = $('main'),
            styles = window.getComputedStyle(main),
            height = main.clientHeight - (parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom))

        c.setHeight(height)
    }

    canvasResize()

    window.onresize = _.debounce(canvasResize, 200, true)
}

var canvasResize, c, data = [], paths = [], distance = 0,
    tip = $('tooltip'),
    table = $('data'),
    xhr = new XMLHttpRequest(),
    currentCity = 0,
    colorIndex = 0,
    clear = $('clear'),
    save = $('download'),
    colors = _.shuffle([
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
    ])

clear.addEventListener('click', function(e) { c.clear() })
save.addEventListener('click', function(e) {
    this.setAttribute('href', c.toDataURL())
    this.setAttribute('download', 'map')
})

xhr.addEventListener('load', init)
xhr.open('get', 'data/cambridge_streets.csv')
xhr.send()
