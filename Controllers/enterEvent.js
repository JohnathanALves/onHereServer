var Evento = require('../Models/Event');

module.exports = function(req, res, next){
  var id = req.query.id;
  var usermail = req.user.email;
  var _idEvento;
  console.log('entrei')
  Evento.findOne({chave: id}, function(err, evento){
    _idEvento = evento._id;
  });
  Evento.findByIdAndUpdate(
    _idEvento,
    {$push: {"participantes": usermail}},
    {safe: true, upsert: true},
    function(err, model){
      if(err) return res.json(err);
      return res.json('417');
    }
  );
};
