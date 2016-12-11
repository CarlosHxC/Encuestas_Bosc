'use strict';

(function() {
  angular.module('encuestas')
  .controller('showEncuestaCtrl', showEncuestaCtrl);

  showEncuestaCtrl.$inject = ['$scope', '$stateParams', 'surveys'];

  function showEncuestaCtrl($scope, $stateParams, surveys) {

    $scope.nombre;
    $scope.owner;
    $scope.questions;

    function init() {
      surveys.getOne($stateParams.id)
      .then(function(data) {
        // console.log(data);
        $scope.nombre = data.data.response.nombre;
        $scope.owner = data.data.response.owner;
        $scope.questions = data.data.response.questions;
      }, function(err) {
        console.log(err);
      });
    }

    init();
  }
})();
