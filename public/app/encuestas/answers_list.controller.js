'use strict';

(function() {
  angular.module('encuestas')
  .controller('answersListCtrl', answersListCtrl);

  answersListCtrl.$inject = ['$rootScope', '$scope', '$stateParams', 'surveys', 'authentication'];

  function answersListCtrl($rootScope, $scope, $stateParams, surveys, authentication) {

    $scope.name;
    $scope.answers;
    function init() {
      $rootScope.session = authentication.currentUser();
      surveys.getAnswers($stateParams.id)
      .then(function(data) {
        console.log(data);

        $scope.name = data.data.response[0]._id.survey;
        $scope.answers = data.data.response;
      });
    }

    init();
  }
})();
