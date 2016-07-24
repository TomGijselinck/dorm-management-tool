'use strict';

/**
 * @ngdoc function
 * @name dormManagementToolApp.controller:DormCtrl
 * @description
 * # DormcCtrl
 * Controller of the dormManagementToolApp
 */
angular.module('dormManagementToolApp')
  .controller('DormCtrl', ['DormService', 'UserService', '$http', 'ENV', function (DormService, UserService, $http, ENV) {
    var mv = this;
    $http({method: 'GET',
           url: ENV.apiEndpoint + '/dorms/' + UserService.getId() + '.json'}).then(
      function (response) {
        mv.name = response.data.name;
      },
      function () {
        console.log('failed to fetch dorm name');
      }
    );
    DormService.getData().then(
      function (response) {
        mv.residents = response.data;
      }
    )
  }]);
