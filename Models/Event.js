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
      type:       Date,
      required:   true
    },
    data_fim      : {
      type:       Date,
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
    localizacao   :[{
      latitude    :{
        type      : String,
        required  : true
      },
      longitude   :{
        type      : String,
        required  : true
      }
    }],
    owner         : {
      type:       String,
      required:   true
    },
    participantes :
      [{
        type:     String,
        unique:   true
      }]
});

module.exports = mongoose.model('Event', EventoSchema);
