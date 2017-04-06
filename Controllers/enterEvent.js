var Evento = require('../Models/Event');
var geolib = require('geolib');

module.exports = function(req, res, next){
  var id = req.query.id;
  var usermail = req.user.email;
  //var posicao = {latitude: req.user.latitude, longitude: req.user.longitude};
  var chave;
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
    var part = [];
    part = evento.participantes;
    part.push(usermail);
    evento.participantes = part;
    evento.save(function(err, event){
      if(err) return res.json({status: '414'});
      return res.json({status: '417'});
    });
  });
};
