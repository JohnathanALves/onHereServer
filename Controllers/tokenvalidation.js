var model = require('../Models/User')
	, jwt = require('jwt-simple');
	var segredo = 'seusegredodetoken';
module.exports = function(req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
//1
  if (token) {
    try {
      var decoded = jwt.decode(token, segredo);
   		console.log('decodando ' + decoded);
     //2
      if (decoded.exp <= Date.now()) {
  		  res.json({status: '410'});
  		}
  		//3
  		model.findOne({ _id: decoded.iss }, function(err, user) {
    		if(err)
    			res.json({status: '411'});
				if (!user) {
					res.json({status: '411'});
				}
    		req.user = user;
    		console.log('achei usuario ' + req.user)
  			return next();
  		});
 	//4
  } catch (err) {
      return res.json({status: '412'});
    }
  } else {
	   res.json({status: '413'})
  }
};
