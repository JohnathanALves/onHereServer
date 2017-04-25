var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventoSchema = new Schema({
    nome          : {
      type:       String,
      required:   true
    },
    descricao     : {
      type:       String,
      required:   true
    },
    data_in       : {
      type:       String,
      required:   true
    },
    data_fim      : {
      type:       String,
      required:   true
    },
    tolerancia    : {
      type:       Number,
      required:   true
    },
    chave         : {
      type:       String,
      required:   true,
      unique:     true
    },
    latitude    :{
      type      : Number,
      required  : true
    },
    longitude   :{
      type      : Number,
      required  : true
    },
    owner         : {
      type:       String,
      required:   true
    },
    participantes :
      [{
        type:     String,
        unique:   true
      }],
    isAtivo       : {type: Boolean, default: true},
    isToleranciaAtivo : {type: Boolean, default: true}
});

module.exports = mongoose.model('Event', EventoSchema);
