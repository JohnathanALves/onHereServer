var Evento = require('../Models/Event');
var geoLib = require('geo-lib');

module.exports = function(req, res, next){
  var id            = req.query.chave;
  var usermail      = req.user.email;
  var lat           = req.query.latitude
  var long          = req.query.longitude
  if(typeof id === 'undefined' || id == null){
    return res.json({status: '414'});
  }
  //var localizaEvento = {};
  Evento.findOne({chave: id}, function(err, evento){
    if (err){
      return res.json({status: '414'});
    }
    if(!evento){
      return res.json({status: '414'});
    }
    var distance = geoLib.distance({
      p1: {lat: evento.localizacao.latitude, lon: evento.localizacao.longitude},
      p2: {lat: lat, lon: long}
    });
    if (distance.distance >= 0.015 ){
      res.json({status: '419'});
    }
    var part = [];
    part = evento.participantes;
    part.push(usermail);
    evento.participantes = part;
    evento.save(function(err, event){
      if(err) return res.json({status: '415'});
      return res.json({status: '417'});
    });
  });
};
