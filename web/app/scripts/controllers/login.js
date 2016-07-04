'use strict';

/**
 * @ngdoc function
 * @name dormManagementToolApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the dormManagementToolApp
 */
angular.module('dormManagementToolApp')
  .controller('LoginCtrl', ['$http', '$mdToast', function ($http, $mdToast) {
    this.error = false;
    var mv = this;
    this.login = function (email, password) {
      var body = JSON.stringify({"grant_type": "password", "username": email, "password": password});
      var url = 'http://localhost:3000/token';
      $http({method: 'POST', url: url, data: body}).then(
        function (response) {
          localStorage.setItem('user', JSON.stringify(response.data));
          window.location.href = '/';
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

  }]);
