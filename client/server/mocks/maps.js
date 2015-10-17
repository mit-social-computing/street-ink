var chance = require('chance').Chance(),
    maps = [],
    THUMBNAIL = 'http://placehold.it/350x270'

for (var i = 0; i < 15; i++) {
    maps.push({
        id: chance.natural({max: 100}),
        title: chance.capitalize(chance.word()),
        author: chance.name(),
        timestamp: chance.date({year: 2014}).getTime(),
        location: chance.city() + ', ' + chance.state(),
        thumbnail: THUMBNAIL
    })
}
module.exports = function(app) {
  var express = require('express');
  var mapsRouter = express.Router();

  mapsRouter.get('/', function(req, res) {
    res.send({
      'maps': maps
    });
  });

  mapsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  mapsRouter.get('/:id', function(req, res) {
    var map = maps[0]
    map.id = req.params.id
    res.send(map)
  });

  mapsRouter.put('/:id', function(req, res) {
    res.send({
      'maps': {
        id: req.params.id
      }
    });
  });

  mapsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/maps', mapsRouter);
};
