var Evento = require('../Models/Event');
var User = require('../Models/User');

module.exports = function(req, res, next){
  var usermail = req.user.email;

  Evento.find({participantes: usermail}, function(err, docs){
    if(err){
      return res.json({status: '416'});
    } else{
      var array = []
      for (var i =0; i< docs.length; i++){
          array[i] = {
            nome: docs[i].nome,
            descricao: docs[i].descricao,
            dtin: docs[i].data_in,
            dtfim: docs[i].data_fim,
            tolerancia: docs[i].tolerancia,
            latitude: docs[i].latitude,
            longitude: docs[i].longitude,
            participantes: docs[i]. participantes,
            chave: docs[i].chave,
            criador: docs[i].owner
          };
      }
      res.json({
        eventos: array
      });
    }
  });

}
