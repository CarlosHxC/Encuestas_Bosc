'use strict';

(function() {
  angular.module('encuestas')
  .controller('encuestasListCtrl', listCtrl);

  listCtrl.$inject = ['$rootScope', '$scope', 'surveys', 'authentication'];

  function listCtrl($rootScope, $scope, surveys, authentication) {



    function init() {
        $rootScope.session = authentication.currentUser();
      surveys.getAll()
      .then(function(data) {
        console.log(data);
        $scope.listEncuestas = data.data.response;
      });
    }

    init();

    $scope.deleteOne = function(id) {
      surveys.deleteOne(id)
      .then(function(data) {
        init();
      }, function(err) {
        alert(err.data.response);
      })
    }
  }
})();
