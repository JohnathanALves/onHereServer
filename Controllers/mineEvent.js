var Evento = require('../Models/Event');
var Moment = require('moment');

module.exports = function(req, res, next){
  var usermail = req.user.email;
  Evento.find({owner: usermail}, function(err, docs){
    if(err){
      return res.json({status: '416'});
    }
    var final = [];
    for (var i =0; i< docs.length; i++){
      if (docs[i].isAtivo) {
        var array = {
          nome: docs[i].nome,
          descricao: docs[i].descricao,
          dtin: Moment(docs[i].data_in).utcOffset('-0300'),
          dtfim: Moment(docs[i].data_fim).utcOffset('-0300'),
          tolerancia: docs[i].tolerancia,
          participantes: docs[i]. participantes,
          chave: docs[i].chave,
          latitude: docs[i].latitude,
          longitude: docs[i].longitude,
          criador: req.user.fullname
        };
        final.push(array);
      }
    }
    res.json({
      eventos: final
    });
  });
}
