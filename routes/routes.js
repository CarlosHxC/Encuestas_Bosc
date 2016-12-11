'use strict';

var express = require('express');
var router = express.Router();

var encuestaCtrl = require('../controllers/encuestas.controller.js');
var respuestasCtrl = require('../controllers/respuestas.controller.js');
var auth = require('../middleware/ensureAuthenticated');

router.post('/encuesta', auth.ensureAuthenticated, encuestaCtrl.saveSurvey);
router.post('/getAll', auth.ensureAuthenticated, encuestaCtrl.getAll);
router.get('/encuesta/:id', encuestaCtrl.getOne);
router.delete('/encuesta/:id', auth.ensureAuthenticated, encuestaCtrl.deleteOne);
router.post('/encuesta/answer', respuestasCtrl.registerAnswer);
router.get('/encuesta/answer/:id', auth.ensureAuthenticated, respuestasCtrl.getAnswers);

module.exports = router;
