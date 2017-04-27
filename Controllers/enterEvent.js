var Evento = require('../Models/Event');
var geoLib = require('geo-lib');
var moment = require('moment');




module.exports = function (req, res, next){
    var chave         = req.query.chave;
    var usermail      = req.user.email;
    var lat           = req.query.latitude;
    var long          = req.query.longitude;
    if(typeof chave == undefined || usermail == undefined || lat == undefined || long == undefined){
      return res.json({status: '414'});
    }
    Evento.findOne({'chave': chave}, function(err, evento){
      if(err){
        console.log('erro: '+ err);
        return res.json({status: '414'});
      }
      if(evento){
        // Aqui acontece a magia
        var distance = geoLib.distance({
          p1: {lat: evento.latitude, lon: evento.longitude},
          p2: {lat: lat, lon: long}
        }); // aqui calculei a distancia

        var startData = moment(evento.data_in).utcOffset('-0300');
        console.log(evento.data_in);
        console.log('start: ' + startData.format());
        var currentTime = moment();
        console.log('Current time: ' + currentTime.format());
        var Timediference = currentTime.diff(startData, 'minutes');
        console.log(Timediference);
        // verifica atraso
        console.log(distance.distance);
        if (distance.distance <= 0.015){ // distancia menor que 15M
          if(evento.isToleranciaAtivo){ // tolerancia ativa
            if(Timediference < evento.tolerancia){
              var part = [];
              part = evento.participantes;
              if (part.indexOf(usermail) == -1){
                part.push(usermail);
                evento.participantes = part;
                evento.save(function(err){
                  if (err){
                    return res.json({status : '415'});
                  }
                  return res.json({status : '417'});
                });
              } else { // caso já esteja cadastrado no evento.
                return res.json({status : '417'});
              }
            } else {
              return res.json({status : '421'});
            }
          } else {
            // tolerancia inativa
            var part = [];
            part = evento.participantes;
            if (part.indexOf(usermail) == -1){
              part.push(usermail);
              evento.participantes = part;
              evento.save(function(err){
                if (err){
                  return res.json({status : '415'});
                }
                return res.json({status : '417'});
              });
            } else { // caso já esteja cadastrado no evento.
              return res.json({status : '417'});
            }
          }
        } else { // distancia maior que 15M
          return res.json({status: '419'})
        }
      }else{
        console.log('evento nao encontrado');
        return res.json({status: '414'})
      }
    });
}





// module.exports = function(req, res, next){
//   var chave         = req.query.chave;
//   var usermail      = req.user.email;
//   var lat           = req.query.latitude;
//   var long          = req.query.longitude;
//   if(typeof chave === 'undefined' || chave == null){
//     return res.json({status: '414'});
//   }
//
//   Evento.findOne({chave: chave}, function(err, evento){
//     if (err){
//       return res.json({status: '414'});
//     }
//     if(!evento){
//       return res.json({status: '414'});
//     }
//     var distance = geoLib.distance({
//       p1: {lat: evento.latitude, lon: evento.longitude},
//       p2: {lat: lat, lon: long}
//     });
//     var startData = moment(evento.data_in);
//     console.log(evento.data_in);
//     console.log('start: ' + startData.format());
//     var currentTime = moment();
//     console.log('Current time: ' + currentTime.format());
//     var Timediference = currentTime.diff(startData, 'minutes');
//     console.log(Timediference);
//     if (evento.isToleranciaAtivo){
//       if(Timediference > evento.tolerancia){
//         return res.json({status: '421'});
//       } else{
//         if (distance.distance >= 0.015 ){
//           return res.json({status: '419'});
//         } else {
//           var part = [];
//           part = evento.participantes;
//           if (part.indexOf(usermail) == -1){
//             part.push(usermail);
//             evento.participantes = part;
//             evento.save(function(err, event){
//               if(err){
//                  return res.json({status: '415'});
//               }
//               return res.json({status: '417'});
//             });
//           }
//           console.log('debug1');
//           return res.json({status: '415'});
//         }
//       }
//     } else {
//       if (distance.distance >= 0.015 ){
//         return res.json({status: '419'});
//       } else {
//         var part = [];
//         part = evento.participantes;
//         console.log(part.indexOf(usermail));
//         if (part.indexOf(usermail) == -1){
//           console.log('entrou?');
//           part.push(usermail);
//           evento.participantes = part;
//           evento.save(function(err, event){
//             if(err) {
//               return res.json({status: '415'});
//             }
//             return res.json({status: '417'});
//           });
//         }
//         return res.json({status: '415'});
//       }
//     }
//
//   });
// };
