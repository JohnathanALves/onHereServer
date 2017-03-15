
var express = require('express');
var router = express.Router();
var TokenValidation = require('./Controllers/tokenvalidation');

router.post('/usuario/novo', function(req, res, next){
  var signup = require('./Controllers/signup')(req, res, next);
});

router.post('/usuario/login', function(req, res, next){
  var login = require('./Controllers/login')(req, res);
});

router.get('/usuario/hello', TokenValidation, function(req, res, next){
  res.json({
    message: 'Hello from user!'
  });
});

router.post('/evento/novo', TokenValidation, function(req, res, next){
  //res.json({message:'hi'});
  var newEvent = require('./Controllers/newEvent')(req, res, next);
});

router.get('/evento/entrar/:id?', TokenValidation, function(req, res, next){
  var entrarEvento = require('./Controllers/enterEvent')(req, res, next);
});

router.get('/evento/lista', TokenValidation, function(req, res, next){
  var listaEventos = require('./Controllers/listaEvent')(req, res, next);
});

module.exports = router;
