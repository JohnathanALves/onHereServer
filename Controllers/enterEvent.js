var Evento = require('../Models/Event');
var geolib = require('geolib');

module.exports = function(req, res, next){
  var id = req.query.id;
  var usermail = req.user.email;
  var posicao = {latitude: req.user.latitude, longitude: req.user.longitude};
  var _idEvento;
  var localizaEvento = {};
  Evento.findOne({chave: id}, function(err, evento){
    if (err){
      res.json(status: '414');
    }
    _idEvento = evento._id;
    localizaEvento = {latitude: evento.latitude, longitude: evento.longitude};
    var distancia = geolib.getDistance(posicao, localizaEvento, 1, 2);
    if (distancia > 16){
      res.json(status: '419');
    }
  });
  Evento.findByIdAndUpdate(
    _idEvento,
    {$push: {"participantes": usermail}},
    {safe: true, upsert: true},
    function(err, model){
      if(err) return res.json(err);
      return res.json(status: '417');
    }
  );
};
