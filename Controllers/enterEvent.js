var Evento = require('../Models/Event');

module.exports = function(req, res, next){
  console.log('Entrei debugando, hihihi');
  var chave = req.query.id;
  Evento.findOne({chave:chave}, function(err, evento){
    if(err){
      return res.json(401, err);
    }
    evento.participantes.push(req.user.email);
    console.log('adicionado participante: '+ chave + ' : '+ req.user.email);
    res.json({
      status: true,
      message: 'usuario adicionado a evento com sucesso!',
      chave: chave,
      user: req.user.email
    })
  });
};
