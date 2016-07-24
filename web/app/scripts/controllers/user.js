'use strict';

/**
 * @ngdoc function
 * @name dormManagementToolApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the dormManagementToolApp
 */
angular.module('dormManagementToolApp')
  .controller('UserCtrl', ['ApiService', 'UserService',  function (ApiService, UserService) {
    var mv = this;

    this.name = UserService.getName();
    
    this.getData = function () {
      ApiService.getGarbageBagsOfUser(UserService.getId()).then(function (response) {
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
