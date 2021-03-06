
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
  res.json({status: '666'});
});

router.post('/evento/novo', TokenValidation, function(req, res, next){
  var newEvent = require('./Controllers/newEvent')(req, res, next);
});

router.get('/evento/entrar/:chave?:latitude?:longitude?', TokenValidation, function(req, res, next){
  var entrarEvento = require('./Controllers/enterEvent')(req, res, next);
});

router.get('/evento/lista', TokenValidation, function(req, res, next){
  var listaEventos = require('./Controllers/listaEvent')(req, res, next);
});

router.get('/evento/mine', TokenValidation, function(req, res, next){
  var mineEventos = require('./Controllers/mineEvent')(req, res, next);
});

router.get('/evento/delete/:chave?', TokenValidation, function(req, res, next){
  var deletaEventos = require('./Controllers/deleteEvent')(req, res, next);
});

router.get('/evento/toleranciaOff/:chave?', TokenValidation, function(req, res, next){
  var toleranciaOff = require('./Controllers/toleranciaOff')(req, res, next);
});

router.get('/token/valida', TokenValidation, function(req, res, next){
  return res.json({status: '666'});
});


module.exports = router;
