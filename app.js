var express     = require('express')
  , app         = express()
  , bodyParser  = require('body-parser')
  , mongoose    = require('mongoose')
  , jwt         = require('jwt-simple')
  , moment      = require('moment-timezone')


// config hora e timezone
moment().tz("America/Recife").format();
// conexao com MlAB
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://admin:admin@ds113660.mlab.com:13660/onheredb');

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection openned ');
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var port = process.env.PORT || 8080;

var rotas = require('./rotas');
app.use('/api', rotas);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.json({
    status: '404',
    message: 'Not Found, hihihi',
  });
});


app.listen(port);
console.log('conectado a porta ' + port);
