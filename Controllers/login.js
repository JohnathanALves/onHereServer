var Usuario = require('../Models/User');
var jwt = require('jwt-simple');
var moment = require('moment');
var segredo = 'seusegredodetoken';

module.exports = function(req, res) {
  var email = req.body.email || '';
  var password = req.body.password || '';
  if (email == '' || password == '') {
    return res.send(401);
  }
  //1
  Usuario.findOne({email: email}, function (err, user) {
  	if (err) {
      return res.json(401, err)
    }
    //2
    user.verificaSenha(password, function(isMatch) {
      if (!isMatch) {
        console.log("Attempt failed to login with " + user.email);
        return res.send(401);
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
