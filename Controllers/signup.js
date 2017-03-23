var Model = require('../Models/User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(req, res, next){
	var email = req.body.email;
	var pass 	= req.body.password;
	var name 	=	req.body.fullname;

	Model.findOne({email: email}, function(err, user){
		if(err){
			console.log('Error in signup: '+err);
			return res.json({status: '418'});
		}
		if(user) {
			console.log('Email ja cadastrado: '+email);
			return res.json({status: '408'});
		}
		//criacao do objeto
		var data = new Model({
	    email: email,
	    password: createHash(pass),
	    fullname: name
		  });
			// salva o objeto
		  data.save(function(err, user){
		    if (err){
					console.log('Error in signup: '+err);
					return res.json({status: '418'});
	      }
	        console.log('Usuario criado' + data.email);
	        res.json({status: '409'});
		  });
	});
};
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(5), null);
}
