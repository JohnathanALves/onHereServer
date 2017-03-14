var Model = require('../Models/User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(req, res, next){
	var data = new Model({
    email: req.body.email,
    password: createHash(req.body.password),
    fullname: req.body.fullname
	  });
	  data.save(function(err) {
	    if (err){
        next(err);
      } else{
        console.log('Usuario criado' + data.email);
        res.json({ message: 'Novo Usuário'});
      }

	  });

};
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(5), null);
}
