'use strict';

var mongoose = require('mongoose');


var questionsSchema = new mongoose.Schema({
    question: String,
    number: Number,
    answers: [String],
    type: String
});


var encuestaSchema = new mongoose.Schema({
  nombre: String,
  owner: String,
  startDate: Number,
  finishDate: Number,
  questions: [questionsSchema]
});

module.exports = mongoose.model('Encuesta', encuestaSchema);
