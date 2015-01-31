/*global fabric,$*/
import Ember from 'ember';

/*
var events = {
    'mouse:down' : function(e) {
        c.on('mouse:move', events['mouse:move'])
    },
    'mouse:up' : function(e) {
        c.off('mouse:move', events['mouse:move'])
    },
    'mouse:move' : function(ops) {
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

                // since we're still currently drawing, need to generate a path of the current
                // undrawn points and add it manually to the canvas
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
                    cid : data[currentCity].cid,
                    // performance considerations
                    hasControls : false,
                    hasBorders : false,
                    hasRotatingPoint : false,
                    selectable : false
                })
                c.add(path)

                if ( currentCity === data.length - 1 ) {
                    c.isDrawingMode = false
                    c.skipTargetFind = false
                    c.clearEvts()
                    $('toggleDrawing').setAttribute('disabled', true)
                    //c.getObjects().forEach(function(path) {
                    //    path.selectable =  false
                    //})
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
}

function addPathData(ops) {
    console.log(ops)
    var path = ops.path
    path.set({
        name : data[currentCity].street,
        length : data[currentCity].length,
        cid : data[currentCity].cid,
        // performance considerations
        hasControls : false,
        hasBorders : false,
        hasRotatingPoint : false,
        selectable : false
    })
    c.renderAll()
}

fabric.Canvas.prototype.clearEvts = function() {
    for ( var evt in events ) {
        if ( events.hasOwnProperty(evt) ) {
            this.off(evt, events[evt])
        }
    }
}

fabric.Canvas.prototype.toggleDrawing = function () {
    this.skipTargetFind = !this.skipTargetFind
    this.isDrawingMode = !this.isDrawingMode
}
*/

export default Ember.Component.extend({
    classNames: ['canvas'],
    didInsertElement: function() {
        //debugger;
        this.set('canvas', $('#maps').get(0))
        var c = new fabric.Canvas(this.get('canvas'), {
            isDrawingMode : true,
            perPixelTargetFind : true,
            targetFindTolerance : 10,
            //renderOnAddRemove : false,
            skipTargetFind : true,
            selection : false
        })
        this.set('fabric', c)
    },
    actions: {
        clear: function() {
            this.get('fabric').clear()
        }
    }
});
