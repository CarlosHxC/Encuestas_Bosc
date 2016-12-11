'use strict';

var mongoose = require('mongoose');

var respuestas = new mongoose.Schema({
  encuesta: String,
  nombre_encuesta: String, 
  pregunta: [{
    name: String,
    number: Number,
    respuestas: [String]
  }]
});

module.exports = mongoose.model('Respuestas', respuestas);
