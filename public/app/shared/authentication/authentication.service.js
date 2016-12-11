'use strict';

(function() {
  angular.module('encuestas')
  .service('authentication', authentication);

  authentication.$inject = ['$http', '$window', 'moment'];

  function authentication($http, $window, moment) {
    var saveToken = function(token) {
      $window.localStorage['encuestas-token'] = token;
    };

    var getToken = function() {
      return $window.localStorage['encuestas-token'];
    }

    var logout = function() {
      $window.localStorage.removeItem('encuestas-token');
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token) {
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        // console.log(payload);
        // console.log(payload.exp > moment().unix());
        return payload.exp > moment().unix();
      } else {
        return false;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()) {
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return {
          username: payload.username
        };
      }
    };

    var register = function(user) {
      return $http.post('/auth/register', user).success(function(data) {
        // console.log(data);
        saveToken(data.response);
      });
    };

    var login = function(user) {
      return $http.post('/auth/login', user).success(function(data) {
        saveToken(data.response);
      });
    };

    return {
      saveToken: saveToken,
      getToken: getToken,
      logout: logout,
      isLoggedIn: isLoggedIn,
      currentUser: currentUser,
      register: register,
      login: login,
    };
  }
})();
