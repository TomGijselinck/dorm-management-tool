'use strict';

/**
 * @ngdoc function
 * @name dormManagementToolApp.controller:DormCtrl
 * @description
 * # DormcCtrl
 * Controller of the dormManagementToolApp
 */
angular.module('dormManagementToolApp')
  .controller('DormCtrl', ['ApiService', 'DormService', 'UserService', function (ApiService, DormService, UserService) {
    var mv = this;

    ApiService.getDormName(UserService.getDormId()).then(
      function (response) {
        mv.name = response.data.name;
      },
      function () {
        console.log('failed to fetch dorm name');
      }
    );

    ApiService.getDormSummary(UserService.getDormId()).then(
      function (response) {
        mv.residents = response.data;
      }
    );
  }]);
