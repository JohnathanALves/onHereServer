var Evento = require('../Models/Event');

module.exports = function(req, res, next){
  var usermail = req.user.email;

  Evento.find({participantes: usermail}, function(err, docs){
    if (err){
      return res.json(401, err);
    }
    res.json({
      status: true,
      message: 'encontrado com sucesso!',
      eventos: docs
    });
  });
}
