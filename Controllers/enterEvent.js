var Evento = require('../Models/Event');
var geolib = require('geolib');

module.exports = function(req, res, next){
  var id            = req.query.chave;
  var usermail      = req.user.email;
  var lat           = req.body.latitude
  var long          = req.body.longitude
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
      if(err) return res.json({status: '415'});
      return res.json({status: '417'});
    });
  });
};
