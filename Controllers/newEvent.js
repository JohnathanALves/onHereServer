var Model = require('../Models/Event');
var moment = require('moment');


module.exports = function(req, res, next){
  var descricao   = req.body.desc
  , nome          = req.body.nome
  , data_in       = moment(req.body.dtin)
  , data_fim      = moment(req.body.dtfim)
  , tolerancia    = req.body.tolerancia
  , lat           = req.body.latitude
  , long          = req.body.longitude
  , owner         = req.user.email
  if (typeof data_in == 'undefined' || typeof data_fim == 'undefined'){
    res.json({status: '420'});
  }
  console.log('entrei');
  console.log(descricao);
  console.log(nome);
  console.log(data_in);
  console.log(data_fim);
  console.log(tolerancia);
  console.log(lat);
  console.log(long);
  console.log(owner);
  var gerador = new Password;
  var chave = gerador.generate(6);

  var tempdata_in = data_in.toString();
  var tempdata_fim = data_fim.toString();

  console.log('tempdata_in: '+tempdata_in);
  console.log('tempdata_fim: '+tempdata_fim);
  // criacao do objeto do Model
  var data = new Model({
    nome          : nome,
    descricao     : descricao,
    data_in       : tempdata_in,
    data_fim      : tempdata_fim,
    tolerancia    : tolerancia,
    latitude      : lat,
    longitude     : long,
    owner: owner,
    chave: chave
  });
  data.save(function(err){
    if(err){
      res.json({'status': 421});
    } else{
      console.log('Evento criado! ' + chave);
      res.json({
        status: '422',
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
