'use strict';

/**
 * @ngdoc function
 * @name dormManagementToolApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the dormManagementToolApp
 */
angular.module('dormManagementToolApp')
  .run(function($http) {
    if (localStorage.getItem('token')) {
      $http.defaults.headers.common.Authorization = 'Token =  ' + JSON.parse(localStorage.getItem('token')).token;
    }
  })
  .controller('UserCtrl', ['$http', 'UserService',  function ($http, UserService) {
    var mv = this;
    this.name = UserService.getName();
    this.getData = function () {
      $http({method: 'GET',
             url: 'http://localhost:3000/users/' + UserService.getId() + '/garbage_bags.json'}).then(function (response) {
        mv.duties = response.data;
      },
      function () {
        console.log('failed to retrieve garbage bags of user');
        mv.duties = [
          {
            "id": 1,
            "name": "indigo",
            "status": "ok",
            "user_id": 1,
            "dorm_id": 1
          },
          {
            "id": 2,
            "name": "purple",
            "status": "ok",
            "user_id": 1,
            "dorm_id": 1
          }
        ];
      })
    };
  }]);
