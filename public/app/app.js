'use strict';

var app = angular.module('encuestas', ['ui.router', 'angularMoment', '720kb.datepicker']);

app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function($httpProvider, $stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '../app/home/home.template.html',
    controller: 'homeCtrl'
  })
  .state('encuestas_list', {
    url: '/encuestas',
    templateUrl: '../app/encuestas/encuestas_list.template.html',
    controller: 'encuestasListCtrl'
  })
  .state('post_encuesta', {
    url: '/encuestas/new',
    templateUrl: '../app/encuestas/post_encuesta.template.html',
    controller: 'postEncuestaCtrl'
  })
  .state('visualizar', {
    url: '/encuestas/v/:id',
    templateUrl: '../app/encuestas/show_encuesta.template.html',
    controller: 'showEncuestaCtrl'
  })
  .state('responder', {
    url: '/encuestas/a/:id',
    templateUrl: '../app/encuestas/answer_encuesta.template.html',
    controller: 'answerEncuestaCtrl'
  })
  .state('respuestas', {
    url: '/respuestas/:id',
    templateUrl: '../app/encuestas/answers_list.template.html',
    controller: 'answersListCtrl'
  });

  $urlRouterProvider.otherwise('/');
  }
])
.run(['$rootScope', '$state', 'authentication', function($rootScope, $state, authentication) {
  $rootScope.$watch('session', function() {
    // console.log("cambio");
    // console.log(typeof $rootScope.session);
    if(typeof $rootScope.session == "undefined") {
      $rootScope.userMenu = false;
    } else {
      console.log("true");
      $rootScope.userMenu = true;
    }
  });

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
    var validationUrl = toState.url;
    // console.log(toState);
    // console.log(authentication.isLoggedIn());
    if(validationUrl == '/' && authentication.isLoggedIn()) {
      event.preventDefault();
      $state.go('encuestas_list');
    } else if(validationUrl != '/' && !authentication.isLoggedIn() && toState.name!="responder") {
      event.preventDefault();
      $state.go('home');
    }
  });
}]);
