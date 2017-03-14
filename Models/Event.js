var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventoSchema = new Schema({
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
    latitude      : {
      type:       Number,
      required:   true
    },
    longitude     : {
        type:     Number,
      required:   true
    },
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
