var chance = require('chance').Chance(),
    cities = [],
    colors = chance.shuffle([
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


for (var i = 0; i < 10; i++) {
    var city = {
        id: chance.natural({max: 100}),
        name: chance.city() + ', ' + chance.state(),
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
      'cities': cities,
      'colors': colors
    });
  });

  citiesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  citiesRouter.get('/:id', function(req, res) {
    res.send({
      'cities': {
        id: req.params.id
      },
      'colors': colors
    });
  });

  citiesRouter.put('/:id', function(req, res) {
    res.send({
      'cities': {
        id: req.params.id
      },
      'colors': colors
    });
  });

  citiesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/cities', citiesRouter);
};
