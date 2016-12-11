'use strict';

(function() {
  angular.module('encuestas')
  .controller('homeCtrl', homeCtrl);

  homeCtrl.$inject = ['$rootScope', '$scope', '$state','authentication'];

  function homeCtrl($rootScope, $scope, $state, authentication) {
    $scope.registrarse = false;


    (function() {
      $rootScope.session = authentication.currentUser();
    })()
    console.log($rootScope.session);
    $scope.register = function(user) {
      if(typeof user.username == "undefined" || typeof user.password == "undefined") {
        alert("Favor de completar los campos");
        return;
      }
      console.log(user);
      authentication.register(user)
      .then(function(data) {
        // console.log(data);
        $rootScope.session = authentication.currentUser();
        $state.go('encuestas_list');
      }, function(err) {
        console.log(err);
        alert(err.data.response);
        $scope.user = {};
      });
    }

    $scope.login = function(user) {
      if(typeof user.username == "undefined" || typeof user.password == "undefined") {
        alert("Favor de completar los campos");
        return;
      }

      authentication.login(user)
      .then(function(data) {
        console.log(data);
        $rootScope.session = authentication.currentUser();
        console.log($rootScope.session);
        $state.go('encuestas_list');
      }, function(err) {
        console.log(err);
        alert(err.data.response);
        $scope.user = {};
      });
    }
  }
})();
