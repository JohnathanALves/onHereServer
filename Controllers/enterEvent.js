var Evento = require('../Models/Event');

module.exports = function(req, res, next){

  var chave = req.query.id;
  Evento.findOne({chave:chave}, function(err, evento){
    if(err){
      return res.json({status: '414'});
    }
    evento.participantes.push(req.user.email);
    evento.save(function(err){
      if (err)
        return res.json({status: '415'});
    });
    console.log('adicionado participante: '+ chave + ' : '+ req.user.email);
    res.json({
      status: true,
      message: 'usuario adicionado a evento com sucesso!',
      chave: chave,
      user: req.user.email
    })
  });
};
