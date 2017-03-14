var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
//1
var UsuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  }
});

//Metodo para verificar senha
UsuarioSchema.methods.verificaSenha = function(password, next) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return next(err);
    next(isMatch);
  });
};

module.exports = mongoose.model('User', UsuarioSchema);
