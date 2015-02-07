/*global fabric,$*/
import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['canvas'],
    distance: 0,
    didInsertElement: function() {
        this.set('canvas', $('#maps').get(0))
        this.set('currentColor', this.get('colors')[0])
        if (typeof this.get('currentStreet') === 'undefined') {
            this.set('currentStreet', this.get('currentCity').streets[0])
        }

        var c = new fabric.Canvas('maps', {
            isDrawingMode : true,
            perPixelTargetFind : true,
            targetFindTolerance : 10,
            //renderOnAddRemove : false,
            skipTargetFind : true,
            selection : false
        }),
            canvasResize = function() {
                // compute inner height for main
                var $wrapper = $('#canvasWrapper'),
                    height = $wrapper.outerHeight(true),
                    width = $wrapper.outerWidth(true)

                c.setWidth(width)
                c.setHeight(height)
            }

        this.set('tip', $('<div/>', {'class': 'tooltip'}))

        c.freeDrawingBrush.width = 5
        c.freeDrawingBrush.color = this.get('currentColor')

        c.on('mouse:down', this.mousedown.bind(this))
        c.on('mouse:up', this.mouseup.bind(this))
        //c.on('mouse:move', this.moveToolTip.bind(this))

        // this checks for paths added through the drawing mode mouse up event
        c.on('path:created', this.addPathData.bind(this))

        canvasResize()

        window.onresize = function() {Ember.run.throttle(this, canvasResize, 100)}
        this.set('fabric', c)
    },
    clearMouseEvents: function() {
        var c = this.get('fabric')
        c.off('mouse:down')
        c.off('mouse:up')
        c.off('mouse:move')
        c.off('path:created')
    },
    willDestroyElement: function() {
        this.clearMouseEvents()
        window.onresize = null
    },
    actions: {
        save: function() {},
        undo: function() {},
        clear: function() {
            this.get('fabric').clear()
        },
        preview: function() {},
        actualMap: function() {},
        expand: function() {}
    },
    toggleDrawing: function () {
        var c = this.get('fabric')
        c.skipTargetFind = !c.skipTargetFind
        c.isDrawingMode = !c.isDrawingMode
    },
    mousedown: function() {
        this.get('fabric').on('mouse:move', this.trackPathDistance.bind(this))
    },
    mouseup: function() {
        this.get('fabric').off('mouse:move')
    },
    trackPathDistance: function(ops) {
        // Tracks the 'distance' drawn since previous street changeover

        var deltaX, deltaY, 
            e = ops.e,
            c = this.get('fabric'),
            currentCity = this.get('currentCity'),
            // the streets property is not set up as an observable so we access direction
            allStreets = currentCity.streets,
            currentStreet = this.get('currentStreet'),
            distance

        if ( ops.e.type.match(/touch/) )  {
            deltaX = e.changedTouches[0].screenX - e.targetTouches[0].screenX
            deltaY = e.changedTouches[0].screenY - e.targetTouches[0].screenY
        } else {
            deltaX = e.movementX
            deltaY = e.movementY
        }

        // a little bit of math to get the distance of a non-linear line
        debugger;
        this.set('distance', this.get('distance') + Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)))
        distance = this.get('distance')

        try {
            // if the tracked distance is longer than the length of the current street
            // grab all the points in Fabric's memory, set them to the canvas using 
            // the current color from the color rotation
            // and finally reset the tracked distance by subtracting the length 
            // of the current street
            if ( distance * 10 > currentStreet.length ) {
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
                    stroke : this.get('currentColor'),
                    strokeWidth : 5,
                    strokeLineCap : 'round',
                    name : currentStreet.name,
                    length : currentStreet.length,
                    // performance considerations
                    hasControls : false,
                    hasBorders : false,
                    hasRotatingPoint : false,
                    selectable : false
                })
                c.add(path)
                //this.addPathData(ops, path)

                if ( currentStreet === allStreets.get('lastObject') ) {
                    // end of street list

                    c.isDrawingMode = false
                    c.skipTargetFind = false
                    this.clearMouseEvents()
                    //$('toggleDrawing').setAttribute('disabled', true)
                    //c.getObjects().forEach(function(path) {
                    //    path.selectable =  false
                    //})
                    return
                } else {
                    // set up for next street and color

                    this.advance('currentColor', this.get('colors'))
                    c.freeDrawingBrush.color = this.get('currentColor')
                    c._onMouseDownInDrawingMode(ops.e)

                    // reset tracked distance
                    console.log(this.get('currentStreet'))
                    this.set('distance', distance - (this.get('currentStreet').length/10))
                    this.advance('currentStreet', allStreets)
                }
            }
        } catch(err) {
            console.warn('caught error')
            if (points.length < 2) {
                //console.warn('removing mouse handler')
                //c.off('mouse:move', mousemove)
            }
        }
    },
    moveToolTip: function(ops) {
        var c = this.get('fabric'),
            tip = this.get('tip'),
            target = c.findTarget(ops.e),
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
    },
    advance: function(propertyName, collection) {
        // this generic function sets the value of supplied property
        // to a value that is one ordinal above the current property's index
        // if the current property's index is the final position in the collection,
        // this will set the property to the first item in the collection
        //
        // propertyName String property name to be set
        // collection Ember.Array set of properties. a call to `this.get(property)`
        //  must return an item that is in collection
        var current = this.get(propertyName),
            currentIndex = collection.indexOf(current)

        if ( current === collection.get('lastObject') ) {
            this.set(propertyName, collection[0])
        } else {
            this.set(propertyName, collection[currentIndex + 1])
        }
    },
    addPathData: function (ops, path) {
        /*jshint shadow:true*/
        //console.log(ops)
        var path = path || ops.path,
            currentStreet = this.get('currentStreet')

        path.set({
            fill : null,
            stroke : this.get('currentColor'),
            strokeWidth : 5,
            strokeLineCap : 'round',
            name : currentStreet.name,
            length : currentStreet.length,
            // performance considerations
            hasControls : false,
            hasBorders : false,
            hasRotatingPoint : false,
            selectable : false
        })
        this.get('fabric').renderAll()
    }
})
