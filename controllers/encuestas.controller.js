'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var Encuesta = mongoose.model('Encuesta');

module.exports.saveSurvey = function(req, res) {
  var encuesta = new Encuesta;
  encuesta.nombre = req.body.nombre;
  encuesta.owner = req.body.username;
  encuesta.startDate = moment(req.body.inicio).unix();
  encuesta.finishDate = moment(req.body.fin).unix();

  var preguntas = req.body.preguntas;
  for(var i = 0; i < preguntas.length; i++) {
    encuesta.questions.push({
      question: preguntas[i].pregunta,
      type: preguntas[i].tipo,
      number: preguntas[i].orden,
      answers: preguntas[i].respuestas
    });
  }

  encuesta.save(function(err) {
    if(err) {
      console.log(err);
      return res.status(400).json({response: 'DB Error'});
    }

    res.status(200).json({responses: 'Success'});
  });
}

module.exports.getAll = function(req, res) {
  Encuesta.find({owner: req.body.username}, function(err, data) {
    if(!err) {
      return res.status(200).jsonp({response: data});
    }
  })
}

module.exports.getOne = function(req, res) {
  Encuesta.findById(req.params.id, function(err, data) {
    if(err) {
      console.log(err);
      return res.status(400).jsonp({response: 'DB Error'});
    }

    res.status(200).jsonp({response: data});
  })
}

module.exports.deleteOne = function(req, res) {
  console.log(req.params.id);
  Encuesta.findByIdAndRemove(req.params.id, function(err, data) {
    if(err) {
      console.log(err);
      return res.status(400).json({response: "Can't remove survey"});
    }

    res.status(200).json({response: "Removed succesfully"});
  })
}
