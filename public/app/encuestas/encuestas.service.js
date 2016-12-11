'use strict';

(function() {
  angular.module('encuestas')
  .service('surveys', surveys);

  surveys.$inject = ['$http', 'authentication'];

  function surveys($http, authentication) {
    // console.log(authentication.currentUser());
    var user = authentication.currentUser();
    var sendSurvey = function(encuesta, preguntas){
      var q = new Object();
      q.nombre = encuesta.nombre;
      q.username = user.username;
      q.inicio = encuesta.inicio;
      q.fin = encuesta.fin;
      q.preguntas = preguntas;

      return $http.post('/api/encuesta', q, {headers: {
        'Authorization': 'Bearer ' + authentication.getToken()
      }});
    }

    var getAll = function() {
      return $http.post('/api/getAll', {username: user.username}, {headers: {
        'Authorization': 'Bearer ' + authentication.getToken()
      }});
    }

    var getOne = function(id) {
      return $http.get('/api/encuesta/' + id);
    }

    var deleteOne = function(id) {
      return $http.delete('/api/encuesta/' + id, {headers: {
        'Authorization': 'Bearer ' + authentication.getToken()
      }});
    }

    var sendAnswer = function(id, nombre_encuesta,  respuestas) {
      var q = {
        encuesta: id,
        nombre_encuesta,
        respuestas: respuestas
      }
      return $http.post('/api/encuesta/answer', q);
    }

    var getAnswers = function(id) {
      return $http.get('/api/encuesta/answer/' + id, {headers: {
        'Authorization': 'Bearer ' + authentication.getToken()
      }});
    }

    return {
      sendSurvey: sendSurvey,
      getAll: getAll,
      getOne: getOne,
      deleteOne: deleteOne,
      sendAnswer: sendAnswer,
      getAnswers: getAnswers
    }
  }


})();
