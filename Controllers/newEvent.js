var Model = require('../Models/Event');

module.exports = function(req, res, next){
  var descricao   = req.body.desc
  , nome          = req.body.nome
  , data_in       = new Date(req.body.dtin)
  , data_fim      = new Date(req.body.dtfim)
  , tolerancia    = req.body.tolerancia
  , latitude      = req.body.latitude
  , longitude     = req.body.longitude
  , owner         = req.user.email
  var gerador = new Password;
  var chave = gerador.generate(6);

  // criacao do objeto do Model
  var data = new Model({
    nome          : nome,
    descricao     : descricao,
    data_in       : data_in,
    data_fim      : data_fim,
    tolerancia    : tolerancia,
    localizacao   : {latitude: latitude, longitude: longitude},
    owner: owner,
    chave: chave
  });
  data.save(function(err){
    if(err){
      next(err);
    } else{
      console.log('Evento criado! ' + chave);
      res.json({
        status: 'true',
        evento: data.toJSON()
      })
    }
  });

};

var Password = function() {
  this.pass = "";

  this.generate = function(chars) {
    for (var i= 0; i<chars; i++) {
      this.pass += this.getRandomChar();
    }
    return this.pass;
  }

  this.getRandomChar = function() {
     /*
    *    matriz contendo em cada linha indices (inicial e final) da tabela ASCII para retornar alguns caracteres.
    *    [48, 57] = numeros;
    *    [64, 90] = "@" mais letras maiusculas;
    *    [97, 122] = letras minusculas;
    */
    var ascii = [[48, 57],[64,90],[97,122]];
    var i = Math.floor(Math.random()*ascii.length);
    return String.fromCharCode(Math.floor(Math.random()*(ascii[i][1]-ascii[i][0]))+ascii[i][0]);
  }
};
