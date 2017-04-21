var Evento = require('../Models/Event');
var geoLib = require('geo-lib');
var moment = require('moment');

module.exports = function(req, res, next){
  var chave         = req.query.chave;
  var usermail      = req.user.email;
  var lat           = req.query.latitude;
  var long          = req.query.longitude;
  if(typeof chave === 'undefined' || chave == null){
    return res.json({status: '414'});
  }

  Evento.findOne({chave: chave}, function(err, evento){
    if (err){
      return res.json({status: '414'});
    }
    if(!evento){
      return res.json({status: '414'});
    }
    var distance = geoLib.distance({
      p1: {lat: evento.latitude, lon: evento.longitude},
      p2: {lat: lat, lon: long}
    });
    moment.tz.setDefault("America/Recife");
    var startData = moment(evento.data_in);
    console.log(evento.data_in);
    console.log('start: ' + startData.format());
    var currentTime = moment();
    console.log('Current time: ' + currentTime.format());
    var Timediference = currentTime.diff(startData, 'minutes');
    console.log(Timediference);
    if(Timediference > evento.tolerancia){
      res.json({status: '421'});
    }
    if (distance.distance >= 0.015 ){
      res.json({status: '419'});
    }
    var part = [];
    part = evento.participantes;
    if (part.indexOf(usermail) > -1){
      part.push(usermail);
      evento.participantes = part;
      evento.save(function(err, event){
        if(err) return res.json({status: '415'});
        return res.json({status: '417'});
      });
    }
    return res.json({status: '417'});
  });
};
