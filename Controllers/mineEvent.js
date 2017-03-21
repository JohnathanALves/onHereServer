var Evento = require('../Models/Event');

module.exports = function(req, res, next){
  Evento.find({owner: usermail}, function(err, docs){
    if(err){
      return res.json({status: '416'});
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
          criador: req.user.fullname
        };
    }
    res.json({
      status: true,
      message: 'encontrado com sucesso!',
      eventos: array
    });
  });
}
