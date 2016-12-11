'use strict';

(function() {
  angular.module('encuestas')
  .controller('postEncuestaCtrl', postCtrl);

  postCtrl.$inject = ['$rootScope', '$scope', '$state', 'surveys', 'authentication'];

  function postCtrl($rootScope, $scope, $state, surveys, authentication) {

    $scope.preguntas = [];
    var c = 0;

    $rootScope.session = authentication.currentUser();

    $scope.changeRespuestas = function(respuestas) {
      $scope.r = respuestas.split('\n');
    }

    $scope.addQuestion = function(encuesta) {
      $scope.preguntas.push({
        pregunta: encuesta.pregunta,
        respuestas: $scope.r,
        tipo: encuesta.tipo,
        orden: c
      });

      c++;
    }

    $scope.enviar = function() {
      if(typeof $scope.encuesta.nombre != "undefined" &&
        typeof $scope.encuesta.inicio != "undefined" &&
        typeof $scope.encuesta.fin != "undefined" &&
        $scope.preguntas.length > 0) {
          surveys.sendSurvey($scope.encuesta, $scope.preguntas)
          .then(function(data) {
              console.log(data);
              $scope.preguntas = [];
              $scope.encuesta = {};
              c = 0;
              $state.go('encuestas_list')
          }, function(err) {
            alert(err.data.response);
          })
        } else {
          alert("Favor de completar todos los campos");
        }
    }
  }
})();
