'use strict';

var mongoose = require('mongoose');
var Respuestas = mongoose.model('Respuestas');

module.exports.registerAnswer = function(req, res) {
  // console.log(req.body);
  var r = new Respuestas();
  r.encuesta = req.body.encuesta;
  r.nombre_encuesta = req.body.nombre_encuesta;
  var respuestas = req.body.respuestas;
  for(var i = 0; i < respuestas.length; i++) {
    var obj = new Object();
    obj.name = respuestas[i].pregunta;
    obj.number = respuestas[i].numeroPregunta;
    obj.respuestas = [];
    for(var j = 0; j < respuestas[i].respuestas.length; j++) {

      obj.respuestas.push(respuestas[i].respuestas[j]);
    }
    r.pregunta.push(obj);
    // console.log(r);
  }

  r.save(function(err) {
    if(err) {
      console.log(err);
      return res.status(400).json({response: 'DB Error'});
    }

    res.status(200).json({response: 'Added'});
  })
}

module.exports.getAnswers = function(req, res) {
  Respuestas.aggregate([
    {$match: {encuesta: req.params.id}},
  	{$unwind: '$pregunta'},
  	{$unwind: '$pregunta.respuestas'},
  	{$group: {
  		_id: {survey: '$nombre_encuesta', name: '$pregunta.name', number: '$pregunta.number', respuesta: '$pregunta.respuestas', },
  		total: {$sum :1}
  	}},
  	{$group: {
  		_id: {name: '$_id.name', number: '$_id.number', survey: '$_id.survey'},
  		respuestas: {
  			$push: {
  				_id: '$_id.respuesta',
  				total: '$total'
  			}
  		}
  	}},
  	{$sort: {'_id.number': 1}}
  ], function(err, data) {
    if(!err) {
      res.status(200).json({response:data});
    }
  })
}
