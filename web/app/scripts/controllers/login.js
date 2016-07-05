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
      $http({method: 'POST', url: url, data: body})
        .then(
          function (response) {
            localStorage.setItem('token', JSON.stringify(response.data));
            var headers = { "Content-Type": "application/json",
                             "Authorization": "Bearer " + response.data['access_token']};
            $http({method: 'POST', url: 'http://localhost:3000/users/me.json',
                   data: JSON.stringify({"email": email}),
                   headers: headers})
              .then(
                function (response) {
                  console.log('succeeded second request');
                  localStorage.setItem('user', JSON.stringify(response.data));
                  window.location.href = '/';
                },
                function () {
                  console.log('failed second request')
                }
              );
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
