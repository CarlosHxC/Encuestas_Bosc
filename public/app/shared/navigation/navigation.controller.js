'use strict';

(function() {
  angular.module('encuestas')
  .controller('navCtrl', navCtrl);
  navCtrl.$inject = ['$rootScope', '$scope', '$state', 'authentication'];

  function navCtrl($rootScope, $scope, $state ,authentication) {
    $scope.currentUser = authentication.currentUser();
    $scope.logout = function() {
      authentication.logout();

      $scope.currentUser = authentication.currentUser();
      $rootScope.session = undefined;

      $state.go('home');

    }


  }
})();
