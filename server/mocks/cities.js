var chance = require('chance').Chance(),
    cities = []

for (var i = 0; i < 10; i++) {
    var city = {
        id: chance.natural({max: 100}),
        name: chance.city() + ' ' + chance.state(),
        streets: []
    }

    for (var j = 0; j < 50; j++) {
        city.streets.push({
            name: chance.street({short_suffix: true}),
            length: chance.floating({min: 0, max: 6, fixed: 2})
        })
    }
    city.streets.sort(function(a,b) {
        if (a.length < b.length) {
            return -1
        } else if ( a.length > b.length ) {
            return 1
        } else {
            return 0
        }
    })
    city.streets.reverse()
    cities.push(city)
}

module.exports = function(app) {
  var express = require('express');
  var citiesRouter = express.Router();

  citiesRouter.get('/', function(req, res) {
    res.send({
      'cities': cities
    });
  });

  citiesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  citiesRouter.get('/:id', function(req, res) {
    res.send({
      'cities': {
        id: req.params.id
      }
    });
  });

  citiesRouter.put('/:id', function(req, res) {
    res.send({
      'cities': {
        id: req.params.id
      }
    });
  });

  citiesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/cities', citiesRouter);
};
