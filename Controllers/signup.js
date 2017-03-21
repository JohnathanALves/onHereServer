var Model = require('../Models/User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(req, res, next){
	var email = req.body.email;
	var pass 	= req.body.password;
	var name 	=	req.body.fullname;

	Model.findOne({email: email}, function(err, docs){
		if(err){
			//criacao do objeto
			var data = new Model({
		    email: email,
		    password: createHash(pass),
		    fullname: name
			  });
				// salva o objeto
			  data.save(function(err) {
			    if (err){
		        next(err);
		      } else{
		        console.log('Usuario criado' + data.email);
		        res.json({
							status: 409
						 });
		      }
			  });
		} else {
			res.json({
				status: '408'
			});
		}
	});

};
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(5), null);
}
