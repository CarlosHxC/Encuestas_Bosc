'use strict';

(function() {
  angular.module('encuestas')
  .directive('navigation', navigation);

  function navigation() {
    return {
      restrict: 'E',
      templateUrl: '../app/shared/navigation/navigation.template.html',
      controller: 'navCtrl'
    }
  }
})();
