var express     = require('express')
  , app         = express()
  , bodyParser  = require('body-parser')
  , mongoose    = require('mongoose')
  , jwt         = require('jwt-simple')

// conexao com MlAB
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://admin:admin@ds113660.mlab.com:13660/onheredb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var port = process.env.PORT || 8080;

var rotas = require('./rotas');
app.use('/api', rotas);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.json({
    message: 'Not Found, hihihi',
  });
});


app.listen(port);
console.log('conectado a porta ' + port);
