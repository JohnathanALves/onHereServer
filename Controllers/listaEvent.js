var Evento = require('../Models/Event');
var User = require('../Models/User');

module.exports = function(req, res, next){
  var usermail = req.user.email;
  var ownername;
  User.findOne({email: usermail}, function(err, user){
    if(err){
      return res.json(401, err);
    } else{
      ownername = user.fullname;
    }
  });
  Evento.find({participantes: usermail}, function(err, docs){
    if (err){
      return res.json(401, err);
    }
    var array = []
    for (var i =0; i< docs.length; i++){
        array[i] = {
          nome: docs[i].nome,
          descricao: docs[i].descricao,
          dtin: docs[i].data_in,
          dtfim: docs[i].data_fim,
          tolerancia: docs[i].tolerancia,
          localizacao: {lat: docs[i].latitude, long: docs[i].long },
          criador: ownername
        };
    }
    res.json({
      status: true,
      message: 'encontrado com sucesso!',
      eventos: array
    });
  });
}
