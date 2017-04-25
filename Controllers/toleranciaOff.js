var Evento = require('../Models/Event');

module.exports = function(req, res, next){
  var chave = req.query.chave;
  var usermail = req.user.email;

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
    console.log(usermail);
    console.log(evento.owner);
    if (usermail == evento.owner) {
      // aqui aciona o esquema de desligamento de tolerancia
      evento.isToleranciaAtivo = false;
      evento.save(function(err, event){
        if(err) return res.json({status: '425'});
        return res.json({status: '426'});
      });
    } else {
      return res.json({status: '427'});
    }
  });
};
