'use strict';

(function() {
  angular.module('encuestas').
  controller('answerEncuestaCtrl', answerEncuestaCtrl);

  answerEncuestaCtrl.$inject = ['$rootScope', '$scope', '$stateParams', 'surveys', 'moment', 'authentication'];

  function answerEncuestaCtrl($rootScope, $scope, $stateParams, surveys, moment, authentication) {
    $scope.invalidButton = false;
    $scope.nombre;
    $scope.owner;
    $scope.questions;
    $scope.outOfRange = false;
    $scope.start;
    $scope.finish;
    $scope.respuestas = {};

    function init() {
      $rootScope.session = authentication.currentUser();
      surveys.getOne($stateParams.id)
      .then(function(data) {
        console.log(data);
        $scope.nombre = data.data.response.nombre;
        $scope.owner = data.data.response.owner;
        if(moment().unix() <= data.data.response.finishDate &&
          moment().unix() >= data.data.response.startDate) {

            $scope.questions = data.data.response.questions;
        } else {
          $scope.outOfRange = true;
          $scope.start = moment.unix(data.data.response.startDate).format('YYYY-M-d');
          $scope.finish = moment.unix(data.data.response.finishDate).format('YYYY-M-d');
        }
      }, function(err) {
        console.log(err);
      });
    }

    init();

    $scope.enviar = function(respuestas) {
      if($scope.invalidButton == true) {
        return;
      }
      var arrayRespuestas = new Array();
      for(var r in respuestas) {
        console.log(r + ' - ' + respuestas[r]);
        var obj = new Object();
        var aNombre = r.split('_');
        var qNumber = Number(aNombre[0]);
        var e = exists(qNumber, arrayRespuestas);
        if(e != -1) {
          if(r.split('_').length > 1 && respuestas[r] == true) {
            arrayRespuestas[e].respuestas.push(aNombre[1]);
          } else {
            arrayRespuestas[e].respuestas.push(respuestas[r]);
          }
        } else {
          if(r.split('_').length > 1 && respuestas[r] == true) {
            if(respuestas[r] == true) {
              obj.numeroPregunta = qNumber;
              obj.pregunta = $scope.questions[qNumber].question;
              obj.respuestas = [aNombre[1]];
              arrayRespuestas.push(obj);
            }
          } else {
            obj.numeroPregunta = qNumber;
            obj.pregunta = $scope.questions[qNumber].question;
            obj.respuestas = [respuestas[r]];
            arrayRespuestas.push(obj);
          }
        }
      }

      console.log(arrayRespuestas);
      surveys.sendAnswer($stateParams.id, $scope.nombre, arrayRespuestas)
      .then(function(data) {
        console.log(data);
        alert('Respusta enviada. Favor de recagar la página para una nueva respuesta');
        $scope.invalidButton = true;
      }, function(err) {
        console.log(err);
      })
    }

    function exists(number, array) {
      for(var i = 0; i < array.length; i++) {
        if(number == array[i].numeroPregunta) {
          return i;
        }
      }

      return -1;
    }
  }
})();
