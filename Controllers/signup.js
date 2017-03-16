var Model = require('../Models/User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(req, res, next){
	var email = req.body.email;
	var pass 	= req.body.password;
	var name 	=	req.body.fullname;

	var data = new Model({
    email: email,
    password: createHash(pass),
    fullname: name
	  });
	  data.save(function(err) {
	    if (err){
        next(err);
      } else{
        console.log('Usuario criado' + data.email);
        res.json({
					message: 'Novo Usuário'
				 });
      }

	  });

};
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(5), null);
}
