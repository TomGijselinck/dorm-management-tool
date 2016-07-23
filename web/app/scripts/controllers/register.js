'use strict';

/**
 * @ngdoc function
 * @name dormManagementToolApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the dormManagementToolApp
 */
angular.module('dormManagementToolApp')
  .controller('RegisterCtrl', ['$http', '$state', 'ENV', function ($http, $state, ENV) {
    this.createUser = function (dorm_name, name, email, password, password_confirmation) {
      var body = JSON.stringify(
        {"user":
          {
            "dorm_name": dorm_name,
            "name": name,
            "email": email,
            "password": password,
            "password_confirmation": password_confirmation
          }
        });
      var url = ENV.apiEndpoint + '/users.json';
      $http.defaults.headers.common.Authorization =
        'Bearer ' + JSON.parse(localStorage.getItem('token')).access_token;
      $http({method: 'POST', url: url, data: body})
        .then(
          function () {
            console.log('register success!');
            $state.go('login');
          },
          function () {
            console.log('register failure');
          }
        )
    }
  }]);
