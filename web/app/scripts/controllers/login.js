'use strict';

/**
 * @ngdoc function
 * @name dormManagementToolApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the dormManagementToolApp
 */
angular.module('dormManagementToolApp')
  .controller('LoginCtrl', ['$http', '$mdToast', '$state', '$q', 'ENV', function ($http, $mdToast, $state, $q, ENV) {
    this.error = false;
    var mv = this;
    this.login = function (email, password) {
      var body = JSON.stringify(
        {
          "user": {
            "email": email,
            "password": password
          }
        }
      );
      var url = ENV.apiEndpoint + '/users/token.json';
      $http({method: 'POST', url: url, data: body})
        .then(
          function (response) {
            // localStorage.setItem('token', JSON.stringify(response.data));
            storeToken(JSON.stringify(response.data)).then(function () {
              $http.defaults.headers.common.Authorization =
                'Token = ' + JSON.parse(localStorage.getItem('token')).token;
              $http({method: 'POST', url: ENV.apiEndpoint + '/users/me.json',
                data: JSON.stringify({"email": email})})
                .then(
                  function (response) {
                    console.log('succeeded second request');
                    localStorage.setItem('user', JSON.stringify(response.data));
                    $state.go('dashboard');
                  },
                  function () {
                    console.log('failed second request')
                  }
                );
            });
          },
          function () {
            mv.showMessage('Wrong credentials!');
            mv.error = true;
          }
        );
    };
    this.showMessage = function(message) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .position('top right')
          .hideDelay(3000)
      );
    };

    function storeToken(token) {
      var q = $q.defer();
      localStorage.setItem('token', token);
      q.resolve();
      return q.promise;
    }

  }]);
