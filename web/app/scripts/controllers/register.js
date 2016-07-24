'use strict';

/**
 * @ngdoc function
 * @name dormManagementToolApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the dormManagementToolApp
 */
angular.module('dormManagementToolApp')
  .controller('RegisterCtrl', ['$state', 'ApiService', function ($state, ApiService) {
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
        }
      );
      ApiService.createUser(body).then(
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
