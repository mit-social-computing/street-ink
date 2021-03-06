/*global require, process*/
function extractMapData(req) {
    var map = req.body.map,
        title = map.title || 'no title',
        author = map.author || 'no author',
        location = map.location || 'no location',
        pathData = map.pathData,
        city = map.city,
        image = map.imageData ? map.imageData.replace(/^data:image\/png;base64,/, "") : ''

    return [title, author, location, pathData, city, image]
}

function uploadThumb(img, mediaBucket, id) {
    require('gm')(img).resize(250).toBuffer('PNG', function(err, buf) {
      if (err) {
        return err
      }
        mediaBucket.upload({ Body: buf, Key: 'thumbs/' + id + '.png'})
            .send(function(err, data) { console.log(err, data)  });
    })
}

function postOrPut(req, res) {
    var input = extractMapData(req),
        image = input.pop(),
        queryText

        if ( req.method === 'POST' ) {
            queryText = 'insert into maps (title, author, location, "pathData", "createdAt", city) values($1, $2, $3, $4, current_timestamp, $5) returning id'
        } else if ( req.method === 'PUT' ) {
            input.push(req.params.map_id)
            queryText = 'update maps set (title, author, thumbnail, "pathData", city) = ($1, $2, $3, $4, $5) where id = $6 returning id'
        }

    query(queryText, input).then(function(result) {
        try {
            AWS.config.update({region: 'us-east-1'})

            var id = result.rows[0].id,
                img = new Buffer(image, 'base64'),
                mediaBucket = new AWS.S3({ params: { Bucket: 'street-ink/maps' } })

            // resize and upload
            var resultIfError = uploadThumb(img, mediaBucket, id)
            if (resultIfError) {
              return res.status(500).send('that\'s an error')
            }
            // upload full size
            mediaBucket.upload({ Body: img, Key: 'full/' + id + '.png'  })
                .send(function(err, data) { console.log(err, data)  });

            res.json(id)
        } catch(e) { console.log(e) }
    }, function(err) {
        console.log(err)
        res.status(500).send('sorry there\'s been an error. check the logs')
    })
}

var express = require('express'),
    router = express.Router(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    Q = require('q'),
    fs = require('fs'),
    AWS = require('aws-sdk'),
    query = require('./db.js'),
    app = express(),
    port = 3000,
    client,
    chance = require('chance').Chance(),
    cors = require('cors')


app.use(cors())
app.use(bodyParser.json({limit: '1mb'}))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'))

app.use('/api/v1', router)

router.get('/maps', function(req, res) {
    query('select * from maps').then(function(results) {
        res.send({ maps: results.rows })
    })
})

router.get('/maps/:map_id', function(req, res) {
    query('select * from maps where id = $1', [req.params.map_id]).then(function(results) {
        res.send({ maps: results.rows })
    })
})

router.post('/maps', postOrPut)
router.put('/maps/:map_id', postOrPut)

router.get('/colors', function(req, res) {
    query('select * from colors order by random()').then(function(results) {
        res.send({ colors: results.rows })
    }, function(err) {
      res.status(500).send(err)
    })
})

router.get('/cities', function(req, res) {
    query('select * from cities').then(function(results) {
        res.send({ cities: results.rows })
    }, function(err) {
      res.status(500).send(err)
    })
})

router.post('/cities', function(req, res) {
    var name = req.body.name,
        streets = req.body.streets.trim().split('\n').slice(1)

    streets = streets.map(function(street) {
        var p = street.split(',')
        return { name: p[0], length: p[1] }
    })


    var queryText = 'insert into cities (name, streets) values($1, $2) returning id'
    query(queryText, [name, JSON.stringify(streets)]).then(function(result) {
        res.json(result)
    }, function(err) {
      res.status(500).send(err)
    })
})

app.listen(port, function() {
    console.log('listening on:', port)
})
