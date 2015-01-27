module.exports = function(app) {
  var express = require('express');
  var mapsRouter = express.Router();

  mapsRouter.get('/', function(req, res) {
    res.send({
      'maps': []
    });
  });

  mapsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  mapsRouter.get('/:id', function(req, res) {
    res.send({
      'maps': {
        id: req.params.id
      }
    });
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

  app.use('/api/maps', mapsRouter);
};
