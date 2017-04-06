var Usuario = require('../Models/User');
var jwt = require('jwt-simple');
var moment = require('moment');
var segredo = 'seusegredodetoken';

module.exports = function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log(email);
  console.log(password);
  if (email == '' || password == '') {
    return res.json({
      status: '407'
    });
  }
  //1
  Usuario.findOne({email: email}, function (err, user) {
  	if (err) {
      console.log(err);
      return res.json({status: '406'});
    }
    if(!user){
      return res.json({status: '406'});
    }
    //2
    user.verificaSenha(password, function(isMatch) {
      if (!isMatch) {
        console.log("Attempt failed to login with " + user.email);
        return res.json({
          status: '406'
        });
      }
    //3
  	var expires = moment().add(7,'days').valueOf();
    var token = jwt.encode({
      iss: user.id,
      exp: expires
    }, segredo);
    //4
    return res.json({
     	token : token,
      expires: expires,
      user: user.toJSON()
      });
    });
  });
};
